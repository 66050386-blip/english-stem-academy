import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get TOEIC parts overview and question counts
router.get('/overview', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const parts = [
      { part: 1, name: 'Photographs', nameTh: 'รูปภาพ', section: 'LISTENING', count: 0 },
      { part: 2, name: 'Question-Response', nameTh: 'ถาม-ตอบ', section: 'LISTENING', count: 0 },
      { part: 3, name: 'Conversations', nameTh: 'บทสนทนา 2-3 คน', section: 'LISTENING', count: 0 },
      { part: 4, name: 'Short Talks', nameTh: 'การบรรยายสั้น / ประกาศ', section: 'LISTENING', count: 0 },
      { part: 5, name: 'Incomplete Sentences', nameTh: 'เติมคำในประโยค (ไวยากรณ์ & ศัพท์)', section: 'READING', count: 0 },
      { part: 6, name: 'Text Completion', nameTh: 'เติมข้อความในบทอ่าน', section: 'READING', count: 0 },
      { part: 7, name: 'Reading Comprehension', nameTh: 'การอ่านจับใจความบทความ/อีเมล', section: 'READING', count: 0 },
    ];

    for (const p of parts) {
      const code = `TOEIC_PART_${p.part}`;
      p.count = await prisma.question.count({
        where: { category: { code }, isPublished: true },
      });
    }

    res.json({ success: true, data: parts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch TOEIC overview' });
  }
});

// Get practice questions for a specific Part (without revealing answers)
router.get('/practice/:part', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const partNum = parseInt(req.params.part, 10);
    const count = parseInt((req.query.count as string) || '10', 10);

    if (isNaN(partNum) || partNum < 1 || partNum > 7) {
      res.status(400).json({ success: false, error: 'Invalid TOEIC part (must be 1 to 7)' });
      return;
    }

    const categoryCode = `TOEIC_PART_${partNum}`;

    const questions = await prisma.question.findMany({
      where: {
        category: { code: categoryCode },
        isPublished: true,
      },
      take: count,
      orderBy: { createdAt: 'asc' },
      include: {
        group: true,
        media: true,
        options: {
          select: {
            id: true,
            optionKey: true,
            contentEn: true,
            contentTh: true,
          },
          orderBy: { optionKey: 'asc' },
        },
      },
    });

    res.json({
      success: true,
      data: {
        part: partNum,
        total: questions.length,
        questions,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to load TOEIC practice questions' });
  }
});

// Submit answers for TOEIC practice test and grade on server
router.post('/submit', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { answers, timeSpentSec } = req.body;
    // answers is array of { questionId: string, selectedKey: string }

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400).json({ success: false, error: 'Answers array is required' });
      return;
    }

    const questionIds = answers.map((a: any) => a.questionId);
    const dbQuestions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: {
        options: true,
        category: true,
        group: true,
      },
    });

    const questionMap = new Map(dbQuestions.map((q) => [q.id, q]));

    let correctCount = 0;
    const errorTypeBreakdown: Record<string, { total: number; correct: number }> = {
      GRAMMAR: { total: 0, correct: 0 },
      VOCABULARY: { total: 0, correct: 0 },
      COMPREHENSION: { total: 0, correct: 0 },
    };

    const gradedItems = answers.map((userAns: any) => {
      const q = questionMap.get(userAns.questionId);
      if (!q) {
        return {
          questionId: userAns.questionId,
          isCorrect: false,
          error: 'Question not found',
        };
      }

      const correctOption = q.options.find((o) => o.isCorrect);
      const isCorrect = correctOption?.optionKey === userAns.selectedKey;

      if (isCorrect) {
        correctCount += 1;
      }

      const eType = q.errorType || 'COMPREHENSION';
      if (!errorTypeBreakdown[eType]) {
        errorTypeBreakdown[eType] = { total: 0, correct: 0 };
      }
      errorTypeBreakdown[eType].total += 1;
      if (isCorrect) {
        errorTypeBreakdown[eType].correct += 1;
      }

      return {
        questionId: q.id,
        questionText: q.questionText,
        questionTextTh: q.questionTextTh,
        selectedKey: userAns.selectedKey,
        correctKey: correctOption?.optionKey,
        isCorrect,
        explanationTh: q.explanationTh,
        options: q.options.map((opt) => ({
          optionKey: opt.optionKey,
          contentEn: opt.contentEn,
          contentTh: opt.contentTh,
          isCorrect: opt.isCorrect,
        })),
        contextEn: q.group?.contentEn,
        contextTh: q.group?.contentTh,
      };
    });

    const totalQuestions = answers.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);

    // Simulated TOEIC score estimate formula (disclaimer clearly shown in response)
    const simulatedScoreEstimate = Math.round((percentage / 100) * 990);

    // Award XP
    const xpEarned = correctCount * 5;
    await prisma.userStatistic.upsert({
      where: { userId },
      create: { userId, xp: xpEarned, quizzesTaken: 1 },
      update: { xp: { increment: xpEarned }, quizzesTaken: { increment: 1 } },
    });

    res.json({
      success: true,
      data: {
        score: correctCount,
        maxScore: totalQuestions,
        percentage,
        simulatedScoreEstimate,
        disclaimer: 'หมายเหตุ: คะแนนนี้เป็นการประมาณการเพื่อการฝึกซ้อมภายในระบบเท่านั้น ไม่ใช่คะแนนสอบ TOEIC Official และระบบนี้ไม่ได้จัดทำหรือรับรองโดย ETS',
        xpEarned,
        errorTypeBreakdown,
        gradedItems,
      },
    });
  } catch (error: any) {
    console.error('TOEIC submit error:', error);
    res.status(500).json({ success: false, error: 'Failed to grade TOEIC practice' });
  }
});

export default router;

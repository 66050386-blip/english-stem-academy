import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Start a new Mock Exam session
router.post('/start', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { examType = 'MIXED', questionCount = 20, timeLimitMinutes = 30 } = req.body;

    const count = Math.min(100, Math.max(5, parseInt(questionCount, 10) || 20));
    const durationMin = Math.min(180, Math.max(5, parseInt(timeLimitMinutes, 10) || 30));
    const timeLimitSec = durationMin * 60;

    // Build filter based on examType
    let categoryCodes: string[] = [];
    if (examType === 'ENGLISH_ONLY') {
      categoryCodes = ['GRAMMAR', 'READING', 'LISTENING', 'WORKPLACE', 'DATA_CENTER'];
    } else if (examType === 'TOEIC_FULL') {
      categoryCodes = [
        'TOEIC_PART_1',
        'TOEIC_PART_2',
        'TOEIC_PART_3',
        'TOEIC_PART_4',
        'TOEIC_PART_5',
        'TOEIC_PART_6',
        'TOEIC_PART_7',
      ];
    } else if (examType === 'STEM_FULL') {
      categoryCodes = ['STEM_SCIENCE', 'STEM_TECH', 'STEM_ENG', 'STEM_MATH'];
    } else if (examType === 'LOGIC_ONLY') {
      categoryCodes = ['LOGIC'];
    } else {
      // MIXED: Comprehensive Data Center & Tech Academy entrance prep
      categoryCodes = [
        'TOEIC_PART_5',
        'TOEIC_PART_7',
        'WORKPLACE',
        'DATA_CENTER',
        'STEM_SCIENCE',
        'STEM_TECH',
        'STEM_ENG',
        'STEM_MATH',
        'LOGIC',
      ];
    }

    // Fetch pool of eligible questions
    const eligibleQuestions = await prisma.question.findMany({
      where: {
        category: { code: { in: categoryCodes } },
        isPublished: true,
      },
      include: {
        category: true,
        topic: true,
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

    if (eligibleQuestions.length === 0) {
      res.status(400).json({ success: false, error: 'No questions found for the selected exam criteria' });
      return;
    }

    // Shuffle and pick
    const selectedQuestions = [...eligibleQuestions]
      .sort(() => 0.5 - Math.random())
      .slice(0, count);

    const now = new Date();
    const expiresAt = new Date(now.getTime() + timeLimitSec * 1000);

    const session = await prisma.examSession.create({
      data: {
        userId,
        examType,
        totalQuestions: selectedQuestions.length,
        timeLimitSec,
        startedAt: now,
        expiresAt,
        status: 'IN_PROGRESS',
      },
    });

    // Strip answers before returning to client (Ensuring anti-cheat server security)
    const clientQuestions = selectedQuestions.map((q, idx) => ({
      index: idx + 1,
      id: q.id,
      categoryName: q.category.nameTh,
      topicName: q.topic?.nameTh || null,
      questionText: q.questionText,
      questionTextTh: q.questionTextTh,
      formulaUsed: q.formulaUsed,
      audioUrl: q.audioUrl,
      imageUrl: q.imageUrl,
      contextEn: q.group?.contentEn || null,
      contextTh: q.group?.contentTh || null,
      media: q.media,
      options: q.options.map((opt) => ({
        optionKey: opt.optionKey,
        contentEn: opt.contentEn,
        contentTh: opt.contentTh,
      })),
    }));

    res.json({
      success: true,
      data: {
        sessionId: session.id,
        examType: session.examType,
        totalQuestions: session.totalQuestions,
        timeLimitSec: session.timeLimitSec,
        startedAt: session.startedAt,
        expiresAt: session.expiresAt,
        questions: clientQuestions,
      },
    });
  } catch (error: any) {
    console.error('Exam start error:', error);
    res.status(500).json({ success: false, error: 'Failed to start exam session' });
  }
});

// Save draft answer during exam
router.post('/:sessionId/save-answer', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const sessionId = req.params.sessionId;
    const { questionId, selectedKey } = req.body;

    const session = await prisma.examSession.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      res.status(404).json({ success: false, error: 'Exam session not found' });
      return;
    }

    if (session.status !== 'IN_PROGRESS') {
      res.status(400).json({ success: false, error: 'Exam session is already submitted or expired' });
      return;
    }

    // Save or update draft answer
    const existing = await prisma.attemptAnswer.findFirst({
      where: {
        examSessionId: sessionId,
        questionId,
      },
    });

    if (existing) {
      await prisma.attemptAnswer.update({
        where: { id: existing.id },
        data: { selectedKey },
      });
    } else {
      await prisma.attemptAnswer.create({
        data: {
          examSessionId: sessionId,
          questionId,
          selectedKey,
          isCorrect: false, // will be evaluated upon final submit
        },
      });
    }

    res.json({ success: true, message: 'Answer saved' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to save answer' });
  }
});

// Submit final exam session
router.post('/:sessionId/submit', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const sessionId = req.params.sessionId;
    const { answers, timeSpentSec = 0 } = req.body; // answers: array of { questionId, selectedKey }

    const session = await prisma.examSession.findUnique({
      where: { id: sessionId },
      include: { result: true },
    });

    if (!session || session.userId !== userId) {
      res.status(404).json({ success: false, error: 'Exam session not found' });
      return;
    }

    // Prevent duplicate submission
    if (session.status === 'SUBMITTED' && session.result) {
      res.status(400).json({
        success: false,
        error: 'This exam session has already been submitted and graded',
      });
      return;
    }

    const submittedAnswers = Array.isArray(answers) ? answers : [];
    const questionIds = submittedAnswers.map((a: any) => a.questionId);

    const dbQuestions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: {
        options: true,
        category: true,
        topic: true,
        group: true,
      },
    });

    const questionMap = new Map(dbQuestions.map((q) => [q.id, q]));

    let correctScore = 0;
    const skillBreakdown: Record<string, { total: number; correct: number; nameTh: string }> = {};

    const gradedAnswers: any[] = [];

    for (const ans of submittedAnswers) {
      const q = questionMap.get(ans.questionId);
      if (!q) continue;

      const correctOpt = q.options.find((o) => o.isCorrect);
      const isCorrect = correctOpt?.optionKey === ans.selectedKey;

      if (isCorrect) {
        correctScore += 1;
      }

      // Record skill breakdown
      const section = q.category.section || 'OTHER';
      const secName = q.category.nameTh;
      if (!skillBreakdown[section]) {
        skillBreakdown[section] = { total: 0, correct: 0, nameTh: secName };
      }
      skillBreakdown[section].total += 1;
      if (isCorrect) {
        skillBreakdown[section].correct += 1;
      }

      // Update or create AttemptAnswer
      await prisma.attemptAnswer.upsert({
        where: {
          id: `${sessionId}-${q.id}`, // or handle by query
        },
        create: {
          examSessionId: sessionId,
          questionId: q.id,
          selectedKey: ans.selectedKey || null,
          isCorrect,
        },
        update: {
          selectedKey: ans.selectedKey || null,
          isCorrect,
        },
      });

      gradedAnswers.push({
        questionId: q.id,
        questionText: q.questionText,
        questionTextTh: q.questionTextTh,
        categoryName: q.category.nameTh,
        topicName: q.topic?.nameTh,
        formulaUsed: q.formulaUsed,
        explanationTh: q.explanationTh,
        selectedKey: ans.selectedKey,
        correctKey: correctOpt?.optionKey,
        isCorrect,
        contextEn: q.group?.contentEn,
        contextTh: q.group?.contentTh,
        options: q.options.map((opt) => ({
          optionKey: opt.optionKey,
          contentEn: opt.contentEn,
          contentTh: opt.contentTh,
          isCorrect: opt.isCorrect,
        })),
      });
    }

    const totalQuestions = session.totalQuestions;
    const percentage = totalQuestions > 0 ? parseFloat(((correctScore / totalQuestions) * 100).toFixed(1)) : 0;

    // Update session status
    await prisma.examSession.update({
      where: { id: sessionId },
      data: {
        status: 'SUBMITTED',
        submittedAt: new Date(),
      },
    });

    // Create ExamResult
    const examResult = await prisma.examResult.create({
      data: {
        sessionId,
        userId,
        totalScore: correctScore,
        maxScore: totalQuestions,
        percentage,
        accuracyBySkill: JSON.stringify(skillBreakdown),
        timeSpentSec: timeSpentSec || 0,
      },
    });

    // Award XP
    const xpEarned = Math.round(correctScore * 10 + 20); // 10 XP per correct + 20 completion bonus
    await prisma.userStatistic.upsert({
      where: { userId },
      create: {
        userId,
        xp: xpEarned,
        examsTaken: 1,
      },
      update: {
        xp: { increment: xpEarned },
        examsTaken: { increment: 1 },
      },
    });

    res.json({
      success: true,
      data: {
        sessionId,
        resultId: examResult.id,
        totalScore: correctScore,
        maxScore: totalQuestions,
        percentage,
        timeSpentSec,
        skillBreakdown,
        xpEarned,
        gradedAnswers,
      },
    });
  } catch (error: any) {
    console.error('Exam submit error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit exam session' });
  }
});

// Get user's past exam history
router.get('/history', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const results = await prisma.examResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        session: true,
      },
    });

    const formatted = results.map((r) => ({
      id: r.id,
      sessionId: r.sessionId,
      examType: r.session.examType,
      totalScore: r.totalScore,
      maxScore: r.maxScore,
      percentage: r.percentage,
      timeSpentSec: r.timeSpentSec,
      createdAt: r.createdAt,
      accuracyBySkill: JSON.parse(r.accuracyBySkill || '{}'),
    }));

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch exam history' });
  }
});

// Review specific exam session answers and explanations
router.get('/:sessionId/review', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const sessionId = req.params.sessionId;

    const session = await prisma.examSession.findUnique({
      where: { id: sessionId },
      include: {
        result: true,
        answers: {
          include: {
            question: {
              include: {
                options: true,
                category: true,
                topic: true,
                group: true,
              },
            },
          },
        },
      },
    });

    if (!session || session.userId !== userId) {
      res.status(404).json({ success: false, error: 'Exam session not found' });
      return;
    }

    if (session.status !== 'SUBMITTED' || !session.result) {
      res.status(400).json({ success: false, error: 'Exam has not been completed yet' });
      return;
    }

    const reviewItems = session.answers.map((ans) => {
      const q = ans.question;
      const correctOpt = q.options.find((o) => o.isCorrect);

      return {
        questionId: q.id,
        questionText: q.questionText,
        questionTextTh: q.questionTextTh,
        categoryName: q.category.nameTh,
        topicName: q.topic?.nameTh,
        selectedKey: ans.selectedKey,
        correctKey: correctOpt?.optionKey,
        isCorrect: ans.isCorrect,
        formulaUsed: q.formulaUsed,
        explanationTh: q.explanationTh,
        contextEn: q.group?.contentEn,
        contextTh: q.group?.contentTh,
        options: q.options.map((opt) => ({
          optionKey: opt.optionKey,
          contentEn: opt.contentEn,
          contentTh: opt.contentTh,
          isCorrect: opt.isCorrect,
        })),
      };
    });

    res.json({
      success: true,
      data: {
        sessionId: session.id,
        examType: session.examType,
        totalScore: session.result.totalScore,
        maxScore: session.result.maxScore,
        percentage: session.result.percentage,
        timeSpentSec: session.result.timeSpentSec,
        submittedAt: session.submittedAt,
        accuracyBySkill: JSON.parse(session.result.accuracyBySkill || '{}'),
        items: reviewItems,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch exam review' });
  }
});

export default router;

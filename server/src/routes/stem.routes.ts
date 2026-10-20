import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get STEM categories & topics
router.get('/overview', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const subjects = [
      { code: 'STEM_SCIENCE', name: 'Science', nameTh: 'วิทยาศาสตร์', icon: 'Atom' },
      { code: 'STEM_TECH', name: 'Technology', nameTh: 'เทคโนโลยี & ฮาร์ดแวร์', icon: 'Cpu' },
      { code: 'STEM_ENG', name: 'Engineering', nameTh: 'วิศวกรรม & วงจรไฟฟ้า', icon: 'Wrench' },
      { code: 'STEM_MATH', name: 'Mathematics', nameTh: 'คณิตศาสตร์ & การคำนวณ', icon: 'Calculator' },
    ];

    const results = await Promise.all(
      subjects.map(async (subj) => {
        const count = await prisma.question.count({
          where: { category: { code: subj.code }, isPublished: true },
        });
        const topics = await prisma.topic.findMany({
          where: { category: { code: subj.code } },
          select: { id: true, name: true, nameTh: true },
        });
        return {
          ...subj,
          questionCount: count,
          topics,
        };
      })
    );

    res.json({ success: true, data: results });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch STEM overview' });
  }
});

// Get STEM questions with filters (subject, topic, difficulty)
router.get('/questions', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { subject, topicId, difficulty, count = '10' } = req.query;
    const limit = Math.min(50, parseInt(count as string, 10) || 10);

    const where: any = { isPublished: true };
    if (subject && subject !== 'ALL') {
      where.category = { code: subject as string };
    } else {
      where.category = {
        code: { in: ['STEM_SCIENCE', 'STEM_TECH', 'STEM_ENG', 'STEM_MATH'] },
      };
    }

    if (topicId) {
      where.topicId = topicId as string;
    }

    if (difficulty && difficulty !== 'ALL') {
      where.difficulty = difficulty as string;
    }

    const questions = await prisma.question.findMany({
      where,
      take: limit,
      include: {
        category: true,
        topic: true,
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
        total: questions.length,
        questions,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch STEM questions' });
  }
});

// Submit and grade STEM questions
router.post('/submit', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { answers } = req.body;

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
        topic: true,
      },
    });

    const questionMap = new Map(dbQuestions.map((q) => [q.id, q]));

    let correctCount = 0;
    const recommendedReviewTopics = new Set<string>();

    const gradedItems = answers.map((userAns: any) => {
      const q = questionMap.get(userAns.questionId);
      if (!q) {
        return { questionId: userAns.questionId, isCorrect: false };
      }

      const correctOption = q.options.find((o) => o.isCorrect);
      const isCorrect = correctOption?.optionKey === userAns.selectedKey;

      if (isCorrect) {
        correctCount += 1;
      } else {
        if (q.topic) {
          recommendedReviewTopics.add(`${q.topic.nameTh} (${q.topic.name})`);
        }
      }

      return {
        questionId: q.id,
        questionText: q.questionText,
        questionTextTh: q.questionTextTh,
        difficulty: q.difficulty,
        category: q.category.nameTh,
        topic: q.topic?.nameTh,
        selectedKey: userAns.selectedKey,
        correctKey: correctOption?.optionKey,
        isCorrect,
        formulaUsed: q.formulaUsed,
        explanationTh: q.explanationTh,
        options: q.options.map((opt) => ({
          optionKey: opt.optionKey,
          contentEn: opt.contentEn,
          contentTh: opt.contentTh,
          isCorrect: opt.isCorrect,
        })),
      };
    });

    const total = answers.length;
    const percentage = Math.round((correctCount / total) * 100);
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
        maxScore: total,
        percentage,
        xpEarned,
        recommendedReviewTopics: Array.from(recommendedReviewTopics),
        gradedItems,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to grade STEM test' });
  }
});

export default router;

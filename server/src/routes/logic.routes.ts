import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get Logic and Aptitude questions
router.get('/questions', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { count = '10', topicId } = req.query;
    const limit = Math.min(50, parseInt(count as string, 10) || 10);

    const where: any = {
      category: { code: 'LOGIC' },
      isPublished: true,
    };

    if (topicId) {
      where.topicId = topicId as string;
    }

    const questions = await prisma.question.findMany({
      where,
      take: limit,
      include: {
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
    res.status(500).json({ success: false, error: 'Failed to fetch logic questions' });
  }
});

// Submit logic answers
router.post('/submit', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { answers, timeSpentSec } = req.body;

    if (!Array.isArray(answers) || answers.length === 0) {
      res.status(400).json({ success: false, error: 'Answers array required' });
      return;
    }

    const questionIds = answers.map((a: any) => a.questionId);
    const dbQuestions = await prisma.question.findMany({
      where: { id: { in: questionIds } },
      include: {
        options: true,
        topic: true,
      },
    });

    const map = new Map(dbQuestions.map((q) => [q.id, q]));
    let correct = 0;

    const gradedItems = answers.map((a: any) => {
      const q = map.get(a.questionId);
      if (!q) return { questionId: a.questionId, isCorrect: false };

      const correctOpt = q.options.find((o) => o.isCorrect);
      const isCorrect = correctOpt?.optionKey === a.selectedKey;
      if (isCorrect) correct += 1;

      return {
        questionId: q.id,
        questionText: q.questionText,
        questionTextTh: q.questionTextTh,
        topic: q.topic?.nameTh,
        selectedKey: a.selectedKey,
        correctKey: correctOpt?.optionKey,
        isCorrect,
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
    const percentage = Math.round((correct / total) * 100);
    const xpEarned = correct * 5;

    await prisma.userStatistic.upsert({
      where: { userId },
      create: { userId, xp: xpEarned, quizzesTaken: 1 },
      update: { xp: { increment: xpEarned }, quizzesTaken: { increment: 1 } },
    });

    res.json({
      success: true,
      data: {
        score: correct,
        maxScore: total,
        percentage,
        timeSpentSec: timeSpentSec || 0,
        xpEarned,
        gradedItems,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to grade logic test' });
  }
});

export default router;

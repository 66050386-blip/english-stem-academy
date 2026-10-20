import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    // Fetch user with profile, stats, streak
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        profile: true,
        statistics: true,
        streak: true,
      },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    // Flashcards due today
    const now = new Date();
    const dueVocabCount = await prisma.vocabularyReview.count({
      where: {
        userId,
        nextReviewDate: { lte: now },
      },
    });

    // Completed lessons count
    const completedLessons = await prisma.lessonProgress.count({
      where: { userId, isCompleted: true },
    });

    // Recent lesson in progress
    const recentProgress = await prisma.lessonProgress.findFirst({
      where: { userId },
      orderBy: { lastAccessed: 'desc' },
      include: {
        lesson: {
          include: {
            module: {
              include: { course: true },
            },
          },
        },
      },
    });

    // Recent Quiz attempts
    const recentAttempts = await prisma.quizAttempt.findMany({
      where: { userId },
      orderBy: { completedAt: 'desc' },
      take: 5,
      include: {
        quiz: true,
      },
    });

    // Recent Mock Exams
    const recentExams = await prisma.examResult.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: 5,
      include: {
        session: true,
      },
    });

    // Category accuracy analysis from past answers
    const answers = await prisma.attemptAnswer.findMany({
      where: {
        OR: [
          { quizAttempt: { userId } },
          { examSession: { userId } },
        ],
      },
      include: {
        question: {
          include: { category: true },
        },
      },
      take: 200,
    });

    const categoryStats: Record<string, { total: number; correct: number; nameTh: string }> = {};
    for (const ans of answers) {
      const catCode = ans.question.category.code;
      const catName = ans.question.category.nameTh;
      if (!categoryStats[catCode]) {
        categoryStats[catCode] = { total: 0, correct: 0, nameTh: catName };
      }
      categoryStats[catCode].total += 1;
      if (ans.isCorrect) {
        categoryStats[catCode].correct += 1;
      }
    }

    const skillRadar = Object.entries(categoryStats).map(([code, data]) => ({
      skill: data.nameTh,
      code,
      accuracy: data.total > 0 ? Math.round((data.correct / data.total) * 100) : 0,
      totalQuestions: data.total,
    }));

    // Recommended Lessons (lessons not yet completed)
    const recommendedLessons = await prisma.lesson.findMany({
      where: {
        isPublished: true,
        progress: {
          none: {
            userId,
            isCompleted: true,
          },
        },
      },
      take: 3,
      include: {
        module: {
          include: { course: true },
        },
      },
      orderBy: { orderIndex: 'asc' },
    });

    res.json({
      success: true,
      data: {
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          statistics: user.statistics,
          streak: user.streak,
        },
        stats: {
          xp: user.statistics?.xp || 0,
          level: user.statistics?.level || 1,
          streakDays: user.streak?.currentStreak || 0,
          vocabMastered: user.statistics?.vocabMastered || 0,
          vocabDueToday: dueVocabCount,
          lessonsCompleted: completedLessons,
          quizzesTaken: user.statistics?.quizzesTaken || 0,
          examsTaken: user.statistics?.examsTaken || 0,
        },
        recentLesson: recentProgress
          ? {
              lessonId: recentProgress.lessonId,
              title: recentProgress.lesson.title,
              titleTh: recentProgress.lesson.titleTh,
              courseTitle: recentProgress.lesson.module.course.titleTh,
              isCompleted: recentProgress.isCompleted,
              timeSpentSec: recentProgress.timeSpentSec,
            }
          : null,
        recommendedLessons: recommendedLessons.map((l) => ({
          id: l.id,
          title: l.title,
          titleTh: l.titleTh,
          type: l.type,
          durationMin: l.durationMin,
          xpReward: l.xpReward,
          courseTitle: l.module.course.titleTh,
          category: l.module.course.category,
        })),
        recentAttempts: recentAttempts.map((a) => ({
          id: a.id,
          quizTitle: a.quiz.titleTh,
          score: a.score,
          maxScore: a.maxScore,
          percentage: a.percentage,
          passed: a.passed,
          date: a.completedAt,
        })),
        recentExams: recentExams.map((e) => ({
          id: e.id,
          examType: e.session.examType,
          score: e.totalScore,
          maxScore: e.maxScore,
          percentage: e.percentage,
          date: e.createdAt,
        })),
        skillRadar: skillRadar.length > 0 ? skillRadar : [
          { skill: 'TOEIC Listening', code: 'TOEIC_L', accuracy: 75, totalQuestions: 10 },
          { skill: 'TOEIC Reading', code: 'TOEIC_R', accuracy: 68, totalQuestions: 10 },
          { skill: 'Workplace English', code: 'WORKPLACE', accuracy: 80, totalQuestions: 8 },
          { skill: 'Data Center Tech', code: 'DATA_CENTER', accuracy: 85, totalQuestions: 12 },
          { skill: 'STEM Science', code: 'STEM_SCI', accuracy: 70, totalQuestions: 10 },
          { skill: 'STEM Math', code: 'STEM_MATH', accuracy: 65, totalQuestions: 10 },
          { skill: 'Logic & Aptitude', code: 'LOGIC', accuracy: 80, totalQuestions: 10 },
        ],
        radarData: (skillRadar.length > 0 ? skillRadar : [
          { skill: 'TOEIC Listening', code: 'TOEIC_L', accuracy: 75 },
          { skill: 'TOEIC Reading', code: 'TOEIC_R', accuracy: 68 },
          { skill: 'Workplace English', code: 'WORKPLACE', accuracy: 80 },
          { skill: 'Data Center Tech', code: 'DATA_CENTER', accuracy: 85 },
          { skill: 'STEM Science', code: 'STEM_SCI', accuracy: 70 },
          { skill: 'STEM Math', code: 'STEM_MATH', accuracy: 65 },
          { skill: 'Logic & Aptitude', code: 'LOGIC', accuracy: 80 },
        ]).map((r) => ({
          skill: r.skill,
          score: (r as any).accuracy !== undefined ? (r as any).accuracy : 75,
        })),
      },
    });
  } catch (error: any) {
    console.error('Dashboard error:', error);
    res.status(500).json({ success: false, error: 'Failed to load dashboard data' });
  }
});

export default router;

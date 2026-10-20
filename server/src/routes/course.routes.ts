import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// List all published courses with user progress
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const category = req.query.category as string;

    const where: any = { isPublished: true };
    if (category) {
      where.category = category;
    }

    const courses = await prisma.course.findMany({
      where,
      orderBy: { orderIndex: 'asc' },
      include: {
        modules: {
          include: {
            lessons: {
              where: { isPublished: true },
              select: {
                id: true,
                title: true,
                titleTh: true,
                type: true,
                durationMin: true,
                xpReward: true,
                progress: {
                  where: { userId },
                  select: { isCompleted: true },
                },
              },
            },
          },
        },
      },
    });

    const coursesWithProgress = courses.map((course) => {
      let totalLessons = 0;
      let completedLessons = 0;
      let totalDurationMin = 0;

      for (const mod of course.modules) {
        for (const lesson of mod.lessons) {
          totalLessons += 1;
          totalDurationMin += lesson.durationMin;
          if (lesson.progress.length > 0 && lesson.progress[0].isCompleted) {
            completedLessons += 1;
          }
        }
      }

      const progressPercent = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

      return {
        id: course.id,
        title: course.title,
        titleTh: course.titleTh,
        description: course.description,
        category: course.category,
        level: course.level,
        thumbnail: course.thumbnail,
        modulesCount: course.modules.length,
        modules: course.modules.map((m) => ({
          id: m.id,
          title: m.title,
          titleTh: m.titleTh,
          lessons: m.lessons.map((l) => ({
            id: l.id,
            title: l.title,
            titleTh: l.titleTh,
            type: l.type,
            durationMin: l.durationMin,
            xpReward: l.xpReward,
            isCompleted: l.progress.length > 0 && l.progress[0].isCompleted,
          })),
        })),
        totalLessons,
        completedLessons,
        progressPercent,
        totalDurationMin,
      };
    });

    res.json({ success: true, data: coursesWithProgress });
  } catch (error: any) {
    console.error('Course fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch courses' });
  }
});

// Get course detail by ID
router.get('/:id', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const courseId = req.params.id;

    const course = await prisma.course.findUnique({
      where: { id: courseId },
      include: {
        modules: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              where: { isPublished: true },
              orderBy: { orderIndex: 'asc' },
              include: {
                progress: {
                  where: { userId },
                },
              },
            },
          },
        },
      },
    });

    if (!course) {
      res.status(404).json({ success: false, error: 'Course not found' });
      return;
    }

    res.json({ success: true, data: course });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch course detail' });
  }
});

// Get lesson detail with contents and quiz
router.get('/lessons/:id', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const lessonId = req.params.id;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
      include: {
        module: {
          include: { course: true },
        },
        contents: {
          orderBy: { orderIndex: 'asc' },
        },
        quizzes: {
          include: {
            questions: {
              include: {
                question: {
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
        progress: {
          where: { userId },
        },
      },
    });

    if (!lesson) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }

    // If lesson has no linked quizzes, attach 2 questions matching the course/topic or general questions
    let quizzes = lesson.quizzes;
    if (!quizzes || quizzes.length === 0) {
      const fallbackQuestions = await prisma.question.findMany({
        where: { isPublished: true },
        take: 2,
        include: {
          options: true,
        },
      });

      if (fallbackQuestions.length > 0) {
        quizzes = [
          {
            id: `quiz-${lesson.id}`,
            lessonId: lesson.id,
            title: `แบบทดสอบท้ายบท: ${lesson.titleTh}`,
            titleTh: `แบบทดสอบท้ายบท`,
            quizType: 'LESSON_CHECK',
            timeLimitSec: 300,
            passScore: 70,
            createdAt: new Date(),
            questions: fallbackQuestions.map((fq, idx) => ({
              id: `qq-${fq.id}`,
              quizId: `quiz-${lesson.id}`,
              questionId: fq.id,
              orderIndex: idx,
              question: fq,
            })),
          } as any,
        ];
      }
    }

    res.json({ success: true, data: { ...lesson, quizzes } });
  } catch (error: any) {
    console.error('Lesson fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch lesson' });
  }
});

// Update lesson progress (mark completed, add time spent, give XP)
router.post('/lessons/:id/progress', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const lessonId = req.params.id;
    const { timeSpentSec, isCompleted, score } = req.body;

    const lesson = await prisma.lesson.findUnique({
      where: { id: lessonId },
    });

    if (!lesson) {
      res.status(404).json({ success: false, error: 'Lesson not found' });
      return;
    }

    // Check existing progress to prevent duplicate XP awarding
    const existingProgress = await prisma.lessonProgress.findUnique({
      where: {
        userId_lessonId: { userId, lessonId },
      },
    });

    const isFirstTimeCompletion = (!existingProgress || !existingProgress.isCompleted) && isCompleted;

    const updatedProgress = await prisma.lessonProgress.upsert({
      where: {
        userId_lessonId: { userId, lessonId },
      },
      create: {
        userId,
        lessonId,
        isCompleted: !!isCompleted,
        score: score !== undefined ? score : null,
        timeSpentSec: timeSpentSec || 60,
        lastAccessed: new Date(),
      },
      update: {
        isCompleted: isCompleted !== undefined ? isCompleted : undefined,
        score: score !== undefined ? score : undefined,
        timeSpentSec: {
          increment: timeSpentSec || 0,
        },
        lastAccessed: new Date(),
      },
    });

    let xpEarned = 0;
    if (isFirstTimeCompletion) {
      xpEarned = lesson.xpReward || 20;

      // Update user stats
      const stats = await prisma.userStatistic.findUnique({ where: { userId } });
      const currentXP = (stats?.xp || 0) + xpEarned;
      const currentLevel = Math.floor(currentXP / 100) + 1;

      await prisma.userStatistic.upsert({
        where: { userId },
        create: {
          userId,
          xp: currentXP,
          level: currentLevel,
          lessonsCompleted: 1,
        },
        update: {
          xp: currentXP,
          level: currentLevel,
          lessonsCompleted: { increment: 1 },
        },
      });
    }

    res.json({
      success: true,
      data: {
        progress: updatedProgress,
        xpEarned,
      },
    });
  } catch (error: any) {
    console.error('Progress update error:', error);
    res.status(500).json({ success: false, error: 'Failed to update progress' });
  }
});

export default router;

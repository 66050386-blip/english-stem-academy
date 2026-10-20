import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';
import { calculateSM2 } from '../utils/sm2';

const router = Router();

// List vocabulary with search, level, category filters and user review status
router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { search, level, category, page = '1', limit = '50' } = req.query;

    const pageNum = parseInt(page as string, 10) || 1;
    const take = parseInt(limit as string, 10) || 50;
    const skip = (pageNum - 1) * take;

    const where: any = {};
    if (level && level !== 'ALL') {
      where.level = level;
    }
    if (category && category !== 'ALL') {
      where.category = category;
    }
    if (search) {
      where.OR = [
        { word: { contains: search as string } },
        { meaningTh: { contains: search as string } },
      ];
    }

    const [total, items] = await Promise.all([
      prisma.vocabulary.count({ where }),
      prisma.vocabulary.findMany({
        where,
        skip,
        take,
        orderBy: { word: 'asc' },
        include: {
          reviews: {
            where: { userId },
            select: {
              easeFactor: true,
              intervalDays: true,
              repetitions: true,
              nextReviewDate: true,
              lastReviewedAt: true,
            },
          },
          bookmarks: {
            where: { userId },
            select: { id: true },
          },
        },
      }),
    ]);

    const formatted = items.map((item) => {
      const review = item.reviews[0] || null;
      const isBookmarked = item.bookmarks.length > 0;
      return {
        id: item.id,
        word: item.word,
        ipa: item.ipa,
        partOfSpeech: item.partOfSpeech,
        meaningTh: item.meaningTh,
        meaningEn: item.meaningEn,
        level: item.level,
        category: item.category,
        exampleEn: item.exampleEn,
        exampleTh: item.exampleTh,
        audioUrl: item.audioUrl,
        isBookmarked,
        reviewStatus: review
          ? {
              repetitions: review.repetitions,
              intervalDays: review.intervalDays,
              nextReviewDate: review.nextReviewDate,
              isMastered: review.repetitions >= 3,
            }
          : null,
      };
    });

    res.json({
      success: true,
      data: {
        total,
        page: pageNum,
        totalPages: Math.ceil(total / take),
        items: formatted,
      },
    });
  } catch (error: any) {
    console.error('Vocab list error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch vocabulary' });
  }
});

// Get flashcards due for SM-2 spaced repetition review
router.get('/due-reviews', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const now = new Date();

    // Find cards that have a review due OR cards that haven't been reviewed yet (first 15 new cards)
    const dueReviews = await prisma.vocabularyReview.findMany({
      where: {
        userId,
        nextReviewDate: { lte: now },
      },
      include: {
        vocabulary: true,
      },
      take: 20,
    });

    const dueVocabs = dueReviews.map((r) => ({
      ...r.vocabulary,
      repetitions: r.repetitions,
      easeFactor: r.easeFactor,
      intervalDays: r.intervalDays,
      isDue: true,
    }));

    // If fewer than 10 cards due, pick some unreviewed cards
    if (dueVocabs.length < 10) {
      const needed = 15 - dueVocabs.length;
      const unreviewed = await prisma.vocabulary.findMany({
        where: {
          reviews: {
            none: { userId },
          },
        },
        take: needed,
      });

      for (const u of unreviewed) {
        dueVocabs.push({
          ...u,
          repetitions: 0,
          easeFactor: 2.5,
          intervalDays: 1,
          isDue: false,
        });
      }
    }

    res.json({ success: true, data: dueVocabs });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch review flashcards' });
  }
});

// Submit SM-2 review rating for a vocabulary card
router.post('/:id/review', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const vocabularyId = req.params.id;
    const { rating } = req.body; // rating from 0 (forgot) to 5 (easy)

    if (rating === undefined || rating < 0 || rating > 5) {
      res.status(400).json({ success: false, error: 'Rating must be an integer between 0 and 5' });
      return;
    }

    const currentReview = await prisma.vocabularyReview.findUnique({
      where: {
        userId_vocabularyId: { userId, vocabularyId },
      },
    });

    const prevRepetitions = currentReview?.repetitions || 0;
    const prevEase = currentReview?.easeFactor || 2.5;
    const prevInterval = currentReview?.intervalDays || 1;

    const sm2 = calculateSM2({
      rating,
      repetitions: prevRepetitions,
      easeFactor: prevEase,
      intervalDays: prevInterval,
    });

    const updated = await prisma.vocabularyReview.upsert({
      where: {
        userId_vocabularyId: { userId, vocabularyId },
      },
      create: {
        userId,
        vocabularyId,
        easeFactor: sm2.easeFactor,
        intervalDays: sm2.intervalDays,
        repetitions: sm2.repetitions,
        nextReviewDate: sm2.nextReviewDate,
        lastReviewedAt: new Date(),
      },
      update: {
        easeFactor: sm2.easeFactor,
        intervalDays: sm2.intervalDays,
        repetitions: sm2.repetitions,
        nextReviewDate: sm2.nextReviewDate,
        lastReviewedAt: new Date(),
      },
    });

    // Award XP for successful recall
    let xpEarned = 0;
    if (rating >= 3) {
      xpEarned = 5;
      await prisma.userStatistic.upsert({
        where: { userId },
        create: {
          userId,
          xp: xpEarned,
          vocabMastered: sm2.repetitions >= 3 ? 1 : 0,
        },
        update: {
          xp: { increment: xpEarned },
          vocabMastered: sm2.repetitions >= 3 && prevRepetitions < 3 ? { increment: 1 } : undefined,
        },
      });
    }

    res.json({
      success: true,
      data: {
        review: updated,
        xpEarned,
        nextReviewInDays: sm2.intervalDays,
      },
    });
  } catch (error: any) {
    console.error('Review submit error:', error);
    res.status(500).json({ success: false, error: 'Failed to record vocabulary review' });
  }
});

// Toggle bookmark on a vocabulary word
router.post('/:id/bookmark', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const vocabularyId = req.params.id;

    const existing = await prisma.bookmark.findUnique({
      where: {
        userId_vocabularyId: { userId, vocabularyId },
      },
    });

    if (existing) {
      await prisma.bookmark.delete({
        where: { id: existing.id },
      });
      res.json({ success: true, isBookmarked: false });
    } else {
      await prisma.bookmark.create({
        data: { userId, vocabularyId },
      });
      res.json({ success: true, isBookmarked: true });
    }
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to toggle bookmark' });
  }
});

// Generate multiple-choice vocabulary quiz
router.get('/quiz', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { category, count = '10' } = req.query;
    const limit = Math.min(25, parseInt(count as string, 10) || 10);

    const where: any = {};
    if (category && category !== 'ALL') {
      where.category = category;
    }

    const allVocabs = await prisma.vocabulary.findMany({
      where,
      take: 60,
    });

    if (allVocabs.length < 4) {
      res.status(400).json({ success: false, error: 'Not enough vocabulary to form a quiz' });
      return;
    }

    // Shuffle and pick target words
    const shuffled = [...allVocabs].sort(() => 0.5 - Math.random());
    const targetWords = shuffled.slice(0, limit);

    const quizQuestions = targetWords.map((target, idx) => {
      // Pick 3 distractor meanings
      const distractors = allVocabs
        .filter((v) => v.id !== target.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3)
        .map((d) => d.meaningTh);

      const options = [target.meaningTh, ...distractors].sort(() => 0.5 - Math.random());
      const correctIndex = options.indexOf(target.meaningTh);

      return {
        id: `vq-${idx + 1}`,
        vocabId: target.id,
        word: target.word,
        ipa: target.ipa,
        partOfSpeech: target.partOfSpeech,
        exampleEn: target.exampleEn,
        correctOption: ['A', 'B', 'C', 'D'][correctIndex],
        options: options.map((opt, oIdx) => ({
          key: ['A', 'B', 'C', 'D'][oIdx],
          text: opt,
        })),
        explanation: `${target.word} (${target.partOfSpeech}) แปลว่า "${target.meaningTh}"\nตัวอย่าง: ${target.exampleEn} (${target.exampleTh})`,
      };
    });

    res.json({ success: true, data: quizQuestions });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to generate vocabulary quiz' });
  }
});

export default router;

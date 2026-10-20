import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

router.get('/', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    // Fetch user statistics
    const stats = await prisma.userStatistic.findUnique({
      where: { userId },
    });

    // Fetch all attempt answers for user
    const answers = await prisma.attemptAnswer.findMany({
      where: {
        OR: [
          { quizAttempt: { userId } },
          { examSession: { userId } },
        ],
      },
      include: {
        question: {
          include: {
            category: true,
            topic: true,
          },
        },
      },
    });

    const totalQuestions = answers.length;
    const correctCount = answers.filter((a) => a.isCorrect).length;
    const overallAccuracy = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    // Accuracy by Category
    const categoryStats: Record<string, { total: number; correct: number; nameTh: string }> = {};
    for (const a of answers) {
      const code = a.question.category.code;
      const name = a.question.category.nameTh;
      if (!categoryStats[code]) {
        categoryStats[code] = { total: 0, correct: 0, nameTh: name };
      }
      categoryStats[code].total += 1;
      if (a.isCorrect) categoryStats[code].correct += 1;
    }

    const categoryBreakdown = Object.entries(categoryStats).map(([code, val]) => ({
      code,
      nameTh: val.nameTh,
      accuracy: Math.round((val.correct / val.total) * 100),
      total: val.total,
    }));

    // Error Types Breakdown
    const errorStats: Record<string, number> = {
      GRAMMAR: 0,
      VOCABULARY: 0,
      COMPREHENSION: 0,
      CALCULATION: 0,
      REASONING: 0,
    };

    for (const a of answers) {
      if (!a.isCorrect) {
        const eType = a.question.errorType || 'COMPREHENSION';
        errorStats[eType] = (errorStats[eType] || 0) + 1;
      }
    }

    const errorBreakdown = Object.entries(errorStats).map(([key, count]) => ({
      errorType: key,
      labelTh:
        key === 'GRAMMAR'
          ? 'ไวยากรณ์ (Grammar)'
          : key === 'VOCABULARY'
          ? 'คำศัพท์ (Vocabulary)'
          : key === 'CALCULATION'
          ? 'การคำนวณสูตร (Calculation)'
          : key === 'REASONING'
          ? 'การให้เหตุผล / ตรรกะ (Reasoning)'
          : 'การอ่านจับใจความ (Comprehension)',
      count,
    }));

    // Vocab mastery curve
    const vocabReviews = await prisma.vocabularyReview.findMany({
      where: { userId },
    });
    const vocabRepetitions = {
      learning: vocabReviews.filter((r) => r.repetitions < 3).length,
      mastered: vocabReviews.filter((r) => r.repetitions >= 3).length,
      totalReviewed: vocabReviews.length,
    };

    // Recommendations generated from lowest performing categories
    const recommendations: string[] = [];
    const sortedCategories = [...categoryBreakdown].sort((a, b) => a.accuracy - b.accuracy);
    if (sortedCategories.length > 0 && sortedCategories[0].accuracy < 70) {
      recommendations.push(
        `ควรเน้นทบทวนหมวด ${sortedCategories[0].nameTh} เนื่องจากความแม่นยำปัจจุบันอยู่ที่ ${sortedCategories[0].accuracy}%`
      );
    }
    if (sortedCategories.length > 1 && sortedCategories[1].accuracy < 70) {
      recommendations.push(
        `ฝึกทำแบบฝึกหัดเสริมในหัวข้อ ${sortedCategories[1].nameTh} เพื่อยกระดับความมั่นใจ`
      );
    }
    if (errorStats.GRAMMAR > 3) {
      recommendations.push('พบข้อผิดพลาดด้านไวยากรณ์ (Grammar) แนะนำทบทวน Tenses และ Subject-Verb Agreement');
    }
    if (errorStats.CALCULATION > 3) {
      recommendations.push('พบข้อผิดพลาดในการคำนวณ STEM แนะนำทบทวนสูตรกฎของโอห์มและการแปลงหน่วย');
    }
    if (recommendations.length === 0) {
      recommendations.push('ผลการเรียนรู้สม่ำเสมอดีมาก! แนะนำทำข้อสอบจำลอง Mixed Exam เพื่อเตรียมความพร้อมเสมือนจริง');
    }

    res.json({
      success: true,
      data: {
        totalAnswered: totalQuestions,
        overallAccuracy,
        xp: stats?.xp || 0,
        level: stats?.level || 1,
        categoryBreakdown,
        errorBreakdown,
        vocabRepetitions,
        recommendations,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to generate learning analytics' });
  }
});

export default router;

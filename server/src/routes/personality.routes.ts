import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Get all personality assessment questions
router.get('/questions', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;

    const questions = await prisma.personalityQuestion.findMany({
      orderBy: { orderIndex: 'asc' },
      include: {
        responses: {
          where: { userId },
          select: { score: true },
        },
      },
    });

    const formatted = questions.map((q) => ({
      id: q.id,
      dimension: q.dimension,
      statementEn: q.statementEn,
      statementTh: q.statementTh,
      orderIndex: q.orderIndex,
      userScore: q.responses[0]?.score || null,
    }));

    res.json({ success: true, data: formatted });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch personality questions' });
  }
});

// Submit personality responses and compute self-reflection profile
router.post('/submit', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { responses } = req.body; // array of { questionId: string, score: number (1-5) }

    if (!Array.isArray(responses) || responses.length === 0) {
      res.status(400).json({ success: false, error: 'Responses array is required' });
      return;
    }

    // Upsert responses into database
    for (const r of responses) {
      if (r.questionId && r.score >= 1 && r.score <= 5) {
        await prisma.personalityResponse.upsert({
          where: {
            userId_questionId: { userId, questionId: r.questionId },
          },
          create: {
            userId,
            questionId: r.questionId,
            score: r.score,
          },
          update: {
            score: r.score,
          },
        });
      }
    }

    // Fetch all user responses to build full profile
    const allResponses = await prisma.personalityResponse.findMany({
      where: { userId },
      include: { question: true },
    });

    const dimensionScores: Record<string, { total: number; count: number; nameTh: string }> = {
      TEAMWORK: { total: 0, count: 0, nameTh: 'การทำงานร่วมกับผู้อื่น (Teamwork)' },
      DETAIL_ORIENTATION: { total: 0, count: 0, nameTh: 'ความละเอียดรอบคอบ (Detail Orientation)' },
      ADAPTABILITY: { total: 0, count: 0, nameTh: 'ความยืดหยุ่นและการเรียนรู้ (Adaptability)' },
      PROBLEM_SOLVING: { total: 0, count: 0, nameTh: 'การแก้ปัญหาเชิงตรรกะ (Problem Solving)' },
      SAFETY_MINDSET: { total: 0, count: 0, nameTh: 'การคำนึงถึงความปลอดภัย (Safety Mindset)' },
    };

    for (const resItem of allResponses) {
      const dim = resItem.question.dimension;
      if (dimensionScores[dim]) {
        dimensionScores[dim].total += resItem.score;
        dimensionScores[dim].count += 1;
      }
    }

    const radarProfile = Object.entries(dimensionScores).map(([key, val]) => {
      const avg = val.count > 0 ? parseFloat((val.total / val.count).toFixed(2)) : 3.0;
      const percentage = Math.round((avg / 5) * 100);
      return {
        dimensionKey: key,
        dimensionName: val.nameTh,
        scoreAverage: avg,
        scorePercent: percentage,
      };
    });

    // Summary archetypes and feedback
    const feedbackList = [
      'คุณมีจุดเด่นด้านวินัยและการปฏิบัติตามมาตรฐานความปลอดภัย ซึ่งเป็นคุณสมบัติที่จำเป็นอย่างยิ่งสำหรับศูนย์ปฏิบัติการข้อมูล (Data Center)',
      'การทำงานร่วมกับทีมของคุณสะท้อนความสามารถในการสื่อสารและประสานงานได้อย่างราบรื่นในสภาพแวดล้อมที่มีความกดดัน',
      'เพื่อเสริมศักยภาพให้ดียิ่งขึ้น แนะนำฝึกการสื่อสารทางเทคนิคเป็นภาษาอังกฤษในสถานการณ์ฉุกเฉินและบทสนทนาการส่งมอบงาน (Shift Handover)',
    ];

    // Award XP
    const xpEarned = 50;
    await prisma.userStatistic.upsert({
      where: { userId },
      create: { userId, xp: xpEarned },
      update: { xp: { increment: xpEarned } },
    });

    res.json({
      success: true,
      data: {
        totalAnswered: allResponses.length,
        radarProfile,
        insights: feedbackList,
        disclaimer:
          'คำชี้แจง: ผลการประเมินนี้จัดทำขึ้นเพื่อเป็นข้อมูลสะท้อนตัวเอง (Self-reflection) และเพื่อฝึกทักษะการอ่านภาษาอังกฤษเชิงวิชาชีพเท่านั้น ไม่ใช่เครื่องมือวินิจฉัยทางจิตวิทยา และไม่อ้างว่าสามารถทำนายการผ่านสัมภาษณ์งานได้',
        xpEarned,
      },
    });
  } catch (error: any) {
    console.error('Personality error:', error);
    res.status(500).json({ success: false, error: 'Failed to submit personality assessment' });
  }
});

export default router;

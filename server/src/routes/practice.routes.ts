import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// ----------------------------------------------------
// 6.2 GRAMMAR PRACTICE
// ----------------------------------------------------
router.get('/grammar', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    let topics = await prisma.topic.findMany({
      where: {
        category: { code: 'GRAMMAR' },
      },
      include: {
        questions: {
          take: 10,
          include: {
            options: true,
          },
        },
      },
    });

    if (topics.length === 0) {
      // Find grammar questions from TOEIC_PART_5 (44 items)
      const grammarQuestions = await prisma.question.findMany({
        where: {
          category: { code: 'TOEIC_PART_5' },
          isPublished: true,
        },
        include: {
          options: true,
        },
      });

      // Split into 4 structured grammar topics
      const topicDefs = [
        {
          id: 'topic-pos',
          name: 'Parts of Speech & Word Form',
          nameTh: 'หน้าที่ของคำและรูปคำ (Word Form & Parts of Speech)',
          description: 'ฝึกการแยกคำนาม คำกริยา คุณศัพท์ และกริยาวิเศษณ์ในประโยคงานช่าง',
        },
        {
          id: 'topic-tenses',
          name: 'Tenses & Subject-Verb Agreement',
          nameTh: 'กาลและความสอดคล้องประธาน-กริยา (Tenses & S-V Agreement)',
          description: 'การเลือกรูปกริยาให้ถูกต้องตามประธานและช่วงเวลาที่เกิดเหตุการณ์',
        },
        {
          id: 'topic-passive',
          name: 'Passive Voice & Modals',
          nameTh: 'รูปถูกกระทำและกริยาช่วย (Passive Voice & Modal Verbs)',
          description: 'โครงสร้างประโยคมาตรฐานในเอกสารคู่มือปฏิบัติงาน SOP และความปลอดภัย',
        },
        {
          id: 'topic-prep',
          name: 'Prepositions & Connectors',
          nameTh: 'คำบุพบทและคำเชื่อม (Prepositions & Logical Connectors)',
          description: 'การใช้คำบุพบทบอกเวลา สถานที่ และคำเชื่อมแสดงเหตุผลในโรงงาน',
        },
      ];

      const chunkSize = Math.ceil(grammarQuestions.length / topicDefs.length);
      topics = topicDefs.map((td, idx) => ({
        id: td.id,
        categoryId: 'GRAMMAR',
        name: td.name,
        nameTh: td.nameTh,
        description: td.description,
        createdAt: new Date(),
        questions: grammarQuestions.slice(idx * chunkSize, (idx + 1) * chunkSize),
      })) as any;
    }

    res.json({ success: true, data: topics });
  } catch (error: any) {
    console.error('Grammar fetch error:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch grammar practice' });
  }
});

// ----------------------------------------------------
// 6.3 LISTENING PRACTICE
// ----------------------------------------------------
router.get('/listening', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const listeningGroups = await prisma.questionGroup.findMany({
      where: {
        contextType: { in: ['AUDIO_CONVERSATION', 'TALK', 'ANNOUNCEMENT'] },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.json({ success: true, data: listeningGroups });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch listening sets' });
  }
});

// ----------------------------------------------------
// 6.4 SPEAKING PRACTICE
// ----------------------------------------------------
router.get('/speaking/prompts', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const prompts = [
      {
        id: 'sp-1',
        category: 'Workplace Incident',
        targetText: 'The secondary cooling pump has stopped due to a power fluctuation.',
        targetTextTh: 'ปั๊มหล่อเย็นสำรองหยุดทำงานเนื่องจากความผันผวนของแรงดันไฟฟ้า',
        phonetics: 'ðə ˈsɛkənˌdɛri ˈkulɪŋ pʌmp hæz stɑpt du tu ə ˈpaʊər ˌflʌktʃuˈeɪʃən',
        focusWords: ['secondary', 'cooling pump', 'fluctuation'],
      },
      {
        id: 'sp-2',
        category: 'Data Center Safety',
        targetText: 'Please ensure that the server rack doors are securely closed and locked.',
        targetTextTh: 'โปรดตรวจสอบให้แน่ใจว่าประตูกล่องเซิร์ฟเวอร์ปิดสนิทและล็อคเรียบร้อย',
        phonetics: 'pliz ɪnˈʃʊr ðæt ðə ˈsɜrvər ræk dɔrz ɑr sɪˈkjʊrli kloʊzd ænd lɑkt',
        focusWords: ['ensure', 'securely', 'locked'],
      },
      {
        id: 'sp-3',
        category: 'Maintenance Handover',
        targetText: 'Routine inspection for the backup generator has been completed successfully.',
        targetTextTh: 'การตรวจเช็คตามรอบสำหรับเครื่องกำเนิดไฟฟ้าสำรองเสร็จสิ้นเรียบร้อยแล้ว',
        phonetics: 'ruˈtin ɪnˈspɛkʃən fɔr ðə ˈbæˌkʌp ˈʤɛnəˌreɪtər hæz bɪn kəmˈplitəd səkˈsɛsfəli',
        focusWords: ['routine inspection', 'backup generator', 'successfully'],
      },
      {
        id: 'sp-4',
        category: 'Supervision & Help',
        targetText: 'Could you please verify the voltage reading on distribution panel B?',
        targetTextTh: 'คุณช่วยตรวจสอบค่าแรงดันไฟฟ้าที่แผงจ่ายไฟ B ได้ไหมครับ?',
        phonetics: 'kʊd ju pliz ˈvɛrəˌfaɪ ðə ˈvoʊltəʤ ˈridɪŋ ɑn ˌdɪstrəˈbjuʃən ˈpænəl bi',
        focusWords: ['verify', 'voltage reading', 'distribution panel'],
      },
      {
        id: 'sp-5',
        category: 'Job Interview',
        targetText: 'I have three years of experience in computer hardware troubleshooting and network diagnostics.',
        targetTextTh: 'ผมมีประสบการณ์ 3 ปีในการแก้ไขปัญหาฮาร์ดแวร์คอมพิวเตอร์และการตรวจสอบเครือข่าย',
        phonetics: 'aɪ hæv θri jɪrz ʌv ɪkˈspɪriəns ɪn kəmˈpjutər ˈhɑrˌdwɛr ˈtrʌbəlˌʃutɪŋ ænd ˈnɛˌtwɜrk ˌdaɪəɡˈnɑstɪks',
        focusWords: ['troubleshooting', 'diagnostics', 'experience'],
      },
    ];

    res.json({ success: true, data: prompts });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch speaking prompts' });
  }
});

// Compare transcribed speech against target text (Rule-based text diff)
router.post('/speaking/evaluate', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { targetText, transcribedText } = req.body;

    if (!targetText || transcribedText === undefined) {
      res.status(400).json({ success: false, error: 'Target text and transcribed text are required' });
      return;
    }

    const clean = (str: string) =>
      str
        .toLowerCase()
        .replace(/[.,/#!$%^&*;:{}=\-_`~()?"']/g, '')
        .trim()
        .split(/\s+/);

    const targetWords = clean(targetText);
    const spokenWords = clean(transcribedText);

    let matchCount = 0;
    const missingWords: string[] = [];
    const matchedWords: string[] = [];

    for (const tw of targetWords) {
      if (spokenWords.includes(tw)) {
        matchCount += 1;
        matchedWords.push(tw);
      } else {
        missingWords.push(tw);
      }
    }

    const accuracyScore = targetWords.length > 0 ? Math.round((matchCount / targetWords.length) * 100) : 0;

    // Save attempt to database
    await prisma.speakingAttempt.create({
      data: {
        userId,
        targetText,
        transcribedText,
        accuracyScore,
        missingWords: JSON.stringify(missingWords),
      },
    });

    // Reward XP if accuracy >= 70%
    let xpEarned = 0;
    if (accuracyScore >= 70) {
      xpEarned = 15;
      await prisma.userStatistic.upsert({
        where: { userId },
        create: { userId, xp: xpEarned },
        update: { xp: { increment: xpEarned } },
      });
    }

    res.json({
      success: true,
      data: {
        accuracyScore,
        matchedWords,
        missingWords,
        feedbackTh:
          accuracyScore >= 80
            ? 'ยอดเยี่ยมมาก! การออกเสียงและคำศัพท์ส่วนใหญ่ถูกต้องชัดเจน'
            : accuracyScore >= 60
            ? 'ทำได้ดี! ยังมีบางคำที่ระบบจับเสียงไม่ตรง ลองฟังเสียงตัวอย่างแล้วฝึกซ้ำอีกครั้ง'
            : 'ยังต้องฝึกฝนเพิ่มเติม ลองพูดให้ชัดเจนและช้าลงเล็กน้อย',
        xpEarned,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to evaluate speaking attempt' });
  }
});

// ----------------------------------------------------
// 6.5 READING PRACTICE
// ----------------------------------------------------
router.get('/reading', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const readingGroups = await prisma.questionGroup.findMany({
      where: {
        contextType: { in: ['READING_PASSAGE', 'NOTICE', 'INVOICE', 'MANUAL'] },
      },
      include: {
        questions: {
          include: {
            options: true,
          },
        },
      },
    });

    res.json({ success: true, data: readingGroups });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch reading exercises' });
  }
});

// ----------------------------------------------------
// 6.6 WRITING PRACTICE (Rule-based Evaluator)
// ----------------------------------------------------
router.post('/writing/evaluate-report', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!.userId;
    const { reportType, userText } = req.body;

    if (!userText || typeof userText !== 'string' || userText.trim().length === 0) {
      res.status(400).json({ success: false, error: 'Text content is required' });
      return;
    }

    const trimmed = userText.trim();
    const wordCount = trimmed.split(/\s+/).length;
    const sentences = trimmed.split(/[.!?]+/).filter((s) => s.trim().length > 0);

    const checks: { label: string; passed: boolean; messageTh: string }[] = [];

    // Check 1: Minimum word count
    const minWords = reportType === 'INCIDENT' ? 35 : 25;
    checks.push({
      label: 'ความยาวขั้นต่ำ',
      passed: wordCount >= minWords,
      messageTh:
        wordCount >= minWords
          ? `ผ่านเกณฑ์ (${wordCount} คำ)`
          : `ความยาวสั้นเกินไป ควรมีอย่างน้อย ${minWords} คำ (ปัจจุบันมี ${wordCount} คำ)`,
    });

    // Check 2: Equipment / Location identifiers
    const lower = trimmed.toLowerCase();
    const hasEquipment =
      lower.includes('server') ||
      lower.includes('rack') ||
      lower.includes('pump') ||
      lower.includes('generator') ||
      lower.includes('ups') ||
      lower.includes('chiller') ||
      lower.includes('switch') ||
      lower.includes('cable') ||
      lower.includes('panel') ||
      lower.includes('hvac');

    checks.push({
      label: 'การระบุอุปกรณ์หรือตำแหน่ง (Equipment / Location)',
      passed: hasEquipment,
      messageTh: hasEquipment
        ? 'ระบุอุปกรณ์หรือตำแหน่งชัดเจน'
        : 'ควรระบุชื่ออุปกรณ์ เช่น Server, Rack, UPS, Chiller หรือ Panel',
    });

    // Check 3: Issue description / Symptoms
    const hasIssue =
      lower.includes('error') ||
      lower.includes('warning') ||
      lower.includes('failed') ||
      lower.includes('leak') ||
      lower.includes('noise') ||
      lower.includes('temperature') ||
      lower.includes('high') ||
      lower.includes('offline') ||
      lower.includes('fault') ||
      lower.includes('overheat');

    checks.push({
      label: 'การระบุอาการหรือปัญหา (Symptom / Fault)',
      passed: hasIssue,
      messageTh: hasIssue
        ? 'ระบุอาการความผิดปกติชัดเจน'
        : 'ควรระบุอาการ เช่น failed, abnormal noise, high temperature, offline หรือ warning',
    });

    // Check 4: Action taken or Next steps
    const hasAction =
      lower.includes('inspect') ||
      lower.includes('replace') ||
      lower.includes('reboot') ||
      lower.includes('restart') ||
      lower.includes('isolate') ||
      lower.includes('escalat') ||
      lower.includes('inform') ||
      lower.includes('notify') ||
      lower.includes('check');

    checks.push({
      label: 'การระบุแนวทางแก้ไขหรือส่งต่องาน (Action / Escalation)',
      passed: hasAction,
      messageTh: hasAction
        ? 'มีขั้นตอนการแก้ไขหรือแจ้งผู้เกี่ยวข้อง'
        : 'ควรระบุสิ่งที่ได้ดำเนินการแล้วหรือต้องทำต่อ เช่น inspected, replaced, notified supervisor',
    });

    // Check 5: Sentence Structure
    checks.push({
      label: 'โครงสร้างประโยค',
      passed: sentences.length >= 3,
      messageTh:
        sentences.length >= 3
          ? `แบ่งประโยคเรียบร้อย (${sentences.length} ประโยค)`
          : 'ควรมีประโยคอย่างน้อย 3 ประโยค (ประธาน กริยา จุดจบประโยค)',
    });

    const passedChecks = checks.filter((c) => c.passed).length;
    const totalChecks = checks.length;
    const score = Math.round((passedChecks / totalChecks) * 100);

    let xpEarned = 0;
    if (score >= 60) {
      xpEarned = 20;
      await prisma.userStatistic.upsert({
        where: { userId },
        create: { userId, xp: xpEarned },
        update: { xp: { increment: xpEarned } },
      });
    }

    res.json({
      success: true,
      data: {
        score,
        wordCount,
        sentencesCount: sentences.length,
        checks,
        modelSample:
          'At 03:30, temperature sensor in Rack A-04 triggered a high-temperature alert (38°C). Upon inspection, the secondary exhaust fan was stopped. The fan assembly was replaced with spare unit #F-12 and normal airflow was restored. Incident logged and supervisor informed.',
        xpEarned,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to evaluate report' });
  }
});

export default router;

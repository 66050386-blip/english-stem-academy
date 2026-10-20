import { Router, Response } from 'express';
import { prisma } from '../lib/prisma';
import { authenticate, requireRole, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Protect all admin endpoints with ADMIN role requirement
router.use(authenticate, requireRole('ADMIN'));

// Get admin system overview statistics
router.get('/overview', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const [userCount, questionCount, vocabCount, lessonCount, examCount] = await Promise.all([
      prisma.user.count(),
      prisma.question.count(),
      prisma.vocabulary.count(),
      prisma.lesson.count(),
      prisma.examSession.count(),
    ]);

    res.json({
      success: true,
      data: {
        userCount,
        questionCount,
        vocabCount,
        lessonCount,
        examCount,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch admin overview' });
  }
});

// List users with pagination and role management
router.get('/users', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { page = '1', limit = '20', search } = req.query;
    const pageNum = parseInt(page as string, 10) || 1;
    const take = parseInt(limit as string, 10) || 20;
    const skip = (pageNum - 1) * take;

    const where: any = {};
    if (search) {
      where.OR = [
        { name: { contains: search as string } },
        { email: { contains: search as string } },
      ];
    }

    const [total, users] = await Promise.all([
      prisma.user.count({ where }),
      prisma.user.findMany({
        where,
        skip,
        take,
        orderBy: { createdAt: 'desc' },
        include: {
          profile: true,
          statistics: true,
          streak: true,
        },
      }),
    ]);

    const todayStr = new Date().toISOString().split('T')[0];
    res.json({
      success: true,
      data: {
        total,
        page: pageNum,
        totalPages: Math.ceil(total / take),
        users: users.map((u) => {
          let unlocked: string[] = [];
          try {
            unlocked = JSON.parse(u.profile?.unlockedItems || '[]');
          } catch {}
          return {
            id: u.id,
            name: u.name,
            email: u.email,
            role: u.role,
            createdAt: u.createdAt,
            englishLevel: u.profile?.englishLevel,
            targetTrack: u.profile?.targetTrack,
            xp: u.statistics?.xp || 0,
            level: u.statistics?.level || 0,
            coins: u.statistics?.coins || 0,
            gems: u.statistics?.gems ?? 50,
            isVip: Boolean(u.statistics?.isVip || u.role === 'ADMIN'),
            streak: u.streak?.currentStreak || 0,
            longestStreak: u.streak?.longestStreak || 0,
            lastClaimDate: u.streak?.lastClaimDate || null,
            hasClaimedChestToday: Boolean(u.streak?.lastClaimDate === todayStr),
            unlockedItems: unlocked,
          };
        }),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch users' });
  }
});

// Update user role (e.g. promote to ADMIN or demote to STUDENT)
router.put('/users/:id/role', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    if (!['STUDENT', 'INSTRUCTOR', 'ADMIN'].includes(role)) {
      res.status(400).json({ success: false, error: 'Invalid role specified' });
      return;
    }

    const updated = await prisma.user.update({
      where: { id },
      data: { role },
      select: { id: true, name: true, email: true, role: true },
    });

    res.json({ success: true, data: updated });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update user role' });
  }
});

// Grant, deduct, or set gifts, economy, streak, and reset cooldown for any player
router.post('/gifts', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const {
      targetUserId,
      addCoins,
      setCoins,
      addGems,
      setGems,
      addXp,
      setXp,
      addStreak,
      setStreak,
      resetStreak,
      resetGiftCooldown,
      setGiftClaimed,
      setVip,
      reason,
      unlockDragonSet,
      revokeDragonSet,
    } = req.body;

    if (!targetUserId) {
      res.status(400).json({ success: false, error: 'Target user ID is required' });
      return;
    }

    const targetUser = await prisma.user.findUnique({
      where: { id: targetUserId },
      include: { statistics: true, profile: true, streak: true },
    });

    if (!targetUser) {
      res.status(404).json({ success: false, error: 'Target user not found' });
      return;
    }

    const todayStr = new Date().toISOString().split('T')[0];

    // 1. Calculate Economy & XP
    const currentCoins = targetUser.statistics?.coins ?? 0;
    const currentGems = targetUser.statistics?.gems ?? 50;
    const currentXp = targetUser.statistics?.xp ?? 0;
    const currentLevel = targetUser.statistics?.level ?? 0;

    let newCoins = currentCoins;
    if (typeof setCoins === 'number') {
      newCoins = Math.max(0, Math.floor(setCoins));
    } else if (typeof addCoins === 'number' && addCoins !== 0) {
      newCoins = Math.max(0, currentCoins + Math.floor(addCoins));
    }

    let newGems = currentGems;
    if (typeof setGems === 'number') {
      newGems = Math.max(0, Math.floor(setGems));
    } else if (typeof addGems === 'number' && addGems !== 0) {
      newGems = Math.max(0, currentGems + Math.floor(addGems));
    }

    let newXp = currentXp;
    if (typeof setXp === 'number') {
      newXp = Math.max(0, Math.floor(setXp));
    } else if (typeof addXp === 'number' && addXp !== 0) {
      newXp = Math.max(0, currentXp + Math.floor(addXp));
    }

    const newLevel = Math.max(0, Math.floor(newXp / 100));

    let updatedVip = targetUser.statistics?.isVip ?? false;
    if (typeof setVip === 'boolean') {
      updatedVip = setVip;
    }

    // 2. Calculate Login Streak
    const currentStreak = targetUser.streak?.currentStreak ?? 0;
    const longestStreak = targetUser.streak?.longestStreak ?? currentStreak;
    let newStreak = currentStreak;

    if (resetStreak === true) {
      newStreak = 0;
    } else if (typeof setStreak === 'number') {
      newStreak = Math.max(0, Math.floor(setStreak));
    } else if (typeof addStreak === 'number' && addStreak !== 0) {
      newStreak = Math.max(0, currentStreak + Math.floor(addStreak));
    }
    const newLongestStreak = Math.max(longestStreak, newStreak);

    // 3. Calculate Daily Gift / Chest Cooldown
    let newLastClaimDate = targetUser.streak?.lastClaimDate ?? null;
    if (resetGiftCooldown === true) {
      newLastClaimDate = null; // Cooldown cleared! User can claim immediately!
    } else if (setGiftClaimed === true) {
      newLastClaimDate = todayStr; // Marked as claimed today
    } else if (setGiftClaimed === false) {
      newLastClaimDate = null;
    }

    // Database updates in transaction
    await prisma.$transaction([
      prisma.userStatistic.upsert({
        where: { userId: targetUser.id },
        update: {
          coins: newCoins,
          gems: newGems,
          xp: newXp,
          level: newLevel,
          isVip: updatedVip,
        },
        create: {
          userId: targetUser.id,
          coins: newCoins,
          gems: newGems,
          xp: newXp,
          level: newLevel,
          isVip: updatedVip,
        },
      }),
      prisma.dailyStreak.upsert({
        where: { userId: targetUser.id },
        update: {
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastClaimDate: newLastClaimDate,
        },
        create: {
          userId: targetUser.id,
          currentStreak: newStreak,
          longestStreak: newLongestStreak,
          lastActivityDate: todayStr,
          lastClaimDate: newLastClaimDate,
        },
      }),
    ]);

    // 4. Handle Dragon Set Equipment Unlock / Revoke
    if (unlockDragonSet || revokeDragonSet) {
      let currentUnlocked: string[] = [];
      try {
        currentUnlocked = JSON.parse(targetUser.profile?.unlockedItems || '[]');
      } catch {}

      const dragonItems = ['DRAGON_HELM', 'DRAGON_ARMOR', 'DRAGON_BLADE', 'DRAGON_BOOTS'];
      let updatedUnlocked: string[];
      if (unlockDragonSet) {
        updatedUnlocked = Array.from(new Set([...currentUnlocked, ...dragonItems]));
      } else {
        updatedUnlocked = currentUnlocked.filter((item) => !dragonItems.includes(item));
      }

      await prisma.userProfile.upsert({
        where: { userId: targetUser.id },
        update: {
          unlockedItems: JSON.stringify(updatedUnlocked),
        },
        create: {
          userId: targetUser.id,
          unlockedItems: JSON.stringify(updatedUnlocked),
        },
      });
    }

    // Build action details description
    const changes: string[] = [];
    if (newCoins !== currentCoins) changes.push(`เหรียญทอง: ${newCoins > currentCoins ? '+' : ''}${newCoins - currentCoins} (${newCoins})`);
    if (newGems !== currentGems) changes.push(`อัญมณี: ${newGems > currentGems ? '+' : ''}${newGems - currentGems} (${newGems})`);
    if (newXp !== currentXp) changes.push(`XP: ${newXp > currentXp ? '+' : ''}${newXp - currentXp} (${newXp})`);
    if (newStreak !== currentStreak) changes.push(`วันเข้าเรียนต่อเนื่อง: ${newStreak > currentStreak ? '+' : ''}${newStreak - currentStreak} วัน (${newStreak} วัน)`);
    if (resetGiftCooldown) changes.push('รีเซ็ตเวลารับของขวัญเรียบร้อย (สามารถเปิดหีบได้ทันที)');
    if (typeof setVip === 'boolean') changes.push(`สถานะ VIP: ${updatedVip ? 'เปิดใช้งาน' : 'ปิดใช้งาน'}`);
    if (unlockDragonSet) changes.push('ปลดล็อกเซ็ตนักรบมังกร');
    if (revokeDragonSet) changes.push('ถอนสิทธิ์เซ็ตนักรบมังกร');

    res.json({
      success: true,
      message: `อัปเดตข้อมูลผู้เล่น ${targetUser.name} สำเร็จ! [${changes.join(', ') || 'ไม่มีการเปลี่ยนแปลง'}]`,
      data: {
        user: {
          id: targetUser.id,
          name: targetUser.name,
          email: targetUser.email,
        },
        newStats: {
          coins: newCoins,
          gems: newGems,
          xp: newXp,
          level: newLevel,
          isVip: updatedVip,
          streak: newStreak,
          longestStreak: newLongestStreak,
          lastClaimDate: newLastClaimDate,
          hasClaimedChestToday: Boolean(newLastClaimDate === todayStr),
        },
        reason: reason || 'ปรับปรุงข้อมูลโดยผู้ดูแลระบบ',
      },
    });
  } catch (error: any) {
    console.error('Error in admin gifts / adjust:', error);
    res.status(500).json({ success: false, error: 'Failed to process admin adjustment or gift' });
  }
});

// Create single question
router.post('/questions', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const {
      categoryId,
      topicId,
      questionText,
      questionTextTh,
      difficulty,
      explanationTh,
      formulaUsed,
      errorType,
      options, // array of { optionKey: 'A', contentEn: '...', contentTh: '...', isCorrect: true }
    } = req.body;

    if (!categoryId || !questionText || !explanationTh || !Array.isArray(options) || options.length < 2) {
      res.status(400).json({ success: false, error: 'Missing required question fields or options' });
      return;
    }

    const question = await prisma.question.create({
      data: {
        categoryId,
        topicId: topicId || null,
        questionText,
        questionTextTh,
        difficulty: difficulty || 'MEDIUM',
        explanationTh,
        formulaUsed,
        errorType: errorType || 'COMPREHENSION',
        options: {
          create: options.map((opt: any, idx: number) => ({
            optionKey: opt.optionKey || ['A', 'B', 'C', 'D'][idx],
            contentEn: opt.contentEn,
            contentTh: opt.contentTh || null,
            isCorrect: !!opt.isCorrect,
            orderIndex: idx,
          })),
        },
      },
      include: {
        options: true,
      },
    });

    res.status(201).json({ success: true, data: question });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to create question' });
  }
});

// Batch import questions via JSON with schema validation
router.post('/questions/batch-import', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { questions } = req.body; // array of question objects

    if (!Array.isArray(questions) || questions.length === 0) {
      res.status(400).json({ success: false, error: 'Questions array is required' });
      return;
    }

    const errors: string[] = [];
    const validItems: any[] = [];

    // Pre-validate
    for (let i = 0; i < questions.length; i++) {
      const q = questions[i];
      if (!q.categoryCode) {
        errors.push(`Row ${i + 1}: Missing categoryCode`);
        continue;
      }
      if (!q.questionText) {
        errors.push(`Row ${i + 1}: Missing questionText`);
        continue;
      }
      if (!q.explanationTh) {
        errors.push(`Row ${i + 1}: Missing explanationTh`);
        continue;
      }
      if (!Array.isArray(q.options) || q.options.length < 2) {
        errors.push(`Row ${i + 1}: Must provide at least 2 options`);
        continue;
      }
      const hasCorrect = q.options.some((o: any) => o.isCorrect);
      if (!hasCorrect) {
        errors.push(`Row ${i + 1}: Options must contain at least one correct answer`);
        continue;
      }
      validItems.push(q);
    }

    if (errors.length > 0 && validItems.length === 0) {
      res.status(400).json({ success: false, error: 'Validation failed for all items', errors });
      return;
    }

    let importedCount = 0;
    for (const q of validItems) {
      // Find category by code
      const cat = await prisma.category.findUnique({
        where: { code: q.categoryCode },
      });

      if (!cat) {
        errors.push(`Category code not found: ${q.categoryCode}`);
        continue;
      }

      await prisma.question.create({
        data: {
          categoryId: cat.id,
          questionText: q.questionText,
          questionTextTh: q.questionTextTh || null,
          difficulty: q.difficulty || 'MEDIUM',
          explanationTh: q.explanationTh,
          formulaUsed: q.formulaUsed || null,
          errorType: q.errorType || 'COMPREHENSION',
          options: {
            create: q.options.map((opt: any, idx: number) => ({
              optionKey: opt.optionKey || ['A', 'B', 'C', 'D'][idx],
              contentEn: opt.contentEn,
              contentTh: opt.contentTh || null,
              isCorrect: !!opt.isCorrect,
              orderIndex: idx,
            })),
          },
        },
      });
      importedCount += 1;
    }

    res.json({
      success: true,
      data: {
        importedCount,
        errors,
      },
    });
  } catch (error: any) {
    console.error('Batch import error:', error);
    res.status(500).json({ success: false, error: 'Failed to batch import questions' });
  }
});

// Create vocabulary
router.post('/vocabulary', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { word, ipa, partOfSpeech, meaningTh, meaningEn, level, category, exampleEn, exampleTh, audioUrl } = req.body;

    if (!word || !meaningTh || !exampleEn || !exampleTh) {
      res.status(400).json({ success: false, error: 'Word, Thai meaning, and examples are required' });
      return;
    }

    const vocab = await prisma.vocabulary.create({
      data: {
        word: word.trim(),
        ipa,
        partOfSpeech: partOfSpeech || 'noun',
        meaningTh,
        meaningEn,
        level: level || 'A1',
        category: category || 'GENERAL',
        exampleEn,
        exampleTh,
        audioUrl,
      },
    });

    res.status(201).json({ success: true, data: vocab });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to create vocabulary' });
  }
});

// Update vocabulary
router.put('/vocabulary/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { word, ipa, partOfSpeech, meaningTh, meaningEn, level, category, exampleEn, exampleTh, audioUrl } = req.body;

    const vocab = await prisma.vocabulary.update({
      where: { id },
      data: {
        word: word?.trim(),
        ipa,
        partOfSpeech,
        meaningTh,
        meaningEn,
        level,
        category,
        exampleEn,
        exampleTh,
        audioUrl,
      },
    });

    res.json({ success: true, data: vocab });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update vocabulary' });
  }
});

// Delete vocabulary
router.delete('/vocabulary/:id', async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    await prisma.vocabulary.delete({ where: { id } });
    res.json({ success: true, message: 'Vocabulary deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to delete vocabulary' });
  }
});

export default router;

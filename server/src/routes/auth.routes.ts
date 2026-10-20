import { Router, Request, Response } from 'express';
import { prisma } from '../lib/prisma';
import { hashPassword, comparePassword, generateToken } from '../utils/auth';
import { authenticate, AuthenticatedRequest } from '../middleware/auth';

const router = Router();

// Register new user
router.post('/register', async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, password, englishLevel, targetTrack } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({ success: false, error: 'Name, email, and password are required' });
      return;
    }

    if (password.length < 4) {
      res.status(400).json({ success: false, error: 'Password must be at least 4 characters long' });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();
    const existing = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    });

    if (existing) {
      res.status(409).json({ success: false, error: 'An account with this email already exists' });
      return;
    }

    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        name: name.trim(),
        email: normalizedEmail,
        passwordHash,
        role: 'STUDENT',
        profile: {
          create: {
            englishLevel: englishLevel || 'A1',
            targetTrack: targetTrack || 'DATA_CENTER',
            dailyGoalMinutes: 30,
          },
        },
        statistics: {
          create: {
            xp: 50, // Welcome bonus
            level: 1,
            vocabMastered: 0,
            lessonsCompleted: 0,
          },
        },
        streak: {
          create: {
            currentStreak: 1,
            longestStreak: 1,
            lastActivityDate: new Date().toISOString().split('T')[0],
          },
        },
      },
      include: {
        profile: true,
        statistics: true,
        streak: true,
      },
    });

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    res.status(201).json({
      success: true,
      data: {
        token,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
          profile: user.profile,
          statistics: user.statistics,
          streak: user.streak,
        },
      },
    });
  } catch (error: any) {
    console.error('Registration error:', error);
    res.status(500).json({ success: false, error: 'Failed to register account' });
  }
});

// Login user
router.post('/login', async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({ success: false, error: 'Email and password are required' });
      return;
    }

    let normalizedEmail = email.toLowerCase().trim();
    if (normalizedEmail === 'student') normalizedEmail = 'student@academy.local';
    if (normalizedEmail === 'admin') normalizedEmail = 'admin@academy.local';

    const user = await prisma.user.findUnique({
      where: { email: normalizedEmail },
      include: {
        profile: true,
        statistics: true,
        streak: true,
      },
    });

    if (!user) {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
      return;
    }

    const isValid = await comparePassword(password, user.passwordHash);
    if (!isValid) {
      res.status(401).json({ success: false, error: 'Invalid email or password' });
      return;
    }

    // Update streak if today is a new day
    const todayStr = new Date().toISOString().split('T')[0];
    if (user.streak) {
      const lastStr = user.streak.lastActivityDate;
      const todayDate = new Date(todayStr);
      const lastDate = new Date(lastStr);
      const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));

      if (diffDays === 1) {
        // Consecutive day!
        const nextStreak = user.streak.currentStreak + 1;
        const longest = Math.max(nextStreak, user.streak.longestStreak);
        await prisma.dailyStreak.update({
          where: { userId: user.id },
          data: {
            currentStreak: nextStreak,
            longestStreak: longest,
            lastActivityDate: todayStr,
          },
        });
      } else if (diffDays > 1) {
        // Streak broken
        await prisma.dailyStreak.update({
          where: { userId: user.id },
          data: {
            currentStreak: 1,
            lastActivityDate: todayStr,
          },
        });
      }
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    });

    // Re-fetch latest streak/stats
    const updatedUser = await prisma.user.findUnique({
      where: { id: user.id },
      include: {
        profile: true,
        statistics: true,
        streak: true,
      },
    });

    res.json({
      success: true,
      data: {
        token,
        user: {
          id: updatedUser!.id,
          name: updatedUser!.name,
          email: updatedUser!.email,
          role: updatedUser!.role,
          profile: updatedUser!.profile,
          statistics: updatedUser!.statistics,
          streak: updatedUser!.streak,
        },
      },
    });
  } catch (error: any) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, error: 'Failed to authenticate user' });
  }
});

// Get current authenticated user
router.get('/me', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
      include: {
        profile: true,
        statistics: true,
        streak: true,
        achievements: {
          include: {
            achievement: true,
          },
        },
      },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    res.json({
      success: true,
      data: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        profile: user.profile,
        statistics: user.statistics,
        streak: user.streak,
        achievements: user.achievements.map((ua) => ua.achievement),
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to fetch user profile' });
  }
});

// Update profile
router.put('/profile', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { name, avatar, bio, englishLevel, targetTrack, dailyGoalMinutes, uiLanguage } = req.body;

    const updated = await prisma.user.update({
      where: { id: req.user!.userId },
      data: {
        name: name ? name.trim() : undefined,
        profile: {
          upsert: {
            create: {
              avatar,
              bio,
              englishLevel: englishLevel || 'A1',
              targetTrack: targetTrack || 'DATA_CENTER',
              dailyGoalMinutes: dailyGoalMinutes || 30,
              uiLanguage: uiLanguage || 'th',
            },
            update: {
              avatar: avatar !== undefined ? avatar : undefined,
              bio: bio !== undefined ? bio : undefined,
              englishLevel: englishLevel !== undefined ? englishLevel : undefined,
              targetTrack: targetTrack !== undefined ? targetTrack : undefined,
              dailyGoalMinutes: dailyGoalMinutes !== undefined ? dailyGoalMinutes : undefined,
              uiLanguage: uiLanguage !== undefined ? uiLanguage : undefined,
            },
          },
        },
      },
      include: {
        profile: true,
        statistics: true,
        streak: true,
      },
    });

    res.json({
      success: true,
      data: {
        id: updated.id,
        name: updated.name,
        email: updated.email,
        role: updated.role,
        profile: updated.profile,
        statistics: updated.statistics,
        streak: updated.streak,
      },
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to update profile' });
  }
});

// Change password
router.put('/change-password', authenticate, async (req: AuthenticatedRequest, res: Response): Promise<void> => {
  try {
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      res.status(400).json({ success: false, error: 'Current and new password are required' });
      return;
    }

    if (newPassword.length < 6) {
      res.status(400).json({ success: false, error: 'New password must be at least 6 characters' });
      return;
    }

    const user = await prisma.user.findUnique({
      where: { id: req.user!.userId },
    });

    if (!user) {
      res.status(404).json({ success: false, error: 'User not found' });
      return;
    }

    const isValid = await comparePassword(currentPassword, user.passwordHash);
    if (!isValid) {
      res.status(400).json({ success: false, error: 'Current password does not match' });
      return;
    }

    const passwordHash = await hashPassword(newPassword);
    await prisma.user.update({
      where: { id: user.id },
      data: { passwordHash },
    });

    res.json({ success: true, message: 'Password changed successfully' });
  } catch (error: any) {
    res.status(500).json({ success: false, error: 'Failed to change password' });
  }
});

export default router;

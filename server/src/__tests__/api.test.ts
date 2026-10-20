import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import app from '../index';
import { calculateSM2 } from '../utils/sm2';
import { hashPassword, comparePassword, generateToken, verifyToken } from '../utils/auth';

describe('Auth & Cryptography Utilities', () => {
  it('should correctly hash and verify passwords', async () => {
    const raw = 'TechPass#2026';
    const hash = await hashPassword(raw);
    expect(hash).not.toBe(raw);
    const isMatch = await comparePassword(raw, hash);
    expect(isMatch).toBe(true);
    const isWrong = await comparePassword('wrongPass', hash);
    expect(isWrong).toBe(false);
  });

  it('should generate and verify JWT tokens', () => {
    const payload = { userId: 'test-user-123', email: 'test@academy.local', role: 'STUDENT' };
    const token = generateToken(payload);
    expect(typeof token).toBe('string');
    const verified = verifyToken(token);
    expect(verified).not.toBeNull();
    expect(verified?.userId).toBe('test-user-123');
    expect(verified?.role).toBe('STUDENT');
  });
});

describe('SuperMemo-2 (SM-2) Spaced Repetition Algorithm', () => {
  it('should increase interval and repetition count on successful recall (Rating 4)', () => {
    const initial = { rating: 4, repetitions: 0, easeFactor: 2.5, intervalDays: 1 };
    const step1 = calculateSM2(initial);
    expect(step1.repetitions).toBe(1);
    expect(step1.intervalDays).toBe(1);

    const step2 = calculateSM2({ ...step1, rating: 4 });
    expect(step2.repetitions).toBe(2);
    expect(step2.intervalDays).toBe(6);

    const step3 = calculateSM2({ ...step2, rating: 5 });
    expect(step3.repetitions).toBe(3);
    expect(step3.intervalDays).toBeGreaterThan(6);
  });

  it('should reset repetitions to 0 on recall failure (Rating 1)', () => {
    const failed = calculateSM2({ rating: 1, repetitions: 4, easeFactor: 2.5, intervalDays: 15 });
    expect(failed.repetitions).toBe(0);
    expect(failed.intervalDays).toBe(1);
  });
});

describe('Backend API Endpoints Integration', () => {
  let studentToken = '';

  it('GET /api/health should return ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
    expect(res.body.service).toContain('Learning Academy');
  });

  it('POST /api/auth/login should authenticate student and return token', async () => {
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'student', password: '1234' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.token).toBeDefined();
    expect(res.body.data.user.email).toBe('student@academy.local');
    studentToken = res.body.data.token;
  });

  it('GET /api/dashboard should return populated dashboard stats', async () => {
    const res = await request(app)
      .get('/api/dashboard')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.stats).toBeDefined();
    expect(res.body.data.skillRadar).toBeInstanceOf(Array);
  });

  it('GET /api/courses should list courses with modules and lessons count', async () => {
    const res = await request(app)
      .get('/api/courses')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBeGreaterThan(0);
  });

  it('GET /api/vocabulary should list vocabulary words with search and pagination', async () => {
    const res = await request(app)
      .get('/api/vocabulary?limit=10')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.items.length).toBe(10);
    expect(res.body.data.total).toBeGreaterThanOrEqual(300);
  });

  it('GET /api/toeic/overview should return question counts for Part 1 through 7', async () => {
    const res = await request(app)
      .get('/api/toeic/overview')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(7);
  });

  it('GET /api/stem/overview should return Science, Technology, Engineering, Mathematics', async () => {
    const res = await request(app)
      .get('/api/stem/overview')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.length).toBe(4);
  });

  it('GET /api/wardrobe should return 22 wardrobe items, topup packages, and student level 0', async () => {
    const res = await request(app)
      .get('/api/wardrobe')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.catalog.length).toBe(22);
    expect(res.body.data.topupPackages.length).toBe(4);
    expect(res.body.data.equipped).toBeDefined();
    expect(res.body.data.level).toBeGreaterThanOrEqual(0);
    expect(res.body.data.gems).toBeGreaterThanOrEqual(50);
  });

  it('POST /api/wardrobe/topup should simulate coin purchase and grant VIP status', async () => {
    const res = await request(app)
      .post('/api/wardrobe/topup')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ packageId: 'COIN_WARRIOR' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.data.coins).toBeGreaterThanOrEqual(1200);
    expect(res.body.data.isVip).toBe(true);
  });

  it('POST /api/wardrobe/admin/adjust should be forbidden for regular students', async () => {
    const res = await request(app)
      .post('/api/wardrobe/admin/adjust')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ action: 'add_gems', gemsDelta: 100 });

    expect(res.status).toBe(403);
  });

  it('POST /api/wardrobe/claim-daily should grant rewards on first claim and reject repeated claims', async () => {
    // First claim of the day
    const firstClaim = await request(app)
      .post('/api/wardrobe/claim-daily')
      .set('Authorization', `Bearer ${studentToken}`);

    // If already claimed in previous run or first time:
    if (firstClaim.status === 200) {
      expect(firstClaim.body.success).toBe(true);
      expect(firstClaim.body.claimedDailyToday).toBe(true);
    } else {
      expect(firstClaim.status).toBe(400);
      expect(firstClaim.body.alreadyClaimed).toBe(true);
    }

    // Repeated claim MUST be rejected with HTTP 400
    const secondClaim = await request(app)
      .post('/api/wardrobe/claim-daily')
      .set('Authorization', `Bearer ${studentToken}`);

    expect(secondClaim.status).toBe(400);
    expect(secondClaim.body.alreadyClaimed).toBe(true);
    expect(secondClaim.body.error).toContain('รับได้วันละ 1 ครั้งเท่านั้น');
  });

  it('POST /api/wardrobe/equip should equip owned item and return equipped object directly', async () => {
    const res = await request(app)
      .post('/api/wardrobe/equip')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({ category: 'shoes', itemId: 'SNEAKERS' });

    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.equipped).toBeDefined();
    expect(res.body.equipped.shoes).toBe('SNEAKERS');
  });

  it('Admin login & POST /api/wardrobe/admin/adjust should allow admin God Mode', async () => {
    const adminLogin = await request(app)
      .post('/api/auth/login')
      .send({ email: 'admin', password: '1234' });

    expect(adminLogin.status).toBe(200);
    const adminToken = adminLogin.body.data.token;
    expect(adminLogin.body.data.user.role).toBe('ADMIN');

    const adjustRes = await request(app)
      .post('/api/wardrobe/admin/adjust')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ addCoins: 1000, setVip: true });

    expect(adjustRes.status).toBe(200);
    expect(adjustRes.body.success).toBe(true);
    expect(adjustRes.body.data.isVip).toBe(true);
  });
});


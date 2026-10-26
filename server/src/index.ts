import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import authRoutes from './routes/auth.routes';
import dashboardRoutes from './routes/dashboard.routes';
import courseRoutes from './routes/course.routes';
import vocabRoutes from './routes/vocabulary.routes';
import practiceRoutes from './routes/practice.routes';
import toeicRoutes from './routes/toeic.routes';
import stemRoutes from './routes/stem.routes';
import logicRoutes from './routes/logic.routes';
import personalityRoutes from './routes/personality.routes';
import examRoutes from './routes/exam.routes';
import analyticsRoutes from './routes/analytics.routes';
import adminRoutes from './routes/admin.routes';
import { wardrobeRouter } from './routes/wardrobe.routes';
import { errorHandler, notFoundHandler } from './middleware/error';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3333;

// Middleware - Cloud and Local Flexible CORS
const corsOriginEnv = process.env.CORS_ORIGIN;
app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, mobile apps, same-origin, health checks)
      if (!origin) return callback(null, true);
      if (!corsOriginEnv || corsOriginEnv === '*') return callback(null, true);
      const allowed = corsOriginEnv.split(',').map((o) => o.trim().toLowerCase());
      if (allowed.includes(origin.toLowerCase()) || allowed.includes('*')) {
        return callback(null, true);
      }
      return callback(null, true);
    },
    credentials: true,
  })
);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API Landing Route (Moved to /api so root / serves the Frontend UI)
app.get('/api', (req, res) => {
  res.json({
    name: '🦞 English & STEM Learning Academy API',
    status: 'ONLINE',
    version: '1.0.0',
    healthCheck: '/api/health',
    endpoints: {
      auth: '/api/auth/login',
      dashboard: '/api/dashboard',
      courses: '/api/courses',
      vocabulary: '/api/vocabulary',
      practice: '/api/practice',
      exams: '/api/exams',
    },
    message: 'Backend API is running smoothly on Render & connected to Supabase PostgreSQL!',
    timestamp: new Date().toISOString(),
  });
});

// Health Check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'English & STEM Learning Academy API',
  });
});

// Register API Routes
app.use('/api/auth', authRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/vocabulary', vocabRoutes);
app.use('/api/practice', practiceRoutes);
app.use('/api/toeic', toeicRoutes);
app.use('/api/stem', stemRoutes);
app.use('/api/logic', logicRoutes);
app.use('/api/personality', personalityRoutes);
app.use('/api/exams', examRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/wardrobe', wardrobeRouter);

// Serve Frontend Static Web Application if built
const publicDir = path.resolve(__dirname, '..', 'public');
if (fs.existsSync(publicDir)) {
  app.use(express.static(publicDir));
  app.get('*', (req, res, next) => {
    if (req.path.startsWith('/api')) {
      return next();
    }
    res.sendFile(path.join(publicDir, 'index.html'));
  });
}

// Error Handlers
app.use(notFoundHandler);
app.use(errorHandler);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`====================================================`);
    console.log(`  English & STEM Learning Academy API running on port ${PORT}`);
    console.log(`  Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Health Check: http://localhost:${PORT}/api/health`);
    console.log(`====================================================`);
  });
}

export default app;

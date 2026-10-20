import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import {
  BarChart3,
  TrendingUp,
  Brain,
  AlertTriangle,
  Award,
  Sparkles,
  BookOpen,
  CheckCircle2,
  Clock,
  Layers,
  Flame,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Cell,
} from 'recharts';

export const AnalyticsPage: React.FC = () => {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const data = await api.analytics.getStats();
      setAnalytics(data);
    } catch (err) {
      console.error('Failed to load analytics', err);
    } finally {
      setLoading(false);
    }
  };

  const COLORS = ['#0270c7', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          การวิเคราะห์ผลการเรียน (Learning Analytics)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ติดตามจุดแข็ง-จุดอ่อน สถิติความแม่นยำรายหมวดหมู่ และแนวทางปรับปรุงทักษะเฉพาะบุคคล
        </p>
      </div>

      {loading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : !analytics ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <p className="text-slate-500">ไม่สามารถโหลดข้อมูลสถิติได้</p>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Key KPI Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">ความแม่นยำรวม</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                  <TrendingUp className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white">
                {analytics.overallAccuracy}%
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                จากการทำข้อสอบและแบบฝึกหัดทั้งหมด {analytics.totalQuestions} ข้อ
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">คำศัพท์ที่เชี่ยวชาญ</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400">
                  <Layers className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {analytics.vocabRepetitions?.mastered || 0} คำ
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                ทบทวนซ้ำมากกว่า 3 รอบ (SM-2 Mastered)
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">ระดับ & ค่าประสบการณ์</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-400">
                  <Sparkles className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-amber-500">
                Level {user?.statistics?.level || 1}
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                สะสม {user?.statistics?.xp || 0} XP
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500">บทเรียนที่เรียนจบ</span>
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-400">
                  <BookOpen className="h-4 w-4" />
                </div>
              </div>
              <p className="mt-3 text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                {user?.statistics?.lessonsCompleted || 0} บท
              </p>
              <p className="mt-1 text-[11px] text-slate-400">
                จากหลักสูตรทั้งหมดในสถาบัน
              </p>
            </div>
          </div>

          {/* Charts Row */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
            {/* Category Accuracy Bar Chart */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-7">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                ความแม่นยำแยกตามหมวดวิชา (%)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                เปรียบเทียบอัตราการตอบถูกในแต่ละหมวดความรู้
              </p>

              <div className="mt-6 h-64 w-full">
                {analytics.categoryBreakdown?.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={analytics.categoryBreakdown}
                      margin={{ top: 10, right: 10, left: -20, bottom: 20 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                      <XAxis
                        dataKey="nameTh"
                        tick={{ fill: '#64748b', fontSize: 10 }}
                        angle={-15}
                        textAnchor="end"
                      />
                      <YAxis
                        domain={[0, 100]}
                        tick={{ fill: '#64748b', fontSize: 10 }}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: '#0f172a',
                          borderColor: '#1e293b',
                          borderRadius: '12px',
                          fontSize: '12px',
                          color: '#fff',
                        }}
                        formatter={(val: any) => [`${val}%`, 'ความแม่นยำ']}
                      />
                      <Bar dataKey="accuracy" radius={[6, 6, 0, 0]}>
                        {analytics.categoryBreakdown.map((_: any, index: number) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex h-full items-center justify-center text-xs text-slate-400">
                    ยังไม่มีข้อมูลผลการสอบเพียงพอสำหรับการสร้างกราฟ
                  </div>
                )}
              </div>
            </div>

            {/* Error Type Breakdown */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 lg:col-span-5">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                รูปแบบข้อผิดพลาดที่พบบ่อย (Error Breakdown)
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                จำแนกประเภทจุดที่ตอบผิดเพื่อการฝึกฝนตรงจุด
              </p>

              <div className="mt-6 space-y-3">
                {analytics.errorBreakdown?.map((errItem: any) => {
                  const maxErr = Math.max(
                    1,
                    ...analytics.errorBreakdown.map((e: any) => e.count)
                  );
                  const percent = Math.round((errItem.count / maxErr) * 100);

                  return (
                    <div key={errItem.errorType} className="space-y-1">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-semibold text-slate-700 dark:text-slate-300">
                          {errItem.labelTh}
                        </span>
                        <span className="font-mono text-slate-500">
                          {errItem.count} ครั้ง
                        </span>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                        <div
                          className="h-full rounded-full bg-rose-500"
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Actionable Recommendations Callout */}
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
              <Brain className="h-5 w-5 text-primary-600" />
              <h3 className="font-bold text-slate-900 dark:text-white">
                คำแนะนำในการพัฒนาทักษะ (Personalized Recommendations)
              </h3>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {analytics.recommendations && analytics.recommendations.length > 0 ? (
                analytics.recommendations.map((rec: string, rIdx: number) => (
                  <div
                    key={rIdx}
                    className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-3.5 text-xs text-slate-700 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-300"
                  >
                    <CheckCircle2 className="h-4 w-4 shrink-0 text-primary-600 dark:text-primary-400 mt-0.5" />
                    <span>{rec}</span>
                  </div>
                ))
              ) : (
                <div className="col-span-full rounded-xl bg-slate-50 p-4 text-center text-xs text-slate-400 dark:bg-slate-800/40">
                  ยินดีด้วย! คุณทำผลงานได้ยอดเยี่ยมในทุกหมวดวิชา หมั่นฝึกฝนอย่างสม่ำเสมอเพื่อรักษา Streak
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

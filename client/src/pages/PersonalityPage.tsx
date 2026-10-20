import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  UserCheck,
  CheckCircle2,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Brain,
  Users,
  Compass,
  AlertCircle,
} from 'lucide-react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Tooltip,
} from 'recharts';

export const PersonalityPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [responses, setResponses] = useState<Record<string, number>>({});
  const [currentPage, setCurrentPage] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  const PAGE_SIZE = 10;

  useEffect(() => {
    loadQuestions();
  }, []);

  const loadQuestions = async () => {
    setLoading(true);
    try {
      const data = await api.personality.getQuestions();
      setQuestions(data);

      // Restore previously saved responses if any
      const initial: Record<string, number> = {};
      data.forEach((q: any) => {
        if (q.userScore) {
          initial[q.id] = q.userScore;
        }
      });
      setResponses(initial);
    } catch (err) {
      console.error('Failed to load personality questions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleScore = (questionId: string, score: number) => {
    setResponses((prev) => ({ ...prev, [questionId]: score }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = Object.entries(responses).map(([questionId, score]) => ({
        questionId,
        score,
      }));

      const res = await api.personality.submit(payload);
      setResult(res);
      confetti({ particleCount: 70, spread: 70 });
      refreshUser();
    } catch (err) {
      console.error('Failed to submit personality assessment', err);
    } finally {
      setSubmitting(false);
    }
  };

  const totalPages = Math.ceil(questions.length / PAGE_SIZE) || 1;
  const currentQuestions = questions.slice(
    currentPage * PAGE_SIZE,
    (currentPage + 1) * PAGE_SIZE
  );
  const answeredCount = Object.keys(responses).length;
  const progressPercent =
    questions.length > 0 ? Math.round((answeredCount / questions.length) * 100) : 0;

  const likertLabels = [
    { score: 1, label: 'ไม่เห็นด้วยอย่างยิ่ง' },
    { score: 2, label: 'ไม่เห็นด้วย' },
    { score: 3, label: 'ปานกลาง' },
    { score: 4, label: 'เห็นด้วย' },
    { score: 5, label: 'เห็นด้วยอย่างยิ่ง' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          แบบประเมินความพร้อมและบุคลิกภาพ (Personality & Attitude Assessment)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ประเมินคุณลักษณะ 5 ด้านสำคัญสำหรับการทำงานใน Data Center และงานวิศวกรรมเทคนิค
        </p>
      </div>

      {/* Progress & Overview Bar */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
              <UserCheck className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-slate-900 dark:text-white">
                ความคืบหน้าการตอบแบบประเมิน
              </p>
              <p className="text-[11px] text-slate-500">
                ตอบแล้ว <b>{answeredCount}</b> จาก {questions.length} ข้อ ({progressPercent}%)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleSubmit}
              disabled={submitting || answeredCount === 0}
              className="rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-500 disabled:opacity-50"
            >
              {submitting ? 'กำลังบันทึก...' : 'บันทึกและประมวลผลเรดาร์'}
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="mt-4 h-2 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
          <div
            className="h-full rounded-full bg-primary-600 transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Assessment Results & Radar */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              ผลการวิเคราะห์บุคลิกภาพการทำงาน (5 Dimensions Profile)
            </h3>
            <p className="text-xs text-slate-500">
              กราฟเรดาร์แสดงจุดเด่นและความถนัดของคุณเพื่อการพัฒนาตนเองและการทำงานร่วมกับทีม
            </p>
          </div>

          <div className="mt-6 grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
            {/* Radar Chart */}
            <div className="h-72 w-full lg:col-span-6">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart
                  cx="50%"
                  cy="50%"
                  outerRadius="75%"
                  data={result.radarProfile || []}
                >
                  <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" opacity={0.4} />
                  <PolarAngleAxis
                    dataKey="dimensionName"
                    tick={{ fill: '#64748b', fontSize: 10, fontWeight: 600 }}
                  />
                  <PolarRadiusAxis
                    angle={30}
                    domain={[0, 100]}
                    tick={{ fill: '#94a3b8', fontSize: 9 }}
                  />
                  <Radar
                    name="คะแนนของคุณ"
                    dataKey="scorePercent"
                    stroke="#0270c7"
                    fill="#0270c7"
                    fillOpacity={0.45}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#0f172a',
                      borderColor: '#1e293b',
                      borderRadius: '12px',
                      fontSize: '12px',
                      color: '#fff',
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Dimension Breakdown List */}
            <div className="space-y-3 lg:col-span-6">
              {result.radarProfile?.map((dim: any) => (
                <div
                  key={dim.dimensionKey}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-800/40"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {dim.dimensionName}
                    </span>
                    <span className="font-bold text-primary-600 dark:text-primary-400">
                      {dim.scoreAverage} / 5.0 ({dim.scorePercent}%)
                    </span>
                  </div>
                  <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                    <div
                      className="h-full rounded-full bg-primary-600"
                      style={{ width: `${dim.scorePercent}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Self-Reflection Insights */}
          <div className="mt-6 rounded-2xl bg-blue-50/70 p-4 text-xs text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
            <div className="flex items-start gap-2">
              <Compass className="h-5 w-5 shrink-0 text-blue-600 dark:text-blue-400 mt-0.5" />
              <div>
                <p className="font-bold">
                  {result.archetypeTitle || 'Technical Specialist Profile'}
                </p>
                <p className="mt-1 leading-relaxed">
                  {result.reflectionSummary ||
                    'คุณมีจุดเด่นด้านจิตสำนึกความปลอดภัยและความละเอียดรอบคอบ ซึ่งสอดคล้องอย่างยิ่งกับตำแหน่งช่างเทคนิคศูนย์ข้อมูล (Data Center Technician) และวิศวกรควบคุมระบบที่มีมาตรฐานสูง'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Statements List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>
              หน้า <b>{currentPage + 1}</b> จาก {totalPages}
            </span>
            <span>แสดงข้อที่ {currentPage * PAGE_SIZE + 1} - {Math.min((currentPage + 1) * PAGE_SIZE, questions.length)}</span>
          </div>

          {currentQuestions.map((q, idx) => {
            const currentVal = responses[q.id];
            const globalNum = currentPage * PAGE_SIZE + idx + 1;

            return (
              <div
                key={q.id}
                className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {globalNum}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {q.statementTh}
                      </p>
                      {q.statementEn && (
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {q.statementEn}
                        </p>
                      )}
                    </div>
                  </div>

                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    {q.dimension}
                  </span>
                </div>

                {/* 5-point Likert Scale */}
                <div className="mt-4 grid grid-cols-5 gap-2">
                  {likertLabels.map((l) => {
                    const isSelected = currentVal === l.score;
                    return (
                      <button
                        key={l.score}
                        onClick={() => handleScore(q.id, l.score)}
                        className={`flex flex-col items-center justify-center rounded-xl border p-2.5 text-center transition-all ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50 font-bold text-primary-700 shadow-sm dark:bg-primary-950/40 dark:text-primary-300'
                            : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-400 dark:hover:bg-slate-800'
                        }`}
                      >
                        <span className="text-sm font-bold">{l.score}</span>
                        <span className="mt-0.5 line-clamp-1 text-[9px] sm:text-[10px]">
                          {l.label}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Pagination Controls */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
              disabled={currentPage === 0}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>หน้าก่อนหน้า</span>
            </button>

            {currentPage === totalPages - 1 ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || answeredCount === 0}
                className="rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-500"
              >
                {submitting ? 'กำลังส่งข้อมูล...' : 'ส่งแบบประเมินทั้งหมด'}
              </button>
            ) : (
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages - 1, p + 1))
                }
                className="flex items-center gap-1 rounded-xl bg-primary-600 px-4 py-2 text-xs font-bold text-white shadow-sm hover:bg-primary-500"
              >
                <span>หน้าถัดไป</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

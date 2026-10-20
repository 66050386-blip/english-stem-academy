import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Timer,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Flag,
  FileCheck,
  Award,
  Layers,
  ArrowRight,
  Check,
  X,
  History,
  Maximize2,
  HelpCircle,
} from 'lucide-react';

export const MockExamPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [activeSession, setActiveSession] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [flagged, setFlagged] = useState<Record<string, boolean>>({});
  const [remainingSec, setRemainingSec] = useState<number>(0);
  const [submitting, setSubmitting] = useState(false);
  const [examResult, setExamResult] = useState<any>(null);

  // History & Hub
  const [history, setHistory] = useState<any[]>([]);
  const [loadingHistory, setLoadingHistory] = useState(true);

  // Config form
  const [examType, setExamType] = useState('MIXED');
  const [questionCount, setQuestionCount] = useState(20);
  const [timeLimitMinutes, setTimeLimitMinutes] = useState(30);
  const [starting, setStarting] = useState(false);

  // Review modal/view
  const [reviewData, setReviewData] = useState<any>(null);

  useEffect(() => {
    loadHistory();
  }, []);

  useEffect(() => {
    let interval: any;
    if (activeSession && !examResult && remainingSec > 0) {
      interval = setInterval(() => {
        setRemainingSec((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            handleAutoSubmit();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [activeSession, examResult, remainingSec]);

  const loadHistory = async () => {
    setLoadingHistory(true);
    try {
      const data = await api.exams.getHistory();
      setHistory(data);
    } catch (err) {
      console.error('Failed to load exam history', err);
    } finally {
      setLoadingHistory(false);
    }
  };

  const handleStartExam = async () => {
    if (starting) return;
    setStarting(true);
    try {
      const res = await api.exams.start({
        examType,
        questionCount,
        timeLimitMinutes,
      });

      setActiveSession(res.session);
      setQuestions(res.questions);
      setRemainingSec(res.session.timeLimitSec);
      setCurrentIdx(0);
      setAnswers({});
      setFlagged({});
      setExamResult(null);
      setReviewData(null);
    } catch (err) {
      console.error('Failed to start exam', err);
      alert('ไม่สามารถเริ่มการสอบได้ กรุณาลองใหม่อีกครั้ง');
    } finally {
      setStarting(false);
    }
  };

  const handleSelectOption = async (questionId: string, optionKey: string) => {
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
    // Auto-save draft
    if (activeSession) {
      try {
        await api.exams.saveDraftAnswer(activeSession.id, {
          questionId,
          selectedKey: optionKey,
        });
      } catch (e) {
        // quiet draft failure
      }
    }
  };

  const toggleFlag = (questionId: string) => {
    setFlagged((prev) => ({ ...prev, [questionId]: !prev[questionId] }));
  };

  const handleAutoSubmit = () => {
    alert('⏰ หมดเวลาการสอบ! ระบบกำลังส่งคำตอบอัตโนมัติ');
    handleSubmitExam();
  };

  const handleSubmitExam = async () => {
    if (!activeSession || submitting) return;
    setSubmitting(true);
    try {
      const timeSpent = activeSession.timeLimitSec - remainingSec;
      const formattedAnswers = questions.map((q) => ({
        questionId: q.id,
        selectedKey: answers[q.id] || '',
      }));

      const res = await api.exams.submit(activeSession.id, {
        answers: formattedAnswers,
        timeSpentSec: timeSpent,
      });

      setExamResult(res);
      if (res.percentage >= 70) {
        confetti({ particleCount: 100, spread: 80 });
      }
      refreshUser();
      loadHistory();
    } catch (err) {
      console.error('Failed to submit exam', err);
      alert('เกิดข้อผิดพลาดในการส่งข้อสอบ');
    } finally {
      setSubmitting(false);
    }
  };

  const handleLoadReview = async (sessionId: string) => {
    try {
      const review = await api.exams.getReview(sessionId);
      setReviewData(review);
    } catch (err) {
      console.error('Failed to load exam review', err);
    }
  };

  // 1. Review View
  if (reviewData) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <button
            onClick={() => setReviewData(null)}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            <ChevronLeft className="h-4 w-4" />
            <span>กลับหน้ารายการสอบ</span>
          </button>
        </div>

        {/* Scorecard */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center">
            <div>
              <span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                {reviewData.session?.examType}
              </span>
              <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                เฉลยละเอียดและผลการสอบ
              </h2>
              <p className="text-xs text-slate-500">
                คะแนนสอบ: {reviewData.session?.score} / {reviewData.session?.totalQuestions} ข้อ
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">ระดับเกรด (Grade)</p>
              <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                {reviewData.session?.grade || 'A'}
              </p>
            </div>
          </div>
        </div>

        {/* Detailed Questions Review */}
        <div className="space-y-6">
          {reviewData.questions?.map((q: any, idx: number) => {
            const isCorrect = q.userAnswer === q.correctKey;
            return (
              <div
                key={q.id || idx}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span
                      className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                        isCorrect
                          ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                          : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      }`}
                    >
                      {idx + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {q.questionText}
                      </p>
                      {q.questionTextTh && (
                        <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                          {q.questionTextTh}
                        </p>
                      )}
                    </div>
                  </div>

                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                      isCorrect
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                    }`}
                  >
                    {isCorrect ? 'ตอบถูก' : 'ตอบผิด'}
                  </span>
                </div>

                {/* Options */}
                <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                  {q.options?.map((opt: any) => {
                    const isChosen = q.userAnswer === opt.optionKey;
                    const isCorrectOpt = q.correctKey === opt.optionKey;
                    let style =
                      'border-slate-200 bg-white text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300';

                    if (isCorrectOpt) {
                      style =
                        'border-emerald-500 bg-emerald-50 font-bold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200';
                    } else if (isChosen && !isCorrectOpt) {
                      style =
                        'border-rose-500 bg-rose-50 font-medium text-rose-900 dark:bg-rose-950/40 dark:text-rose-200';
                    }

                    return (
                      <div
                        key={opt.optionKey}
                        className={`flex items-center justify-between rounded-xl border p-3 text-xs ${style}`}
                      >
                        <span className="flex items-center gap-2">
                          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                            {opt.optionKey}
                          </span>
                          <span>{opt.contentEn}</span>
                        </span>

                        {isCorrectOpt && (
                          <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                        )}
                        {isChosen && !isCorrectOpt && (
                          <X className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Thai Explanation */}
                {q.explanationTh && (
                  <div className="mt-4 rounded-xl bg-blue-50/70 p-3.5 text-xs leading-relaxed text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                    <span className="font-bold">คำอธิบายเฉลย: </span>
                    {q.explanationTh}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // 2. Active Exam Simulation View
  if (activeSession && !examResult) {
    const currentQ = questions[currentIdx];
    const minutesLeft = Math.floor(remainingSec / 60);
    const secondsLeft = remainingSec % 60;
    const isUrgent = remainingSec <= 300; // <= 5 mins

    return (
      <div className="space-y-6">
        {/* Sticky Exam Timer Header */}
        <div className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-md backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="rounded-xl bg-primary-100 px-3 py-1.5 text-xs font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
              {activeSession.examType}
            </span>
            <span className="text-xs text-slate-500">
              ข้อที่ <b>{currentIdx + 1}</b> จาก {questions.length}
            </span>
          </div>

          <div className="flex items-center gap-4">
            {/* Timer */}
            <div
              className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 font-mono text-sm font-bold shadow-sm ${
                isUrgent
                  ? 'animate-pulse bg-rose-50 text-rose-600 dark:bg-rose-950/50 dark:text-rose-400'
                  : 'bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200'
              }`}
            >
              <Clock className="h-4 w-4" />
              <span>
                {minutesLeft.toString().padStart(2, '0')}:
                {secondsLeft.toString().padStart(2, '0')}
              </span>
            </div>

            <button
              onClick={handleSubmitExam}
              disabled={submitting}
              className="rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-500"
            >
              {submitting ? 'กำลังส่ง...' : 'ส่งข้อสอบ (Submit)'}
            </button>
          </div>
        </div>

        {/* Main Exam Area: Question + Palette Split */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Active Question Canvas */}
          <div className="space-y-4 lg:col-span-8">
            {currentQ ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                    {currentQ.category?.nameTh || currentQ.category?.name}
                  </span>

                  <button
                    onClick={() => toggleFlag(currentQ.id)}
                    className={`flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-colors ${
                      flagged[currentQ.id]
                        ? 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                        : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Flag
                      className={`h-3.5 w-3.5 ${
                        flagged[currentQ.id] ? 'fill-amber-500' : ''
                      }`}
                    />
                    <span>{flagged[currentQ.id] ? 'ติดธงไว้ทบทวน' : 'ติดธง'}</span>
                  </button>
                </div>

                {/* Prompt */}
                <div className="mt-4">
                  <p className="text-base font-bold text-slate-900 dark:text-white leading-relaxed">
                    {currentQ.questionText}
                  </p>
                  {currentQ.questionTextTh && (
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {currentQ.questionTextTh}
                    </p>
                  )}
                </div>

                {/* Options */}
                <div className="mt-6 space-y-2.5">
                  {currentQ.options?.map((opt: any) => {
                    const isSelected = answers[currentQ.id] === opt.optionKey;
                    return (
                      <button
                        key={opt.optionKey}
                        onClick={() =>
                          handleSelectOption(currentQ.id, opt.optionKey)
                        }
                        className={`flex w-full items-center justify-between rounded-xl border p-3.5 text-left text-xs transition-all ${
                          isSelected
                            ? 'border-primary-500 bg-primary-50 font-bold text-primary-700 shadow-sm ring-1 ring-primary-500 dark:bg-primary-950/40 dark:text-primary-300'
                            : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800/60'
                        }`}
                      >
                        <span className="flex items-center gap-2.5">
                          <span
                            className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold uppercase ${
                              isSelected
                                ? 'bg-primary-600 text-white'
                                : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                            }`}
                          >
                            {opt.optionKey}
                          </span>
                          <span>{opt.contentEn}</span>
                        </span>

                        {isSelected && (
                          <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Step controls */}
                <div className="mt-8 flex items-center justify-between border-t border-slate-100 pt-4 dark:border-slate-800">
                  <button
                    onClick={() => setCurrentIdx((i) => Math.max(0, i - 1))}
                    disabled={currentIdx === 0}
                    className="flex items-center gap-1 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-40 dark:border-slate-800 dark:text-slate-300"
                  >
                    <ChevronLeft className="h-4 w-4" />
                    <span>ข้อก่อนหน้า</span>
                  </button>

                  <button
                    onClick={() =>
                      setCurrentIdx((i) => Math.min(questions.length - 1, i + 1))
                    }
                    disabled={currentIdx === questions.length - 1}
                    className="flex items-center gap-1 rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white disabled:opacity-40"
                  >
                    <span>ข้อถัดไป</span>
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          {/* Question Palette Sidebar */}
          <div className="space-y-4 lg:col-span-4">
            <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                กระดาษคำตอบ (Question Palette)
              </h3>

              <div className="mt-4 grid grid-cols-5 gap-2">
                {questions.map((q, idx) => {
                  const isAnswered = !!answers[q.id];
                  const isCurrent = currentIdx === idx;
                  const isFlagged = !!flagged[q.id];

                  let btnClass =
                    'border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300';

                  if (isCurrent) {
                    btnClass =
                      'border-primary-500 bg-primary-600 text-white font-bold ring-2 ring-primary-500/40';
                  } else if (isFlagged) {
                    btnClass =
                      'border-amber-400 bg-amber-50 text-amber-700 font-bold dark:bg-amber-950/50 dark:text-amber-400';
                  } else if (isAnswered) {
                    btnClass =
                      'border-emerald-400 bg-emerald-50 text-emerald-700 font-semibold dark:bg-emerald-950/50 dark:text-emerald-300';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`flex h-9 items-center justify-center rounded-xl border text-xs transition-all ${btnClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              {/* Legend */}
              <div className="mt-6 space-y-1.5 border-t border-slate-100 pt-3 text-[11px] text-slate-500 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                  <span>ตอบแล้ว ({Object.keys(answers).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                  <span>ติดธงทบทวน ({Object.values(flagged).filter(Boolean).length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-slate-300 dark:bg-slate-700" />
                  <span>ยังไม่ได้ตอบ ({questions.length - Object.keys(answers).length})</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 3. Post Exam Result Banner (right after submission)
  if (examResult) {
    return (
      <div className="mx-auto max-w-2xl space-y-6 py-6 text-center">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
          <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-primary-100 text-primary-600 dark:bg-primary-950/60 dark:text-primary-400">
            <Award className="h-10 w-10" />
          </div>

          <h2 className="mt-4 text-2xl font-bold text-slate-900 dark:text-white">
            ส่งข้อสอบเรียบร้อยแล้ว!
          </h2>
          <p className="mt-1 text-xs text-slate-500">
            ระบบทำการตรวจข้อสอบและคำนวณคะแนนผ่านเซิร์ฟเวอร์เรียบร้อย
          </p>

          <div className="mt-6 flex justify-center gap-6">
            <div>
              <p className="text-xs text-slate-400">คะแนนที่ได้</p>
              <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                {examResult.percentage}%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">ตอบถูก</p>
              <p className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {examResult.correctCount} / {examResult.totalQuestions}
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-400">เกรด</p>
              <p className="text-3xl font-extrabold text-amber-500">
                {examResult.grade}
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-center gap-3">
            <button
              onClick={() => handleLoadReview(activeSession.id)}
              className="rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-500"
            >
              ดูเฉลยละเอียดทุกข้อ
            </button>
            <button
              onClick={() => {
                setActiveSession(null);
                setExamResult(null);
              }}
              className="rounded-xl border border-slate-200 px-5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300"
            >
              กลับหน้ารายการสอบ
            </button>
          </div>
        </div>
      </div>
    );
  }

  // 4. Default View: Config & History Hub
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          จำลองการสอบจริง (Mock Exam Simulator)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ระบบจำลองสนามสอบจับเวลาจริง ป้องกันการโกงด้วยการตรวจข้อสอบผ่านเซิร์ฟเวอร์ พร้อมบันทึกประวัติการสอบ
        </p>
      </div>

      {/* Exam Configuration Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          ตั้งค่าการสอบจำลอง (New Exam Session)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          เลือกแทร็กที่ต้องการทดสอบ จำนวนข้อ และเวลาในการทำข้อสอบ
        </p>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {/* Track */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              แทร็กข้อสอบ (Exam Track)
            </label>
            <select
              value={examType}
              onChange={(e) => setExamType(e.target.value)}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value="MIXED">
                Comprehensive Academy Exam (รวมทุกวิชา)
              </option>
              <option value="TOEIC_FULL">TOEIC Listening & Reading Focus</option>
              <option value="STEM_FULL">STEM & Data Center Engineering</option>
              <option value="LOGIC_ONLY">Logic & Mechanical Aptitude</option>
              <option value="ENGLISH_ONLY">General & Workplace English</option>
            </select>
          </div>

          {/* Question Count */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              จำนวนข้อสอบ (Questions)
            </label>
            <select
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value={10}>10 ข้อ (Quick Test)</option>
              <option value={20}>20 ข้อ (Standard Practice)</option>
              <option value={30}>30 ข้อ (Intensive)</option>
              <option value={50}>50 ข้อ (Full Simulation)</option>
            </select>
          </div>

          {/* Time Limit */}
          <div>
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              เวลาในการทำข้อสอบ (Time Limit)
            </label>
            <select
              value={timeLimitMinutes}
              onChange={(e) => setTimeLimitMinutes(Number(e.target.value))}
              className="mt-1.5 w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-semibold text-slate-800 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-100"
            >
              <option value={15}>15 นาที</option>
              <option value={30}>30 นาที (แนะนำ)</option>
              <option value={45}>45 นาที</option>
              <option value={60}>60 นาที</option>
            </select>
          </div>
        </div>

        {/* Start Button */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleStartExam}
            disabled={starting}
            className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-primary-500/20 hover:bg-primary-500 disabled:opacity-50"
          >
            <Timer className="h-4 w-4" />
            <span>{starting ? 'กำลังเตรียมข้อสอบ...' : 'เริ่มจับเวลาสอบทันที'}</span>
          </button>
        </div>
      </div>

      {/* Exam History Table */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2 border-b border-slate-100 pb-3 dark:border-slate-800">
          <History className="h-4 w-4 text-slate-400" />
          <h3 className="font-bold text-slate-900 dark:text-white">
            ประวัติการสอบจำลองที่ผ่านมา ({history.length} รอบ)
          </h3>
        </div>

        {loadingHistory ? (
          <div className="flex h-32 items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
          </div>
        ) : history.length === 0 ? (
          <p className="py-8 text-center text-xs text-slate-400">
            ยังไม่มีประวัติการสอบจำลอง เริ่มการสอบรอบแรกของคุณได้ทันทีด้านบน
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <tr>
                  <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                    ประเภทข้อสอบ
                  </th>
                  <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                    วันที่สอบ
                  </th>
                  <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                    คะแนน
                  </th>
                  <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                    เกรด
                  </th>
                  <th className="p-3 font-semibold text-slate-600 dark:text-slate-400">
                    สถานะ
                  </th>
                  <th className="p-3 font-semibold text-slate-600 dark:text-slate-400 text-center">
                    การจัดการ
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {history.map((sess) => (
                  <tr
                    key={sess.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                  >
                    <td className="p-3 font-bold text-slate-900 dark:text-white">
                      {sess.examType}
                    </td>
                    <td className="p-3 text-slate-500">
                      {new Date(sess.startedAt).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}
                    </td>
                    <td className="p-3">
                      <span className="font-bold text-primary-600 dark:text-primary-400">
                        {sess.percentage !== null ? `${sess.percentage}%` : '-'}
                      </span>{' '}
                      <span className="text-[10px] text-slate-400">
                        ({sess.score}/{sess.totalQuestions})
                      </span>
                    </td>
                    <td className="p-3 font-bold text-amber-500">
                      {sess.grade || '-'}
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-md px-2 py-0.5 text-[10px] font-bold ${
                          sess.status === 'COMPLETED'
                            ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                            : 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400'
                        }`}
                      >
                        {sess.status}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {sess.status === 'COMPLETED' && (
                        <button
                          onClick={() => handleLoadReview(sess.id)}
                          className="rounded-lg bg-primary-50 px-3 py-1 text-xs font-semibold text-primary-600 hover:bg-primary-100 dark:bg-primary-950 dark:text-primary-400 dark:hover:bg-primary-900"
                        >
                          ดูเฉลย
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

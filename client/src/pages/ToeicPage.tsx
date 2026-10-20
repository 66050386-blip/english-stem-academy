import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  Award,
  Headphones,
  BookOpen,
  Volume2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Check,
  X,
  Sparkles,
  ArrowRight,
  FileQuestion,
} from 'lucide-react';

export const ToeicPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [overview, setOverview] = useState<any[]>([]);
  const [selectedPart, setSelectedPart] = useState<number | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    loadOverview();
  }, []);

  useEffect(() => {
    let timer: any;
    if (selectedPart && !result) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [selectedPart, result]);

  const loadOverview = async () => {
    try {
      const data = await api.toeic.getOverview();
      setOverview(data);
    } catch (err) {
      console.error('Failed to load TOEIC overview', err);
    }
  };

  const handleStartPractice = async (partNum: number) => {
    setLoading(true);
    setSelectedPart(partNum);
    setAnswers({});
    setTimeSpent(0);
    setResult(null);
    try {
      const data = await api.toeic.getPractice(partNum, 10);
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Failed to load TOEIC questions', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    if (result) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const payload = {
        answers: questions.map((q) => ({
          questionId: q.id,
          selectedKey: answers[q.id] || '',
        })),
        timeSpentSec: timeSpent,
      };

      const res = await api.toeic.submitPractice(payload);
      setResult(res);
      if (res.percentage >= 70) {
        confetti({ particleCount: 80, spread: 70 });
      }
      refreshUser();
    } catch (err) {
      console.error('Failed to submit TOEIC practice', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            ฝึกสอบ TOEIC (Listening & Reading Part 1 - 7)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            คลังข้อสอบมาตรฐาน TOEIC แยกตามพาร์ท ตรวจคำตอบแบบเรียลไทม์พร้อมคำอธิบายภาษาไทย
          </p>
        </div>

        {selectedPart && (
          <button
            onClick={() => {
              setSelectedPart(null);
              setResult(null);
            }}
            className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200"
          >
            กลับหน้ารวมพาร์ทสอบ
          </button>
        )}
      </div>

      {/* Overview Cards (When no part is selected) */}
      {!selectedPart && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {overview.map((p) => {
            const isListening = p.section === 'LISTENING';
            return (
              <div
                key={p.part}
                onClick={() => handleStartPractice(p.part)}
                className="group cursor-pointer rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:border-primary-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-primary-500/50"
              >
                <div className="flex items-center justify-between">
                  <span
                    className={`rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                      isListening
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300'
                        : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                    }`}
                  >
                    {p.section}
                  </span>
                  <span className="text-xs font-bold text-slate-400">
                    {p.count} ข้อในระบบ
                  </span>
                </div>

                <div className="mt-3">
                  <h3 className="text-base font-bold text-slate-900 group-hover:text-primary-600 dark:text-white dark:group-hover:text-primary-400">
                    Part {p.part}: {p.name}
                  </h3>
                  <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                    {p.nameTh}
                  </p>
                </div>

                <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3 dark:border-slate-800">
                  <span className="flex items-center gap-1.5 text-xs font-semibold text-primary-600 dark:text-primary-400">
                    เริ่มฝึกทำข้อสอบ
                    <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                  </span>
                  {isListening ? (
                    <Headphones className="h-4 w-4 text-slate-400" />
                  ) : (
                    <BookOpen className="h-4 w-4 text-slate-400" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Active Practice Session */}
      {selectedPart && (
        <div className="space-y-6">
          {/* Practice Header Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center gap-3">
              <span className="rounded-xl bg-primary-100 px-3 py-1.5 text-xs font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                TOEIC Part {selectedPart}
              </span>
              <span className="text-xs text-slate-500">
                จำนวน <b>{questions.length}</b> ข้อ
              </span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-700 dark:text-slate-300">
                <Clock className="h-4 w-4 text-slate-400" />
                <span>
                  {Math.floor(timeSpent / 60)}:
                  {(timeSpent % 60).toString().padStart(2, '0')}
                </span>
              </div>

              {!result && (
                <button
                  onClick={handleSubmit}
                  disabled={submitting || questions.length === 0}
                  className="rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-500 disabled:opacity-50"
                >
                  {submitting ? 'กำลังตรวจ...' : 'ส่งคำตอบ (Submit)'}
                </button>
              )}
            </div>
          </div>

          {/* Results Summary Box */}
          {result && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                    ผลการสอบ TOEIC Part {selectedPart}
                  </h3>
                  <p className="text-xs text-slate-500">
                    เวลาที่ใช้: {Math.floor(result.timeSpentSec / 60)} นาที {result.timeSpentSec % 60} วินาที
                  </p>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-xs text-slate-400">คะแนนความถูกต้อง</p>
                    <p className="text-2xl font-extrabold text-primary-600 dark:text-primary-400">
                      {result.percentage}% ({result.correctCount}/{result.totalQuestions})
                    </p>
                  </div>
                </div>
              </div>

              {/* Error Type Breakdown */}
              {result.errorTypeBreakdown && (
                <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
                  {Object.entries(result.errorTypeBreakdown).map(
                    ([type, data]: any) => (
                      <div
                        key={type}
                        className="rounded-xl bg-slate-50 p-3 text-center dark:bg-slate-800/40"
                      >
                        <p className="text-[11px] font-semibold text-slate-500">
                          {type}
                        </p>
                        <p className="mt-0.5 text-base font-bold text-slate-800 dark:text-slate-200">
                          {data.correct} / {data.total} ข้อ
                        </p>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>
          )}

          {/* Questions Stream */}
          {loading ? (
            <div className="flex h-64 items-center justify-center">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
            </div>
          ) : (
            <div className="space-y-6">
              {questions.map((q, idx) => {
                const userChoice = answers[q.id];
                const gradedItem = result?.gradedItems?.find(
                  (g: any) => g.questionId === q.id
                );
                const isSub = !!result;

                return (
                  <div
                    key={q.id}
                    className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                  >
                    {/* Question Context / Passage / Audio */}
                    {q.group && (
                      <div className="mb-4 rounded-xl bg-slate-50 p-4 text-xs dark:bg-slate-800/40">
                        <div className="flex items-center justify-between border-b border-slate-200/60 pb-2 dark:border-slate-700">
                          <span className="font-bold uppercase tracking-wider text-primary-600 dark:text-primary-400">
                            {q.group.titleTh || q.group.title}
                          </span>
                          {q.group.audioScript && (
                            <button
                              onClick={() => speech.speak(q.group.audioScript)}
                              className="flex items-center gap-1 font-semibold text-primary-600 hover:underline"
                            >
                              <Volume2 className="h-3.5 w-3.5" />
                              <span>ฟังเสียงบทสนทนา</span>
                            </button>
                          )}
                        </div>
                        {q.group.contentEn && (
                          <p className="mt-2 font-mono leading-relaxed text-slate-800 dark:text-slate-200">
                            {q.group.contentEn}
                          </p>
                        )}
                      </div>
                    )}

                    {/* Question Prompt */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                          {idx + 1}
                        </span>
                        <div>
                          <p className="text-sm font-semibold text-slate-900 dark:text-white">
                            {q.questionText}
                          </p>
                          {q.questionTextTh && (
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {q.questionTextTh}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* TTS for question text if in listening parts */}
                      {selectedPart <= 4 && (
                        <button
                          onClick={() => speech.speak(q.questionText)}
                          className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                        >
                          <Volume2 className="h-4 w-4" />
                        </button>
                      )}
                    </div>

                    {/* Options */}
                    <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                      {q.options?.map((opt: any) => {
                        const isChosen = userChoice === opt.optionKey;
                        const isCorrect = gradedItem?.correctKey === opt.optionKey;
                        let btnClass =
                          'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800';

                        if (isSub) {
                          if (isCorrect) {
                            btnClass =
                              'border-emerald-500 bg-emerald-50 font-bold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200';
                          } else if (isChosen && !isCorrect) {
                            btnClass =
                              'border-rose-500 bg-rose-50 font-medium text-rose-900 dark:bg-rose-950/40 dark:text-rose-200';
                          }
                        } else if (isChosen) {
                          btnClass =
                            'border-primary-500 bg-primary-50 font-bold text-primary-700 dark:bg-primary-950/40 dark:text-primary-300';
                        }

                        return (
                          <button
                            key={opt.optionKey}
                            onClick={() =>
                              handleSelectOption(q.id, opt.optionKey)
                            }
                            className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs transition-all ${btnClass}`}
                          >
                            <span className="flex items-center gap-2">
                              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-slate-100 font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                                {opt.optionKey}
                              </span>
                              <span>{opt.contentEn}</span>
                            </span>

                            {isSub && isCorrect && (
                              <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                            )}
                            {isSub && isChosen && !isCorrect && (
                              <X className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                            )}
                          </button>
                        );
                      })}
                    </div>

                    {/* Detailed Explanation */}
                    {isSub && gradedItem?.explanationTh && (
                      <div className="mt-4 rounded-xl bg-blue-50/70 p-3.5 text-xs leading-relaxed text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                        <span className="font-bold">คำอธิบายและเฉลย: </span>
                        {gradedItem.explanationTh}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom Submit / Retry Buttons */}
          <div className="flex justify-end pt-4">
            {!result ? (
              <button
                onClick={handleSubmit}
                disabled={submitting || questions.length === 0}
                className="rounded-xl bg-primary-600 px-8 py-3 text-xs font-bold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-500 disabled:opacity-50"
              >
                {submitting ? 'กำลังตรวจคำตอบ...' : 'ส่งคำตอบทั้งหมด'}
              </button>
            ) : (
              <button
                onClick={() => handleStartPractice(selectedPart)}
                className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-500"
              >
                <RotateCcw className="h-4 w-4" />
                <span>ฝึกทำชุดนี้ใหม่อีกครั้ง</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

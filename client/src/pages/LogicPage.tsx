import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Brain,
  Clock,
  Sparkles,
  CheckCircle2,
  Check,
  X,
  RotateCcw,
  Lightbulb,
  Cpu,
  Layers,
} from 'lucide-react';

export const LogicPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeSpent, setTimeSpent] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    loadQuestions();
  }, []);

  useEffect(() => {
    let timer: any;
    if (!result && questions.length > 0) {
      timer = setInterval(() => {
        setTimeSpent((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [result, questions]);

  const loadQuestions = async () => {
    setLoading(true);
    setAnswers({});
    setTimeSpent(0);
    setResult(null);
    try {
      const data = await api.logic.getQuestions(10);
      setQuestions(data.questions || []);
    } catch (err) {
      console.error('Failed to load logic questions', err);
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
      const payload = questions.map((q) => ({
        questionId: q.id,
        selectedKey: answers[q.id] || '',
      }));
      const res = await api.logic.submit(payload, timeSpent);
      setResult(res);
      if (res.percentage >= 70) {
        confetti({ particleCount: 70, spread: 70 });
      }
      refreshUser();
    } catch (err) {
      console.error('Failed to submit logic test', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          ตรรกศาสตร์ & เชาวน์ปัญญา (Logical Reasoning & Mechanical Aptitude)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ฝึกทำข้อสอบอนุกรมตัวเลข ตรรกศาสตร์การสรุปความ และความถนัดเชิงกลไกพื้นฐานสำหรับงานช่างเทคนิค
        </p>
      </div>

      {/* Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-950 dark:text-primary-400">
            <Brain className="h-4 w-4" />
          </span>
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
            ชุดข้อสอบความถนัด ({questions.length} ข้อ)
          </span>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-xs font-mono font-semibold text-slate-600 dark:text-slate-300">
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

      {/* Results Banner */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                สรุปคะแนนสอบตรรกศาสตร์
              </h3>
              <p className="text-xs text-slate-500">
                เวลาที่ใช้: {Math.floor(result.timeSpentSec / 60)} นาที {result.timeSpentSec % 60} วินาที
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">ความแม่นยำ</p>
              <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                {result.percentage}% ({result.correctCount}/{result.totalQuestions})
              </p>
            </div>
          </div>
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
                {/* Topic badge */}
                {q.topic && (
                  <div className="border-b border-slate-100 pb-2 dark:border-slate-800">
                    <span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                      {q.topic.nameTh || q.topic.name}
                    </span>
                  </div>
                )}

                {/* Question */}
                <div className="mt-3 flex items-start gap-3">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
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
                        onClick={() => handleSelectOption(q.id, opt.optionKey)}
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

                {/* Explanation */}
                {isSub && gradedItem?.explanationTh && (
                  <div className="mt-4 rounded-xl bg-blue-50/70 p-3.5 text-xs leading-relaxed text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                    <span className="font-bold">แนวคิดและคำอธิบาย: </span>
                    {gradedItem.explanationTh}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Actions */}
      <div className="flex justify-end pt-4">
        {!result ? (
          <button
            onClick={handleSubmit}
            disabled={submitting || questions.length === 0}
            className="rounded-xl bg-primary-600 px-8 py-3 text-xs font-bold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-500 disabled:opacity-50"
          >
            {submitting ? 'กำลังตรวจ...' : 'ส่งคำตอบ (Submit Logic)'}
          </button>
        ) : (
          <button
            onClick={loadQuestions}
            className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-500"
          >
            <RotateCcw className="h-4 w-4" />
            <span>ทำชุดข้อสอบใหม่อีกครั้ง</span>
          </button>
        )}
      </div>
    </div>
  );
};

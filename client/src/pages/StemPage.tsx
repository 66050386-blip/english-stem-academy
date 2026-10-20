import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import confetti from 'canvas-confetti';
import {
  Cpu,
  Atom,
  Wrench,
  Calculator,
  CheckCircle2,
  Clock,
  Sparkles,
  Check,
  X,
  RotateCcw,
  BookOpen,
  Filter,
  Flame,
  ArrowRight,
} from 'lucide-react';

export const StemPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [overview, setOverview] = useState<any[]>([]);
  const [selectedSubject, setSelectedSubject] = useState<string>('ALL');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('ALL');
  const [questions, setQuestions] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<any>(null);

  useEffect(() => {
    loadOverview();
    loadQuestions();
  }, [selectedSubject, selectedDifficulty]);

  const loadOverview = async () => {
    try {
      const data = await api.stem.getOverview();
      setOverview(data);
    } catch (err) {
      console.error('Failed to load STEM overview', err);
    }
  };

  const loadQuestions = async () => {
    setLoading(true);
    setAnswers({});
    setResult(null);
    try {
      const res = await api.stem.getQuestions({
        subject: selectedSubject === 'ALL' ? undefined : selectedSubject,
        difficulty: selectedDifficulty === 'ALL' ? undefined : selectedDifficulty,
        count: 10,
      });
      setQuestions(res.questions || []);
    } catch (err) {
      console.error('Failed to load STEM questions', err);
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
      const res = await api.stem.submit(payload);
      setResult(res);
      if (res.percentage >= 70) {
        confetti({ particleCount: 70, spread: 70 });
      }
      refreshUser();
    } catch (err) {
      console.error('Failed to submit STEM test', err);
    } finally {
      setSubmitting(false);
    }
  };

  const subjectTabs = [
    { code: 'ALL', label: 'ทั้งหมด (STEM All)', icon: Sparkles },
    { code: 'STEM_SCIENCE', label: 'วิทยาศาสตร์ (Science)', icon: Atom },
    { code: 'STEM_TECH', label: 'เทคโนโลยี (Tech & Cloud)', icon: Cpu },
    { code: 'STEM_ENG', label: 'วิศวกรรม (Engineering & DC)', icon: Wrench },
    { code: 'STEM_MATH', label: 'คณิตศาสตร์ (Math)', icon: Calculator },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          คลังข้อสอบ STEM & วิศวกรรม Data Center
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          เตรียมสอบเข้าโครงการเทคนิคและ Data Center ครอบคลุมฟิสิกส์ ไฟฟ้ากำลัง ระบบทำความเย็น HVAC และคณิตศาสตร์ประยุกต์
        </p>
      </div>

      {/* Subject Filter Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-slate-200 pb-3 dark:border-slate-800">
        {subjectTabs.map((tab) => {
          const Icon = tab.icon;
          const active = selectedSubject === tab.code;
          return (
            <button
              key={tab.code}
              onClick={() => setSelectedSubject(tab.code)}
              className={`flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-semibold transition-all ${
                active
                  ? 'bg-primary-600 text-white shadow-md shadow-primary-500/20'
                  : 'bg-white text-slate-600 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Sub Filter: Difficulty & Status */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-400">ระดับความยาก:</span>
          {['ALL', 'EASY', 'MEDIUM', 'HARD'].map((diff) => (
            <button
              key={diff}
              onClick={() => setSelectedDifficulty(diff)}
              className={`rounded-lg px-3 py-1 text-xs font-semibold transition-all ${
                selectedDifficulty === diff
                  ? 'bg-slate-800 text-white dark:bg-slate-200 dark:text-slate-900'
                  : 'text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {diff === 'ALL'
                ? 'ทั้งหมด'
                : diff === 'EASY'
                ? 'พื้นฐาน'
                : diff === 'MEDIUM'
                ? 'ปานกลาง'
                : 'ท้าทาย'}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-400">
          <span>ข้อสอบทั้งหมด {questions.length} ข้อในชุดนี้</span>
        </div>
      </div>

      {/* Results Header Banner */}
      {result && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col justify-between gap-4 border-b border-slate-100 pb-4 dark:border-slate-800 sm:flex-row sm:items-center">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                สรุปคะแนนสอบ STEM
              </h3>
              <p className="text-xs text-slate-500">
                ตอบถูก {result.correctCount} จาก {result.totalQuestions} ข้อ
              </p>
            </div>

            <div className="text-right">
              <p className="text-xs text-slate-400">ความแม่นยำ</p>
              <p className="text-3xl font-extrabold text-primary-600 dark:text-primary-400">
                {result.percentage}%
              </p>
            </div>
          </div>

          {result.recommendedTopics?.length > 0 && (
            <div className="mt-4 rounded-xl bg-amber-50/80 p-3 text-xs text-amber-900 dark:bg-amber-950/40 dark:text-amber-200">
              <span className="font-bold">หัวข้อที่ควรทบทวนเพิ่มเติม: </span>
              {result.recommendedTopics.join(', ')}
            </div>
          )}
        </div>
      )}

      {/* Questions List */}
      {loading ? (
        <div className="flex h-64 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : questions.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <Cpu className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <p className="mt-3 text-sm text-slate-500">
            ไม่พบข้อสอบในหมวดที่เลือก
          </p>
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
                {/* Meta tags */}
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                      {q.category?.nameTh || q.category?.name}
                    </span>
                    {q.topic && (
                      <span className="text-xs text-slate-400">
                        {q.topic.nameTh}
                      </span>
                    )}
                  </div>

                  <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                    {q.difficulty}
                  </span>
                </div>

                {/* Question Prompt */}
                <div className="mt-4 flex items-start gap-3">
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

                {/* Formula used box */}
                {q.formulaUsed && (
                  <div className="mt-3 rounded-xl bg-slate-50 p-3 font-mono text-xs text-slate-700 dark:bg-slate-800/60 dark:text-slate-300">
                    <span className="font-sans font-bold text-primary-600 dark:text-primary-400">
                      สูตรที่เกี่ยวข้อง:{' '}
                    </span>
                    {q.formulaUsed}
                  </div>
                )}

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

                {/* Step-by-Step Solution & Thai Explanation */}
                {isSub && gradedItem?.explanationTh && (
                  <div className="mt-4 rounded-xl bg-blue-50/70 p-4 text-xs leading-relaxed text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                    <p className="font-bold text-blue-800 dark:text-blue-300 mb-1">
                      วิธีคิดและคำอธิบายอย่างละเอียด:
                    </p>
                    <p className="whitespace-pre-line">{gradedItem.explanationTh}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* Footer Submit Button */}
      <div className="flex justify-end pt-4">
        {!result ? (
          <button
            onClick={handleSubmit}
            disabled={submitting || questions.length === 0}
            className="rounded-xl bg-primary-600 px-8 py-3 text-xs font-bold text-white shadow-lg shadow-primary-500/30 hover:bg-primary-500 disabled:opacity-50"
          >
            {submitting ? 'กำลังตรวจข้อสอบ...' : 'ส่งคำตอบ (Submit STEM)'}
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

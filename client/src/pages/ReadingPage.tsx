import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  BookMarked,
  Volume2,
  Eye,
  EyeOff,
  CheckCircle,
  HelpCircle,
  Check,
  X,
  RotateCcw,
  Sparkles,
  FileText,
} from 'lucide-react';

export const ReadingPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [readingSets, setReadingSets] = useState<any[]>([]);
  const [selectedSet, setSelectedSet] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [showThai, setShowThai] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    loadReading();
  }, []);

  const loadReading = async () => {
    setLoading(true);
    try {
      const data = await api.practice.getReading();
      setReadingSets(data);
      if (data.length > 0) {
        setSelectedSet(data[0]);
      }
    } catch (err) {
      console.error('Failed to load reading practice', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectSet = (set: any) => {
    setSelectedSet(set);
    setShowThai(false);
    setAnswers({});
    setSubmitted(false);
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmitQuiz = () => {
    setSubmitted(true);
    confetti({ particleCount: 50, spread: 70 });
    refreshUser();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          การอ่านคู่มือและเอกสารเทคนิค (Reading Practice)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ฝึกอ่าน Standard Operating Procedures (SOP), รายงานเหตุการณ์วิกฤต และสเปกอุปกรณ์ Data Center
        </p>
      </div>

      {loading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : readingSets.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <BookMarked className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <p className="mt-3 text-sm text-slate-500">
            ยังไม่มีบทความการอ่านในระบบ
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Article List */}
          <div className="space-y-3 lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              เอกสารและบทความ ({readingSets.length})
            </h2>

            <div className="space-y-2">
              {readingSets.map((s, sIdx) => {
                const isSelected = selectedSet?.id === s.id;
                const title =
                  s.titleTh ||
                  s.title ||
                  `${
                    s.contextType === 'READING_PASSAGE'
                      ? 'บทความทางเทคนิค'
                      : s.contextType === 'NOTICE'
                      ? 'ประกาศแจ้งเตือน'
                      : s.contextType === 'MANUAL'
                      ? 'คู่มือขั้นตอน SOP'
                      : 'เอกสารวิศวกรรม'
                  } ชุดที่ ${sIdx + 1}`;

                return (
                  <button
                    key={s.id}
                    onClick={() => handleSelectSet(s)}
                    className={`flex w-full items-center justify-between rounded-xl p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border border-primary-500 bg-primary-50 text-primary-900 shadow-sm dark:border-primary-500/50 dark:bg-primary-950/30 dark:text-primary-100'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{title}</p>
                        <p className="text-[10px] text-slate-400">{s.contextType}</p>
                      </div>
                    </div>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                      {s.questions?.length || 0} ข้อ
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Reading Passage & Comprehension Quiz */}
          <div className="space-y-6 lg:col-span-8">
            {selectedSet && (
              <div className="space-y-6">
                {/* Passage Document Card */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
                    <div>
                      <span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                        {selectedSet.contextType}
                      </span>
                      <h2 className="mt-1 text-lg font-bold text-slate-900 dark:text-white">
                        {selectedSet.titleTh || selectedSet.title || `เอกสารอ่านประกอบ ${selectedSet.contextType}`}
                      </h2>
                      {selectedSet.title && selectedSet.titleTh && (
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {selectedSet.title}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => speech.speak(selectedSet.contentEn || selectedSet.passageText || '')}
                        className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800"
                      >
                        <Volume2 className="h-4 w-4 text-primary-600" />
                        <span>ฟังบทความ</span>
                      </button>

                      <button
                        onClick={() => setShowThai(!showThai)}
                        className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-medium transition-all ${
                          showThai
                            ? 'bg-primary-600 text-white'
                            : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {showThai ? (
                          <EyeOff className="h-3.5 w-3.5" />
                        ) : (
                          <Eye className="h-3.5 w-3.5" />
                        )}
                        <span>{showThai ? 'ซ่อนคำแปล' : 'แปลภาษาไทย'}</span>
                      </button>
                    </div>
                  </div>

                  {/* Passage Text */}
                  <div className="mt-4 rounded-2xl bg-slate-50/70 p-5 font-mono text-xs leading-relaxed text-slate-800 dark:bg-slate-950/40 dark:text-slate-200">
                    <p className="whitespace-pre-line font-sans leading-relaxed">
                      {selectedSet.contentEn || selectedSet.passageText}
                    </p>
                  </div>

                  {/* Thai Translation */}
                  {showThai && (selectedSet.contentTh || selectedSet.passageTextTh) && (
                    <div className="mt-4 rounded-2xl border border-amber-200/60 bg-amber-50/40 p-4 text-xs leading-relaxed text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/20 dark:text-amber-200">
                      <p className="font-bold text-amber-800 dark:text-amber-300 mb-1">
                        คำแปลภาษาไทย:
                      </p>
                      <p className="whitespace-pre-line leading-relaxed">
                        {selectedSet.contentTh || selectedSet.passageTextTh}
                      </p>
                    </div>
                  )}
                </div>

                {/* Comprehension Quiz */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    คำถามวัดความเข้าใจจากการอ่าน (Reading Comprehension)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    ตอบคำถามจากเนื้อหาในเอกสารด้านบน
                  </p>

                  <div className="mt-6 space-y-6">
                    {selectedSet.questions?.map((q: any, qIdx: number) => {
                      const userChoice = answers[q.id];
                      const options = q.options || [];

                      return (
                        <div
                          key={q.id}
                          className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                        >
                          <div className="flex items-start gap-2.5">
                            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                              {qIdx + 1}
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

                          <div className="mt-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {options.map((opt: any) => {
                              const isSelected = userChoice === opt.optionKey;
                              const isCorrect = opt.isCorrect;
                              let btnClass =
                                'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800';

                              if (submitted) {
                                if (isCorrect) {
                                  btnClass =
                                    'border-emerald-500 bg-emerald-50 font-bold text-emerald-900 dark:bg-emerald-950/40 dark:text-emerald-200';
                                } else if (isSelected && !isCorrect) {
                                  btnClass =
                                    'border-red-500 bg-red-50 font-medium text-red-900 dark:bg-red-950/40 dark:text-red-200';
                                }
                              } else if (isSelected) {
                                btnClass =
                                  'border-primary-500 bg-primary-50 font-bold text-primary-700 dark:bg-primary-950/40 dark:text-primary-300';
                              }

                              return (
                                <button
                                  key={opt.id || opt.optionKey}
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

                                  {submitted && isCorrect && (
                                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  )}
                                  {submitted && isSelected && !isCorrect && (
                                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {submitted && q.explanationTh && (
                            <div className="mt-3 rounded-lg bg-blue-50/70 p-3 text-xs leading-relaxed text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                              <span className="font-bold">เฉลย: </span>
                              {q.explanationTh}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Submit Button */}
                  <div className="mt-6 flex justify-end">
                    {!submitted ? (
                      <button
                        onClick={handleSubmitQuiz}
                        disabled={
                          Object.keys(answers).length <
                          (selectedSet.questions?.length || 1)
                        }
                        className="rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-primary-500/20 hover:bg-primary-500 disabled:opacity-40"
                      >
                        ส่งคำตอบและดูเฉลย
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setAnswers({});
                        }}
                        className="flex items-center gap-2 rounded-xl border border-slate-200 px-4 py-2 text-xs font-semibold text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:text-slate-300"
                      >
                        <RotateCcw className="h-3.5 w-3.5" />
                        <span>ลองทำใหม่อีกครั้ง</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

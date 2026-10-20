import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  FileText,
  CheckCircle,
  HelpCircle,
  ChevronRight,
  BookOpen,
  Sparkles,
  Volume2,
  Check,
  X,
  Lightbulb,
} from 'lucide-react';

export const GrammarPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [topics, setTopics] = useState<any[]>([]);
  const [selectedTopic, setSelectedTopic] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState<Record<string, boolean>>({});

  useEffect(() => {
    loadGrammar();
  }, []);

  const loadGrammar = async () => {
    setLoading(true);
    try {
      const data = await api.practice.getGrammar();
      setTopics(data);
      if (data.length > 0) {
        setSelectedTopic(data[0]);
      }
    } catch (err) {
      console.error('Failed to load grammar topics', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOption = (questionId: string, optionKey: string) => {
    if (submitted[questionId]) return;
    setUserAnswers((prev) => ({ ...prev, [questionId]: optionKey }));
  };

  const handleSubmitAnswer = (questionId: string, isCorrect: boolean) => {
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
    if (isCorrect) {
      confetti({ particleCount: 40, spread: 60 });
      refreshUser();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          ไวยากรณ์ภาษาอังกฤษ (Grammar Practice)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          เรียนรู้โครงสร้างไวยากรณ์สำคัญ Tenses, Passive Voice, Conditionals สำหรับการสื่อสารในงานช่างและสอบ TOEIC
        </p>
      </div>

      {loading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : topics.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <FileText className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <p className="mt-3 text-sm text-slate-500">ยังไม่มีหัวข้อไวยากรณ์</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Topic List Sidebar */}
          <div className="space-y-3 lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              หัวข้อไวยากรณ์ ({topics.length})
            </h2>

            <div className="space-y-2">
              {topics.map((t) => {
                const isSelected = selectedTopic?.id === t.id;
                const qCount = t.questions?.length || 0;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setSelectedTopic(t);
                      setUserAnswers({});
                      setSubmitted({});
                    }}
                    className={`flex w-full items-center justify-between rounded-xl p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border border-primary-500 bg-primary-50 text-primary-900 shadow-sm dark:border-primary-500/50 dark:bg-primary-950/30 dark:text-primary-100'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs font-bold">{t.nameTh}</p>
                      <p className="text-[11px] text-slate-400">{t.name}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10px] font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {qCount} ข้อ
                      </span>
                      <ChevronRight className="h-4 w-4 text-slate-400" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Practice Questions Area */}
          <div className="space-y-6 lg:col-span-8">
            {selectedTopic && (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="border-b border-slate-100 pb-4 dark:border-slate-800">
                  <span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold uppercase text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                    Grammar Module
                  </span>
                  <h2 className="mt-1 text-xl font-bold text-slate-900 dark:text-white">
                    {selectedTopic.nameTh}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {selectedTopic.name}
                  </p>
                  {selectedTopic.description && (
                    <div className="mt-3 flex items-start gap-2 rounded-xl bg-amber-50/80 p-3 text-xs text-amber-900 dark:bg-amber-950/30 dark:text-amber-200">
                      <Lightbulb className="h-4 w-4 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
                      <p>{selectedTopic.description}</p>
                    </div>
                  )}
                </div>

                {/* Questions List */}
                <div className="mt-6 space-y-6">
                  {selectedTopic.questions && selectedTopic.questions.length > 0 ? (
                    selectedTopic.questions.map((q: any, qIdx: number) => {
                      const userChoice = userAnswers[q.id];
                      const isSub = submitted[q.id];
                      const options = q.options || [];
                      const correctOpt = options.find((o: any) => o.isCorrect);

                      return (
                        <div
                          key={q.id}
                          className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                        >
                          <div className="flex items-start justify-between gap-3">
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

                            <button
                              onClick={() => speech.speak(q.questionText)}
                              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
                              title="ฟังประโยค"
                            >
                              <Volume2 className="h-4 w-4" />
                            </button>
                          </div>

                          {/* Options */}
                          <div className="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-2">
                            {options.map((opt: any) => {
                              const isSelected = userChoice === opt.optionKey;
                              const isCorrect = opt.isCorrect;
                              let btnClass =
                                'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800';

                              if (isSub) {
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

                                  {isSub && isCorrect && (
                                    <Check className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                                  )}
                                  {isSub && isSelected && !isCorrect && (
                                    <X className="h-4 w-4 text-red-600 dark:text-red-400" />
                                  )}
                                </button>
                              );
                            })}
                          </div>

                          {/* Submit & Explanation */}
                          <div className="mt-3 flex items-center justify-between">
                            {!isSub ? (
                              <button
                                onClick={() => {
                                  if (!userChoice) return;
                                  const isCorrect =
                                    userChoice === correctOpt?.optionKey;
                                  handleSubmitAnswer(q.id, isCorrect);
                                }}
                                disabled={!userChoice}
                                className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-500 disabled:opacity-40"
                              >
                                ตรวจคำตอบ
                              </button>
                            ) : (
                              <span className="text-xs font-semibold text-slate-400">
                                ตรวจแล้ว
                              </span>
                            )}
                          </div>

                          {isSub && q.explanationTh && (
                            <div className="mt-3 rounded-lg bg-blue-50/70 p-3 text-xs leading-relaxed text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                              <span className="font-bold">คำอธิบาย: </span>
                              {q.explanationTh}
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-xs text-slate-400">
                      ยังไม่มีแบบฝึกหัดในหมวดนี้
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

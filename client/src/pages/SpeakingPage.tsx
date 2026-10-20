import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  Mic,
  MicOff,
  Volume2,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Award,
  ChevronRight,
  Info,
} from 'lucide-react';

export const SpeakingPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [prompts, setPrompts] = useState<any[]>([]);
  const [selectedPrompt, setSelectedPrompt] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [transcribedText, setTranscribedText] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [speechSupported, setSpeechSupported] = useState(true);

  useEffect(() => {
    loadPrompts();
    if (!speech.isRecognitionSupported()) {
      setSpeechSupported(false);
    }
  }, []);

  const loadPrompts = async () => {
    setLoading(true);
    try {
      const data = await api.practice.getSpeakingPrompts();
      setPrompts(data);
      if (data.length > 0) {
        setSelectedPrompt(data[0]);
      }
    } catch (err) {
      console.error('Failed to load speaking prompts', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectPrompt = (p: any) => {
    if (isRecording) {
      speech.stopListening();
      setIsRecording(false);
    }
    setSelectedPrompt(p);
    setTranscribedText('');
    setEvaluationResult(null);
  };

  const handleListenTarget = () => {
    if (!selectedPrompt) return;
    speech.speak(selectedPrompt.targetText, { rate: 0.85 });
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      speech.stopListening();
      setIsRecording(false);
      if (transcribedText.trim().length > 0) {
        handleEvaluateSpeech(transcribedText);
      }
    } else {
      setTranscribedText('');
      setEvaluationResult(null);
      setIsRecording(true);

      const success = speech.listen({
        lang: 'en-US',
        onResult: (text: string, isFinal?: boolean) => {
          setTranscribedText(text);
          if (isFinal) {
            setIsRecording(false);
            handleEvaluateSpeech(text);
          }
        },
        onError: (err: any) => {
          console.error('Speech recognition error', err);
          setIsRecording(false);
        },
        onEnd: () => {
          setIsRecording(false);
        },
      });

      if (!success) {
        setIsRecording(false);
        alert('เบราว์เซอร์ไม่รองรับ Web Speech API Speech Recognition กรุณาใช้ Chrome หรือ Edge');
      }
    }
  };

  const handleEvaluateSpeech = async (textToEval: string) => {
    if (!selectedPrompt || !textToEval.trim()) return;
    setEvaluating(true);
    try {
      const result = await api.practice.evaluateSpeaking({
        targetText: selectedPrompt.targetText,
        transcribedText: textToEval,
      });
      setEvaluationResult(result);
      if (result.accuracyScore >= 70) {
        confetti({ particleCount: 60, spread: 60 });
        refreshUser();
      }
    } catch (err) {
      console.error('Failed to evaluate speaking', err);
    } finally {
      setEvaluating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          การฝึกพูดและออกเสียง (Speaking Practice)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ฝึกออกเสียงประโยครายงานเหตุการณ์ฉุกเฉิน กฎความปลอดภัย และการสื่อสารหน้างาน
        </p>
      </div>

      {/* Browser Support Notice */}
      {!speechSupported && (
        <div className="flex items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-200">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
          <p>
            เบราว์เซอร์ของคุณอาจไม่รองรับ Web Speech API (Speech Recognition) เต็มรูปแบบ แนะนำให้ใช้งานผ่าน Google Chrome หรือ Microsoft Edge เพื่อประสิทธิภาพสูงสุด
          </p>
        </div>
      )}

      {loading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : prompts.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <Mic className="mx-auto h-12 w-12 text-slate-300 dark:text-slate-700" />
          <p className="mt-3 text-sm text-slate-500">
            ยังไม่มีชุดประโยคฝึกพูด
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Prompt Selector */}
          <div className="space-y-3 lg:col-span-4">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              สถานการณ์ฝึกพูด ({prompts.length})
            </h2>

            <div className="space-y-2">
              {prompts.map((p) => {
                const isSelected = selectedPrompt?.id === p.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => handleSelectPrompt(p)}
                    className={`flex w-full items-center justify-between rounded-xl p-3.5 text-left transition-all ${
                      isSelected
                        ? 'border border-primary-500 bg-primary-50 text-primary-900 shadow-sm dark:border-primary-500/50 dark:bg-primary-950/30 dark:text-primary-100'
                        : 'border border-slate-200 bg-white text-slate-700 hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-slate-700'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary-100 text-primary-600 dark:bg-primary-900/40 dark:text-primary-400">
                        <Mic className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold">{p.category}</p>
                        <p className="line-clamp-1 text-[11px] text-slate-400">
                          {p.targetText}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-slate-400" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Practice Canvas */}
          <div className="space-y-6 lg:col-span-8">
            {selectedPrompt && (
              <div className="space-y-6">
                {/* Target Prompt Box */}
                <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                    <span className="rounded-md bg-primary-100 px-2 py-0.5 text-[10px] font-bold uppercase text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                      {selectedPrompt.category}
                    </span>

                    <button
                      onClick={handleListenTarget}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-1.5 text-xs font-semibold text-primary-600 hover:bg-primary-50 dark:border-slate-800 dark:hover:bg-primary-950/30"
                    >
                      <Volume2 className="h-4 w-4" />
                      <span>ฟังเสียงเจ้าของภาษา</span>
                    </button>
                  </div>

                  {/* Target English Sentence */}
                  <div className="mt-4">
                    <p className="text-xs text-slate-400">ประโยคเป้าหมาย (Target Sentence):</p>
                    <h2 className="mt-1 text-xl font-bold leading-relaxed text-slate-900 dark:text-white">
                      "{selectedPrompt.targetText}"
                    </h2>
                    {selectedPrompt.targetTextTh && (
                      <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
                        คำแปล: {selectedPrompt.targetTextTh}
                      </p>
                    )}
                  </div>

                  {/* Phonetics & Focus Words */}
                  <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3 dark:border-slate-800">
                    <span className="text-xs font-semibold text-slate-400">คำสำคัญที่ต้องเน้น:</span>
                    {selectedPrompt.focusWords?.map((fw: string, fIdx: number) => (
                      <span
                        key={fIdx}
                        className="rounded-lg bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700 dark:bg-slate-800 dark:text-slate-300"
                      >
                        {fw}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Microphone Recording Card */}
                <div className="flex flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm dark:border-slate-800 dark:bg-slate-900">
                  <div className="relative">
                    {isRecording && (
                      <span className="absolute -inset-3 animate-ping rounded-full bg-rose-500/40" />
                    )}
                    <button
                      onClick={handleToggleRecording}
                      className={`relative flex h-20 w-20 items-center justify-center rounded-full text-white shadow-xl transition-transform hover:scale-105 active:scale-95 ${
                        isRecording
                          ? 'bg-rose-600 shadow-rose-600/40'
                          : 'bg-primary-600 shadow-primary-600/30'
                      }`}
                    >
                      {isRecording ? (
                        <MicOff className="h-8 w-8" />
                      ) : (
                        <Mic className="h-8 w-8" />
                      )}
                    </button>
                  </div>

                  <p className="mt-4 text-sm font-bold text-slate-900 dark:text-white">
                    {isRecording
                      ? 'กำลังบันทึกเสียง... (พูดประโยคเป้าหมาย)'
                      : 'กดปุ่มไมโครโฟนเพื่อเริ่มพูด'}
                  </p>
                  <p className="mt-1 text-xs text-slate-400">
                    {isRecording
                      ? 'กดอีกครั้งเพื่อหยุดและประเมินผล'
                      : 'พูดตามประโยคภาษาอังกฤษด้านบนให้ชัดเจน'}
                  </p>

                  {/* Real-time transcribed text */}
                  {transcribedText && (
                    <div className="mt-6 w-full rounded-2xl bg-slate-50 p-4 text-left dark:bg-slate-800/50">
                      <p className="text-[11px] font-semibold text-slate-400">
                        ข้อความที่ระบบได้ยิน (Transcribed Speech):
                      </p>
                      <p className="mt-1 text-sm font-medium text-slate-800 dark:text-slate-200">
                        "{transcribedText}"
                      </p>
                    </div>
                  )}

                  {/* Manual trigger if stopped */}
                  {!isRecording && transcribedText && !evaluationResult && (
                    <button
                      onClick={() => handleEvaluateSpeech(transcribedText)}
                      disabled={evaluating}
                      className="mt-4 rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-500"
                    >
                      {evaluating ? 'กำลังวิเคราะห์...' : 'ประเมินความถูกต้องของการพูด'}
                    </button>
                  )}
                </div>

                {/* Evaluation Results Card */}
                {evaluationResult && (
                  <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                      <div className="flex items-center gap-2">
                        <Award className="h-5 w-5 text-primary-600" />
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          ผลการประเมินการออกเสียง
                        </h3>
                      </div>

                      {evaluationResult.xpEarned > 0 && (
                        <span className="flex items-center gap-1 rounded-lg bg-amber-50 px-2.5 py-1 text-xs font-bold text-amber-700 dark:bg-amber-950/50 dark:text-amber-400">
                          <Sparkles className="h-3.5 w-3.5" />
                          +{evaluationResult.xpEarned} XP
                        </span>
                      )}
                    </div>

                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800/40">
                        <p className="text-xs text-slate-400">คะแนนความแม่นยำ</p>
                        <p
                          className={`mt-1 text-3xl font-extrabold ${
                            evaluationResult.accuracyScore >= 80
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : evaluationResult.accuracyScore >= 60
                              ? 'text-amber-600 dark:text-amber-400'
                              : 'text-rose-600 dark:text-rose-400'
                          }`}
                        >
                          {evaluationResult.accuracyScore}%
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800/40">
                        <p className="text-xs text-slate-400">คำที่ออกเสียงถูกต้อง</p>
                        <p className="mt-1 text-2xl font-bold text-emerald-600 dark:text-emerald-400">
                          {evaluationResult.matchedWords?.length || 0} คำ
                        </p>
                      </div>

                      <div className="rounded-xl bg-slate-50 p-4 text-center dark:bg-slate-800/40">
                        <p className="text-xs text-slate-400">คำที่ยังไม่ชัด/ขาดไป</p>
                        <p className="mt-1 text-2xl font-bold text-rose-500">
                          {evaluationResult.missingWords?.length || 0} คำ
                        </p>
                      </div>
                    </div>

                    {/* Feedback */}
                    <div className="mt-4 rounded-xl bg-blue-50/70 p-4 text-xs text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                      <p className="font-bold">คำแนะนำ:</p>
                      <p className="mt-0.5">{evaluationResult.feedbackTh}</p>
                    </div>

                    {/* Missing words chips */}
                    {evaluationResult.missingWords?.length > 0 && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-500">
                          คำที่ตรวจไม่พบจากการพูด (ลองเน้นเสียงคำเหล่านี้):
                        </p>
                        <div className="mt-2 flex flex-wrap gap-1.5">
                          {evaluationResult.missingWords.map(
                            (word: string, wIdx: number) => (
                              <span
                                key={wIdx}
                                className="rounded-lg bg-rose-100 px-2.5 py-1 text-xs font-medium text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
                              >
                                {word}
                              </span>
                            )
                          )}
                        </div>
                      </div>
                    )}

                    {/* Rule-based note disclaimer */}
                    <div className="mt-4 flex items-center gap-1.5 text-[11px] text-slate-400">
                      <Info className="h-3.5 w-3.5" />
                      <span>
                        หมายเหตุ: การประเมินผลใช้การเปรียบเทียบคำถอดเสียงจาก Web Speech API (Rule-based Text Diff) ไม่ใช่โมเดลวัดโฟนีม
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

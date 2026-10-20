import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { speech } from '../utils/speech';
import { DuoMascot, MascotMood } from '../components/Mascot/DuoMascot';
import confetti from 'canvas-confetti';
import {
  X,
  Volume2,
  CheckCircle2,
  Sparkles,
  Heart,
  Gem,
  Award,
  ArrowRight,
  Check,
  RotateCcw,
  BookOpen,
} from 'lucide-react';

interface LessonViewerPageProps {
  lessonId: string;
  onBack: () => void;
  onNextLesson?: (nextId: string) => void;
}

export const LessonViewerPage: React.FC<LessonViewerPageProps> = ({
  lessonId,
  onBack,
  onNextLesson,
}) => {
  const { refreshUser } = useAuth();
  const [lesson, setLesson] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Lesson state
  const [currentStep, setCurrentStep] = useState(0); // 0: Content slide, 1..N: Quiz questions
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [checkStatus, setCheckStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');
  const [hearts, setHearts] = useState(5);
  const [isCompleted, setIsCompleted] = useState(false);
  const [mascotMood, setMascotMood] = useState<MascotMood>('teaching');
  const [showThai, setShowThai] = useState(false);

  useEffect(() => {
    loadLesson();
  }, [lessonId]);

  const loadLesson = async () => {
    setLoading(true);
    try {
      const data = await api.courses.getLessonDetail(lessonId);
      setLesson(data);
      setCurrentStep(0);
      setSelectedOption(null);
      setCheckStatus('idle');
      setHearts(5);
      setMascotMood('teaching');
    } catch (err) {
      console.error('Failed to load lesson', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    speech.speak(text, { rate: 0.9 });
  };

  const contents = lesson?.contents || [];
  // Flatten all questions across all quizzes in this lesson
  const allQuestions: any[] = [];
  (lesson?.quizzes || []).forEach((q: any) => {
    (q.questions || []).forEach((qq: any) => {
      if (qq.question) {
        allQuestions.push(qq.question);
      } else if (qq.questionText) {
        allQuestions.push(qq);
      }
    });
  });

  const totalSteps = Math.max(1, contents.length + allQuestions.length);
  const currentQuizIndex = currentStep - contents.length;
  const currentQuiz = allQuestions[currentQuizIndex];

  const handleCheckAnswer = () => {
    if (!selectedOption || !currentQuiz) return;

    const correctOpt = currentQuiz.options?.find((o: any) => o.isCorrect);
    const isCorrect = correctOpt?.optionKey === selectedOption;

    if (isCorrect) {
      setCheckStatus('correct');
      setMascotMood('cheering');
      confetti({ particleCount: 50, spread: 60 });
    } else {
      setCheckStatus('wrong');
      setMascotMood('sad');
      setHearts((prev) => Math.max(1, prev - 1));
    }
  };

  const handleContinue = async () => {
    // If not on final step
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      setSelectedOption(null);
      setCheckStatus('idle');
      setMascotMood('teaching');
    } else {
      // Completed full lesson!
      setIsCompleted(true);
      setMascotMood('proud');
      confetti({ particleCount: 100, spread: 90 });

      try {
        await api.courses.saveProgress(lessonId, {
          timeSpentSec: 120,
          isCompleted: true,
        });
        await refreshUser();
      } catch (e) {
        console.error('Failed to save progress', e);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#F7F9FA] dark:bg-[#0F172A]">
        <div className="flex flex-col items-center gap-3">
          <DuoMascot mood="thinking" size={90} className="animate-bounce" />
          <p className="text-xs font-black text-slate-500">กำลังเตรียมบทเรียน...</p>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="p-8 text-center">
        <p className="font-bold text-slate-500">ไม่พบบทเรียน</p>
        <button onClick={onBack} className="mt-4 px-4 py-2 btn-duo-green text-xs">
          กลับสู่แผนที่การเรียน
        </button>
      </div>
    );
  }

  const progressPercent =
    totalSteps > 0
      ? Math.min(
          100,
          Math.round(((currentStep + (checkStatus !== 'idle' ? 1 : 0)) / totalSteps) * 100)
        )
      : 100;

  // Completion fanfare screen
  if (isCompleted) {
    return (
      <div className="flex min-h-[80vh] flex-col items-center justify-center p-6 text-center select-none">
        <div className="animate-bounce">
          <DuoMascot mood="proud" size={160} />
        </div>

        <h1 className="mt-6 text-3xl font-black text-[#58CC02]">
          บทเรียนเสร็จสมบูรณ์! 🎉
        </h1>
        <p className="mt-1 text-sm font-extrabold text-slate-500 dark:text-slate-400">
          คุณทำได้ยอดเยี่ยมมาก! ได้รับค่าประสบการณ์และความรู้เพิ่มขึ้น
        </p>

        {/* Reward cards */}
        <div className="mt-6 flex justify-center gap-4">
          <div className="flex flex-col items-center rounded-3xl border-2 border-b-4 border-amber-300 border-b-amber-500 bg-amber-50 p-4 min-w-[120px] dark:bg-amber-950/40">
            <span className="text-xs font-black uppercase text-amber-700 dark:text-amber-300">
              EXP ที่ได้รับ
            </span>
            <span className="mt-1 text-2xl font-black text-amber-600 dark:text-amber-400">
              +{lesson.xpReward || 20} XP
            </span>
          </div>

          <div className="flex flex-col items-center rounded-3xl border-2 border-b-4 border-blue-300 border-b-blue-500 bg-blue-50 p-4 min-w-[120px] dark:bg-blue-950/40">
            <span className="text-xs font-black uppercase text-blue-700 dark:text-blue-300">
              อัญมณี
            </span>
            <span className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
              💎 +5 GEMS
            </span>
          </div>
        </div>

        <button
          onClick={onBack}
          className="mt-8 px-10 py-3.5 btn-duo-green text-sm flex items-center gap-2 shadow-lg"
        >
          <span>กลับสู่แผนที่การเรียน (CONTINUE)</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full max-h-screen flex-col justify-between bg-white dark:bg-[#0F172A] select-none overflow-hidden">
      {/* Top Header: Exit, Chunky Progress Bar, Hearts */}
      <header className="flex items-center justify-between gap-4 px-4 py-2 sm:py-3 max-w-3xl mx-auto w-full shrink-0 border-b border-slate-100 dark:border-slate-800/80">
        <button
          onClick={onBack}
          className="rounded-2xl p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800"
          title="ออกจากบทเรียน"
        >
          <X className="h-5 w-5 sm:h-6 sm:w-6 stroke-[3]" />
        </button>

        {/* Chunky Animated Progress Bar */}
        <div className="flex-1 h-3.5 sm:h-4 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden p-0.5">
          <div
            className="h-full rounded-full bg-[#58CC02] transition-all duration-500 shadow-sm"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Hearts Life Counter */}
        <div className="flex items-center gap-1.5 font-black text-rose-500 text-xs sm:text-sm">
          <Heart className="h-4 w-4 sm:h-5 sm:w-5 fill-[#FF4B4B] text-[#FF4B4B]" />
          <span>{hearts}</span>
        </div>
      </header>

      {/* Main Interactive Stage - Fitted to viewport */}
      <main className="flex-1 min-h-0 max-w-2xl mx-auto w-full px-4 py-2 sm:py-4 flex flex-col justify-center overflow-y-auto">
        {currentStep < contents.length ? (
          /* Step 1: Content Teaching Slide */
          (() => {
            const content = contents[currentStep];
            return (
              <div className="space-y-3 sm:space-y-4 animate-in fade-in zoom-in-95">
                {/* Mascot Speech Bubble with Lesson Context */}
                <div className="flex items-start gap-3 sm:gap-4">
                  <div className="shrink-0 animate-float">
                    <DuoMascot mood={mascotMood} size={70} />
                  </div>
                  <div className="relative rounded-2xl sm:rounded-3xl border-2 border-slate-200 bg-white p-3 sm:p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 speech-bubble-left flex-1">
                    <span className="text-[10px] font-black uppercase text-[#1CB0F6]">
                      {content.sectionType || 'CONCEPT & VOCAB'}
                    </span>
                    <h2 className="text-sm sm:text-base font-black text-slate-900 dark:text-white mt-0.5">
                      {content.titleTh || content.title || lesson.titleTh}
                    </h2>
                    <p className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400">
                      ฟังเสียงอ่านและศึกษาคำศัพท์เทคนิคด้านล่างนะ!
                    </p>
                  </div>
                </div>

                {/* English Body Card */}
                <div className="rounded-2xl sm:rounded-3xl border-2 border-b-4 border-slate-200 bg-slate-50 p-4 sm:p-5 dark:border-slate-800 dark:bg-slate-900/60 shadow-sm">
                  <div className="flex items-center justify-between mb-2.5 border-b border-slate-200/60 pb-2 dark:border-slate-800">
                    <span className="text-[11px] sm:text-xs font-black text-slate-400 uppercase tracking-wide">
                      ภาษาอังกฤษหน้างาน (Technical English)
                    </span>
                    <button
                      onClick={() => handleSpeak(content.body)}
                      className="flex items-center gap-1.5 px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-xl bg-blue-50 text-[#1CB0F6] border-2 border-blue-200 text-xs font-black hover:bg-blue-100 transition-all active:scale-95 dark:bg-blue-950 dark:border-blue-900"
                    >
                      <Volume2 className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
                      <span>ฟังเสียงอ่าน</span>
                    </button>
                  </div>

                  <p className="text-xs sm:text-sm md:text-base font-extrabold leading-relaxed text-slate-800 dark:text-slate-100 whitespace-pre-line">
                    {content.body}
                  </p>

                  {/* Toggle Thai translation button */}
                  <div className="mt-3 pt-2.5 border-t border-slate-200/60 dark:border-slate-800 flex justify-between items-center">
                    <button
                      onClick={() => setShowThai(!showThai)}
                      className="text-xs font-black text-[#58CC02] hover:underline"
                    >
                      {showThai ? 'ซ่อนคำแปลภาษาไทย' : 'แตะเพื่อดูคำแปลภาษาไทย'}
                    </button>
                  </div>

                  {showThai && content.bodyTh && (
                    <div className="mt-2 rounded-xl bg-emerald-50 border-2 border-emerald-200 p-2.5 text-xs font-bold text-emerald-900 dark:bg-emerald-950/40 dark:border-emerald-800 dark:text-emerald-200">
                      {content.bodyTh}
                    </div>
                  )}
                </div>
              </div>
            );
          })()
        ) : currentQuiz ? (
          /* Step 2: Knowledge Check Quiz Slide */
          <div className="space-y-3 sm:space-y-4 animate-in fade-in zoom-in-95">
            {/* Mascot asking question */}
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="shrink-0 animate-float">
                <DuoMascot mood={mascotMood} size={70} />
              </div>
              <div className="relative rounded-2xl sm:rounded-3xl border-2 border-slate-200 bg-white p-3 sm:p-4 shadow-sm dark:border-slate-700 dark:bg-slate-800 speech-bubble-left flex-1">
                <span className="text-[10px] font-black uppercase text-amber-500">
                  แบบทดสอบความเข้าใจ
                </span>
                <h3 className="text-xs sm:text-sm md:text-base font-black text-slate-900 dark:text-white mt-0.5 leading-snug">
                  {currentQuiz.questionText}
                </h3>
                {currentQuiz.questionTextTh && (
                  <p className="text-[11px] sm:text-xs font-bold text-slate-500 dark:text-slate-400 mt-0.5">
                    {currentQuiz.questionTextTh}
                  </p>
                )}
              </div>
            </div>

            {/* Multiple Choice Tactile 3D Buttons */}
            <div className="space-y-2 pt-1 sm:pt-2">
              {currentQuiz.options?.map((opt: any, optIdx: number) => {
                const isSelected = selectedOption === opt.optionKey;
                const isCorrect = opt.isCorrect;

                let styleClass =
                  'border-2 border-b-4 border-slate-200 bg-white text-slate-800 hover:bg-slate-50 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-200';

                if (checkStatus !== 'idle') {
                  if (isCorrect) {
                    styleClass =
                      'border-2 border-b-4 border-[#46A302] bg-[#D7FFB8] text-[#2B6601] font-black dark:bg-emerald-950 dark:border-emerald-600 dark:text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    styleClass =
                      'border-2 border-b-4 border-[#EA2B2B] bg-[#FFDFE0] text-[#9E1414] font-black dark:bg-rose-950 dark:border-rose-600 dark:text-rose-200';
                  }
                } else if (isSelected) {
                  styleClass =
                    'border-2 border-b-4 border-[#1899D6] bg-[#DDF4FF] text-[#0A638F] font-black dark:bg-blue-950 dark:border-blue-600 dark:text-blue-200 ring-2 ring-blue-400';
                }

                return (
                  <button
                    key={opt.optionKey}
                    onClick={() => {
                      if (checkStatus === 'idle') {
                        setSelectedOption(opt.optionKey);
                      }
                    }}
                    className={`w-full flex items-center justify-between p-3 sm:p-3.5 rounded-2xl text-left transition-all active:border-b-2 active:translate-y-0.5 text-xs sm:text-sm font-extrabold ${styleClass}`}
                  >
                    <div className="flex items-center gap-2.5 sm:gap-3">
                      <span className="flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-xs font-black dark:bg-slate-800">
                        {optIdx + 1}
                      </span>
                      <span>{opt.contentEn}</span>
                    </div>

                    {isSelected && checkStatus === 'idle' && (
                      <span className="text-[#1CB0F6] font-black text-xs">เลือก</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Step 3: Fallback Step Card */
          <div className="space-y-3 animate-in fade-in zoom-in-95 text-center p-5 rounded-3xl border-2 border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
            <div className="animate-float inline-block">
              <DuoMascot mood="cheering" size={80} />
            </div>
            <h3 className="text-base font-black text-slate-800 dark:text-white">
              ยอดเยี่ยม! พร้อมสำหรับขั้นตอนถัดไป
            </h3>
            <p className="text-xs font-bold text-slate-500">
              กดปุ่ม "ต่อไป" ด้านล่างเพื่อบันทึกผลการเรียนรู้และรับคะแนนสะสม
            </p>
          </div>
        )}
      </main>

      {/* Bottom Slide-up Evaluation Bar - Always visible and pinned without scroll */}
      <footer
        className={`shrink-0 border-t-2 px-4 py-2 sm:py-3 transition-all duration-300 ${
          checkStatus === 'correct'
            ? 'bg-[#D7FFB8] border-[#58CC02] dark:bg-emerald-950/70 dark:border-emerald-700'
            : checkStatus === 'wrong'
            ? 'bg-[#FFDFE0] border-[#FF4B4B] dark:bg-rose-950/70 dark:border-rose-700'
            : 'bg-white border-slate-200 dark:bg-slate-900 dark:border-slate-800'
        }`}
      >
        <div className="max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Feedback message */}
          {checkStatus === 'correct' ? (
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#58CC02] text-white font-black text-lg shadow-duo shadow-[#3E8F02]">
                ✓
              </span>
              <div>
                <p className="text-sm sm:text-base font-black text-[#2B6601] dark:text-emerald-300">
                  ยอดเยี่ยมมาก! ถูกต้อง 🎉
                </p>
                <p className="text-[11px] sm:text-xs font-bold text-emerald-800 dark:text-emerald-400">
                  {currentQuiz?.explanationTh || 'ทำได้ดีมาก ตอบได้แม่นยำ'}
                </p>
              </div>
            </div>
          ) : checkStatus === 'wrong' ? (
            <div className="flex items-center gap-3 text-left">
              <span className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-full bg-[#FF4B4B] text-white font-black text-lg shadow-duo shadow-[#C42222]">
                ✕
              </span>
              <div>
                <p className="text-sm sm:text-base font-black text-[#9E1414] dark:text-rose-300">
                  คำตอบที่ถูกต้องคือ:
                </p>
                <p className="text-[11px] sm:text-xs font-bold text-rose-800 dark:text-rose-400">
                  {currentQuiz?.options?.find((o: any) => o.isCorrect)?.contentEn} (
                  {currentQuiz?.explanationTh})
                </p>
              </div>
            </div>
          ) : (
            <div className="hidden sm:block text-xs font-bold text-slate-400">
              {currentStep < contents.length
                ? 'กด "ถัดไป" เมื่ออ่านเนื้อหาเข้าใจแล้ว'
                : 'เลือกคำตอบที่ถูกต้องแล้วกด "ตรวจคำตอบ"'}
            </div>
          )}

          {/* Action button */}
          <div className="w-full sm:w-auto">
            {currentStep < contents.length ? (
              <button
                onClick={handleContinue}
                className="w-full sm:w-48 py-2.5 sm:py-3 btn-duo-green text-sm flex items-center justify-center gap-2 shadow-sm"
              >
                <span>ถัดไป (CONTINUE)</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            ) : checkStatus === 'idle' ? (
              <button
                onClick={handleCheckAnswer}
                disabled={!selectedOption}
                className={`w-full sm:w-48 py-2.5 sm:py-3 text-sm uppercase font-extrabold rounded-2xl transition-all shadow-sm ${
                  selectedOption
                    ? 'btn-duo-green'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800 dark:text-slate-600'
                }`}
              >
                ตรวจคำตอบ (CHECK)
              </button>
            ) : (
              <button
                onClick={handleContinue}
                className={`w-full sm:w-48 py-2.5 sm:py-3 text-sm uppercase font-extrabold rounded-2xl transition-all shadow-sm ${
                  checkStatus === 'correct' ? 'btn-duo-green' : 'btn-duo-red'
                }`}
              >
                ต่อไป (CONTINUE)
              </button>
            )}
          </div>
        </div>
      </footer>
    </div>
  );
};

import React, { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { speech } from '../utils/speech';
import confetti from 'canvas-confetti';
import {
  PenTool,
  CheckCircle2,
  Sparkles,
  RotateCcw,
  Volume2,
  FileText,
  AlertCircle,
  HelpCircle,
  Award,
  BookOpen,
} from 'lucide-react';

export const WritingPage: React.FC = () => {
  const { refreshUser } = useAuth();
  const [activeTab, setActiveTab] = useState<'scramble' | 'cloze' | 'report'>('scramble');

  // Mode 1: Sentence Scramble State
  const scrambleExercises = [
    {
      id: 1,
      targetSentence: 'The secondary chiller pump tripped due to an electrical overload.',
      targetSentenceTh: 'ปั๊มหล่อเย็นสำรองหยุดทำงานเนื่องจากมีกระแสไฟเกินพิกัด',
      tokens: ['The', 'secondary', 'chiller', 'pump', 'tripped', 'due', 'to', 'an', 'electrical', 'overload.'],
    },
    {
      id: 2,
      targetSentence: 'Technicians must wear anti-static wrist straps before touching server components.',
      targetSentenceTh: 'ช่างเทคนิคต้องสวมสายรัดข้อมือป้องกันไฟฟ้าสถิตก่อนสัมผัสอุปกรณ์เซิร์ฟเวอร์',
      tokens: ['Technicians', 'must', 'wear', 'anti-static', 'wrist', 'straps', 'before', 'touching', 'server', 'components.'],
    },
    {
      id: 3,
      targetSentence: 'Backup batteries will provide continuous power during a utility outage.',
      targetSentenceTh: 'แบตเตอรี่สำรองจะจ่ายพลังงานต่อเนื่องเมื่อเกิดเหตุไฟฟ้าดับจากการไฟฟ้า',
      tokens: ['Backup', 'batteries', 'will', 'provide', 'continuous', 'power', 'during', 'a', 'utility', 'outage.'],
    },
  ];
  const [scrambleIdx, setScrambleIdx] = useState(0);
  const [scrambleSelected, setScrambleSelected] = useState<string[]>([]);
  const [scrambleStatus, setScrambleStatus] = useState<'idle' | 'correct' | 'wrong'>('idle');

  // Mode 2: Cloze State
  const clozeExercises = [
    {
      id: 1,
      before: 'The emergency diesel generator started automatically ',
      blank: 'within',
      after: ' 10 seconds after the main grid failure.',
      options: ['within', 'during', 'at', 'between'],
      explanationTh: "'within 10 seconds' หมายถึง 'ภายใน 10 วินาที' ใช้บอกกรอบเวลา",
    },
    {
      id: 2,
      before: 'All scheduled maintenance activities must be approved ',
      blank: 'by',
      after: ' the facility manager before execution.',
      options: ['by', 'with', 'from', 'to'],
      explanationTh: "ในโครงสร้าง Passive Voice ('must be approved by') ใช้ 'by' เพื่อระบุผู้กระทำ",
    },
    {
      id: 3,
      before: 'Server room temperature should be maintained ',
      blank: 'between',
      after: ' 18°C and 27°C according to ASHRAE standards.',
      options: ['between', 'among', 'across', 'through'],
      explanationTh: "ใช้ 'between ... and ...' เพื่อระบุช่วงอุณหภูมิสองค่า",
    },
  ];
  const [clozeAnswers, setClozeAnswers] = useState<Record<number, string>>({});
  const [clozeSubmitted, setClozeSubmitted] = useState<Record<number, boolean>>({});

  // Mode 3: Report Writer State
  const [reportType, setReportType] = useState('INCIDENT');
  const [reportText, setReportText] = useState(
    'At 14:30 today, an unexpected power fluctuation was detected on Distribution Panel B. The secondary UPS battery bank immediately switched to discharge mode to prevent any server downtime. Facilities engineers investigated the breaker and replaced the faulty surge protection module. The system has now returned to normal operation and all server racks are receiving stable power.'
  );
  const [evaluatingReport, setEvaluatingReport] = useState(false);
  const [reportResult, setReportResult] = useState<any>(null);

  // Scramble Handlers
  const currentScramble = scrambleExercises[scrambleIdx];
  const availableTokens = currentScramble.tokens.filter(
    (t) => !scrambleSelected.includes(t)
  );

  const handleSelectToken = (token: string) => {
    if (scrambleStatus === 'correct') return;
    const next = [...scrambleSelected, token];
    setScrambleSelected(next);
    if (next.length === currentScramble.tokens.length) {
      if (next.join(' ') === currentScramble.targetSentence) {
        setScrambleStatus('correct');
        confetti({ particleCount: 40, spread: 60 });
        refreshUser();
      } else {
        setScrambleStatus('wrong');
      }
    }
  };

  const handleResetScramble = () => {
    setScrambleSelected([]);
    setScrambleStatus('idle');
  };

  // Report Evaluator
  const handleEvaluateReport = async () => {
    if (!reportText.trim()) return;
    setEvaluatingReport(true);
    try {
      const data = await api.practice.evaluateReport({
        reportType,
        userText: reportText,
      });
      setReportResult(data);
      if (data.totalScore >= 70) {
        confetti({ particleCount: 70, spread: 70 });
        refreshUser();
      }
    } catch (err) {
      console.error('Failed to evaluate report', err);
    } finally {
      setEvaluatingReport(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
          การเขียนรายงานและสร้างประโยค (Writing Practice)
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          ฝึกเรียงประโยคภาษาอังกฤษ เติมคำเทคนิค และเขียน Incident / Maintenance Report พร้อมระบบตรวจโครงสร้าง Rule-based
        </p>
      </div>

      {/* Mode Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('scramble')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'scramble'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <PenTool className="h-4 w-4" />
          <span>1. เรียงประโยค (Sentence Scramble)</span>
        </button>

        <button
          onClick={() => setActiveTab('cloze')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'cloze'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <BookOpen className="h-4 w-4" />
          <span>2. เติมคำในช่องว่าง (Cloze Practice)</span>
        </button>

        <button
          onClick={() => setActiveTab('report')}
          className={`flex items-center gap-2 border-b-2 px-5 py-3 text-xs font-bold transition-all ${
            activeTab === 'report'
              ? 'border-primary-600 text-primary-600 dark:border-primary-400 dark:text-primary-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <FileText className="h-4 w-4" />
          <span>3. เขียนรายงานหน้างาน (Report Writer)</span>
        </button>
      </div>

      {/* Mode 1: Sentence Scramble */}
      {activeTab === 'scramble' && (
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <span className="text-xs font-bold text-primary-600 dark:text-primary-400">
                ประโยคที่ {scrambleIdx + 1} จาก {scrambleExercises.length}
              </span>
              <button
                onClick={handleResetScramble}
                className="flex items-center gap-1 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:hover:text-slate-300"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>เริ่มใหม่</span>
              </button>
            </div>

            {/* Target Meaning in Thai */}
            <div className="mt-4 rounded-xl bg-slate-50 p-4 dark:bg-slate-800/40">
              <p className="text-xs text-slate-400">จงเรียงประโยคภาษาอังกฤษให้มีความหมายตรงกับ:</p>
              <h3 className="mt-1 text-base font-bold text-slate-900 dark:text-white">
                "{currentScramble.targetSentenceTh}"
              </h3>
            </div>

            {/* Student Construct Box */}
            <div
              className={`mt-6 min-h-[90px] rounded-2xl border-2 border-dashed p-4 transition-all ${
                scrambleStatus === 'correct'
                  ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/20'
                  : scrambleStatus === 'wrong'
                  ? 'border-rose-500 bg-rose-50/50 dark:bg-rose-950/20'
                  : 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950/40'
              }`}
            >
              <div className="flex flex-wrap gap-2">
                {scrambleSelected.length === 0 ? (
                  <p className="text-xs italic text-slate-400">
                    คลิกเลือกคำศัพท์ด้านล่างเพื่อสร้างประโยค...
                  </p>
                ) : (
                  scrambleSelected.map((word, wIdx) => (
                    <span
                      key={wIdx}
                      className="rounded-xl bg-primary-600 px-3 py-1.5 text-xs font-bold text-white shadow-sm"
                    >
                      {word}
                    </span>
                  ))
                )}
              </div>
            </div>

            {/* Result message */}
            {scrambleStatus === 'correct' && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-emerald-50 p-3 text-xs text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                  <span className="font-bold">ถูกต้องสมบูรณ์! โครงสร้างไวยากรณ์ถูกต้อง</span>
                </div>
                <button
                  onClick={() => speech.speak(currentScramble.targetSentence)}
                  className="flex items-center gap-1 font-semibold text-emerald-700 hover:underline"
                >
                  <Volume2 className="h-4 w-4" />
                  <span>ฟังประโยค</span>
                </button>
              </div>
            )}

            {scrambleStatus === 'wrong' && (
              <div className="mt-4 flex items-center justify-between rounded-xl bg-rose-50 p-3 text-xs text-rose-800 dark:bg-rose-950/40 dark:text-rose-300">
                <span className="font-bold">ลำดับคำยังไม่ถูกต้อง ลองกดปุ่มเริ่มใหม่แล้วเรียงอีกครั้ง</span>
                <button
                  onClick={handleResetScramble}
                  className="rounded-lg bg-rose-600 px-3 py-1 text-xs font-bold text-white hover:bg-rose-700"
                >
                  รีเซ็ต
                </button>
              </div>
            )}

            {/* Available Tokens to click */}
            <div className="mt-6">
              <p className="text-xs font-semibold text-slate-500 mb-2">คำศัพท์ที่เลือกได้:</p>
              <div className="flex flex-wrap gap-2">
                {availableTokens.map((token, tIdx) => (
                  <button
                    key={tIdx}
                    onClick={() => handleSelectToken(token)}
                    className="rounded-xl border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs font-semibold text-slate-700 shadow-sm transition-all hover:bg-primary-50 hover:text-primary-600 hover:border-primary-300 active:scale-95 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
                  >
                    {token}
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation to next exercise */}
            <div className="mt-8 flex justify-end">
              <button
                onClick={() => {
                  setScrambleIdx((prev) => (prev + 1) % scrambleExercises.length);
                  handleResetScramble();
                }}
                className="rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-500"
              >
                ประโยคถัดไป
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mode 2: Cloze Practice */}
      {activeTab === 'cloze' && (
        <div className="mx-auto max-w-3xl space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              แบบฝึกหัดเติมคำเชื่อมและคำเทคนิคในช่องว่าง (Cloze Fill-in)
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              เลือกคำบุพบท หรือคำกริยาที่สอดคล้องกับหลักไวยากรณ์และบริบทเทคนิค
            </p>

            <div className="mt-6 space-y-6">
              {clozeExercises.map((ex, idx) => {
                const userChoice = clozeAnswers[ex.id];
                const isSub = clozeSubmitted[ex.id];
                const isCorrect = userChoice === ex.blank;

                return (
                  <div
                    key={ex.id}
                    className="rounded-xl border border-slate-200 p-4 dark:border-slate-800"
                  >
                    <div className="flex items-center gap-2">
                      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-100 text-xs font-bold text-primary-600 dark:bg-primary-950 dark:text-primary-400">
                        {idx + 1}
                      </span>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">
                        {ex.before}
                        <span className="underline decoration-primary-500 decoration-2 font-bold px-1 text-primary-600">
                          {userChoice ? `[ ${userChoice} ]` : '[ _______ ]'}
                        </span>
                        {ex.after}
                      </p>
                    </div>

                    {/* Options */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      {ex.options.map((opt) => {
                        const isChosen = userChoice === opt;
                        let optClass =
                          'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200';

                        if (isSub) {
                          if (opt === ex.blank) {
                            optClass =
                              'border-emerald-500 bg-emerald-50 font-bold text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-200';
                          } else if (isChosen && opt !== ex.blank) {
                            optClass =
                              'border-rose-500 bg-rose-50 font-bold text-rose-800 dark:bg-rose-950/40 dark:text-rose-200';
                          }
                        } else if (isChosen) {
                          optClass =
                            'border-primary-500 bg-primary-50 font-bold text-primary-700 dark:bg-primary-950/40 dark:text-primary-300';
                        }

                        return (
                          <button
                            key={opt}
                            onClick={() => {
                              if (isSub) return;
                              setClozeAnswers((prev) => ({
                                ...prev,
                                [ex.id]: opt,
                              }));
                            }}
                            className={`rounded-xl border px-4 py-2 text-xs font-medium transition-all ${optClass}`}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>

                    {/* Check button & Explanation */}
                    <div className="mt-3 flex items-center justify-between">
                      {!isSub ? (
                        <button
                          onClick={() => {
                            if (!userChoice) return;
                            setClozeSubmitted((prev) => ({
                              ...prev,
                              [ex.id]: true,
                            }));
                            if (isCorrect) confetti({ particleCount: 30, spread: 50 });
                          }}
                          disabled={!userChoice}
                          className="rounded-lg bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-primary-500 disabled:opacity-40"
                        >
                          ตรวจคำตอบ
                        </button>
                      ) : (
                        <span className="text-xs font-semibold text-slate-400">
                          {isCorrect ? '✅ ถูกต้อง' : '❌ ยังไม่ถูกต้อง'}
                        </span>
                      )}
                    </div>

                    {isSub && (
                      <div className="mt-3 rounded-lg bg-blue-50/70 p-3 text-xs text-blue-900 dark:bg-blue-950/40 dark:text-blue-200">
                        <span className="font-bold">เฉลย: </span>
                        {ex.explanationTh}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Mode 3: Report Writer with Rule-based Evaluator */}
      {activeTab === 'report' && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Editor Area */}
          <div className="space-y-4 lg:col-span-7">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-3 dark:border-slate-800">
                <h3 className="font-bold text-slate-900 dark:text-white">
                  ระบบจำลองเขียนรายงานเทคนิค (Technical Report Writer)
                </h3>

                {/* Templates */}
                <div className="flex items-center gap-1.5 text-xs">
                  <span className="text-slate-400">เลือกเทมเพลต:</span>
                  <button
                    onClick={() => {
                      setReportType('INCIDENT');
                      setReportText(
                        'At 14:30 today, an unexpected power fluctuation was detected on Distribution Panel B. The secondary UPS battery bank immediately switched to discharge mode to prevent any server downtime. Facilities engineers investigated the breaker and replaced the faulty surge protection module. The system has now returned to normal operation and all server racks are receiving stable power.'
                      );
                    }}
                    className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  >
                    Incident
                  </button>
                  <button
                    onClick={() => {
                      setReportType('MAINTENANCE');
                      setReportText(
                        'Preventive maintenance on CRAC Unit #4 was conducted between 09:00 and 11:30. Technicians cleaned the air filters, inspected fan belts, and verified refrigerant pressure levels. All test readings were within normal operational thresholds. Routine inspection is scheduled for next month.'
                      );
                    }}
                    className="rounded-md bg-slate-100 px-2 py-1 text-[11px] font-semibold text-slate-700 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-300"
                  >
                    Maintenance
                  </button>
                </div>
              </div>

              {/* Text Area */}
              <div className="mt-4">
                <textarea
                  rows={8}
                  value={reportText}
                  onChange={(e) => setReportText(e.target.value)}
                  placeholder="เขียนรายงานเป็นภาษาอังกฤษ เช่น เวลาเกิดเหตุ, อาการผิดปกติ, การดำเนินการแก้ไข และสถานะปัจจุบัน..."
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-4 font-mono text-xs leading-relaxed text-slate-900 focus:border-primary-500 focus:outline-none focus:ring-1 focus:ring-primary-500 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-100"
                />
                <div className="mt-2 flex items-center justify-between text-xs text-slate-400">
                  <span>
                    จำนวนคำ: <b>{reportText.trim().split(/\s+/).filter(Boolean).length}</b> คำ
                  </span>
                  <span>แนะนำอย่างน้อย 30-40 คำสำหรับ Incident Report</span>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleEvaluateReport}
                  disabled={evaluatingReport || !reportText.trim()}
                  className="flex items-center gap-2 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-primary-500/20 hover:bg-primary-500 disabled:opacity-50"
                >
                  <PenTool className="h-4 w-4" />
                  <span>{evaluatingReport ? 'กำลังตรวจสอบ...' : 'ส่งตรวจโครงสร้างรายงาน'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Feedback & Evaluation Result */}
          <div className="space-y-4 lg:col-span-5">
            {reportResult ? (
              <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary-600" />
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      ผลการประเมินโครงสร้างรายงาน
                    </h4>
                  </div>
                  <span className="text-xl font-extrabold text-primary-600 dark:text-primary-400">
                    {reportResult.totalScore || 85}%
                  </span>
                </div>

                {/* Score & XP */}
                <div className="mt-4 rounded-xl bg-primary-50/70 p-3 text-xs text-primary-900 dark:bg-primary-950/40 dark:text-primary-200">
                  <p className="font-bold">สรุปผลการตรวจ:</p>
                  <p className="mt-0.5">
                    {reportResult.feedbackTh || 'โครงสร้างรายงานมีความเป็นมืออาชีพ มีการใช้คำศัพท์เทคนิคและระบุลำดับเหตุการณ์ครบถ้วน'}
                  </p>
                </div>

                {/* Detailed Checklist */}
                <div className="mt-4 space-y-2">
                  <p className="text-xs font-bold text-slate-600 dark:text-slate-400">
                    เกณฑ์การตรวจสอบ (Rule-based Checklist):
                  </p>
                  {reportResult.checks?.map((c: any, cIdx: number) => (
                    <div
                      key={cIdx}
                      className="flex items-start gap-2.5 rounded-xl border border-slate-100 p-2.5 text-xs dark:border-slate-800"
                    >
                      <span className="mt-0.5">
                        {c.passed ? (
                          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                        ) : (
                          <AlertCircle className="h-4 w-4 text-amber-500" />
                        )}
                      </span>
                      <div>
                        <p className="font-bold text-slate-800 dark:text-slate-200">
                          {c.label}
                        </p>
                        <p className="text-[11px] text-slate-500">{c.messageTh}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex h-80 flex-col items-center justify-center rounded-2xl border border-dashed border-slate-200 bg-white p-6 text-center dark:border-slate-800 dark:bg-slate-900">
                <FileText className="h-10 w-10 text-slate-300 dark:text-slate-700" />
                <p className="mt-3 text-xs font-semibold text-slate-500">
                  ผลการประเมินความสมบูรณ์ของรายงานจะแสดงที่นี่หลังจากกดปุ่มส่งตรวจ
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

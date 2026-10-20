import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { Vocabulary } from '../types';
import { speech } from '../utils/speech';
import { DuoMascot } from '../components/Mascot/DuoMascot';
import confetti from 'canvas-confetti';
import {
  Volume2,
  Bookmark,
  RotateCw,
  ChevronLeft,
  ChevronRight,
  Shuffle,
  CheckCircle,
  HelpCircle,
  Sparkles,
  BookOpen,
  Search,
  Filter,
  Layers,
  List,
  Flame,
  X,
  Check,
} from 'lucide-react';

export const VocabularyPage: React.FC = () => {
  const [vocabList, setVocabList] = useState<Vocabulary[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'flashcard' | 'table'>('flashcard');
  const [activeFilter, setActiveFilter] = useState<{
    level?: string;
    category?: string;
    search?: string;
    dueOnly?: boolean;
  }>({});
  const [searchQuery, setSearchQuery] = useState('');

  // Quiz state
  const [quizModalOpen, setQuizModalOpen] = useState(false);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [quizCurrentIdx, setQuizCurrentIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({});
  const [quizScore, setQuizScore] = useState<number | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);

  useEffect(() => {
    loadVocab();
  }, [activeFilter]);

  const loadVocab = async () => {
    setLoading(true);
    try {
      if (activeFilter.dueOnly) {
        const data = await api.vocabulary.getDueReviews();
        setVocabList(Array.isArray(data) ? data : data?.items || []);
      } else {
        const res = await api.vocabulary.list({
          level: activeFilter.level,
          category: activeFilter.category,
          search: activeFilter.search,
          limit: 100,
        });
        const items = Array.isArray(res)
          ? res
          : Array.isArray(res?.items)
          ? res.items
          : Array.isArray(res?.data)
          ? res.data
          : [];
        setVocabList(items);
      }
      setCurrentIndex(0);
      setIsFlipped(false);
    } catch (err) {
      console.error('Failed to load vocabulary', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = (text: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    speech.speak(text);
  };

  const handleToggleBookmark = async (vocabId: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    try {
      await api.vocabulary.toggleBookmark(vocabId);
      setVocabList((prev) =>
        prev.map((v) =>
          v.id === vocabId ? { ...v, isBookmarked: !v.isBookmarked } : v
        )
      );
    } catch (err) {
      console.error('Failed to toggle bookmark', err);
    }
  };

  const handleRateSM2 = async (rating: number) => {
    const current = vocabList[currentIndex];
    if (!current) return;
    try {
      await api.vocabulary.submitReview(current.id, rating);
      if (rating >= 4) {
        confetti({ particleCount: 30, spread: 50 });
      }
      // advance to next card
      if (currentIndex < vocabList.length - 1) {
        setCurrentIndex((prev) => prev + 1);
        setIsFlipped(false);
      } else {
        // finished batch
        alert('🎉 ยินดีด้วย! คุณทบทวนคำศัพท์ในรอบนี้ครบทั้งหมดแล้ว');
      }
    } catch (err) {
      console.error('Failed to submit SM2 rating', err);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...vocabList].sort(() => Math.random() - 0.5);
    setVocabList(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  // Start Quiz
  const handleStartQuiz = async () => {
    setQuizLoading(true);
    setQuizModalOpen(true);
    setQuizScore(null);
    setQuizCurrentIdx(0);
    setQuizAnswers({});
    try {
      const data = await api.vocabulary.getQuiz(activeFilter.category, 10);
      setQuizQuestions(data);
    } catch (err) {
      console.error('Failed to fetch vocab quiz', err);
    } finally {
      setQuizLoading(false);
    }
  };

  const handleQuizAnswer = (qIdx: number, selectedOpt: string) => {
    if (quizScore !== null) return;
    setQuizAnswers((prev) => ({ ...prev, [qIdx]: selectedOpt }));
  };

  const handleFinishQuiz = () => {
    let score = 0;
    quizQuestions.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctAnswer) {
        score++;
      }
    });
    setQuizScore(score);
    if (score >= 7) {
      confetti({ particleCount: 100, spread: 80 });
    }
  };

  const currentVocab = vocabList[currentIndex];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            คลังคำศัพท์ & แฟลชการ์ด (Vocabulary & SM-2)
          </h1>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            ระบบจำคำศัพท์เทคนิคและ Data Center ด้วยอัลกอริทึม Spaced Repetition (SuperMemo-2)
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleStartQuiz}
            className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 px-4 py-2 text-xs font-bold text-white shadow-md shadow-orange-500/20 hover:from-amber-600 hover:to-orange-600"
          >
            <Sparkles className="h-4 w-4" />
            <span>ทำแบบทดสอบคำศัพท์ (Vocab Quiz)</span>
          </button>

          <div className="flex rounded-xl border border-slate-200 bg-white p-1 dark:border-slate-800 dark:bg-slate-900">
            <button
              onClick={() => setViewMode('flashcard')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                viewMode === 'flashcard'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <Layers className="inline h-3.5 w-3.5 mr-1" />
              แฟลชการ์ด
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold ${
                viewMode === 'table'
                  ? 'bg-primary-600 text-white shadow-sm'
                  : 'text-slate-500 hover:text-slate-800 dark:hover:text-white'
              }`}
            >
              <List className="inline h-3.5 w-3.5 mr-1" />
              ตารางคำศัพท์
            </button>
          </div>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        {/* Search */}
        <div className="relative min-w-[200px] flex-1">
          <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="ค้นหาคำศัพท์ หรือ คำแปลภาษาไทย..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setActiveFilter((prev) => ({ ...prev, search: searchQuery }));
              }
            }}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs focus:border-primary-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
          />
        </div>

        {/* Level */}
        <select
          value={activeFilter.level || ''}
          onChange={(e) =>
            setActiveFilter((prev) => ({
              ...prev,
              level: e.target.value || undefined,
            }))
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="">ทุกระดับ (A1 - B2)</option>
          <option value="A1">ระดับ A1 (Beginner)</option>
          <option value="A2">ระดับ A2 (Elementary)</option>
          <option value="B1">ระดับ B1 (Intermediate)</option>
          <option value="B2">ระดับ B2 (Upper-Intermediate)</option>
        </select>

        {/* Category */}
        <select
          value={activeFilter.category || ''}
          onChange={(e) =>
            setActiveFilter((prev) => ({
              ...prev,
              category: e.target.value || undefined,
            }))
          }
          className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
        >
          <option value="">ทุกหมวดหมู่ (All Categories)</option>
          <option value="DATA_CENTER">Data Center & Infrastructure</option>
          <option value="WORKPLACE">Workplace & Communication</option>
          <option value="GENERAL">General English</option>
        </select>

        {/* Due Only Toggle */}
        <button
          onClick={() =>
            setActiveFilter((prev) => ({ ...prev, dueOnly: !prev.dueOnly }))
          }
          className={`flex items-center gap-1.5 rounded-xl px-3 py-1.5 text-xs font-semibold transition-all ${
            activeFilter.dueOnly
              ? 'bg-rose-600 text-white shadow-sm'
              : 'border border-slate-200 bg-slate-50 text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-300'
          }`}
        >
          <Flame className="h-3.5 w-3.5" />
          <span>ต้องทบทวนวันนี้ (Due)</span>
        </button>

        <span className="text-xs text-slate-400 ml-auto">
          ทั้งหมด {vocabList.length} คำ
        </span>
      </div>

      {/* Main Content */}
      {loading ? (
        <div className="flex h-80 items-center justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary-600 border-t-transparent" />
        </div>
      ) : vocabList.length === 0 ? (
        <div className="rounded-2xl border border-slate-200 bg-white p-12 text-center dark:border-slate-800 dark:bg-slate-900">
          <div className="animate-float flex justify-center mb-3">
            <DuoMascot mood="thinking" size={90} />
          </div>
          <h3 className="mt-1 text-sm font-bold text-slate-700 dark:text-slate-200">
            ไม่พบคำศัพท์ตามเงื่อนไขที่เลือก
          </h3>
          <p className="mt-1 text-xs text-slate-400">
            ลองปรับเปลี่ยนคำค้นหา หรือรีเซ็ตตัวกรองหมวดหมู่
          </p>
          <button
            onClick={() => {
              setActiveFilter({});
              setSearchQuery('');
            }}
            className="mt-4 rounded-xl bg-primary-600 px-4 py-2 text-xs font-semibold text-white"
          >
            รีเซ็ตตัวกรองทั้งหมด
          </button>
        </div>
      ) : viewMode === 'flashcard' ? (
        /* Flashcard View */
        <div className="mx-auto max-w-xl space-y-6">
          {/* Card Counter & Shuffle */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>
              การ์ดที่ <b>{currentIndex + 1}</b> จาก {vocabList.length}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={handleShuffle}
                className="flex items-center gap-1 rounded-lg px-2.5 py-1 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <Shuffle className="h-3.5 w-3.5" />
                <span>สลับการ์ด</span>
              </button>
              <button
                onClick={() => handleToggleBookmark(currentVocab.id)}
                className={`rounded-lg p-1.5 transition-colors ${
                  currentVocab.isBookmarked
                    ? 'text-amber-500'
                    : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
                }`}
                title="บุ๊กมาร์กคำศัพท์"
              >
                <Bookmark
                  className={`h-4 w-4 ${
                    currentVocab.isBookmarked ? 'fill-amber-500' : ''
                  }`}
                />
              </button>
            </div>
          </div>

          {/* 3D Flip Card Container */}
          <div
            onClick={() => setIsFlipped(!isFlipped)}
            className="group relative h-96 w-full cursor-pointer [perspective:1000px]"
          >
            <div
              className={`relative h-full w-full rounded-3xl transition-transform duration-500 [transform-style:preserve-3d] ${
                isFlipped ? '[transform:rotateY(180deg)]' : ''
              }`}
            >
              {/* Front of Card */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900 [backface-visibility:hidden]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="rounded-md bg-primary-100 px-2 py-0.5 text-xs font-bold text-primary-700 dark:bg-primary-950/60 dark:text-primary-300">
                      {currentVocab.level}
                    </span>
                    <span className="rounded-md bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600 dark:bg-slate-800 dark:text-slate-300">
                      {currentVocab.partOfSpeech}
                    </span>
                  </div>

                  <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
                    {currentVocab.category}
                  </span>
                </div>

                {/* Center Word */}
                <div className="text-center">
                  <h2 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
                    {currentVocab.word}
                  </h2>
                  {currentVocab.ipa && (
                    <p className="mt-2 text-sm text-slate-400 font-mono">
                      /{currentVocab.ipa}/
                    </p>
                  )}
                  <button
                    onClick={(e) => handleSpeak(currentVocab.word, e)}
                    className="mt-4 inline-flex items-center gap-2 rounded-full bg-primary-50 px-4 py-2 text-xs font-semibold text-primary-600 hover:bg-primary-100 dark:bg-primary-950/50 dark:text-primary-400 dark:hover:bg-primary-900/50"
                  >
                    <Volume2 className="h-4 w-4" />
                    <span>ฟังสำเนียง</span>
                  </button>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>คลิกที่การ์ดเพื่อดูคำแปล</span>
                  <RotateCw className="h-4 w-4 opacity-50 transition-transform group-hover:rotate-180" />
                </div>
              </div>

              {/* Back of Card */}
              <div className="absolute inset-0 flex flex-col justify-between rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-900 to-primary-950 p-8 text-white shadow-xl [backface-visibility:hidden] [transform:rotateY(180deg)]">
                <div>
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="text-lg font-bold text-primary-300">
                      {currentVocab.word}
                    </span>
                    <span className="rounded-md bg-white/10 px-2 py-0.5 text-xs font-medium">
                      {currentVocab.partOfSpeech}
                    </span>
                  </div>

                  <div className="mt-4">
                    <p className="text-2xl font-bold text-amber-300">
                      {currentVocab.meaningTh}
                    </p>
                    {currentVocab.meaningEn && (
                      <p className="mt-1 text-xs text-slate-300">
                        {currentVocab.meaningEn}
                      </p>
                    )}
                  </div>

                  {/* Example */}
                  {currentVocab.exampleEn && (
                    <div className="mt-5 rounded-2xl bg-white/5 p-4 text-xs leading-relaxed">
                      <div className="flex items-start justify-between gap-2">
                        <p className="font-medium text-slate-200">
                          "{currentVocab.exampleEn}"
                        </p>
                        <button
                          onClick={(e) => handleSpeak(currentVocab.exampleEn, e)}
                          className="shrink-0 rounded-lg p-1 text-primary-300 hover:bg-white/10"
                        >
                          <Volume2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      {currentVocab.exampleTh && (
                        <p className="mt-1 text-slate-400">
                          {currentVocab.exampleTh}
                        </p>
                      )}
                    </div>
                  )}
                </div>

                <p className="text-center text-[11px] text-slate-400">
                  เลือกระดับความจำด้านล่างเพื่อคำนวณรอบทบทวนถัดไป (SM-2)
                </p>
              </div>
            </div>
          </div>

          {/* SM-2 Spaced Repetition Buttons */}
          <div className="space-y-2">
            <p className="text-center text-xs font-medium text-slate-500">
              ความแม่นยำในการจำคำนี้ (ประเมินตนเองเพื่อตั้งเวลาทบทวน):
            </p>
            <div className="grid grid-cols-4 gap-2.5">
              <button
                onClick={() => handleRateSM2(1)}
                className="flex flex-col items-center justify-center p-3 btn-duo-red"
              >
                <span className="text-xs font-black">Again (1)</span>
                <span className="text-[10px] text-red-100 font-bold">จำไม่ได้</span>
              </button>

              <button
                onClick={() => handleRateSM2(2)}
                className="flex flex-col items-center justify-center p-3 btn-duo-yellow"
              >
                <span className="text-xs font-black">Hard (2)</span>
                <span className="text-[10px] text-amber-900 font-bold">จำยาก</span>
              </button>

              <button
                onClick={() => handleRateSM2(3)}
                className="flex flex-col items-center justify-center p-3 btn-duo-blue"
              >
                <span className="text-xs font-black">Good (3)</span>
                <span className="text-[10px] text-blue-100 font-bold">จำได้พอดี</span>
              </button>

              <button
                onClick={() => handleRateSM2(5)}
                className="flex flex-col items-center justify-center p-3 btn-duo-green"
              >
                <span className="text-xs font-black">Easy (5)</span>
                <span className="text-[10px] text-emerald-100 font-bold">จำแม่น</span>
              </button>
            </div>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => {
                if (currentIndex > 0) {
                  setCurrentIndex((prev) => prev - 1);
                  setIsFlipped(false);
                }
              }}
              disabled={currentIndex === 0}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <ChevronLeft className="h-4 w-4" />
              <span>ก่อนหน้า</span>
            </button>

            <button
              onClick={() => setIsFlipped(!isFlipped)}
              className="rounded-xl border border-slate-200 bg-white px-5 py-2 text-xs font-semibold text-slate-700 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              {isFlipped ? 'ดูคำศัพท์ภาษาอังกฤษ' : 'พลิกดูคำแปลภาษาไทย'}
            </button>

            <button
              onClick={() => {
                if (currentIndex < vocabList.length - 1) {
                  setCurrentIndex((prev) => prev + 1);
                  setIsFlipped(false);
                }
              }}
              disabled={currentIndex === vocabList.length - 1}
              className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 disabled:opacity-30 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            >
              <span>ถัดไป</span>
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Table View */
        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
              <tr>
                <th className="p-3.5 font-semibold text-slate-600 dark:text-slate-400">
                  คำศัพท์
                </th>
                <th className="p-3.5 font-semibold text-slate-600 dark:text-slate-400">
                  คำแปลภาษาไทย
                </th>
                <th className="p-3.5 font-semibold text-slate-600 dark:text-slate-400">
                  ระดับ / ชนิดคำ
                </th>
                <th className="p-3.5 font-semibold text-slate-600 dark:text-slate-400">
                  ตัวอย่างประโยค
                </th>
                <th className="p-3.5 font-semibold text-slate-600 dark:text-slate-400 text-center">
                  จัดการ
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {vocabList.map((v) => (
                <tr
                  key={v.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-800/40"
                >
                  <td className="p-3.5">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpeak(v.word)}
                        className="rounded-lg p-1 text-primary-600 hover:bg-primary-50 dark:text-primary-400"
                      >
                        <Volume2 className="h-3.5 w-3.5" />
                      </button>
                      <div>
                        <p className="font-bold text-slate-900 dark:text-white">
                          {v.word}
                        </p>
                        {v.ipa && (
                          <p className="text-[10px] text-slate-400 font-mono">
                            /{v.ipa}/
                          </p>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="p-3.5 font-semibold text-slate-800 dark:text-slate-200">
                    {v.meaningTh}
                  </td>
                  <td className="p-3.5">
                    <div className="flex items-center gap-1.5">
                      <span className="rounded bg-primary-50 px-1.5 py-0.5 text-[10px] font-bold text-primary-700 dark:bg-primary-950 dark:text-primary-300">
                        {v.level}
                      </span>
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {v.partOfSpeech}
                      </span>
                    </div>
                  </td>
                  <td className="p-3.5 max-w-xs text-slate-600 dark:text-slate-400">
                    <p className="line-clamp-2">{v.exampleEn}</p>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => handleToggleBookmark(v.id)}
                      className={`rounded-lg p-1.5 ${
                        v.isBookmarked
                          ? 'text-amber-500'
                          : 'text-slate-400 hover:text-slate-600'
                      }`}
                    >
                      <Bookmark
                        className={`h-4 w-4 ${
                          v.isBookmarked ? 'fill-amber-500' : ''
                        }`}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Vocab Quiz Modal */}
      {quizModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-amber-500" />
                <h3 className="font-bold text-slate-900 dark:text-white">
                  แบบทดสอบคำศัพท์ (Vocab Quiz)
                </h3>
              </div>
              <button
                onClick={() => setQuizModalOpen(false)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {quizLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-6 w-6 animate-spin rounded-full border-2 border-primary-600 border-t-transparent" />
              </div>
            ) : quizQuestions.length === 0 ? (
              <p className="py-8 text-center text-xs text-slate-500">
                ไม่สามารถสร้างคำถามจากคำศัพท์ปัจจุบันได้
              </p>
            ) : quizScore !== null ? (
              /* Quiz Result */
              <div className="py-6 text-center">
                <div className="animate-float flex justify-center mb-3">
                  <DuoMascot mood={quizScore >= 7 ? 'cheering' : 'thinking'} size={110} />
                </div>
                <h4 className="mt-2 text-lg font-black text-slate-900 dark:text-white">
                  ผลการทดสอบของคุณ
                </h4>
                <p className="mt-1 text-3xl font-black text-[#58CC02] dark:text-[#58CC02]">
                  {quizScore} / {quizQuestions.length}
                </p>
                <p className="mt-2 text-xs text-slate-500">
                  {quizScore >= 8
                    ? 'ยอดเยี่ยมมาก! ความจำคำศัพท์ของคุณอยู่ในเกณฑ์ดีเยี่ยม'
                    : quizScore >= 5
                    ? 'ผ่านเกณฑ์! ควรหมั่นทบทวนการ์ดที่ยังตอบผิด'
                    : 'ควรฝึกทบทวนด้วยแฟลชการ์ด SM-2 เพิ่มเติมอีกนิดนะ'}
                </p>
                <button
                  onClick={() => setQuizModalOpen(false)}
                  className="mt-6 rounded-xl bg-primary-600 px-6 py-2.5 text-xs font-bold text-white shadow-md hover:bg-primary-500"
                >
                  ปิดหน้าต่าง
                </button>
              </div>
            ) : (
              /* Active Quiz Question */
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>
                    ข้อ {quizCurrentIdx + 1} จาก {quizQuestions.length}
                  </span>
                  <span>คะแนนเต็ม 10 คะแนน</span>
                </div>

                {(() => {
                  const q = quizQuestions[quizCurrentIdx];
                  if (!q) return null;
                  const selectedOpt = quizAnswers[quizCurrentIdx];

                  return (
                    <div className="space-y-4">
                      <div className="rounded-2xl bg-slate-50 p-4 text-center dark:bg-slate-800/60">
                        <p className="text-xs text-slate-400">คำศัพท์ภาษาอังกฤษ:</p>
                        <h3 className="mt-1 text-2xl font-extrabold text-slate-900 dark:text-white">
                          {q.word}
                        </h3>
                        <p className="text-xs text-slate-500">
                          จงเลือกคำแปลภาษาไทยที่ถูกต้องที่สุด:
                        </p>
                      </div>

                      <div className="grid grid-cols-1 gap-2">
                        {q.options.map((opt: string, oIdx: number) => {
                          const isSelected = selectedOpt === opt;
                          return (
                            <button
                              key={oIdx}
                              onClick={() =>
                                handleQuizAnswer(quizCurrentIdx, opt)
                              }
                              className={`flex items-center justify-between rounded-xl border p-3 text-left text-xs font-medium transition-all ${
                                isSelected
                                  ? 'border-primary-500 bg-primary-50 font-bold text-primary-700 dark:bg-primary-950/40 dark:text-primary-300'
                                  : 'border-slate-200 bg-white hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:hover:bg-slate-800'
                              }`}
                            >
                              <span>{opt}</span>
                              {isSelected && (
                                <Check className="h-4 w-4 text-primary-600 dark:text-primary-400" />
                              )}
                            </button>
                          );
                        })}
                      </div>

                      <div className="flex items-center justify-between pt-2">
                        <button
                          onClick={() =>
                            setQuizCurrentIdx((prev) => Math.max(0, prev - 1))
                          }
                          disabled={quizCurrentIdx === 0}
                          className="rounded-xl border border-slate-200 px-3 py-1.5 text-xs text-slate-600 disabled:opacity-30 dark:border-slate-800 dark:text-slate-400"
                        >
                          ข้อก่อนหน้า
                        </button>

                        {quizCurrentIdx === quizQuestions.length - 1 ? (
                          <button
                            onClick={handleFinishQuiz}
                            className="rounded-xl bg-primary-600 px-5 py-2 text-xs font-bold text-white shadow-md hover:bg-primary-500"
                          >
                            ส่งคำตอบทั้งหมด
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              setQuizCurrentIdx((prev) =>
                                Math.min(quizQuestions.length - 1, prev + 1)
                              )
                            }
                            className="rounded-xl bg-primary-600 px-4 py-1.5 text-xs font-bold text-white shadow-sm hover:bg-primary-500"
                          >
                            ข้อถัดไป
                          </button>
                        )}
                      </div>
                    </div>
                  );
                })()}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

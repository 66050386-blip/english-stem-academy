import React, { useEffect, useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { ActivePage } from '../components/Layout/Sidebar';
import { DuoMascot } from '../components/Mascot/DuoMascot';
import { DragonMannequinShowcase } from '../components/Showcase/DragonMannequinShowcase';
import { TreasureChest } from '../components/TreasureChest';
import { subscribeToRealtimeUpdates } from '../utils/realtimeSync';
import confetti from 'canvas-confetti';

import {
  Flame,
  Zap,
  BookOpen,
  Layers,
  Award,
  CheckCircle2,
  Lock,
  Star,
  Play,
  ArrowRight,
  TrendingUp,
  Compass,
  Sparkles,
  Crown,
  Heart,
  Gift,
  Check,
  Gem,
  Coins,
  ChevronRight,
  Shield,
  Smartphone,
  ExternalLink,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

interface DashboardPageProps {
  onNavigate: (page: ActivePage, extraId?: string) => void;
}

export const DashboardPage: React.FC<DashboardPageProps> = ({ onNavigate }) => {
  const { user, refreshUser } = useAuth();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [data, setData] = useState<any>(null);
  const [courses, setCourses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [chestOpened, setChestOpened] = useState(false);
  const [isClaimingChest, setIsClaimingChest] = useState(false);
  // Default to 'treasure_skills' so the Treasure Chest and Skill Matrix are shown immediately in frame!
  const [sidebarTab, setSidebarTab] = useState<'treasure_skills' | 'dragon_quests'>('treasure_skills');

  const todayStr = new Date().toISOString().split('T')[0];
  const hasClaimedToday = user?.streak?.lastClaimDate === todayStr;

  useEffect(() => {
    loadAll();

    // Realtime auto-update across all tabs & immediate reactivity without manual F5
    const unsubscribe = subscribeToRealtimeUpdates(async (msg) => {
      await refreshUser();
      await loadAll();
      if (msg.type === 'COOLDOWN_RESET' || msg.type === 'USER_STATS_UPDATED') {
        setChestOpened(false);
      }
    });

    // Auto-revalidate when window regains focus
    const handleFocus = async () => {
      await refreshUser();
      await loadAll();
    };
    window.addEventListener('focus', handleFocus);

    return () => {
      unsubscribe();
      window.removeEventListener('focus', handleFocus);
    };
  }, []);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [dashRes, coursesRes] = await Promise.all([
        api.dashboard.getDashboardData(),
        api.courses.getCourses(),
      ]);
      setData(dashRes);
      setCourses(coursesRes);
    } catch (err) {
      console.error('Failed to load dashboard', err);
    } finally {
      setLoading(false);
    }
  };

  const openTopup = () => {
    window.dispatchEvent(new CustomEvent('open-topup-modal'));
  };

  const handleOpenChest = async () => {
    if (hasClaimedToday || chestOpened || isClaimingChest) return;
    setIsClaimingChest(true);
    try {
      await api.wardrobe.claimDaily();
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setChestOpened(true);
      await refreshUser();
      loadAll();
    } catch (err: any) {
      if (err.alreadyClaimed || err.message?.includes('แล้ว')) {
        setChestOpened(true);
      }
      console.error('Failed to claim daily chest', err);
      alert(err.message || (isEn ? 'Failed to open treasure chest' : 'เกิดข้อผิดพลาดในการเปิดหีบสมบัติ'));
    } finally {
      setIsClaimingChest(false);
    }
  };

  const streak = user?.streak?.currentStreak || 1;
  const xp = user?.statistics?.xp || 0;
  const level = user?.statistics?.level ?? 0;
  const coins = user?.statistics?.coins ?? 0;
  const gems = user?.statistics?.gems ?? 50;
  const isVip = Boolean(user?.statistics?.isVip || user?.role === 'ADMIN');

  // Flatten lessons into an interactive Stepping Stones Path
  const allLessons: any[] = [];
  courses.forEach((c) => {
    c.modules?.forEach((m: any) => {
      m.lessons?.forEach((l: any) => {
        allLessons.push({
          ...l,
          courseTitle: isEn ? (c.title || c.titleTh) : (c.titleTh || c.title),
          moduleTitle: isEn ? (m.title || m.titleTh) : (m.titleTh || m.title),
          displayTitle: isEn ? (l.title || l.titleTh) : (l.titleTh || l.title),
        });
      });
    });
  });

  const activeLesson = allLessons.find((l) => !l.isCompleted) || allLessons[0];

  const radarData = [
    { skill: isEn ? 'TOEIC Listening' : 'การฟังโทอิค', score: 78 },
    { skill: isEn ? 'TOEIC Reading' : 'การอ่านโทอิค', score: 72 },
    { skill: isEn ? 'Data Center Tech' : 'ศูนย์ข้อมูลและเซิร์ฟเวอร์', score: 88 },
    { skill: isEn ? 'STEM Electric' : 'ไฟฟ้าและพลังงาน', score: 82 },
    { skill: isEn ? 'STEM Network' : 'ระบบเครือข่าย', score: 75 },
    { skill: isEn ? 'Logic & Reason' : 'ตรรกศาสตร์', score: 85 },
  ];

  // Serpentine offset pattern for Duolingo-style winding road
  const getOffsetPx = (idx: number) => {
    const pattern = [0, 55, 95, 60, 0, -60, -95, -55];
    return pattern[idx % pattern.length];
  };

  const nextLevelXp = (level + 1) * 100;
  const currentLevelProgress = Math.min(100, Math.round(((xp % 100) / 100) * 100));

  return (
    <div className="select-none space-y-6 pb-12 relative">
      {/* Full-bleed Fixed Adventure Forest Panoramic Background (ภาพแบคกราวป่าผจญภัยที่ 1 เต็มจอด้านหลังทั้งหมด) */}
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{
          backgroundImage: `linear-gradient(to bottom, rgba(15, 23, 42, 0.72) 0%, rgba(6, 78, 59, 0.45) 35%, rgba(15, 23, 42, 0.88) 100%), url('/adventure-forest-bg.jpg')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top',
          backgroundAttachment: 'fixed',
          backgroundRepeat: 'no-repeat',
        }}
      />

      {/* 1. Hero Banner: Premium Gamified Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl border-2 border-b-6 border-[#1899D6] bg-gradient-to-r from-[#1CB0F6] via-[#0D8CD1] to-[#025CA8] p-6 text-white shadow-xl">
        {/* Background ambient pattern circles */}
        <div className="absolute -top-12 -right-12 h-64 w-64 rounded-full bg-white/10 blur-2xl pointer-events-none" />
        <div className="absolute -bottom-12 -left-12 h-64 w-64 rounded-full bg-blue-400/20 blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Left: Mascot Greeting & Student Rank */}
          <div className="space-y-3 text-center lg:text-left max-w-2xl">
            <div className="inline-flex flex-wrap items-center justify-center lg:justify-start gap-2">
              <span className="flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-black uppercase tracking-wider backdrop-blur-sm shadow-xs">
                <Sparkles className="h-3.5 w-3.5 fill-white" />
                <span>
                  {isEn ? `Welcome back, ${user?.name.split(' ')[0]}!` : `ยินดีต้อนรับกลับมา คุณ${user?.name.split(' ')[0]}!`}
                </span>
              </span>

              {isVip && (
                <span className="flex items-center gap-1.5 rounded-full bg-gradient-to-r from-amber-400 to-yellow-300 text-amber-950 px-3 py-1 text-xs font-black uppercase tracking-wider shadow-sm animate-pulse">
                  <span>👑</span>
                  <span>{isEn ? 'VIP Dragon Knight' : 'ยศอัศวินมังกร VIP'}</span>
                </span>
              )}
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black tracking-tight leading-tight">
              {isEn ? 'Data Center & STEM Learning Path' : 'เส้นทางการเรียนรู้ช่างวิศวกรรมศูนย์ข้อมูล'}
            </h1>

            <p className="text-xs sm:text-sm font-bold text-blue-100 leading-relaxed">
              {isEn
                ? 'Master Technical English, SOP manuals, and STEM aptitude through an interactive Duolingo-style roadmap designed for modern cloud infrastructure.'
                : 'ฝึกภาษาอังกฤษช่าง คำศัพท์เฉพาะทาง และเตรียมสอบสะเต็มด้วยแผนที่การเรียนรู้แบบเกม พร้อมฝึกฟันดาบสะสมค่าประสบการณ์ทุกวัน!'}
            </p>

            {/* Quick Stats Badges inside Hero Banner */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5 pt-1">
              {/* Level Progress */}
              <div className="flex items-center gap-2 rounded-2xl bg-white/15 px-3 py-1.5 backdrop-blur-sm border border-white/20">
                <Crown className="h-4 w-4 fill-amber-300 text-amber-300" />
                <span className="text-xs font-black">
                  {isEn ? `Level ${level}` : `เลเวล ${level}`}
                </span>
                <div className="h-2 w-16 bg-white/20 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-amber-300 rounded-full transition-all"
                    style={{ width: `${currentLevelProgress}%` }}
                  />
                </div>
              </div>

              {/* Day Streak */}
              <div className="flex items-center gap-1.5 rounded-2xl bg-white/15 px-3 py-1.5 backdrop-blur-sm border border-white/20 text-orange-200">
                <Flame className="h-4 w-4 fill-orange-400 text-orange-400" />
                <span className="text-xs font-black text-white">
                  {isEn ? `${streak} Day Streak` : `ต่อเนื่อง ${streak} วัน`}
                </span>
              </div>

              {/* Continue Next Lesson Button */}
              {activeLesson && (
                <button
                  type="button"
                  onClick={() => onNavigate('lesson', activeLesson.id)}
                  className="flex items-center gap-2 rounded-2xl bg-[#58CC02] hover:bg-[#46A302] text-white px-4 py-1.5 text-xs font-black shadow-lg shadow-[#46A302]/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                  title={isEn ? 'Start next technical lesson' : 'เริ่มเรียนบทเรียนลำดับถัดไปทันที'}
                >
                  <Play className="h-3.5 w-3.5 fill-white" />
                  <span>{isEn ? 'Continue Next Lesson' : 'เรียนต่อบทเรียนถัดไป'}</span>
                </button>
              )}
            </div>
          </div>

          {/* Right: Interactive Lobster Mascot */}
          <div className="shrink-0 flex flex-col items-center justify-center">
            <div className="hover:scale-105 transition-transform cursor-pointer" onClick={() => onNavigate('wardrobe')}>
              <DuoMascot mood="happy" stance="ready" interactiveSlash={true} size={135} />
            </div>
            <span className="mt-2 text-[10px] font-black uppercase tracking-wider text-blue-200">
              {isEn ? 'Click Mascot to Enter Wardrobe ⚔️' : 'คลิกน้องกุ้งเพื่อเข้าห้องแต่งตัว ⚔️'}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Main Layout: Serpentine Learning Road (Left 8 cols) + Gamification Widgets (Right 4 cols) */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Serpentine Duolingo Roadmap */}
        <div className="lg:col-span-8 space-y-6">
          {/* Unit 1 Header Card with Adventure Forest Theme */}
          <div className="rounded-3xl border-2 border-b-6 border-emerald-600 bg-gradient-to-r from-emerald-600 via-teal-600 to-green-600 p-5 text-white shadow-md flex items-center justify-between relative overflow-hidden">
            {/* Ambient Leaf Texture & Glow */}
            <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-white/10 blur-xl pointer-events-none" />
            <div className="space-y-1 relative z-10">
              <span className="inline-block rounded-md bg-white/20 px-2 py-0.5 text-[10px] font-black uppercase tracking-wider text-emerald-100">
                {isEn ? '🌲 Unit 1 • Adventure Forest 1 (Whispering Woods)' : '🌲 หน่วยที่ 1 • ป่าผจญภัยที่ 1 (ป่าแห่งเสียงกระซิบ)'}
              </span>
              <h2 className="text-lg sm:text-xl font-black">
                {isEn ? 'Workplace English & Server Infrastructure' : 'ภาษาอังกฤษหน้างานและโครงสร้างพื้นฐานเซิร์ฟเวอร์'}
              </h2>
              <p className="text-xs font-bold text-emerald-100">
                {isEn
                  ? 'Shift handovers, technical terminology, and emergency safety SOPs through the enchanted forest trail'
                  : 'การส่งมอบกะ, คำศัพท์เทคนิคเฉพาะทาง และคู่มือความปลอดภัยกรณีฉุกเฉินท่ามกลางเส้นทางพฤกษาเวทมนตร์'}
              </p>
            </div>
            <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/20 font-black text-2xl shadow-inner relative z-10">
              🌲
            </span>
          </div>

          {/* Adventure Forest 1 Stepping Stones Roadmap Container (ทางเดินหินลอยตัวบนแบคกราวป่าธรรมชาติ ปราศจากกรอบเขียว) */}
          <div className="relative py-6 px-2 sm:px-4 flex flex-col items-center space-y-8">

            {/* Background Layer 3: Glowing Forest Fireflies (หิ่งห้อยเรืองแสงแห่งป่ามนตรา) */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
              <span className="absolute top-[8%] left-[18%] flex h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_12px_4px_rgba(190,242,100,0.85)] animate-firefly-1" />
              <span className="absolute top-[22%] right-[22%] flex h-2.5 w-2.5 rounded-full bg-yellow-300 shadow-[0_0_10px_3px_rgba(253,224,71,0.8)] animate-firefly-2" />
              <span className="absolute top-[40%] left-[25%] flex h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_14px_4px_rgba(110,231,183,0.85)] animate-firefly-3" />
              <span className="absolute top-[58%] right-[28%] flex h-2.5 w-2.5 rounded-full bg-lime-300 shadow-[0_0_12px_4px_rgba(190,242,100,0.85)] animate-firefly-1" />
              <span className="absolute top-[75%] left-[20%] flex h-3 w-3 rounded-full bg-yellow-300 shadow-[0_0_12px_4px_rgba(253,224,71,0.85)] animate-firefly-2" />
              <span className="absolute top-[88%] right-[18%] flex h-3 w-3 rounded-full bg-emerald-300 shadow-[0_0_14px_4px_rgba(110,231,183,0.85)] animate-firefly-3" />
            </div>

            {/* Trailhead Marker: Top of Forest Path */}
            <div className="relative z-10 px-4 py-1.5 rounded-full bg-emerald-900/50 border border-emerald-400/40 text-[11px] font-black text-emerald-200 backdrop-blur-sm flex items-center gap-1.5 shadow-sm">
              <span>🌿</span>
              <span>{isEn ? 'Trailhead: Whispering Woods Entrance' : 'จุดเริ่มต้น: ปากทางเข้าป่าแห่งเสียงกระซิบ'}</span>
            </div>

            {/* SVG Connecting Track Line - Styled as Mossy Pathway */}
            <svg
              className="absolute inset-0 h-full w-full pointer-events-none opacity-40 dark:opacity-55"
              style={{ overflow: 'visible' }}
            >
              <path
                d="M 50% 50 Q 60% 140, 50% 230 T 50% 410 T 50% 590 T 50% 770"
                fill="none"
                stroke="#10B981"
                strokeWidth="14"
                strokeDasharray="18 14"
                strokeLinecap="round"
                filter="drop-shadow(0 0 6px rgba(16, 185, 129, 0.4))"
              />
            </svg>

            {loading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#58CC02] border-t-transparent" />
              </div>
            ) : allLessons.length === 0 ? (
              <p className="text-xs text-slate-400">
                {isEn ? 'Loading curriculum lessons...' : 'กำลังโหลดบทเรียนหลักสูตร...'}
              </p>
            ) : (
              allLessons.slice(0, 15).map((lesson, idx) => {
                const isCompleted = lesson.isCompleted;
                const isCurrent = idx === 0 || allLessons[idx - 1]?.isCompleted;
                const isLocked = !isVip && !isCompleted && !isCurrent;
                const offset = getOffsetPx(idx);

                // Difficulty Situation: Every 5th stage is a Boss Milestone Challenge
                const isBossStage = (idx + 1) % 5 === 0;
                const isHard = lesson.difficulty === 'HARD' || isBossStage;
                const isMedium = lesson.difficulty === 'MEDIUM' || (idx + 1) % 3 === 0;

                return (
                  <React.Fragment key={lesson.id}>
                    {/* Checkpoint 1 Landmark after stage 5 */}
                    {idx === 5 && (
                      <div className="relative z-10 my-2 px-4 py-1.5 rounded-2xl bg-gradient-to-r from-emerald-900/80 via-teal-900/80 to-emerald-900/80 border border-emerald-400/40 text-xs font-black text-emerald-200 backdrop-blur-sm shadow-md flex items-center gap-2">
                        <span>🌲</span>
                        <span>{isEn ? 'Checkpoint 1 • Misty Stream Clearing' : 'จุดเช็คพอยต์ 1 • ลานศิลาป่าลึกหมอกมนตรา'}</span>
                      </div>
                    )}

                    {/* Checkpoint 2 Landmark after stage 10 */}
                    {idx === 10 && (
                      <div className="relative z-10 my-2 px-4 py-1.5 rounded-2xl bg-gradient-to-r from-teal-900/80 via-emerald-900/80 to-teal-900/80 border border-teal-400/40 text-xs font-black text-teal-200 backdrop-blur-sm shadow-md flex items-center gap-2">
                        <span>🌳</span>
                        <span>{isEn ? 'Checkpoint 2 • Ancient Tree of Knowledge' : 'จุดเช็คพอยต์ 2 • มหาพฤกษาแห่งภูมิปัญญา'}</span>
                      </div>
                    )}

                    <div
                      style={{ transform: `translateX(${offset}px)` }}
                    className={`relative flex flex-col items-center transition-transform duration-300 z-10 ${
                      isCurrent ? 'mt-7 mb-2' : 'my-2'
                    }`}
                  >
                    {/* Stepping Stone Anchor: binds Mascot & Rim Effects strictly to the button frame */}
                    <div className="relative">
                      {/* 1. Lobster Mascot: stands directly on the top rim of the active button */}
                      {isCurrent && !isCompleted && (
                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 z-20 pointer-events-none drop-shadow-md">
                          <DuoMascot mood="cheering" size={50} interactiveSlash={false} />
                        </div>
                      )}

                      {/* 2. Rim Sparkle Accents strictly along the button border (เอฟเฟกต์เฉพาะขอบกรอบปุ่ม ไม่ฟุ้งกระจาย) */}
                      {isCurrent && !isCompleted && (
                        <>
                          <span className="absolute -top-1.5 -right-1.5 text-xs pointer-events-none animate-twinkle-1 z-30 select-none">
                            ✨
                          </span>
                          <span className="absolute -bottom-1 -left-1.5 text-[11px] pointer-events-none animate-twinkle-2 z-30 select-none">
                            {isHard ? '🔥' : '✨'}
                          </span>
                        </>
                      )}

                      {/* Completed Stage Sparkle */}
                      {isCompleted && (
                        <span className="absolute -top-1 -right-1 text-xs pointer-events-none animate-twinkle-2 select-none">
                          ✨
                        </span>
                      )}

                      {/* Stepping Stone Node Button with 3D Tactile Styling & Shimmer */}
                      <button
                        type="button"
                        onClick={() => {
                          if (!isLocked) {
                            setSelectedNode(lesson);
                          }
                        }}
                        disabled={isLocked}
                        className={`group relative flex h-20 w-20 items-center justify-center rounded-full border-4 transition-all duration-200 active:scale-95 shadow-md ${
                          isCompleted
                            ? 'border-[#46A302] bg-[#58CC02] text-white shadow-duo-lg shadow-[#388202] hover:brightness-110'
                            : isCurrent && isHard
                            ? 'border-orange-500 bg-gradient-to-br from-red-500 to-amber-500 text-white shadow-duo-lg shadow-red-700 ring-4 ring-amber-400 hover:brightness-110'
                            : isCurrent
                            ? 'border-[#1899D6] bg-[#1CB0F6] text-white shadow-duo-lg shadow-[#1272A0] ring-4 ring-cyan-400 hover:brightness-110'
                            : isVip
                            ? 'border-amber-400 bg-amber-400 text-amber-950 shadow-duo-lg shadow-amber-600 hover:brightness-110'
                            : 'border-slate-300 bg-slate-200 text-slate-400 shadow-duo shadow-slate-300 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-500 cursor-not-allowed'
                        }`}
                        title={
                          isLocked
                            ? (isEn ? 'Locked stage • Complete earlier stages or activate VIP' : 'ด่านนี้ถูกล็อค • เรียนด่านก่อนหน้าให้ผ่านก่อน หรือปลดล็อคด้วยยศ VIP')
                            : isVip && !isCompleted && !isCurrent
                            ? (isEn ? 'Unlocked with VIP Dragon Knight! 👑' : 'ปลดล็อกด้วยสิทธิ์ VIP Dragon Knight! 👑')
                            : isHard
                            ? (isEn ? `Boss Challenge: ${lesson.displayTitle}` : `ด่านท้าทายบอส: ${lesson.displayTitle}`)
                            : lesson.displayTitle
                        }
                      >
                        {/* Sweeping Light Reflection Shimmer across active button */}
                        {isCurrent && (
                          <div className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-hidden">
                            <div className="w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-12 animate-shimmer-sweep" />
                          </div>
                        )}

                        {/* Node Center Icon */}
                        {isCompleted ? (
                          <Check className="h-8 w-8 stroke-[3.5] z-10" />
                        ) : isCurrent && isHard ? (
                          <Flame className="h-8 w-8 fill-amber-300 text-amber-300 animate-pulse z-10" />
                        ) : isCurrent ? (
                          <Star className="h-8 w-8 fill-white stroke-[2] z-10" />
                        ) : isVip ? (
                          <Crown className="h-8 w-8 fill-amber-950 text-amber-950 z-10" />
                        ) : (
                          <Lock className="h-6 w-6 stroke-[2.5] z-10" />
                        )}

                        {/* Stars badge under completed stage - Full pill, zero clipping */}
                        {isCompleted && (
                          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-0.5 rounded-full bg-amber-400 border border-amber-300 px-2 py-0.5 text-[9px] font-black text-amber-950 shadow-md z-30 pointer-events-none whitespace-nowrap">
                            ★★★
                          </span>
                        )}

                        {/* VIP Badge - Full pill, zero clipping */}
                        {isVip && !isCompleted && !isCurrent && (
                          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-0.5 rounded-full bg-amber-300 border border-amber-200 px-2 py-0.5 text-[8px] font-black text-amber-950 shadow-md uppercase z-30 pointer-events-none whitespace-nowrap">
                            VIP
                          </span>
                        )}

                        {/* Boss Challenge Badge - Full pill, zero clipping */}
                        {isCurrent && isHard && (
                          <span className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 flex items-center justify-center gap-0.5 rounded-full bg-red-600 border border-white px-2 py-0.5 text-[8px] font-black text-white shadow-md uppercase z-30 pointer-events-none whitespace-nowrap">
                            BOSS 🔥
                          </span>
                        )}
                      </button>
                    </div>

                    {/* Node Title Label & Situation Difficulty Tag */}
                    <div className="mt-2 text-center max-w-[140px] space-y-0.5">
                      <span className="block text-xs font-black text-white line-clamp-1 drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
                        {lesson.displayTitle}
                      </span>
                      {isHard ? (
                        <span className="inline-block px-1.5 py-0.2 rounded-md bg-orange-600 text-[9px] font-black text-white shadow-xs">
                          {isEn ? 'Boss Stage' : 'ด่านท้าทายบอส'}
                        </span>
                      ) : (
                        <span className="text-[10px] font-bold text-emerald-200 block truncate drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
                          {lesson.moduleTitle}
                        </span>
                      )}
                    </div>
                  </div>
                </React.Fragment>
              );
            })
            )}

            {/* Forest Boss Sanctum Milestone */}
            <div className="pt-8 flex flex-col items-center z-10 space-y-2">
              <div className="px-3.5 py-1 rounded-full bg-red-950/60 border border-red-500/50 text-[10px] font-black text-red-200 uppercase tracking-wider backdrop-blur-sm shadow-md animate-pulse">
                ⚔️ {isEn ? 'Forest Guardian Boss Sanctum' : 'วิหารบอสผู้พิทักษ์พฤกษา'}
              </div>
              <button
                type="button"
                onClick={() => onNavigate('mock-exam')}
                className="cursor-pointer group relative flex h-20 w-20 items-center justify-center rounded-3xl border-4 border-amber-400 bg-gradient-to-br from-amber-400 via-orange-500 to-red-600 text-3xl shadow-duo-lg shadow-red-900 hover:scale-105 active:scale-95 transition-all"
                title={isEn ? 'Boss Challenge: Timed Comprehensive Mock Exam' : 'ท้าทายบอส: ข้อสอบจำลองประมวลผลจับเวลาจริง'}
              >
                <span className="group-hover:scale-110 transition-transform">⚔️</span>
                <span className="absolute -top-1 -right-1 text-xs">✨</span>
              </button>
              <span className="text-xs font-black text-amber-700 dark:text-amber-300 drop-shadow-sm">
                {isEn ? 'Boss Stage: Timed Mock Exam' : 'ด่านบอส: ทดสอบวัดระดับจำลองจับเวลาจริง'}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Gamified Sidebar Widgets with View Switcher */}
        <div className="lg:col-span-4 space-y-4">
          {/* Quick View Switcher Pill Bar (สลับมุมมองโชว์ในกรอบโดยไม่ต้องเลื่อนหน้าจอ) */}
          <div className="flex items-center justify-between p-1 rounded-2xl bg-slate-100 border border-slate-200 dark:bg-slate-800/80 dark:border-slate-700 shadow-xs">
            <button
              type="button"
              onClick={() => setSidebarTab('treasure_skills')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                sidebarTab === 'treasure_skills'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
              }`}
            >
              <span>🎁</span>
              <span>{isEn ? 'Treasure & Skills' : 'หีบสมบัติ & ทักษะ'}</span>
            </button>
            <button
              type="button"
              onClick={() => setSidebarTab('dragon_quests')}
              className={`flex-1 py-1.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                sidebarTab === 'dragon_quests'
                  ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-300 hover:text-purple-600'
              }`}
            >
              <span>🦞</span>
              <span>{isEn ? 'Dragon & Quests' : 'ชุดมังกร & ภารกิจ'}</span>
            </button>
          </div>

          {/* View Mode 1 (DEFAULT - Matches Image 1!): 6 Skill Competency Matrix + Open Glowing Treasure Chest */}
          {sidebarTab === 'treasure_skills' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Widget 3: Skill Radar Chart (From Image 1) */}
              <div className="rounded-3xl border-2 border-b-6 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-2">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 dark:border-slate-800">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span>📊</span>
                    <span>{isEn ? '6 Skill Competency Matrix' : 'ความเชี่ยวชาญ 6 ด้าน'}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => onNavigate('analytics')}
                    className="text-xs font-extrabold text-[#1CB0F6] hover:underline"
                  >
                    {isEn ? 'View All' : 'ดูเต็ม'}
                  </button>
                </div>

                <div className="h-48 w-full pt-1">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="68%" data={radarData}>
                      <PolarGrid stroke="#94a3b8" strokeDasharray="3 3" opacity={0.4} />
                      <PolarAngleAxis
                        dataKey="skill"
                        tick={{ fill: '#64748b', fontSize: 10, fontWeight: 700 }}
                      />
                      <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} />
                      <Radar
                        name="Skill"
                        dataKey="score"
                        stroke="#58CC02"
                        fill="#58CC02"
                        fillOpacity={0.45}
                      />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Widget 4: Daily Mystery Open Treasure Chest (From Image 1 with Sponge Base!) */}
              <div className="rounded-3xl border-2 border-b-6 border-amber-300 bg-gradient-to-b from-amber-50 via-yellow-50 to-amber-100/60 p-4 shadow-md dark:from-amber-950/40 dark:via-yellow-950/30 dark:to-slate-900 dark:border-amber-700 text-center space-y-2 relative overflow-hidden">
                {/* Ambient Radial Glow */}
                <div className="absolute inset-0 bg-radial from-amber-300/20 via-transparent to-transparent pointer-events-none" />

                {/* Glowing Open Treasure Chest with Sponge Base, Diamonds & Gold */}
                <TreasureChest
                  opened={hasClaimedToday || chestOpened}
                  onOpen={handleOpenChest}
                  isClaiming={isClaimingChest}
                  size={160}
                />

                <div>
                  <h4 className="text-sm font-black text-amber-950 dark:text-amber-200">
                    {hasClaimedToday || chestOpened
                      ? (isEn ? '✨ Daily Treasure Claimed!' : '✨ รับสมบัติประจำวันแล้ว!')
                      : (isEn ? '🎁 Daily Glowing Treasure Chest' : '🎁 หีบสมบัติปริศนาเปิดฝาเรืองแสง')}
                  </h4>
                  <p className="text-[10px] font-bold text-amber-800 dark:text-amber-300 mt-0.5">
                    {hasClaimedToday || chestOpened
                      ? (isEn
                          ? 'Come back tomorrow or have an admin reset your cooldown!'
                          : 'กลับมารับใหม่พรุ่งนี้ หรือให้แอดมินรีเซ็ตเวลาคูลดาวน์ได้ทันที')
                      : (isEn
                          ? 'Click to open and claim gold coins, gems & XP bonus!'
                          : 'กดเปิดหีบเพื่อรับเหรียญทอง เพชร และค่าประสบการณ์ฟรี')}
                  </p>
                </div>

                {/* Reward Bonus Badges */}
                <div className="flex items-center justify-center gap-1.5 text-[10px] font-black">
                  <span className="rounded-xl bg-amber-200/80 px-2 py-0.5 text-amber-950 dark:bg-amber-900/60 dark:text-amber-200">
                    ⚡ +30 XP
                  </span>
                  <span className="rounded-xl bg-blue-200/80 px-2 py-0.5 text-blue-950 dark:bg-blue-900/60 dark:text-blue-200">
                    💎 +20 Gems
                  </span>
                  <span className="rounded-xl bg-yellow-200/80 px-2 py-0.5 text-yellow-950 dark:bg-yellow-900/60 dark:text-yellow-200">
                    🪙 +10 Coins
                  </span>
                </div>

                {hasClaimedToday || chestOpened ? (
                  <div className="rounded-xl bg-emerald-100 border border-emerald-300 py-1.5 px-3 text-[11px] font-black text-emerald-800 dark:bg-emerald-950/60 dark:border-emerald-800 dark:text-emerald-300 flex items-center justify-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                    <span>{isEn ? 'Today\'s Reward Claimed' : 'รับรางวัลของวันนี้เรียบร้อยแล้ว'}</span>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={isClaimingChest}
                    onClick={handleOpenChest}
                    className="w-full py-2 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 hover:from-amber-400 hover:to-orange-400 text-white font-black text-xs shadow-md shadow-amber-500/25 transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer disabled:opacity-60"
                  >
                    {isClaimingChest ? (
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                    ) : (
                      <>
                        <span>✨</span>
                        <span>{isEn ? 'Open Treasure Chest' : 'เปิดหีบรับสมบัติทันที'}</span>
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          )}

          {/* View Mode 2: Dragon Mannequin Showcase + Daily Quests */}
          {sidebarTab === 'dragon_quests' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* Widget 1: Animated Dragon Set Mannequin Showcase */}
              <DragonMannequinShowcase onNavigateWardrobe={() => onNavigate('wardrobe')} />

              {/* Widget 2: Daily Quests Progress */}
              <div className="rounded-3xl border-2 border-b-6 border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <span>🎯</span>
                    <span>{isEn ? 'Daily Quests' : 'ภารกิจประจำวัน'}</span>
                  </span>
                  <span className="text-xs font-black text-[#58CC02]">
                    +{xp} XP {isEn ? 'Today' : 'วันนี้'}
                  </span>
                </div>

                {/* Quest 1: Complete 1 Lesson */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-slate-200">
                    <span>{isEn ? 'Complete at least 1 lesson' : 'เรียนจบอย่างน้อย 1 บท'}</span>
                    <span>{user?.statistics?.lessonsCompleted || 0} / 3</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-[#58CC02] transition-all"
                      style={{
                        width: `${Math.min(100, ((user?.statistics?.lessonsCompleted || 0) / 3) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Quest 2: Review SM-2 Vocab */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs font-extrabold text-slate-700 dark:text-slate-200">
                    <span>{isEn ? 'Review 5 vocabulary cards' : 'ทบทวนคำศัพท์สะสม 5 คำ'}</span>
                    <span>{user?.statistics?.vocabMastered || 0} / 5</span>
                  </div>
                  <div className="h-3 w-full overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                    <div
                      className="h-full rounded-full bg-[#1CB0F6] transition-all"
                      style={{
                        width: `${Math.min(100, ((user?.statistics?.vocabMastered || 0) / 5) * 100)}%`,
                      }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onNavigate('vocabulary')}
                  className="w-full py-2.5 btn-duo-yellow text-xs font-black flex items-center justify-center gap-1.5"
                >
                  <Sparkles className="h-3.5 w-3.5" />
                  <span>{isEn ? 'Start Vocabulary Review' : 'เริ่มทบทวนคำศัพท์ทันที'}</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 3. Lesson Node Detail Modal */}
      {selectedNode && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelectedNode(null);
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm select-none"
        >
          <div className="w-full max-w-sm rounded-3xl border-2 border-b-6 border-[#46A302] bg-white p-6 shadow-2xl text-center dark:bg-slate-900 dark:border-slate-700 animate-in fade-in zoom-in-95 space-y-4">
            <div className="mx-auto -mt-12 flex h-20 w-20 items-center justify-center rounded-full border-4 border-[#46A302] bg-[#58CC02] text-white shadow-duo shadow-[#388202]">
              <Star className="h-10 w-10 fill-white" />
            </div>

            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-slate-400">
                {selectedNode.moduleTitle}
              </span>
              <h3 className="text-lg font-black text-slate-900 dark:text-white mt-0.5">
                {selectedNode.displayTitle}
              </h3>
              <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                {selectedNode.courseTitle}
              </p>
            </div>

            {/* Reward badges */}
            <div className="flex items-center justify-center gap-2">
              <span className="flex items-center gap-1 rounded-2xl bg-amber-50 border border-amber-200 px-3 py-1 text-xs font-black text-amber-700 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-300">
                <Sparkles className="h-3.5 w-3.5 text-amber-500" />
                +{selectedNode.xpReward || 20} XP
              </span>
              <span className="flex items-center gap-1 rounded-2xl bg-blue-50 border border-blue-200 px-3 py-1 text-xs font-black text-blue-700 dark:bg-blue-950 dark:border-blue-800 dark:text-blue-300">
                💎 +5 Gems
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  const id = selectedNode.id;
                  setSelectedNode(null);
                  onNavigate('lesson', id);
                }}
                className="w-full py-3 btn-duo-green text-sm flex items-center justify-center gap-2 font-black"
              >
                <Play className="h-4 w-4 fill-white" />
                <span>{isEn ? 'Start Lesson' : 'เริ่มบทเรียนทันที'}</span>
              </button>

              <button
                type="button"
                onClick={() => setSelectedNode(null)}
                className="w-full py-2 text-xs font-extrabold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                {isEn ? 'Close' : 'ไว้ทีหลัง'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

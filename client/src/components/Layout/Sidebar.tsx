import React, { useState, useMemo, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { DuoMascot } from '../Mascot/DuoMascot';
import { LobsterLogoIcon } from '../Mascot/LobsterLogoIcon';
import {
  Compass,
  BookOpen,
  Layers,
  FileText,
  Headphones,
  Mic,
  BookMarked,
  PenTool,
  Award,
  Cpu,
  Brain,
  UserCheck,
  Timer,
  BarChart3,
  ShieldCheck,
  X,
  ChevronDown,
  Search,
  Pin,
  PinOff,
  ChevronsUpDown,
  Flame,
  Zap,
  Crown,
  Sparkles,
  User,
} from 'lucide-react';

export type ActivePage =
  | 'dashboard'
  | 'courses'
  | 'lesson'
  | 'vocabulary'
  | 'wardrobe'
  | 'profile'
  | 'grammar'
  | 'listening'
  | 'speaking'
  | 'reading'
  | 'writing'
  | 'toeic'
  | 'stem'
  | 'logic'
  | 'personality'
  | 'mock-exam'
  | 'analytics'
  | 'admin';

export interface SidebarProps {
  activePage: ActivePage;
  onSelectPage: (page: ActivePage) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  isPinned?: boolean;
  onTogglePin?: () => void;
}

interface NavItem {
  id: ActivePage;
  label: string;
  subLabel?: string;
  icon: React.ElementType;
  color: string;
  badge?: string;
  badgeColor?: string;
}

interface NavSection {
  id: string;
  title: string;
  shortTitle: string;
  items: NavItem[];
}

export const Sidebar: React.FC<SidebarProps> = ({
  activePage,
  onSelectPage,
  mobileOpen,
  onCloseMobile,
  isPinned = true,
  onTogglePin,
}) => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [searchQuery, setSearchQuery] = useState('');
  const [isHovered, setIsHovered] = useState(false);

  // Expanded state: pinned OR temporarily hovered by user's mouse
  const isExpanded = isPinned || isHovered;

  // Persist opened/closed dropdown accordion state in localStorage
  const [openSections, setOpenSections] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem('academy_sidebar_open_groups');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch {}
    return {
      character: true,
      learn: true,
      practice: true,
      exams: true,
      stats: true,
    };
  });

  const navSections: NavSection[] = useMemo(
    () => [
      {
        id: 'character',
        title: isEn ? 'Character & Profile' : 'ตัวละครและข้อมูลส่วนตัว',
        shortTitle: isEn ? 'Character' : 'ตัวละคร',
        items: [
          {
            id: 'wardrobe' as ActivePage,
            label: isEn ? 'Lobster Wardrobe' : 'ห้องแต่งตัวกุ้งมังกร',
            subLabel: isEn ? '18 Outfits & Fire Weapons' : 'ชุดแฟชั่นและอาวุธ 18 ชิ้น',
            icon: Sparkles,
            color: '#EC4899',
            badge: isEn ? 'Shop' : 'ร้านค้า',
            badgeColor: 'bg-pink-100 text-pink-800 dark:bg-pink-950 dark:text-pink-300',
          },
          {
            id: 'profile' as ActivePage,
            label: isEn ? 'Profile & Career Tier' : 'ข้อมูลส่วนตัวและยศตำแหน่ง',
            subLabel: isEn ? '7 Ranks Progression Ladder' : 'บันไดไต่ระดับ 7 ขั้น',
            icon: Crown,
            color: '#FFC800',
            badge: `Lv.${user?.statistics?.level ?? 0}`,
            badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
          },
        ],
      },
      {
        id: 'learn',
        title: isEn ? 'Learning Path' : 'เส้นทางการเรียนรู้',
        shortTitle: isEn ? 'Learn' : 'เรียนรู้',
        items: [
          {
            id: 'dashboard' as ActivePage,
            label: isEn ? 'Learning Path Map' : 'แผนที่การเรียนรู้',
            subLabel: isEn ? 'Stepping Stone Questline' : 'ภารกิจเส้นทางบันไดก้าว',
            icon: Compass,
            color: '#58CC02',
            badge: isEn ? '30 Stages' : '30 ด่าน',
            badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
          },
          {
            id: 'courses' as ActivePage,
            label: isEn ? 'Technical Lessons' : 'บทเรียนวิศวกรรม 30 บท',
            subLabel: isEn ? 'Data Center Curriculum' : 'หลักสูตรวิศวกรรมศูนย์ข้อมูล',
            icon: BookOpen,
            color: '#1CB0F6',
            badge: isEn ? '6 Courses' : '6 คอร์ส',
            badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
          },
          {
            id: 'vocabulary' as ActivePage,
            label: isEn ? 'SM-2 Vocabulary' : 'คลังคำศัพท์ระบบทวนซ้ำ',
            subLabel: isEn ? '347 Technical Term Cards' : 'คำศัพท์วิศวกรรม 347 คำ',
            icon: Layers,
            color: '#FFC800',
            badge: isEn ? '347 Terms' : '347 คำ',
            badgeColor: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300',
          },
        ],
      },
      {
        id: 'practice',
        title: isEn ? '5 Core Skills' : 'ฝึกฝน 5 ทักษะ',
        shortTitle: isEn ? 'Skills' : 'ทักษะ',
        items: [
          {
            id: 'grammar' as ActivePage,
            label: isEn ? 'Technical Grammar' : 'ไวยากรณ์เชิงวิศวกรรม',
            subLabel: isEn ? 'Tenses & Sentence Patterns' : 'โครงสร้างประโยคหน้างาน',
            icon: FileText,
            color: '#FF9600',
            badge: isEn ? '10 Units' : '10 บท',
            badgeColor: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-300',
          },
          {
            id: 'listening' as ActivePage,
            label: isEn ? 'Technical Listening' : 'การฟังหน้างานและเสียงเตือน',
            subLabel: isEn ? 'Alarms & Radio Dispatch' : 'สัญญาณเตือนและวิทยุสื่อสาร',
            icon: Headphones,
            color: '#1CB0F6',
            badge: isEn ? 'Audio' : 'เสียงบรรยาย',
            badgeColor: 'bg-sky-100 text-sky-800 dark:bg-sky-950 dark:text-sky-300',
          },
          {
            id: 'speaking' as ActivePage,
            label: isEn ? 'Speaking Studio' : 'ฝึกออกเสียงและการพูดสื่อสาร',
            subLabel: isEn ? 'AI Speech Assessment' : 'ตรวจจับสำเนียงด้วยปัญญาประดิษฐ์',
            icon: Mic,
            color: '#FF4B4B',
            badge: isEn ? 'AI Voice' : 'ตรวจเสียง AI',
            badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
          },
          {
            id: 'reading' as ActivePage,
            label: isEn ? 'SOP Manual Reading' : 'อ่านคู่มือมาตรฐานการปฏิบัติงาน',
            subLabel: isEn ? 'Data Center Standards' : 'มาตรฐานศูนย์ข้อมูลระดับสากล',
            icon: BookMarked,
            color: '#CE82FF',
            badge: isEn ? 'Manual' : 'คู่มือปฏิบัติ',
            badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
          },
          {
            id: 'writing' as ActivePage,
            label: isEn ? 'Report Writing' : 'การเขียนรายงานสรุปงาน',
            subLabel: isEn ? 'Incident & Shift Logs' : 'รายงานเหตุขัดข้องและส่งกะ',
            icon: PenTool,
            color: '#58CC02',
            badge: isEn ? 'Reports' : 'รายงาน',
            badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
          },
        ],
      },
      {
        id: 'exams',
        title: isEn ? 'Exams & Mock Tests' : 'คลังข้อสอบและจำลองสอบ',
        shortTitle: isEn ? 'Exams' : 'ข้อสอบ',
        items: [
          {
            id: 'toeic' as ActivePage,
            label: isEn ? 'TOEIC Examination' : 'ศูนย์สอบโทอิค ครบ 7 ส่วน',
            subLabel: isEn ? 'Full Listening & Reading' : 'ข้อสอบการฟังและการอ่านตามแนวจริง',
            icon: Award,
            color: '#FF9600',
            badge: isEn ? 'TOEIC' : 'โทอิค',
            badgeColor: 'bg-orange-100 text-orange-900 dark:bg-orange-950 dark:text-orange-300',
          },
          {
            id: 'stem' as ActivePage,
            label: isEn ? 'STEM & Technical Exam' : 'สอบความถนัดสะเต็มและศูนย์ข้อมูล',
            subLabel: isEn ? 'Power, Cooling & Network' : 'ระบบไฟฟ้า ทำความเย็น และเครือข่าย',
            icon: Cpu,
            color: '#1CB0F6',
            badge: isEn ? 'Tech' : 'วิศวกรรม',
            badgeColor: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300',
          },
          {
            id: 'logic' as ActivePage,
            label: isEn ? 'Logic & Reasoning' : 'ตรรกศาสตร์และเชาวน์ปัญญา',
            subLabel: isEn ? 'Aptitude & Pattern Analytics' : 'การวิเคราะห์แบบแผนและเหตุผล',
            icon: Brain,
            color: '#CE82FF',
            badge: isEn ? 'Logic' : 'ตรรกะ',
            badgeColor: 'bg-purple-100 text-purple-800 dark:bg-purple-950 dark:text-purple-300',
          },
          {
            id: 'personality' as ActivePage,
            label: isEn ? 'Personality Assessment' : 'แบบประเมินบุคลิกภาพ 5 มิติ',
            subLabel: isEn ? 'Big Five Professional Fit' : 'ความเหมาะสมกับตำแหน่งงานวิศวกรรม',
            icon: UserCheck,
            color: '#58CC02',
            badge: isEn ? 'Big 5' : '5 มิติ',
            badgeColor: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300',
          },
          {
            id: 'mock-exam' as ActivePage,
            label: isEn ? 'Timed Mock Exam' : 'การสอบจำลองจับเวลาจริง',
            subLabel: isEn ? 'Realistic Exam Simulator' : 'เสมือนการนั่งสอบจริง 100%',
            icon: Timer,
            color: '#FF4B4B',
            badge: isEn ? 'Timed' : 'จับเวลา',
            badgeColor: 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300',
          },
        ],
      },
      {
        id: 'stats',
        title: isEn ? 'Statistics & Admin' : 'สถิติและผู้ดูแล',
        shortTitle: isEn ? 'Stats' : 'สถิติ',
        items: [
          {
            id: 'analytics' as ActivePage,
            label: isEn ? 'Skill Radar & Analytics' : 'สถิติการเรียนและเรดาร์ทักษะ',
            subLabel: isEn ? 'Competency Matrix' : 'วิเคราะห์จุดแข็งและพัฒนาการรายบุคคล',
            icon: BarChart3,
            color: '#1CB0F6',
            badge: isEn ? 'Radar' : 'เรดาร์',
            badgeColor: 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300',
          },
          ...(user?.role === 'ADMIN'
            ? [
                {
                  id: 'admin' as ActivePage,
                  label: isEn ? 'Admin Console' : 'ศูนย์ควบคุมผู้ดูแลระบบ',
                  subLabel: isEn ? 'Manage Users & Gift Dispenser' : 'จัดการผู้ใช้และระบบมอบของขวัญ',
                  icon: ShieldCheck,
                  color: '#FF4B4B',
                  badge: isEn ? 'Admin' : 'แอดมิน',
                  badgeColor: 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300',
                },
              ]
            : []),
        ],
      },
    ],
    [user?.role, isEn, user?.statistics?.level]
  );


  // Auto-expand the accordion section containing activePage so user never loses orientation
  useEffect(() => {
    const parentSection = navSections.find((sec) =>
      sec.items.some((item) => item.id === activePage)
    );
    if (parentSection && !openSections[parentSection.id]) {
      setOpenSections((prev) => {
        const next = { ...prev, [parentSection.id]: true };
        try {
          localStorage.setItem('academy_sidebar_open_groups', JSON.stringify(next));
        } catch {}
        return next;
      });
    }
  }, [activePage, navSections]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) => {
      const next = { ...prev, [sectionId]: !prev[sectionId] };
      try {
        localStorage.setItem('academy_sidebar_open_groups', JSON.stringify(next));
      } catch {}
      return next;
    });
  };

  const areAllExpanded = useMemo(() => {
    return navSections.every((sec) => openSections[sec.id] !== false);
  }, [navSections, openSections]);

  const toggleAllSections = () => {
    const nextState = !areAllExpanded;
    const next: Record<string, boolean> = {};
    navSections.forEach((sec) => {
      next[sec.id] = nextState;
    });
    setOpenSections(next);
    try {
      localStorage.setItem('academy_sidebar_open_groups', JSON.stringify(next));
    } catch {}
  };

  const handleNav = (page: ActivePage) => {
    onSelectPage(page);
    onCloseMobile();
    if (!isPinned) {
      setIsHovered(false);
    }
  };

  // Filtered navigation list based on instant search query
  const filteredSections = useMemo(() => {
    if (!searchQuery.trim()) return navSections;
    const q = searchQuery.toLowerCase().trim();
    return navSections
      .map((section) => ({
        ...section,
        items: section.items.filter(
          (item) =>
            item.label.toLowerCase().includes(q) ||
            item.subLabel?.toLowerCase().includes(q) ||
            item.id.toLowerCase().includes(q) ||
            item.badge?.toLowerCase().includes(q)
        ),
      }))
      .filter((section) => section.items.length > 0);
  }, [searchQuery, navSections]);

  const streak = user?.streak?.currentStreak || 1;
  const xp = user?.statistics?.xp || 0;

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden transition-opacity"
          aria-hidden="true"
        />
      )}

      {/* Desktop Layout Placeholder Spacer to prevent content shifting when hovered */}
      <div
        className={`hidden lg:block shrink-0 transition-all duration-300 ease-in-out ${
          isPinned ? 'w-72' : 'w-[72px]'
        }`}
        aria-hidden="true"
      />

      {/* Main Sidebar Container with Smooth Hover-Slide-Out Animation */}
      <aside
        onMouseEnter={() => {
          if (!isPinned) setIsHovered(true);
        }}
        onMouseLeave={() => {
          if (!isPinned) setIsHovered(false);
        }}
        className={`fixed inset-y-0 left-0 z-40 flex flex-col border-r-2 border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900 select-none transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          mobileOpen ? 'translate-x-0 w-72 shadow-2xl' : '-translate-x-full lg:translate-x-0'
        } ${
          isExpanded
            ? 'w-72 shadow-2xl lg:shadow-xl'
            : 'w-72 lg:w-[72px] lg:shadow-none'
        }`}
      >
        {/* Top Header / Brand & Sleek Pin Control */}
        <div className="flex h-16 shrink-0 items-center justify-between border-b-2 border-slate-200 px-3.5 dark:border-slate-800 overflow-hidden">
          {/* Logo & Brand Details */}
          <div className="flex items-center gap-2.5 min-w-0">
            <LobsterLogoIcon size={38} className="cursor-pointer hover:scale-105 active:scale-95 transition-transform" />
            <div
              className={`min-w-0 transition-all duration-300 ${
                isExpanded ? 'opacity-100 max-w-[160px]' : 'opacity-0 max-w-0 pointer-events-none'
              }`}
            >
              <h2 className="truncate text-sm font-black tracking-tight text-slate-800 dark:text-white">
                English & STEM
              </h2>
              <p className="text-[10px] font-extrabold text-[#58CC02] truncate">
                Data Center Academy
              </p>
            </div>
          </div>

          {/* Controls: Modern Sleek Pin Button (Single source of control, no duplicates!) */}
          <div className="flex items-center gap-1 shrink-0">
            {/* Desktop Modern Pin / Slide Toggle */}
            {onTogglePin && (
              <button
                onClick={onTogglePin}
                className={`hidden lg:flex h-8 w-8 items-center justify-center rounded-xl transition-all duration-200 ${
                  isPinned
                    ? 'bg-blue-50 text-[#1CB0F6] border border-blue-200 dark:bg-blue-950/60 dark:border-blue-800 dark:text-blue-300 shadow-sm'
                    : 'text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200'
                }`}
                title={
                  isPinned
                    ? 'ตรึงแถบเมนูอยู่ (คลิกเพื่อย่อ และเลื่อนขยายเมื่อชี้เมาส์)'
                    : 'คลิกเพื่อตรึงแถบเมนูค้างไว้ (ปัจจุบันจะเลื่อนขยายอัตโนมัติเมื่อเลื่อนเมาส์วาง)'
                }
              >
                {isPinned ? (
                  <Pin className="h-4 w-4 rotate-45 text-[#1CB0F6]" />
                ) : (
                  <PinOff className="h-4 w-4" />
                )}
              </button>
            )}

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="flex h-8 w-8 items-center justify-center rounded-xl text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200 lg:hidden"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Quick Search & Accordion Controls (Fades in smoothly when expanded) */}
        <div
          className={`shrink-0 border-b border-slate-100 dark:border-slate-800/60 p-2.5 space-y-2 transition-all duration-300 ${
            isExpanded ? 'opacity-100 max-h-32' : 'opacity-0 max-h-0 p-0 overflow-hidden border-none'
          }`}
        >
          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={isEn ? 'Search menu...' : 'ค้นหาเมนู...'}
              className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-7 text-xs font-bold text-slate-700 placeholder-slate-400 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200 dark:placeholder-slate-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            )}
          </div>

          {/* Quick Actions Bar: Collapse All / Expand All */}
          {!searchQuery && (
            <div className="flex items-center justify-between px-1 text-[11px] font-bold text-slate-400 dark:text-slate-500">
              <span>{isEn ? `Categories (${navSections.length})` : `หมวดหมู่ (${navSections.length})`}</span>
              <button
                onClick={toggleAllSections}
                className="flex items-center gap-1 rounded-lg px-2 py-0.5 text-[10px] font-extrabold text-[#1CB0F6] hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
              >
                <ChevronsUpDown className="h-3 w-3" />
                <span>{areAllExpanded ? (isEn ? 'Collapse All' : 'ย่อทั้งหมด') : (isEn ? 'Expand All' : 'ขยายทั้งหมด')}</span>
              </button>
            </div>
          )}
        </div>

        {/* Scrollable Navigation Items Area (Strictly Independent Scroll) */}
        <div className="flex-1 overflow-y-auto px-2.5 py-3 space-y-3 scrollbar-thin">
          {filteredSections.map((section) => {
            const isSectionOpen = searchQuery ? true : openSections[section.id] !== false;
            const hasActiveChild = section.items.some((item) => item.id === activePage);

            return (
              <div key={section.id} className="space-y-1">
                {/* Section Header Accordion Trigger */}
                {isExpanded ? (
                  <button
                    type="button"
                    onClick={() => toggleSection(section.id)}
                    aria-expanded={isSectionOpen}
                    className="group flex w-full items-center justify-between rounded-xl px-2.5 py-1.5 text-left text-[11px] font-black uppercase tracking-wider text-slate-500 hover:bg-slate-100 hover:text-slate-800 dark:text-slate-400 dark:hover:bg-slate-800/60 dark:hover:text-slate-200 transition-colors"
                  >
                    <div className="flex items-center gap-1.5 min-w-0">
                      <span className="truncate">{section.title}</span>
                      {!isSectionOpen && hasActiveChild && (
                        <span className="flex h-2 w-2 rounded-full bg-[#1CB0F6] animate-pulse" />
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="rounded-md bg-slate-200/80 px-1.5 py-0.2 text-[9px] font-bold text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                        {section.items.length}
                      </span>
                      <ChevronDown
                        className={`h-3.5 w-3.5 text-slate-400 transition-transform duration-200 ${
                          isSectionOpen ? 'rotate-0' : '-rotate-90'
                        }`}
                      />
                    </div>
                  </button>
                ) : (
                  /* Mini Divider in Rail Mode */
                  <div className="my-1 border-t border-slate-200 dark:border-slate-800" />
                )}

                {/* Collapsible Items Content */}
                {(isSectionOpen || !isExpanded) && (
                  <div className="space-y-1 pt-0.5">
                    {section.items.map((item) => {
                      const Icon = item.icon;
                      const isActive = activePage === item.id;

                      /* Collapsed Rail View (When not expanded) */
                      if (!isExpanded) {
                        return (
                          <div key={item.id} className="relative group flex justify-center">
                            <button
                              onClick={() => handleNav(item.id)}
                              className={`relative flex h-11 w-11 items-center justify-center rounded-2xl transition-all ${
                                isActive
                                  ? 'border-2 border-b-4 border-[#1899D6] bg-[#DDF4FF] text-[#1CB0F6] shadow-sm dark:bg-blue-950/60 dark:border-blue-500'
                                  : 'border-2 border-transparent text-slate-500 hover:bg-slate-100 hover:scale-105 dark:text-slate-400 dark:hover:bg-slate-800'
                              }`}
                            >
                              <span
                                className="flex h-7 w-7 items-center justify-center rounded-xl"
                                style={{
                                  backgroundColor: isActive ? item.color : `${item.color}20`,
                                  color: isActive ? '#ffffff' : item.color,
                                }}
                              >
                                <Icon className="h-4 w-4" />
                              </span>

                              {/* Active Left Indicator Bar */}
                              {isActive && (
                                <span className="absolute -left-2 top-2 bottom-2 w-1.5 rounded-r-full bg-[#1CB0F6]" />
                              )}
                            </button>

                            {/* Floating Hover Tooltip */}
                            <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover:flex flex-col whitespace-nowrap rounded-2xl border-2 border-slate-200 bg-white p-2.5 shadow-xl dark:border-slate-700 dark:bg-slate-800 animate-in fade-in zoom-in-95 pointer-events-none">
                              <div className="flex items-center gap-2">
                                <span
                                  className="h-2 w-2 rounded-full"
                                  style={{ backgroundColor: item.color }}
                                />
                                <span className="text-xs font-black text-slate-800 dark:text-white">
                                  {item.label}
                                </span>
                                {item.badge && (
                                  <span
                                    className={`rounded-md px-1.5 py-0.5 text-[9px] font-black ${
                                      item.badgeColor || 'bg-blue-100 text-blue-800'
                                    }`}
                                  >
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              {item.subLabel && (
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-400 pl-4">
                                  {item.subLabel}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      }

                      /* Full Expanded Item View */
                      return (
                        <button
                          key={item.id}
                          onClick={() => handleNav(item.id)}
                          className={`group flex w-full items-center justify-between rounded-2xl px-3 py-2 text-xs font-black transition-all ${
                            isActive
                              ? 'border-2 border-b-4 border-[#1899D6] bg-[#DDF4FF] text-[#1CB0F6] dark:bg-blue-950/60 dark:border-blue-500 dark:text-blue-200 shadow-sm'
                              : 'border-2 border-transparent text-slate-600 hover:bg-slate-100/90 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-800/70 dark:hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5 min-w-0">
                            <span
                              className="flex h-7 w-7 shrink-0 items-center justify-center rounded-xl transition-transform group-hover:scale-110 shadow-sm"
                              style={{
                                backgroundColor: isActive ? item.color : `${item.color}20`,
                                color: isActive ? '#ffffff' : item.color,
                              }}
                            >
                              <Icon className="h-4 w-4" />
                            </span>
                            <div className="min-w-0 text-left">
                              <p className="truncate leading-tight">{item.label}</p>
                              {item.subLabel && (
                                <p className="truncate text-[10px] font-bold text-slate-400 dark:text-slate-500">
                                  {item.subLabel}
                                </p>
                              )}
                            </div>
                          </div>

                          {/* Item Badge */}
                          {item.badge && (
                            <span
                              className={`shrink-0 rounded-lg px-2 py-0.5 text-[9px] font-black tracking-wide ${
                                item.badgeColor ||
                                'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                              }`}
                            >
                              {item.badge}
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}

          {filteredSections.length === 0 && (
            <div className="rounded-2xl border border-dashed border-slate-300 p-4 text-center dark:border-slate-700">
              <p className="text-xs font-extrabold text-slate-500 dark:text-slate-400">
                {isEn ? `No menu matching "${searchQuery}"` : `ไม่พบเมนู "${searchQuery}"`}
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="mt-2 rounded-xl bg-slate-100 px-3 py-1 text-[11px] font-black text-[#1CB0F6] dark:bg-slate-800"
              >
                {isEn ? 'Clear Search' : 'ล้างคำค้นหา'}
              </button>
            </div>
          )}
        </div>

        {/* Footer Area: Lobster Warrior Mascot & Quick Status */}
        <div className="shrink-0 border-t-2 border-slate-200 p-3 dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 overflow-hidden">
          {isExpanded ? (
            <div
              onClick={() => handleNav('wardrobe')}
              className="flex items-center gap-3 rounded-2xl bg-gradient-to-r from-red-50 to-orange-50 border-2 border-red-200/80 p-2.5 dark:from-red-950/30 dark:to-orange-950/20 dark:border-red-900/40 cursor-pointer hover:scale-[1.02] active:scale-95 transition-all"
              title={isEn ? 'Click to visit Lobster Wardrobe 🦞' : 'คลิกเพื่อเข้าสู่ห้องแต่งตัวกุ้งมังกร 🦞'}
            >
              <div className="shrink-0">
                <DuoMascot mood="happy" stance="ready" size={44} />
              </div>
              <div className="min-w-0 text-left flex-1">
                <div className="flex items-center gap-1">
                  <span className="text-[11px] font-black text-red-950 dark:text-red-200 truncate">
                    {isEn ? 'Lobster Warrior Cheer!' : 'กุ้งมังกรนักดาบส่งกำลังใจ!'}
                  </span>
                </div>
                <p className="text-[10px] font-extrabold text-red-700 dark:text-red-400 truncate">
                  {isEn ? 'Dragon Warrior ⚔️ Wardrobe >' : 'นักรบกุ้งมังกร ⚔️ ห้องแต่งตัว >'}
                </p>
                <div className="mt-1 flex items-center gap-2 text-[9px] font-black text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-0.5 text-orange-600 dark:text-orange-400">
                    <Flame className="h-3 w-3 fill-orange-500" />
                    {isEn ? `Streak ${streak} Days` : `ต่อเนื่อง ${streak} วัน`}
                  </span>
                  <span>•</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    {xp} XP
                  </span>
                </div>
              </div>
            </div>
          ) : (
            /* Mini Mascot Avatar in Rail Mode */
            <div
              onClick={() => handleNav('wardrobe')}
              className="flex justify-center group relative cursor-pointer hover:scale-110 active:scale-95 transition-transform"
              title={isEn ? 'Wardrobe & Armory' : 'ห้องแต่งตัวและคลังอาวุธ'}
            >
              <DuoMascot mood="happy" stance="ready" size={38} />
              <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 z-50 hidden group-hover:flex flex-col whitespace-nowrap rounded-2xl border-2 border-red-200 bg-white p-2.5 shadow-xl dark:border-red-900 dark:bg-slate-800 animate-in fade-in zoom-in-95 pointer-events-none">
                <span className="text-xs font-black text-red-700 dark:text-red-300">
                  {isEn ? 'Lobster Warrior Cheer! ⚔️' : 'กุ้งมังกรนักดาบส่งกำลังใจ! ⚔️'}
                </span>
                <span className="text-[10px] font-extrabold text-slate-500 dark:text-slate-400">
                  {isEn ? `Streak ${streak} Days • ${xp} XP` : `ต่อเนื่อง ${streak} วัน • ${xp} XP`}
                </span>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

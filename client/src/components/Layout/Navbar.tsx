import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useLanguage } from '../../context/LanguageContext';
import { Sun, Moon, Flame, Zap, Shield, LogOut, Menu, Heart, Gem, Crown, Globe } from 'lucide-react';
import { ActivePage } from './Sidebar';
import { LobsterLogoIcon } from '../Mascot/LobsterLogoIcon';

interface NavbarProps {
  onToggleMobileSidebar: () => void;
  onSelectPage?: (page: ActivePage) => void;
  activePage?: ActivePage;
  onOpenTopup?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onToggleMobileSidebar,
  onSelectPage,
  activePage = 'dashboard',
  onOpenTopup,
}) => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { language, toggleLanguage, t } = useLanguage();
  const isEn = language === 'en';

  const xp = user?.statistics?.xp ?? 0;
  const level = user?.statistics?.level ?? 0;
  const streak = user?.streak?.currentStreak || 1;
  const gems = user?.statistics?.gems ?? 50;
  const coins = user?.statistics?.coins ?? 0;
  const isVip = Boolean(user?.statistics?.isVip || user?.role === 'ADMIN');
  const hearts = 5;

  const handleOpenTopup = () => {
    if (onOpenTopup) {
      onOpenTopup();
    } else {
      onSelectPage?.('wardrobe');
    }
  };

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full shrink-0 items-center justify-between border-b-2 border-slate-200 bg-white/95 px-3 sm:px-6 backdrop-blur dark:border-slate-800 dark:bg-slate-900/95 select-none">
      {/* Left: Mobile Toggle / Desktop Clean Context Title (Zero Duplicate Header) */}
      <div className="flex items-center gap-3">
        {/* Mobile Hamburger Toggle */}
        <button
          onClick={onToggleMobileSidebar}
          className="rounded-2xl p-2 text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 lg:hidden"
          aria-label="Toggle navigation menu"
        >
          <Menu className="h-5 w-5" />
        </button>

        {/* Mobile Logo Only */}
        <div 
          onClick={() => onSelectPage?.('dashboard')}
          className="flex items-center gap-2 cursor-pointer lg:hidden"
        >
          <LobsterLogoIcon size={34} />
          <span className="text-xs font-black tracking-tight text-slate-900 dark:text-white">
            STEM Academy
          </span>
        </div>

        {/* Desktop Breadcrumb Context (Replaces duplicate logo with clean page indicator) */}
        <div className="hidden lg:flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-100 text-base dark:bg-slate-800 shadow-xs overflow-hidden">
            {activePage === 'dashboard' ? (
              <LobsterLogoIcon size={30} withBackground={false} />
            ) : activePage === 'wardrobe' ? (
              '👗'
            ) : activePage === 'courses' ? (
              '📚'
            ) : activePage === 'admin' ? (
              '🛡️'
            ) : (
              '⚡'
            )}
          </div>
          <div>
            <h2 className="text-sm font-black text-slate-800 dark:text-white leading-tight">
              {t(activePage)}
            </h2>
            <p className="text-[10px] font-bold text-slate-400">
              {isEn ? 'Data Center & Engineering Prep' : 'เตรียมความพร้อมงานวิศวกรรมศูนย์ข้อมูล'}
            </p>
          </div>
        </div>
      </div>

      {user && (
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* VIP Badge - Clickable to open top-up */}
          {isVip && (
            <button
              onClick={handleOpenTopup}
              title={isEn ? 'VIP Dragon Knight Active - Click to view status' : 'ยศ VIP Dragon Knight - คลิกเพื่อดูสิทธิ์และเติมเงิน'}
              className="flex items-center gap-1.5 rounded-2xl border-2 border-amber-400 bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 px-2.5 py-1 text-xs font-black text-amber-950 shadow-duo shadow-amber-500/50 animate-pulse hover:scale-105 active:scale-95 transition-all"
            >
              <span>👑</span>
              <span className="hidden md:inline">{isEn ? 'VIP Dragon' : 'ยศ VIP'}</span>
            </button>
          )}

          {/* Streak Flame */}
          <div
            title={isEn ? `${streak} Day Streak` : `เรียนต่อเนื่อง ${streak} วัน`}
            className="flex items-center gap-1.5 rounded-2xl border-2 border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-black text-orange-600 dark:border-orange-900/50 dark:bg-orange-950/40 dark:text-orange-400"
          >
            <Flame className="h-4 w-4 fill-[#FF9600] text-[#FF9600] animate-bounce" />
            <span>{streak}</span>
          </div>

          {/* Gems / Diamonds - Clickable to top up */}
          <button
            onClick={handleOpenTopup}
            title={isEn ? `${gems} Gems - Click to top up` : `อัญมณีสะสม ${gems} เม็ด - คลิกเพื่อเติมเงิน`}
            className="flex items-center gap-1.5 rounded-2xl border-2 border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-black text-blue-600 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            <Gem className="h-4 w-4 fill-[#1CB0F6] text-[#1CB0F6]" />
            <span>{gems}</span>
          </button>

          {/* Gold Coins (🪙) - Clickable anywhere on navbar to trigger topup */}
          <button
            onClick={handleOpenTopup}
            title={isEn ? `${coins.toLocaleString()} Gold Coins - Click to top up via SCB` : `เหรียญทอง ${coins.toLocaleString()} เหรียญ - คลิกเพื่อเติมเงินผ่านไทยพาณิชย์`}
            className="flex items-center gap-1.5 rounded-2xl border-2 border-amber-300 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            <span className="text-sm">🪙</span>
            <span>{coins.toLocaleString()}</span>
          </button>

          {/* Hearts (Lives) */}
          <div
            title={isEn ? 'Full Health 5/5 Hearts' : 'พลังชีวิตเต็ม 5/5 หัวใจ'}
            className="hidden sm:flex items-center gap-1.5 rounded-2xl border-2 border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-black text-rose-600 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-400"
          >
            <Heart className="h-4 w-4 fill-[#FF4B4B] text-[#FF4B4B]" />
            <span>{hearts}</span>
          </div>

          {/* Level Badge */}
          <button
            onClick={() => onSelectPage?.('profile')}
            title={isEn ? `Level ${level} (${xp} XP)` : `เลเวล ${level} (${xp} XP)`}
            className="hidden md:flex items-center gap-1.5 rounded-2xl border-2 border-amber-200 bg-amber-50 px-2.5 py-1 text-xs font-black text-amber-700 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-300 hover:bg-amber-100 dark:hover:bg-amber-900/40 transition-all hover:scale-105 active:scale-95 shadow-xs"
          >
            <Crown className="h-4 w-4 fill-[#FFC800] text-[#FFC800]" />
            <span>Lv.{level}</span>
          </button>

          {/* Language Switcher Button (Strict Thai / English without mixing) */}
          <button
            onClick={toggleLanguage}
            className="flex items-center gap-1 rounded-2xl border-2 border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-black text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-all active:scale-95 shadow-xs"
            title={isEn ? 'เปลี่ยนเป็นภาษาไทย' : 'Switch to English'}
          >
            <span>{isEn ? '🇬🇧 EN' : '🇹🇭 TH'}</span>
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-2 text-slate-600 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-slate-700 transition-all"
            title={theme === 'dark' ? (isEn ? 'Light Mode' : 'เปิดโหมดสว่าง') : (isEn ? 'Dark Mode' : 'เปิดโหมดมืด')}
          >
            {theme === 'dark' ? (
              <Sun className="h-4 w-4 text-amber-400" />
            ) : (
              <Moon className="h-4 w-4 text-slate-600" />
            )}
          </button>

          {/* User Profile Pill */}
          <div className="flex items-center gap-1.5 pl-1 border-l-2 border-slate-200 dark:border-slate-800">
            <button
              onClick={() => onSelectPage?.('profile')}
              title={isEn ? 'Profile & Career Tier' : 'ข้อมูลส่วนตัวและยศตำแหน่ง'}
              className="flex items-center gap-2 p-1 rounded-2xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-left"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#58CC02] text-white font-black text-xs shadow-duo shadow-[#46A302] overflow-hidden">
                {user.profile?.avatar?.startsWith('http') || user.profile?.avatar?.startsWith('data:') ? (
                  <img src={user.profile.avatar} alt="Avatar" className="w-full h-full object-cover" />
                ) : user.profile?.avatar === 'lobster-dragon' ? (
                  '👑'
                ) : user.profile?.avatar === 'lobster-datacenter' ? (
                  '🥽'
                ) : user.profile?.avatar === 'lobster-cyber' ? (
                  '⚡'
                ) : user.profile?.avatar === 'lobster-crown' ? (
                  '🏆'
                ) : user.profile?.avatar === 'lobster-lab' ? (
                  '🔬'
                ) : user.profile?.avatar === 'avatar-knight' ? (
                  '🛡️'
                ) : user.profile?.avatar === 'avatar-ninja' ? (
                  '🥷'
                ) : user.profile?.avatar === 'avatar-wizard' ? (
                  '🧙‍♂️'
                ) : user.profile?.avatar === 'avatar-astronaut' ? (
                  '👨‍🚀'
                ) : (
                  <LobsterLogoIcon size={24} withBackground={false} />
                )}
              </div>
              <div className="hidden xl:block text-left">
                <p className="text-xs font-extrabold text-slate-800 dark:text-slate-100 leading-tight">
                  {user.name.split(' ')[0]}
                </p>
                <span
                  className={`rounded-md px-1.5 py-0.2 text-[9px] font-black uppercase ${
                    user.role === 'ADMIN'
                      ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                      : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                  }`}
                >
                  {user.role}
                </span>
              </div>
            </button>

            <button
              onClick={logout}
              className="rounded-2xl p-2 text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 transition-colors"
              title={isEn ? 'Sign Out' : 'ออกจากระบบ'}
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

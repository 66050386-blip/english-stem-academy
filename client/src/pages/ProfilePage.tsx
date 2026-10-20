import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';
import { DuoMascot } from '../components/Mascot/DuoMascot';
import { LobsterLogoIcon } from '../components/Mascot/LobsterLogoIcon';
import { broadcastAppUpdate } from '../utils/realtimeSync';
import {
  User,
  Crown,
  Gem,
  Flame,
  Award,
  Shield,
  Zap,
  Lock,
  Edit3,
  CheckCircle2,
  Clock,
  BookOpen,
  Layers,
  BarChart3,
  TrendingUp,
  Sparkles,
  Camera,
  X,
  Check,
  Globe,
} from 'lucide-react';

interface ProfilePageProps {
  onNavigateToWardrobe?: () => void;
}

const RANK_LADDER = [
  {
    level: 0,
    minXp: 0,
    maxXp: 99,
    titleEn: 'Intern Trainee',
    titleTh: 'เด็กฝึกงานเทคนิค',
    badge: '🥉 เริ่มต้น',
    descTh: 'ก้าวแรกสู่วงการ Data Center เริ่มต้นสะสมพื้นฐานภาษาและคณิต-วิทย์ช่าง',
    descEn: 'First step into Data Center infrastructure. Building fundamental technical English and STEM math.',
  },
  {
    level: 1,
    minXp: 100,
    maxXp: 249,
    titleEn: 'Junior Technician',
    titleTh: 'ช่างเทคนิคฝึกหัด',
    badge: '🥈 เลเวล 1',
    descTh: 'เริ่มเข้าใจศัพท์ช่างพื้นฐาน กฎความปลอดภัย SOP และคำศัพท์ SM-2 ในห้องเซิร์ฟเวอร์',
    descEn: 'Understanding basic technical vocabulary, safety protocols, server room SOPs and SM-2 flashcards.',
  },
  {
    level: 2,
    minXp: 250,
    maxXp: 499,
    titleEn: 'Facility Specialist',
    titleTh: 'เจ้าหน้าที่ปฏิบัติการดาต้าเซ็นเตอร์',
    badge: '🔧 เลเวล 2',
    descTh: 'ตรวจเช็คระบบไฟฟ้า UPS ปรับอากาศ CRAC/CRAH และแก้ปัญหาเฉพาะหน้าได้อย่างถูกต้อง',
    descEn: 'Inspecting 3-phase UPS systems, CRAC/CRAH cooling units, and executing contingency work orders.',
  },
  {
    level: 3,
    minXp: 500,
    maxXp: 999,
    titleEn: 'Critical Infrastructure Tech',
    titleTh: 'ผู้เชี่ยวชาญระบบไฟฟ้า-ทำความเย็น',
    badge: '⚡ เลเวล 3',
    descTh: 'คำนวณโหลดไฟฟ้า 3 เฟส ค่า PUE ความร้อน BTU/hr และสื่อสารภาษาอังกฤษคล่องแคล่ว',
    descEn: 'Calculating 3-phase electrical loads, PUE efficiency metrics, and communicating fluently in English.',
  },
  {
    level: 4,
    minXp: 1000,
    maxXp: 1999,
    titleEn: 'Senior Operations Engineer',
    titleTh: 'วิศวกรอาวุโสดาต้าเซ็นเตอร์',
    badge: '🛡️ เลเวล 4',
    descTh: 'เขียนรายงาน Incident Report, RCA วิเคราะห์หาสาเหตุรากเหง้า และนำทีมรับมือสถานการณ์ฉุกเฉิน',
    descEn: 'Drafting incident RCA root cause reports, coordinating site safety, and leading emergency responses.',
  },
  {
    level: 5,
    minXp: 2000,
    maxXp: 4999,
    titleEn: 'Site Reliability Lead',
    titleTh: 'หัวหน้าทีมวิศวกรรมปฏิบัติการ',
    badge: '👑 เลเวล 5',
    descTh: 'บริหารจัดการมาตรฐาน Tier III/IV Uptime Institute ควบคุมการบำรุงรักษาเชิงป้องกัน',
    descEn: 'Directing Tier III/IV Uptime Institute maintenance protocols and overall infrastructure reliability.',
  },
  {
    level: 6,
    minXp: 5000,
    maxXp: 10000,
    titleEn: 'Chief Data Center Architect',
    titleTh: 'ผู้บริหารสถาปัตยกรรมดาต้าเซ็นเตอร์',
    badge: '🌟 ตำนานสูงสุด',
    descTh: 'ผู้ออกแบบและวางสถาปัตยกรรมระดับประเทศ ควบคุมโครงสร้างพื้นฐานระดับ Hyperscale',
    descEn: 'Master architectural designer and visionary leader of national Hyperscale cloud facilities.',
  },
];

const AVATAR_OPTIONS = [
  {
    id: 'lobster-hero',
    nameTh: 'กุ้งนักดาบผู้กล้าหาญ',
    nameEn: 'Hero Katana Lobster',
    icon: '🦞',
    badge: '⚔️ ผู้กล้า',
    lobsterGear: { headgear: 'NONE', outfit: 'DEFAULT', weapon: 'STEEL_KATANA', shoes: 'SNEAKERS' },
  },
  {
    id: 'lobster-dragon',
    nameTh: 'อัศวินกุ้งมังกรทองคำ VIP',
    nameEn: 'VIP Dragon Knight Lobster',
    icon: '👑',
    badge: '👑 มังกรทอง',
    lobsterGear: { headgear: 'DRAGON_HELM', outfit: 'DRAGON_ARMOR', weapon: 'DRAGON_BLADE', shoes: 'DRAGON_BOOTS' },
  },
  {
    id: 'lobster-datacenter',
    nameTh: 'วิศวกรกุ้งศูนย์ข้อมูล Data Center',
    nameEn: 'Data Center Facility Tech',
    icon: '🥽',
    badge: '🔧 วิศวกร',
    lobsterGear: { headgear: 'SAFETY_HELMET', outfit: 'SAFETY_VEST', weapon: 'TITANIUM_WRENCH', shoes: 'SAFETY_BOOTS' },
  },
  {
    id: 'lobster-cyber',
    nameTh: 'จอมดาบไซเบอร์พังค์',
    nameEn: 'Cyberpunk Blade Ronin',
    icon: '⚡',
    badge: '⚡ ไซเบอร์',
    lobsterGear: { headgear: 'CYBER_VISOR', outfit: 'CYBER_ARMOR', weapon: 'PLASMA_BLADE', shoes: 'CYBER_HOVER' },
  },
  {
    id: 'lobster-crown',
    nameTh: 'แชมเปียนนักดาบมงกุฎทอง',
    nameEn: 'Crown Champion Lobster',
    icon: '🏆',
    badge: '🌟 แชมป์',
    lobsterGear: { headgear: 'GOLD_CROWN', outfit: 'SAMURAI_ROBE', weapon: 'GOLD_RAPIER', shoes: 'SNEAKERS' },
  },
  {
    id: 'lobster-lab',
    nameTh: 'นักวิจัยแล็บควอนตัม',
    nameEn: 'Quantum Lab Scientist',
    icon: '🔬',
    badge: '🧪 นักวิจัย',
    lobsterGear: { headgear: 'TECH_HEADSET', outfit: 'LAB_COAT', weapon: 'FIBER_WAND', shoes: 'SNEAKERS' },
  },
  {
    id: 'avatar-knight',
    nameTh: 'อัศวินเกราะเงินพิทักษ์เครือข่าย',
    nameEn: 'Silver Network Knight',
    icon: '🛡️',
    badge: '🛡️ อัศวิน',
  },
  {
    id: 'avatar-ninja',
    nameTh: 'ชิโนบิเงาไฟเบอร์ออปติก',
    nameEn: 'Shadow Network Shinobi',
    icon: '🥷',
    badge: '🥷 ชิโนบิ',
  },
  {
    id: 'avatar-wizard',
    nameTh: 'จอมเวทสถาปัตยกรรมคลาวด์',
    nameEn: 'Cloud Architecture Mage',
    icon: '🧙‍♂️',
    badge: '✨ จอมเวท',
  },
  {
    id: 'avatar-astronaut',
    nameTh: 'นักบุกเบิกสะเต็มอวกาศ',
    nameEn: 'STEM Space Pioneer',
    icon: '👨‍🚀',
    badge: '🚀 นักบิน',
  },
];

export const ProfilePage: React.FC<ProfilePageProps> = ({ onNavigateToWardrobe }) => {
  const { user, refreshUser } = useAuth();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [isEditing, setIsEditing] = useState(false);
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [avatar, setAvatar] = useState(user?.profile?.avatar || 'lobster-hero');
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.profile?.bio || '');
  const [targetTrack, setTargetTrack] = useState(user?.profile?.targetTrack || 'DATA_CENTER');
  const [englishLevel, setEnglishLevel] = useState(user?.profile?.englishLevel || 'A1');
  const [dailyGoalMinutes, setDailyGoalMinutes] = useState(user?.profile?.dailyGoalMinutes || 30);

  // Sync state when user updates
  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setBio(user.profile?.bio || '');
      setTargetTrack(user.profile?.targetTrack || 'DATA_CENTER');
      setEnglishLevel(user.profile?.englishLevel || 'A1');
      setDailyGoalMinutes(user.profile?.dailyGoalMinutes || 30);
      setAvatar(user.profile?.avatar || 'lobster-hero');
    }
  }, [user]);

  // Password change
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Status messages
  const [statusMsg, setStatusMsg] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [claiming, setClaiming] = useState(false);

  const stats = user?.statistics || {
    xp: 0,
    level: 0,
    gems: 50,
    rankTitle: 'Intern Trainee',
    rankTitleTh: 'เด็กฝึกงานเทคนิค',
    vocabMastered: 0,
    lessonsCompleted: 0,
    quizzesTaken: 0,
    examsTaken: 0,
    averageScore: 0,
  };

  const streak = user?.streak?.currentStreak || 1;

  // Find user's current rank tier
  const currentRank =
    RANK_LADDER.slice().reverse().find((r) => stats.xp >= r.minXp) || RANK_LADDER[0];

  const nextRank = RANK_LADDER.find((r) => r.level === currentRank.level + 1);
  const xpIntoCurrentLevel = stats.xp - currentRank.minXp;
  const xpNeededForNext = nextRank ? nextRank.minXp - currentRank.minXp : 1000;
  const progressPercent = nextRank
    ? Math.min(100, Math.floor((xpIntoCurrentLevel / xpNeededForNext) * 100))
    : 100;

  const handleSelectAvatar = async (selectedAvatarId: string) => {
    try {
      setErrorMsg(null);
      setAvatar(selectedAvatarId);
      await api.auth.updateProfile({ avatar: selectedAvatarId });
      setStatusMsg(isEn ? 'Profile avatar updated successfully!' : 'เปลี่ยนรูปโปรไฟล์เรียบร้อยแล้ว!');
      setShowAvatarModal(false);
      if (refreshUser) await refreshUser();
      broadcastAppUpdate('USER_STATS_UPDATED');
    } catch (err: any) {
      setErrorMsg(err.message || (isEn ? 'Failed to update avatar' : 'ไม่สามารถเปลี่ยนรูปโปรไฟล์ได้'));
    }
  };

  const handleSaveCustomUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!customAvatarUrl.trim()) return;
    await handleSelectAvatar(customAvatarUrl.trim());
  };

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setErrorMsg(null);
      await api.auth.updateProfile({
        name,
        avatar,
        bio,
        targetTrack,
        englishLevel,
        dailyGoalMinutes: Number(dailyGoalMinutes),
      });
      setStatusMsg(isEn ? 'Profile saved successfully!' : 'บันทึกข้อมูลส่วนตัวเรียบร้อยแล้ว');
      setIsEditing(false);
      if (refreshUser) await refreshUser();
      broadcastAppUpdate('USER_STATS_UPDATED');
    } catch (err: any) {
      setErrorMsg(err.message || (isEn ? 'Failed to save profile' : 'ไม่สามารถบันทึกข้อมูลได้'));
    }
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setErrorMsg(isEn ? 'New password and confirm password do not match' : 'รหัสผ่านใหม่และการยืนยันรหัสผ่านไม่ตรงกัน');
      return;
    }
    if (newPassword.length < 4) {
      setErrorMsg(isEn ? 'New password must be at least 4 characters' : 'รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 4 ตัวอักษร');
      return;
    }

    try {
      setErrorMsg(null);
      await api.auth.changePassword({ currentPassword, newPassword });
      setStatusMsg(isEn ? 'Password changed successfully' : 'เปลี่ยนรหัสผ่านสำเร็จแล้ว');
      setShowPasswordModal(false);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } catch (err: any) {
      setErrorMsg(err.message || (isEn ? 'Current password is incorrect' : 'รหัสผ่านปัจจุบันไม่ถูกต้อง'));
    }
  };

  const todayStr = new Date().toISOString().split('T')[0];
  const alreadyClaimed = user?.streak?.lastClaimDate === todayStr;

  const handleClaimDailyReward = async () => {
    try {
      setClaiming(true);
      setErrorMsg(null);
      const res = await api.wardrobe.claimDaily();
      setStatusMsg(res.message || (isEn ? 'Daily claim successful! +30 XP and +20 Gems' : '🎉 เช็คอินรับรางวัลประจำวันสำเร็จ! ได้รับ +30 XP และ +20 💎'));
      if (refreshUser) await refreshUser();
      broadcastAppUpdate('USER_STATS_UPDATED');
    } catch (err: any) {
      setErrorMsg(err.message || (isEn ? 'Failed to claim daily reward' : 'ไม่สามารถรับรางวัลได้ในขณะนี้'));
    } finally {
      setClaiming(false);
    }
  };

  const selectedAvatarObj = AVATAR_OPTIONS.find((a) => a.id === avatar);

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Notifications */}
      {statusMsg && (
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-3.5 text-xs font-black text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300 animate-in fade-in flex items-center justify-between">
          <span>✓ {statusMsg}</span>
          <button onClick={() => setStatusMsg(null)} className="text-emerald-600 hover:text-emerald-800">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
      {errorMsg && (
        <div className="rounded-2xl border-2 border-rose-400 bg-rose-50 p-3.5 text-xs font-black text-rose-800 dark:bg-rose-950/40 dark:border-rose-700 dark:text-rose-300 animate-in fade-in flex items-center justify-between">
          <span>⚠️ {errorMsg}</span>
          <button onClick={() => setErrorMsg(null)} className="text-rose-600 hover:text-rose-800">
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      )}

      {/* Profile Header Hero */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white/95 backdrop-blur-md p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/95">
        <div className="flex flex-col md:flex-row items-center gap-6">
          {/* Avatar with Interactive Edit Overlay (เปลี่ยนรูปโปรไฟล์ได้ทันที) */}
          <div className="relative shrink-0 group">
            <div
              onClick={() => setShowAvatarModal(true)}
              className="h-32 w-32 rounded-3xl bg-gradient-to-b from-blue-50 to-indigo-100/50 border-2 border-blue-200 p-2 shadow-inner dark:border-slate-700 dark:from-slate-800 dark:to-slate-900 flex items-center justify-center cursor-pointer overflow-hidden transition-transform group-hover:scale-105 active:scale-95"
              title={isEn ? 'Click to change avatar' : 'กดเพื่อเปลี่ยนรูปโปรไฟล์'}
            >
              {avatar.startsWith('http://') || avatar.startsWith('https://') || avatar.startsWith('data:') ? (
                <img
                  src={avatar}
                  alt={user?.name}
                  className="w-full h-full object-cover rounded-2xl"
                  onError={(e) => {
                    (e.target as any).src = '/favicon.svg';
                  }}
                />
              ) : selectedAvatarObj?.lobsterGear ? (
                <DuoMascot
                  mood="happy"
                  stance="ready"
                  interactiveSlash={true}
                  size={110}
                  headgear={selectedAvatarObj.lobsterGear.headgear as any}
                  outfit={selectedAvatarObj.lobsterGear.outfit as any}
                  weapon={selectedAvatarObj.lobsterGear.weapon as any}
                  shoes={selectedAvatarObj.lobsterGear.shoes as any}
                />
              ) : selectedAvatarObj ? (
                <div className="flex flex-col items-center justify-center text-5xl">
                  <span>{selectedAvatarObj.icon}</span>
                </div>
              ) : (
                <DuoMascot mood="happy" stance="ready" interactiveSlash={true} size={110} />
              )}
            </div>

            {/* Change Avatar Camera Button Badge */}
            <button
              type="button"
              onClick={() => setShowAvatarModal(true)}
              className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-xl bg-[#58CC02] hover:bg-[#46A302] text-white shadow-md hover:scale-110 active:scale-95 transition-transform cursor-pointer border-2 border-white dark:border-slate-900"
              title={isEn ? 'Change profile picture' : 'เปลี่ยนรูปโปรไฟล์'}
            >
              <Camera className="h-4 w-4 fill-white" />
            </button>
          </div>

          {/* User Basic Info */}
          <div className="flex-1 text-center md:text-left min-w-0">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h2 className="text-xl sm:text-2xl font-black text-slate-800 dark:text-white truncate">
                {user?.name}
              </h2>
              <span
                className={`rounded-full px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider ${
                  user?.role === 'ADMIN'
                    ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300'
                    : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300'
                }`}
              >
                {user?.role}
              </span>
              {(user?.statistics?.isVip || user?.role === 'ADMIN') && (
                <span className="flex items-center gap-1 rounded-full bg-gradient-to-r from-amber-400 to-yellow-400 px-2.5 py-0.5 text-[10px] font-black text-amber-950 shadow-sm animate-pulse">
                  <span>👑</span>
                  <span>VIP Dragon Knight</span>
                </span>
              )}
            </div>

            <p className="mt-0.5 text-xs font-bold text-slate-400 truncate">{user?.email}</p>

            {/* Current Position / Rank Title */}
            <div className="mt-2.5 inline-flex items-center gap-2 rounded-2xl bg-amber-50 border border-amber-200 px-3 py-1.5 dark:bg-amber-950/30 dark:border-amber-800">
              <Crown className="h-4 w-4 fill-amber-500 text-amber-600" />
              <span className="text-xs font-black text-amber-900 dark:text-amber-200">
                {isEn ? `Current Rank: ${currentRank.titleEn}` : `ยศปัจจุบัน: ${currentRank.titleTh} (${currentRank.badge})`}
              </span>
            </div>

            <p className="mt-2 text-xs font-medium text-slate-600 dark:text-slate-300 max-w-xl">
              {user?.profile?.bio || (isEn ? 'No bio specified yet.' : 'ยังไม่ได้ระบุคำแนะนำตัว')}
            </p>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row md:flex-col gap-2 shrink-0">
            {/* Change Avatar Button */}
            <button
              type="button"
              onClick={() => setShowAvatarModal(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-[#1CB0F6] bg-sky-50 px-4 py-2 text-xs font-black text-[#025CA8] hover:bg-sky-100 dark:border-sky-700 dark:bg-sky-950/40 dark:text-sky-300 transition-colors cursor-pointer"
            >
              <Camera className="h-3.5 w-3.5" />
              <span>{isEn ? 'Change Avatar' : 'เปลี่ยนรูปโปรไฟล์'}</span>
            </button>

            {/* Edit Info Button */}
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-slate-50 px-4 py-2 text-xs font-black text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            >
              <Edit3 className="h-3.5 w-3.5" />
              <span>{isEditing ? (isEn ? 'Cancel Edit' : 'ยกเลิกการแก้ไข') : (isEn ? 'Edit Profile' : 'แก้ไขข้อมูลส่วนตัว')}</span>
            </button>

            {onNavigateToWardrobe && (
              <button
                onClick={onNavigateToWardrobe}
                className="btn-duo-green flex items-center justify-center gap-2 px-4 py-2 text-xs font-black shadow-sm cursor-pointer"
              >
                <Sparkles className="h-3.5 w-3.5 fill-white" />
                <span>{isEn ? 'Wardrobe & Armory' : 'ห้องแต่งตัว & คลังอาวุธ'}</span>
              </button>
            )}

            <button
              onClick={() => setShowPasswordModal(true)}
              className="flex items-center justify-center gap-2 rounded-2xl border-2 border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-400 transition-colors cursor-pointer"
            >
              <Lock className="h-3.5 w-3.5" />
              <span>{isEn ? 'Change Password' : 'เปลี่ยนรหัสผ่าน'}</span>
            </button>
          </div>
        </div>

        {/* Edit Profile Form */}
        {isEditing && (
          <form onSubmit={handleSaveProfile} className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                ✏️ {isEn ? 'Edit Profile Information' : 'แก้ไขข้อมูลส่วนตัว'}
              </h4>
              <button
                type="button"
                onClick={() => setShowAvatarModal(true)}
                className="text-xs font-black text-[#1CB0F6] hover:underline flex items-center gap-1"
              >
                <Camera className="h-3.5 w-3.5" />
                <span>{isEn ? 'Select Avatar Icon' : 'เปลี่ยนรูปโปรไฟล์'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Full Name' : 'ชื่อ-นามสกุล'}
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Target Career Track' : 'เป้าหมายสายงาน (Target Track)'}
                </label>
                <select
                  value={targetTrack}
                  onChange={(e) => setTargetTrack(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="DATA_CENTER">Data Center Facility & Operations</option>
                  <option value="TECHNICAL_ENGINEER">Technical & Network Engineer</option>
                  <option value="TOEIC">TOEIC Intensive Prep (750+)</option>
                  <option value="GENERAL">General Engineering & STEM</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Current English Level' : 'ระดับภาษาอังกฤษปัจจุบัน'}
                </label>
                <select
                  value={englishLevel}
                  onChange={(e) => setEnglishLevel(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                >
                  <option value="A1">A1 - Beginner ({isEn ? 'Beginner' : 'เริ่มต้น'})</option>
                  <option value="A2">A2 - Elementary ({isEn ? 'Elementary' : 'พื้นฐาน'})</option>
                  <option value="B1">B1 - Intermediate ({isEn ? 'Intermediate' : 'ปานกลาง'})</option>
                  <option value="B2">B2 - Upper Intermediate ({isEn ? 'Upper Intermediate' : 'คล่องแคล่ว'})</option>
                  <option value="C1">C1 - Advanced ({isEn ? 'Advanced' : 'เชี่ยวชาญ'})</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Daily Study Goal (Minutes)' : 'เป้าหมายเวลาเรียนต่อวัน (นาที)'}
                </label>
                <input
                  type="number"
                  min="10"
                  max="180"
                  value={dailyGoalMinutes}
                  onChange={(e) => setDailyGoalMinutes(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Biography & Study Motto' : 'คำแนะนำตัว / เป้าหมายการเรียน (Bio)'}
                </label>
                <textarea
                  rows={2}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  placeholder={isEn ? 'Write a brief bio or learning goals...' : 'เขียนแนะนำตัวหรือความมุ่งมั่นของคุณ...'}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="rounded-xl px-4 py-2 text-xs font-black text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                {isEn ? 'Cancel' : 'ยกเลิก'}
              </button>
              <button type="submit" className="btn-duo-blue rounded-xl px-5 py-2 text-xs font-black cursor-pointer">
                {isEn ? 'Save Profile Changes' : 'บันทึกการเปลี่ยนแปลง'}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Gamified Career Progression Ladder */}
      <div className="rounded-3xl border-2 border-slate-200 bg-white/95 backdrop-blur-md p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/95 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div>
            <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
              <Award className="h-4 w-4 text-[#FFC800]" />
              <span>{isEn ? 'Data Center & Technical Career Ladder' : 'เส้นทางยศตำแหน่งวิศวกรรมศูนย์ข้อมูล'}</span>
            </h3>
            <p className="text-[10px] font-bold text-slate-400">
              {isEn
                ? 'Level up your official rank by mastering workplace English and STEM SOP modules'
                : 'เลื่อนขั้นตำแหน่งวิศวกรด้วยการเก็บสะสม XP จากบทเรียนคำศัพท์และข้อสอบสะเต็ม'}
            </p>
          </div>
          <span className="text-xs font-black text-[#58CC02]">
            {stats.xp} XP Total
          </span>
        </div>

        {/* Level Progression Progress Bar */}
        <div className="space-y-1.5 bg-slate-50 dark:bg-slate-800/50 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between text-xs font-black">
            <span className="text-slate-700 dark:text-slate-200">
              {isEn ? currentRank.titleEn : currentRank.titleTh}
            </span>
            <span className="text-amber-600 dark:text-amber-400">
              {nextRank
                ? (isEn ? `Next: ${nextRank.titleEn} (${nextRank.minXp - stats.xp} XP remaining)` : `ขั้นถัดไป: ${nextRank.titleTh} (ขาดอีก ${nextRank.minXp - stats.xp} XP)`)
                : (isEn ? 'Max Rank Mastered' : 'บรรลุยศสูงสุดแล้ว')}
            </span>
          </div>

          <div className="h-3 w-full rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-400 to-[#58CC02] transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Ladder Stages */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 pt-2">
          {RANK_LADDER.map((r) => {
            const isUnlocked = stats.xp >= r.minXp;
            const isCurrent = currentRank.level === r.level;

            return (
              <div
                key={r.level}
                className={`rounded-2xl border-2 p-3.5 transition-all ${
                  isCurrent
                    ? 'border-[#FFC800] bg-amber-50/60 dark:bg-amber-950/20 shadow-md ring-2 ring-[#FFC800]/30'
                    : isUnlocked
                    ? 'border-emerald-300 bg-emerald-50/30 dark:border-emerald-900/50 dark:bg-emerald-950/10'
                    : 'border-slate-200 bg-slate-50/60 opacity-60 dark:border-slate-800 dark:bg-slate-850'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 dark:text-white">
                    {r.badge}
                  </span>
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400">
                    {r.minXp} XP
                  </span>
                </div>

                <h4 className="mt-1 text-xs font-black text-slate-800 dark:text-slate-100">
                  {isEn ? r.titleEn : r.titleTh}
                </h4>

                <p className="mt-1 text-[10px] font-medium text-slate-500 dark:text-slate-400 line-clamp-2">
                  {isEn ? r.descEn : r.descTh}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Change Avatar Modal (เลือกและเปลี่ยนรูปโปรไฟล์ได้ทันที) */}
      {showAvatarModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 max-h-[90vh] overflow-y-auto custom-scrollbar space-y-5">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <LobsterLogoIcon size={32} />
                <div>
                  <h3 className="text-base font-black text-slate-800 dark:text-white">
                    {isEn ? 'Choose Your Profile Avatar' : 'เลือกรูปโปรไฟล์ของคุณ'}
                  </h3>
                  <p className="text-[10px] font-bold text-slate-400">
                    {isEn
                      ? 'Select a cool Lobster Mascot or STEM hero badge for your profile'
                      : 'เลือกมาสคอตน้องกุ้งสุดเท่ หรือฮีโร่สาย STEM ประจำตัวคุณ'}
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setShowAvatarModal(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Avatar Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {AVATAR_OPTIONS.map((opt) => {
                const isSelected = avatar === opt.id;
                return (
                  <button
                    key={opt.id}
                    type="button"
                    onClick={() => handleSelectAvatar(opt.id)}
                    className={`relative p-3 rounded-2xl border-2 flex flex-col items-center justify-center gap-2 transition-all cursor-pointer ${
                      isSelected
                        ? 'border-[#58CC02] bg-emerald-50 dark:bg-emerald-950/40 shadow-md scale-102 ring-2 ring-[#58CC02]/30'
                        : 'border-slate-200 bg-slate-50 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-800/60 dark:hover:bg-slate-800'
                    }`}
                  >
                    {/* Badge */}
                    <span className="text-[9px] font-black px-1.5 py-0.2 rounded-md bg-white/80 dark:bg-slate-900/80 shadow-xs">
                      {opt.badge}
                    </span>

                    {/* Avatar Icon */}
                    <div className="h-16 w-16 flex items-center justify-center">
                      {opt.lobsterGear ? (
                        <DuoMascot
                          mood="happy"
                          stance="ready"
                          size={64}
                          headgear={opt.lobsterGear.headgear as any}
                          outfit={opt.lobsterGear.outfit as any}
                          weapon={opt.lobsterGear.weapon as any}
                          shoes={opt.lobsterGear.shoes as any}
                          interactiveSlash={false}
                        />
                      ) : (
                        <span className="text-3xl">{opt.icon}</span>
                      )}
                    </div>

                    <span className="text-xs font-black text-slate-800 dark:text-slate-100 text-center leading-tight">
                      {isEn ? opt.nameEn : opt.nameTh}
                    </span>

                    {isSelected && (
                      <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#58CC02] text-white">
                        <Check className="h-3 w-3 stroke-[3]" />
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Custom Image URL Option */}
            <div className="rounded-2xl border border-slate-200 p-3.5 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/40 space-y-2">
              <span className="text-xs font-black text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
                <span>🌐</span>
                <span>{isEn ? 'Or Use Custom Image URL' : 'หรือใช้ลิงก์รูปภาพของตัวเอง'}</span>
              </span>
              <div className="flex gap-2">
                <input
                  type="url"
                  placeholder="https://example.com/my-avatar.png"
                  value={customAvatarUrl}
                  onChange={(e) => setCustomAvatarUrl(e.target.value)}
                  className="flex-1 rounded-xl border border-slate-200 bg-white p-2 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:outline-none dark:border-slate-700 dark:bg-slate-900 dark:text-white"
                />
                <button
                  type="button"
                  onClick={handleSaveCustomUrl}
                  className="btn-duo-green px-4 py-2 text-xs font-black whitespace-nowrap cursor-pointer"
                >
                  {isEn ? 'Use This URL' : 'ใช้รูปนี้'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Change Password Modal */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <h3 className="text-sm font-black text-slate-800 dark:text-white flex items-center gap-2">
                <Lock className="h-4 w-4 text-[#1CB0F6]" />
                <span>{isEn ? 'Change Password' : 'เปลี่ยนรหัสผ่าน'}</span>
              </h3>
              <button
                type="button"
                onClick={() => setShowPasswordModal(false)}
                className="rounded-xl p-1.5 text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-3">
              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Current Password' : 'รหัสผ่านปัจจุบัน'}
                </label>
                <input
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={isEn ? 'Current password...' : 'รหัสผ่านเดิม...'}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'New Password' : 'รหัสผ่านใหม่'}
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={isEn ? 'New password (min 4 chars)...' : 'รหัสผ่านใหม่อย่างน้อย 4 ตัวอักษร...'}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-black text-slate-700 dark:text-slate-300 mb-1">
                  {isEn ? 'Confirm New Password' : 'ยืนยันรหัสผ่านใหม่'}
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={isEn ? 'Confirm new password...' : 'กรอกรหัสผ่านใหม่อีกครั้ง...'}
                  className="w-full rounded-xl border border-slate-200 bg-slate-50 p-2.5 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:bg-white focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-white"
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-3">
                <button
                  type="button"
                  onClick={() => setShowPasswordModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-black text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                >
                  {isEn ? 'Cancel' : 'ยกเลิก'}
                </button>
                <button type="submit" className="btn-duo-blue rounded-xl px-5 py-2 text-xs font-black cursor-pointer">
                  {isEn ? 'Confirm Password Change' : 'ยืนยันเปลี่ยนรหัสผ่าน'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

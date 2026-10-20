import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import { broadcastAppUpdate } from '../utils/realtimeSync';
import confetti from 'canvas-confetti';
import {
  ShieldCheck,
  Users,
  FileQuestion,
  Layers,
  BookOpen,
  Timer,
  Upload,
  Plus,
  Trash2,
  Edit2,
  CheckCircle2,
  AlertCircle,
  Search,
  Sparkles,
  Gift,
  Crown,
  Gem,
  Coins,
  Flame,
  Check,
  ChevronRight,
  Send,
  Zap,
} from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();
  const isEn = language === 'en';

  const [activeTab, setActiveTab] = useState<'overview' | 'gifts' | 'users' | 'questions' | 'vocab'>('overview');
  const [overview, setOverview] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Users Tab
  const [users, setUsers] = useState<any[]>([]);
  const [userSearch, setUserSearch] = useState('');
  const [loadingUsers, setLoadingUsers] = useState(false);

  // Gift Dispenser & Economy Management State
  const [selectedGiftUser, setSelectedGiftUser] = useState<any>(null);
  const [giftMode, setGiftMode] = useState<'adjust' | 'set'>('adjust'); // 'adjust' (+/-) vs 'set' (exact)
  const [giftCoins, setGiftCoins] = useState<number>(500);
  const [giftGems, setGiftGems] = useState<number>(200);
  const [giftXp, setGiftXp] = useState<number>(300);
  const [giftStreak, setGiftStreak] = useState<number>(0);
  const [giftVip, setGiftVip] = useState<boolean>(true);
  const [giftDragonSet, setGiftDragonSet] = useState<boolean>(true);
  const [giftReason, setGiftReason] = useState<string>('รางวัลความขยันและผลการเรียนดีเด่น');
  const [giftSending, setGiftSending] = useState<boolean>(false);
  const [giftSuccessMsg, setGiftSuccessMsg] = useState<string | null>(null);

  // Question Creator / Import Tab
  const [questionMode, setQuestionMode] = useState<'single' | 'batch'>('single');
  const [newQuestion, setNewQuestion] = useState({
    categoryCode: 'TOEIC_PART_5',
    questionText: '',
    questionTextTh: '',
    difficulty: 'MEDIUM',
    explanationTh: '',
    options: [
      { optionKey: 'A', contentEn: '', isCorrect: true },
      { optionKey: 'B', contentEn: '', isCorrect: false },
      { optionKey: 'C', contentEn: '', isCorrect: false },
      { optionKey: 'D', contentEn: '', isCorrect: false },
    ],
  });
  const [batchJson, setBatchJson] = useState('');
  const [importing, setImporting] = useState(false);
  const [importStatus, setImportStatus] = useState<string | null>(null);

  // Vocab Tab
  const [vocabList, setVocabList] = useState<any[]>([]);
  const [vocabSearch, setVocabSearch] = useState('');
  const [newVocab, setNewVocab] = useState({
    word: '',
    ipa: '',
    partOfSpeech: 'noun',
    meaningTh: '',
    level: 'B1',
    category: 'DATA_CENTER',
    exampleEn: '',
    exampleTh: '',
  });

  useEffect(() => {
    loadOverview();
    loadUsers();
  }, []);

  useEffect(() => {
    if (activeTab === 'users' || activeTab === 'gifts') loadUsers();
    if (activeTab === 'vocab') loadVocabs();
  }, [activeTab]);

  const loadOverview = async () => {
    setLoading(true);
    try {
      const data = await api.admin.getOverview();
      setOverview(data);
    } catch (err) {
      console.error('Failed to load admin overview', err);
    } finally {
      setLoading(false);
    }
  };

  const loadUsers = async () => {
    setLoadingUsers(true);
    try {
      const res = await api.admin.getUsers({ search: userSearch });
      const userList = res.users || [];
      setUsers(userList);
      if (!selectedGiftUser && userList.length > 0) {
        setSelectedGiftUser(userList[0]);
      }
    } catch (err) {
      console.error('Failed to load users', err);
    } finally {
      setLoadingUsers(false);
    }
  };

  const loadVocabs = async () => {
    try {
      const res = await api.vocabulary.list({ search: vocabSearch, limit: 30 });
      setVocabList(res.data || res || []);
    } catch (err) {
      console.error('Failed to load vocabs', err);
    }
  };

  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await api.admin.updateUserRole(userId, newRole);
      setUsers((prev) =>
        prev.map((u) => (u.id === userId ? { ...u, role: newRole } : u))
      );
      broadcastAppUpdate('USER_STATS_UPDATED', { userId, role: newRole });
      alert(isEn ? 'User role updated successfully!' : 'อัปเดตสิทธิ์ผู้ใช้เรียบร้อยแล้ว');
    } catch (err) {
      console.error('Failed to update role', err);
      alert(isEn ? 'Failed to update user role' : 'ไม่สามารถอัปเดตสิทธิ์ได้');
    }
  };

  const handleOpenGiftForUser = (targetUser: any) => {
    setSelectedGiftUser(targetUser);
    setActiveTab('gifts');
    setGiftSuccessMsg(null);
    if (giftMode === 'set') {
      setGiftCoins(targetUser.coins || 0);
      setGiftGems(targetUser.gems ?? 50);
      setGiftXp(targetUser.xp || 0);
      setGiftStreak(targetUser.streak || 0);
      setGiftVip(Boolean(targetUser.isVip));
    }
  };

  const switchGiftMode = (mode: 'adjust' | 'set') => {
    setGiftMode(mode);
    setGiftSuccessMsg(null);
    if (mode === 'set' && selectedGiftUser) {
      setGiftCoins(selectedGiftUser.coins || 0);
      setGiftGems(selectedGiftUser.gems ?? 50);
      setGiftXp(selectedGiftUser.xp || 0);
      setGiftStreak(selectedGiftUser.streak || 0);
      setGiftVip(Boolean(selectedGiftUser.isVip));
    } else if (mode === 'adjust') {
      setGiftCoins(500);
      setGiftGems(200);
      setGiftXp(300);
      setGiftStreak(0);
    }
  };

  const handleSendGift = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedGiftUser) {
      alert(isEn ? 'Please select a player to grant gifts to' : 'กรุณาเลือกผู้เล่นที่ต้องการมอบของขวัญ');
      return;
    }

    setGiftSending(true);
    setGiftSuccessMsg(null);
    try {
      const payload: any = {
        targetUserId: selectedGiftUser.id,
        setVip: giftVip,
        unlockDragonSet: giftDragonSet,
        reason: giftReason,
      };

      if (giftMode === 'set') {
        payload.setCoins = giftCoins;
        payload.setGems = giftGems;
        payload.setXp = giftXp;
        payload.setStreak = giftStreak;
      } else {
        payload.addCoins = giftCoins;
        payload.addGems = giftGems;
        payload.addXp = giftXp;
        if (giftStreak !== 0) payload.addStreak = giftStreak;
      }

      const res = await api.admin.grantGift(payload);

      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
      setGiftSuccessMsg(
        res?.message ||
          (isEn
            ? `Successfully updated stats for ${selectedGiftUser.name}!`
            : `ปรับปรุงข้อมูลและมอบรางวัลให้ ${selectedGiftUser.name} เรียบร้อยแล้ว! 🎉`)
      );

      // Broadcast instant update across all tabs and components
      broadcastAppUpdate('GIFT_GRANTED', { targetUserId: selectedGiftUser.id });

      const usersRes = await api.admin.getUsers({ search: userSearch });
      const userList = usersRes.users || [];
      setUsers(userList);
      const updated = userList.find((u: any) => u.id === selectedGiftUser.id);
      if (updated) setSelectedGiftUser(updated);
      loadOverview();
    } catch (err: any) {
      console.error('Failed to send gift', err);
      alert(err.message || (isEn ? 'Failed to grant gift' : 'เกิดข้อผิดพลาดในการมอบของขวัญ'));
    } finally {
      setGiftSending(false);
    }
  };

  const handleResetGiftCooldown = async (targetUserId: string) => {
    setGiftSending(true);
    setGiftSuccessMsg(null);
    try {
      const res = await api.admin.grantGift({
        targetUserId,
        resetGiftCooldown: true,
        reason: isEn ? 'Admin reset daily gift cooldown timer' : 'ผู้ดูแลระบบรีเซ็ตเวลาคูลดาวน์หีบสมบัติประจำวัน',
      });
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      setGiftSuccessMsg(
        res?.message ||
          (isEn
            ? 'Successfully reset daily chest cooldown! Player can open chest now.'
            : 'รีเซ็ตเวลารับของขวัญเรียบร้อยแล้ว! ผู้เล่นสามารถเปิดรับหีบสมบัติได้ทันที 🎁')
      );

      // Broadcast instant cooldown reset to all tabs (Dashboard opens chest right away!)
      broadcastAppUpdate('COOLDOWN_RESET', { targetUserId });

      const usersRes = await api.admin.getUsers({ search: userSearch });
      const userList = usersRes.users || [];
      setUsers(userList);
      const updated = userList.find((u: any) => u.id === targetUserId);
      if (updated) setSelectedGiftUser(updated);
    } catch (err: any) {
      console.error('Failed to reset cooldown', err);
      alert(err.message || (isEn ? 'Failed to reset cooldown' : 'เกิดข้อผิดพลาดในการรีเซ็ตเวลา'));
    } finally {
      setGiftSending(false);
    }
  };

  const handleToggleClaimedToday = async (targetUserId: string, markAsClaimed: boolean) => {
    setGiftSending(true);
    setGiftSuccessMsg(null);
    try {
      const res = await api.admin.grantGift({
        targetUserId,
        setGiftClaimed: markAsClaimed,
        reason: markAsClaimed
          ? (isEn ? 'Admin marked chest as claimed today' : 'ผู้ดูแลระบบตั้งค่าเป็นรับหีบสมบัติแล้ววันนี้')
          : (isEn ? 'Admin cleared chest claimed status' : 'ผู้ดูแลระบบล้างสถานะรับหีบสมบัติ'),
      });
      setGiftSuccessMsg(res?.message || (isEn ? 'Status updated' : 'อัปเดตสถานะสำเร็จ'));

      broadcastAppUpdate('COOLDOWN_RESET', { targetUserId });

      const usersRes = await api.admin.getUsers({ search: userSearch });
      const userList = usersRes.users || [];
      setUsers(userList);
      const updated = userList.find((u: any) => u.id === targetUserId);
      if (updated) setSelectedGiftUser(updated);
    } catch (err: any) {
      alert(err.message || 'Error updating status');
    } finally {
      setGiftSending(false);
    }
  };

  const handleResetStreakDirectly = async (targetUserId: string) => {
    if (!window.confirm(isEn ? 'Reset login streak to 0 days?' : 'ยืนยันรีเซ็ตสตรีคการเข้าเรียนเป็น 0 วันหรือไม่?')) return;
    setGiftSending(true);
    try {
      const res = await api.admin.grantGift({
        targetUserId,
        resetStreak: true,
        reason: isEn ? 'Admin reset streak to 0' : 'ผู้ดูแลระบบรีเซ็ตสตรีคเป็น 0 วัน',
      });
      setGiftSuccessMsg(res?.message || (isEn ? 'Streak reset to 0' : 'รีเซ็ตวันเข้าเรียนเป็น 0 วันสำเร็จ'));

      broadcastAppUpdate('USER_STATS_UPDATED', { targetUserId });

      const usersRes = await api.admin.getUsers({ search: userSearch });
      const userList = usersRes.users || [];
      setUsers(userList);
      const updated = userList.find((u: any) => u.id === targetUserId);
      if (updated) setSelectedGiftUser(updated);
    } catch (err: any) {
      alert(err.message || 'Error resetting streak');
    } finally {
      setGiftSending(false);
    }
  };

  const handleCreateSingleQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.questionText) {
      alert(isEn ? 'Please enter question text' : 'กรุณากรอกข้อความคำถาม');
      return;
    }
    try {
      await api.admin.createQuestion(newQuestion);
      alert(isEn ? 'Question saved successfully!' : 'บันทึกคำถามเรียบร้อยแล้ว');
      setNewQuestion({
        categoryCode: 'TOEIC_PART_5',
        questionText: '',
        questionTextTh: '',
        difficulty: 'MEDIUM',
        explanationTh: '',
        options: [
          { optionKey: 'A', contentEn: '', isCorrect: true },
          { optionKey: 'B', contentEn: '', isCorrect: false },
          { optionKey: 'C', contentEn: '', isCorrect: false },
          { optionKey: 'D', contentEn: '', isCorrect: false },
        ],
      });
      loadOverview();
    } catch (err) {
      console.error('Failed to create question', err);
      alert(isEn ? 'Failed to save question' : 'เกิดข้อผิดพลาดในการบันทึกคำถาม');
    }
  };

  const handleBatchImport = async () => {
    if (!batchJson.trim()) return;
    setImporting(true);
    setImportStatus(null);
    try {
      const parsed = JSON.parse(batchJson);
      const questionsArray = Array.isArray(parsed) ? parsed : parsed.questions;
      if (!Array.isArray(questionsArray)) {
        throw new Error(isEn ? 'JSON format must be an array of questions' : 'รูปแบบ JSON ไม่ถูกต้อง ต้องเป็น Array ของคำถาม');
      }

      const res = await api.admin.batchImportQuestions(questionsArray);
      setImportStatus(
        isEn
          ? `🎉 Successfully imported ${res.importedCount || questionsArray.length} questions`
          : `🎉 นำเข้าข้อมูลสำเร็จ ${res.importedCount || questionsArray.length} ข้อ`
      );
      setBatchJson('');
      loadOverview();
    } catch (err: any) {
      console.error('Batch import failed', err);
      setImportStatus(
        isEn
          ? `❌ Error: ${err.message || 'Invalid JSON format'}`
          : `❌ ข้อผิดพลาด: ${err.message || 'รูปแบบ JSON ไม่ถูกต้อง'}`
      );
    } finally {
      setImporting(false);
    }
  };

  const handleCreateVocab = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newVocab.word || !newVocab.meaningTh) {
      alert(isEn ? 'Please enter vocabulary word and definition' : 'กรุณากรอกคำศัพท์และคำแปลภาษาไทย');
      return;
    }
    try {
      await api.admin.createVocab(newVocab);
      alert(isEn ? 'Vocabulary saved successfully!' : 'เพิ่มคำศัพท์เข้าคลังเรียบร้อยแล้ว');
      setNewVocab({
        word: '',
        ipa: '',
        partOfSpeech: 'noun',
        meaningTh: '',
        level: 'B1',
        category: 'DATA_CENTER',
        exampleEn: '',
        exampleTh: '',
      });
      loadVocabs();
      loadOverview();
    } catch (err) {
      console.error('Failed to create vocab', err);
      alert(isEn ? 'Failed to create vocabulary' : 'ไม่สามารถเพิ่มคำศัพท์ได้');
    }
  };

  const handleDeleteVocab = async (id: string) => {
    if (!confirm(isEn ? 'Are you sure you want to delete this vocabulary word?' : 'ต้องการลบคำศัพท์นี้ออกจากระบบหรือไม่?')) return;
    try {
      await api.admin.deleteVocab(id);
      setVocabList((prev) => prev.filter((v) => v.id !== id));
      loadOverview();
    } catch (err) {
      console.error('Failed to delete vocab', err);
    }
  };

  return (
    <div className="space-y-6 select-none pb-12">
      {/* 1. Header Banner */}
      <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-r from-slate-900 via-indigo-950 to-purple-950 p-6 text-white shadow-xl dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-rose-500/20 border border-rose-400/40 px-3 py-1 text-xs font-black uppercase tracking-wider text-rose-300 backdrop-blur">
              <ShieldCheck className="h-3.5 w-3.5 fill-rose-400" />
              <span>{isEn ? 'Admin System Operations' : 'ศูนย์ปฏิบัติการระบบหลังบ้าน'}</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              {isEn ? 'Academy Administrative Console' : 'ระบบจัดการศูนย์ควบคุมผู้ดูแลระบบ'}
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-bold text-slate-300 max-w-2xl">
              {isEn
                ? 'Overview of administrative controls, player gift dispenser, user role permissions, curriculum management, and question bank batch imports.'
                : 'ภาพรวมระบบที่แอดมินสามารถทำได้ ระบบมอบของขวัญเหรียญทองและยศ VIP ให้ผู้เรียน จัดการสิทธิ์ผู้ใช้ และนำเข้าคลังข้อสอบ'}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('gifts')}
              className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 px-4 py-2 text-xs font-black shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all"
            >
              <Gift className="h-4 w-4" />
              <span>{isEn ? 'Gift Dispenser' : 'มอบของขวัญผู้เล่น'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-5">
        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            {isEn ? 'Total Players' : 'ผู้เรียนทั้งหมด'}
          </span>
          <p className="mt-1 text-2xl font-black text-slate-900 dark:text-white">
            {overview?.userCount || users.length || 0}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            {isEn ? 'Question Bank' : 'คลังข้อสอบ'}
          </span>
          <p className="mt-1 text-2xl font-black text-blue-600 dark:text-blue-400">
            {overview?.questionCount || 0}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            {isEn ? 'SM-2 Vocab' : 'คำศัพท์วิศวกรรม'}
          </span>
          <p className="mt-1 text-2xl font-black text-emerald-600 dark:text-emerald-400">
            {overview?.vocabCount || 347}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            {isEn ? 'Lessons' : 'บทเรียนทั้งหมด'}
          </span>
          <p className="mt-1 text-2xl font-black text-amber-500">
            {overview?.lessonCount || 30}
          </p>
        </div>

        <div className="rounded-2xl border-2 border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
            {isEn ? 'Exam Sessions' : 'การสอบที่จัดขึ้น'}
          </span>
          <p className="mt-1 text-2xl font-black text-purple-600 dark:text-purple-400">
            {overview?.examCount || 0}
          </p>
        </div>
      </div>

      {/* 3. Navigation Tabs */}
      <div className="flex flex-wrap gap-2 border-b-2 border-slate-200 dark:border-slate-800 pb-2">
        <button
          onClick={() => setActiveTab('overview')}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all ${
            activeTab === 'overview'
              ? 'bg-[#1CB0F6] text-white shadow-duo shadow-[#1272A0]'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Sparkles className="h-4 w-4" />
          <span>{isEn ? 'What Admin Can Do' : 'ภาพรวมระบบที่แอดมินทำได้'}</span>
        </button>

        <button
          onClick={() => setActiveTab('gifts')}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all ${
            activeTab === 'gifts'
              ? 'bg-amber-500 text-white shadow-duo shadow-amber-600'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Gift className="h-4 w-4" />
          <span>{isEn ? 'Grant Player Gifts' : 'ระบบมอบของขวัญผู้เล่น'}</span>
        </button>

        <button
          onClick={() => setActiveTab('users')}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all ${
            activeTab === 'users'
              ? 'bg-[#58CC02] text-white shadow-duo shadow-[#46A302]'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Users className="h-4 w-4" />
          <span>{isEn ? 'User Directory' : 'รายชื่อผู้เรียนและระดับ'}</span>
        </button>

        <button
          onClick={() => setActiveTab('questions')}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all ${
            activeTab === 'questions'
              ? 'bg-purple-600 text-white shadow-duo shadow-purple-700'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <FileQuestion className="h-4 w-4" />
          <span>{isEn ? 'Exam Questions & Import' : 'คลังข้อสอบและนำเข้าชุดข้อมูล'}</span>
        </button>

        <button
          onClick={() => setActiveTab('vocab')}
          className={`flex items-center gap-2 rounded-2xl px-4 py-2.5 text-xs font-black transition-all ${
            activeTab === 'vocab'
              ? 'bg-orange-500 text-white shadow-duo shadow-orange-600'
              : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
          }`}
        >
          <Layers className="h-4 w-4" />
          <span>{isEn ? 'Vocabulary Bank' : 'จัดการคลังคำศัพท์'}</span>
        </button>
      </div>

      {/* 4. Tab Content */}

      {/* Tab: Overview (What Admin Can Do) */}
      {activeTab === 'overview' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div>
                <h3 className="text-lg font-black text-slate-900 dark:text-white">
                  {isEn ? 'Administrative Capabilities Directory' : 'ภาพรวมโครงสร้างอำนาจหน้าที่ของแอดมิน'}
                </h3>
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400">
                  {isEn
                    ? 'All actions you can perform across the entire academy ecosystem.'
                    : 'สรุปทุกความสามารถที่แอดมินสามารถดำเนินการได้ในระบบแบบครบวงจร'}
                </p>
              </div>
            </div>

            {/* Capability Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Module 1: Gift Dispenser */}
              <div
                onClick={() => setActiveTab('gifts')}
                className="group p-4 rounded-2xl border-2 border-amber-300 bg-amber-50/50 hover:bg-amber-100/70 dark:bg-amber-950/20 dark:border-amber-800 transition-all cursor-pointer space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500 text-white text-lg shadow-sm">
                    🎁
                  </span>
                  <span className="text-[10px] font-black uppercase text-amber-700 dark:text-amber-300">
                    {isEn ? 'Gift Dispenser' : 'แจกรางวัล'}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {isEn ? 'Grant Gifts to Players' : 'มอบของขวัญให้ผู้เรียนรายบุคคล'}
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {isEn
                    ? 'Grant gold coins, gems, experience points (XP), activate VIP Dragon status, or unlock the legendary Fire Dragon gear set.'
                    : 'เติมเหรียญทอง อัญมณี มอบค่าประสบการณ์ (XP) เปิดสิทธิ์วีไอพีมังกร หรือมอบชุดเกราะนักรบมังกรเพลิงครบเซ็ตให้ผู้เล่นทุกคน'}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-amber-700 dark:text-amber-400 group-hover:translate-x-1 transition-transform">
                  <span>{isEn ? 'Open Dispenser' : 'เปิดระบบมอบของขวัญ'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Module 2: User Access & Roles */}
              <div
                onClick={() => setActiveTab('users')}
                className="group p-4 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 hover:bg-emerald-100/70 dark:bg-emerald-950/20 dark:border-emerald-800 transition-all cursor-pointer space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#58CC02] text-white text-lg shadow-sm">
                    👥
                  </span>
                  <span className="text-[10px] font-black uppercase text-emerald-700 dark:text-emerald-300">
                    {isEn ? 'User Roles' : 'สิทธิ์ผู้ใช้'}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {isEn ? 'User Directory & Ranks' : 'จัดการผู้เรียนและปรับระดับสิทธิ์'}
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {isEn
                    ? 'View all students, monitor learning level progression, promote or demote roles between STUDENT, INSTRUCTOR, and ADMIN.'
                    : 'ดูรายชื่อผู้เรียนทั้งหมด ตรวจสอบระดับเลเวลและคะแนนสะสม เลื่อนขั้นหรือแต่งตั้งบทบาทผู้ดูแลระบบหรือนักเรียน'}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-emerald-700 dark:text-emerald-400 group-hover:translate-x-1 transition-transform">
                  <span>{isEn ? 'Manage Users' : 'ดูรายชื่อผู้ใช้'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Module 3: Exam Questions & Batch Import */}
              <div
                onClick={() => setActiveTab('questions')}
                className="group p-4 rounded-2xl border-2 border-purple-300 bg-purple-50/50 hover:bg-purple-100/70 dark:bg-purple-950/20 dark:border-purple-800 transition-all cursor-pointer space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-600 text-white text-lg shadow-sm">
                    📝
                  </span>
                  <span className="text-[10px] font-black uppercase text-purple-700 dark:text-purple-300">
                    {isEn ? 'Exam Bank' : 'คลังข้อสอบ'}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {isEn ? 'Exam Creator & Batch Import' : 'สร้างข้อสอบและนำเข้าชุดใหญ่'}
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {isEn
                    ? 'Create single questions or paste full JSON datasets for TOEIC parts 1-7, STEM engineering, and reasoning aptitude tests.'
                    : 'เพิ่มข้อสอบเดี่ยว หรือวางไฟล์ชุดคำถามแบบ JSON เพื่อนำเข้าข้อสอบโทอิค 7 พาร์ต และข้อสอบวิศวกรรมสะเต็มได้ในคลิกเดียว'}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-purple-700 dark:text-purple-400 group-hover:translate-x-1 transition-transform">
                  <span>{isEn ? 'Import Questions' : 'นำเข้าชุดข้อสอบ'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Module 4: SM-2 Vocabulary Bank */}
              <div
                onClick={() => setActiveTab('vocab')}
                className="group p-4 rounded-2xl border-2 border-orange-300 bg-orange-50/50 hover:bg-orange-100/70 dark:bg-orange-950/20 dark:border-orange-800 transition-all cursor-pointer space-y-2 shadow-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500 text-white text-lg shadow-sm">
                    📖
                  </span>
                  <span className="text-[10px] font-black uppercase text-orange-700 dark:text-orange-300">
                    {isEn ? 'Vocabulary' : 'คลังคำศัพท์'}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {isEn ? 'SM-2 Spaced Repetition Vocab' : 'จัดการคำศัพท์วิศวกรรมระบบทวนซ้ำ'}
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {isEn
                    ? 'Manage 347 technical words, definitions, phonetic transcriptions, and industry usage examples for server technicians.'
                    : 'จัดการคำศัพท์ช่าง 347 คำ เพิ่มคำศัพท์ศูนย์ข้อมูลใหม่ คำอ่านออกเสียง และประโยคตัวอย่างการใช้งานจริง'}
                </p>
                <span className="inline-flex items-center gap-1 text-[11px] font-black text-orange-700 dark:text-orange-400 group-hover:translate-x-1 transition-transform">
                  <span>{isEn ? 'Manage Vocabulary' : 'จัดการคำศัพท์'}</span>
                  <ChevronRight className="h-3.5 w-3.5" />
                </span>
              </div>

              {/* Module 5: SCB Bank Account Verification */}
              <div className="p-4 rounded-2xl border-2 border-blue-300 bg-blue-50/50 dark:bg-blue-950/20 dark:border-blue-800 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white text-lg shadow-sm">
                    🏦
                  </span>
                  <span className="text-[10px] font-black uppercase text-blue-700 dark:text-blue-300">
                    SCB 415-043181-2
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {isEn ? 'SCB Bank Direct Top-Up Gateway' : 'ระบบการเงินไทยพาณิชย์ 4150431812'}
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {isEn
                    ? 'Connected directly to Siam Commercial Bank account 415-043181-2. Grants coins and VIP packages automatically upon confirmation.'
                    : 'ผูกกับบัญชีธนาคารไทยพาณิชย์ 415-043181-2 รองรับแอป SCB EASY และ QR Payment เติมเหรียญทองและสิทธิ์ VIP อัตโนมัติ'}
                </p>
              </div>

              {/* Module 6: Lobster Wardrobe God Mode */}
              <div className="p-4 rounded-2xl border-2 border-pink-300 bg-pink-50/50 dark:bg-pink-950/20 dark:border-pink-800 space-y-2 shadow-xs">
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-pink-600 text-white text-lg shadow-sm">
                    🦞
                  </span>
                  <span className="text-[10px] font-black uppercase text-pink-700 dark:text-pink-300">
                    {isEn ? 'Wardrobe Armory' : 'คลังอาวุธ'}
                  </span>
                </div>
                <h4 className="text-sm font-black text-slate-900 dark:text-white">
                  {isEn ? 'Lobster Mascot Customization' : 'ชุดแฟชั่นกุ้งมังกรและดาบเพลิง'}
                </h4>
                <p className="text-xs font-medium text-slate-600 dark:text-slate-300">
                  {isEn
                    ? '18 gear items including antennas, dragon flame armor, katana weapons, and boots. Admins can unlock all gear or test level zero progression.'
                    : 'อาวุธและชุดแฟชั่น 18 ชิ้น หนวดกุ้งคู่ เกราะมังกรเพลิง และดาบคาตานะ แอดมินสามารถปลดล็อกไอเทมฟรีทั้งหมดหรือทดสอบรีเซ็ตเลเวล 0'}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Gift Dispenser & Economy Manager (Dedicated Panel) */}
      {activeTab === 'gifts' && (
        <div className="space-y-6 animate-in fade-in">
          <form
            onSubmit={handleSendGift}
            className="rounded-3xl border-2 border-amber-400 bg-white p-6 shadow-xl dark:border-amber-600 dark:bg-slate-900 space-y-5"
          >
            {/* Header & Mode Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white text-xl shadow-md">
                  🎁
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white">
                    {isEn ? 'Player Economy & Gift Manager' : 'ระบบจัดการเศรษฐกิจและของขวัญผู้เล่น'}
                  </h3>
                  <p className="text-xs font-bold text-amber-700 dark:text-amber-300">
                    {isEn
                      ? 'Adjust or set coins, gems, XP, streak, and reset daily chest cooldown timers.'
                      : 'ปรับเพิ่ม/หักลด หรือกำหนดยอดเหรียญทอง, อัญมณี, XP, วันเช็คอิน และรีเซ็ตเวลาคูลดาวน์หีบสมบัติ'}
                  </p>
                </div>
              </div>

              {/* Mode Switcher Tabs */}
              <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => switchGiftMode('adjust')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    giftMode === 'adjust'
                      ? 'bg-amber-500 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-amber-600'
                  }`}
                >
                  {isEn ? '± Adjust (+ / -)' : '± ปรับยอด (+ / -)'}
                </button>
                <button
                  type="button"
                  onClick={() => switchGiftMode('set')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all ${
                    giftMode === 'set'
                      ? 'bg-indigo-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-300 hover:text-indigo-500'
                  }`}
                >
                  {isEn ? '= Set Exact' : '= กำหนดยอดตรง'}
                </button>
              </div>
            </div>

            {/* Success Alert */}
            {giftSuccessMsg && (
              <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-4 text-xs font-black text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 animate-in zoom-in-95">
                {giftSuccessMsg}
              </div>
            )}

            {/* 1. Target Player Selection & Live Stats Bar */}
            <div className="space-y-3">
              <div>
                <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide block mb-1">
                  {isEn ? 'Select Target Player:' : 'เลือกผู้เล่นเป้าหมาย:'}
                </label>
                <select
                  value={selectedGiftUser?.id || ''}
                  onChange={(e) => {
                    const found = users.find((u) => u.id === e.target.value);
                    if (found) {
                      setSelectedGiftUser(found);
                      if (giftMode === 'set') {
                        setGiftCoins(found.coins || 0);
                        setGiftGems(found.gems ?? 50);
                        setGiftXp(found.xp || 0);
                        setGiftStreak(found.streak || 0);
                        setGiftVip(Boolean(found.isVip));
                      }
                    }
                  }}
                  className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                >
                  {users.map((u) => (
                    <option key={u.id} value={u.id}>
                      {u.name} — {u.email} (เลเวล {u.level || 0} • {u.role})
                    </option>
                  ))}
                </select>
              </div>

              {/* Target Player Live Stats Strip */}
              {selectedGiftUser && (
                <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 p-3 rounded-2xl bg-slate-50 border border-slate-200 dark:bg-slate-800/60 dark:border-slate-700 text-center">
                  <div className="p-1">
                    <span className="text-[10px] font-bold text-slate-500 block">🪙 {isEn ? 'Coins' : 'เหรียญ'}</span>
                    <span className="text-xs font-black text-amber-600 dark:text-amber-400">
                      {(selectedGiftUser.coins || 0).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] font-bold text-slate-500 block">💎 {isEn ? 'Gems' : 'อัญมณี'}</span>
                    <span className="text-xs font-black text-blue-600 dark:text-blue-400">
                      {(selectedGiftUser.gems ?? 50).toLocaleString()}
                    </span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] font-bold text-slate-500 block">⚡ {isEn ? 'XP & Level' : 'XP และเลเวล'}</span>
                    <span className="text-xs font-black text-emerald-600 dark:text-emerald-400">
                      {(selectedGiftUser.xp || 0).toLocaleString()} (Lv.{selectedGiftUser.level || 0})
                    </span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] font-bold text-slate-500 block">🔥 {isEn ? 'Streak' : 'สตรีค'}</span>
                    <span className="text-xs font-black text-orange-600 dark:text-orange-400">
                      {selectedGiftUser.streak || 0} {isEn ? 'Days' : 'วัน'}
                    </span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] font-bold text-slate-500 block">👑 VIP</span>
                    <span className={`text-xs font-black ${selectedGiftUser.isVip ? 'text-amber-500' : 'text-slate-400'}`}>
                      {selectedGiftUser.isVip ? (isEn ? 'Active' : 'เปิดใช้งาน') : (isEn ? 'No' : 'ไม่มี')}
                    </span>
                  </div>
                  <div className="p-1">
                    <span className="text-[10px] font-bold text-slate-500 block">🎁 {isEn ? 'Daily Chest' : 'หีบประจำวัน'}</span>
                    <span className={`text-xs font-black ${selectedGiftUser.hasClaimedChestToday ? 'text-orange-500' : 'text-emerald-500'}`}>
                      {selectedGiftUser.hasClaimedChestToday ? (isEn ? 'Claimed' : 'รับแล้ว') : (isEn ? 'Ready' : 'พร้อมเปิด')}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* 2. Currency Packages (Coins, Gems, XP) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {/* Gold Coins */}
              <div className="rounded-2xl border-2 border-amber-300 bg-amber-50/50 p-3.5 dark:border-amber-800 dark:bg-amber-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-amber-900 dark:text-amber-200 flex items-center gap-1.5">
                    <span>🪙</span>
                    <span>{isEn ? 'Gold Coins' : 'เหรียญทอง'}</span>
                  </label>
                  <span className="text-[10px] font-bold text-amber-700 dark:text-amber-300">
                    {giftMode === 'adjust' ? (isEn ? '(+/- adjustment)' : '(ยอดปรับเพิ่ม/ลด)') : (isEn ? '(exact balance)' : '(ยอดตายตัว)')}
                  </span>
                </div>
                <input
                  type="number"
                  step="10"
                  value={giftCoins}
                  onChange={(e) => setGiftCoins(Number(e.target.value))}
                  className="w-full rounded-xl border border-amber-300 bg-white p-2 text-xs font-black text-slate-900 dark:bg-slate-800 dark:border-amber-700 dark:text-white"
                />
                {giftMode === 'adjust' ? (
                  <div className="grid grid-cols-3 gap-1">
                    {[100, 500, 1000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftCoins((prev) => prev + num)}
                        className="py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-[10px] font-black text-emerald-900 transition-colors"
                      >
                        +{num}
                      </button>
                    ))}
                    {[-100, -500, -1000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftCoins((prev) => prev + num)}
                        className="py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-[10px] font-black text-rose-900 transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    {[0, 1000, 5000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftCoins(num)}
                        className="py-1 rounded-lg bg-amber-200/70 hover:bg-amber-300 text-[10px] font-black text-amber-950 transition-colors"
                      >
                        ={num}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Gems */}
              <div className="rounded-2xl border-2 border-blue-300 bg-blue-50/50 p-3.5 dark:border-blue-800 dark:bg-blue-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-blue-900 dark:text-blue-200 flex items-center gap-1.5">
                    <span>💎</span>
                    <span>{isEn ? 'Gems / Diamonds' : 'อัญมณี'}</span>
                  </label>
                  <span className="text-[10px] font-bold text-blue-700 dark:text-blue-300">
                    {giftMode === 'adjust' ? (isEn ? '(+/- adjustment)' : '(ยอดปรับเพิ่ม/ลด)') : (isEn ? '(exact balance)' : '(ยอดตายตัว)')}
                  </span>
                </div>
                <input
                  type="number"
                  step="10"
                  value={giftGems}
                  onChange={(e) => setGiftGems(Number(e.target.value))}
                  className="w-full rounded-xl border border-blue-300 bg-white p-2 text-xs font-black text-slate-900 dark:bg-slate-800 dark:border-blue-700 dark:text-white"
                />
                {giftMode === 'adjust' ? (
                  <div className="grid grid-cols-3 gap-1">
                    {[50, 200, 500].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftGems((prev) => prev + num)}
                        className="py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-[10px] font-black text-emerald-900 transition-colors"
                      >
                        +{num}
                      </button>
                    ))}
                    {[-50, -200, -500].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftGems((prev) => prev + num)}
                        className="py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-[10px] font-black text-rose-900 transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    {[50, 500, 2000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftGems(num)}
                        className="py-1 rounded-lg bg-blue-200/70 hover:bg-blue-300 text-[10px] font-black text-blue-950 transition-colors"
                      >
                        ={num}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* XP */}
              <div className="rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 p-3.5 dark:border-emerald-800 dark:bg-emerald-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-emerald-900 dark:text-emerald-200 flex items-center gap-1.5">
                    <span>⚡</span>
                    <span>{isEn ? 'Experience (XP)' : 'ค่าประสบการณ์ (XP)'}</span>
                  </label>
                  <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-300">
                    {giftMode === 'adjust' ? (isEn ? '(+/- adjustment)' : '(ยอดปรับเพิ่ม/ลด)') : (isEn ? '(exact balance)' : '(ยอดตายตัว)')}
                  </span>
                </div>
                <input
                  type="number"
                  step="50"
                  value={giftXp}
                  onChange={(e) => setGiftXp(Number(e.target.value))}
                  className="w-full rounded-xl border border-emerald-300 bg-white p-2 text-xs font-black text-slate-900 dark:bg-slate-800 dark:border-emerald-700 dark:text-white"
                />
                {giftMode === 'adjust' ? (
                  <div className="grid grid-cols-3 gap-1">
                    {[100, 300, 1000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftXp((prev) => prev + num)}
                        className="py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-[10px] font-black text-emerald-900 transition-colors"
                      >
                        +{num}
                      </button>
                    ))}
                    {[-100, -300, -1000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftXp((prev) => prev + num)}
                        className="py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-[10px] font-black text-rose-900 transition-colors"
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="grid grid-cols-3 gap-1">
                    {[0, 500, 2000].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGiftXp(num)}
                        className="py-1 rounded-lg bg-emerald-200/70 hover:bg-emerald-300 text-[10px] font-black text-emerald-950 transition-colors"
                      >
                        ={num}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* 3. Login Streak & Gift Cooldown Reset Section */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              {/* Login Streak Manager */}
              <div className="rounded-2xl border-2 border-orange-300 bg-orange-50/50 p-3.5 dark:border-orange-800 dark:bg-orange-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-orange-900 dark:text-orange-200 flex items-center gap-1.5">
                    <span>🔥</span>
                    <span>{isEn ? 'Login Streak (Days)' : 'วันที่เข้าเรียนต่อเนื่อง (สตรีค)'}</span>
                  </label>
                  <span className="text-[10px] font-bold text-orange-700 dark:text-orange-300">
                    {giftMode === 'adjust' ? (isEn ? '(+/- days)' : '(ปรับเพิ่ม/ลดวัน)') : (isEn ? '(exact days)' : '(กำหนดจำนวนวันตรง)')}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    step="1"
                    value={giftStreak}
                    onChange={(e) => setGiftStreak(Number(e.target.value))}
                    className="flex-1 rounded-xl border border-orange-300 bg-white p-2 text-xs font-black text-slate-900 dark:bg-slate-800 dark:border-orange-700 dark:text-white"
                  />
                  {selectedGiftUser && (
                    <button
                      type="button"
                      onClick={() => handleResetStreakDirectly(selectedGiftUser.id)}
                      className="px-2.5 py-1.5 rounded-xl bg-orange-200 hover:bg-orange-300 text-orange-950 text-[10px] font-black transition-colors"
                    >
                      {isEn ? 'Reset to 0' : 'รีเซ็ตเป็น 0 วัน'}
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-4 gap-1">
                  {[1, 7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGiftStreak((prev) => (giftMode === 'adjust' ? prev + num : num))}
                      className="py-1 rounded-lg bg-emerald-100 hover:bg-emerald-200 text-[10px] font-black text-emerald-900 transition-colors"
                    >
                      +{num} {isEn ? 'd' : 'วัน'}
                    </button>
                  ))}
                  {[-1, -7].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setGiftStreak((prev) => (giftMode === 'adjust' ? prev + num : Math.max(0, num)))}
                      className="py-1 rounded-lg bg-rose-100 hover:bg-rose-200 text-[10px] font-black text-rose-900 transition-colors"
                    >
                      {num} {isEn ? 'd' : 'วัน'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Daily Gift Cooldown Reset Card */}
              <div className="rounded-2xl border-2 border-purple-300 bg-purple-50/50 p-3.5 dark:border-purple-800 dark:bg-purple-950/30 space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-black text-purple-900 dark:text-purple-200 flex items-center gap-1.5">
                    <span>🕒</span>
                    <span>{isEn ? 'Daily Gift Cooldown' : 'เวลารับของขวัญ / คูลดาวน์'}</span>
                  </label>
                  {selectedGiftUser?.hasClaimedChestToday ? (
                    <span className="text-[10px] font-black text-orange-600 bg-orange-100 px-2 py-0.5 rounded-lg">
                      {isEn ? 'Claimed Today (Cooldown)' : 'รับแล้ววันนี้ (ติดคูลดาวน์)'}
                    </span>
                  ) : (
                    <span className="text-[10px] font-black text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-lg">
                      {isEn ? 'Ready to Claim' : 'พร้อมเปิดรับทันที'}
                    </span>
                  )}
                </div>
                <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                  {isEn
                    ? 'Resetting cooldown allows this player to immediately claim the mystery chest again without waiting 24 hours.'
                    : 'การรีเซ็ตเวลาจะล้างคูลดาวน์ 24 ชั่วโมง ช่วยให้ผู้เล่นสามารถเปิดรับหีบสมบัติปริศนาได้ทันที'}
                </p>
                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    disabled={!selectedGiftUser || giftSending}
                    onClick={() => selectedGiftUser && handleResetGiftCooldown(selectedGiftUser.id)}
                    className="flex-1 py-2 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-[11px] font-black shadow-sm transition-all active:scale-95 disabled:opacity-50"
                  >
                    {isEn ? '🔄 Reset Cooldown (Claim Now)' : '🔄 รีเซ็ตเวลารับของขวัญ (รับได้ทันที)'}
                  </button>
                  <button
                    type="button"
                    disabled={!selectedGiftUser || giftSending}
                    onClick={() =>
                      selectedGiftUser &&
                      handleToggleClaimedToday(selectedGiftUser.id, !selectedGiftUser.hasClaimedChestToday)
                    }
                    className="px-2.5 py-2 rounded-xl border border-purple-300 dark:border-purple-700 text-purple-900 dark:text-purple-200 hover:bg-purple-100 text-[10px] font-black transition-all disabled:opacity-50"
                  >
                    {selectedGiftUser?.hasClaimedChestToday
                      ? (isEn ? 'Clear' : 'ล้างสถานะ')
                      : (isEn ? 'Mark Claimed' : 'ตั้งเป็นรับแล้ว')}
                  </button>
                </div>
              </div>
            </div>

            {/* 4. Special Status Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <label className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-slate-50 dark:bg-slate-800/60 dark:border-slate-700 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={giftVip}
                  onChange={(e) => setGiftVip(e.target.checked)}
                  className="h-5 w-5 rounded-lg border-2 border-amber-500 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                    <span>👑</span>
                    <span>{isEn ? 'Grant VIP Dragon Knight Status' : 'เปิดสิทธิ์ยศอัศวินมังกร VIP'}</span>
                  </span>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {isEn ? 'Unlocks all lessons and VIP badge.' : 'ปลดล็อกทุกบทเรียนและแสดงเข็มกลัด VIP สีทอง'}
                  </p>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3.5 rounded-2xl border-2 border-slate-200 hover:border-amber-400 bg-slate-50 dark:bg-slate-800/60 dark:border-slate-700 cursor-pointer transition-all">
                <input
                  type="checkbox"
                  checked={giftDragonSet}
                  onChange={(e) => setGiftDragonSet(e.target.checked)}
                  className="h-5 w-5 rounded-lg border-2 border-amber-500 text-amber-500 focus:ring-amber-400"
                />
                <div>
                  <span className="text-xs font-black text-slate-900 dark:text-white flex items-center gap-1">
                    <span>🔥</span>
                    <span>{isEn ? 'Grant Full Fire Dragon Warrior Gear Set' : 'มอบชุดนักรบมังกรเพลิงครบเซ็ต'}</span>
                  </span>
                  <p className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                    {isEn ? 'Unlocks Dragon Helm, Armor, Katana & Boots.' : 'ปลดล็อกหมวกมังกร เกราะมังกร ดาบคาตานะเพลิง และรองเท้า'}
                  </p>
                </div>
              </label>
            </div>

            {/* 5. Reason Note */}
            <div>
              <label className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide block mb-1">
                {isEn ? 'Action Memo / Reason:' : 'บันทึกเหตุผลการปรับปรุงข้อมูล:'}
              </label>
              <input
                type="text"
                value={giftReason}
                onChange={(e) => setGiftReason(e.target.value)}
                placeholder={isEn ? 'e.g. Outstanding exam score reward or balance correction' : 'เช่น รางวัลผลการเรียนดีเด่น หรือปรับยอดความถูกต้อง'}
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-xs font-bold text-slate-800 focus:border-amber-500 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={giftSending}
                className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-orange-500 to-amber-500 text-white font-black text-sm shadow-xl shadow-amber-500/30 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {giftSending ? (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    <span>
                      {giftMode === 'set'
                        ? (isEn
                            ? `Save Exact Values for ${selectedGiftUser ? selectedGiftUser.name : 'Player'}`
                            : `บันทึกกำหนดยอดตายตัวให้ ${selectedGiftUser ? selectedGiftUser.name : 'ผู้เล่น'}`)
                        : (isEn
                            ? `Apply Adjustments to ${selectedGiftUser ? selectedGiftUser.name : 'Player'}`
                            : `ยืนยันการปรับยอด (+ / -) ให้ ${selectedGiftUser ? selectedGiftUser.name : 'ผู้เล่น'}`)}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab: Users Directory */}
      {activeTab === 'users' && (
        <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4 animate-in fade-in">
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-slate-100 pb-3 dark:border-slate-800">
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isEn ? `Registered Academy Students (${users.length})` : `รายชื่อผู้ใช้งานและผู้เรียนในระบบ (${users.length})`}
              </h3>
              <p className="text-xs font-bold text-slate-400">
                {isEn
                  ? 'Click "Grant Gift" to dispense coins, gems, and VIP directly to any student.'
                  : 'กดปุ่ม "มอบของขวัญ" เพื่อส่งเหรียญทองและสิทธิ์ VIP ให้ผู้เรียนได้ทันที'}
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder={isEn ? 'Search name or email...' : 'ค้นหาชื่อ หรือ อีเมล...'}
                value={userSearch}
                onChange={(e) => setUserSearch(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') loadUsers();
                }}
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 py-2 pl-9 pr-3 text-xs font-bold text-slate-800 focus:border-[#1CB0F6] focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b-2 border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/50">
                <tr>
                  <th className="p-3 font-black text-slate-600 dark:text-slate-400">
                    {isEn ? 'Student Name' : 'ชื่อผู้เรียน'}
                  </th>
                  <th className="p-3 font-black text-slate-600 dark:text-slate-400">
                    {isEn ? 'Email' : 'อีเมล'}
                  </th>
                  <th className="p-3 font-black text-slate-600 dark:text-slate-400">
                    {isEn ? 'Level / XP' : 'ระดับ / ค่าประสบการณ์'}
                  </th>
                  <th className="p-3 font-black text-slate-600 dark:text-slate-400">
                    {isEn ? 'Role' : 'สิทธิ์ในระบบ'}
                  </th>
                  <th className="p-3 font-black text-slate-600 dark:text-slate-400 text-center">
                    {isEn ? 'Grant Gift' : 'มอบของขวัญ'}
                  </th>
                  <th className="p-3 font-black text-slate-600 dark:text-slate-400 text-center">
                    {isEn ? 'Role Change' : 'เปลี่ยนสิทธิ์'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {users.map((u) => (
                  <tr key={u.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors">
                    <td className="p-3 font-black text-slate-900 dark:text-white">
                      {u.name}
                    </td>
                    <td className="p-3 font-bold text-slate-500">{u.email}</td>
                    <td className="p-3">
                      <span className="font-black text-blue-600 dark:text-blue-400">
                        Lv.{u.level || 0}
                      </span>{' '}
                      <span className="text-[10px] font-bold text-slate-400">
                        ({u.xp || 0} XP)
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`rounded-lg px-2 py-0.5 text-[10px] font-black ${
                          u.role === 'ADMIN'
                            ? 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400'
                            : 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400'
                        }`}
                      >
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        type="button"
                        onClick={() => handleOpenGiftForUser(u)}
                        className="inline-flex items-center gap-1 rounded-xl bg-amber-400 hover:bg-amber-300 text-amber-950 px-2.5 py-1 text-[11px] font-black shadow-xs transition-all active:scale-95 cursor-pointer"
                        title={isEn ? `Grant gifts to ${u.name}` : `มอบของขวัญให้ ${u.name}`}
                      >
                        <Gift className="h-3 w-3" />
                        <span>{isEn ? 'Grant Gift' : 'มอบของขวัญ'}</span>
                      </button>
                    </td>
                    <td className="p-3 text-center">
                      <select
                        value={u.role}
                        onChange={(e) => handleUpdateRole(u.id, e.target.value)}
                        className="rounded-xl border border-slate-200 bg-white px-2 py-1 text-xs font-bold text-slate-700 focus:outline-none dark:border-slate-800 dark:bg-slate-800 dark:text-slate-200"
                      >
                        <option value="STUDENT">STUDENT</option>
                        <option value="ADMIN">ADMIN</option>
                        <option value="INSTRUCTOR">INSTRUCTOR</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Questions & Batch Import */}
      {activeTab === 'questions' && (
        <div className="space-y-6 animate-in fade-in">
          <div className="flex gap-2">
            <button
              onClick={() => setQuestionMode('single')}
              className={`rounded-2xl px-4 py-2 text-xs font-black transition-all ${
                questionMode === 'single'
                  ? 'bg-purple-600 text-white shadow-duo shadow-purple-700'
                  : 'bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              {isEn ? 'Create Single Question' : 'เพิ่มข้อสอบทีละข้อ'}
            </button>
            <button
              onClick={() => setQuestionMode('batch')}
              className={`rounded-2xl px-4 py-2 text-xs font-black transition-all ${
                questionMode === 'batch'
                  ? 'bg-purple-600 text-white shadow-duo shadow-purple-700'
                  : 'bg-white text-slate-600 dark:bg-slate-900 dark:text-slate-300'
              }`}
            >
              <Upload className="inline h-3.5 w-3.5 mr-1" />
              {isEn ? 'Batch Import (JSON)' : 'นำเข้าชุดข้อสอบ JSON'}
            </button>
          </div>

          {questionMode === 'single' ? (
            <form
              onSubmit={handleCreateSingleQuestion}
              className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
            >
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isEn ? 'Create Single Exam Question' : 'สร้างคำถามข้อสอบใหม่'}
              </h3>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                    {isEn ? 'Exam Category' : 'หมวดหมู่ข้อสอบ'}
                  </label>
                  <select
                    value={newQuestion.categoryCode}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, categoryCode: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-2.5 text-xs font-bold dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="TOEIC_PART_5">TOEIC Part 5 • Incomplete Sentences</option>
                    <option value="TOEIC_PART_6">TOEIC Part 6 • Text Completion</option>
                    <option value="TOEIC_PART_7">TOEIC Part 7 • Reading Comprehension</option>
                    <option value="STEM_SCIENCE">STEM • Science & Thermodynamics</option>
                    <option value="STEM_TECH">STEM • Data Center Infrastructure</option>
                    <option value="STEM_ENG">STEM • Power & Cooling Systems</option>
                    <option value="STEM_MATH">STEM • Technical Calculations</option>
                    <option value="LOGIC">Logic & Reasoning Aptitude</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                    {isEn ? 'Difficulty Level' : 'ระดับความยาก'}
                  </label>
                  <select
                    value={newQuestion.difficulty}
                    onChange={(e) =>
                      setNewQuestion({ ...newQuestion, difficulty: e.target.value })
                    }
                    className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-2.5 text-xs font-bold dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                  >
                    <option value="EASY">{isEn ? 'Easy' : 'ง่าย'}</option>
                    <option value="MEDIUM">{isEn ? 'Medium' : 'ปานกลาง'}</option>
                    <option value="HARD">{isEn ? 'Hard' : 'ยาก'}</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  {isEn ? 'Question Content (English)' : 'โจทย์คำถามภาษาอังกฤษ'}
                </label>
                <textarea
                  rows={2}
                  value={newQuestion.questionText}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, questionText: e.target.value })
                  }
                  placeholder={isEn ? 'Enter question text in English...' : 'กรอกโจทย์คำถามภาษาอังกฤษ...'}
                  className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-xs font-bold dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  {isEn ? 'Question Explanation (Thai)' : 'คำอธิบายเฉลยภาษาไทย'}
                </label>
                <textarea
                  rows={2}
                  value={newQuestion.explanationTh}
                  onChange={(e) =>
                    setNewQuestion({ ...newQuestion, explanationTh: e.target.value })
                  }
                  placeholder={isEn ? 'Enter explanation in Thai...' : 'กรอกคำอธิบายเฉลยละเอียดภาษาไทย...'}
                  className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-3 text-xs font-bold dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 btn-duo-green text-xs font-black rounded-2xl shadow-sm"
                >
                  {isEn ? 'Save Exam Question' : 'บันทึกข้อสอบลงระบบ'}
                </button>
              </div>
            </form>
          ) : (
            <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4">
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                {isEn ? 'Batch Import Questions via JSON' : 'นำเข้าชุดข้อสอบจำนวนมากผ่าน JSON'}
              </h3>
              <p className="text-xs font-bold text-slate-500">
                {isEn
                  ? 'Paste an array of question objects to import into the database instantly.'
                  : 'วาง Array ข้อมูลคำถามในรูปแบบ JSON เพื่อนำเข้าคลังข้อสอบทั้งหมดทันที'}
              </p>

              {importStatus && (
                <div className="rounded-2xl border-2 border-purple-400 bg-purple-50 p-3 text-xs font-black text-purple-800 dark:bg-purple-950/60 dark:text-purple-200">
                  {importStatus}
                </div>
              )}

              <textarea
                rows={10}
                value={batchJson}
                onChange={(e) => setBatchJson(e.target.value)}
                placeholder='[ { "categoryCode": "TOEIC_PART_5", "questionText": "...", "options": [...] } ]'
                className="w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-4 font-mono text-xs dark:border-slate-800 dark:bg-slate-800 dark:text-white"
              />

              <button
                type="button"
                onClick={handleBatchImport}
                disabled={importing || !batchJson.trim()}
                className="w-full py-3 rounded-2xl bg-purple-600 text-white font-black text-xs shadow-md hover:bg-purple-500 disabled:opacity-50"
              >
                {importing
                  ? (isEn ? 'Importing Dataset...' : 'กำลังนำเข้าข้อมูล...')
                  : (isEn ? 'Execute Batch Import' : 'เริ่มนำเข้าข้อมูล')}
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab: Vocabulary */}
      {activeTab === 'vocab' && (
        <div className="space-y-6 animate-in fade-in">
          <form
            onSubmit={handleCreateVocab}
            className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-4"
          >
            <h3 className="text-base font-black text-slate-900 dark:text-white">
              {isEn ? 'Add Technical Vocabulary Word' : 'เพิ่มคำศัพท์เทคนิคใหม่'}
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  {isEn ? 'Word' : 'คำศัพท์'}
                </label>
                <input
                  type="text"
                  value={newVocab.word}
                  onChange={(e) => setNewVocab({ ...newVocab, word: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-2.5 text-xs font-bold dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  {isEn ? 'Meaning (Thai)' : 'ความหมายภาษาไทย'}
                </label>
                <input
                  type="text"
                  value={newVocab.meaningTh}
                  onChange={(e) => setNewVocab({ ...newVocab, meaningTh: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-2.5 text-xs font-bold dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>

              <div>
                <label className="text-xs font-black text-slate-700 dark:text-slate-300">
                  {isEn ? 'Pronunciation (IPA)' : 'สัทอักษร (IPA)'}
                </label>
                <input
                  type="text"
                  value={newVocab.ipa}
                  onChange={(e) => setNewVocab({ ...newVocab, ipa: e.target.value })}
                  className="mt-1 w-full rounded-2xl border-2 border-slate-200 bg-slate-50 p-2.5 text-xs font-bold dark:border-slate-800 dark:bg-slate-800 dark:text-white"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 btn-duo-green text-xs font-black rounded-2xl"
            >
              {isEn ? 'Save Vocabulary Word' : 'บันทึกคำศัพท์'}
            </button>
          </form>

          {/* Vocab List */}
          <div className="rounded-3xl border-2 border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-black text-slate-700 dark:text-slate-300 uppercase tracking-wide">
              {isEn ? `Vocabulary Words (${vocabList.length})` : `คำศัพท์ในคลัง (${vocabList.length})`}
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
              {vocabList.slice(0, 18).map((v: any) => (
                <div
                  key={v.id}
                  className="flex items-center justify-between p-3 rounded-2xl border border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-800/60"
                >
                  <div>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      {v.word}
                    </span>
                    <p className="text-[11px] font-bold text-slate-500">{v.meaningTh}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteVocab(v.id)}
                    className="p-1.5 text-slate-400 hover:text-rose-500 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

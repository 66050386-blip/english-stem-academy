import React, { useState, useEffect } from 'react';
import { api } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import {
  DuoMascot,
  HeadgearId,

  OutfitId,
  WeaponId,
  ShoesId,
  MascotMood,
  MascotStance,
} from '../components/Mascot/DuoMascot';
import {
  Sparkles,
  Gem,
  Crown,
  Flame,
  Check,
  Lock,
  ShoppingBag,
  Shield,
  Zap,
  RefreshCw,
  Sliders,
  ChevronRight,
  Info,
  X,
  CheckCircle,
  Copy,
  ExternalLink,
  QrCode,
  Building2,
  Smartphone,
  CheckCheck,
  CreditCard,
  ArrowLeft,
} from 'lucide-react';

interface CatalogItem {
  id: string;
  name: string;
  nameTh: string;
  category: 'head' | 'armor' | 'weapon' | 'shoes';
  price: number;
  currency?: 'gems' | 'coins';
  requiredLevel: number;
  descriptionTh: string;
  icon: string;
  badge?: string;
}

interface TopupPackage {
  id: string;
  nameTh: string;
  coins: number;
  priceThb: number;
  bonusGems: number;
  vip: boolean;
  vipDays: number;
  icon: string;
  badge?: string;
}

export const WardrobePage: React.FC = () => {
  const { user, refreshUser } = useAuth();
  const { language, t } = useLanguage();
  const isEn = language === 'en';
  const [loading, setLoading] = useState(true);
  const [catalog, setCatalog] = useState<CatalogItem[]>([]);
  const [topupPackages, setTopupPackages] = useState<TopupPackage[]>([]);
  const [showTopupModal, setShowTopupModal] = useState(false);
  const [toppingUpId, setToppingUpId] = useState<string | null>(null);
  const [selectedTopupPkg, setSelectedTopupPkg] = useState<TopupPackage | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);


  const [equipped, setEquipped] = useState<{
    head: HeadgearId;
    armor: OutfitId;
    weapon: WeaponId;
    shoes: ShoesId;
  }>({
    head: 'NONE',
    armor: 'DEFAULT',
    weapon: 'STEEL_KATANA',
    shoes: 'SNEAKERS',
  });
  const [unlockedItems, setUnlockedItems] = useState<string[]>([]);
  const [balance, setBalance] = useState({
    xp: 0,
    level: 0,
    gems: 50,
    coins: 0,
    isVip: false,
    rankTitle: 'Intern Trainee',
    rankTitleTh: 'เด็กฝึกงานเทคนิค',
    nextLevelXp: 100,
  });

  // Preview state (what the user is currently trying on)
  const [previewHead, setPreviewHead] = useState<HeadgearId>('NONE');
  const [previewArmor, setPreviewArmor] = useState<OutfitId>('DEFAULT');
  const [previewWeapon, setPreviewWeapon] = useState<WeaponId>('STEEL_KATANA');
  const [previewShoes, setPreviewShoes] = useState<ShoesId>('SNEAKERS');
  const [previewMood, setPreviewMood] = useState<MascotMood>('cheering');
  const [previewStance, setPreviewStance] = useState<MascotStance>('ready');

  // Category selection tab
  const [selectedTab, setSelectedTab] = useState<'head' | 'armor' | 'weapon' | 'shoes'>('head');
  const [actionMessage, setActionMessage] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [processingId, setProcessingId] = useState<string | null>(null);

  // Admin God Mode State
  const [adminAddGems, setAdminAddGems] = useState(500);
  const [adminAddCoins, setAdminAddCoins] = useState(500);
  const [adminAddXp, setAdminAddXp] = useState(500);

  const fetchWardrobe = async () => {
    try {
      setLoading(true);
      const data = await api.wardrobe.getWardrobe();
      if (data?.catalog) setCatalog(data.catalog);
      if (data?.topupPackages) setTopupPackages(data.topupPackages);
      if (data?.equipped) {
        setEquipped(data.equipped);
        setPreviewHead(data.equipped.head);
        setPreviewArmor(data.equipped.armor);
        setPreviewWeapon(data.equipped.weapon);
        setPreviewShoes(data.equipped.shoes);
      }
      if (data?.unlockedItems) setUnlockedItems(data.unlockedItems);
      if (data?.balance) setBalance(data.balance);
    } catch (err: any) {
      setActionError(err.message || 'ไม่สามารถโหลดข้อมูลห้องแต่งตัวได้');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWardrobe();
  }, []);

  useEffect(() => {
    if (showTopupModal && topupPackages.length > 0 && !selectedTopupPkg) {
      const warrior = topupPackages.find((p) => p.id === 'COIN_WARRIOR') || topupPackages[0];
      setSelectedTopupPkg(warrior);
    }
  }, [showTopupModal, topupPackages, selectedTopupPkg]);

  const handleBuy = async (item: CatalogItem) => {
    try {
      setActionError(null);
      setProcessingId(item.id);
      const res = await api.wardrobe.buyItem(item.id);
      setActionMessage(res?.message || `ซื้อ ${item.nameTh} สำเร็จ!`);
      
      // Resiliently read gems, coins, VIP, and unlocked items
      const newGems = res?.gems ?? res?.data?.gems;
      const newCoins = res?.coins ?? res?.data?.coins;
      const newVip = res?.isVip ?? res?.data?.isVip;
      const newUnlocked = res?.unlockedItems ?? res?.data?.unlockedItems;

      setBalance((prev) => ({
        ...prev,
        gems: newGems !== undefined ? newGems : prev.gems,
        coins: newCoins !== undefined ? newCoins : prev.coins,
        isVip: newVip !== undefined ? newVip : prev.isVip,
      }));

      if (newUnlocked) {
        setUnlockedItems(newUnlocked);
      }

      // Auto-equip upon purchase!
      await handleEquip(item);
      if (refreshUser) refreshUser();
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาดในการซื้อ');
    } finally {
      setProcessingId(null);
    }
  };

  const handleTopup = async (pkg: TopupPackage) => {
    try {
      setActionError(null);
      setToppingUpId(pkg.id);
      const res = await api.wardrobe.topup(pkg.id);
      setActionMessage(res.message);
      
      const resCoins = res?.data?.coins;
      const resGems = res?.data?.gems;
      const resVip = res?.data?.isVip;

      setBalance((prev) => ({
        ...prev,
        coins: resCoins !== undefined ? resCoins : prev.coins + pkg.coins,
        gems: resGems !== undefined ? resGems : prev.gems + pkg.bonusGems,
        isVip: resVip !== undefined ? resVip : (pkg.vip || prev.isVip),
      }));

      setShowTopupModal(false);
      if (refreshUser) refreshUser();
    } catch (err: any) {
      setActionError(err.message || 'การเติมเหรียญทองล้มเหลว');
    } finally {
      setToppingUpId(null);
    }
  };

  const handleEquip = async (item: CatalogItem) => {
    try {
      setActionError(null);
      setProcessingId(item.id);
      const res = await api.wardrobe.equipItem(item.category, item.id);
      setActionMessage(res?.message || `สวมใส่ ${item.nameTh} เรียบร้อยแล้ว!`);
      
      // Resiliently read equipped payload
      const equippedData = res?.equipped || res?.data?.equipped;
      if (equippedData) {
        setEquipped(equippedData);
      }
      
      // Update preview to match
      if (item.category === 'head') setPreviewHead(item.id as HeadgearId);
      if (item.category === 'armor') setPreviewArmor(item.id as OutfitId);
      if (item.category === 'weapon') setPreviewWeapon(item.id as WeaponId);
      if (item.category === 'shoes') setPreviewShoes(item.id as ShoesId);
      if (refreshUser) refreshUser();
    } catch (err: any) {
      setActionError(err.message || 'เกิดข้อผิดพลาดในการสวมใส่');
    } finally {
      setProcessingId(null);
    }
  };

  const handleTryOn = (item: CatalogItem) => {
    if (item.category === 'head') setPreviewHead(item.id as HeadgearId);
    if (item.category === 'armor') setPreviewArmor(item.id as OutfitId);
    if (item.category === 'weapon') setPreviewWeapon(item.id as WeaponId);
    if (item.category === 'shoes') setPreviewShoes(item.id as ShoesId);
  };

  const handleResetPreviewToEquipped = () => {
    if (!equipped) return;
    setPreviewHead(equipped.head as HeadgearId);
    setPreviewArmor(equipped.armor as OutfitId);
    setPreviewWeapon(equipped.weapon as WeaponId);
    setPreviewShoes(equipped.shoes as ShoesId);
  };

  // Admin God Mode Actions
  const handleAdminAdjust = async (opts: {
    addGems?: number;
    addCoins?: number;
    setVip?: boolean;
    addXp?: number;
    unlockAll?: boolean;
    resetToLevelZero?: boolean;
  }) => {
    try {
      setActionError(null);
      const res = await api.wardrobe.adminAdjust(opts);
      setActionMessage(res.message);
      await fetchWardrobe();
      if (refreshUser) refreshUser();
    } catch (err: any) {
      setActionError(err.message || 'คำสั่งแอดมินล้มเหลว');
    }
  };

  const currentTabItems = catalog.filter((item) => item.category === selectedTab);

  if (loading) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-500 border-t-transparent" />
          <p className="text-xs font-bold text-slate-400">กำลังเปิดตู้เสื้อผ้าและร้านค้ากุ้งนักดาบ...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 select-none">
      {/* Top Banner / Hero Header */}
      <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 p-6 text-white shadow-xl dark:border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-black uppercase tracking-wider text-cyan-300 backdrop-blur">
              <Sparkles className="h-3.5 w-3.5 fill-cyan-300" />
              <span>Lobster Warrior Wardrobe & Armory</span>
            </div>
            <h1 className="mt-2 text-2xl sm:text-3xl font-black tracking-tight">
              ห้องแต่งตัว & คลังอาวุธน้องกุ้งนักดาบ ⚔️
            </h1>
            <p className="mt-1 text-xs sm:text-sm font-bold text-blue-200 max-w-xl">
              ปรับแต่งเครื่องหัว ชุดเกราะ อาวุธ และรองเท้าให้กับน้องกุ้ง! นักเรียนไต่เต้าตั้งแต่ Level 0
              สะสมอัญมณีและเหรียญทองเพื่อปลดล็อกเซ็ตนักรบมังกรเพลิงในตำนาน!
            </p>
          </div>

          {/* User Currency Badges - Entire Cards Clickable to Top Up */}
          <div className="flex flex-wrap items-center gap-3">
            {/* VIP Status Badge if isVip - Clickable to open top-up */}
            {balance.isVip && (
              <button
                type="button"
                onClick={() => setShowTopupModal(true)}
                className="flex items-center gap-2 rounded-2xl bg-gradient-to-r from-amber-500/30 via-yellow-500/20 to-amber-500/30 border-2 border-amber-400/60 px-3.5 py-2 backdrop-blur animate-pulse shadow-lg shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all text-left cursor-pointer"
                title={isEn ? 'VIP Dragon Knight Active - Click to top up or renew' : 'สิทธิ์อัศวินมังกร VIP - คลิกเพื่อเติมเงินหรือต่ออายุ'}
              >
                <span className="text-xl">👑</span>
                <div className="text-left">
                  <p className="text-[10px] font-black uppercase text-yellow-300">
                    {isEn ? 'Special Rank' : 'ยศพิเศษ'}
                  </p>
                  <p className="text-xs font-black text-amber-200">
                    {isEn ? 'VIP Dragon Knight' : 'อัศวินมังกร VIP'}
                  </p>
                </div>
              </button>
            )}

            {/* Level & Rank */}
            <div className="flex items-center gap-2 rounded-2xl bg-white/10 border border-white/20 px-3.5 py-2 backdrop-blur">
              <Crown className="h-5 w-5 fill-[#FFC800] text-[#FFC800]" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-amber-300">
                  {isEn ? `Level ${balance.level}` : `เลเวล ${balance.level}`}
                </p>
                <p className="text-xs font-black text-white">
                  {isEn ? balance.rankTitle : balance.rankTitleTh}
                </p>
              </div>
            </div>

            {/* Gems / Diamonds - Entire card is clickable to open top-up */}
            <button
              type="button"
              onClick={() => setShowTopupModal(true)}
              className="flex items-center gap-2 rounded-2xl bg-blue-500/20 border border-blue-400/30 px-3.5 py-2 backdrop-blur hover:scale-105 active:scale-95 transition-all text-left cursor-pointer"
              title={isEn ? 'Gems Balance - Click to top up' : 'อัญมณีสะสม - คลิกเพื่อเติมเงิน'}
            >
              <Gem className="h-5 w-5 fill-[#38BDF8] text-[#38BDF8]" />
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-sky-300">
                  {isEn ? 'Gems' : 'อัญมณี'}
                </p>
                <p className="text-sm font-black text-white">{balance.gems} 💎</p>
              </div>
            </button>

            {/* Gold Coins (🪙) + Topup Button - Entire Card is Clickable to Open Top-up */}
            <button
              type="button"
              onClick={() => setShowTopupModal(true)}
              className="flex items-center gap-2.5 rounded-2xl bg-amber-500/25 border-2 border-amber-400/60 px-3.5 py-2 backdrop-blur hover:scale-105 active:scale-95 transition-all text-left cursor-pointer shadow-md shadow-amber-500/20"
              title={isEn ? 'Gold Coins - Click anywhere to top up via SCB' : 'เหรียญทอง - คลิกส่วนไหนก็เด้งเข้าหน้าเติมเงินไทยพาณิชย์'}
            >
              <span className="text-2xl">🪙</span>
              <div className="text-left">
                <p className="text-[10px] font-black uppercase text-amber-300">
                  {isEn ? 'Gold Coins' : 'เหรียญทอง'}
                </p>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-black text-white">{balance.coins.toLocaleString()} 🪙</p>
                  <span className="rounded-lg bg-amber-400 px-2 py-0.5 text-[10px] font-black text-amber-950 shadow-sm">
                    {isEn ? '+ Top Up' : '+ เติมเหรียญ'}
                  </span>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Admin God Mode Toolbar (Only visible to Admin) */}
      {user?.role === 'ADMIN' && (
        <div className="rounded-2xl border-2 border-rose-300 bg-rose-50/80 p-4 dark:border-rose-900 dark:bg-rose-950/40">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-rose-800 dark:text-rose-200">
              <Shield className="h-5 w-5 fill-rose-500 text-rose-600" />
              <span className="text-xs font-black uppercase tracking-wider">
                ⚡ แอดมินพาเนล (Admin God Mode - มีอำนาจสูงสุด)
              </span>
            </div>
            <span className="rounded-full bg-rose-200 px-2 py-0.5 text-[10px] font-black text-rose-800 dark:bg-rose-900 dark:text-rose-200">
              ADMIN CONTROL
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => handleAdminAdjust({ addGems: 500 })}
              className="flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white px-3 py-1.5 text-xs font-black text-rose-700 hover:bg-rose-100 shadow-sm dark:bg-slate-900 dark:border-rose-800 dark:text-rose-300"
            >
              <Gem className="h-3.5 w-3.5 fill-rose-500 text-rose-500" />
              <span>+500 💎 เติมเพชรด่วน</span>
            </button>

            <button
              onClick={() => handleAdminAdjust({ addCoins: 500 })}
              className="flex items-center gap-1.5 rounded-xl border border-amber-300 bg-white px-3 py-1.5 text-xs font-black text-amber-700 hover:bg-amber-100 shadow-sm dark:bg-slate-900 dark:border-amber-800 dark:text-amber-300"
            >
              <span>🪙 +500 เหรียญทอง</span>
            </button>

            <button
              onClick={() => handleAdminAdjust({ setVip: !balance.isVip })}
              className="flex items-center gap-1.5 rounded-xl border border-amber-400 bg-amber-100 px-3 py-1.5 text-xs font-black text-amber-900 hover:bg-amber-200 shadow-sm dark:bg-amber-950 dark:border-amber-700 dark:text-amber-300"
            >
              <span>👑 {balance.isVip ? 'ปิดสิทธิ์ VIP' : 'เปิดยศ VIP ทันที'}</span>
            </button>

            <button
              onClick={() => handleAdminAdjust({ addXp: 500 })}
              className="flex items-center gap-1.5 rounded-xl border border-rose-300 bg-white px-3 py-1.5 text-xs font-black text-rose-700 hover:bg-rose-100 shadow-sm dark:bg-slate-900 dark:border-rose-800 dark:text-rose-300"
            >
              <Zap className="h-3.5 w-3.5 fill-amber-500 text-amber-500" />
              <span>+500 XP เพิ่มเลเวล</span>
            </button>

            <button
              onClick={() => handleAdminAdjust({ unlockAll: true })}
              className="flex items-center gap-1.5 rounded-xl border border-emerald-400 bg-emerald-500 px-3 py-1.5 text-xs font-black text-white hover:bg-emerald-600 shadow-sm"
            >
              <Sparkles className="h-3.5 w-3.5 fill-white" />
              <span>⚡ ปลดล็อกไอเทมทั้งหมดฟรี!</span>
            </button>

            <button
              onClick={() => handleAdminAdjust({ resetToLevelZero: true })}
              className="flex items-center gap-1.5 rounded-xl border border-slate-300 bg-white px-3 py-1.5 text-xs font-black text-slate-700 hover:bg-slate-100 shadow-sm dark:bg-slate-900 dark:border-slate-700 dark:text-slate-300"
              title="ทดสอบมุมมองของนักเรียนที่เริ่มต้นจาก Level 0"
            >
              <RefreshCw className="h-3.5 w-3.5" />
              <span>รีเซ็ตเป็น Level 0 (Intern Trainee)</span>
            </button>
          </div>
        </div>
      )}

      {/* Notifications */}
      {actionMessage && (
        <div className="rounded-2xl border-2 border-emerald-400 bg-emerald-50 p-3 text-xs font-black text-emerald-800 dark:bg-emerald-950/40 dark:border-emerald-700 dark:text-emerald-300 animate-in fade-in">
          ✓ {actionMessage}
        </div>
      )}
      {actionError && (
        <div className="rounded-2xl border-2 border-rose-400 bg-rose-50 p-3 text-xs font-black text-rose-800 dark:bg-rose-950/40 dark:border-rose-700 dark:text-rose-300 animate-in fade-in">
          ⚠️ {actionError}
        </div>
      )}

      {/* Main Grid: Live Character Dressing Stage (Left) + Item Shop Shelves (Right) */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        {/* Left: Interactive 3D Character Stage */}
        <div className="lg:col-span-5 space-y-4">
          <div className="rounded-3xl border-2 border-slate-200 bg-gradient-to-b from-slate-50 to-blue-50/50 p-6 text-center shadow-lg dark:border-slate-800 dark:from-slate-900 dark:to-slate-950">
            <span className="text-[11px] font-black uppercase tracking-wider text-slate-400">
              🎮 เวทีลองชุดสด (Live Fitting Room)
            </span>

            {/* Stage Pedestal */}
            <div className="relative mt-4 flex items-center justify-center min-h-[220px]">
              {/* Background Aura */}
              <div className="absolute h-44 w-44 rounded-full bg-blue-400/20 blur-2xl" />

              {/* LIVE MASCOT with Try-On Gear and Interactive Slashing */}
              <div className="animate-float relative z-10">
                <DuoMascot
                  mood={previewMood}
                  stance={previewStance}
                  size={200}
                  headgear={previewHead}
                  outfit={previewArmor}
                  weapon={previewWeapon}
                  shoes={previewShoes}
                  interactiveSlash={true}
                  isSlashing={previewStance === 'slash'}
                />
              </div>
            </div>

            <p className="mt-1 text-[11px] font-black text-primary-600 dark:text-primary-400">
              ⚡ คลิกที่ตัวน้องกุ้งเพื่อออกท่าฟันดาบได้เลย! ⚔️
            </p>

            {/* Currently Previewing Badge Summary */}
            <div className="mt-3 flex flex-wrap justify-center gap-1.5 text-[10px] font-black">
              <span className="rounded-lg bg-yellow-100 text-yellow-800 px-2 py-0.5 dark:bg-yellow-950 dark:text-yellow-300">
                หัว: {catalog.find((i) => i.id === previewHead)?.nameTh.split(' ')[0] || 'ธรรมชาติ'}
              </span>
              <span className="rounded-lg bg-orange-100 text-orange-800 px-2 py-0.5 dark:bg-orange-950 dark:text-orange-300">
                ชุด: {catalog.find((i) => i.id === previewArmor)?.nameTh.split(' ')[0] || 'ดั้งเดิม'}
              </span>
              <span className="rounded-lg bg-blue-100 text-blue-800 px-2 py-0.5 dark:bg-blue-950 dark:text-blue-300">
                อาวุธ: {catalog.find((i) => i.id === previewWeapon)?.nameTh.split(' ')[0] || 'ดาบซามูไร'}
              </span>
              <span className="rounded-lg bg-sky-100 text-sky-800 px-2 py-0.5 dark:bg-sky-950 dark:text-sky-300">
                รองเท้า: {catalog.find((i) => i.id === previewShoes)?.nameTh.split(' ')[0] || 'สนีกเกอร์'}
              </span>
            </div>

            {/* Stance / Pose Selector */}
            <div className="mt-4 pt-3 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                ⚔️ เลือกท่วงท่าการต่อสู้ (Battle Stance)
              </p>
              <div className="flex flex-wrap justify-center gap-1.5">
                {[
                  { id: 'ready' as const, label: '⚔️ พร้อมรบ' },
                  { id: 'slash' as const, label: '⚡ ฟันดาบ' },
                  { id: 'guard' as const, label: '🛡️ ป้องกัน' },
                  { id: 'victory' as const, label: '🏆 ชูอาวุธ' },
                  { id: 'chill' as const, label: '😎 ยืนเท่' },
                ].map((s) => (
                  <button
                    key={s.id}
                    onClick={() => setPreviewStance(s.id)}
                    className={`rounded-xl px-2.5 py-1 text-xs font-black transition-all ${
                      previewStance === s.id
                        ? 'bg-[#58CC02] text-white shadow-sm scale-105'
                        : 'bg-slate-200/80 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Expressions */}
            <div className="mt-3 pt-3 border-t border-slate-200 dark:border-slate-800">
              <p className="text-[10px] font-black uppercase tracking-wider text-slate-400 mb-2">
                ✨ อารมณ์นักสู้ (Mood)
              </p>
              <div className="flex justify-center gap-1.5">
                {(['cheering', 'proud', 'happy', 'thinking'] as MascotMood[]).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPreviewMood(m)}
                    className={`rounded-xl px-2.5 py-1 text-xs font-black transition-all ${
                      previewMood === m
                        ? 'bg-[#1CB0F6] text-white shadow-sm'
                        : 'bg-slate-200/80 text-slate-600 hover:bg-slate-300 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {m === 'cheering'
                      ? '🎉 ฉลอง'
                      : m === 'proud'
                      ? '🌟 มั่นใจ'
                      : m === 'happy'
                      ? '😊 ยิ้ม'
                      : '🤔 ขบคิด'}
                  </button>
                ))}
              </div>
            </div>

            {/* Reset to Currently Equipped button */}
            <button
              onClick={handleResetPreviewToEquipped}
              className="mt-3 text-[11px] font-extrabold text-[#1CB0F6] hover:underline"
            >
              รีเซ็ตพรีวิวกลับเป็นชุดที่สวมใส่อยู่จริง
            </button>
          </div>
        </div>

        {/* Right: Wardrobe Shop Catalog by Category */}
        <div className="lg:col-span-7 space-y-4">
          {/* Category Tabs */}
          <div className="flex rounded-2xl bg-slate-200/70 p-1.5 dark:bg-slate-800">
            {[
              { id: 'head' as const, label: '🪖 เครื่องหัว', count: 5 },
              { id: 'armor' as const, label: '🦺 ชุดเกราะ', count: 5 },
              { id: 'weapon' as const, label: '⚔️ อาวุธในก้าม', count: 5 },
              { id: 'shoes' as const, label: '👟 รองเท้า', count: 3 },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`flex-1 rounded-xl py-2 text-xs font-black transition-all ${
                  selectedTab === tab.id
                    ? 'bg-white text-slate-900 shadow-sm dark:bg-slate-900 dark:text-white'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200'
                }`}
              >
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Catalog Items Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {currentTabItems.map((item) => {
              const isUnlocked = unlockedItems.includes(item.id) || user?.role === 'ADMIN';
              const isEquipped =
                (item.category === 'head' && equipped.head === item.id) ||
                (item.category === 'armor' && equipped.armor === item.id) ||
                (item.category === 'weapon' && equipped.weapon === item.id) ||
                (item.category === 'shoes' && equipped.shoes === item.id);

              const isTryingOn =
                (item.category === 'head' && previewHead === item.id) ||
                (item.category === 'armor' && previewArmor === item.id) ||
                (item.category === 'weapon' && previewWeapon === item.id) ||
                (item.category === 'shoes' && previewShoes === item.id);

              const isCoin = item.currency === 'coins';
              const canAfford = isCoin ? balance.coins >= item.price : balance.gems >= item.price;
              const meetsLevel = isCoin || balance.level >= item.requiredLevel || user?.role === 'ADMIN';

              return (
                <div
                  key={item.id}
                  onClick={() => handleTryOn(item)}
                  className={`group relative flex flex-col justify-between rounded-2xl border-2 p-4 transition-all cursor-pointer ${
                    isEquipped
                      ? 'border-[#58CC02] bg-emerald-50/50 shadow-sm dark:bg-emerald-950/20 dark:border-emerald-700'
                      : isTryingOn
                      ? 'border-[#1CB0F6] bg-blue-50/50 shadow-sm dark:bg-blue-950/20 dark:border-blue-600'
                      : isCoin
                      ? 'border-amber-300 bg-amber-50/30 hover:border-amber-400 dark:border-amber-800 dark:bg-amber-950/20'
                      : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
                  }`}
                >
                  {/* Top Bar with Icon & Rarity Badge */}
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-100 text-xl dark:bg-slate-800 shadow-inner">
                        {item.icon}
                      </span>
                      <div className="flex items-center gap-1.5">
                        {item.badge && (
                          <span
                            className={`rounded-full px-2 py-0.5 text-[9px] font-black uppercase ${
                              item.badge.includes('VIP')
                                ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-sm animate-pulse'
                                : 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                        {isEquipped && (
                          <span className="flex items-center gap-1 rounded-full bg-[#58CC02] px-2 py-0.5 text-[10px] font-black text-white shadow-duo shadow-[#46A302]">
                            <Check className="h-3 w-3 stroke-[3]" />
                            <span>สวมใส่อยู่</span>
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Titles */}
                    <div className="mt-2.5">
                      <h4 className="text-xs font-black text-slate-800 dark:text-white leading-tight">
                        {item.nameTh}
                      </h4>
                      <p className="text-[10px] font-bold text-slate-400 truncate">{item.name}</p>
                    </div>

                    <p className="mt-1.5 text-[11px] font-medium text-slate-600 dark:text-slate-300 line-clamp-2">
                      {item.descriptionTh}
                    </p>
                  </div>

                  {/* Bottom Action Bar */}
                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                    {/* Price or Status */}
                    <div>
                      {isUnlocked ? (
                        <span className="text-[11px] font-extrabold text-emerald-600 dark:text-emerald-400">
                          {item.price === 0 ? 'ฟรี' : 'ปลดล็อกแล้ว ✓'}
                        </span>
                      ) : isCoin ? (
                        <div className="flex items-center gap-1 text-xs font-black text-amber-600 dark:text-amber-400">
                          <span className="text-sm">🪙</span>
                          <span>{item.price} เหรียญ</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1 text-xs font-black text-blue-600 dark:text-blue-400">
                          <Gem className="h-3.5 w-3.5 fill-[#1CB0F6]" />
                          <span>{item.price} 💎</span>
                        </div>
                      )}
                    </div>

                    {/* Action Button */}
                    <div>
                      {isEquipped ? (
                        <button
                          disabled
                          className="rounded-xl bg-emerald-100 px-3 py-1 text-[11px] font-black text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                        >
                          พร้อมใช้งาน
                        </button>
                      ) : isUnlocked ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEquip(item);
                          }}
                          disabled={processingId === item.id}
                          className="btn-duo-blue rounded-xl px-3 py-1 text-[11px] font-black"
                        >
                          สวมใส่
                        </button>
                      ) : !meetsLevel ? (
                        <span className="flex items-center gap-1 text-[10px] font-black text-slate-400">
                          <Lock className="h-3 w-3" />
                          <span>ต้องการ Lv.{item.requiredLevel}</span>
                        </span>
                      ) : isCoin && !canAfford ? (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setShowTopupModal(true);
                          }}
                          className="rounded-xl bg-amber-400 border-b-2 border-amber-600 px-2.5 py-1 text-[11px] font-black text-amber-950 hover:bg-amber-300 shadow-sm"
                        >
                          เติมเหรียญทอง 🪙
                        </button>
                      ) : (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleBuy(item);
                          }}
                          disabled={!canAfford || processingId === item.id}
                          className={`rounded-xl px-3 py-1 text-[11px] font-black transition-all ${
                            canAfford
                              ? isCoin
                                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md shadow-amber-500/30 hover:brightness-110 active:translate-y-0.5'
                                : 'bg-amber-400 border-b-2 border-amber-600 text-slate-900 hover:bg-amber-300 active:translate-y-0.5'
                              : 'bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-800'
                          }`}
                        >
                          {canAfford
                            ? isCoin
                              ? 'ซื้อ (รับ VIP) 👑'
                              : 'ซื้อเลย 💎'
                            : isCoin
                            ? 'เหรียญไม่พอ'
                            : 'เพชรไม่พอ'}
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top-up Modal Dialog for Gold Coins & VIP Status with SCB 4150431812 Bank Gateway */}
      {/* Top-up Modal Dialog for Gold Coins & VIP Status with SCB 4150431812 Bank Gateway */}
      {showTopupModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 p-3 sm:p-4 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-purple-500/50 bg-white p-4 sm:p-6 shadow-2xl dark:bg-slate-900 dark:border-purple-600 space-y-4">
            
            {/* 1. Modal Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
              <div className="flex items-center gap-2.5">
                <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4E2A84] to-[#7B2CBF] text-white text-xl shadow-md">
                  🪙
                </span>
                <div>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                    <span>เติมเหรียญทองมังกร & ยศ VIP</span>
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#4E2A84] text-white shadow-sm">
                      SCB EASY
                    </span>
                  </h3>
                  <p className="text-xs font-bold text-purple-700 dark:text-purple-300">
                    ธนาคารไทยพาณิชย์ บัญชี 415-043181-2 • รับเหรียญและสิทธิ์ VIP ทันที
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowTopupModal(false)}
                className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:text-slate-400"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* 2. Package Selector (4 Clean Balanced Tiles) */}
            <div>
              <label className="text-xs font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 block">
                เลือกแพ็กเกจเหรียญทอง (คลิกเพื่อเลือก):
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {topupPackages.map((pkg) => {
                  const isSelected = selectedTopupPkg?.id === pkg.id;
                  return (
                    <button
                      key={pkg.id}
                      type="button"
                      onClick={() => setSelectedTopupPkg(pkg)}
                      className={`relative flex flex-col justify-between p-3 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                        isSelected
                          ? 'border-purple-600 bg-purple-50/90 dark:bg-purple-950/60 dark:border-purple-500 shadow-md ring-2 ring-purple-500'
                          : 'border-slate-200 bg-white hover:border-purple-300 dark:border-slate-800 dark:bg-slate-900/90'
                      }`}
                    >
                      {/* Badge if present */}
                      <div className="h-5 mb-1 flex items-center justify-between">
                        {pkg.vip ? (
                          <span className="px-2 py-0.5 rounded-full bg-gradient-to-r from-amber-500 to-orange-500 text-[9px] font-black uppercase text-white shadow-xs">
                            👑 VIP
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded-full bg-slate-100 text-[9px] font-black text-slate-600 dark:bg-slate-800 dark:text-slate-400">
                            Starter
                          </span>
                        )}
                        {isSelected && (
                          <span className="flex h-4 w-4 items-center justify-center rounded-full bg-purple-600 text-white text-[10px] font-black">
                            ✓
                          </span>
                        )}
                      </div>

                      {/* Content */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5">
                          <span className="text-xl">{pkg.icon}</span>
                          <span className="text-sm font-black text-slate-900 dark:text-white">
                            +{pkg.coins.toLocaleString()}
                          </span>
                          <span className="text-xs">🪙</span>
                        </div>
                        <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400">
                          +{pkg.bonusGems} 💎 โบนัส
                        </p>
                        {pkg.vip ? (
                          <p className="text-[10px] font-black text-amber-700 dark:text-amber-300">
                            VIP {pkg.vipDays} วัน
                          </p>
                        ) : (
                          <p className="text-[10px] font-bold text-slate-400">
                            ชุดแฟชั่นช็อป
                          </p>
                        )}
                      </div>

                      {/* Price Tag */}
                      <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                        <span className="text-xs font-black text-slate-900 dark:text-white">
                          ฿{pkg.priceThb}
                        </span>
                        <span className={`text-[10px] font-extrabold ${isSelected ? 'text-purple-600 dark:text-purple-300' : 'text-slate-400'}`}>
                          {isSelected ? 'เลือกอยู่' : 'เลือก'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. SCB Official Bank Payment Card (4150431812) */}
            {selectedTopupPkg && (
              <div className="rounded-3xl bg-gradient-to-br from-[#3B1E68] via-[#4E2A84] to-[#6C2EB9] p-4 sm:p-5 text-white shadow-xl border-2 border-purple-400/40 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 px-2.5 items-center justify-center rounded-xl bg-white/20 font-black text-xs uppercase tracking-wide backdrop-blur-sm">
                      SCB EASY
                    </div>
                    <div>
                      <h4 className="text-sm font-black text-white">
                        ธนาคารไทยพาณิชย์ (Siam Commercial Bank)
                      </h4>
                      <p className="text-[11px] font-bold text-purple-200">
                        ชื่อบัญชี: English & STEM Academy (บัญชีรับชำระเงินทางการศึกษา)
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/20 text-right">
                    <span className="text-[10px] text-purple-200 block">ยอดที่ต้องโอน:</span>
                    <span className="text-lg sm:text-xl font-black text-amber-300">
                      ฿{selectedTopupPkg.priceThb}.00
                    </span>
                  </div>
                </div>

                {/* Account & QR Code Grid */}
                <div className="flex flex-col sm:flex-row items-center gap-4">
                  {/* Left: Account Number & Deep Link Buttons */}
                  <div className="flex-1 space-y-3 w-full">
                    <div>
                      <span className="text-[11px] text-purple-200 font-bold block mb-0.5">
                        เลขที่บัญชีสำหรับโอนเงิน:
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl sm:text-3xl font-black font-mono tracking-widest text-amber-300 drop-shadow">
                          415-043181-2
                        </span>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {/* Copy Account Button */}
                      <button
                        type="button"
                        onClick={() => {
                          navigator.clipboard.writeText('4150431812');
                          setCopiedAccount(true);
                          setTimeout(() => setCopiedAccount(false), 2500);
                        }}
                        className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-sm ${
                          copiedAccount
                            ? 'bg-emerald-500 text-white'
                            : 'bg-white text-[#4E2A84] hover:bg-purple-50'
                        }`}
                      >
                        {copiedAccount ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                        <span>{copiedAccount ? 'คัดลอก 4150431812 แล้ว! ✓' : 'คัดลอกเลขบัญชี'}</span>
                      </button>

                      {/* Deep Link to SCB EASY App */}
                      <a
                        href="scbeasy://"
                        onClick={() => {
                          setTimeout(() => {
                            window.open('https://www.scbeasy.com/', '_blank');
                          }, 1200);
                        }}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-amber-400 text-amber-950 hover:bg-amber-300 text-xs font-black shadow-md transition-all active:scale-95"
                        title="เปิดแอปพลิเคชัน SCB EASY บนมือถือ/แท็บเล็ตทันที"
                      >
                        <Smartphone className="h-3.5 w-3.5" />
                        <span>เปิดแอป SCB EASY ➔</span>
                      </a>

                      {/* Web Link */}
                      <a
                        href="https://www.scbeasy.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-black transition-all active:scale-95"
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        <span>เว็บ SCB Net</span>
                      </a>
                    </div>
                  </div>

                  {/* Right: Thai QR Payment Visual Card */}
                  <div className="shrink-0 flex flex-col items-center bg-white p-2.5 rounded-2xl shadow-md border-2 border-purple-300 text-slate-800 w-36">
                    <div className="flex items-center justify-center gap-1 mb-1 text-[9px] font-black uppercase text-[#4E2A84]">
                      <QrCode className="h-3 w-3" />
                      <span>THAI QR PAYMENT</span>
                    </div>
                    {/* Visual QR Matrix */}
                    <div className="w-24 h-24 bg-slate-900 rounded-lg p-1.5 flex items-center justify-center relative overflow-hidden">
                      <div className="absolute inset-1.5 border border-white/20 rounded grid grid-cols-4 grid-rows-4 gap-1 p-0.5">
                        <div className="bg-white rounded-xs col-span-2 row-span-2"></div>
                        <div className="bg-white/60 rounded-xs"></div>
                        <div className="bg-white/90 rounded-xs"></div>
                        <div className="bg-[#4E2A84] rounded-xs col-span-2 row-span-2 flex items-center justify-center">
                          <span className="text-[6px] text-white font-black">SCB</span>
                        </div>
                        <div className="bg-white rounded-xs col-span-2 row-span-2"></div>
                      </div>
                    </div>
                    <span className="mt-1 text-xs font-black text-slate-900">
                      ฿{selectedTopupPkg.priceThb}.00
                    </span>
                    <span className="text-[8px] font-bold text-slate-400">
                      SCB 415-043181-2
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. Confirm Payment Action Button */}
            {selectedTopupPkg && (
              <div className="pt-1 space-y-2">
                <button
                  type="button"
                  onClick={() => handleTopup(selectedTopupPkg)}
                  disabled={toppingUpId === selectedTopupPkg.id}
                  className="w-full py-3.5 btn-duo-green text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
                >
                  {toppingUpId === selectedTopupPkg.id ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  ) : (
                    <>
                      <span>⚡</span>
                      <span>
                        ยืนยันการโอนเงิน ฿{selectedTopupPkg.priceThb} & รับ +{selectedTopupPkg.coins.toLocaleString()} 🪙 ทันที
                      </span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-center font-bold text-slate-400 dark:text-slate-500">
                  ℹ️ โอนเงินผ่านแอป SCB EASY เข้าบัญชี 415-043181-2 แล้วกดปุ่มยืนยันด้านบนเพื่อรับเหรียญและสิทธิ์ VIP อัตโนมัติ
                </p>
              </div>
            )}

            <div className="rounded-xl bg-slate-50 p-2.5 text-[11px] text-slate-500 dark:bg-slate-800/50 dark:text-slate-400 text-center font-bold">
              ℹ️ บัญชีธนาคารไทยพาณิชย์ 415-043181-2 เชื่อมโยงระบบชำระเงินเพื่อการศึกษา STEM Academy สามารถกดยืนยันเพื่อรับเหรียญทองและสิทธิ์ VIP เข้าสู่บัญชีผู้เรียนได้ทันที
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

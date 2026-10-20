import React, { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import confetti from 'canvas-confetti';
import {
  X,
  Copy,
  CheckCheck,
  Smartphone,
  ExternalLink,
  QrCode,
  Building2,
  Check,
} from 'lucide-react';

interface TopupPackage {
  id: string;
  nameTh: string;
  nameEn?: string;
  coins: number;
  priceThb: number;
  bonusGems: number;
  vip: boolean;
  vipDays: number;
  icon: string;
  badge?: string;
}

interface TopupModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export const TopupModal: React.FC<TopupModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const { refreshUser } = useAuth();
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [packages, setPackages] = useState<TopupPackage[]>([]);
  const [selectedPkg, setSelectedPkg] = useState<TopupPackage | null>(null);
  const [copiedAccount, setCopiedAccount] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const defaultPackages: TopupPackage[] = [
    {
      id: 'COIN_STARTER',
      nameTh: 'ถุงเหรียญเริ่มต้น',
      nameEn: 'Starter Coin Pouch',
      coins: 500,
      priceThb: 99,
      bonusGems: 100,
      vip: false,
      vipDays: 0,
      icon: '🪙',
      badge: isEn ? 'Starter' : 'เริ่มต้น',
    },
    {
      id: 'COIN_WARRIOR',
      nameTh: 'หีบขุนพลมังกรเพลิง',
      nameEn: 'Dragon Warrior Chest',
      coins: 1200,
      priceThb: 199,
      bonusGems: 300,
      vip: true,
      vipDays: 30,
      icon: '🔥',
      badge: isEn ? 'Best Value • Free VIP' : 'ยอดนิยม • ฟรี VIP',
    },
    {
      id: 'COIN_LEGEND',
      nameTh: 'คลังราชันมังกรจักรพรรดิ',
      nameEn: 'Emperor Dragon Hoard',
      coins: 2500,
      priceThb: 399,
      bonusGems: 800,
      vip: true,
      vipDays: 365,
      icon: '👑',
      badge: isEn ? 'Super VIP • 1 Year' : 'ซูเปอร์ VIP • 1 ปี',
    },
    {
      id: 'COIN_SUPREME',
      nameTh: 'มหาคลังเทวะสุริยันต์',
      nameEn: 'Ultimate Supreme Vault',
      coins: 6000,
      priceThb: 799,
      bonusGems: 2500,
      vip: true,
      vipDays: 999,
      icon: '🐉',
      badge: isEn ? 'Lifetime VIP' : 'VIP ตลอดชีพ',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      loadPackages();
      setSuccessMessage(null);
    }
  }, [isOpen]);

  const loadPackages = async () => {
    try {
      const res = await api.wardrobe.getWardrobe();
      const loaded = res?.topupPackages?.length ? res.topupPackages : defaultPackages;
      setPackages(loaded);
      const warrior = loaded.find((p: any) => p.id === 'COIN_WARRIOR') || loaded[0];
      setSelectedPkg(warrior);
    } catch {
      setPackages(defaultPackages);
      setSelectedPkg(defaultPackages[1]);
    }
  };

  const handleCopyAccount = () => {
    try {
      navigator.clipboard.writeText('4150431812');
      setCopiedAccount(true);
      setTimeout(() => setCopiedAccount(false), 2500);
    } catch {}
  };

  const handleConfirmTopup = async () => {
    if (!selectedPkg) return;
    setProcessing(true);
    try {
      const res = await api.wardrobe.topup(selectedPkg.id, {
        paymentMethod: 'SCB_DIRECT_EASY',
        transferRef: `SCB-4150431812-${Date.now()}`,
      });
      confetti({ particleCount: 90, spread: 80 });
      setSuccessMessage(res?.message || (isEn ? 'Top-up successful!' : 'เติมเงินเข้าสู่ระบบสำเร็จ!'));
      if (refreshUser) await refreshUser();
      if (onSuccess) onSuccess();
      setTimeout(() => {
        onClose();
        setSuccessMessage(null);
      }, 1800);
    } catch (e: any) {
      console.error('Failed to topup', e);
    } finally {
      setProcessing(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 p-3 sm:p-4 backdrop-blur-md animate-in fade-in select-none"
    >
      <div className="w-full max-w-2xl max-h-[92vh] overflow-y-auto rounded-3xl border-2 border-purple-500/60 bg-white p-4 sm:p-6 shadow-2xl dark:bg-slate-900 dark:border-purple-600 space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-3 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-[#4E2A84] to-[#7B2CBF] text-white text-xl shadow-md">
              🪙
            </span>
            <div>
              <h3 className="text-base sm:text-lg font-black text-slate-900 dark:text-white flex items-center gap-2">
                <span>{isEn ? 'Top Up Dragon Coins & VIP' : 'เติมเหรียญทองมังกร & ยศ VIP'}</span>
                <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-full bg-[#4E2A84] text-white shadow-sm">
                  SCB EASY
                </span>
              </h3>
              <p className="text-xs font-bold text-purple-700 dark:text-purple-300">
                {isEn
                  ? 'Siam Commercial Bank • Account 415-043181-2'
                  : 'ธนาคารไทยพาณิชย์ บัญชี 415-043181-2 • รับเหรียญและสิทธิ์ VIP ทันที'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-600 dark:hover:bg-slate-800 dark:text-slate-400 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Success Alert Banner if just completed */}
        {successMessage && (
          <div className="rounded-2xl bg-emerald-50 border-2 border-emerald-400 p-3.5 text-center text-xs font-black text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-200 animate-in zoom-in-95">
            🎉 {successMessage}
          </div>
        )}

        {/* 1. Package Selector (4 Equal Clean Tiles) */}
        <div>
          <label className="text-[11px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-wide mb-2 block">
            {isEn ? 'Select Coin Package (Click to select):' : 'เลือกแพ็กเกจเหรียญทอง (คลิกเพื่อเลือก):'}
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {(packages.length ? packages : defaultPackages).map((pkg) => {
              const isSelected = selectedPkg?.id === pkg.id;
              return (
                <button
                  key={pkg.id}
                  type="button"
                  onClick={() => setSelectedPkg(pkg)}
                  className={`relative flex flex-col justify-between p-3 rounded-2xl border-2 text-left transition-all active:scale-95 ${
                    isSelected
                      ? 'border-purple-600 bg-purple-50/90 dark:bg-purple-950/60 dark:border-purple-500 shadow-md ring-2 ring-purple-500'
                      : 'border-slate-200 bg-white hover:border-purple-300 dark:border-slate-800 dark:bg-slate-900/90'
                  }`}
                >
                  {/* Top Badge */}
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

                  {/* Coin info */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-1">
                      <span className="text-xl">{pkg.icon}</span>
                      <span className="text-sm font-black text-slate-900 dark:text-white">
                        +{pkg.coins.toLocaleString()}
                      </span>
                      <span className="text-xs">🪙</span>
                    </div>
                    <p className="text-[11px] font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">
                      +{pkg.bonusGems} 💎 {isEn ? 'Bonus' : 'โบนัส'}
                    </p>
                    {pkg.vip ? (
                      <p className="text-[10px] font-black text-amber-700 dark:text-amber-300 whitespace-nowrap">
                        {isEn ? `VIP ${pkg.vipDays} Days` : `VIP ${pkg.vipDays} วัน`}
                      </p>
                    ) : (
                      <p className="text-[10px] font-bold text-slate-400 whitespace-nowrap">
                        {isEn ? 'Wardrobe Shop' : 'ชุดแฟชั่นช็อป'}
                      </p>
                    )}
                  </div>

                  {/* Price */}
                  <div className="mt-2 pt-2 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      ฿{pkg.priceThb}
                    </span>
                    <span className={`text-[10px] font-extrabold ${isSelected ? 'text-purple-600 dark:text-purple-300' : 'text-slate-400'}`}>
                      {isSelected ? (isEn ? 'Active' : 'เลือกอยู่') : (isEn ? 'Select' : 'เลือก')}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2. SCB Bank Payment Details Card */}
        {selectedPkg && (
          <div className="rounded-3xl bg-gradient-to-br from-[#3B1E68] via-[#4E2A84] to-[#6C2EB9] p-4 sm:p-5 text-white shadow-xl border-2 border-purple-400/40 space-y-3.5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-white/15 pb-3">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 px-2.5 items-center justify-center rounded-xl bg-white/20 font-black text-xs uppercase tracking-wide backdrop-blur-sm">
                  SCB EASY
                </div>
                <div>
                  <h4 className="text-sm font-black text-white">
                    {isEn ? 'Siam Commercial Bank (SCB)' : 'ธนาคารไทยพาณิชย์ (Siam Commercial Bank)'}
                  </h4>
                  <p className="text-[11px] font-bold text-purple-200">
                    {isEn ? 'Account: English & STEM Academy' : 'ชื่อบัญชี: English & STEM Academy (บัญชีรับชำระเงินทางการศึกษา)'}
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-white/10 px-3 py-1.5 backdrop-blur-sm border border-white/20 text-right">
                <span className="text-[10px] text-purple-200 block">{isEn ? 'Amount to pay:' : 'ยอดที่ต้องโอน:'}</span>
                <span className="text-lg sm:text-xl font-black text-amber-300">
                  ฿{selectedPkg.priceThb}.00
                </span>
              </div>
            </div>

            {/* Account & QR Code Grid */}
            <div className="flex flex-col sm:flex-row items-center gap-4">
              {/* Account Number & Direct Action Links */}
              <div className="flex-1 space-y-3 w-full">
                <div>
                  <span className="text-[11px] text-purple-200 font-bold block mb-0.5">
                    {isEn ? 'Bank Account Number:' : 'เลขที่บัญชีสำหรับโอนเงิน:'}
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
                    onClick={handleCopyAccount}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-black transition-all active:scale-95 shadow-sm ${
                      copiedAccount
                        ? 'bg-emerald-500 text-white'
                        : 'bg-white text-[#4E2A84] hover:bg-purple-50'
                    }`}
                  >
                    {copiedAccount ? <CheckCheck className="h-3.5 w-3.5" /> : <Copy className="h-3.5 w-3.5" />}
                    <span>{copiedAccount ? (isEn ? 'Copied 4150431812!' : 'คัดลอก 4150431812 แล้ว! ✓') : (isEn ? 'Copy Account Number' : 'คัดลอกเลขบัญชี')}</span>
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
                    title={isEn ? 'Open SCB EASY app on mobile' : 'เปิดแอปพลิเคชัน SCB EASY บนมือถือ/แท็บเล็ตทันที'}
                  >
                    <Smartphone className="h-3.5 w-3.5" />
                    <span>{isEn ? 'Open SCB EASY ➔' : 'เปิดแอป SCB EASY ➔'}</span>
                  </a>

                  {/* Web Link */}
                  <a
                    href="https://www.scbeasy.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-black transition-all active:scale-95"
                  >
                    <ExternalLink className="h-3.5 w-3.5" />
                    <span>{isEn ? 'SCB Net' : 'เว็บ SCB Net'}</span>
                  </a>
                </div>
              </div>

              {/* Thai QR Payment Visual Box */}
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
                  ฿{selectedPkg.priceThb}.00
                </span>
                <span className="text-[8px] font-bold text-slate-400">
                  SCB 415-043181-2
                </span>
              </div>
            </div>
          </div>
        )}

        {/* 3. Confirm Payment Action Button */}
        {selectedPkg && (
          <div className="pt-1 space-y-2">
            <button
              type="button"
              onClick={handleConfirmTopup}
              disabled={processing}
              className="w-full py-3.5 btn-duo-green text-sm sm:text-base font-black flex items-center justify-center gap-2 shadow-lg active:scale-95 transition-all"
            >
              {processing ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <span>⚡</span>
                  <span>
                    {isEn
                      ? `Confirm Transfer ฿${selectedPkg.priceThb} & Claim +${selectedPkg.coins.toLocaleString()} Coins`
                      : `ยืนยันการโอนเงิน ฿${selectedPkg.priceThb} & รับ +${selectedPkg.coins.toLocaleString()} 🪙 ทันที`}
                  </span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center font-bold text-slate-400 dark:text-slate-500">
              {isEn
                ? 'ℹ️ Transfer via SCB EASY to 415-043181-2 and click confirm above to credit coins & VIP automatically.'
                : 'ℹ️ โอนเงินผ่านแอป SCB EASY เข้าบัญชี 415-043181-2 แล้วกดปุ่มยืนยันด้านบนเพื่อรับเหรียญและสิทธิ์ VIP อัตโนมัติ'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

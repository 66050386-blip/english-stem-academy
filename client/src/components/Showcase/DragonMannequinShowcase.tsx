import React, { useState, useEffect } from 'react';
import { DuoMascot } from '../Mascot/DuoMascot';
import { playSlashSound } from '../../utils/audio';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, Crown, Zap, Shield, ChevronRight, Swords } from 'lucide-react';

interface DragonMannequinShowcaseProps {
  onNavigateWardrobe?: () => void;
}

export const DragonMannequinShowcase: React.FC<DragonMannequinShowcaseProps> = ({
  onNavigateWardrobe,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  const [currentMove, setCurrentMove] = useState<1 | 2 | 3>(1);
  const [isSlashing, setIsSlashing] = useState<boolean>(false);
  const [autoPlay, setAutoPlay] = useState<boolean>(true);

  const moveTitles = {
    1: {
      nameTh: 'ท่าที่ 1: เพลิงผ่าปฐพี (Diagonal Cleave)',
      nameEn: 'Skill 1: Flame Cleave',
      descTh: 'ฟันดาบทแยงผ่าอากาศด้วยคลื่นเพลิงสุริยัน',
      descEn: 'Diagonal downward strike with solar flame wave',
      icon: '⚔️',
      color: 'from-amber-500 to-orange-500',
    },
    2: {
      nameTh: 'ท่าที่ 2: มังกรตวัดนภา (Crescent Ascent)',
      nameEn: 'Skill 2: Crescent Ascent',
      descTh: 'ตวัดดาบขึ้นบนเป็นวงจันทร์เสี้ยวเพลิงพุ่งทะยาน',
      descEn: 'Rising crescent slash surging skyward',
      icon: '🌙',
      color: 'from-orange-500 to-rose-500',
    },
    3: {
      nameTh: 'ท่าที่ 3: มหาเทวะทะลวงศูนย์ (Cross Dragon Thrust)',
      nameEn: 'Skill 3: Cross Dragon Thrust',
      descTh: 'แทงทะลวงตัดกากบาท ระเบิดคลื่นเพลิงมังกรคู่',
      descEn: 'Explosive dual-cross slash & radial dragon burst',
      icon: '💥',
      color: 'from-red-600 to-amber-500',
    },
  };

  // Automated Slashing Cycle: Trigger every 3.2 seconds with non-repeating moves (1 -> 2 -> 3 -> 1...)
  useEffect(() => {
    if (!autoPlay) return;

    const timer = setInterval(() => {
      setCurrentMove((prev) => (prev === 1 ? 2 : prev === 2 ? 3 : 1));
      setIsSlashing(true);
      setTimeout(() => {
        setIsSlashing(false);
      }, 650);
    }, 3200);

    return () => clearInterval(timer);
  }, [autoPlay]);

  const handleManualSlash = (move: 1 | 2 | 3) => {
    setCurrentMove(move);
    setIsSlashing(true);
    playSlashSound();
    setTimeout(() => {
      setIsSlashing(false);
    }, 650);
  };

  const handleOpenTopup = () => {
    window.dispatchEvent(new CustomEvent('open-topup-modal'));
  };

  const activeMoveInfo = moveTitles[currentMove];

  return (
    <div className="rounded-3xl border-2 border-b-6 border-amber-400/80 bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-950 p-5 text-white shadow-xl space-y-4 overflow-hidden relative select-none">
      {/* Background ambient fiery glow */}
      <div className="absolute -top-12 -right-12 h-44 w-44 rounded-full bg-amber-500/15 blur-2xl pointer-events-none" />
      <div className="absolute -bottom-12 -left-12 h-44 w-44 rounded-full bg-rose-500/15 blur-2xl pointer-events-none" />

      {/* Top Header Badge */}
      <div className="flex items-center justify-between border-b border-white/10 pb-3">
        <div className="flex items-center gap-2">
          <span className="flex h-7 px-2.5 items-center justify-center rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-[10px] uppercase tracking-wide shadow-sm">
            ✨ {isEn ? 'Legendary Showcase' : 'หุ่นจำลองเซ็ตในตำนาน'}
          </span>
          <span className="text-[10px] font-black text-amber-300 uppercase tracking-wider">
            FIRE DRAGON SET
          </span>
        </div>

        <span className="rounded-full bg-amber-400/20 border border-amber-400/40 px-2 py-0.5 text-[9px] font-black text-amber-300">
          👑 VIP
        </span>
      </div>

      {/* Title & Promotion explanation */}
      <div>
        <h3 className="text-base font-black text-white flex items-center gap-2 leading-tight">
          <span>{isEn ? 'Fire Dragon Warrior Full Set' : 'เซ็ตนักรบมังกรเพลิงครบชุด'}</span>
          <span>🔥</span>
        </h3>
        <p className="text-xs font-bold text-amber-200/90 mt-1">
          {isEn
            ? 'Top up to instantly unlock this legendary gear set + VIP Dragon Knight rank!'
            : 'เติมเงินจะได้รับเซ็ตในตำนานนี้ทันที + ได้รับยศ VIP Dragon Knight 👑'}
        </p>
      </div>

      {/* 3D-styled Pedestal with Animated Mascot Mannequin */}
      <div className="relative flex flex-col items-center justify-center py-2">
        {/* Glow Pedestal Ring */}
        <div className="absolute bottom-2 w-48 h-12 rounded-[100%] bg-gradient-to-r from-amber-500/20 via-orange-500/40 to-amber-500/20 border-2 border-amber-400/40 blur-xs shadow-lg shadow-orange-500/30" />

        {/* Mascot Mannequin wearing the complete Dragon Set */}
        <div
          onClick={() => handleManualSlash(currentMove === 1 ? 2 : currentMove === 2 ? 3 : 1)}
          className="relative z-10 cursor-pointer transform hover:scale-105 active:scale-95 transition-transform"
          title={isEn ? 'Click to trigger next slash technique!' : 'คลิกหุ่นเพื่อตวัดดาบฟันทันที! ⚔️'}
        >
          <DuoMascot
            mood="cheering"
            stance="ready"
            headgear="DRAGON_HELM"
            outfit="DRAGON_ARMOR"
            weapon="DRAGON_BLADE"
            shoes="DRAGON_BOOTS"
            isSlashing={isSlashing}
            slashMove={currentMove}
            interactiveSlash={false}
            size={165}
          />
        </div>

        {/* Active Technique Name Banner with Dynamic Color Transition */}
        <div className="mt-1 z-20 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-900/90 border border-amber-400/60 backdrop-blur-md shadow-md animate-in fade-in">
          <span className="text-xs">{activeMoveInfo.icon}</span>
          <span className="text-[11px] font-black text-amber-300">
            {isEn ? activeMoveInfo.nameEn : activeMoveInfo.nameTh}
          </span>
        </div>
        <p className="text-[9px] font-bold text-slate-400 mt-1 text-center">
          {isEn ? activeMoveInfo.descEn : activeMoveInfo.descTh}
        </p>
      </div>

      {/* Move Selector Buttons (3 Non-Repeating Slash Moves) */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[10px] font-black uppercase text-slate-400">
          <span>{isEn ? '3 Unique Slash Stances:' : '3 ท่าฟันดาบเฉพาะตัว:'}</span>
          <span className="text-amber-400 text-[9px] font-bold">
            {isEn ? 'Auto-plays every 3s' : 'หมุนเวียนอัตโนมัติทุก 3 วิ'}
          </span>
        </div>

        <div className="grid grid-cols-3 gap-1.5">
          {([1, 2, 3] as const).map((m) => {
            const isSelected = currentMove === m;
            return (
              <button
                key={m}
                type="button"
                onClick={() => handleManualSlash(m)}
                className={`py-1.5 px-2 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1 active:scale-95 cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-amber-400 to-orange-500 text-amber-950 font-black shadow-md ring-2 ring-amber-400'
                    : 'bg-white/10 hover:bg-white/20 text-slate-300 border border-white/10'
                }`}
              >
                <span>{moveTitles[m].icon}</span>
                <span>{isEn ? `Skill ${m}` : `ท่าที่ ${m}`}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Set Pieces Included Checklist */}
      <div className="rounded-2xl bg-white/5 border border-white/10 p-2.5 grid grid-cols-2 gap-2 text-[10px] font-bold text-amber-100">
        <span className="flex items-center gap-1.5">
          <span>🪖</span>
          <span>{isEn ? 'Dragon Helm' : 'หมวกมังกรเพลิง'}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span>🦺</span>
          <span>{isEn ? 'Dragon Armor' : 'เกราะมังกรเพลิง'}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span>⚔️</span>
          <span>{isEn ? 'Dragon Katana' : 'ดาบคาตานะมังกร'}</span>
        </span>
        <span className="flex items-center gap-1.5">
          <span>👟</span>
          <span>{isEn ? 'Dragon Boots' : 'รองเท้าบูทมังกร'}</span>
        </span>
      </div>

      {/* Action Buttons: Top Up via SCB / Try On in Wardrobe */}
      <div className="space-y-2 pt-1">
        <button
          type="button"
          onClick={handleOpenTopup}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-amber-400 via-amber-300 to-yellow-400 hover:from-amber-300 hover:to-yellow-300 text-amber-950 font-black text-xs shadow-lg shadow-amber-500/25 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>⚡</span>
          <span>{isEn ? 'Top Up to Get This Set (SCB Bank)' : 'เติมเงินเพื่อรับเซ็ตนี้ (ไทยพาณิชย์)'}</span>
        </button>

        {onNavigateWardrobe && (
          <button
            type="button"
            onClick={onNavigateWardrobe}
            className="w-full py-2 rounded-xl bg-white/10 hover:bg-white/15 text-slate-200 font-extrabold text-[11px] transition-all active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span>👗</span>
            <span>{isEn ? 'Try On in Wardrobe' : 'ลองสวมใส่ในห้องแต่งตัว'}</span>
          </button>
        )}
      </div>
    </div>
  );
};

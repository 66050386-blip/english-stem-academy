import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { playSlashSound } from '../../utils/audio';

export type MascotMood =
  | 'happy'
  | 'cheering'
  | 'thinking'
  | 'proud'
  | 'sad'
  | 'teaching'
  | 'sleeping';

export type MascotStance = 'ready' | 'attack' | 'slash' | 'guard' | 'victory' | 'chill';

export type HeadgearId = 'NONE' | 'SAFETY_HELMET' | 'TECH_HEADSET' | 'CYBER_VISOR' | 'GOLD_CROWN' | 'DRAGON_HELM';
export type OutfitId = 'DEFAULT' | 'SAFETY_VEST' | 'SAMURAI_ROBE' | 'LAB_COAT' | 'CYBER_ARMOR' | 'DRAGON_ARMOR';
export type WeaponId = 'STEEL_KATANA' | 'TITANIUM_WRENCH' | 'PLASMA_BLADE' | 'FIBER_WAND' | 'GOLD_RAPIER' | 'DRAGON_BLADE';
export type ShoesId = 'SNEAKERS' | 'SAFETY_BOOTS' | 'CYBER_HOVER' | 'DRAGON_BOOTS';

export interface DuoMascotProps {
  mood?: MascotMood;
  stance?: MascotStance;
  className?: string;
  size?: number;
  headgear?: HeadgearId;
  outfit?: OutfitId;
  weapon?: WeaponId;
  shoes?: ShoesId;
  isSlashing?: boolean;
  slashMove?: 1 | 2 | 3;
  interactiveSlash?: boolean;
  onSlash?: () => void;
}

/**
 * Lobster Warrior Mascot (น้องกุ้งนักดาบ สุดเท่)
 * - Always-Open Heroic Anime Eyes (Never closed / sleeping!)
 * - Perfect fitted sneakers & boots tailored to foot joints
 * - Cleaned-up organic tail fan (No vertical stick)
 * - Dynamic Stance System & Interactive Sword Slashing
 */
export const DuoMascot: React.FC<DuoMascotProps> = ({
  mood = 'happy',
  stance = 'ready',
  className = '',
  size = 120,
  headgear,
  outfit,
  weapon,
  shoes,
  isSlashing = false,
  slashMove = 1,
  interactiveSlash = true,
  onSlash,
}) => {
  const [internalSlashing, setInternalSlashing] = useState(false);

  // Automatically read user's equipped gear from AuthContext if not explicitly overridden by props
  let userEquipped: any = null;
  try {
    const auth = useAuth();
    userEquipped = auth?.user?.profile;
  } catch {}

  const activeHead: HeadgearId = (headgear || userEquipped?.equippedHead || 'NONE') as HeadgearId;
  const activeOutfit: OutfitId = (outfit || userEquipped?.equippedArmor || 'DEFAULT') as OutfitId;
  const activeWeapon: WeaponId = (weapon || userEquipped?.equippedWeapon || 'STEEL_KATANA') as WeaponId;
  const activeShoes: ShoesId = (shoes || userEquipped?.equippedShoes || 'SNEAKERS') as ShoesId;

  const slashingActive = isSlashing || internalSlashing;

  const handleClick = () => {
    if (interactiveSlash && !slashingActive) {
      playSlashSound();
      setInternalSlashing(true);
      if (onSlash) onSlash();
      setTimeout(() => {
        setInternalSlashing(false);
      }, 650);
    }
  };

  // Dynamic Martial Stance & Arm Coordinates (เจาะลึกท่าทางตามวิถี Effect แม่นยำระดับพิกัด)
  let armMotionTransform = 'rotate(8deg)';
  let armAnimationClass = '';
  let bodyAnimationClass = '';
  let waveAnimationClass = '';

  if (slashingActive) {
    if (slashMove === 2) {
      armAnimationClass = 'animate-sword-slash-2';
      bodyAnimationClass = 'animate-body-slash-2';
      waveAnimationClass = 'animate-wave-slash-2';
    } else if (slashMove === 3) {
      armAnimationClass = 'animate-sword-slash-3';
      bodyAnimationClass = 'animate-body-slash-3';
      waveAnimationClass = 'animate-wave-slash-3';
    } else {
      armAnimationClass = 'animate-sword-slash-1';
      bodyAnimationClass = 'animate-body-slash-1';
      waveAnimationClass = 'animate-wave-slash-1';
    }
  } else {
    // When idle: mascot adopts the authentic ready martial stance for that skill!
    if (slashMove === 1) {
      // Skill 1: Flame Cleave High Diagonal Ready Guard (ดาบเฉียงขวาบนพร้อมสับลง)
      armMotionTransform = 'rotate(24deg) translate(2px, -4px)';
    } else if (slashMove === 2) {
      // Skill 2: Crescent Ascent Low Coiled Guard (ดาบเฉียงล่างซ้ายพร้อมเสยขึ้น)
      armMotionTransform = 'rotate(72deg) translate(-4px, 10px)';
    } else if (slashMove === 3) {
      // Skill 3: Cross Dragon Thrust Forward Guard (ดาบเล็งตรงพร้อมพุ่งแทง)
      armMotionTransform = 'rotate(-15deg) translate(-8px, -2px)';
    } else if (stance === 'attack' || stance === 'slash') {
      armMotionTransform = 'rotate(-35deg) translate(-4px, 0px)';
    } else if (stance === 'guard') {
      armMotionTransform = 'rotate(45deg) translate(4px, 4px)';
    } else if (stance === 'victory') {
      armMotionTransform = 'rotate(-12deg) translate(4px, -8px)';
    } else if (mood === 'cheering') {
      armMotionTransform = 'rotate(12deg) translate(4px, -6px)';
    } else {
      armMotionTransform = 'rotate(8deg)';
    }
  }


  return (
    <div
      style={{ width: size, height: size }}
      onClick={handleClick}
      className={`relative inline-flex items-center justify-center select-none ${
        interactiveSlash ? 'cursor-pointer active:scale-95 transition-transform' : ''
      } ${className}`}
      title={interactiveSlash ? 'คลิกเพื่อฟันดาบ! ⚔️' : `น้องกุ้งนักดาบ (${stance})`}
    >
      <svg
        viewBox="0 0 220 220"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`h-full w-full drop-shadow-md ${slashingActive ? 'animate-pulse' : ''}`}
      >
        <defs>
          {/* Lobster Red Gradient */}
          <linearGradient id="lobsterRed" x1="100" y1="20" x2="100" y2="180" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#B91C1C" />
          </linearGradient>

          {/* Belly Orange Gradient */}
          <linearGradient id="lobsterBelly" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDBA74" />
            <stop offset="50%" stopColor="#FB923C" />
            <stop offset="100%" stopColor="#EA580C" />
          </linearGradient>

          {/* Steel Sword Blade Gradient */}
          <linearGradient id="swordBlade" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="40%" stopColor="#E2E8F0" />
            <stop offset="80%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#64748B" />
          </linearGradient>

          {/* Golden Sword Guard Gradient */}
          <linearGradient id="swordGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="50%" stopColor="#F59E0B" />
            <stop offset="100%" stopColor="#B45309" />
          </linearGradient>

          {/* Blue Sneaker Gradient */}
          <linearGradient id="sneakerBlue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          {/* Plasma Laser Gradient */}
          <linearGradient id="plasmaGlow" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="50%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#06B6D4" />
          </linearGradient>

          {/* Crescent Energy Slash Wave Gradient */}
          <linearGradient id="slashWaveGrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FDE047" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
          </linearGradient>

          {/* Dragon Flame Burst Gradient */}
          <radialGradient id="dragonFlame" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="30%" stopColor="#FBBF24" />
            <stop offset="70%" stopColor="#F97316" />
            <stop offset="100%" stopColor="#DC2626" />
          </radialGradient>

          {/* Dragon Ancient Gold Gradient */}
          <linearGradient id="dragonGold" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="45%" stopColor="#F59E0B" />
            <stop offset="80%" stopColor="#B45309" />
            <stop offset="100%" stopColor="#78350F" />
          </linearGradient>

          {/* Dragon Scale Armor Gradient */}
          <linearGradient id="dragonScaleArmor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#DC2626" />
            <stop offset="50%" stopColor="#991B1B" />
            <stop offset="100%" stopColor="#450A0A" />
          </linearGradient>

          {/* Dragon Blazing Slash Arc Gradient */}
          <linearGradient id="dragonSlashGrad" x1="1" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FFEDD5" stopOpacity="0.95" />
            <stop offset="25%" stopColor="#FDE047" stopOpacity="0.9" />
            <stop offset="60%" stopColor="#EA580C" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#DC2626" stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* 1. Ground Shadow */}
        <ellipse cx="110" cy="202" rx="46" ry="7" fill="#000000" opacity="0.25" />

        {/* 2. Symmetrical Twin Antennae (กุ้งมังกร 2 หนวดคู่สง่างามแท้จริง ซ้าย-ขวา เท่ากันเป๊ะ) */}
        <g id="lobster-antennae">
          {/* Left Antenna */}
          <path
            d="M98 52 C78 22 48 18 38 32 C34 40 42 46 46 42"
            stroke="#1E293B"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M98 52 C78 22 48 18 38 32 C34 40 42 46 46 42"
            stroke="#DC2626"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="43" cy="38" r="2.5" fill="#FACC15" />

          {/* Right Antenna (Strict mathematical reflection across x=110) */}
          <path
            d="M122 52 C142 22 172 18 182 32 C186 40 178 46 174 42"
            stroke="#1E293B"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M122 52 C142 22 172 18 182 32 C186 40 178 46 174 42"
            stroke="#DC2626"
            strokeWidth="3.5"
            strokeLinecap="round"
            fill="none"
          />
          <circle cx="177" cy="38" r="2.5" fill="#FACC15" />
        </g>

        {/* 3. Tail Fan and Legs - Cleaned Up Organic Fan (No Vertical Stick!) */}
        <g id="lobster-tail-and-legs">
          {/* Tail Fan - 3 natural overlapping flukes */}
          <path
            d="M96 156 C88 168 78 176 74 180 C84 178 96 172 100 160 Z"
            fill="url(#lobsterRed)"
            stroke="#1E293B"
            strokeWidth="2"
          />
          <path
            d="M104 158 C104 170 106 178 110 182 C114 178 116 170 116 158 Z"
            fill="url(#lobsterRed)"
            stroke="#1E293B"
            strokeWidth="2"
          />
          <path
            d="M124 156 C132 168 142 176 146 180 C136 178 124 172 120 160 Z"
            fill="url(#lobsterRed)"
            stroke="#1E293B"
            strokeWidth="2"
          />

          {/* Legs connected gracefully to ankles */}
          <path d="M96 155 C90 166 84 174 80 182" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
          <path d="M96 155 C90 166 84 174 80 182" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />
          <path d="M124 155 C130 166 136 174 140 182" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
          <path d="M124 155 C130 166 136 174 140 182" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />

          {/* Footwear Customization (Proportioned, fitted onto the foot joints at (80, 182) and (140, 182)) */}
          {activeShoes === 'DRAGON_BOOTS' ? (
            /* Ancient Blazing Dragon Talon Boots */
            <g id="shoes-dragon-boots">
              {/* Left Dragon Boot */}
              <g transform="translate(62, 168)">
                <ellipse cx="18" cy="25" rx="14" ry="3.5" fill="url(#dragonFlame)" opacity="0.8" />
                <path d="M10 8 L24 8 L28 17 L8 17 Z" fill="#991B1B" stroke="#1E293B" strokeWidth="2" />
                <path d="M12 9 L22 9 L24 16 L10 16 Z" fill="#DC2626" />
                <polygon points="26,16 32,21 27,22" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1" />
                <polygon points="24,17 30,22 25,23" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1" />
                <polygon points="21,18 26,23 22,24" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1" />
                <path d="M6 19 C12 17 22 17 26 19 L25 23 L6 23 Z" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1.5" />
                <circle cx="17" cy="12" r="2.5" fill="#FDE047" />
              </g>
              {/* Right Dragon Boot */}
              <g transform="translate(124, 168)">
                <ellipse cx="18" cy="25" rx="14" ry="3.5" fill="url(#dragonFlame)" opacity="0.8" />
                <path d="M10 8 L24 8 L28 17 L8 17 Z" fill="#991B1B" stroke="#1E293B" strokeWidth="2" />
                <path d="M12 9 L22 9 L24 16 L10 16 Z" fill="#DC2626" />
                <polygon points="26,16 32,21 27,22" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1" />
                <polygon points="24,17 30,22 25,23" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1" />
                <polygon points="21,18 26,23 22,24" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1" />
                <path d="M6 19 C12 17 22 17 26 19 L25 23 L6 23 Z" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1.5" />
                <circle cx="17" cy="12" r="2.5" fill="#FDE047" />
              </g>
            </g>
          ) : activeShoes === 'SAFETY_BOOTS' ? (
            /* Heavy-Duty Industrial Safety Boots */
            <g id="shoes-safety-boots">
              {/* Left Boot */}
              <g transform="translate(64, 172)">
                <path d="M8 9 L22 10 L28 17 L8 17 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                <rect x="22" y="13" width="7" height="6" rx="1.5" fill="#94A3B8" stroke="#0F172A" strokeWidth="1" />
                <path d="M2 23 C8 24 26 24 30 22 L29 17 L5 17 Z" fill="#0F172A" stroke="#0F172A" strokeWidth="2" />
                <line x1="6" y1="18" x2="28" y2="18" stroke="#FACC15" strokeWidth="2" strokeDasharray="3 1.5" />
              </g>
              {/* Right Boot */}
              <g transform="translate(126, 172)">
                <path d="M8 10 L22 9 L28 17 L8 17 Z" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
                <rect x="22" y="13" width="7" height="6" rx="1.5" fill="#94A3B8" stroke="#0F172A" strokeWidth="1" />
                <path d="M2 22 C6 24 24 24 30 23 L29 17 L5 17 Z" fill="#0F172A" stroke="#0F172A" strokeWidth="2" />
                <line x1="6" y1="18" x2="28" y2="18" stroke="#FACC15" strokeWidth="2" strokeDasharray="3 1.5" />
              </g>
            </g>
          ) : activeShoes === 'CYBER_HOVER' ? (
            /* High-Tech Cyber Hover Boots with Glowing Thruster Rings */
            <g id="shoes-cyber-hover">
              {/* Left Boot */}
              <g transform="translate(65, 170)">
                <path d="M7 11 L20 11 L26 18 L7 18 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="1.5" />
                <rect x="7" y="18" width="20" height="4" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                <ellipse cx="17" cy="24" rx="11" ry="3" fill="#06B6D4" opacity="0.9" />
                <ellipse cx="17" cy="24" rx="6" ry="1.5" fill="#FFFFFF" />
              </g>
              {/* Right Boot */}
              <g transform="translate(127, 170)">
                <path d="M7 11 L20 11 L26 18 L7 18 Z" fill="#0284C7" stroke="#1E293B" strokeWidth="1.5" />
                <rect x="7" y="18" width="20" height="4" rx="2" fill="#38BDF8" stroke="#0284C7" strokeWidth="1" />
                <ellipse cx="17" cy="24" rx="11" ry="3" fill="#06B6D4" opacity="0.9" />
                <ellipse cx="17" cy="24" rx="6" ry="1.5" fill="#FFFFFF" />
              </g>
            </g>
          ) : (
            /* Proportioned Sport Sneakers (Fitted seamlessly to legs!) */
            <g id="shoes-sneakers">
              {/* Left Sneaker (Ankle collar centered at x=80, y=182) */}
              <g transform="translate(65, 172)">
                <path
                  d="M11 9 C14 8 20 9 22 13 L27 18 L7 18 C6 15 8 10 11 9 Z"
                  fill="url(#sneakerBlue)"
                  stroke="#1E293B"
                  strokeWidth="2"
                />
                <path
                  d="M21 14 C25 15 27 16 27 18 L21 18 Z"
                  fill="#FFFFFF"
                  stroke="#1E293B"
                  strokeWidth="1.5"
                />
                <line x1="14" y1="12" x2="19" y2="13" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="13" y1="15" x2="18" y2="16" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M5 22 C11 23 24 23 28 21 C29 19 28 18 26 18 L6 18 C5 18 4 19 5 22 Z"
                  fill="#FFFFFF"
                  stroke="#1E293B"
                  strokeWidth="2"
                />
                <line x1="7" y1="20" x2="26" y2="20" stroke="#0284C7" strokeWidth="1" />
              </g>

              {/* Right Sneaker (Ankle collar centered at x=140, y=182) */}
              <g transform="translate(125, 172)">
                <path
                  d="M9 13 C11 9 17 8 20 9 C23 10 25 15 24 18 L4 18 L9 13 Z"
                  fill="url(#sneakerBlue)"
                  stroke="#1E293B"
                  strokeWidth="2"
                />
                <path
                  d="M4 18 C4 16 6 15 10 14 L10 18 Z"
                  fill="#FFFFFF"
                  stroke="#1E293B"
                  strokeWidth="1.5"
                />
                <line x1="12" y1="13" x2="17" y2="12" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <line x1="13" y1="16" x2="18" y2="15" stroke="#FFFFFF" strokeWidth="1.5" strokeLinecap="round" />
                <path
                  d="M3 21 C7 23 20 23 26 22 C27 19 26 18 25 18 L5 18 C3 18 2 19 3 21 Z"
                  fill="#FFFFFF"
                  stroke="#1E293B"
                  strokeWidth="2"
                />
                <line x1="5" y1="20" x2="24" y2="20" stroke="#0284C7" strokeWidth="1" />
              </g>
            </g>
          )}
        </g>

        {/* 4. Torso & Outfit Customization */}
        <g id="lobster-torso" className={bodyAnimationClass} style={{ transformOrigin: '110px 144px' }}>
          {/* Base Red Torso */}
          <ellipse cx="110" cy="144" rx="20" ry="24" fill="url(#lobsterRed)" stroke="#1E293B" strokeWidth="3" />

          {/* Default Segmented Belly */}
          <ellipse cx="110" cy="144" rx="14" ry="19" fill="url(#lobsterBelly)" stroke="#1E293B" strokeWidth="2" />
          <line x1="98" y1="135" x2="122" y2="135" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <line x1="96" y1="145" x2="124" y2="145" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
          <line x1="99" y1="155" x2="121" y2="155" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />

          {/* Outfit Overlays */}
          {activeOutfit === 'DRAGON_ARMOR' && (
            /* Crimson Dragon Flame Warrior Armor with Golden Pauldrons & Flame Chest Emblem */
            <g id="outfit-dragon-armor">
              <path d="M90 124 C100 118 120 118 130 124 L126 166 L94 166 Z" fill="url(#dragonScaleArmor)" stroke="#1E293B" strokeWidth="2.5" />
              <path d="M96 132 Q110 138 124 132" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
              <path d="M98 142 Q110 148 122 142" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
              <path d="M100 152 Q110 158 120 152" stroke="#F59E0B" strokeWidth="1.5" fill="none" />
              {/* Blazing Sun Dragon Core Medallion */}
              <circle cx="110" cy="144" r="8" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="2" />
              <circle cx="110" cy="144" r="5" fill="#DC2626" />
              <polygon points="110,137 112,143 118,144 112,145 110,151 108,145 102,144 108,143" fill="#FDE047" />
              {/* Golden Flame Shoulder Pauldrons */}
              <path d="M86 122 C84 116 90 114 96 118 L94 132 C88 130 84 126 86 122 Z" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1.5" />
              <path d="M134 122 C136 116 130 114 124 118 L126 132 C132 130 136 126 134 122 Z" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="1.5" />
            </g>
          )}

          {activeOutfit === 'SAFETY_VEST' && (
            /* High-Vis Safety Vest */
            <g id="outfit-safety-vest">
              <path d="M92 126 L104 126 L108 144 L102 166 L92 160 Z" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
              <path d="M128 126 L116 126 L112 144 L118 166 L128 160 Z" fill="#F97316" stroke="#1E293B" strokeWidth="2" />
              <line x1="95" y1="140" x2="125" y2="140" stroke="#FFFFFF" strokeWidth="3.5" />
              <line x1="95" y1="152" x2="125" y2="152" stroke="#FFFFFF" strokeWidth="3.5" />
            </g>
          )}

          {activeOutfit === 'SAMURAI_ROBE' && (
            /* Indigo Samurai Shinobi Robe */
            <g id="outfit-samurai-robe">
              <path d="M92 125 C100 135 100 155 94 167 L126 167 C120 155 120 135 128 125 Z" fill="#1E3A8A" stroke="#1E293B" strokeWidth="2" />
              <path d="M94 125 L116 148 L110 167 L104 167 L94 140 Z" fill="#3B82F6" opacity="0.6" />
              <rect x="96" y="146" width="28" height="6" rx="1" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.5" />
            </g>
          )}

          {activeOutfit === 'LAB_COAT' && (
            /* Cleanroom White Lab Coat */
            <g id="outfit-lab-coat">
              <path d="M91 126 L103 126 L107 146 L100 168 L90 162 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" />
              <path d="M129 126 L117 126 L113 146 L120 168 L130 162 Z" fill="#F8FAFC" stroke="#1E293B" strokeWidth="2" />
              <rect x="96" y="148" width="8" height="9" rx="1" fill="#E2E8F0" stroke="#1E293B" strokeWidth="1.5" />
              <line x1="99" y1="151" x2="102" y2="151" stroke="#3B82F6" strokeWidth="1.5" />
            </g>
          )}

          {activeOutfit === 'CYBER_ARMOR' && (
            /* Titanium Cyber Suit with Glowing Arc Reactor */
            <g id="outfit-cyber-armor">
              <path d="M92 125 C100 120 120 120 128 125 L124 166 L96 166 Z" fill="#0F172A" stroke="#1E293B" strokeWidth="2.5" />
              <polygon points="100,126 120,126 123,138 97,138" fill="#334155" stroke="#1E293B" strokeWidth="1.5" />
              {/* Glowing Chest Arc Reactor */}
              <circle cx="110" cy="144" r="7" fill="#06B6D4" stroke="#FFFFFF" strokeWidth="1.5" />
              <circle cx="110" cy="144" r="3.5" fill="#FFFFFF" />
            </g>
          )}
        </g>

        {/* 5. Left Arm & Claw (Steady Balance Pincer) */}
        <g id="lobster-left-arm">
          <path d="M94 128 C84 132 76 126 68 120" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
          <path d="M94 128 C84 132 76 126 68 120" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />

          {/* Left Pincer */}
          <g transform="translate(46, 116) rotate(-15)">
            <path d="M36 28 C22 10 6 12 0 25 C-4 32 4 40 16 36 C26 32 36 28 36 28 Z" fill="url(#lobsterRed)" stroke="#1E293B" strokeWidth="3" />
            <path d="M36 30 C25 45 10 46 2 35 C-2 32 6 26 18 28 C28 30 36 30 36 30 Z" fill="url(#lobsterRed)" stroke="#1E293B" strokeWidth="3" />
          </g>
        </g>

        {/* 6. Big Round Head & Expressive Heroic Anime-Chibi Warrior Eyes (Always Wide Open!) */}
        <g id="lobster-head" className={bodyAnimationClass} style={{ transformOrigin: '110px 144px' }}>
          <circle cx="110" cy="84" r="44" fill="url(#lobsterRed)" stroke="#1E293B" strokeWidth="3.5" />
          <path d="M72 104 C84 122 136 122 148 104 C136 116 84 116 72 104 Z" fill="#991B1B" />

          {/* Always Bright, Expressive, Heroic Warrior Eyes */}
          <g id="warrior-eyes">
            {/* Left Eye */}
            <ellipse cx="85" cy="82" rx="15" ry="17" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <ellipse cx="87" cy="83" rx="10" ry="12" fill="#0F172A" />
            <circle cx="89" cy="80" r="4.5" fill="#FFFFFF" />
            <polygon points="84,87 85,85 87,86 85,88" fill="#38BDF8" opacity="0.9" />

            {/* Right Eye */}
            <ellipse cx="135" cy="82" rx="15" ry="17" fill="#FFFFFF" stroke="#1E293B" strokeWidth="3" />
            <ellipse cx="133" cy="83" rx="10" ry="12" fill="#0F172A" />
            <circle cx="135" cy="80" r="4.5" fill="#FFFFFF" />
            <polygon points="131,87 132,85 134,86 132,88" fill="#38BDF8" opacity="0.9" />

            {/* Confident / Spirited Eyebrows */}
            {slashingActive || stance === 'attack' || stance === 'slash' ? (
              <>
                <path d="M72 68 L98 75" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
                <path d="M148 68 L122 75" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
              </>
            ) : (
              <>
                <path d="M72 70 C80 66 94 70 98 74" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M148 70 C140 66 126 70 122 74" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" fill="none" />
              </>
            )}

            {/* Cute Rosy Cheeks */}
            <circle cx="68" cy="94" r="5" fill="#FDA4AF" />
            <circle cx="152" cy="94" r="5" fill="#FDA4AF" />
          </g>

          {/* Mouth & Signature Bamboo Leaf */}
          {mood === 'sad' ? (
            <path d="M102 105 Q110 98 118 105" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
          ) : (
            <g id="lobster-mouth">
              <path d="M102 101 L108 104 L114 99 L118 102" stroke="#1E293B" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <g transform="translate(118, 100)">
                <path d="M0 2 C6 0 10 4 12 8 C10 8 4 6 0 2 Z" fill="#22C55E" stroke="#1E293B" strokeWidth="1.5" />
                <path d="M0 2 C4 6 6 12 8 14 C6 12 2 8 0 2 Z" fill="#16A34A" stroke="#1E293B" strokeWidth="1.5" />
              </g>
            </g>
          )}

          {/* Headgear Overlays */}
          {activeHead === 'SAFETY_HELMET' && (
            /* Data Center Safety Hardhat */
            <g id="headgear-safety-helmet">
              <path d="M68 62 C68 34 84 26 110 26 C136 26 152 34 152 62 Z" fill="#FACC15" stroke="#1E293B" strokeWidth="3" />
              <path d="M62 62 C76 68 144 68 158 62 L155 68 C140 73 80 73 65 68 Z" fill="#EAB308" stroke="#1E293B" strokeWidth="2.5" />
              <path d="M104 26 L104 64 L116 64 L116 26 Z" fill="#FFFFFF" opacity="0.9" />
              <rect x="106" y="44" width="8" height="6" rx="1" fill="#0284C7" />
            </g>
          )}

          {activeHead === 'TECH_HEADSET' && (
            /* Tactical Comms Headset with Boom Mic */
            <g id="headgear-tech-headset">
              <path d="M66 78 C66 36 154 36 154 78" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" fill="none" />
              <path d="M72 74 C72 42 148 42 148 74" stroke="#475569" strokeWidth="3" strokeLinecap="round" fill="none" />
              <ellipse cx="64" cy="78" rx="8" ry="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2.5" />
              <circle cx="64" cy="78" r="4" fill="#38BDF8" />
              <ellipse cx="156" cy="78" rx="8" ry="14" fill="#0F172A" stroke="#1E293B" strokeWidth="2.5" />
              <circle cx="156" cy="78" r="4" fill="#38BDF8" />
              <path d="M154 84 C150 96 138 106 122 104" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" fill="none" />
              <circle cx="120" cy="104" r="3.5" fill="#22C55E" />
            </g>
          )}

          {activeHead === 'CYBER_VISOR' && (
            /* Cyber HUD Scanner Visor */
            <g id="headgear-cyber-visor">
              <path d="M68 76 C90 73 130 73 152 76 L150 92 C130 94 90 94 70 92 Z" fill="#06B6D4" stroke="#1E293B" strokeWidth="2.5" fillOpacity="0.85" />
              <line x1="72" y1="84" x2="148" y2="84" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="4 2" />
              <circle cx="80" cy="84" r="2.5" fill="#FFFFFF" />
              <circle cx="140" cy="84" r="2.5" fill="#FFFFFF" />
            </g>
          )}

          {activeHead === 'DRAGON_HELM' && (
            /* Ancient Dragon Flame Warrior Helm with Dual Horns & Flame Crest */
            <g id="headgear-dragon-helm">
              {/* Twin Sweeping Golden Dragon Horns */}
              <path
                d="M78 54 C66 38 58 20 62 10 C68 22 76 34 84 46 Z"
                fill="url(#dragonGold)"
                stroke="#1E293B"
                strokeWidth="2"
              />
              <path
                d="M142 54 C154 38 162 20 158 10 C152 22 144 34 136 46 Z"
                fill="url(#dragonGold)"
                stroke="#1E293B"
                strokeWidth="2"
              />

              {/* Central Dragon Flame Crest */}
              <path
                d="M102 44 C100 24 106 14 110 8 C114 14 120 24 118 44 Z"
                fill="url(#dragonFlame)"
                stroke="#1E293B"
                strokeWidth="2"
              />
              <path
                d="M106 38 C105 26 108 18 110 14 C112 18 115 26 114 38 Z"
                fill="#FDE047"
              />

              {/* Helmet Forehead Crown & Brow Guard */}
              <path
                d="M74 58 C86 46 134 46 146 58 L142 68 C130 62 90 62 78 68 Z"
                fill="url(#dragonScaleArmor)"
                stroke="#1E293B"
                strokeWidth="2.5"
              />
              <path
                d="M78 60 L110 48 L142 60 L136 65 L110 56 L84 65 Z"
                fill="url(#dragonGold)"
                stroke="#1E293B"
                strokeWidth="1.5"
              />

              {/* Glowing Ruby Dragon Eye Jewel on Forehead */}
              <ellipse cx="110" cy="56" rx="5" ry="6" fill="#DC2626" stroke="#FEF08A" strokeWidth="2" />
              <ellipse cx="110" cy="56" rx="2" ry="4" fill="#FFFFFF" />
            </g>
          )}

          {activeHead === 'GOLD_CROWN' && (
            /* Royal Imperial Crown */
            <g id="headgear-gold-crown">
              <path d="M84 48 L90 28 L100 38 L110 22 L120 38 L130 28 L136 48 Z" fill="url(#swordGold)" stroke="#1E293B" strokeWidth="2.5" />
              <ellipse cx="110" cy="48" rx="26" ry="4" fill="#B45309" />
              <circle cx="90" cy="30" r="2.5" fill="#EF4444" />
              <circle cx="110" cy="24" r="3.5" fill="#38BDF8" />
              <circle cx="130" cy="30" r="2.5" fill="#EF4444" />
            </g>
          )}
        </g>

        {/* 7. Cinematic Directional Sword Slash Wave (3 Distinct Techniques: 1 = Diagonal Cleave, 2 = Crescent Ascent, 3 = Cross Dragon Pierce) */}
        {slashingActive && (
          <g id="sword-slash-wave">
            {slashMove === 2 ? (
              /* Move 2: Crescent Ascent (ตวัดดาบขึ้นบนเป็นวงจันทร์เสี้ยวเพลิงสุริยัน) */
              <g id="slash-move-2-crescent" className={waveAnimationClass}>
                {/* Ascending kinetic speed lines */}
                <line x1="50" y1="180" x2="110" y2="35" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.85" strokeDasharray="14 6" />
                <line x1="70" y1="185" x2="140" y2="40" stroke="#FDE047" strokeWidth="2.5" strokeOpacity="0.8" strokeDasharray="18 8" />
                <line x1="90" y1="190" x2="170" y2="55" stroke="#F97316" strokeWidth="2" strokeOpacity="0.75" strokeDasharray="16 6" />

                {/* Sweeping Upward Golden-Red Crescent Arc */}
                <path
                  d="M50 170 C95 155 150 100 170 35 C150 55 105 115 60 155 Z"
                  fill={activeWeapon === 'DRAGON_BLADE' ? 'url(#dragonSlashGrad)' : 'url(#slashWaveGrad)'}
                  filter="drop-shadow(0 0 8px #F59E0B)"
                />
                <path
                  d="M50 170 C95 155 150 100 170 35"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 4px #FFFFFF)"
                />
                <path
                  d="M40 180 C85 165 140 110 160 45"
                  stroke="#FDE047"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="16 6"
                  fill="none"
                />

                {/* Ascending Flame Tongues */}
                <path d="M70 145 C65 130 75 120 85 125 C80 135 75 140 70 145 Z" fill="#DC2626" />
                <path d="M110 105 C105 90 115 80 125 85 C120 95 115 100 110 105 Z" fill="#FBBF24" />
                <path d="M150 55 C145 40 155 30 165 35 C160 45 155 50 150 55 Z" fill="#DC2626" />

                {/* Diamond Stars */}
                <polygon points="170,25 172,33 180,35 172,37 170,45 168,37 160,35 168,33" fill="#FFFFFF" />
                <circle cx="170" cy="35" r="2.5" fill="#FDE047" />
                <polygon points="115,95 117,101 123,103 117,105 115,111 113,105 107,103 113,101" fill="#FDE047" />
                <circle cx="60" cy="155" r="3" fill="#FFFFFF" />
              </g>
            ) : slashMove === 3 ? (
              /* Move 3: Cross Dragon Thrust (แทงตรงผ่าตัดกากบาท ✕ ระเบิดคลื่นเพลิงคู่) */
              <g id="slash-move-3-cross" className={waveAnimationClass}>
                {/* Dual Slicing Cross Shockwaves */}
                <path
                  d="M36 36 L184 184"
                  stroke="#FFFFFF"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 6px #F59E0B)"
                />
                <path
                  d="M184 36 L36 184"
                  stroke="#FDE047"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  filter="drop-shadow(0 0 6px #EA580C)"
                />

                {/* Fiery Ribbon Wings */}
                <path
                  d="M35 35 Q110 95 185 185 Q110 125 35 35 Z"
                  fill={activeWeapon === 'DRAGON_BLADE' ? 'url(#dragonSlashGrad)' : 'url(#slashWaveGrad)'}
                  opacity="0.85"
                />
                <path
                  d="M185 35 Q110 95 35 185 Q110 125 185 35 Z"
                  fill={activeWeapon === 'DRAGON_BLADE' ? 'url(#dragonSlashGrad)' : 'url(#slashWaveGrad)'}
                  opacity="0.85"
                />

                {/* Central Radiant Impact Burst */}
                <circle cx="110" cy="110" r="16" fill="#FFFFFF" filter="drop-shadow(0 0 10px #F59E0B)" />
                <circle cx="110" cy="110" r="9" fill="#FDE047" />
                <circle cx="110" cy="110" r="4.5" fill="#DC2626" />

                {/* 4 Cardinal Radiant Slash Points */}
                <polygon points="110,68 114,104 130,110 114,116 110,152 106,116 90,110 106,104" fill="#FFFFFF" />

                {/* Explosive Corner Flame Embers */}
                <circle cx="45" cy="45" r="3.5" fill="#FDE047" />
                <circle cx="175" cy="45" r="3.5" fill="#FFFFFF" />
                <circle cx="45" cy="175" r="3.5" fill="#EA580C" />
                <circle cx="175" cy="175" r="3.5" fill="#FDE047" />
              </g>
            ) : (
              /* Move 1: Downward Diagonal Cleave (ทแยงขวาบนลงซ้ายล่าง เพลิงผ่าปฐพี) */
              <g id="slash-move-1-diagonal" className={waveAnimationClass}>
                <line x1="208" y1="26" x2="160" y2="62" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.8" strokeDasharray="14 6" />
                <line x1="172" y1="18" x2="118" y2="58" stroke="#FDE047" strokeWidth="2" strokeOpacity="0.7" strokeDasharray="18 8" />
                <line x1="130" y1="72" x2="68" y2="124" stroke="#F97316" strokeWidth="2" strokeOpacity="0.8" strokeDasharray="20 6" />
                <line x1="90" y1="112" x2="42" y2="162" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.9" strokeDasharray="16 5" />

                <path
                  d="M195 36 C140 52 86 96 52 155 C70 148 126 102 182 48 Z"
                  fill={activeWeapon === 'DRAGON_BLADE' ? 'url(#dragonSlashGrad)' : 'url(#slashWaveGrad)'}
                  filter="drop-shadow(0 0 6px #F59E0B)"
                />
                <path
                  d="M195 36 C140 56 88 102 52 155"
                  stroke="#FFFFFF"
                  strokeWidth="4"
                  strokeLinecap="round"
                  fill="none"
                  filter="drop-shadow(0 0 3px #FFFFFF)"
                />
                <path
                  d="M186 26 C130 44 80 88 44 146"
                  stroke="#FDE047"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeDasharray="16 6"
                  fill="none"
                  opacity="0.9"
                />
                <path
                  d="M204 48 C150 68 98 114 62 166"
                  stroke="#EA580C"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeDasharray="12 4"
                  fill="none"
                  opacity="0.85"
                />

                <g id="slash-flame-tongues">
                  <path d="M182 46 C192 38 196 28 190 24 C184 32 178 40 182 46 Z" fill="#DC2626" />
                  <path d="M182 46 C188 40 190 32 186 28 C182 34 178 40 182 46 Z" fill="#FBBF24" />
                  <path d="M142 68 C152 58 154 46 148 42 C142 50 136 60 142 68 Z" fill="#DC2626" />
                  <path d="M142 68 C148 60 150 52 146 48 C142 54 138 62 142 68 Z" fill="#FBBF24" />
                  <path d="M100 106 C108 94 108 82 102 78 C98 86 94 98 100 106 Z" fill="#DC2626" />
                  <path d="M100 106 C106 98 106 88 102 84 C98 90 96 100 100 106 Z" fill="#FBBF24" />
                  <path d="M60 148 C66 136 64 124 58 120 C54 128 52 140 60 148 Z" fill="#DC2626" />
                  <path d="M60 148 C64 140 62 130 58 126 C56 132 54 142 60 148 Z" fill="#FDE047" />
                </g>

                <polygon points="194,28 196,36 204,38 196,40 194,48 192,40 184,38 192,36" fill="#FFFFFF" />
                <circle cx="194" cy="38" r="2" fill="#FDE047" />
                <polygon points="150,58 152,64 158,66 152,68 150,74 148,68 142,66 148,64" fill="#FDE047" />
                <polygon points="108,92 110,100 118,102 110,104 108,112 106,104 98,102 106,100" fill="#FFFFFF" />
                <circle cx="108" cy="102" r="2.5" fill="#38BDF8" />
                <polygon points="58,138 60,144 66,146 60,148 58,154 56,148 50,146 56,144" fill="#FDE047" />
                <circle cx="210" cy="32" r="2.5" fill="#FDE047" />
                <circle cx="174" cy="22" r="2" fill="#FFFFFF" />
                <circle cx="126" cy="50" r="2.5" fill="#F97316" />
                <circle cx="76" cy="90" r="2" fill="#FDE047" />
                <circle cx="44" cy="134" r="2.5" fill="#FFFFFF" />
                <circle cx="34" cy="158" r="2" fill="#F97316" />
              </g>
            )}
          </g>
        )}


        {/* 8. Right Arm & THE CLAW GRIPPING THE WEAPON (Biomechanically articulated at shoulder (126, 128)) */}
        <g id="lobster-right-arm-and-weapon" transform="translate(126, 128)">
          {/* Animated Shoulder Pivot Group: Shoulder remains anchored at (0, 0) */}
          <g
            className={armAnimationClass}
            style={{
              transform: armAnimationClass ? undefined : armMotionTransform,
              transformOrigin: '0px 0px',
              transition: armAnimationClass ? undefined : 'transform 0.25s ease-out',
            }}
          >
            {/* Articulated Upper Arm: curves naturally from shoulder (0, 0) to wrist (36, -14) */}
            <path d="M0 0 C10 4 20 -2 36 -14" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
            <path d="M0 0 C10 4 20 -2 36 -14" stroke="#DC2626" strokeWidth="5" strokeLinecap="round" />

            {/* Hand Claw & Weapon clamped at wrist (36, -14) */}
            <g transform="translate(36, -14)">
              {/* WEAPON SELECTION */}
              {activeWeapon === 'DRAGON_BLADE' ? (
                /* World-Cleaving Dragon Flame Katana */
                <g id="weapon-dragon-blade">
                  <rect x="-4" y="-12" width="8" height="28" rx="2" fill="#78350F" stroke="#1E293B" strokeWidth="2" />
                  <line x1="-3" y1="-5" x2="3" y2="-5" stroke="#F59E0B" strokeWidth="2" />
                  <line x1="-3" y1="2" x2="3" y2="2" stroke="#F59E0B" strokeWidth="2" />
                  <line x1="-3" y1="9" x2="3" y2="9" stroke="#F59E0B" strokeWidth="2" />
                  <circle cx="0" cy="18" r="5.5" fill="url(#dragonGold)" stroke="#1E293B" strokeWidth="2" />
                  <circle cx="0" cy="18" r="2.5" fill="#DC2626" />
                  <path
                    d="M-16 -14 C-10 -18 -4 -16 0 -20 C4 -16 10 -18 16 -14 C12 -10 14 -6 0 -8 C-14 -6 -12 -10 -16 -14 Z"
                    fill="url(#dragonGold)"
                    stroke="#1E293B"
                    strokeWidth="2"
                  />
                  <path
                    d="M-5 -18 L-6 -90 L-1 -116 L6 -92 L5 -18 Z"
                    fill="url(#dragonFlame)"
                    stroke="#1E293B"
                    strokeWidth="2.5"
                  />
                  <line x1="0" y1="-18" x2="0" y2="-106" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
                  <path
                    d="M-6 -30 Q-12 -42 -6 -54 Q-14 -68 -6 -82 Q-12 -96 0 -114 Q4 -94 2 -80 Q8 -66 2 -52 Q8 -38 0 -24 Z"
                    fill="url(#dragonGold)"
                    opacity="0.85"
                  />
                  <polygon points="0,-122 3,-115 10,-113 3,-111 0,-104 -3,-111 -10,-113 -3,-115" fill="#FFFFFF" />
                </g>
              ) : activeWeapon === 'TITANIUM_WRENCH' ? (
                /* Digital Multimeter Wrench */
                <g id="weapon-wrench">
                  <rect x="-4" y="-12" width="8" height="28" rx="2" fill="#334155" stroke="#1E293B" strokeWidth="2" />
                  <rect x="-2.5" y="0" width="5" height="8" rx="1" fill="#06B6D4" />
                  <path d="M-8 -14 L-8 -82 L-14 -94 L-8 -100 L0 -90 L8 -100 L14 -94 L8 -82 L8 -14 Z" fill="#94A3B8" stroke="#1E293B" strokeWidth="2.5" />
                </g>
              ) : activeWeapon === 'PLASMA_BLADE' ? (
                /* Neon Blue Plasma Laser Saber */
                <g id="weapon-plasma">
                  <rect x="-4" y="-12" width="8" height="28" rx="2" fill="#0F172A" stroke="#1E293B" strokeWidth="2" />
                  <ellipse cx="0" cy="-14" rx="8" ry="3" fill="#38BDF8" />
                  <path d="M-5 -16 L-4 -92 L0 -108 L4 -92 L5 -16 Z" fill="url(#plasmaGlow)" stroke="#0284C7" strokeWidth="2" />
                  <line x1="0" y1="-16" x2="0" y2="-104" stroke="#FFFFFF" strokeWidth="2" />
                  <polygon points="0,-114 2,-108 8,-106 2,-104 0,-98 -2,-104 -8,-106 -2,-108" fill="#FFFFFF" />
                </g>
              ) : activeWeapon === 'FIBER_WAND' ? (
                /* 800Gbps Optical Fiber Wand */
                <g id="weapon-fiber">
                  <rect x="-3" y="-12" width="6" height="28" fill="#B45309" stroke="#1E293B" strokeWidth="1.5" />
                  <line x1="0" y1="16" x2="0" y2="-85" stroke="#F59E0B" strokeWidth="4" />
                  <polygon points="0,-112 8,-90 0,-85 -8,-90" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
                  <circle cx="0" cy="-96" r="3" fill="#FFFFFF" />
                </g>
              ) : activeWeapon === 'GOLD_RAPIER' ? (
                /* Diamond Golden Rapier */
                <g id="weapon-rapier">
                  <rect x="-3" y="-12" width="6" height="28" fill="#F59E0B" stroke="#1E293B" strokeWidth="1.5" />
                  <ellipse cx="0" cy="-14" rx="16" ry="6" fill="url(#swordGold)" stroke="#1E293B" strokeWidth="2" />
                  <path d="M-2 -16 L-1 -95 L0 -112 L1 -95 L2 -16 Z" fill="url(#swordGold)" stroke="#B45309" strokeWidth="1.5" />
                  <circle cx="0" cy="18" r="4.5" fill="#38BDF8" stroke="#1E293B" strokeWidth="1.5" />
                </g>
              ) : (
                /* Default Steel Katana */
                <g id="weapon-katana">
                  <rect x="-4" y="-12" width="8" height="28" rx="2" fill="#0284C7" stroke="#1E293B" strokeWidth="2" />
                  <line x1="-3" y1="-5" x2="3" y2="-5" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="-3" y1="2" x2="3" y2="2" stroke="#FFFFFF" strokeWidth="1.5" />
                  <line x1="-3" y1="9" x2="3" y2="9" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx="0" cy="18" r="4.5" fill="url(#swordGold)" stroke="#1E293B" strokeWidth="2" />
                  <ellipse cx="0" cy="-14" rx="14" ry="4" fill="url(#swordGold)" stroke="#1E293B" strokeWidth="2" />
                  <path d="M-5 -16 L-5 -88 L0 -105 L5 -88 L5 -16 Z" fill="url(#swordBlade)" stroke="#1E293B" strokeWidth="2.5" />
                  <line x1="0" y1="-16" x2="0" y2="-98" stroke="#FFFFFF" strokeWidth="1.5" />
                  <polygon points="0,-112 2,-107 7,-105 2,-103 0,-98 -2,-103 -7,-105 -2,-107" fill="#FFFFFF" />
                </g>
              )}

              {/* Claw Wrist Base */}
              <path d="M-10 0 C-14 -2 -14 4 -10 4 L-2 4 L-2 -2 Z" fill="url(#lobsterRed)" stroke="#1E293B" strokeWidth="2" />

              {/* Right Claw Pincers Firmly Clamping the Handle */}
              <path d="M-10 -1 C-8 -15 6 -17 16 -7 C20 -2 16 6 8 5 C2 3 -4 1 -10 -1 Z" fill="url(#lobsterRed)" stroke="#1E293B" strokeWidth="3" />
              <path d="M-10 3 C-8 17 6 19 16 9 C20 4 16 -4 8 -2 C2 0 -4 1 -10 3 Z" fill="url(#lobsterRed)" stroke="#1E293B" strokeWidth="3" />
              <line x1="6" y1="1" x2="15" y2="1" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />
            </g>
          </g>
        </g>
      </svg>
    </div>
  );
};

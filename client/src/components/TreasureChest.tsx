import React from 'react';
import { useLanguage } from '../context/LanguageContext';

interface TreasureChestProps {
  opened?: boolean;
  onOpen?: () => void;
  isClaiming?: boolean;
  className?: string;
  size?: number;
}

export const TreasureChest: React.FC<TreasureChestProps> = ({
  opened = true,
  onOpen,
  isClaiming = false,
  className = '',
  size = 180,
}) => {
  const { language } = useLanguage();
  const isEn = language === 'en';

  return (
    <div
      onClick={!opened && !isClaiming ? onOpen : undefined}
      style={{ width: size, height: Math.round(size * 0.95) }}
      className={`group relative mx-auto flex flex-col items-center justify-center select-none transition-transform duration-300 ${
        !opened ? 'cursor-pointer hover:scale-105 active:scale-95' : 'hover:scale-[1.02]'
      } ${className}`}
    >
      {/* 0. Cute Sponge Speech Bubble ("ฟองน้ำข้อความ" ชวนให้เปิดหีบ - รองรับ 2 ภาษาแท้จริง) */}
      <div className="absolute -top-3 z-40 pointer-events-none animate-bounce">
        <div className="relative px-2.5 py-1 rounded-xl bg-amber-400 border border-amber-300 text-[10px] font-black text-amber-950 shadow-md whitespace-nowrap flex items-center gap-1">
          <span>{opened ? '🎉' : '✨'}</span>
          <span>
            {opened
              ? (isEn ? 'Treasure Claimed!' : 'รับสมบัติแล้ว!')
              : (isEn ? 'Tap to Open! 🎁' : 'เปิดฉันสิ! 🎁')}
          </span>
          {/* Bubble tail */}
          <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-amber-400 rotate-45 border-r border-b border-amber-300" />
        </div>
      </div>

      {/* 1. Radiant Sunburst Golden Rays (ลำแสงวิบวับเปล่งประกายขึ้นฟ้า - เมื่อเปิดหีบ) */}
      {opened && (
        <div className="absolute inset-0 -top-6 flex items-center justify-center pointer-events-none overflow-visible">
          <svg
            viewBox="0 0 200 200"
            className="w-full h-full animate-sunburst-slow opacity-60 dark:opacity-75 overflow-visible"
          >
            <defs>
              <radialGradient id="sunburstGrad" cx="50%" cy="55%" r="50%">
                <stop offset="0%" stopColor="#FDE047" stopOpacity="0.85" />
                <stop offset="45%" stopColor="#F59E0B" stopOpacity="0.45" />
                <stop offset="85%" stopColor="#D97706" stopOpacity="0.1" />
                <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
              </radialGradient>
            </defs>
            {/* 12 Radiant Rays */}
            {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((deg) => (
              <polygon
                key={deg}
                points="100,105 92,15 108,15"
                fill="url(#sunburstGrad)"
                transform={`rotate(${deg} 100 105)`}
              />
            ))}
          </svg>
        </div>
      )}

      {/* 2. Floating Bubbles & Sparkles (ฟองน้ำ/ฟองสบู่และประกายเพชรลอยขึ้น) */}
      <div className="absolute inset-0 pointer-events-none overflow-visible z-30">
        <span className="absolute top-2 left-3 text-sm animate-sparkle-float-1">✨</span>
        <span className="absolute top-0 right-4 text-xs animate-sparkle-float-2">💎</span>
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-base animate-sparkle-float-3">🌟</span>
        <span className="absolute top-6 right-2 text-xs animate-sparkle-float-1">✨</span>
        <span className="absolute top-4 left-6 text-[10px] animate-sparkle-float-2">🪙</span>

        {/* Translucent Ocean Bubbles (ฟองน้ำ/ฟองอากาศรอบหีบ) */}
        <span className="absolute bottom-4 left-2 text-sm animate-sparkle-float-3 opacity-80">🫧</span>
        <span className="absolute bottom-8 right-3 text-xs animate-sparkle-float-1 opacity-75">🫧</span>
        <span className="absolute top-8 left-1 text-[11px] animate-sparkle-float-2 opacity-70">🫧</span>
      </div>

      {/* 3. The Detailed Treasure Chest + Sponge Base SVG (กล่องสมบัติ + ตัวฐานฟองน้ำ ไม่บั๊ก 100%) */}
      <svg
        viewBox="0 0 200 185"
        className="w-full h-full drop-shadow-2xl animate-treasure-glow relative z-20 overflow-visible"
      >
        <defs>
          {/* Wood Planks Gradient */}
          <linearGradient id="chestWood" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#854D0E" />
            <stop offset="40%" stopColor="#713F12" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Lid Wood Gradient */}
          <linearGradient id="lidWood" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#92400E" />
            <stop offset="70%" stopColor="#78350F" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Inner Velvet Lining Gradient (กำมะหยี่สีแดงหรูหราด้านในฝาหีบ) */}
          <linearGradient id="lidVelvetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#4C0519" />
            <stop offset="45%" stopColor="#881337" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>

          {/* Golden Trim & Metal Bands */}
          <linearGradient id="goldMetal" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="35%" stopColor="#F59E0B" />
            <stop offset="70%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>

          {/* Gold Coins Gradient */}
          <linearGradient id="coinGold" x1="20%" y1="0%" x2="80%" y2="100%">
            <stop offset="0%" stopColor="#FEF9C3" />
            <stop offset="40%" stopColor="#FACC15" />
            <stop offset="85%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>

          {/* Soft Sponge Base Gradient (ตัวฟองน้ำรองหีบสมบัตินุ่มนิ่มสีทองสดใส) */}
          <radialGradient id="spongeGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="60%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </radialGradient>

          {/* Gem Gradients */}
          <linearGradient id="gemCyan" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#E0F2FE" />
            <stop offset="35%" stopColor="#38BDF8" />
            <stop offset="75%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#0369A1" />
          </linearGradient>

          <linearGradient id="gemRuby" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFE4E6" />
            <stop offset="30%" stopColor="#FB7185" />
            <stop offset="70%" stopColor="#E11D48" />
            <stop offset="100%" stopColor="#9F1239" />
          </linearGradient>

          <linearGradient id="gemEmerald" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D1FAE5" />
            <stop offset="30%" stopColor="#34D399" />
            <stop offset="70%" stopColor="#059669" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>

          <linearGradient id="gemAmethyst" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F3E8FF" />
            <stop offset="35%" stopColor="#C084FC" />
            <stop offset="75%" stopColor="#9333EA" />
            <stop offset="100%" stopColor="#6B21A8" />
          </linearGradient>

          {/* Inner Golden Light Glow */}
          <radialGradient id="innerChestGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FEF08A" stopOpacity="0.95" />
            <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#B45309" stopOpacity="0" />
          </radialGradient>

          {/* Strict ClipPath for Closed Lid Dome (ป้องกันชิ้นส่วนขอบทองยื่นโผล่ออกนอกเนื้อฝาหีบ 100%) */}
          <clipPath id="closedLidClip">
            <path d="M 26 74 C 26 30, 174 30, 174 74 Z" />
          </clipPath>

          {/* Strict ClipPath for Open Lid Shell */}
          <clipPath id="openLidClip">
            <path d="M 28 74 L 28 36 C 28 14, 172 14, 172 36 L 172 74 Z" />
          </clipPath>
        </defs>

        {/* ========================================================
            SPONGE CUSHION BASE (ตัวฟองน้ำรองใต้หีบสมบัติ)
            ======================================================== */}
        <g id="spongeBase" className="transition-transform duration-300 group-hover:scale-105">
          {/* Sponge Shadow */}
          <ellipse cx="100" cy="168" rx="80" ry="14" fill="#000000" opacity="0.35" />

          {/* Organic Sponge Body with Bubbly Craters (ตัวฟองน้ำเนื้อนุ่มสีทอง) */}
          <path
            d="M 22 152 C 16 160, 24 172, 45 174 C 70 176, 130 176, 155 174 C 176 172, 184 160, 178 152 C 170 144, 30 144, 22 152 Z"
            fill="url(#spongeGrad)"
            stroke="#B45309"
            strokeWidth="1.5"
          />

          {/* Sponge Texture Pores / Bubbles (รูพรุนธรรมชาติของตัวฟองน้ำ) */}
          <ellipse cx="38" cy="158" rx="4" ry="2.5" fill="#D97706" opacity="0.6" />
          <ellipse cx="58" cy="164" rx="5" ry="3" fill="#D97706" opacity="0.5" />
          <ellipse cx="82" cy="160" rx="3.5" ry="2" fill="#D97706" opacity="0.6" />
          <ellipse cx="102" cy="166" rx="6" ry="3.5" fill="#D97706" opacity="0.55" />
          <ellipse cx="126" cy="161" rx="4" ry="2.5" fill="#D97706" opacity="0.6" />
          <ellipse cx="148" cy="165" rx="5" ry="3" fill="#D97706" opacity="0.5" />
          <ellipse cx="166" cy="158" rx="3.5" ry="2" fill="#D97706" opacity="0.6" />
          {/* Sponge Highlights */}
          <ellipse cx="52" cy="154" rx="3" ry="1.5" fill="#FEF9C3" opacity="0.8" />
          <ellipse cx="118" cy="155" rx="4" ry="2" fill="#FEF9C3" opacity="0.8" />
        </g>

        {/* ========================================================
            OPENED LID OR CLOSED LID (ฝาหีบสมบูรณ์แบบไม่บั๊ก ไม่ยื่นลอยในอากาศ)
            ======================================================== */}
        {opened ? (
          <g id="openedLid" className="transition-transform duration-500">
            {/* Outer Lid Shell Backing (โครงฝาหีบไม้โค้งเอียงไปด้านหลัง เชื่อมสนิทที่ y=74) */}
            <path
              d="M 28 74 L 28 36 C 28 14, 172 14, 172 36 L 172 74 Z"
              fill="url(#lidWood)"
              stroke="#291305"
              strokeWidth="2.5"
              strokeLinejoin="round"
            />

            {/* Inner Lid Velvet Lining (แผงกำมะหยี่สีแดงด้านในฝาหีบ ลึกสมจริง) */}
            <path
              d="M 34 74 L 34 40 C 34 22, 166 22, 166 40 L 166 74 Z"
              fill="url(#lidVelvetGrad)"
              stroke="#4C0519"
              strokeWidth="1.5"
            />

            {/* Barrel Vault Perspective Curves inside the lid */}
            <path
              d="M 34 58 C 60 52, 140 52, 166 58"
              fill="none"
              stroke="#4C0519"
              strokeWidth="1.5"
              opacity="0.6"
            />
            <path
              d="M 34 44 C 60 38, 140 38, 166 44"
              fill="none"
              stroke="#4C0519"
              strokeWidth="1.5"
              opacity="0.6"
            />

            {/* Lid Golden Border Trim (ขอบทองรอบฝาหีบ เชื่อมต่อถึงขอบล่างสมบูรณ์) */}
            <path
              d="M 28 74 L 28 36 C 28 14, 172 14, 172 36 L 172 74"
              fill="none"
              stroke="url(#goldMetal)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* Vertical Golden Rib Straps on Lid - strictly inside shell */}
            <g clipPath="url(#openLidClip)">
              <rect x="62" y="10" width="10" height="66" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="67" cy="42" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="67" cy="58" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />

              <rect x="128" y="10" width="10" height="66" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="133" cy="42" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="133" cy="58" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
            </g>

            {/* Solid Brass Hinges (บานพับทองเหลืองแท้ 2 ข้าง ยึดฝากับตัวกล่องหีบอย่างมั่นคง) */}
            <g id="lidHinges">
              {/* Left Hinge */}
              <rect x="40" y="66" width="14" height="14" rx="2.5" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1.2" />
              <circle cx="47" cy="69" r="1.2" fill="#451A03" />
              <circle cx="47" cy="77" r="1.2" fill="#451A03" />
              <line x1="40" y1="73" x2="54" y2="73" stroke="#78350F" strokeWidth="1" />

              {/* Right Hinge */}
              <rect x="146" y="66" width="14" height="14" rx="2.5" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1.2" />
              <circle cx="153" cy="69" r="1.2" fill="#451A03" />
              <circle cx="153" cy="77" r="1.2" fill="#451A03" />
              <line x1="146" y1="73" x2="160" y2="73" stroke="#78350F" strokeWidth="1" />
            </g>

            {/* Center Hanging Lock Hasp loop (ห่วงสลักล็อกห้อยลงมาจากขอบฝาบน) */}
            <path
              d="M 96 22 L 96 32 C 96 35, 104 35, 104 32 L 104 22"
              fill="none"
              stroke="url(#goldMetal)"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <circle cx="100" cy="32" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
          </g>
        ) : (
          /* ========================================================
             CLOSED LID (ฝาหีบปิดสนิท แนบสนิท 100% ปราศจากเสาหรือชิ้นส่วนทองลอยในอากาศ)
             ======================================================== */
          <g id="closedLid" className="transition-transform duration-500">
            {/* Arched Closed Wooden Dome (เนื้อฝาหีบไม้โอ๊คทรงโค้ง) */}
            <path
              d="M 26 74 C 26 30, 174 30, 174 74 Z"
              fill="url(#chestWood)"
              stroke="#291305"
              strokeWidth="2.5"
            />

            {/* Content within Closed Lid (Clipped to prevent any lines poking into the air) */}
            <g clipPath="url(#closedLidClip)">
              {/* Horizontal Wooden Plank Seams */}
              <path d="M 24 60 Q 100 64 176 60" fill="none" stroke="#291305" strokeWidth="2" opacity="0.6" />
              <path d="M 24 46 Q 100 50 176 46" fill="none" stroke="#291305" strokeWidth="2" opacity="0.6" />

              {/* Vertical Golden Band 1 (Left) - Perfectly flush with lid */}
              <rect x="62" y="24" width="12" height="52" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1" />
              <circle cx="68" cy="46" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="68" cy="62" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />

              {/* Vertical Golden Band 2 (Right) - Perfectly flush with lid */}
              <rect x="126" y="24" width="12" height="52" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1" />
              <circle cx="132" cy="46" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
              <circle cx="132" cy="62" r="1.8" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />

              {/* Center Vertical Gold Guide Band */}
              <rect x="94" y="24" width="12" height="52" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1" />
            </g>

            {/* Golden Rim around the Arched Lid Crest */}
            <path
              d="M 26 74 C 26 30, 174 30, 174 74"
              fill="none"
              stroke="url(#goldMetal)"
              strokeWidth="3.5"
              strokeLinecap="round"
            />

            {/* Closed Lid Bottom Golden Rim (แถบทองหนาริมฝาหีบ ประกบกับปากกล่อง) */}
            <rect
              x="24"
              y="68"
              width="152"
              height="8"
              rx="2.5"
              fill="url(#goldMetal)"
              stroke="#78350F"
              strokeWidth="1.2"
            />

            {/* Brass Hinge Accents on sides */}
            <rect x="30" y="66" width="12" height="12" rx="2" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1" />
            <rect x="158" y="66" width="12" height="12" rx="2" fill="url(#goldMetal)" stroke="#78350F" strokeWidth="1" />

            {/* Closed Heavy Lock Hasp (สลักกุญแจทองเหลืองล็อกทับตัวแม่กุญแจอย่างแน่นหนา) */}
            <rect
              x="93"
              y="58"
              width="14"
              height="26"
              rx="3.5"
              fill="url(#goldMetal)"
              stroke="#78350F"
              strokeWidth="1.5"
              filter="drop-shadow(0 2px 3px rgba(0,0,0,0.5))"
            />
            {/* Latch Rivet & Keyhole Slot */}
            <circle cx="100" cy="64" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
            <circle cx="100" cy="74" r="2.5" fill="#451A03" />
          </g>
        )}

        {/* ========================================================
            CHEST INTERIOR & OVERFLOWING TREASURE (เมื่อเปิดหีบ)
            ======================================================== */}
        {opened && (
          <>
            {/* Chest Deep Interior Void */}
            <rect x="32" y="68" width="136" height="26" rx="3" fill="#1A0A02" />

            {/* Inner Golden Radiance Core */}
            <ellipse cx="100" cy="74" rx="60" ry="18" fill="url(#innerChestGlow)" />

            {/* Piles of Overflowing Gold Coins */}
            <g id="goldCoins">
              {/* Background Coins Layer */}
              <circle cx="48" cy="74" r="8" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="62" cy="70" r="9" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="78" cy="67" r="9" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="95" cy="65" r="9.5" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="112" cy="66" r="9" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="130" cy="69" r="9" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="148" cy="73" r="8.5" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />

              {/* Foreground Spilling Coins */}
              <circle cx="56" cy="80" r="8.5" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="72" cy="76" r="9" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="88" cy="73" r="9" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="106" cy="74" r="9" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="122" cy="77" r="8.5" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />
              <circle cx="138" cy="81" r="8" fill="url(#coinGold)" stroke="#B45309" strokeWidth="1.2" />

              {/* Coin Inner Detail Rings */}
              <circle cx="95" cy="65" r="5.5" fill="none" stroke="#CA8A04" strokeWidth="0.8" />
              <circle cx="72" cy="76" r="5" fill="none" stroke="#CA8A04" strokeWidth="0.8" />
              <circle cx="106" cy="74" r="5" fill="none" stroke="#CA8A04" strokeWidth="0.8" />
            </g>

            {/* Brilliant Gemstones Nestled Among Coins */}
            <g id="gemstones">
              {/* 1. Large Cyan Diamond */}
              <polygon
                points="94,56 106,56 112,65 100,78 88,65"
                fill="url(#gemCyan)"
                stroke="#0284C7"
                strokeWidth="1.5"
              />
              <polygon points="94,56 106,56 100,64" fill="#BAE6FD" opacity="0.8" />
              <line x1="88" y1="65" x2="100" y2="64" stroke="#E0F2FE" strokeWidth="1" />
              <line x1="112" y1="65" x2="100" y2="64" stroke="#E0F2FE" strokeWidth="1" />
              <line x1="100" y1="64" x2="100" y2="78" stroke="#E0F2FE" strokeWidth="1.2" />

              {/* 2. Red Ruby Crystal */}
              <polygon
                points="62,64 71,59 78,65 74,74 65,74"
                fill="url(#gemRuby)"
                stroke="#9F1239"
                strokeWidth="1.2"
              />
              <polygon points="65,63 70,61 74,65 67,66" fill="#FECDD3" opacity="0.85" />

              {/* 3. Emerald Green Crystal */}
              <polygon
                points="126,62 133,56 141,63 138,73 129,73"
                fill="url(#gemEmerald)"
                stroke="#065F46"
                strokeWidth="1.2"
              />
              <polygon points="129,61 133,58 138,62 132,65" fill="#A7F3D0" opacity="0.85" />

              {/* 4. Purple Amethyst Gem */}
              <polygon
                points="146,71 152,65 158,72 153,79"
                fill="url(#gemAmethyst)"
                stroke="#581C87"
                strokeWidth="1.2"
              />
            </g>
          </>
        )}

        {/* ========================================================
            CHEST MAIN BODY (ตัวกล่องหีบไม้ด้านล่าง)
            ======================================================== */}
        <g id="chestBody">
          {/* Base Chest Trunk (ตัวถังไม้) */}
          <path
            d="M 28 74 L 172 74 L 164 150 L 36 150 Z"
            fill="url(#chestWood)"
            stroke="#291305"
            strokeWidth="2.5"
          />

          {/* Wood Plank Grooves (ร่องแผ่นไม้โอ๊ค) */}
          <line x1="32" y1="102" x2="168" y2="102" stroke="#291305" strokeWidth="2" opacity="0.6" />
          <line x1="34" y1="126" x2="166" y2="126" stroke="#291305" strokeWidth="2" opacity="0.6" />

          {/* Left Golden Corner Reinforcement (แผ่นทองมุมซ้าย) */}
          <path
            d="M 28 74 L 44 74 L 50 150 L 36 150 Z"
            fill="url(#goldMetal)"
            stroke="#78350F"
            strokeWidth="1.2"
          />
          <circle cx="36" cy="86" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
          <circle cx="39" cy="114" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
          <circle cx="42" cy="142" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />

          {/* Right Golden Corner Reinforcement (แผ่นทองมุมขวา) */}
          <path
            d="M 172 74 L 156 74 L 150 150 L 164 150 Z"
            fill="url(#goldMetal)"
            stroke="#78350F"
            strokeWidth="1.2"
          />
          <circle cx="164" cy="86" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
          <circle cx="161" cy="114" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />
          <circle cx="158" cy="142" r="2" fill="#FEF08A" stroke="#78350F" strokeWidth="0.8" />

          {/* Center Vertical Gold Band (สายคาดทองกลางตัวหีบ) */}
          <path
            d="M 92 74 L 108 74 L 106 150 L 94 150 Z"
            fill="url(#goldMetal)"
            stroke="#78350F"
            strokeWidth="1.2"
          />

          {/* Center Lock Body Plate (แผ่นแม่กุญแจทองเหลือง) */}
          <rect
            x="90"
            y="84"
            width="20"
            height="24"
            rx="5"
            fill="url(#goldMetal)"
            stroke="#78350F"
            strokeWidth="1.5"
            filter="drop-shadow(0 2px 3px rgba(0,0,0,0.4))"
          />
          {/* Keyhole */}
          <circle cx="100" cy="93" r="3" fill="#291305" />
          <polygon points="98,94 102,94 101,102 99,102" fill="#291305" />

          {/* Top Edge Lip Golden Rim (ขอบปากหีบสีทองเชื่อมต่อพอดีกับฝาหีบที่ y=72 ถึง 78) */}
          <rect
            x="24"
            y="72"
            width="152"
            height="8"
            rx="3"
            fill="url(#goldMetal)"
            stroke="#78350F"
            strokeWidth="1.5"
          />
        </g>
      </svg>
    </div>
  );
};

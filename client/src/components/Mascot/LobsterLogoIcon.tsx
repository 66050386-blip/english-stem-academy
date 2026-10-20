import React from 'react';
import { DuoMascot } from './DuoMascot';

interface LobsterLogoIconProps {
  size?: number;
  className?: string;
  withBackground?: boolean;
}

/**
 * Super Cool Lobster Logo Icon (โลโก้กุ้งนักดาบสุดเท่แท้จริง)
 * Renders the genuine, iconic Duolingo-style Lobster Warrior mascot
 * framed inside a vibrant Duolingo emerald squircle badge.
 */
export const LobsterLogoIcon: React.FC<LobsterLogoIconProps> = ({
  size = 38,
  className = '',
  withBackground = true,
}) => {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative inline-flex items-center justify-center shrink-0 select-none ${className}`}
    >
      {withBackground ? (
        <div className="relative w-full h-full rounded-2xl bg-gradient-to-br from-[#58CC02] via-[#46A302] to-[#2E7D32] p-0.5 shadow-duo shadow-[#2E7D32]/50 border-2 border-emerald-300 flex items-center justify-center overflow-hidden hover:scale-105 active:scale-95 transition-transform">
          <div className="w-[130%] h-[130%] flex items-center justify-center -translate-y-0.5 pointer-events-none">
            <DuoMascot
              mood="happy"
              stance="ready"
              size={Math.round(size * 1.35)}
              interactiveSlash={false}
              headgear="NONE"
              outfit="DEFAULT"
              weapon="STEEL_KATANA"
              shoes="SNEAKERS"
            />
          </div>
        </div>
      ) : (
        <div className="w-full h-full flex items-center justify-center pointer-events-none">
          <DuoMascot
            mood="happy"
            stance="ready"
            size={Math.round(size * 1.15)}
            interactiveSlash={false}
            headgear="NONE"
            outfit="DEFAULT"
            weapon="STEEL_KATANA"
            shoes="SNEAKERS"
          />
        </div>
      )}
    </div>
  );
};

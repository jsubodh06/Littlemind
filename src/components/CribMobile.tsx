import React, { useState } from 'react';
import { soundManager } from '../utils/audio';

interface CribMobileProps {
  onSpin?: () => void;
}

export const CribMobile: React.FC<CribMobileProps> = ({ onSpin }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [showSparkles, setShowSparkles] = useState(false);

  const handleTap = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setShowSparkles(true);
    soundManager.playMobileChime();
    if (onSpin) onSpin();

    setTimeout(() => {
      setIsSpinning(false);
    }, 1200);

    setTimeout(() => {
      setShowSparkles(false);
    }, 1600);
  };

  return (
    <div className="relative flex flex-col items-center select-none cursor-pointer group" onClick={handleTap}>
      {/* Ceiling Anchor Cord */}
      <div className="w-0.5 h-10 bg-stone-300 shadow-xs" />

      {/* Main Mobile Rig */}
      <div
        className={`relative transition-transform duration-300 ${
          isSpinning ? 'animate-mobile-spin' : 'animate-mobile-swing'
        }`}
      >
        {/* Top Crossbar Ring (bamboo circle in perspective) */}
        <div className="relative w-48 sm:w-60 h-8 flex items-center justify-center">
          <div className="w-full h-2 bg-gradient-to-r from-amber-200 via-amber-300 to-amber-200 rounded-full shadow-sm" />
          <div className="absolute w-3 h-3 bg-amber-400 rounded-full shadow-xs" />
        </div>

        {/* 4 Suspension Droppers */}
        <div className="flex justify-between w-48 sm:w-60 px-4 -mt-1">
          {/* Piece 1: Sleepy Cloud */}
          <div className="flex flex-col items-center group-hover:-translate-y-1 transition-transform">
            <div className="w-px h-12 bg-stone-300/80" />
            <svg viewBox="0 0 40 28" className="w-9 h-7 drop-shadow-sm transition-transform hover:scale-110">
              <path
                d="M8 22 C3 22 2 16 7 14 C6 9 12 7 16 10 C19 6 27 6 29 11 C34 11 36 16 32 20 C30 22 10 22 8 22 Z"
                fill="#E0F2FE"
                stroke="#BAE6FD"
                strokeWidth="1.5"
              />
              {/* Closed sleepy eyes */}
              <path d="M12 17 Q15 19 18 17" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" fill="none" />
              <path d="M22 17 Q25 19 28 17" stroke="#0284C7" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Piece 2: Happy Sun */}
          <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
            <div className="w-px h-18 bg-stone-300/80" />
            <svg viewBox="0 0 36 36" className="w-9 h-9 drop-shadow-sm transition-transform hover:rotate-12">
              <circle cx="18" cy="18" r="11" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.5" />
              {/* Sun rays */}
              {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
                <line
                  key={angle}
                  x1="18"
                  y1="3"
                  x2="18"
                  y2="5.5"
                  stroke="#F59E0B"
                  strokeWidth="2"
                  strokeLinecap="round"
                  transform={`rotate(${angle} 18 18)`}
                />
              ))}
              <circle cx="14" cy="16" r="1.5" fill="#78350F" />
              <circle cx="22" cy="16" r="1.5" fill="#78350F" />
              <path d="M15 20 Q18 23 21 20" stroke="#78350F" strokeWidth="1.3" strokeLinecap="round" fill="none" />
              <circle cx="11" cy="18" r="1.5" fill="#FECDD3" />
              <circle cx="25" cy="18" r="1.5" fill="#FECDD3" />
            </svg>
          </div>

          {/* Piece 3: Crescent Moon */}
          <div className="flex flex-col items-center group-hover:scale-105 transition-transform">
            <div className="w-px h-14 bg-stone-300/80" />
            <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow-sm transition-transform hover:-rotate-12">
              <path
                d="M22 6 A12 12 0 1 0 25 24 A10 10 0 0 1 22 6 Z"
                fill="#FEF3C7"
                stroke="#FBBF24"
                strokeWidth="1.5"
              />
              <circle cx="15" cy="14" r="1.2" fill="#78350F" />
              <path d="M13 18 Q16 20 18 17" stroke="#78350F" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            </svg>
          </div>

          {/* Piece 4: Pastel Twinkling Star */}
          <div className="flex flex-col items-center group-hover:-translate-y-1 transition-transform">
            <div className="w-px h-10 bg-stone-300/80" />
            <svg viewBox="0 0 32 32" className="w-8 h-8 drop-shadow-sm transition-transform hover:scale-110">
              <path
                d="M16 4 L19 12 L28 12 L21 18 L24 27 L16 21 L8 27 L11 18 L4 12 L13 12 Z"
                fill="#FBCFE8"
                stroke="#F43F5E"
                strokeWidth="1.3"
              />
              <circle cx="13" cy="15" r="1" fill="#881337" />
              <circle cx="19" cy="15" r="1" fill="#881337" />
              <path d="M14 18 Q16 20 18 18" stroke="#881337" strokeWidth="1" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
      </div>

      {/* Musical Sparkles Burst on Tap */}
      {showSparkles && (
        <div className="absolute top-16 pointer-events-none flex items-center justify-center">
          <span className="text-amber-500 font-medium text-xs tracking-wide bg-amber-50/90 border border-amber-200/80 px-2.5 py-0.5 rounded-full shadow-xs animate-float-fast">
            ♪ Chime! ✨
          </span>
        </div>
      )}

      {/* Subtle Hint */}
      <span className="text-[11px] text-stone-500 font-medium mt-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
        Tap mobile to spin & chime 🎵
      </span>
    </div>
  );
};

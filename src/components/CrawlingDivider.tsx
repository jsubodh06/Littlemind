import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/audio';

export const CrawlingDivider: React.FC = () => {
  const [posX, setPosX] = useState(10);
  const [isSomersaulting, setIsSomersaulting] = useState(false);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    let currentX = 10;
    let direction = 1;

    const crawlLoop = () => {
      if (!isSomersaulting) {
        currentX += 0.08 * direction;
        if (currentX > 88) {
          direction = -1;
        } else if (currentX < 6) {
          direction = 1;
        }
        setPosX(currentX);
      }
      animFrameRef.current = requestAnimationFrame(crawlLoop);
    };

    animFrameRef.current = requestAnimationFrame(crawlLoop);
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isSomersaulting]);

  const handleBabyClick = () => {
    if (isSomersaulting) return;
    setIsSomersaulting(true);
    soundManager.playGiggle();

    const phrases = ['Wheee! 🤸', 'Giggle! Look at me! ⭐', 'Tee-hee! Somersault! 💕'];
    setBubbleText(phrases[Math.floor(Math.random() * phrases.length)]);

    setTimeout(() => {
      setIsSomersaulting(false);
      setBubbleText(null);
    }, 1200);
  };

  return (
    <div className="w-full overflow-hidden select-none relative py-6 bg-gradient-to-r from-amber-50/40 via-rose-50/40 to-sky-50/40 border-y border-stone-200/50">
      {/* Crawling Track Line */}
      <div className="max-w-7xl mx-auto px-4 relative h-12 flex items-center">
        <div className="w-full h-1 bg-stone-200/60 rounded-full border-t border-dashed border-stone-300" />

        {/* Crawling Baby Character */}
        <div
          onClick={handleBabyClick}
          style={{ left: `${posX}%` }}
          className={`absolute top-1/2 -translate-y-1/2 cursor-pointer transition-transform ${
            isSomersaulting ? 'animate-somersault z-20' : 'hover:scale-110'
          }`}
          title="Click to see a somersault & giggle!"
        >
          {/* Speech Bubble */}
          {bubbleText && (
            <div className="absolute -top-10 -left-6 bg-white text-stone-800 text-[11px] font-bold px-3 py-1 rounded-full shadow-md border border-rose-200 animate-popcorn whitespace-nowrap z-30">
              {bubbleText}
              <div className="w-2 h-2 bg-white rotate-45 border-r border-b border-rose-200 absolute -bottom-1 left-1/2 -translate-x-1/2" />
            </div>
          )}

          {/* Baby SVG */}
          <div className="flex items-center">
            <svg viewBox="0 0 60 40" className="w-14 sm:w-16 h-auto drop-shadow-xs overflow-visible">
              {/* Diaper & Body */}
              <ellipse cx="22" cy="24" rx="13" ry="11" fill="#FED7AA" />
              <path d="M12 21 C12 32 32 32 32 21 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.2" />
              {/* Back foot */}
              <ellipse cx="10" cy="28" rx="6" ry="4" fill="#FED7AA" />
              {/* Front creeping hand */}
              <ellipse cx="36" cy="30" rx="5" ry="3.5" fill="#FED7AA" />
              {/* Head */}
              <circle cx="44" cy="18" r="11" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.2" />
              {/* Eye & Cheek */}
              <circle cx="48" cy="16" r="1.6" fill="#1E293B" />
              <circle cx="45" cy="21" r="2.4" fill="#FDA4AF" />
              {/* Smile */}
              <path d="M47 21 Q50 24 53 21" stroke="#E11D48" strokeWidth="1.2" fill="none" strokeLinecap="round" />
              {/* Tuft of hair */}
              <path d="M42 7 Q44 2 47 6" stroke="#92400E" strokeWidth="1.5" strokeLinecap="round" fill="none" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

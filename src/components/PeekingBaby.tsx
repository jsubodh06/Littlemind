import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/audio';

export const PeekingBaby: React.FC = () => {
  const [pupilOffset, setPupilOffset] = useState({ x: 0, y: 0 });
  const [isWaving, setIsWaving] = useState(true);
  const [isGiggling, setIsGiggling] = useState(false);
  const [speechBubble, setSpeechBubble] = useState<string | null>(null);
  const babyRef = useRef<HTMLDivElement>(null);

  // Track cursor / finger movements to direct baby pupils
  useEffect(() => {
    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      if (!babyRef.current) return;
      const rect = babyRef.current.getBoundingClientRect();
      const babyCenterX = rect.left + rect.width / 2;
      const babyCenterY = rect.top + rect.height * 0.4;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const dx = clientX - babyCenterX;
      const dy = clientY - babyCenterY;
      const distance = Math.hypot(dx, dy);

      // Max eye travel is 4.5px
      const maxOffset = 4.5;
      const angle = Math.atan2(dy, dx);
      const intensity = Math.min(distance / 200, 1) * maxOffset;

      setPupilOffset({
        x: Math.cos(angle) * intensity,
        y: Math.sin(angle) * intensity,
      });
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  const handleBabyClick = () => {
    setIsGiggling(true);
    soundManager.playGiggle();
    const greetings = ['Giggle! Tee-hee! 🍼', 'Peek-a-boo! 💕', 'Yay, play with me! ✨', 'Coo-coo! 🧸'];
    const chosen = greetings[Math.floor(Math.random() * greetings.length)];
    setSpeechBubble(chosen);

    setTimeout(() => {
      setIsGiggling(false);
    }, 1400);

    setTimeout(() => {
      setSpeechBubble(null);
    }, 2400);
  };

  return (
    <div
      ref={babyRef}
      onClick={handleBabyClick}
      className="relative flex flex-col items-center select-none cursor-pointer group"
      title="Click me for giggles!"
    >
      {/* Speech Bubble on click */}
      {speechBubble && (
        <div className="absolute -top-10 bg-white/95 text-stone-700 text-xs font-semibold px-3 py-1 rounded-full shadow-md border border-rose-200/80 animate-popcorn whitespace-nowrap z-20">
          {speechBubble}
          <div className="w-2 h-2 bg-white rotate-45 border-r border-b border-rose-200/80 absolute -bottom-1 left-1/2 -translate-x-1/2" />
        </div>
      )}

      {/* SVG Baby Character */}
      <div className={`transition-transform duration-300 ${isGiggling ? 'animate-baby-giggle' : ''}`}>
        <svg viewBox="0 0 160 110" className="w-36 sm:w-44 h-auto overflow-visible">
          {/* Baby Hands Peeking over the ledge */}
          {/* Left Hand */}
          <ellipse cx="42" cy="98" rx="11" ry="8" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
          <ellipse cx="38" cy="95" rx="3.5" ry="2.5" fill="#FED7AA" />
          <ellipse cx="44" cy="94" rx="3.5" ry="2.5" fill="#FED7AA" />
          <ellipse cx="49" cy="96" rx="3.5" ry="2.5" fill="#FED7AA" />

          {/* Right Waving Hand (animated) */}
          <g className={isWaving ? 'animate-baby-wave' : ''}>
            <ellipse cx="122" cy="85" rx="11" ry="9" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
            <ellipse cx="118" cy="78" rx="3" ry="4" fill="#FED7AA" />
            <ellipse cx="123" cy="77" rx="3" ry="4.5" fill="#FED7AA" />
            <ellipse cx="128" cy="78" rx="3" ry="4" fill="#FED7AA" />
            <ellipse cx="132" cy="82" rx="2.5" ry="3.5" fill="#FED7AA" />
          </g>

          {/* Baby Head */}
          <circle cx="80" cy="55" r="42" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />

          {/* Cute Little Tuft of Hair */}
          <path
            d="M78 13 C82 4 92 8 85 16 C90 12 96 16 88 20"
            stroke="#92400E"
            strokeWidth="2.5"
            strokeLinecap="round"
            fill="none"
          />

          {/* Rosy Cheeks */}
          <circle
            cx="55"
            cy="62"
            r="8"
            fill="#FDA4AF"
            className="transition-opacity duration-300 group-hover:opacity-100 opacity-75"
          />
          <circle
            cx="105"
            cy="62"
            r="8"
            fill="#FDA4AF"
            className="transition-opacity duration-300 group-hover:opacity-100 opacity-75"
          />

          {/* Left Eye with Blinking & Tracking Pupils */}
          <g className="animate-baby-blink" style={{ transformOrigin: '65px 48px' }}>
            {/* Sclera */}
            <ellipse cx="65" cy="48" rx="8" ry="9" fill="#FFFFFF" />
            {/* Iris & Pupil following cursor */}
            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
              <circle cx="65" cy="48" r="5" fill="#3B82F6" />
              <circle cx="65" cy="48" r="2.8" fill="#1E293B" />
              {/* Eye Catchlight Sparkle */}
              <circle cx="63.5" cy="46" r="1.6" fill="#FFFFFF" />
              <circle cx="66.5" cy="49.5" r="0.8" fill="#FFFFFF" />
            </g>
          </g>

          {/* Right Eye with Blinking & Tracking Pupils */}
          <g className="animate-baby-blink" style={{ transformOrigin: '95px 48px' }}>
            {/* Sclera */}
            <ellipse cx="95" cy="48" rx="8" ry="9" fill="#FFFFFF" />
            {/* Iris & Pupil following cursor */}
            <g transform={`translate(${pupilOffset.x}, ${pupilOffset.y})`}>
              <circle cx="95" cy="48" r="5" fill="#3B82F6" />
              <circle cx="95" cy="48" r="2.8" fill="#1E293B" />
              {/* Eye Catchlight Sparkle */}
              <circle cx="93.5" cy="46" r="1.6" fill="#FFFFFF" />
              <circle cx="96.5" cy="49.5" r="0.8" fill="#FFFFFF" />
            </g>
          </g>

          {/* Sweet Eyebrows */}
          <path d="M58 37 Q65 34 72 37" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />
          <path d="M88 37 Q95 34 102 37" stroke="#B45309" strokeWidth="1.8" strokeLinecap="round" fill="none" />

          {/* Tiny Baby Button Nose */}
          <ellipse cx="80" cy="55" rx="2.5" ry="1.8" fill="#FB923C" />

          {/* Happy Open Giggling Mouth */}
          {isGiggling ? (
            <path
              d="M72 65 C72 76 88 76 88 65 Z"
              fill="#E11D48"
              stroke="#BE123C"
              strokeWidth="1.5"
            />
          ) : (
            <path
              d="M73 66 Q80 74 87 66"
              stroke="#E11D48"
              strokeWidth="2.5"
              strokeLinecap="round"
              fill="none"
            />
          )}

          {/* Cute Yellow Baby Bib with Polka Dots */}
          <path
            d="M58 84 C58 100 102 100 102 84 Z"
            fill="#FEF08A"
            stroke="#FBBF24"
            strokeWidth="1.5"
          />
          <circle cx="72" cy="90" r="1.8" fill="#F59E0B" />
          <circle cx="80" cy="92" r="1.8" fill="#F59E0B" />
          <circle cx="88" cy="90" r="1.8" fill="#F59E0B" />
        </svg>
      </div>

      {/* Crib Ledge Bar */}
      <div className="w-48 sm:w-56 h-3 bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 rounded-t-md shadow-xs border-t border-amber-300/40" />
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { soundManager } from '../utils/audio';

export const CrawlingScrollBar: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [boxOpened, setBoxOpened] = useState(false);
  const [showCelebrationModal, setShowCelebrationModal] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const currentScroll = window.scrollY;
      const progress = Math.min(Math.max((currentScroll / totalHeight) * 100, 0), 100);
      setScrollProgress(progress);

      if (progress >= 98 && !boxOpened) {
        setBoxOpened(true);
        soundManager.playCelebration();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [boxOpened]);

  const handleBoxClick = () => {
    setShowCelebrationModal(true);
    soundManager.playCelebration();
  };

  return (
    <>
      {/* Top Crawling Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-9 bg-white/95 backdrop-blur-sm border-b border-amber-100 z-50 select-none px-4 flex items-center">
        {/* Track */}
        <div className="relative w-full h-1.5 bg-amber-100/70 rounded-full flex items-center">
          {/* Active progress fill */}
          <div
            className="h-full bg-gradient-to-r from-amber-300 via-rose-300 to-amber-400 rounded-full transition-all duration-75"
            style={{ width: `${scrollProgress}%` }}
          />

          {/* Crawling Baby Figure */}
          <div
            className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-75 pointer-events-auto cursor-pointer group"
            style={{ left: `${Math.min(Math.max(scrollProgress, 2), 96)}%` }}
            onClick={() => soundManager.playGiggle()}
            title="Baby crawling with your scroll!"
          >
            <div className="relative -top-2 flex items-center">
              <svg viewBox="0 0 40 28" className="w-8 h-6 overflow-visible drop-shadow-xs">
                {/* Diaper & Body */}
                <ellipse cx="14" cy="16" rx="8" ry="7" fill="#FED7AA" />
                <path d="M8 15 C8 21 20 21 20 15 Z" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1" />
                {/* Crawling Back Leg */}
                <ellipse cx="6" cy="18" rx="4" ry="3" fill="#FED7AA" />
                {/* Crawling Front Arm */}
                <ellipse cx="24" cy="20" rx="4" ry="2.5" fill="#FED7AA" />
                {/* Baby Head */}
                <circle cx="28" cy="12" r="7" fill="#FED7AA" stroke="#FDBA74" strokeWidth="0.8" />
                {/* Eye & Rosy Cheek */}
                <circle cx="31" cy="11" r="1" fill="#1E293B" />
                <circle cx="29" cy="14" r="1.5" fill="#FDA4AF" />
                {/* Smile */}
                <path d="M30 14 Q32 16 34 14" stroke="#E11D48" strokeWidth="0.8" fill="none" />
                {/* Hair Curl */}
                <path d="M26 5 Q28 2 30 5" stroke="#92400E" strokeWidth="1" strokeLinecap="round" fill="none" />
              </svg>
            </div>
          </div>

          {/* Gift Box at the Finish Line (100%) */}
          <div
            onClick={handleBoxClick}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 cursor-pointer transition-transform ${
              boxOpened ? 'scale-125' : 'hover:scale-110'
            }`}
            title={boxOpened ? 'Open reward surprise!' : 'Scroll to 100% to open!'}
          >
            <svg viewBox="0 0 32 32" className="w-6 h-6 overflow-visible">
              {/* Box Base */}
              <rect x="6" y="14" width="20" height="15" rx="2" fill="#F43F5E" />
              <rect x="14" y="14" width="4" height="15" fill="#FDE047" />

              {/* Box Lid (pops up when opened) */}
              <g
                className={`transition-transform duration-500 origin-bottom-left ${
                  boxOpened ? '-translate-y-2.5 -rotate-20' : ''
                }`}
              >
                <rect x="4" y="9" width="24" height="6" rx="2" fill="#E11D48" />
                <rect x="14" y="9" width="4" height="6" fill="#FDE047" />
                {/* Ribbon Bow */}
                <path d="M12 7 Q14 4 16 7 Q18 4 20 7" stroke="#FDE047" strokeWidth="2" fill="none" />
              </g>

              {/* Confetti Sparkles if opened */}
              {boxOpened && (
                <g className="animate-ping">
                  <circle cx="16" cy="4" r="2" fill="#FBBF24" />
                  <circle cx="8" cy="6" r="1.5" fill="#34D399" />
                  <circle cx="24" cy="6" r="1.5" fill="#60A5FA" />
                </g>
              )}
            </svg>
          </div>
        </div>
      </div>

      {/* Secret Reward Modal if 100% gift clicked */}
      {showCelebrationModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-3xl p-6 max-w-sm w-full text-center shadow-xl border border-rose-200 animate-popcorn relative">
            <button
              onClick={() => setShowCelebrationModal(false)}
              className="absolute top-4 right-4 text-stone-400 hover:text-stone-700 text-lg w-7 h-7 rounded-full flex items-center justify-center bg-stone-100"
            >
              ✕
            </button>
            <div className="w-16 h-16 bg-rose-50 text-rose-500 rounded-full mx-auto flex items-center justify-center text-3xl mb-3 shadow-inner">
              🎁
            </div>
            <h3 className="font-['Outfit'] text-xl font-bold text-stone-900 mb-1">
              Little Explorer Milestone!
            </h3>
            <p className="text-sm text-stone-600 mb-4">
              You crawled all the way to the end! Enjoy an exclusive treat for your little one:
            </p>
            <div className="bg-amber-50 border-2 border-dashed border-amber-300 rounded-xl py-2 px-4 mb-4">
              <span className="text-xs text-amber-700 font-medium block">USE CODE AT CHECKOUT:</span>
              <span className="font-mono text-lg font-bold text-amber-900 tracking-wider">
                TINYTOTS15
              </span>
            </div>
            <button
              onClick={() => setShowCelebrationModal(false)}
              className="w-full py-2.5 px-4 bg-stone-900 hover:bg-stone-800 text-white font-medium text-sm rounded-xl transition-colors"
            >
              Yay, Keep Shopping!
            </button>
          </div>
        </div>
      )}
    </>
  );
};

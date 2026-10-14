import React, { useState, useEffect, useRef } from 'react';
import { soundManager } from '../utils/audio';

interface BlockItem {
  id: string;
  label: string;
  color: string;
  textColor: string;
  borderColor: string;
  stackedOffset: { x: number; y: number; rotate: number };
  toppledOffset: { x: number; y: number; rotate: number };
}

const BLOCKS_DATA: BlockItem[] = [
  // Base level
  {
    id: 'block-a',
    label: 'A',
    color: '#FED7AA', // soft peach
    textColor: '#9A3412',
    borderColor: '#FB923C',
    stackedOffset: { x: -80, y: 70, rotate: -2 },
    toppledOffset: { x: -140, y: 90, rotate: -22 },
  },
  {
    id: 'block-1',
    label: '1',
    color: '#BAE6FD', // sky blue
    textColor: '#0369A1',
    borderColor: '#38BDF8',
    stackedOffset: { x: 0, y: 70, rotate: 1 },
    toppledOffset: { x: -30, y: 100, rotate: 18 },
  },
  {
    id: 'block-b',
    label: 'B',
    color: '#FECDD3', // rose
    textColor: '#BE123C',
    borderColor: '#FB7185',
    stackedOffset: { x: 80, y: 70, rotate: -1 },
    toppledOffset: { x: 120, y: 95, rotate: 25 },
  },
  // Middle level
  {
    id: 'block-2',
    label: '2',
    color: '#A7F3D0', // mint
    textColor: '#047857',
    borderColor: '#34D399',
    stackedOffset: { x: -40, y: 10, rotate: 2 },
    toppledOffset: { x: -90, y: 105, rotate: -14 },
  },
  {
    id: 'block-c',
    label: 'C',
    color: '#FDE68A', // butter yellow
    textColor: '#B45309',
    borderColor: '#FBBF24',
    stackedOffset: { x: 40, y: 10, rotate: -2 },
    toppledOffset: { x: 60, y: 102, rotate: 12 },
  },
  // Peak
  {
    id: 'block-3',
    label: '3',
    color: '#DDD6FE', // lavender
    textColor: '#6D28D9',
    borderColor: '#A78BFA',
    stackedOffset: { x: 0, y: -50, rotate: 0 },
    toppledOffset: { x: 10, y: 110, rotate: -35 },
  },
];

export const StackingBlocks: React.FC = () => {
  const [isStacked, setIsStacked] = useState(false);
  const [activeBounce, setActiveBounce] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Trigger stacking when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsStacked(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleTopple = () => {
    soundManager.playRattle();
    setIsStacked(false);
    setTimeout(() => {
      soundManager.playGiggle();
      setIsStacked(true);
    }, 900);
  };

  const handleBlockClick = (id: string) => {
    soundManager.playBubblePop();
    setActiveBounce(id);
    setTimeout(() => setActiveBounce(null), 500);
  };

  return (
    <section ref={containerRef} className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="bg-gradient-to-br from-amber-50/50 via-white to-rose-50/30 rounded-3xl p-8 sm:p-12 border border-amber-200/60 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-12">
        {/* Left Column: Story & Cognitive Milestone */}
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-amber-700 bg-amber-100/70 px-3 py-1 rounded-full mb-3">
            <span>Playful Physics</span>
            <span>·</span>
            <span>Spatial Stacking</span>
          </div>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-stone-900 leading-tight">
            Building Blocks of Early Discovery
          </h2>
          <p className="text-stone-600 text-sm mt-3 leading-relaxed">
            Around month 9, babies transition from knocking objects over to deliberate vertical stacking.
            Our sustainably harvested wooden blocks feature beveled corners, lightweight solids, and non-toxic
            food-grade plant pigments that withstand endless tumble and restack cycles.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-6">
            <button
              onClick={handleTopple}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 active:scale-95 text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>🎲 Topple & Restack!</span>
            </button>
            <span className="text-xs text-stone-500">
              Tap any block individually to feel it bounce!
            </span>
          </div>
        </div>

        {/* Right Column: Interactive Stacking Physics Area */}
        <div className="relative w-full max-w-[340px] sm:max-w-[420px] h-[280px] bg-white/70 rounded-2xl border border-stone-200/70 p-4 flex items-center justify-center select-none overflow-hidden shadow-inner">
          {/* Ground Surface Shadow */}
          <div className="absolute bottom-6 w-4/5 h-4 bg-stone-300/40 rounded-full blur-xs" />

          {/* Stacking Blocks Grid */}
          <div className="relative w-full h-full flex items-center justify-center">
            {BLOCKS_DATA.map((block, idx) => {
              const pos = isStacked ? block.stackedOffset : block.toppledOffset;
              const isBouncing = activeBounce === block.id;

              return (
                <div
                  key={block.id}
                  onClick={() => handleBlockClick(block.id)}
                  style={{
                    transform: `translate(${pos.x}px, ${pos.y}px) rotate(${pos.rotate}deg) ${
                      isBouncing ? 'scale(1.2)' : 'scale(1)'
                    }`,
                    transition: `transform 0.65s cubic-bezier(0.34, 1.56, 0.64, 1) ${
                      isStacked ? `${idx * 0.08}s` : '0s'
                    }`,
                    backgroundColor: block.color,
                    borderColor: block.borderColor,
                    color: block.textColor,
                  }}
                  className="absolute w-16 h-16 sm:w-18 sm:h-18 rounded-2xl border-2 flex items-center justify-center shadow-md cursor-pointer hover:brightness-105 active:scale-95"
                  title={`Block ${block.label} - click to bounce!`}
                >
                  {/* Subtle 3D Bevel highlight */}
                  <div className="absolute inset-1 rounded-xl border border-white/60 pointer-events-none" />
                  <span className="font-['Outfit'] font-bold text-2xl sm:text-3xl select-none">
                    {block.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

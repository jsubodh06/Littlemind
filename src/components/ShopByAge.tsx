import React, { useState } from 'react';
import { AgeRange } from '../types';
import { soundManager } from '../utils/audio';

interface ShopByAgeProps {
  selectedAge: AgeRange | 'all';
  onSelectAge: (age: AgeRange | 'all') => void;
}

interface AgeTile {
  range: AgeRange;
  label: string;
  stage: string;
  description: string;
  bgGradient: string;
  accentColor: string;
  itemCount: number;
}

const AGE_TILES: AgeTile[] = [
  {
    range: '0-6m',
    label: '0 - 6 Months',
    stage: 'Sensory & Sleep',
    description: 'High-contrast visuals, gentle rattles & organic swaddles',
    bgGradient: 'from-sky-50 to-blue-50/60',
    accentColor: '#0284C7',
    itemCount: 8,
  },
  {
    range: '6-12m',
    label: '6 - 12 Months',
    stage: 'Crawling & Teething',
    description: 'Smooth beechwood graspers, soft blocks & plush companions',
    bgGradient: 'from-amber-50 to-orange-50/60',
    accentColor: '#D97706',
    itemCount: 12,
  },
  {
    range: '1-2y',
    label: '1 - 2 Years',
    stage: 'Stacking & Steps',
    description: 'First wooden walkers, shape sorting & rhythm drums',
    bgGradient: 'from-rose-50 to-pink-50/60',
    accentColor: '#E11D48',
    itemCount: 15,
  },
  {
    range: '2-4y',
    label: '2 - 4 Years',
    stage: 'Imagination & STEM',
    description: 'Creative building sets, balance boards & toddler puzzles',
    bgGradient: 'from-emerald-50 to-teal-50/60',
    accentColor: '#059669',
    itemCount: 10,
  },
];

export const ShopByAge: React.FC<ShopByAgeProps> = ({ selectedAge, onSelectAge }) => {
  const [peekState, setPeekState] = useState<Record<string, boolean>>({});

  const togglePeek = (range: string, isPeeking: boolean) => {
    setPeekState((prev) => ({ ...prev, [range]: isPeeking }));
    if (isPeeking) {
      soundManager.playGiggle();
    }
  };

  return (
    <section id="shop-by-age" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
            Milestone Journey
          </span>
          <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
            Shop by Developmental Stage
          </h2>
          <p className="text-sm text-stone-500 mt-1 max-w-xl">
            Toys thoughtfully engineered for every milestone of your baby’s first years.
          </p>
        </div>

        {selectedAge !== 'all' && (
          <button
            onClick={() => onSelectAge('all')}
            className="mt-4 md:mt-0 text-xs font-medium text-stone-600 hover:text-stone-900 underline underline-offset-4 self-start md:self-auto cursor-pointer"
          >
            Show All Ages
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {AGE_TILES.map((tile) => {
          const isSelected = selectedAge === tile.range;
          const isPeeking = !!peekState[tile.range];

          return (
            <div
              key={tile.range}
              onClick={() => onSelectAge(isSelected ? 'all' : tile.range)}
              onMouseEnter={() => togglePeek(tile.range, true)}
              onMouseLeave={() => togglePeek(tile.range, false)}
              className={`relative bg-gradient-to-b ${tile.bgGradient} rounded-3xl p-6 border transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between min-h-[260px] group ${
                isSelected
                  ? 'border-stone-900 shadow-md ring-2 ring-stone-900/10 -translate-y-1'
                  : 'border-stone-200/80 hover:border-stone-400 hover:shadow-sm hover:-translate-y-1'
              }`}
            >
              {/* Peek-a-Boo Interactive Character Zone */}
              <div className="relative h-28 w-full flex items-center justify-center select-none overflow-hidden">
                {/* Peek-a-boo "Boo!" Speech bubble */}
                <div
                  className={`absolute top-0 z-20 transition-all duration-300 ${
                    isPeeking
                      ? 'opacity-100 scale-100 -translate-y-1'
                      : 'opacity-0 scale-75 translate-y-3 pointer-events-none'
                  }`}
                >
                  <span className="bg-white/95 text-stone-800 font-bold text-xs px-2.5 py-1 rounded-full shadow-md border border-stone-200">
                    Boo! 🤗
                  </span>
                </div>

                {/* Baby Head springing up from hiding */}
                <div
                  className={`absolute transition-all duration-300 ease-out z-10 ${
                    isPeeking ? 'translate-y-1 scale-105' : 'translate-y-8 scale-90'
                  }`}
                >
                  <svg viewBox="0 0 100 80" className="w-20 h-16">
                    {/* Head */}
                    <circle cx="50" cy="40" r="30" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.2" />
                    {/* Rosy Cheeks */}
                    <circle cx="34" cy="45" r="5" fill="#FDA4AF" />
                    <circle cx="66" cy="45" r="5" fill="#FDA4AF" />
                    {/* Eyes */}
                    {isPeeking ? (
                      <>
                        <circle cx="40" cy="36" r="3.5" fill="#1E293B" />
                        <circle cx="60" cy="36" r="3.5" fill="#1E293B" />
                        <circle cx="39" cy="35" r="1.2" fill="#FFFFFF" />
                        <circle cx="59" cy="35" r="1.2" fill="#FFFFFF" />
                      </>
                    ) : (
                      <>
                        {/* Shy closed eyes while hiding */}
                        <path d="M36 38 Q40 42 44 38" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
                        <path d="M56 38 Q60 42 64 38" stroke="#1E293B" strokeWidth="2" fill="none" strokeLinecap="round" />
                      </>
                    )}
                    {/* Smile */}
                    <path d="M44 48 Q50 54 56 48" stroke="#E11D48" strokeWidth="2" fill="none" strokeLinecap="round" />
                  </svg>
                </div>

                {/* Cloud / Blanket Cover hiding the baby */}
                <div
                  className={`absolute bottom-0 w-full flex justify-center z-15 transition-transform duration-300 ${
                    isPeeking ? 'translate-y-4 opacity-80' : 'translate-y-0 opacity-100'
                  }`}
                >
                  <svg viewBox="0 0 160 60" className="w-36 h-14 drop-shadow-xs">
                    <path
                      d="M20 50 C10 50 10 35 25 32 C22 20 40 18 48 24 C55 14 75 14 82 22 C90 12 110 12 118 22 C125 16 142 18 140 32 C155 35 155 50 145 50 Z"
                      fill="#FFFFFF"
                      stroke="#E2E8F0"
                      strokeWidth="1.5"
                    />
                  </svg>
                </div>
              </div>

              {/* Text Info */}
              <div className="mt-4">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-stone-500">
                  {tile.label}
                </span>
                <h3 className="font-['Outfit'] text-lg font-bold text-stone-900 mt-0.5">
                  {tile.stage}
                </h3>
                <p className="text-xs text-stone-600 mt-1 leading-relaxed line-clamp-2">
                  {tile.description}
                </p>
              </div>

              {/* Action indicator */}
              <div className="mt-4 pt-3 border-t border-stone-200/60 flex items-center justify-between text-xs font-semibold">
                <span className="text-stone-500">{tile.itemCount} Toys</span>
                <span className={`transition-transform duration-200 ${isSelected ? 'text-stone-900 underline' : 'text-stone-600 group-hover:translate-x-1'}`}>
                  {isSelected ? 'Selected ✓' : 'Explore →'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

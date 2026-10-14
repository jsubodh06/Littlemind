import React from 'react';

interface PageLoaderProps {
  onDismiss?: () => void;
  isOverlay?: boolean;
}

export const PageLoader: React.FC<PageLoaderProps> = ({ onDismiss, isOverlay = false }) => {
  return (
    <div
      className={`${
        isOverlay ? 'fixed inset-0 z-50 bg-[#FFFDF9]/95 backdrop-blur-md' : 'py-20'
      } flex flex-col items-center justify-center p-6 text-center select-none`}
    >
      {/* Rocking Cradle & Bouncing Pastel Ball Animation */}
      <div className="relative w-40 h-32 flex items-center justify-center mb-4">
        {/* Bouncing Pastel Ball */}
        <div className="absolute top-2 w-7 h-7 bg-gradient-to-tr from-amber-300 to-rose-300 rounded-full shadow-xs animate-bounce" />

        {/* Rocking Wooden Cradle */}
        <svg viewBox="0 0 140 100" className="w-32 h-24 overflow-visible animate-cradle">
          {/* Cradle Rocker Bottom Runners */}
          <path
            d="M15 80 Q70 105 125 80"
            stroke="#92400E"
            strokeWidth="5"
            strokeLinecap="round"
            fill="none"
          />
          {/* Vertical Rocker Slats */}
          <line x1="28" y1="52" x2="28" y2="82" stroke="#B45309" strokeWidth="3" />
          <line x1="50" y1="52" x2="50" y2="88" stroke="#B45309" strokeWidth="3" />
          <line x1="70" y1="52" x2="70" y2="90" stroke="#B45309" strokeWidth="3" />
          <line x1="90" y1="52" x2="90" y2="88" stroke="#B45309" strokeWidth="3" />
          <line x1="112" y1="52" x2="112" y2="82" stroke="#B45309" strokeWidth="3" />

          {/* Cradle Crib Basket */}
          <rect x="20" y="38" width="100" height="34" rx="10" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />

          {/* Soft Blanket Draped Over Edge */}
          <path
            d="M30 42 Q40 50 50 42 Q60 50 70 42"
            stroke="#93C5FD"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          />

          {/* Little Star Pendant Hanging */}
          <circle cx="110" cy="46" r="3" fill="#F43F5E" />
        </svg>
      </div>

      <h3 className="font-['Outfit'] font-bold text-lg sm:text-xl text-stone-800 tracking-tight">
        Getting things ready for little ones...
      </h3>
      <p className="text-xs text-stone-500 mt-1 max-w-xs leading-relaxed">
        Smoothing beechwood blocks, stitching soft swaddles & tuning lullaby chimes.
      </p>

      {isOverlay && onDismiss && (
        <button
          onClick={onDismiss}
          className="mt-6 py-2 px-4 bg-stone-900 hover:bg-stone-800 text-white text-xs font-medium rounded-xl transition-colors cursor-pointer"
        >
          Enter Nursery Now →
        </button>
      )}
    </div>
  );
};

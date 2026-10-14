import React from 'react';

export const FloatingHeroItems: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
      {/* 1. Floating Rattle (Top Left) */}
      <div
        className="absolute top-12 left-[6%] sm:left-[10%] animate-float-medium opacity-85"
        style={{ animationDelay: '0.4s' }}
      >
        <svg viewBox="0 0 50 50" className="w-10 sm:w-12 h-10 sm:h-12 drop-shadow-sm -rotate-12">
          <circle cx="20" cy="18" r="14" fill="#A7F3D0" stroke="#059669" strokeWidth="1.5" />
          <circle cx="20" cy="18" r="9" fill="#ECFDF5" />
          <rect x="22" y="26" width="6" height="20" rx="3" fill="#D97706" />
          <circle cx="25" cy="46" r="4" fill="#B45309" />
          <circle cx="16" cy="16" r="2" fill="#059669" />
          <circle cx="24" cy="16" r="2" fill="#059669" />
        </svg>
      </div>

      {/* 2. Floating Teddy (Top Right) */}
      <div
        className="absolute top-16 right-[8%] sm:right-[12%] animate-float-slow opacity-90"
        style={{ animationDelay: '1.2s' }}
      >
        <svg viewBox="0 0 50 50" className="w-12 sm:w-14 h-12 sm:h-14 drop-shadow-sm rotate-6">
          {/* Ears */}
          <circle cx="14" cy="14" r="7" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="36" cy="14" r="7" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
          <circle cx="14" cy="14" r="4" fill="#FECDD3" />
          <circle cx="36" cy="14" r="4" fill="#FECDD3" />
          {/* Head */}
          <circle cx="25" cy="27" r="17" fill="#FDE68A" stroke="#D97706" strokeWidth="1.2" />
          {/* Muzzle */}
          <ellipse cx="25" cy="31" rx="8" ry="6" fill="#FFFBEB" />
          <circle cx="20" cy="25" r="2" fill="#78350F" />
          <circle cx="30" cy="25" r="2" fill="#78350F" />
          <ellipse cx="25" cy="29" rx="2" ry="1.5" fill="#78350F" />
          <circle cx="14" cy="29" r="2.5" fill="#FDA4AF" opacity="0.8" />
          <circle cx="36" cy="29" r="2.5" fill="#FDA4AF" opacity="0.8" />
        </svg>
      </div>

      {/* 3. Floating Pacifier (Mid Left) */}
      <div
        className="absolute top-[48%] left-[4%] sm:left-[8%] animate-float-fast opacity-85"
        style={{ animationDelay: '0.8s' }}
      >
        <svg viewBox="0 0 50 50" className="w-9 sm:w-11 h-9 sm:h-11 drop-shadow-sm rotate-15">
          {/* Shield */}
          <rect x="12" y="14" width="26" height="20" rx="10" fill="#FBCFE8" stroke="#F43F5E" strokeWidth="1.5" />
          {/* Teat */}
          <circle cx="25" cy="8" r="8" fill="#FDE68A" opacity="0.9" />
          {/* Ring */}
          <circle cx="25" cy="38" r="8" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
          <circle cx="20" cy="24" r="2.5" fill="#FFFFFF" />
          <circle cx="30" cy="24" r="2.5" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 4. Floating Building Block "A" (Mid Right) */}
      <div
        className="absolute top-[45%] right-[5%] sm:right-[9%] animate-float-medium opacity-90"
        style={{ animationDelay: '1.8s' }}
      >
        <svg viewBox="0 0 50 50" className="w-10 sm:w-12 h-10 sm:h-12 drop-shadow-sm -rotate-8">
          <rect x="8" y="8" width="34" height="34" rx="6" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="1.8" />
          <text
            x="25"
            y="32"
            textAnchor="middle"
            fontFamily="Outfit, sans-serif"
            fontWeight="bold"
            fontSize="22"
            fill="#1D4ED8"
          >
            A
          </text>
        </svg>
      </div>

      {/* 5. Baby Bottle (Bottom Left) */}
      <div
        className="absolute bottom-20 left-[10%] sm:left-[14%] animate-float-slow opacity-80"
        style={{ animationDelay: '2.4s' }}
      >
        <svg viewBox="0 0 40 60" className="w-8 sm:w-10 h-12 sm:h-14 drop-shadow-sm rotate-12">
          {/* Nipple */}
          <ellipse cx="20" cy="8" rx="6" ry="6" fill="#FDE68A" />
          {/* Collar ring */}
          <rect x="12" y="12" width="16" height="6" rx="2" fill="#67E8F9" />
          {/* Bottle Body */}
          <rect x="10" y="18" width="20" height="38" rx="5" fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.2" />
          <line x1="22" y1="28" x2="27" y2="28" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="22" y1="36" x2="27" y2="36" stroke="#0284C7" strokeWidth="1.5" />
          <line x1="22" y1="44" x2="27" y2="44" stroke="#0284C7" strokeWidth="1.5" />
        </svg>
      </div>

      {/* 6. Tiny Baby Sock (Bottom Right) */}
      <div
        className="absolute bottom-24 right-[11%] sm:right-[15%] animate-float-fast opacity-85"
        style={{ animationDelay: '0.2s' }}
      >
        <svg viewBox="0 0 45 50" className="w-8 sm:w-10 h-9 sm:h-11 drop-shadow-sm -rotate-15">
          {/* Sock Cuff */}
          <rect x="12" y="6" width="18" height="8" rx="2" fill="#FED7AA" stroke="#F97316" strokeWidth="1.2" />
          {/* Sock Body */}
          <path
            d="M14 14 L14 30 C14 38 22 42 32 40 C38 38 38 30 32 26 L26 26 L26 14 Z"
            fill="#FECDD3"
            stroke="#F43F5E"
            strokeWidth="1.2"
          />
          {/* Tiny white heart on ankle */}
          <path d="M20 20 Q18 17 16 19 Q16 23 20 25 Q24 23 24 19 Q22 17 20 20 Z" fill="#FFFFFF" />
        </svg>
      </div>

      {/* 7. Soft Cloud (High Center-Left) */}
      <div
        className="absolute top-28 left-[24%] sm:left-[28%] animate-float-slow opacity-60 hidden md:block"
        style={{ animationDelay: '2.1s' }}
      >
        <svg viewBox="0 0 50 30" className="w-14 h-9">
          <path
            d="M10 24 C4 24 2 18 8 16 C7 11 14 9 19 12 C23 7 32 7 35 13 C41 13 43 19 38 23 Z"
            fill="#F1F5F9"
          />
        </svg>
      </div>

      {/* 8. Twinkling Star (High Center-Right) */}
      <div
        className="absolute top-24 right-[25%] sm:right-[30%] animate-float-medium opacity-70 hidden md:block"
        style={{ animationDelay: '1.5s' }}
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6">
          <path
            d="M12 2 L14 8 L20 10 L15 14 L17 21 L12 17 L7 21 L9 14 L4 10 L10 8 Z"
            fill="#FEF08A"
            stroke="#F59E0B"
            strokeWidth="1"
          />
        </svg>
      </div>
    </div>
  );
};

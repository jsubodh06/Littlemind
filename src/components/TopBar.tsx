import React from 'react';
import { soundManager } from '../utils/audio';

interface TopBarProps {
  cartCount: number;
  wishlistCount: number;
  isCartBouncing: boolean;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  isMuted: boolean;
  onToggleMute: () => void;
  isReducedMotion: boolean;
  onToggleReducedMotion: () => void;
  onPreviewLoader: () => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  cartCount,
  wishlistCount,
  isCartBouncing,
  onOpenCart,
  onOpenWishlist,
  isMuted,
  onToggleMute,
  isReducedMotion,
  onToggleReducedMotion,
  onPreviewLoader,
}) => {
  return (
    <header className="sticky top-9 z-40 bg-[#FFFDF9]/90 backdrop-blur-md border-b border-stone-200/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8">
        {/* Zone 1: Single Text Element Wordmark */}
        <a
          href="/"
          className="font-['Outfit'] text-xl sm:text-2xl font-bold tracking-tight text-stone-900 whitespace-nowrap shrink-0 flex items-center gap-2 group"
        >
          <span className="w-8 h-8 rounded-xl bg-amber-100 flex items-center justify-center text-base group-hover:rotate-12 transition-transform">
            🍼
          </span>
          <span>Lullaby & Co.</span>
        </a>

        {/* Zone 2: 4–5 Single-Line Concise Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-stone-600">
          <a
            href="#shop-by-age"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Shop by Age
          </a>
          <a
            href="#bestsellers"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Bestsellers
          </a>
          <a
            href="#growth-tracker"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Growth Tracker
          </a>
          <a
            href="#milestones-quiz"
            className="hover:text-stone-900 transition-colors whitespace-nowrap shrink-0"
          >
            Milestone Quiz
          </a>
        </nav>

        {/* Zone 3: Primary Actions (Sound, Motion, Wishlist, Cart with Happy Bounce) */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {/* Sound Toggle (Muted by default as requested) */}
          <button
            onClick={onToggleMute}
            className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1 cursor-pointer ${
              !isMuted
                ? 'bg-amber-100/70 border-amber-300 text-amber-900'
                : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-800'
            }`}
            title={isMuted ? 'Turn Sound On (Soft Chimes)' : 'Mute Sound'}
          >
            <span>{isMuted ? '🔇' : '🎵'}</span>
            <span className="hidden xl:inline text-[11px]">{isMuted ? 'Muted' : 'Sound On'}</span>
          </button>

          {/* Motion Toggle */}
          <button
            onClick={onToggleReducedMotion}
            className={`p-2 rounded-xl text-xs font-medium border transition-colors flex items-center gap-1 cursor-pointer ${
              isReducedMotion
                ? 'bg-purple-100/70 border-purple-300 text-purple-900'
                : 'bg-stone-50 border-stone-200 text-stone-500 hover:text-stone-800'
            }`}
            title={isReducedMotion ? 'Motion: Reduced' : 'Motion: Playful'}
          >
            <span>{isReducedMotion ? '🍃' : '✨'}</span>
            <span className="hidden xl:inline text-[11px]">{isReducedMotion ? 'Gentle' : 'Playful'}</span>
          </button>

          {/* Loader Preview Test Button */}
          <button
            onClick={onPreviewLoader}
            className="hidden lg:flex items-center gap-1 p-2 rounded-xl text-xs font-medium bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-600 cursor-pointer"
            title="Preview Rocking Cradle Loader"
          >
            <span>🛏️</span>
            <span className="text-[11px]">Loader</span>
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 sm:px-3 sm:py-2 rounded-xl text-xs font-medium bg-stone-50 hover:bg-rose-50 border border-stone-200 text-stone-700 hover:text-rose-600 transition-colors flex items-center gap-1.5 cursor-pointer"
            title="View Wishlist"
          >
            <span className="text-sm">♥</span>
            {wishlistCount > 0 && (
              <span className="font-mono text-[11px] font-bold bg-rose-500 text-white w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Shopping Cart Button with Happy Squash & Stretch Bounce */}
          <button
            id="header-cart-button"
            onClick={onOpenCart}
            className={`flex items-center gap-2 px-3.5 sm:px-4 py-2 bg-stone-900 hover:bg-stone-800 active:scale-95 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer ${
              isCartBouncing ? 'animate-cart-bounce' : ''
            }`}
            title="View Cart"
          >
            <span className="text-sm">🧺</span>
            <span className="hidden sm:inline">Bag</span>
            <span className="font-mono bg-amber-400 text-stone-900 px-1.5 py-0.2 rounded-full text-[11px] font-bold">
              {cartCount}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};

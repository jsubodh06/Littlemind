import React, { useState } from 'react';
import { Product } from '../types';
import { ProductIllustration } from './ProductIllustrations';
import { soundManager } from '../utils/audio';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  onQuickView: (product: Product) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onQuickView,
  isWishlisted,
  onToggleWishlist,
}) => {
  const [floatingHearts, setFloatingHearts] = useState<{ id: number; x: number }[]>([]);
  const [isWobbling, setIsWobbling] = useState(false);

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    soundManager.playBubblePop();
    onToggleWishlist(product.id);

    // Spawn tiny floating hearts
    const heartId = Date.now();
    setFloatingHearts((prev) => [
      ...prev,
      { id: heartId, x: Math.random() * 20 - 10 },
      { id: heartId + 1, x: Math.random() * 20 - 10 },
    ]);

    setTimeout(() => {
      setFloatingHearts((prev) => prev.filter((h) => h.id !== heartId && h.id !== heartId + 1));
    }, 1000);
  };

  const handleCartClick = (e: React.MouseEvent) => {
    soundManager.playRattle();
    setIsWobbling(true);
    setTimeout(() => setIsWobbling(false), 500);
    onAddToCart(product, e);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-3xl p-5 border border-stone-200/80 shadow-xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:-rotate-1 cursor-pointer flex flex-col justify-between"
    >
      {/* Top Bar: Hanging Tag Badge & Wishlist Button */}
      <div className="flex items-start justify-between relative z-10 -mt-1 mb-2">
        {/* Swaying Hanging Tag Badge */}
        {product.badge ? (
          <div className="flex flex-col items-center animate-tag-sway">
            {/* Hanging String */}
            <div className="w-0.5 h-3 bg-stone-300" />
            <span className="bg-stone-900 text-amber-200 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-xs whitespace-nowrap">
              {product.badge}
            </span>
          </div>
        ) : (
          <div />
        )}

        {/* Wishlist Heart with Mini Floating Hearts */}
        <div className="relative">
          <button
            onClick={handleHeartClick}
            className="w-9 h-9 rounded-full bg-stone-50 hover:bg-rose-50 text-stone-400 hover:text-rose-500 flex items-center justify-center transition-colors shadow-xs active:scale-90"
            title={isWishlisted ? 'Remove from nursery wishlist' : 'Save to nursery wishlist'}
          >
            <svg
              viewBox="0 0 24 24"
              className={`w-5 h-5 transition-transform ${
                isWishlisted ? 'fill-rose-500 text-rose-500 scale-110' : 'fill-none stroke-current stroke-2'
              }`}
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
          </button>

          {/* Floating mini hearts on pop */}
          {floatingHearts.map((h) => (
            <span
              key={h.id}
              style={{ left: `${h.x}px` }}
              className="absolute -top-4 text-xs text-rose-500 animate-[float-up-fade_0.9s_ease-out_forwards] pointer-events-none"
            >
              ❤️
            </span>
          ))}
        </div>
      </div>

      {/* Product Image Area with Gentle Cradle Tilt */}
      <div className="relative w-full aspect-4/3 rounded-2xl bg-gradient-to-b from-stone-50/80 to-stone-100/40 p-4 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-amber-50/20 transition-colors">
        <ProductIllustration type={product.imageType} className="w-full h-full object-contain drop-shadow-xs group-hover:scale-105 transition-transform duration-300" />

        {/* Quick View Pill Overlay on Hover */}
        <div className="absolute inset-0 bg-stone-900/10 backdrop-blur-[1px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <span className="bg-white/95 text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md border border-stone-200">
            Quick View 🔍
          </span>
        </div>
      </div>

      {/* Metadata & Title */}
      <div>
        <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
          <span className="font-medium text-amber-700">{product.ageLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{product.category}</span>
        </div>

        <h3 className="font-['Outfit'] text-base font-bold text-stone-900 leading-snug group-hover:text-amber-800 transition-colors line-clamp-1">
          {product.name}
        </h3>

        <p className="text-xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">
          {product.description}
        </p>
      </div>

      {/* Pricing & Add to Cart Action */}
      <div className="mt-5 pt-3 border-t border-stone-100 flex items-center justify-between gap-3">
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="font-mono text-lg font-bold text-stone-900 tabular-nums">
              ₹{product.price}
            </span>
            {product.originalPrice && (
              <span className="font-mono text-xs text-stone-400 line-through tabular-nums">
                ₹{product.originalPrice}
              </span>
            )}
          </div>
          <span className="text-[11px] text-emerald-600 font-medium">In Stock</span>
        </div>

        {/* Wobbling Rattle Add-to-Cart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleCartClick(e);
          }}
          onMouseEnter={() => soundManager.playRattle()}
          className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold text-stone-900 bg-amber-200 hover:bg-amber-300 active:scale-95 transition-all shadow-xs group/btn cursor-pointer ${
            isWobbling ? 'animate-[rattle-wiggle_0.5s_ease-in-out]' : 'hover:animate-[rattle-wiggle_0.6s_ease-in-out_infinite]'
          }`}
          title="Add to cart - wiggles like a rattle!"
        >
          {/* Toy Rattle / Teddy Icon */}
          <span className="text-sm transition-transform group-hover/btn:rotate-12">
            🧸
          </span>
          <span className="whitespace-nowrap">Add to Cart</span>
        </button>
      </div>
    </div>
  );
};

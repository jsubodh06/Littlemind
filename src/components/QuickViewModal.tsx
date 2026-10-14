import React, { useEffect } from 'react';
import { Product } from '../types';
import { ProductIllustration } from './ProductIllustrations';
import { soundManager } from '../utils/audio';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist,
}) => {
  useEffect(() => {
    if (product) {
      soundManager.playBubblePop();
    }
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl border border-stone-200 relative animate-popcorn overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 flex items-center justify-center text-base transition-colors"
        >
          ✕
        </button>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 items-center">
          {/* Product Illustration Display */}
          <div className="relative aspect-square rounded-2xl bg-gradient-to-b from-amber-50/40 to-stone-100/50 p-6 flex items-center justify-center border border-amber-100/70">
            <ProductIllustration type={product.imageType} className="w-full h-full object-contain drop-shadow-sm" />
            {product.badge && (
              <span className="absolute top-3 left-3 bg-stone-900 text-amber-200 text-[10px] font-semibold tracking-wider uppercase px-2.5 py-1 rounded-sm shadow-xs">
                {product.badge}
              </span>
            )}
          </div>

          {/* Details & Popcorn Skill Chips */}
          <div className="flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-xs text-stone-500 mb-1">
                <span className="font-semibold text-amber-700">{product.ageLabel}</span>
                <span>·</span>
                <span>{product.category}</span>
              </div>

              <h3 className="font-['Outfit'] text-2xl font-bold text-stone-900 leading-snug">
                {product.name}
              </h3>

              <div className="flex items-baseline gap-2 mt-2">
                <span className="font-mono text-2xl font-bold text-stone-900 tabular-nums">
                  ₹{product.price}
                </span>
                {product.originalPrice && (
                  <span className="font-mono text-sm text-stone-400 line-through tabular-nums">
                    ₹{product.originalPrice}
                  </span>
                )}
                <span className="text-xs text-emerald-700 font-semibold bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full ml-1">
                  Free Shipping over ₹999
                </span>
              </div>

              <p className="text-stone-600 text-xs sm:text-sm mt-3 leading-relaxed">
                {product.description}
              </p>

              {/* Popcorn Bouncing Skill Chips */}
              <div className="mt-5">
                <div className="text-[11px] font-semibold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                  <span>🍿 Key Developmental Skills</span>
                  <span className="text-[10px] text-stone-400 font-normal">(bouncing popcorn chips)</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {product.skills.map((skill, idx) => (
                    <span
                      key={skill}
                      style={{ animationDelay: `${idx * 120 + 80}ms` }}
                      className="animate-popcorn px-3 py-1 bg-amber-100/70 text-amber-900 border border-amber-200 text-xs font-semibold rounded-full shadow-2xs hover:scale-105 transition-transform"
                    >
                      ✨ {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Material info */}
              <div className="mt-4 pt-3 border-t border-stone-100 text-xs text-stone-500">
                <span className="font-medium text-stone-700">Materials: </span>
                {product.material}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex items-center gap-3">
              <button
                onClick={(e) => {
                  onAddToCart(product, e);
                  onClose();
                }}
                className="flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold text-stone-900 bg-amber-300 hover:bg-amber-400 active:scale-95 transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>🧸</span>
                <span>Add to Nursery Cart</span>
              </button>

              <button
                onClick={() => onToggleWishlist(product.id)}
                className={`w-12 h-12 rounded-xl border flex items-center justify-center transition-colors ${
                  isWishlisted
                    ? 'bg-rose-50 border-rose-200 text-rose-500'
                    : 'border-stone-200 hover:bg-stone-50 text-stone-500'
                }`}
                title="Save to wishlist"
              >
                ♥
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

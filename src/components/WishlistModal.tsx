import React from 'react';
import { Product } from '../types';
import { ProductIllustration } from './ProductIllustrations';

interface WishlistModalProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (id: string) => void;
  onAddToCart: (product: Product, e: React.MouseEvent) => void;
}

export const WishlistModal: React.FC<WishlistModalProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/40 backdrop-blur-xs select-none">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 relative animate-popcorn max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-4">
          <div className="flex items-center gap-2">
            <span className="text-rose-500 text-lg">♥</span>
            <h3 className="font-['Outfit'] font-bold text-lg text-stone-900">
              Nursery Wishlist ({wishlistProducts.length})
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center text-sm"
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {wishlistProducts.length === 0 ? (
            <div className="py-12 text-center text-stone-500 text-xs">
              <span className="text-3xl block mb-2">🧸</span>
              No items in your nursery wishlist yet. Tap the heart on any toy!
            </div>
          ) : (
            wishlistProducts.map((p) => (
              <div
                key={p.id}
                className="flex items-center gap-3 p-3 bg-stone-50 rounded-2xl border border-stone-100"
              >
                <div className="w-14 h-14 rounded-xl bg-white p-2 shrink-0 border border-stone-100 flex items-center justify-center">
                  <ProductIllustration type={p.imageType} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-['Outfit'] font-bold text-stone-900 text-xs truncate">
                    {p.name}
                  </h4>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                      ₹{p.price}
                    </span>
                    <span className="text-[11px] text-stone-500">{p.ageLabel}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      onAddToCart(p, e);
                      onRemoveWishlist(p.id);
                    }}
                    className="px-3 py-1.5 bg-amber-200 hover:bg-amber-300 text-stone-900 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
                  >
                    Move to Bag
                  </button>
                  <button
                    onClick={() => onRemoveWishlist(p.id)}
                    className="text-stone-400 hover:text-stone-600 text-xs p-1"
                    title="Remove from wishlist"
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

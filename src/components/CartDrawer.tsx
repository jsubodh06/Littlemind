import React, { useEffect, useState } from 'react';
import { CartItem } from '../types';
import { ProductIllustration } from './ProductIllustrations';
import { soundManager } from '../utils/audio';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onProceedCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onProceedCheckout,
}) => {
  const [hasCelebratedGift, setHasCelebratedGift] = useState(false);
  const FREE_GIFT_THRESHOLD = 999;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const progressPercent = Math.min((subtotal / FREE_GIFT_THRESHOLD) * 100, 100);
  const remainingForGift = Math.max(FREE_GIFT_THRESHOLD - subtotal, 0);
  const isGiftUnlocked = subtotal >= FREE_GIFT_THRESHOLD;

  useEffect(() => {
    if (isGiftUnlocked && !hasCelebratedGift) {
      soundManager.playCelebration();
      setHasCelebratedGift(true);
    } else if (!isGiftUnlocked && hasCelebratedGift) {
      setHasCelebratedGift(false);
    }
  }, [isGiftUnlocked, hasCelebratedGift]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden select-none">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-stone-900/40 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over Drawer Panel */}
      <div className="absolute inset-y-0 right-0 max-w-md w-full bg-white shadow-2xl border-l border-stone-200 flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-5 border-b border-stone-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🧺</span>
            <h2 className="font-['Outfit'] font-bold text-lg text-stone-900">
              Nursery Shopping Bag ({items.reduce((acc, i) => acc + i.quantity, 0)})
            </h2>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center transition-colors"
          >
            ✕
          </button>
        </div>

        {/* Free Gift Milestone Progress Bar (Stork / Teddy Walking) */}
        <div className="bg-amber-50/70 p-4 border-b border-amber-100/80">
          <div className="flex items-center justify-between text-xs font-semibold mb-1.5">
            <span className="text-stone-700">
              {isGiftUnlocked ? (
                <span className="text-emerald-700 font-bold flex items-center gap-1">
                  <span>✨</span> Free Bunny Rattle Unlocked!
                </span>
              ) : (
                <span>Add ₹{remainingForGift} more for Free Gift!</span>
              )}
            </span>
            <span className="font-mono text-stone-500">₹{subtotal} / ₹{FREE_GIFT_THRESHOLD}</span>
          </div>

          {/* Progress Track */}
          <div className="relative w-full h-2.5 bg-amber-200/50 rounded-full">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                isGiftUnlocked
                  ? 'bg-gradient-to-r from-emerald-400 to-teal-400'
                  : 'bg-gradient-to-r from-amber-400 to-rose-400'
              }`}
              style={{ width: `${progressPercent}%` }}
            />

            {/* Walking Stork / Teddy figure on progress bar */}
            <div
              className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 transition-all duration-500"
              style={{ left: `${Math.min(Math.max(progressPercent, 4), 96)}%` }}
            >
              <div className="relative -top-3 flex flex-col items-center">
                <span className={`text-base ${isGiftUnlocked ? 'animate-bounce' : 'animate-float-fast'}`}>
                  {isGiftUnlocked ? '🎉' : '🧸'}
                </span>
              </div>
            </div>
          </div>

          {/* Sparkles celebration when unlocked */}
          {isGiftUnlocked && (
            <div className="mt-2 text-[11px] text-emerald-800 font-medium bg-emerald-100/70 py-1 px-2.5 rounded-lg border border-emerald-200 flex items-center gap-1.5 animate-popcorn">
              <span>🎁</span>
              <span>Congratulations! An Organic Bunny Rattle is added free!</span>
            </div>
          )}
        </div>

        {/* Cart Item List or Sleepy Baby Empty State */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            /* Sleepy Baby Empty State */
            <div className="h-full flex flex-col items-center justify-center text-center p-6 select-none">
              <div className="relative w-36 h-36 flex items-center justify-center mb-4">
                {/* Floating "Zzz" Letters */}
                <div className="absolute top-2 right-4 flex flex-col items-end pointer-events-none">
                  <span className="text-stone-400 font-['Outfit'] font-bold text-lg animate-[zzz-drift_2.4s_ease-in-out_infinite]" style={{ animationDelay: '0s' }}>
                    Z
                  </span>
                  <span className="text-stone-400 font-['Outfit'] font-bold text-sm animate-[zzz-drift_2.4s_ease-in-out_infinite]" style={{ animationDelay: '0.6s' }}>
                    z
                  </span>
                  <span className="text-stone-400 font-['Outfit'] font-bold text-xs animate-[zzz-drift_2.4s_ease-in-out_infinite]" style={{ animationDelay: '1.2s' }}>
                    z
                  </span>
                </div>

                {/* Sleepy Baby Character SVG */}
                <svg viewBox="0 0 120 120" className="w-32 h-32 animate-cradle-gentle">
                  {/* Soft cloud cushion */}
                  <ellipse cx="60" cy="85" rx="42" ry="16" fill="#F1F5F9" stroke="#E2E8F0" strokeWidth="1.5" />
                  {/* Swaddled Baby Blanket */}
                  <ellipse cx="60" cy="65" rx="30" ry="24" fill="#E0F2FE" stroke="#BAE6FD" strokeWidth="1.5" />
                  {/* Baby Head */}
                  <circle cx="60" cy="45" r="22" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.2" />
                  {/* Nightcap / Beanie */}
                  <path d="M42 42 C45 22 75 22 78 42 Z" fill="#FECDD3" stroke="#FDA4AF" strokeWidth="1.2" />
                  <circle cx="60" cy="22" r="5" fill="#FFFFFF" />
                  {/* Closed Sleepy Eyelashes */}
                  <path d="M50 48 Q54 52 58 48" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  <path d="M62 48 Q66 52 70 48" stroke="#1E293B" strokeWidth="1.8" fill="none" strokeLinecap="round" />
                  {/* Rosy Cheeks */}
                  <circle cx="48" cy="53" r="3.5" fill="#FDA4AF" />
                  <circle cx="72" cy="53" r="3.5" fill="#FDA4AF" />
                  {/* Pacifier */}
                  <circle cx="60" cy="56" r="4" fill="#FEF08A" stroke="#FBBF24" strokeWidth="1" />
                  <circle cx="60" cy="56" r="6" fill="none" stroke="#FBBF24" strokeWidth="1" />
                </svg>
              </div>

              <h3 className="font-['Outfit'] font-bold text-lg text-stone-900 mb-1">
                Your cart is napping.
              </h3>
              <p className="text-xs text-stone-500 max-w-xs leading-relaxed mb-6">
                Wake it up with something fun! Explore developmental wooden stackers, cozy swaddles, and gentle rattles.
              </p>
              <button
                onClick={onClose}
                className="py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold rounded-xl shadow-xs transition-colors cursor-pointer"
              >
                Browse Little Essentials
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-3.5 p-3.5 bg-stone-50/70 rounded-2xl border border-stone-200/60"
                >
                  {/* Image */}
                  <div className="w-18 h-18 rounded-xl bg-white p-2 flex items-center justify-center shrink-0 border border-stone-100">
                    <ProductIllustration type={item.product.imageType} className="w-full h-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-['Outfit'] font-bold text-stone-900 text-xs sm:text-sm line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-stone-400 hover:text-stone-600 text-xs"
                          title="Remove item"
                        >
                          ✕
                        </button>
                      </div>
                      <span className="text-[11px] text-stone-500">
                        {item.product.ageLabel}
                      </span>
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <span className="font-mono text-xs font-bold text-stone-900 tabular-nums">
                        ₹{item.product.price * item.quantity}
                      </span>

                      {/* Quantity Stepper */}
                      <div className="flex items-center gap-1.5 bg-white border border-stone-200 rounded-lg px-2 py-0.5">
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-stone-500 hover:text-stone-800 font-bold px-1 text-xs"
                        >
                          -
                        </button>
                        <span className="font-mono text-xs font-semibold px-1 tabular-nums">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-stone-500 hover:text-stone-800 font-bold px-1 text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Checkout Summary */}
        {items.length > 0 && (
          <div className="p-5 border-t border-stone-100 bg-stone-50/50">
            <div className="space-y-1.5 mb-4 text-xs">
              <div className="flex justify-between text-stone-500">
                <span>Subtotal</span>
                <span className="font-mono font-medium text-stone-900 tabular-nums">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-stone-500">
                <span>Shipping</span>
                <span className="font-medium text-emerald-600">
                  {subtotal >= 999 ? 'FREE' : '₹99'}
                </span>
              </div>
              {isGiftUnlocked && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Organic Bunny Rattle (Gift)</span>
                  <span className="font-mono tabular-nums">₹0</span>
                </div>
              )}
              <div className="flex justify-between text-stone-900 font-bold text-sm pt-2 border-t border-stone-200">
                <span>Total</span>
                <span className="font-mono tabular-nums">₹{subtotal >= 999 ? subtotal : subtotal + 99}</span>
              </div>
            </div>

            <button
              onClick={onProceedCheckout}
              className="w-full py-3 bg-stone-900 hover:bg-stone-800 active:scale-98 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <span>→</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

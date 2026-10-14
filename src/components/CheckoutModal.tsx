import React, { useState } from 'react';
import { CartItem } from '../types';
import { soundManager } from '../utils/audio';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [formData, setFormData] = useState({
    name: 'Ananya Sharma',
    phone: '+91 98765 43210',
    address: 'Flat 402, Lotus Bloom Apartments, Indiranagar',
    city: 'Bengaluru',
    pincode: '560038',
    paymentMethod: 'cod',
  });

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const total = subtotal >= 999 ? subtotal : subtotal + 99;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsConfirmed(true);
    soundManager.playCelebration();
    onOrderSuccess();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-xs select-none overflow-y-auto">
      <div className="bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-stone-200 relative overflow-hidden animate-popcorn my-8">
        {!isConfirmed ? (
          /* Checkout Form */
          <div>
            <div className="flex items-center justify-between pb-4 border-b border-stone-100 mb-5">
              <div>
                <span className="text-xs font-semibold text-amber-700 uppercase tracking-wider">
                  Safe & Gentle Delivery
                </span>
                <h3 className="font-['Outfit'] text-xl font-bold text-stone-900">
                  Nursery Order Checkout
                </h3>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-500 flex items-center justify-center text-sm"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Parent / Guardian Full Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-700 mb-1">
                    Postal PIN Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                    className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1">
                  Delivery Address
                </label>
                <textarea
                  rows={2}
                  required
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="w-full px-3.5 py-2 text-xs rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-amber-300"
                />
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-medium text-stone-700 mb-1.5">
                  Payment Method
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-amber-300 bg-amber-50/50 cursor-pointer text-xs font-medium text-stone-800">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'cod'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className="accent-amber-500"
                    />
                    <span>Cash on Delivery</span>
                  </label>
                  <label className="flex items-center gap-2 p-3 rounded-xl border border-stone-200 bg-white cursor-pointer text-xs font-medium text-stone-800">
                    <input
                      type="radio"
                      name="payment"
                      checked={formData.paymentMethod === 'upi'}
                      onChange={() => setFormData({ ...formData, paymentMethod: 'upi' })}
                      className="accent-amber-500"
                    />
                    <span>UPI / Card</span>
                  </label>
                </div>
              </div>

              {/* Summary */}
              <div className="p-3.5 bg-stone-50 rounded-xl space-y-1 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Subtotal ({items.length} items)</span>
                  <span className="font-mono text-stone-900 tabular-nums">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Shipping</span>
                  <span className="font-medium text-emerald-600">
                    {subtotal >= 999 ? 'FREE' : '₹99'}
                  </span>
                </div>
                <div className="flex justify-between font-bold text-stone-900 text-sm pt-1 border-t border-stone-200">
                  <span>Grand Total</span>
                  <span className="font-mono tabular-nums">₹{total}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-stone-900 hover:bg-stone-800 active:scale-98 text-white font-semibold text-xs sm:text-sm rounded-xl transition-all shadow-xs flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Place Nursery Order</span>
                <span>✨</span>
              </button>
            </form>
          </div>
        ) : (
          /* Order Confirmation with Clapping Baby, Balloons & Confetti */
          <div className="text-center py-4 relative">
            {/* Rising Pastel Balloons */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {[
                { color: '#FDA4AF', left: '10%', delay: '0s', size: 36 },
                { color: '#93C5FD', left: '30%', delay: '0.4s', size: 42 },
                { color: '#FDE68A', left: '70%', delay: '0.2s', size: 40 },
                { color: '#A7F3D0', left: '88%', delay: '0.6s', size: 38 },
              ].map((balloon, idx) => (
                <div
                  key={idx}
                  style={{
                    left: balloon.left,
                    animation: `float-up-fade 4s ease-out infinite`,
                    animationDelay: balloon.delay,
                  }}
                  className="absolute bottom-0"
                >
                  <svg viewBox="0 0 40 55" style={{ width: balloon.size, height: balloon.size * 1.3 }}>
                    <ellipse cx="20" cy="22" rx="16" ry="20" fill={balloon.color} opacity="0.85" />
                    <polygon points="17,42 23,42 20,45" fill={balloon.color} />
                    <line x1="20" y1="45" x2="20" y2="54" stroke="#CBD5E1" strokeWidth="1" />
                  </svg>
                </div>
              ))}

              {/* Raining Confetti in Pastel Colors */}
              {Array.from({ length: 18 }).map((_, i) => {
                const pastelColors = ['#FBCFE8', '#BAE6FD', '#A7F3D0', '#FEF08A', '#DDD6FE'];
                const color = pastelColors[i % pastelColors.length];
                const left = `${(i * 5.5) + 3}%`;
                const delay = `${(i % 5) * 0.25}s`;
                const size = 6 + (i % 4) * 2;

                return (
                  <div
                    key={i}
                    style={{
                      left,
                      width: size,
                      height: size,
                      backgroundColor: color,
                      animation: `confetti-fall 3.2s linear infinite`,
                      animationDelay: delay,
                      borderRadius: i % 2 === 0 ? '50%' : '2px',
                    }}
                    className="absolute top-0 opacity-80"
                  />
                );
              })}
            </div>

            {/* Clapping Happy Baby Character */}
            <div className="w-24 h-24 mx-auto mb-3 flex items-center justify-center animate-baby-giggle">
              <svg viewBox="0 0 100 100" className="w-24 h-24">
                <circle cx="50" cy="50" r="32" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1.5" />
                <circle cx="36" cy="54" r="6" fill="#FDA4AF" />
                <circle cx="64" cy="54" r="6" fill="#FDA4AF" />
                {/* Clapping Hands */}
                <circle cx="42" cy="74" r="7" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
                <circle cx="58" cy="74" r="7" fill="#FED7AA" stroke="#FDBA74" strokeWidth="1" />
                {/* Cheerful Happy Arched Eyes */}
                <path d="M38 45 Q43 40 48 45" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                <path d="M52 45 Q57 40 62 45" stroke="#1E293B" strokeWidth="2.5" fill="none" strokeLinecap="round" />
                {/* Big Smile */}
                <path d="M43 58 Q50 67 57 58" stroke="#E11D48" strokeWidth="3" fill="none" strokeLinecap="round" />
                {/* Party Hat */}
                <polygon points="50,12 38,32 62,32" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1.2" />
                <circle cx="50" cy="12" r="3" fill="#F43F5E" />
              </svg>
            </div>

            <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              ✓ Order #LULLABY-8042 Confirmed
            </span>

            <h3 className="font-['Outfit'] text-2xl font-bold text-stone-900 mt-2 mb-1">
              Yay! Nursery Joy Is on the Way!
            </h3>
            <p className="text-xs text-stone-600 max-w-sm mx-auto mb-5 leading-relaxed">
              We’ve received your order and our baby care team is lovingly hand-packing your items in recyclable cotton pouches.
            </p>

            <div className="bg-stone-50 rounded-2xl p-4 text-xs text-left space-y-1.5 mb-6 border border-stone-200/70">
              <div className="flex justify-between">
                <span className="text-stone-500">Recipient:</span>
                <span className="font-semibold text-stone-800">{formData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Delivery Est.:</span>
                <span className="font-semibold text-stone-800">In 2 - 3 business days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-stone-500">Payment:</span>
                <span className="font-semibold text-stone-800 uppercase">{formData.paymentMethod} (₹{total})</span>
              </div>
            </div>

            <button
              onClick={() => {
                setIsConfirmed(false);
                onClose();
              }}
              className="py-2.5 px-6 bg-stone-900 hover:bg-stone-800 text-white font-semibold text-xs rounded-xl shadow-xs transition-colors cursor-pointer"
            >
              Back to Storefront
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

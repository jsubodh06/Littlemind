/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Product, CartItem, AgeRange, FlyingItem } from './types';
import { PRODUCTS } from './data/products';
import { TopBar } from './components/TopBar';
import { CrawlingScrollBar } from './components/CrawlingScrollBar';
import { CribMobile } from './components/CribMobile';
import { PeekingBaby } from './components/PeekingBaby';
import { FloatingHeroItems } from './components/FloatingHeroItems';
import { BubblePopOverlay } from './components/BubblePopOverlay';
import { FootprintTrail } from './components/FootprintTrail';
import { FlyingItemOverlay } from './components/FlyingItemOverlay';
import { ShopByAge } from './components/ShopByAge';
import { StackingBlocks } from './components/StackingBlocks';
import { CrawlingDivider } from './components/CrawlingDivider';
import { ProductCard } from './components/ProductCard';
import { QuickViewModal } from './components/QuickViewModal';
import { GrowthTracker } from './components/GrowthTracker';
import { AgeQuiz } from './components/AgeQuiz';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistModal } from './components/WishlistModal';
import { PageLoader } from './components/PageLoader';
import { Footer } from './components/Footer';
import { soundManager } from './utils/audio';

export default function App() {
  // Navigation & Filtering
  const [selectedAge, setSelectedAge] = useState<AgeRange | 'all'>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');

  // Cart & Wishlist state
  const [cartItems, setCartItems] = useState<CartItem[]>([
    { product: PRODUCTS[0], quantity: 1 }, // pre-seeded so users see the progress bar immediately
  ]);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-3']);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Animations & Toggles
  const [flyingItems, setFlyingItems] = useState<FlyingItem[]>([]);
  const [isCartBouncing, setIsCartBouncing] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [showPageLoaderPreview, setShowPageLoaderPreview] = useState(false);

  // Check system prefers-reduced-motion
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mediaQuery.matches) {
        setIsReducedMotion(true);
      }
    }
  }, []);

  const handleToggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    soundManager.setMuted(nextState);
    if (!nextState) {
      soundManager.playMobileChime();
    }
  };

  const handleToggleReducedMotion = () => {
    setIsReducedMotion((prev) => !prev);
  };

  // Add to cart with flying item parabolic trajectory
  const handleAddToCart = (product: Product, e: React.MouseEvent) => {
    // 1. Update Cart Items
    setCartItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });

    // 2. Compute Trajectory Arc into Header Cart Button
    const cartButton = document.getElementById('header-cart-button');
    let targetX = window.innerWidth - 60;
    let targetY = 30;

    if (cartButton) {
      const rect = cartButton.getBoundingClientRect();
      targetX = rect.left + rect.width / 2;
      targetY = rect.top + rect.height / 2;
    }

    const clickX = e.clientX || window.innerWidth / 2;
    const clickY = e.clientY || window.innerHeight / 2;

    const newFlyingItem: FlyingItem = {
      id: `${Date.now()}-${Math.random()}`,
      startX: clickX,
      startY: clickY,
      endX: targetX,
      endY: targetY,
      type: Math.random() > 0.5 ? 'teddy' : 'star',
    };

    setFlyingItems((prev) => [...prev, newFlyingItem]);
  };

  const handleFlyingItemComplete = (id: string) => {
    setFlyingItems((prev) => prev.filter((item) => item.id !== id));
    // Trigger happy cart bounce
    setIsCartBouncing(true);
    setTimeout(() => setIsCartBouncing(false), 650);
  };

  const handleUpdateQuantity = (productId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => prev.filter((item) => item.product.id !== productId));
  };

  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Filter products
  const filteredProducts = PRODUCTS.filter((p) => {
    if (selectedAge !== 'all' && p.ageRange !== selectedAge) return false;
    if (categoryFilter === 'bestseller' && p.badge !== 'Best Seller') return false;
    if (categoryFilter === 'organic' && p.badge !== '100% Organic') return false;
    return true;
  });

  const wishlistProducts = PRODUCTS.filter((p) => wishlistIds.includes(p.id));
  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className={`min-h-screen bg-[#FFFDF9] text-stone-800 flex flex-col relative ${isReducedMotion ? 'reduced-motion' : ''}`}>
      {/* 1. Crawling Baby Scroll Progress Bar at Top Window Edge */}
      <CrawlingScrollBar />

      {/* 2. Top Navigation Bar (3-Zone Contract) */}
      <TopBar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        isCartBouncing={isCartBouncing}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
        isReducedMotion={isReducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        onPreviewLoader={() => setShowPageLoaderPreview(true)}
      />

      {/* 3. Hero Section with Hanging Mobile, Floating Items, and Peeking Baby */}
      <section className="relative pt-6 pb-20 sm:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-between min-h-[580px] sm:min-h-[640px] overflow-hidden">
        {/* Floating Drifting Baby Items at Varied Speeds */}
        <FloatingHeroItems />

        {/* Top Hanging Crib Mobile (swings & spins on tap with chime) */}
        <div className="z-10 mt-2 mb-4">
          <CribMobile />
        </div>

        {/* Hero Content Block */}
        <div className="relative z-10 text-center max-w-3xl mx-auto my-auto py-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-100/80 border border-amber-200/90 text-amber-900 text-xs font-semibold mb-4 shadow-2xs">
            <span>✨</span>
            <span>Heirloom Wooden Toys & Organic Nursery Goods</span>
          </div>

          <h1 className="font-['Outfit'] text-3xl sm:text-5xl lg:text-6xl font-bold text-stone-900 tracking-tight leading-[1.15] text-balance">
            Little Wonders for Wonderfully Little People.
          </h1>

          <p className="mt-4 text-stone-600 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Thoughtfully crafted sensory play, smooth beechwood stackers, and cloud-soft organic essentials
            designed to support your baby’s natural milestone rhythm.
          </p>

          <div className="mt-7 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#shop-by-age"
              className="px-6 py-3 bg-stone-900 hover:bg-stone-800 text-white font-medium text-xs sm:text-sm rounded-xl shadow-xs transition-all hover:scale-102 active:scale-98"
            >
              Explore Milestone Stages
            </a>
            <a
              href="#milestones-quiz"
              className="px-5 py-3 bg-amber-200 hover:bg-amber-300 text-stone-900 font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-all hover:scale-102 active:scale-98 flex items-center gap-1.5"
            >
              <span>🧸 Take 30s Age Quiz</span>
            </a>
          </div>

          <div className="mt-6 flex items-center justify-center gap-4 text-xs text-stone-500 font-medium">
            <span>✓ Non-Toxic Vegetable Dyes</span>
            <span>·</span>
            <span>✓ Free Bunny Rattle over ₹999</span>
            <span>·</span>
            <span>✓ Hypoallergenic</span>
          </div>
        </div>

        {/* Peeking Baby Character at Bottom of Hero (Eye-Tracking, Blinking, Waving, Giggling) */}
        <div className="relative z-10 mt-2">
          <PeekingBaby />
        </div>
      </section>

      {/* 4. Peek-a-boo "Shop by Age" Tiles */}
      <ShopByAge selectedAge={selectedAge} onSelectAge={setSelectedAge} />

      {/* 5. Crawling Baby Section Divider (Continuous Crawl + Somersault & Giggle on Click) */}
      <CrawlingDivider />

      {/* 6. Bouncing Stacking Blocks Physics Section */}
      <StackingBlocks />

      {/* 7. Featured Products Catalog */}
      <section id="bestsellers" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-700">
              Heirloom Collection
            </span>
            <h2 className="font-['Outfit'] text-2xl sm:text-3xl font-bold text-stone-900 mt-1">
              Handcrafted Nursery Essentials
            </h2>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Cards tilt gently on hover. Wobble the rattle button to watch toys fly to your bag!
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-stone-100 rounded-xl border border-stone-200/60 self-start sm:self-auto">
            <button
              onClick={() => {
                setCategoryFilter('all');
                setSelectedAge('all');
              }}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                categoryFilter === 'all' && selectedAge === 'all'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              All Toys
            </button>
            <button
              onClick={() => setCategoryFilter('bestseller')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                categoryFilter === 'bestseller'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              Bestsellers
            </button>
            <button
              onClick={() => setCategoryFilter('organic')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors cursor-pointer ${
                categoryFilter === 'organic'
                  ? 'bg-white text-stone-900 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              100% Organic
            </button>
          </div>
        </div>

        {/* Product Cards Grid with Rocking Cradle Tilt & Swaying Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              onQuickView={(p) => setQuickViewProduct(p)}
              isWishlisted={wishlistIds.includes(product.id)}
              onToggleWishlist={handleToggleWishlist}
            />
          ))}
        </div>
      </section>

      {/* 8. Baby Growth Tracker (Weight & Height Line Chart and Milestone Memories) */}
      <GrowthTracker />

      {/* 9. Interactive Age & Milestone Quiz with Reaction Baby & Unwrapping Gift Boxes */}
      <AgeQuiz onAddToCart={handleAddToCart} />

      {/* 9. Boutique Footer */}
      <Footer />

      {/* 10. Ambient Bubble Pop Overlay */}
      <BubblePopOverlay />

      {/* 11. Desktop Footprint Cursor Trail */}
      <FootprintTrail />

      {/* 12. Flying Item Parabolic Trajectory Animation into Cart */}
      <FlyingItemOverlay items={flyingItems} onComplete={handleFlyingItemComplete} />

      {/* 13. Quick View Modal with Popcorn Bouncing Skill Chips */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        isWishlisted={quickViewProduct ? wishlistIds.includes(quickViewProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 14. Slide-Over Cart Drawer with Walking Teddy/Stork Progress Bar */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* 15. Checkout & Order Confirmation Modal (Balloons, Clapping Baby & Pastel Confetti) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={() => {
          setCartItems([]);
        }}
      />

      {/* 16. Nursery Wishlist Modal */}
      <WishlistModal
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistProducts}
        onRemoveWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* 17. Page Loader Preview Modal */}
      {showPageLoaderPreview && (
        <PageLoader isOverlay onDismiss={() => setShowPageLoaderPreview(false)} />
      )}
    </div>
  );
}

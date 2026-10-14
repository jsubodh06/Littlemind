import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-t border-stone-800 select-none">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 pb-12 border-b border-stone-800">
        {/* Brand & Mission */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-2 mb-3">
            <span className="w-8 h-8 rounded-xl bg-amber-200/20 text-amber-300 flex items-center justify-center text-base">
              🍼
            </span>
            <span className="font-['Outfit'] text-xl font-bold text-white tracking-tight">
              Lullaby & Co.
            </span>
          </div>
          <p className="text-xs text-stone-400 leading-relaxed">
            Crafting heirloom-quality toys and organic nursery essentials designed around the scientific wonder
            of early child development.
          </p>
          <div className="mt-4 flex items-center gap-3 text-stone-400 text-xs">
            <span>🇩🇪 ASTM Safety Certified</span>
            <span>·</span>
            <span>🌿 100% GOTS Cotton</span>
          </div>
        </div>

        {/* Milestone Stages */}
        <div>
          <h4 className="font-['Outfit'] text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Play Milestones
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><a href="#shop-by-age" className="hover:text-amber-300 transition-colors">0 – 6 Months: First Gazes & Rattles</a></li>
            <li><a href="#shop-by-age" className="hover:text-amber-300 transition-colors">6 – 12 Months: Grasping & Crawling</a></li>
            <li><a href="#shop-by-age" className="hover:text-amber-300 transition-colors">1 – 2 Years: Stacking & First Steps</a></li>
            <li><a href="#shop-by-age" className="hover:text-amber-300 transition-colors">2+ Years: STEM & Musical Rhythm</a></li>
          </ul>
        </div>

        {/* Nursery Care */}
        <div>
          <h4 className="font-['Outfit'] text-sm font-semibold text-white uppercase tracking-wider mb-3">
            Parent Support
          </h4>
          <ul className="space-y-2 text-xs text-stone-400">
            <li><span className="hover:text-amber-300 transition-colors cursor-pointer">Toy Cleaning & Natural Care Guide</span></li>
            <li><span className="hover:text-amber-300 transition-colors cursor-pointer">Safe Sleep Pediatric Standards</span></li>
            <li><span className="hover:text-amber-300 transition-colors cursor-pointer">Heirloom Warranty & Returns</span></li>
            <li><span className="hover:text-amber-300 transition-colors cursor-pointer">Gift Registry & Nursery Concierge</span></li>
          </ul>
        </div>

        {/* Milestone Letter */}
        <div>
          <h4 className="font-['Outfit'] text-sm font-semibold text-white uppercase tracking-wider mb-3">
            The Milestone Letter
          </h4>
          <p className="text-xs text-stone-400 mb-3 leading-relaxed">
            Gentle tips, sleep lullaby playlists, and early developmental play ideas delivered monthly.
          </p>
          <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to Lullaby & Co.! ✨'); }} className="flex gap-2">
            <input
              type="email"
              required
              placeholder="parent@example.com"
              className="bg-stone-800 text-xs text-white px-3 py-2 rounded-xl border border-stone-700 focus:outline-none focus:border-amber-400 flex-1"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-semibold text-xs rounded-xl transition-colors cursor-pointer"
            >
              Join
            </button>
          </form>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 gap-4">
        <p>© 2026 Lullaby & Co. Nursery Boutique. All rights reserved.</p>
        <div className="flex items-center gap-4">
          <span className="hover:text-stone-300 transition-colors cursor-pointer">Privacy Charter</span>
          <span>·</span>
          <span className="hover:text-stone-300 transition-colors cursor-pointer">Terms of Gentle Care</span>
          <span>·</span>
          <span className="hover:text-stone-300 transition-colors cursor-pointer">Sustainability Report</span>
        </div>
      </div>
    </footer>
  );
};

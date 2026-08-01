import React from 'react';
import { NavTab } from '../types';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenOrderModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenOrderModal }) => {
  return (
    <footer className="bg-[#1b1c1a] text-[#fbf9f5] pt-16 pb-12 px-6 md:px-16 border-t border-[#825425]/30">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-1">
          <h3 className="font-headline-md text-2xl font-bold mb-4 text-[#e6ded9]">Fresh Bakers</h3>
          <p className="font-body-md text-[#d5c3b6] text-sm leading-relaxed mb-6">
            Slow-fermented sourdoughs and laminated butter pastries crafted daily with organic, stone-ground flour.
          </p>
          <div className="flex items-center gap-2 text-[#c68e5a] text-xs uppercase font-semibold tracking-wider">
            <span className="w-2 h-2 rounded-full bg-[#825425] animate-pulse"></span>
            Oven Fired Fresh Daily
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="font-label-caps text-xs text-[#c68e5a] tracking-widest uppercase mb-4">Explore</h4>
          <ul className="space-y-3 font-body-md text-sm text-[#d5c3b6]">
            <li>
              <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Home Overview
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('products'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Our Daily Bake Menu
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Our Story & Heritage
              </button>
            </li>
            <li>
              <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
                Visit Bakery & Map
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Hours & Location */}
        <div>
          <h4 className="font-label-caps text-xs text-[#c68e5a] tracking-widest uppercase mb-4">Bakery Hearth</h4>
          <p className="font-body-md text-sm text-[#d5c3b6] mb-2">142 Artisan Boulevard</p>
          <p className="font-body-md text-sm text-[#d5c3b6] mb-4">Mill District, Flour Town</p>
          <p className="text-xs text-[#837469] font-medium uppercase tracking-wider mb-1">Baking Schedule</p>
          <p className="font-body-md text-sm text-[#d5c3b6]">Tue – Sun: 7:00 AM – 4:00 PM</p>
          <p className="font-body-md text-xs text-[#837469]">Closed Mondays for starter refresh</p>
        </div>

        {/* Col 4: WhatsApp Pre-Orders */}
        <div>
          <h4 className="font-label-caps text-xs text-[#c68e5a] tracking-widest uppercase mb-4">Direct Orders</h4>
          <p className="font-body-md text-sm text-[#d5c3b6] mb-4">
            Reserve your sourdough loaves or pastry boxes for morning pickup via WhatsApp.
          </p>
          <button
            onClick={onOpenOrderModal}
            className="w-full btn-primary bg-[#825425] hover:bg-[#673d10] text-white py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp Pre-Order
          </button>
        </div>
      </div>

      <div className="max-w-[1200px] mx-auto pt-8 border-t border-[#837469]/30 flex flex-col md:flex-row justify-between items-center text-xs text-[#837469] gap-4">
        <p>© 2026 Fresh Bakers Co. Handcrafted artisan sourdoughs & baked goods.</p>
        <div className="flex gap-6">
          <span className="hover:text-[#d5c3b6] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#d5c3b6] cursor-pointer">Terms of Service</span>
          <span className="hover:text-[#d5c3b6] cursor-pointer">Instagram @freshbakers</span>
        </div>
      </div>
    </footer>
  );
};

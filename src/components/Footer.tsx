import React from 'react';
import { NavTab } from '../types';
import { Wheat, Lock, MapPin, Clock, MessageSquare, Instagram, ShieldCheck } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenOrderModal: () => void;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenOrderModal, onOpenAdminModal }) => {
  return (
    <footer className="bg-[#16110d] text-[#faf6f0] pt-20 pb-12 px-6 md:px-16 border-t border-[#c59b27]/30 relative overflow-hidden">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#825425]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#d4a373] to-[#c59b27] text-[#16110d] flex items-center justify-center shadow-lg">
              <Wheat className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#faf6f0] leading-none">Fresh Bakers</h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#d4a373] block mt-1 font-semibold">
                Artisan Hearth & Gifting
              </span>
            </div>
          </div>
          <p className="font-body-md text-[#dccbbb] text-sm leading-relaxed mb-6">
            Slow-fermented sourdoughs, handcrafted viennoiserie, and artisan celebration cakes baked fresh daily with stone-ground heirloom grains.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#2d2118] px-3.5 py-1.5 rounded-full border border-[#c59b27]/30 text-[#d4a373] text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#c59b27] animate-pulse" />
            Oven Fired Fresh Daily
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="font-label-caps text-xs text-[#d4a373] tracking-[0.2em] uppercase mb-5 font-bold flex items-center gap-2">
            Explore Menu
          </h4>
          <ul className="space-y-3 font-body-md text-sm text-[#dccbbb]">
            <li>
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5"
              >
                <span>Home Overview</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5"
              >
                <span>Our Daily Bake Menu</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5"
              >
                <span>Heritage & Ethos</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#d4a373] transition-colors flex items-center gap-1.5"
              >
                <span>Visit Bakery & Map</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Hours & Location */}
        <div>
          <h4 className="font-label-caps text-xs text-[#d4a373] tracking-[0.2em] uppercase mb-5 font-bold flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#d4a373]" /> Bakery Hearth
          </h4>
          <p className="font-body-md text-sm text-[#faf6f0] font-medium mb-1">142 Artisan Boulevard</p>
          <p className="font-body-md text-sm text-[#a38f7d] mb-4">Mill District, Flour Town</p>
          
          <div className="pt-3 border-t border-white/10">
            <p className="text-[11px] text-[#d4a373] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Baking Schedule
            </p>
            <p className="font-body-md text-sm text-[#faf6f0]">Tue – Sun: 7:00 AM – 4:00 PM</p>
            <p className="font-body-md text-xs text-[#a38f7d] mt-0.5">Closed Mondays for wild starter refresh</p>
          </div>
        </div>

        {/* Col 4: WhatsApp Pre-Orders */}
        <div>
          <h4 className="font-label-caps text-xs text-[#d4a373] tracking-[0.2em] uppercase mb-5 font-bold flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#d4a373]" /> Direct Orders
          </h4>
          <p className="font-body-md text-sm text-[#dccbbb] mb-5 leading-relaxed">
            Reserve your sourdough loaves, pastries, or celebration boxes for morning pickup via WhatsApp.
          </p>
          <button
            onClick={onOpenOrderModal}
            className="w-full btn-gold py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2 font-bold shadow-lg"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp Pre-Order
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#a38f7d] gap-4 relative z-10">
        <p>© 2026 Fresh Bakers Co. Handcrafted artisan sourdoughs & gifting catalog.</p>
        <div className="flex flex-wrap gap-6 items-center">
          {onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              className="hover:text-[#d4a373] transition-colors font-semibold flex items-center gap-1"
            >
              <Lock className="w-3 h-3 text-[#d4a373]" /> Admin Portal
            </button>
          )}
          <span className="hover:text-[#faf6f0] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#faf6f0] cursor-pointer">Terms of Service</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#d4a373] transition-colors flex items-center gap-1"
          >
            <Instagram className="w-3.5 h-3.5" /> @freshbakers
          </a>
        </div>
      </div>
    </footer>
  );
};


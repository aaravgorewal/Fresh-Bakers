import React from 'react';
import { NavTab } from '../types';
import { Cake, Lock, MapPin, Clock, MessageSquare, Instagram } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenOrderModal: () => void;
  onOpenAdminModal?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, onOpenOrderModal, onOpenAdminModal }) => {
  return (
    <footer className="bg-[#24140A] text-[#FAF6F0] pt-20 pb-12 px-6 md:px-16 border-t border-[#D97706]/30 relative overflow-hidden font-sans">
      {/* Subtle Background Glow Accent */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#5C2E14]/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-[1280px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16 relative z-10">
        {/* Col 1: Brand Info */}
        <div className="md:col-span-1">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D97706] to-[#5C2E14] text-[#FAF6F0] flex items-center justify-center shadow-lg border border-[#D97706]/40">
              <Cake className="w-5 h-5 text-[#FAF6F0]" />
            </div>
            <div>
              <h3 className="font-serif-display text-2xl font-bold text-[#FAF6F0] leading-none">Fresh Bakers</h3>
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#D97706] block mt-1 font-bold">
                Indian Bakery & Gifting
              </span>
            </div>
          </div>
          <p className="font-body-md text-[#E5D7C9] text-sm leading-relaxed mb-6">
            Delicious celebration cakes, authentic rasmalai fusion gateaux, bento boxes, and luxury hampers baked fresh daily with pure dairy ingredients.
          </p>
          <div className="inline-flex items-center gap-2 bg-[#3D1C0A] px-3.5 py-1.5 rounded-full border border-[#D97706]/30 text-[#D97706] text-xs font-semibold tracking-wider uppercase">
            <span className="w-2 h-2 rounded-full bg-[#15803D] animate-pulse" />
            Fresh Baked Daily
          </div>
        </div>

        {/* Col 2: Navigation */}
        <div>
          <h4 className="font-label-caps text-xs text-[#D97706] tracking-[0.2em] uppercase mb-5 font-bold flex items-center gap-2">
            Explore Menu
          </h4>
          <ul className="space-y-3 font-body-md text-sm text-[#E5D7C9]">
            <li>
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#D97706] transition-colors flex items-center gap-1.5 cursor-pointer"
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
                className="hover:text-[#D97706] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Our Bakery Catalog</span>
              </button>
            </li>
            <li>
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="hover:text-[#D97706] transition-colors flex items-center gap-1.5 cursor-pointer"
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
                className="hover:text-[#D97706] transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                <span>Visit Bakery & Map</span>
              </button>
            </li>
          </ul>
        </div>

        {/* Col 3: Hours & Location */}
        <div>
          <h4 className="font-label-caps text-xs text-[#D97706] tracking-[0.2em] uppercase mb-5 font-bold flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#D97706]" /> Bakery Location
          </h4>
          <p className="font-body-md text-sm text-[#FAF6F0] font-medium mb-1">Jansath Road</p>
          <p className="font-body-md text-sm text-[#E5D7C9] mb-4">Almaspur, Muzaffarnagar District</p>

          <div className="pt-3 border-t border-white/10">
            <p className="text-[11px] text-[#D97706] font-bold uppercase tracking-wider mb-1 flex items-center gap-1">
              <Clock className="w-3 h-3" /> Bakery Hours
            </p>
            <p className="font-body-md text-sm text-[#FAF6F0]">Mon – Sun: 8:00 AM – 10:00 PM</p>
            <p className="font-body-md text-xs text-[#E5D7C9] mt-0.5">Fresh bakes ready every morning</p>
          </div>
        </div>

        {/* Col 4: WhatsApp Pre-Orders */}
        <div>
          <h4 className="font-label-caps text-xs text-[#D97706] tracking-[0.2em] uppercase mb-5 font-bold flex items-center gap-2">
            <MessageSquare className="w-3.5 h-3.5 text-[#D97706]" /> Direct Orders
          </h4>
          <p className="font-body-md text-sm text-[#E5D7C9] mb-5 leading-relaxed">
            Reserve your celebration cakes, birthday hampers, or sweet boxes for quick pickup or delivery via WhatsApp.
          </p>
          <button
            onClick={onOpenOrderModal}
            className="w-full btn-gold py-3 text-xs tracking-widest uppercase flex items-center justify-center gap-2 font-bold shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp Pre-Order
          </button>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-xs text-[#E5D7C9] gap-4 relative z-10">
        <p>© 2026 Fresh Bakers Co. Powered By <a href="https://www.linkedin.com/in/aaravgorewal/" target="_blank" rel="noopener noreferrer" className="hover:text-[#D97706] transition-colors font-semibold flex items-center gap-1 cursor-pointer" >AaravSaini</a></p>
        <div className="flex flex-wrap gap-6 items-center">
          {onOpenAdminModal && (
            <button
              onClick={onOpenAdminModal}
              className="hover:text-[#D97706] transition-colors font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Lock className="w-3 h-3 text-[#D97706]" /> Admin Portal
            </button>
          )}
          <span className="hover:text-[#FAF6F0] cursor-pointer">Privacy Policy</span>
          <span className="hover:text-[#FAF6F0] cursor-pointer">Terms of Service</span>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-[#D97706] transition-colors flex items-center gap-1"
          >
            <Instagram className="w-3.5 h-3.5" /> @freshbakers
          </a>
        </div>
      </div>
    </footer>
  );
};

import React, { useState } from 'react';
import { NavTab } from '../types';
import { ShoppingBag, Menu, X, Lock, Wheat, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface NavbarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  onOpenOrderModal: () => void;
  onOpenAdminModal: () => void;
  cartCount: number;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenOrderModal,
  onOpenAdminModal,
  cartCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Our Menu' },
    { id: 'about', label: 'Heritage & Ethos' },
    { id: 'contact', label: 'Visit & Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-[#faf6f0]/85 backdrop-blur-md border-b border-[#e8dec9]/80 transition-all duration-300">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-8 py-3.5 flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#825425] to-[#673d10] text-[#faf6f0] flex items-center justify-center shadow-md shadow-[#825425]/20 group-hover:scale-105 transition-transform duration-300">
            <Wheat className="w-5 h-5 text-[#d4a373]" />
          </div>
          <div>
            <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#1f1610] group-hover:text-[#825425] transition-colors block leading-none">
              Fresh Bakers
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-semibold text-[#a38f7d] block mt-0.5">
              Artisan Hearth & Gifting
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#f4ebe1]/80 p-1.5 rounded-full border border-[#e8dec9] shadow-inner">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#ffffff] shadow-md'
                    : 'text-[#6e5d4f] hover:text-[#1f1610] hover:bg-white/50'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#825425] to-[#673d10] rounded-full"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Actions (WhatsApp Order button, Cart Counter, & Admin Login) */}
        <div className="flex items-center gap-2.5">
          {/* Cart Counter Button */}
          {cartCount > 0 && (
            <motion.button
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              onClick={onOpenOrderModal}
              className="relative p-2.5 bg-gradient-to-br from-[#d4a373]/20 to-[#825425]/20 hover:from-[#d4a373]/30 hover:to-[#825425]/30 text-[#825425] rounded-full transition-colors flex items-center justify-center border border-[#d4a373]/40"
              title="View WhatsApp Order Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#825425] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#faf6f0] shadow-sm">
                {cartCount}
              </span>
            </motion.button>
          )}

          {/* Primary WhatsApp Order Button */}
          <button
            onClick={onOpenOrderModal}
            className="btn-primary text-[11px] flex items-center gap-2 shadow-sm hover:shadow-md py-2.5 px-5"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span className="hidden sm:inline">Order via WhatsApp</span>
            <span className="sm:hidden">Order</span>
          </button>

          {/* Admin Login Button */}
          <button
            onClick={onOpenAdminModal}
            className="p-2.5 text-[#6e5d4f] hover:text-[#825425] hover:bg-[#f4ebe1] rounded-full transition-colors"
            title="Admin Dashboard"
          >
            <Lock className="w-4 h-4" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1f1610] hover:text-[#825425] rounded-full hover:bg-[#f4ebe1] transition-colors"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-[#e8dec9] bg-[#faf6f0]/95 backdrop-blur-lg overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-base py-2.5 px-4 rounded-xl transition-all flex items-center justify-between ${
                      isActive
                        ? 'bg-[#825425] text-white font-bold shadow-sm'
                        : 'text-[#1f1610] hover:bg-[#f4ebe1] font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#d4a373]" />}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-[#e8dec9] flex flex-col gap-2">
                <button
                  onClick={() => {
                    onOpenAdminModal();
                    setMobileMenuOpen(false);
                  }}
                  className="text-left text-xs py-2 px-4 text-[#825425] font-semibold flex items-center gap-2 hover:bg-[#f4ebe1] rounded-lg"
                >
                  <Lock className="w-4 h-4" /> Admin Portal & Firestore Manager
                </button>
                <div className="px-4 py-2 text-[11px] text-[#6e5d4f] flex justify-between items-center border-t border-[#e8dec9]/60">
                  <span>142 Artisan Blvd</span>
                  <span>Tue-Sun: 7am - 4pm</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


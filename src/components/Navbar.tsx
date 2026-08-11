import React, { useState } from 'react';
import { NavTab } from '../types';
import { ShoppingBag, Menu, X, Lock, Cake, Sparkles } from 'lucide-react';
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
    <header className="sticky top-0 z-50 w-full bg-[#FAF6F0]/90 backdrop-blur-md border-b border-[#F0E5DA] transition-all duration-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 xl:px-0 py-3.5 flex justify-between items-center gap-2">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="group flex items-center gap-3 text-left focus:outline-none cursor-pointer"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#5C2E14] to-[#3D1C0A] text-[#FAF6F0] flex items-center justify-center shadow-md shadow-[#5C2E14]/20 group-hover:scale-105 transition-transform duration-300 border border-[#D97706]/40">
            <Cake className="w-5 h-5 text-[#D97706]" />
          </div>
          <div>
            <span className="font-serif-display text-xl sm:text-2xl font-bold tracking-tight text-[#24140A] group-hover:text-[#5C2E14] transition-colors block leading-none">
              Fresh Bakers
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-[#D97706] block mt-0.5">
              Indian Bakery & Gifting
            </span>
          </div>
        </button>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-[#F4EBE1] p-1.5 rounded-full border border-[#F0E5DA] shadow-inner">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`relative px-5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 cursor-pointer ${
                  isActive
                    ? 'text-[#ffffff] shadow-md'
                    : 'text-[#6C584C] hover:text-[#24140A] hover:bg-white/60'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeNavTab"
                    className="absolute inset-0 bg-gradient-to-r from-[#5C2E14] to-[#3D1C0A] rounded-full"
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
              className="relative p-2.5 bg-gradient-to-br from-[#D97706]/20 to-[#5C2E14]/20 hover:from-[#D97706]/30 hover:to-[#5C2E14]/30 text-[#5C2E14] rounded-full transition-colors flex items-center justify-center border border-[#D97706]/40 cursor-pointer"
              title="View WhatsApp Order Cart"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 bg-[#5C2E14] text-white text-[10px] font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-[#FAF6F0] shadow-sm">
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

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2.5 text-[#24140A] hover:text-[#5C2E14] rounded-full hover:bg-[#F4EBE1] transition-colors cursor-pointer touch-target"
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
            className="md:hidden border-t border-[#F0E5DA] bg-[#FAF6F0]/98 backdrop-blur-lg overflow-hidden shadow-xl"
          >
            <div className="px-6 py-6 flex flex-col gap-3">
              {navItems.map((item) => {
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleNavClick(item.id)}
                    className={`text-left text-base py-3 px-4 rounded-xl transition-all flex items-center justify-between cursor-pointer ${
                      isActive
                        ? 'bg-[#5C2E14] text-white font-bold shadow-sm'
                        : 'text-[#24140A] hover:bg-[#F4EBE1] font-medium'
                    }`}
                  >
                    <span>{item.label}</span>
                    {isActive && <Sparkles className="w-4 h-4 text-[#D97706]" />}
                  </button>
                );
              })}
              <div className="pt-3 border-t border-[#F0E5DA] flex flex-col gap-2">
                <div className="px-4 py-2 text-[11px] text-[#6C584C] flex justify-between items-center border-t border-[#F0E5DA]">
                  <span>Crafting Sweetness Since 1998</span>
                  <span>8am - 10pm Daily</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};


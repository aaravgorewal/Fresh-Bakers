import React, { useState } from 'react';
import { NavTab } from '../types';
import { ShoppingBag, Menu, X, Lock } from 'lucide-react';

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
  cartCount
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems: { id: NavTab; label: string }[] = [
    { id: 'home', label: 'Home' },
    { id: 'products', label: 'Products' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  const handleNavClick = (tab: NavTab) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#fbf9f5]/95 backdrop-blur-sm border-b border-[#d5c3b6] px-5 md:px-16 py-4">
      <div className="max-w-[1200px] mx-auto flex justify-between items-center">
        {/* Brand Logo */}
        <button
          onClick={() => handleNavClick('home')}
          className="font-headline-sm text-2xl font-bold text-[#1b1c1a] hover:text-[#825425] transition-colors text-left"
        >
          Fresh Bakers
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 items-center font-body-md text-base tracking-wide">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`transition-colors duration-200 cursor-pointer ${
                  isActive
                    ? 'text-[#825425] font-bold italic border-b-2 border-[#825425] pb-0.5'
                    : 'text-[#51443a] hover:text-[#825425]'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {/* Actions (WhatsApp Order button, Cart Counter, & Admin Login) */}
        <div className="flex items-center gap-3">
          {cartCount > 0 && (
            <button
              onClick={onOpenOrderModal}
              className="relative p-2 text-[#825425] hover:bg-[#e6ded9] transition-colors rounded-sm flex items-center gap-1 font-label-caps"
              title="View WhatsApp Order List"
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="bg-[#825425] text-white text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          )}

          <button
            onClick={onOpenOrderModal}
            className="btn-primary text-label-caps font-label-caps uppercase tracking-widest text-[11px] flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span className="hidden sm:inline">Order via WhatsApp</span>
            <span className="sm:hidden">WhatsApp</span>
          </button>

          <button
            onClick={onOpenAdminModal}
            className="p-2 text-[#51443a] hover:text-[#825425] transition-colors"
            title="Admin Login & Firestore Manager"
          >
            <Lock className="w-5 h-5" />
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-[#1b1c1a] hover:text-[#825425] focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-4 pb-6 px-4 mt-2 border-t border-[#d5c3b6] bg-[#fbf9f5] flex flex-col gap-4 animate-fadeIn">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`text-left text-lg py-2 transition-colors ${
                  isActive
                    ? 'text-[#825425] font-bold italic border-l-4 border-[#825425] pl-3'
                    : 'text-[#1b1c1a] hover:text-[#825425] pl-1'
                }`}
              >
                {item.label}
              </button>
            );
          })}
          <button
            onClick={() => {
              onOpenAdminModal();
              setMobileMenuOpen(false);
            }}
            className="text-left text-sm py-2 text-[#825425] font-semibold flex items-center gap-2 border-t border-[#e4e2de] pt-3"
          >
            <Lock className="w-4 h-4" /> Admin Login (Firestore Manager)
          </button>
          <div className="pt-2 border-t border-[#e4e2de] flex justify-between items-center text-xs text-[#51443a]">
            <span>142 Artisan Boulevard</span>
            <span>Tue-Sun: 7am - 4pm</span>
          </div>
        </div>
      )}
    </nav>
  );
};

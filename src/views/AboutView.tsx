import React from 'react';
import { NavTab, BakerySettings } from '../types';
import { Wheat, Sparkles, ShieldCheck, Clock, Award, Flame, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { ScrollReveal, ImageZoom, RippleButton } from '../components/animations/AnimatedComponents';

interface AboutViewProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenOrderModal: () => void;
  settings?: BakerySettings;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab, onOpenOrderModal, settings }) => {
  const bakeryName = settings?.bakeryName || 'Fresh Bakers';

  return (
    <div className="w-full space-y-16 pb-16">
      {/* 1. HERO BANNER */}
      <section className="px-4 sm:px-8 pt-6 max-w-[1280px] mx-auto text-center space-y-6">
        <div className="space-y-3 max-w-2xl mx-auto">
          <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-4 py-1 rounded-full border border-[#e8dec9]">
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Our Heritage & Hearth Ethos
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#1f1610] font-bold tracking-tight">
            About {bakeryName}
          </h1>
          <p className="font-body-md text-[#6e5d4f] text-base sm:text-lg leading-relaxed">
            A quiet devotion to traditional hearth breadmaking, wild sourdough fermentation, and regional heirloom grains.
          </p>
        </div>

        {/* Hero Image Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#c59b27]/30 min-h-[420px] max-w-[1100px] mx-auto flex items-end p-8 text-left">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600"
            alt={`Baker working at ${bakeryName}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16110d] via-[#16110d]/50 to-transparent" />
          <div className="relative z-10 space-y-2 max-w-xl text-[#faf6f0]">
            <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Established Hearth Heritage
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">
              Where Time, Flour & Hearth Steam Meet
            </h2>
            <p className="text-xs sm:text-sm text-[#dccbbb] leading-relaxed">
              Every loaf is shaped by hand using our 50-year-old sourdough starter and baked on stone decks at 480°F.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY NARRATIVE */}
      <section className="px-4 sm:px-8 max-w-[960px] mx-auto space-y-12">
        <div className="luxury-card p-8 sm:p-12 space-y-6">
          <div className="border-l-4 border-[#825425] pl-6 py-1">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1f1610]">
              The Philosophy of Slow Bread
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#825425] font-semibold mt-1">
              Refusing chemical accelerants in favor of 36-hour cold wild yeast proofing.
            </p>
          </div>

          <p className="font-body-md text-sm sm:text-base text-[#6e5d4f] leading-relaxed">
            In an era of rapid industrial baking, {bakeryName} chooses the patient path. Every piece of bread that leaves our hearth undergoes a rigorous 36-hour cold fermentation. This extended timeline allows native wild yeasts and lactic bacteria to naturally break down complex starches into deeply aromatic, gut-friendly nutrition.
          </p>

          <p className="font-body-md text-sm sm:text-base text-[#6e5d4f] leading-relaxed">
            We work directly with local organic millers cultivating ancient heirloom wheat varieties—Einkorn, Emmer, Spelt, and Dark Rye. Our flour is stone-milled weekly, preserving the germ and essential oils that give our bread its golden crumb and distinct hazelnut aroma.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto shadow-md">
              <Wheat className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1f1610]">100% Stone-Ground</h3>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Milled at low temperatures to retain natural vitamins, bran, and nutrient-dense germ.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1f1610]">36h Cold Ferment</h3>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Naturally fermented wild starter builds gut-friendly flora and rich caramelisation.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto shadow-md">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1f1610]">Hand Lamination</h3>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Our pastries are layered by hand with 84% Normandy cultured butter over 3 days.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 3. CRAFTSMANSHIP GALLERY */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="text-center max-w-lg mx-auto space-y-2">
          <span className="font-label-caps text-[#825425] uppercase tracking-widest block font-bold text-xs">
            Visual Journey
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-[#1f1610]">
            Craftsmanship in Pictures
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="luxury-card p-4 space-y-3">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600"
              alt="Hand shaping sourdough dough"
              className="w-full h-56 object-cover rounded-2xl"
            />
            <h4 className="font-serif-display text-lg font-bold text-[#1f1610]">1. Hand Shaping</h4>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Gentle tension building preserves delicate fermentation gas bubbles.
            </p>
          </div>

          <div className="luxury-card p-4 space-y-3">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=600"
              alt="Flaky viennoiserie croissant fold"
              className="w-full h-56 object-cover rounded-2xl"
            />
            <h4 className="font-serif-display text-lg font-bold text-[#1f1610]">2. Viennoiserie Lamination</h4>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              27 precise butter folds create paper-thin flaky layers that melt in your mouth.
            </p>
          </div>

          <div className="luxury-card p-4 space-y-3">
            <img
              src="https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600"
              alt="Baguettes emerging hot from hearth oven"
              className="w-full h-56 object-cover rounded-2xl"
            />
            <h4 className="font-serif-display text-lg font-bold text-[#1f1610]">3. Stone Hearth Firing</h4>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Direct contact with 480°F stone deck produces dark caramelised crusts.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA BANNER */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl bg-[#16110d] text-[#faf6f0] p-8 sm:p-12 border border-[#c59b27]/30 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold">
            Taste the Difference of Real Artisan Bread
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#dccbbb] leading-relaxed max-w-md mx-auto">
            Reserve your fresh daily bakes or custom hampers directly on WhatsApp for guaranteed same-day pickup.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold py-3 px-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <span>Explore Daily Menu</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={onOpenOrderModal}
              className="btn-primary py-3 px-8 bg-[#825425] text-white hover:bg-[#673d10] text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              WhatsApp Order
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};


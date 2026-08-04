import React from 'react';
import { NavTab, BakerySettings } from '../types';
import { Cake, Sparkles, ShieldCheck, Heart, Award, Flame, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

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
            <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Our Heritage & Artisanal Ethos
          </span>
          <h1 className="font-serif-display text-4xl sm:text-5xl md:text-6xl text-[#1f1610] font-bold tracking-tight">
            About {bakeryName}
          </h1>
          <p className="font-body-md text-[#6e5d4f] text-base sm:text-lg leading-relaxed">
            A passionate dedication to authentic Indian bakery delicacies, Belgian chocolate truffle cakes, and fresh fusion desserts.
          </p>
        </div>

        {/* Hero Image Banner */}
        <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-[#c59b27]/30 min-h-[420px] max-w-[1100px] mx-auto flex items-end p-8 text-left">
          <img
            src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1600"
            alt={`Master baker at ${bakeryName}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#16110d] via-[#16110d]/50 to-transparent" />
          <div className="relative z-10 space-y-2 max-w-xl text-[#faf6f0]">
            <span className="text-[#d4a373] text-xs font-bold uppercase tracking-widest flex items-center gap-1.5">
              <Award className="w-4 h-4" /> Established Indian Bakery Tradition
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold">
              Where Pure Dairy Cream & Master Craft Meet
            </h2>
            <p className="text-xs sm:text-sm text-[#dccbbb] leading-relaxed">
              Every celebration cake is baked fresh daily using pure ingredients, Belgian chocolate ganache, and authentic saffron infusion.
            </p>
          </div>
        </div>
      </section>

      {/* 2. PHILOSOPHY NARRATIVE */}
      <section className="px-4 sm:px-8 max-w-[960px] mx-auto space-y-12">
        <div className="luxury-card p-8 sm:p-12 space-y-6">
          <div className="border-l-4 border-[#825425] pl-6 py-1">
            <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1f1610]">
              The Art of Fine Indian Baking
            </h2>
            <p className="font-body-md text-sm sm:text-base text-[#825425] font-semibold mt-1">
              Refusing artificial preservatives in favor of daily fresh-whipped creams and authentic ingredients.
            </p>
          </div>

          <p className="font-body-md text-sm sm:text-base text-[#6e5d4f] leading-relaxed">
            At {bakeryName}, we believe every milestone celebration deserves an extraordinary centerpiece. From iconic Dutch Chocolate Truffles and rich Black Forest gateaux to our signature Rasmalai Fusion cakes, every bake is crafted with precision and love.
          </p>

          <p className="font-body-md text-sm sm:text-base text-[#6e5d4f] leading-relaxed">
            We source 100% pure vegetarian ingredients, rich cocoa, fresh Alphonso mangoes, organic dry fruits, and authentic Kashmiri saffron kesar. Whether it is an eggless birthday cake or a custom bento gift box, our master pastry chefs take pride in every delicate detail.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto shadow-md">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1f1610]">100% Pure & Fresh</h3>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Prepared daily with pure butter, fresh dairy cream, and zero artificial preservatives.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto shadow-md">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1f1610]">Eggless Speciality</h3>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Wide collection of 100% vegetarian eggless cakes crafted with light, fluffy sponges.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto shadow-md">
              <Cake className="w-6 h-6" />
            </div>
            <h3 className="font-serif-display text-lg font-bold text-[#1f1610]">Custom Cake Design</h3>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Bespoke photo cakes, multi-tier wedding showpieces, and cute mini bento boxes.
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
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600"
              alt="Chocolate Truffle Glazing"
              className="w-full h-56 object-cover rounded-2xl"
            />
            <h4 className="font-serif-display text-lg font-bold text-[#1f1610]">1. Truffle Glazing</h4>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Rich 70% dark Belgian cocoa ganache poured smoothly over moist sponge layers.
            </p>
          </div>

          <div className="luxury-card p-4 space-y-3">
            <img
              src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=600"
              alt="Rasmalai Fusion Layering"
              className="w-full h-56 object-cover rounded-2xl"
            />
            <h4 className="font-serif-display text-lg font-bold text-[#1f1610]">2. Fusion Crafting</h4>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Soft cardamom sponge infused with authentic saffron rabri and rasmalai.
            </p>
          </div>

          <div className="luxury-card p-4 space-y-3">
            <img
              src="https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600"
              alt="Bespoke Cake Finishing"
              className="w-full h-56 object-cover rounded-2xl"
            />
            <h4 className="font-serif-display text-lg font-bold text-[#1f1610]">3. Bespoke Finishing</h4>
            <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed">
              Hand-decorating with edible 24k gold leaf, fresh flowers, and sparkler tops.
            </p>
          </div>
        </div>
      </section>

      {/* 4. CLOSING CTA BANNER */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl bg-[#16110d] text-[#faf6f0] p-8 sm:p-12 border border-[#c59b27]/30 text-center max-w-3xl mx-auto space-y-6 shadow-2xl">
          <h2 className="font-serif-display text-3xl sm:text-4xl font-bold">
            Taste the Magic of Authentic Bakery Delicacies
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#dccbbb] leading-relaxed max-w-md mx-auto">
            Pre-order your favorite celebration cake or gift hamper on WhatsApp for instant delivery or pickup.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => {
                setActiveTab('products');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-gold py-3 px-8 text-xs font-bold uppercase tracking-wider flex items-center gap-2"
            >
              <span>Explore Menu</span>
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

import React from 'react';
import { NavTab, ProductItem, Category } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { motion } from 'motion/react';
import { ArrowRight, Clock, Award, Sparkles, MessageSquare, Heart } from 'lucide-react';

interface HomeViewProps {
  products?: ProductItem[];
  setActiveTab: (tab: NavTab) => void;
  onSelectCategory: (cat: Category) => void;
  onOpenQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  products = PRODUCTS,
  setActiveTab,
  onSelectCategory,
  onOpenQuickView,
  onAddToCart,
  onOpenOrderModal,
}) => {
  const signatureProducts = (products.length > 0 ? products : PRODUCTS).filter((p) => p.isSignature);

  return (
    <div className="w-full">
      {/* 1. Hero Section */}
      <section className="relative px-5 md:px-16 py-12 md:py-20 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6"
          >
            <span className="font-label-caps text-[#825425] tracking-widest uppercase block text-xs">
              Handcrafted in Small Batches Daily
            </span>
            <h1 className="font-display-lg md:text-5xl lg:text-6xl text-[#1b1c1a] font-bold leading-[1.1]">
              Artisanal Sourdough & Pastries
            </h1>
            <p className="font-body-lg text-[#51443a] max-w-xl text-lg leading-relaxed">
              Slow-fermented for 36 hours, stone-ground with regional organic wheat, and baked at sunrise in our stone hearth oven.
            </p>
            <div className="pt-4 flex flex-wrap gap-4 items-center">
              <button
                onClick={() => {
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-primary text-xs uppercase tracking-widest flex items-center gap-2 group"
              >
                Explore Menu
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={onOpenOrderModal}
                className="btn-secondary text-xs uppercase tracking-widest flex items-center gap-2"
              >
                <span className="material-symbols-outlined text-[18px]">chat</span>
                Order via WhatsApp
              </button>
            </div>

            {/* Micro Trust Badges */}
            <div className="pt-6 grid grid-cols-3 gap-4 border-t border-[#d5c3b6] text-xs text-[#51443a]">
              <div>
                <span className="font-bold text-[#1b1c1a] block font-serif-display text-base">36 Hours</span>
                Cold Fermentation
              </div>
              <div>
                <span className="font-bold text-[#1b1c1a] block font-serif-display text-base">100% Organic</span>
                Stone-Ground Grain
              </div>
              <div>
                <span className="font-bold text-[#1b1c1a] block font-serif-display text-base">Wild Yeast</span>
                50-Yr Heritage Starter
              </div>
            </div>
          </motion.div>

          {/* Hero Image Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative border border-[#d5c3b6] p-3 bg-white shadow-xl">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDul2LQs2RG_9n7r3zLnleXJxS0v3iAxlSim0mTOpfBf6_CevWWYAQN6ecQiJesN7OcCq0lqOe6YfVnCAHOooJ0O876EwFe09PT8zYk34cnlpYuCkYL_YlLqgUzdn5E2KW23DZt3BIFlq70B13_vg4Q7ngeR2HrDLOadq3Lc7XgKiBCX1M_6hYH9jWSpHpy0HTREiR11T1LyqNb8iWVXGj5dms0hIlEbTM-jfEQf9TMfu6Bi9OBYN3oBQ"
                alt="Country Sourdough loaf sliced open"
                className="w-full h-[400px] object-cover"
              />
              <div className="absolute -bottom-6 -left-6 bg-[#825425] text-white p-4 shadow-lg hidden sm:block">
                <p className="font-label-caps text-[10px] text-[#e6ded9] uppercase">Today's Fresh Batch</p>
                <p className="font-headline-sm text-lg text-white">The Country Sourdough</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Editorial Divider */}
      <div className="max-w-[1200px] mx-auto px-5 md:px-16 my-8">
        <div className="editorial-rule"></div>
      </div>

      {/* 2. Our Signature Bakes (Page 1 Screenshot Section) */}
      <section className="px-5 md:px-16 py-12 max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1">
              Curated Daily Selections
            </span>
            <h2 className="font-headline-md text-3xl md:text-4xl text-[#1b1c1a] font-bold">
              Our Signature Bakes
            </h2>
          </div>
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="mt-4 md:mt-0 text-xs font-semibold uppercase tracking-wider text-[#825425] hover:text-[#673d10] flex items-center gap-1"
          >
            View All Daily Bakes <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureProducts.map((item) => (
            <div
              key={item.id}
              className="print-card bg-white p-4 flex flex-col justify-between group hover:shadow-lg transition-all duration-300"
            >
              <div>
                <div
                  className="relative overflow-hidden cursor-pointer mb-4 bg-[#f5f3ef]"
                  onClick={() => onOpenQuickView(item)}
                >
                  <img
                    src={item.image}
                    alt={item.imageAlt}
                    className="w-full h-52 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 right-2 bg-[#825425] text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5">
                    {item.price}
                  </span>
                </div>
                <span className="font-label-caps text-[10px] text-[#837469] block mb-1">
                  {item.category}
                </span>
                <h3
                  onClick={() => onOpenQuickView(item)}
                  className="font-headline-sm text-lg font-bold text-[#1b1c1a] hover:text-[#825425] cursor-pointer mb-2 transition-colors"
                >
                  {item.name}
                </h3>
                <p className="font-body-md text-xs text-[#51443a] line-clamp-2 mb-4 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[#e4e2de] flex gap-2">
                <button
                  onClick={() => {
                    onAddToCart(item);
                    onOpenOrderModal();
                  }}
                  className="flex-1 btn-primary py-2 text-[11px] flex items-center justify-center gap-1"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  WhatsApp Order
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Shop by Category Grid */}
      <section className="bg-[#f5f3ef] px-5 md:px-16 py-16 border-y border-[#d5c3b6] my-12">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1">
              Explore Our Hearth
            </span>
            <h2 className="font-headline-md text-3xl md:text-4xl text-[#1b1c1a] font-bold mb-3">
              Shop by Category
            </h2>
            <p className="font-body-md text-sm text-[#51443a]">
              From crispy baguettes and buttery viennoiserie to bespoke event tier cakes and savory snacks.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {CATEGORIES.map((cat) => (
              <div
                key={cat.name}
                onClick={() => {
                  onSelectCategory(cat.name);
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="group relative cursor-pointer overflow-hidden border border-[#d5c3b6] bg-white aspect-square shadow-sm hover:shadow-md transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-4 text-white">
                  <h3 className="font-headline-sm text-lg font-bold group-hover:text-[#c68e5a] transition-colors">
                    {cat.name}
                  </h3>
                  <span className="text-[11px] text-[#d5c3b6] uppercase font-semibold tracking-wider flex items-center gap-1">
                    Explore <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Heritage Story Teaser */}
      <section className="px-5 md:px-16 py-12 max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative border border-[#d5c3b6] p-4 bg-white">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvG0YpfGuIDIhlPMlQPxF1BMlL4AgniDbBJELDrOcddXmplAIPoavB5D3DqaDw3a8SB4c3SjutGdBIhkiDGEGG8OpfqbMEto9oOW3TfF4cuLZkfdlladXcNpraVDlrVkHAuvD5jruC0LiSmb9TZi4eKSOwnOuBbduIQxTdhf4cQRuVOQLNkZY_QRHWIV_K3RBmcT8CmSZPJ6SSAfzckK1poY7rksWSda2eofOlaDHsVMMyKZHVI1mcWg"
              alt="Artisan baker dusting flour on sourdough dough"
              className="w-full h-80 object-cover"
            />
          </div>

          <div className="space-y-4">
            <span className="font-label-caps text-[#825425] tracking-widest uppercase block text-xs">
              From Grain to Crumb
            </span>
            <h2 className="font-headline-md text-3xl font-bold text-[#1b1c1a]">
              Crafted With Patience & Stone-Ground Flour
            </h2>
            <p className="font-body-md text-[#51443a] leading-relaxed text-sm">
              At Fresh Bakers, we believe good bread cannot be rushed. Every loaf begins with organic grain milled locally, hydrated pure water, and our 50-year inherited wild yeast starter culture.
            </p>
            <p className="font-body-md text-[#51443a] leading-relaxed text-sm">
              Our 36-hour cold fermentation breaks down gluten proteins naturally, resulting in a bread that is deeply flavorful, easily digestible, and uniquely aromatic.
            </p>
            <button
              onClick={() => {
                setActiveTab('about');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="btn-secondary text-xs uppercase tracking-widest mt-2"
            >
              Read Our Story
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

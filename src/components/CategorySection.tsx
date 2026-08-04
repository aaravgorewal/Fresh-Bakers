import React, { useState, useMemo } from 'react';
import { Category, ProductItem } from '../types';
import { CATEGORIES, CategoryInfo } from '../data/products';
import {
  Cake,
  Heart,
  Sparkles,
  Camera,
  Crown,
  ShieldCheck,
  Flame,
  Smile,
  Apple,
  Gift,
  Flower2,
  Package,
  Box,
  PartyPopper,
  Sparkle,
  ThumbsUp,
  TrendingUp,
  Sprout,
  ArrowRight,
  Search,
  CheckCircle2
} from 'lucide-react';
import { motion } from 'motion/react';

interface CategorySectionProps {
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  products?: ProductItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  selectedCategory,
  onSelectCategory,
  products = [],
  title = "Explore Our Premium Categories",
  subtitle = "Handcrafted celebration cakes, floral arrangements, chocolate bouquets, and luxury gift hampers.",
  className = ""
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTabFilter, setActiveTabFilter] = useState<'All' | 'Cakes' | 'Gifting' | 'Special'>('All');

  // Helper to render icon for category
  const renderCategoryIcon = (iconName: string, classNameString: string = "w-5 h-5") => {
    switch (iconName) {
      case 'Cake': return <Cake className={classNameString} />;
      case 'Heart': return <Heart className={classNameString} />;
      case 'Sparkles': return <Sparkles className={classNameString} />;
      case 'Camera': return <Camera className={classNameString} />;
      case 'Crown': return <Crown className={classNameString} />;
      case 'ShieldCheck': return <ShieldCheck className={classNameString} />;
      case 'Flame': return <Flame className={classNameString} />;
      case 'Smile': return <Smile className={classNameString} />;
      case 'Apple': return <Apple className={classNameString} />;
      case 'Gift': return <Gift className={classNameString} />;
      case 'Flower2': return <Flower2 className={classNameString} />;
      case 'Package': return <Package className={classNameString} />;
      case 'Box': return <Box className={classNameString} />;
      case 'PartyPopper': return <PartyPopper className={classNameString} />;
      case 'Sparkle': return <Sparkle className={classNameString} />;
      case 'ThumbsUp': return <ThumbsUp className={classNameString} />;
      case 'TrendingUp': return <TrendingUp className={classNameString} />;
      case 'Sprout': return <Sprout className={classNameString} />;
      default: return <Cake className={classNameString} />;
    }
  };

  // Compute product count per category
  const getCategoryCount = (categoryName: string): number => {
    if (!products || products.length === 0) return 6; // Default pleasant baseline count
    if (categoryName === 'Recommend For You') {
      return products.filter((p) => p.isRecommended || p.isSignature).length || 8;
    }
    if (categoryName === 'Trending') {
      return products.filter((p) => p.isTrending || p.isFeatured).length || 10;
    }
    const count = products.filter((p) => p.category === categoryName).length;
    return count > 0 ? count : 5;
  };

  // Filter categories by search and tab
  const filteredCategories = useMemo(() => {
    return CATEGORIES.filter((cat) => {
      // Search filter
      const matchesSearch =
        cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cat.tagline.toLowerCase().includes(searchQuery.toLowerCase());

      if (!matchesSearch) return false;

      // Tab filter
      if (activeTabFilter === 'Cakes') return cat.type === 'cake';
      if (activeTabFilter === 'Gifting')
        return (
          cat.name === 'Gift Portal' ||
          cat.name === 'Flowers' ||
          cat.name === 'Chocolate Bouquets' ||
          cat.name === 'Gift Hampers' ||
          cat.name === 'Bamboo + Chocolate Gifts'
        );
      if (activeTabFilter === 'Special')
        return (
          cat.name === 'Balloon Decoration' ||
          cat.name === 'Birthday Accessories' ||
          cat.name === 'Recommend For You' ||
          cat.name === 'Trending'
        );

      return true;
    });
  }, [searchQuery, activeTabFilter]);

  return (
    <section className={`w-full ${className}`}>
      <div className="space-y-8">
        {/* Header Title & Subtitle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#e8dec9] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 font-label-caps text-xs text-[#825425] tracking-[0.2em] uppercase font-bold bg-[#f4ebe1] px-3.5 py-1 rounded-full border border-[#e8dec9]">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Curated Catalog
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#1f1610] tracking-tight">
              {title}
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#6e5d4f] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* All Categories Reset Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 ${
                selectedCategory === 'All'
                  ? 'bg-[#18130e] text-[#c59b27] border border-[#c59b27] shadow-lg ring-2 ring-[#c59b27]/30'
                  : 'bg-[#f4ebe1] hover:bg-[#e8dec9] text-[#1f1610] border border-[#e8dec9]'
              }`}
            >
              <Cake className="w-4 h-4 text-[#c59b27]" />
              <span>All Categories ({CATEGORIES.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar: Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#f4ebe1] p-3 rounded-2xl border border-[#e8dec9]">
          {/* Tabs */}
          <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
            {[
              { id: 'All', label: 'All Items' },
              { id: 'Cakes', label: 'Cakes Collection' },
              { id: 'Gifting', label: 'Gifting & Flowers' },
              { id: 'Special', label: 'Decor & Special' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTabFilter(tab.id as any)}
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  activeTabFilter === tab.id
                    ? 'bg-[#18130e] text-[#faf6f0] shadow-md border border-[#c59b27]/50'
                    : 'text-[#6e5d4f] hover:text-[#1f1610] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#825425]" />
            <input
              type="text"
              placeholder="Search category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#e8dec9] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#1f1610] placeholder-[#a38f7d] focus:outline-none focus:border-[#825425] transition-all"
            />
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
          {filteredCategories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name;
            const count = getCategoryCount(cat.name);

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.03 }}
                whileHover={{ y: -8, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative overflow-hidden rounded-3xl cursor-pointer transition-all duration-500 ease-out shadow-md hover:shadow-2xl border flex flex-col justify-between aspect-[3/4] ${
                  isSelected
                    ? 'border-[#c59b27] ring-4 ring-[#c59b27]/40 shadow-2xl shadow-[#c59b27]/30 scale-[1.02]'
                    : 'border-[#e8dec9] hover:border-[#c59b27]/80 hover:shadow-xl hover:shadow-[#1f1610]/20'
                }`}
              >
                {/* LARGE IMAGE BACKGROUND */}
                <div className="absolute inset-0 w-full h-full overflow-hidden bg-[#18130e]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out opacity-90"
                  />
                  {/* GRADIENT OVERLAY */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#16110d] via-[#16110d]/50 to-transparent group-hover:via-[#16110d]/40 transition-colors duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-b from-[#16110d]/40 via-transparent to-transparent opacity-60" />
                </div>

                {/* TOP HEADER IN CARD */}
                <div className="relative z-10 p-4 flex items-center justify-between">
                  {/* Category Icon Badge */}
                  <div
                    className={`w-9 h-9 rounded-2xl flex items-center justify-center transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                      isSelected
                        ? 'bg-gradient-to-br from-[#c59b27] to-[#d4a373] text-[#16110d]'
                        : 'bg-[#1f1610]/70 backdrop-blur-md text-[#c59b27] border border-[#c59b27]/30'
                    }`}
                  >
                    {renderCategoryIcon(cat.icon, "w-4 h-4")}
                  </div>

                  {/* Active Indicator or Count Pill */}
                  {isSelected ? (
                    <span className="bg-[#c59b27] text-[#16110d] text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Active
                    </span>
                  ) : (
                    <span className="bg-[#1f1610]/70 backdrop-blur-md text-[#dccbbb] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-white/10 group-hover:border-[#c59b27]/50 group-hover:text-[#c59b27] transition-colors">
                      {count} {count === 1 ? 'Item' : 'Items'}
                    </span>
                  )}
                </div>

                {/* BOTTOM CONTENT IN CARD */}
                <div className="relative z-10 p-4 pt-0 space-y-2">
                  <span className="text-[10px] uppercase font-bold tracking-[0.18em] text-[#d4a373] block">
                    {cat.type === 'cake' ? 'Artisan Cake' : 'Gifting & Decor'}
                  </span>

                  <h3 className="font-serif-display font-bold text-base sm:text-lg text-white group-hover:text-[#c59b27] transition-colors leading-snug drop-shadow-md">
                    {cat.name}
                  </h3>

                  <p className="font-body-md text-[11px] text-[#dccbbb] leading-tight line-clamp-2 opacity-90 group-hover:opacity-100 transition-opacity">
                    {cat.tagline}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#c59b27] border-t border-white/10 group-hover:border-[#c59b27]/40 transition-colors">
                    <span className="text-[11px] uppercase tracking-wider text-white group-hover:text-[#c59b27] transition-colors">
                      {isSelected ? 'Viewing Items' : 'Explore Menu'}
                    </span>
                    <div className="w-6 h-6 rounded-full bg-[#c59b27]/10 group-hover:bg-[#c59b27] group-hover:text-[#16110d] text-[#c59b27] flex items-center justify-center transition-all duration-300 group-hover:translate-x-1">
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

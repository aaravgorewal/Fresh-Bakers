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
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-[#F0E5DA] pb-6">
          <div className="space-y-2 max-w-2xl">
            <span className="inline-flex items-center gap-1.5 font-label-caps text-xs text-[#5C2E14] tracking-[0.2em] uppercase font-bold bg-[#F4EBE1] px-3.5 py-1 rounded-full border border-[#F0E5DA]">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Curated Catalog
            </span>
            <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#24140A] tracking-tight">
              {title}
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#6C584C] leading-relaxed">
              {subtitle}
            </p>
          </div>

          {/* All Categories Reset Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => onSelectCategory('All')}
              className={`px-5 py-2.5 rounded-2xl text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer ${
                selectedCategory === 'All'
                  ? 'bg-[#24140A] text-[#D97706] border border-[#D97706] shadow-lg ring-2 ring-[#D97706]/30'
                  : 'bg-[#F4EBE1] hover:bg-[#E8DEC9] text-[#24140A] border border-[#F0E5DA]'
              }`}
            >
              <Cake className="w-4 h-4 text-[#D97706]" />
              <span>All Categories ({CATEGORIES.length})</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Bar: Tabs & Search */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-[#F4EBE1] p-3 rounded-2xl border border-[#F0E5DA]">
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
                className={`px-4 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  activeTabFilter === tab.id
                    ? 'bg-[#24140A] text-[#FAF6F0] shadow-md border border-[#D97706]/50'
                    : 'text-[#6C584C] hover:text-[#24140A] hover:bg-white/60'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#5C2E14]" />
            <input
              type="text"
              placeholder="Search category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white border border-[#F0E5DA] rounded-xl pl-9 pr-3 py-1.5 text-xs text-[#24140A] placeholder-[#6C584C]/60 focus:outline-none focus:border-[#5C2E14] transition-all"
            />
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
          {filteredCategories.map((cat, idx) => {
            const isSelected = selectedCategory === cat.name;

            return (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: idx * 0.02 }}
                whileHover={{ y: -4, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => onSelectCategory(cat.name)}
                className={`group relative overflow-hidden rounded-2xl sm:rounded-3xl cursor-pointer transition-all duration-300 bg-white border flex flex-col items-center shadow-xs hover:shadow-xl ${
                  isSelected
                    ? 'border-[#D97706] ring-2 ring-[#D97706]/40 bg-[#FFFBF7]'
                    : 'border-[#F0E5DA] hover:border-[#D97706]/80'
                }`}
              >
                {/* LARGE CATEGORY IMAGE CONTAINER */}
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-[#F4EBE1]">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-40 group-hover:opacity-20 transition-opacity" />
                </div>

                {/* CENTERED CATEGORY TITLE */}
                <div className="p-3.5 sm:p-4 w-full text-center flex items-center justify-center">
                  <h3 className="font-serif-display font-bold text-sm sm:text-base text-[#24140A] group-hover:text-[#D97706] transition-colors leading-snug line-clamp-1">
                    {cat.name}
                  </h3>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

import React, { useState, useEffect } from 'react';
import { Category, ProductItem } from '../types';
import { PRODUCTS, CATEGORIES, CategoryInfo } from '../data/products';
import { sendProductWhatsAppOrder } from '../utils/whatsapp';
import {
  Search,
  Clock,
  CheckCircle2,
  Sparkles,
  Eye,
  ShoppingBag,
  ArrowRight,
  Filter,
  SlidersHorizontal,
  Cake,
  Heart,
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
  Check,
  RotateCcw,
  X,
  Star,
  Zap,
  Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, RippleButton, SkeletonCard } from '../components/animations/AnimatedComponents';

interface ProductsViewProps {
  products?: ProductItem[];
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  onOpenQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
  whatsappNumber?: string;
  isLoading?: boolean;
}

// Icon helper mapping for categories
const renderCategoryIcon = (iconName: string, className = "w-4 h-4") => {
  switch (iconName) {
    case 'Cake': return <Cake className={className} />;
    case 'Heart': return <Heart className={className} />;
    case 'Sparkles': return <Sparkles className={className} />;
    case 'Camera': return <Camera className={className} />;
    case 'Crown': return <Crown className={className} />;
    case 'ShieldCheck': return <ShieldCheck className={className} />;
    case 'Flame': return <Flame className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'Apple': return <Apple className={className} />;
    case 'Gift': return <Gift className={className} />;
    case 'Flower2': return <Flower2 className={className} />;
    case 'Package': return <Package className={className} />;
    case 'Box': return <Box className={className} />;
    case 'PartyPopper': return <PartyPopper className={className} />;
    case 'Sparkle': return <Sparkle className={className} />;
    case 'ThumbsUp': return <ThumbsUp className={className} />;
    case 'TrendingUp': return <TrendingUp className={className} />;
    case 'Sprout': return <Sprout className={className} />;
    default: return <Sparkles className={className} />;
  }
};

export const ProductsView: React.FC<ProductsViewProps> = ({
  products = PRODUCTS,
  selectedCategory,
  setSelectedCategory,
  onOpenQuickView,
  onAddToCart,
  onOpenOrderModal,
  whatsappNumber = '15550192824',
  isLoading = false,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [priceFilter, setPriceFilter] = useState<'all' | 'under30' | '30to60' | 'above60'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'name'>('featured');
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [trendingOnly, setTrendingOnly] = useState(false);
  const [signatureOnly, setSignatureOnly] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const availableProducts = products.length > 0 ? products : PRODUCTS;

  // Extract category info
  const currentCategoryInfo: CategoryInfo | undefined = CATEGORIES.find(
    (c) => c.name === selectedCategory
  );

  // Apply URL parameter filter on mount if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      const matched = CATEGORIES.find(
        (c) => c.name.toLowerCase() === catParam.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(matched.name);
      }
    }
  }, [setSelectedCategory]);

  // Filter products by Category, Search Query, Price Range, Eggless, Featured, Trending, Signature Flags
  const filteredProducts = availableProducts.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());

    const itemPrice = typeof item.price === 'number' ? item.price : parseFloat(String(item.price) || '0');

    let matchesPrice = true;
    if (priceFilter === 'under30') matchesPrice = itemPrice < 30;
    else if (priceFilter === '30to60') matchesPrice = itemPrice >= 30 && itemPrice <= 60;
    else if (priceFilter === 'above60') matchesPrice = itemPrice > 60;

    const matchesEggless = egglessOnly ? Boolean(item.isEggless) : true;
    const matchesFeatured = featuredOnly ? Boolean(item.isFeatured) : true;
    const matchesTrending = trendingOnly ? Boolean(item.isTrending) : true;
    const matchesSignature = signatureOnly ? Boolean(item.isSignature) : true;

    return (
      matchesCategory &&
      matchesSearch &&
      matchesPrice &&
      matchesEggless &&
      matchesFeatured &&
      matchesTrending &&
      matchesSignature
    );
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = typeof a.price === 'number' ? a.price : parseFloat(String(a.price) || '0');
    const priceB = typeof b.price === 'number' ? b.price : parseFloat(String(b.price) || '0');

    if (sortBy === 'priceLow') return priceA - priceB;
    if (sortBy === 'priceHigh') return priceB - priceA;
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0; // featured default
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  const handleDirectWhatsAppOrder = (product: ProductItem) => {
    sendProductWhatsAppOrder(product, whatsappNumber);
  };

  const cakeCategories = CATEGORIES.filter((c) => c.type === 'cake');
  const additionalCategories = CATEGORIES.filter((c) => c.type === 'additional');

  const resetFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setSortBy('featured');
    setEgglessOnly(false);
    setFeaturedOnly(false);
    setTrendingOnly(false);
    setSignatureOnly(false);
  };

  const hasActiveFilters =
    searchQuery !== '' ||
    priceFilter !== 'all' ||
    sortBy !== 'featured' ||
    egglessOnly ||
    featuredOnly ||
    trendingOnly ||
    signatureOnly;

  return (
    <div className="w-full space-y-12 pb-24">
      {/* 1. LARGE PREMIUM HERO BANNER */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-2 max-w-[1340px] mx-auto">
        <ScrollReveal direction="down" duration={0.8}>
          <div className="relative rounded-3xl overflow-hidden bg-[#18130e] text-[#faf6f0] shadow-2xl border border-[#c59b27]/30 min-h-[380px] sm:min-h-[460px] flex items-center">
            {/* Banner Background Image with Subtle Dark Overlay */}
            <div className="absolute inset-0 z-0">
              <motion.img
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                src={
                  selectedCategory === 'All'
                    ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600'
                    : currentCategoryInfo?.bannerImage || currentCategoryInfo?.image || 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1600'
                }
                alt={selectedCategory === 'All' ? 'Master Bakery Catalog' : `${selectedCategory} Banner`}
                className="w-full h-full object-cover object-center opacity-45"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#18130e] via-[#18130e]/85 to-transparent md:w-3/4" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#18130e] via-transparent to-transparent opacity-90" />
            </div>

            {/* Banner Content */}
            <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-12 space-y-5">
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.6 }}
                className="inline-flex items-center gap-2 bg-[#d4a373]/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#d4a373]/35 text-[#e5b98a] text-xs font-bold uppercase tracking-widest"
              >
                {currentCategoryInfo ? (
                  <>
                    {renderCategoryIcon(currentCategoryInfo.icon)}
                    <span>{currentCategoryInfo.type === 'cake' ? 'Artisanal Cake Collection' : 'Gifting & Styling'}</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                    <span>Master Bakery & Gifting Catalog</span>
                  </>
                )}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="font-serif-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf6f0] leading-[1.15]"
              >
                {selectedCategory === 'All' ? 'Our Gourmet Menu & Floral Gifting' : selectedCategory}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="font-body-md text-sm sm:text-base text-[#e5d8c8] leading-relaxed max-w-xl"
              >
                {selectedCategory === 'All'
                  ? 'Discover handcrafted slow-fermented sourdoughs, celebration cakes, fresh floral bouquets, luxury gift hampers, and bespoke event styling.'
                  : currentCategoryInfo?.tagline || `Handcrafted delicacies prepared fresh daily under our ${selectedCategory} collection.`}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="flex flex-wrap items-center gap-3 pt-2"
              >
                <span className="text-xs font-bold text-[#f3cb81] bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-[#c59b27]/40 shadow-inner flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'Item Available' : 'Items Available'}
                </span>

                {selectedCategory !== 'All' && (
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className="text-xs text-[#d4a373] hover:text-white bg-white/10 hover:bg-white/20 px-4 py-2 rounded-full transition-all duration-200 font-semibold border border-white/15"
                  >
                    ← All Categories
                  </button>
                )}
              </motion.div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. SEARCH & QUICK DISCOVERY TOOLBAR */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto">
        <ScrollReveal delay={0.15}>
          <div className="bg-white/80 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-[#e8dec9] shadow-xl space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Box */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-[#825425]" />
                <input
                  type="text"
                  placeholder={`Search in ${selectedCategory === 'All' ? 'entire menu' : selectedCategory}...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-11 pr-10 py-3 text-xs sm:text-sm bg-[#faf6f0] border border-[#e8dec9] rounded-2xl text-[#1f1610] placeholder-[#a38f7d] focus:outline-none focus:ring-2 focus:ring-[#825425]/30 focus:border-[#825425] transition-all shadow-inner"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 text-[#a38f7d] hover:text-[#1f1610] transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              {/* Price Filter & Sorting Dropdowns */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {/* Price Filter Dropdown */}
                <div className="flex items-center gap-2 bg-[#faf6f0] px-3.5 py-2.5 rounded-2xl border border-[#e8dec9]">
                  <Tag className="w-3.5 h-3.5 text-[#825425]" />
                  <span className="font-bold text-[#825425]">Price:</span>
                  <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value as any)}
                    className="bg-transparent text-[#1f1610] font-medium focus:outline-none cursor-pointer text-xs"
                  >
                    <option value="all">All Prices</option>
                    <option value="under30">Under $30</option>
                    <option value="30to60">$30 to $60</option>
                    <option value="above60">Above $60</option>
                  </select>
                </div>

                {/* Sort Dropdown */}
                <div className="flex items-center gap-2 bg-[#faf6f0] px-3.5 py-2.5 rounded-2xl border border-[#e8dec9]">
                  <SlidersHorizontal className="w-3.5 h-3.5 text-[#825425]" />
                  <span className="font-bold text-[#825425]">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="bg-transparent text-[#1f1610] font-medium focus:outline-none cursor-pointer text-xs"
                  >
                    <option value="featured">Featured First</option>
                    <option value="priceLow">Price: Low to High</option>
                    <option value="priceHigh">Price: High to Low</option>
                    <option value="name">Name A-Z</option>
                  </select>
                </div>

                {hasActiveFilters && (
                  <button
                    onClick={resetFilters}
                    className="px-3 py-2.5 text-[#825425] hover:text-white bg-[#f4ebe1] hover:bg-[#825425] rounded-2xl border border-[#e8dec9] transition-all font-bold flex items-center gap-1.5"
                    title="Reset all filters"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Reset</span>
                  </button>
                )}
              </div>
            </div>

            {/* Quick Filter Chips Row */}
            <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-[#e8dec9]/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#a38f7d] mr-1 flex items-center gap-1">
                <Filter className="w-3 h-3" /> Quick Filters:
              </span>

              {/* Eggless Chip */}
              <button
                onClick={() => setEgglessOnly(!egglessOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  egglessOnly
                    ? 'bg-emerald-700 text-white shadow-md'
                    : 'bg-[#faf6f0] text-[#6e5d4f] border border-[#e8dec9] hover:bg-[#f4ebe1]'
                }`}
              >
                <Sprout className="w-3.5 h-3.5 text-emerald-400" />
                Eggless Only
              </button>

              {/* Featured Chip */}
              <button
                onClick={() => setFeaturedOnly(!featuredOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  featuredOnly
                    ? 'bg-[#825425] text-white shadow-md'
                    : 'bg-[#faf6f0] text-[#6e5d4f] border border-[#e8dec9] hover:bg-[#f4ebe1]'
                }`}
              >
                <Star className="w-3.5 h-3.5 text-amber-400" />
                Featured Items
              </button>

              {/* Trending Chip */}
              <button
                onClick={() => setTrendingOnly(!trendingOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  trendingOnly
                    ? 'bg-amber-600 text-white shadow-md'
                    : 'bg-[#faf6f0] text-[#6e5d4f] border border-[#e8dec9] hover:bg-[#f4ebe1]'
                }`}
              >
                <Flame className="w-3.5 h-3.5 text-orange-400" />
                Trending
              </button>

              {/* Signature Chip */}
              <button
                onClick={() => setSignatureOnly(!signatureOnly)}
                className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 ${
                  signatureOnly
                    ? 'bg-[#1f1610] text-[#f3cb81] shadow-md border border-[#c59b27]/40'
                    : 'bg-[#faf6f0] text-[#6e5d4f] border border-[#e8dec9] hover:bg-[#f4ebe1]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                Signature Range
              </button>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 3. CATEGORIES CARDS & SELECTION SCROLLER */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto space-y-4">
        <ScrollReveal delay={0.2}>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif-display text-2xl font-bold text-[#1f1610] flex items-center gap-2">
                <Cake className="w-5 h-5 text-[#825425]" />
                Browse Categories
              </h2>
              <button
                onClick={() => setSelectedCategory('All')}
                className={`text-xs font-bold px-4 py-1.5 rounded-full transition-all ${
                  selectedCategory === 'All'
                    ? 'bg-[#825425] text-white shadow-md'
                    : 'bg-[#f4ebe1] text-[#6e5d4f] hover:bg-[#e8dec9]'
                }`}
              >
                All Items ({availableProducts.length})
              </button>
            </div>

            {/* Category Cards Carousel / Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {CATEGORIES.map((cat) => {
                const isSelected = selectedCategory === cat.name;
                const catProductCount = availableProducts.filter((p) => p.category === cat.name).length;

                return (
                  <motion.button
                    key={cat.name}
                    whileHover={{ scale: 1.03, y: -2 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedCategory(cat.name)}
                    className={`relative overflow-hidden p-3.5 rounded-2xl text-left border transition-all duration-300 flex flex-col justify-between min-h-[110px] ${
                      isSelected
                        ? 'bg-[#18130e] text-white border-[#c59b27] shadow-xl ring-2 ring-[#c59b27]/50'
                        : 'bg-white hover:bg-[#faf6f0] text-[#1f1610] border-[#e8dec9] hover:border-[#825425]/40 shadow-sm'
                    }`}
                  >
                    {/* Thumbnail background overlay */}
                    {cat.image && (
                      <div className={`absolute right-0 bottom-0 w-16 h-16 opacity-15 pointer-events-none overflow-hidden rounded-br-2xl ${isSelected ? 'opacity-25' : ''}`}>
                        <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
                      </div>
                    )}

                    <div className="space-y-1 relative z-10">
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors ${
                          isSelected
                            ? 'bg-[#c59b27] text-black'
                            : 'bg-[#f4ebe1] text-[#825425]'
                        }`}
                      >
                        {renderCategoryIcon(cat.icon, "w-4 h-4")}
                      </div>
                      <span className="font-serif-display font-bold text-xs sm:text-sm line-clamp-1 block pt-1">
                        {cat.name}
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-semibold tracking-wider uppercase block relative z-10 ${
                        isSelected ? 'text-[#d4a373]' : 'text-[#a38f7d]'
                      }`}
                    >
                      {catProductCount} {catProductCount === 1 ? 'item' : 'items'}
                    </span>
                  </motion.button>
                );
              })}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 4. PRODUCTS GRID OR SKELETON / EMPTY STATE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <ScrollReveal>
            <div className="py-20 text-center bg-white border border-[#e8dec9] rounded-3xl p-8 max-w-lg mx-auto space-y-5 shadow-xl">
              <div className="w-20 h-20 rounded-full bg-[#f4ebe1] text-[#825425] flex items-center justify-center mx-auto shadow-inner">
                <Sparkles className="w-10 h-10 text-[#825425]" />
              </div>
              <h2 className="font-serif-display text-2xl font-bold text-[#1f1610]">
                No items found
              </h2>
              <p className="text-[#6e5d4f] font-body-md text-sm max-w-md mx-auto leading-relaxed">
                {searchQuery
                  ? `No items matched your keyword "${searchQuery}".`
                  : `No products available under the current active filter criteria.`}
              </p>
              <RippleButton
                onClick={resetFilters}
                variant="primary"
                className="py-3 px-8 text-xs font-bold uppercase tracking-wider"
              >
                Reset All Filters
              </RippleButton>
            </div>
          </ScrollReveal>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8"
            >
              {sortedProducts.map((product, index) => {
                const isSoldOut = product.available === false;
                const displayPrice =
                  typeof product.price === 'number'
                    ? `$${product.price.toFixed(2)}`
                    : product.price;

                return (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: Math.min(index * 0.05, 0.3) }}
                    className="bg-white rounded-3xl border border-[#e8dec9] overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 flex flex-col justify-between group relative"
                  >
                    <div>
                      {/* Image Container with Zoom Effect */}
                      <div
                        className="relative aspect-[4/3] overflow-hidden bg-[#faf6f0] cursor-pointer"
                        onClick={() => onOpenQuickView(product)}
                      >
                        <motion.img
                          src={product.imageUrl || product.image}
                          alt={product.imageAlt || product.name}
                          className={`w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 ease-out ${
                            isSoldOut ? 'grayscale opacity-70' : ''
                          }`}
                          loading="lazy"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';
                          }}
                        />

                        {/* Top Badges Stack */}
                        <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-1 pointer-events-none z-10">
                          <div className="flex flex-col gap-1.5 items-start">
                            {/* Signature Badge */}
                            {product.isSignature && (
                              <span className="bg-[#18130e]/90 backdrop-blur-md text-[#f3cb81] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#c59b27]/40 shadow-md flex items-center gap-1">
                                <Sparkles className="w-3 h-3 text-[#c59b27]" /> Signature
                              </span>
                            )}

                            {/* Eggless Badge */}
                            {product.isEggless && (
                              <span className="bg-emerald-900/90 backdrop-blur-md text-emerald-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-emerald-500/40 shadow-md flex items-center gap-1">
                                <Sprout className="w-3 h-3 text-emerald-400" /> Eggless
                              </span>
                            )}

                            {/* Trending Badge */}
                            {product.isTrending && (
                              <span className="bg-amber-900/90 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-amber-500/40 shadow-md flex items-center gap-1">
                                <Flame className="w-3 h-3 text-amber-400" /> Trending
                              </span>
                            )}
                          </div>

                          {/* Price Tag Badge */}
                          <div className="bg-[#18130e]/95 backdrop-blur-md text-[#f3cb81] text-sm font-bold font-serif-display px-3 py-1 rounded-full border border-[#c59b27]/40 shadow-xl">
                            {displayPrice}
                          </div>
                        </div>

                        {/* Sold Out Banner */}
                        {isSoldOut && (
                          <div className="absolute inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center pointer-events-none z-20">
                            <span className="bg-red-900/90 text-white font-bold text-xs uppercase tracking-widest px-4 py-1.5 rounded-full border border-red-500/40 shadow-lg">
                              Currently Sold Out
                            </span>
                          </div>
                        )}

                        {/* Quick View Floating Eye Button */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onOpenQuickView(product);
                          }}
                          className="absolute bottom-3 right-3 z-20 bg-white/95 hover:bg-white text-[#1f1610] p-2.5 rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-3 group-hover:translate-y-0"
                          title="Quick view product details"
                        >
                          <Eye className="w-4 h-4 text-[#825425]" />
                        </button>
                      </div>

                      {/* Product Metadata */}
                      <div className="p-5 space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-[#825425] font-bold uppercase tracking-widest bg-[#f4ebe1] px-2.5 py-0.5 rounded-full">
                            {product.category}
                          </span>
                          {product.fermentationHours && (
                            <span className="text-[10px] text-[#6e5d4f] font-semibold flex items-center gap-1">
                              <Clock className="w-3 h-3 text-[#825425]" /> {product.fermentationHours}h ferment
                            </span>
                          )}
                        </div>

                        <h3
                          onClick={() => onOpenQuickView(product)}
                          className="font-serif-display text-lg font-bold text-[#1f1610] hover:text-[#825425] cursor-pointer transition-colors line-clamp-1"
                        >
                          {product.name}
                        </h3>

                        <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="px-5 pb-5 pt-2 border-t border-[#e8dec9]/60 flex items-center gap-2">
                      <RippleButton
                        onClick={() => handleDirectWhatsAppOrder(product)}
                        variant="whatsapp"
                        className="flex-1 py-2.5 text-[11px] font-bold tracking-wide"
                        icon={<span className="material-symbols-outlined text-[16px]">chat</span>}
                      >
                        WhatsApp
                      </RippleButton>

                      <RippleButton
                        onClick={() => onAddToCart(product)}
                        variant="secondary"
                        className="py-2.5 px-3"
                        title="Add to cart"
                      >
                        <ShoppingBag className="w-4 h-4" />
                      </RippleButton>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* 5. NEWSLETTER / MORNING BATCH DISPATCH */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto pt-4">
        <ScrollReveal direction="up">
          <div className="relative rounded-3xl bg-gradient-to-br from-[#18130e] via-[#2a1d12] to-[#18130e] p-8 md:p-14 border border-[#c59b27]/30 shadow-2xl text-white overflow-hidden">
            <div className="absolute right-0 top-0 w-96 h-96 bg-[#c59b27]/10 rounded-full blur-3xl pointer-events-none" />

            <div className="max-w-xl mx-auto text-center space-y-5 relative z-10">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#f3cb81] uppercase tracking-widest bg-[#c59b27]/20 px-4 py-1.5 rounded-full border border-[#c59b27]/40">
                <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Morning Oven Dispatch
              </span>

              <h3 className="font-serif-display text-2xl sm:text-4xl font-bold text-[#faf6f0]">
                Fresh Batches & Seasonal drops
              </h3>

              <p className="font-body-md text-xs sm:text-sm text-[#e5d8c8] leading-relaxed">
                Join our private dispatch list to receive alerts when celebration cake menus, floral releases, and custom hamper offers open.
              </p>

              {subscribed ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-[#c59b27] text-black p-4 text-xs font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 shadow-xl"
                >
                  <CheckCircle2 className="w-5 h-5 text-black" /> Subscribed! You will receive morning oven alerts.
                </motion.div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-5 py-3.5 text-sm text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#c59b27] focus:border-transparent transition-all"
                  />
                  <RippleButton
                    type="submit"
                    variant="primary"
                    className="py-3.5 px-8 text-xs uppercase tracking-widest font-bold shrink-0 bg-[#c59b27] hover:bg-[#b0871e] text-black"
                  >
                    Subscribe
                  </RippleButton>
                </form>
              )}
            </div>
          </div>
        </ScrollReveal>
      </section>
    </div>
  );
};

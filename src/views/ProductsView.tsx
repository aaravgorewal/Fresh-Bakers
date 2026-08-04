import React, { useState, useEffect } from 'react';
import { Category, ProductItem } from '../types';
import { PRODUCTS, CATEGORIES, CategoryInfo } from '../data/products';
import { sendProductWhatsAppOrder } from '../utils/whatsapp';
import { CategorySection } from '../components/CategorySection';
import { ProductCard } from '../components/ProductCard';
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
  Tag,
  ChevronDown,
  ArrowUpDown,
  CheckSquare,
  Square
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
  const [priceFilter, setPriceFilter] = useState<'all' | 'under500' | '500to1000' | 'above1000'>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'priceLow' | 'priceHigh' | 'name'>('featured');
  const [egglessOnly, setEgglessOnly] = useState(false);
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [trendingOnly, setTrendingOnly] = useState(false);
  const [signatureOnly, setSignatureOnly] = useState(false);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
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
    if (priceFilter === 'under500') matchesPrice = itemPrice < 500;
    else if (priceFilter === '500to1000') matchesPrice = itemPrice >= 500 && itemPrice <= 1000;
    else if (priceFilter === 'above1000') matchesPrice = itemPrice > 1000;

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

  const resetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
    setPriceFilter('all');
    setSortBy('featured');
    setEgglessOnly(false);
    setFeaturedOnly(false);
    setTrendingOnly(false);
    setSignatureOnly(false);
  };

  const activeFilterCount =
    (selectedCategory !== 'All' ? 1 : 0) +
    (searchQuery !== '' ? 1 : 0) +
    (priceFilter !== 'all' ? 1 : 0) +
    (egglessOnly ? 1 : 0) +
    (featuredOnly ? 1 : 0) +
    (trendingOnly ? 1 : 0) +
    (signatureOnly ? 1 : 0);

  const hasActiveFilters = activeFilterCount > 0;

  return (
    <div className="w-full space-y-10 pb-24">
      {/* 1. LARGE PREMIUM HERO BANNER */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-2 max-w-[1340px] mx-auto">
        <ScrollReveal direction="down" duration={0.8}>
          <div className="relative rounded-3xl overflow-hidden bg-[#2C1A0E] text-[#FFF8F2] shadow-2xl border border-[#D97706]/40 min-h-[420px] sm:min-h-[500px] flex items-center">
            {/* Banner Background Image with Luxury Layered Gradient Overlay */}
            <div className="absolute inset-0 z-0">
              <motion.img
                initial={{ scale: 1.15, opacity: 0.8 }}
                animate={{ scale: 1, opacity: 0.55 }}
                transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                src={
                  selectedCategory === 'All'
                    ? 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1800'
                    : currentCategoryInfo?.bannerImage || currentCategoryInfo?.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1800'
                }
                alt="Fresh Cakes Flowers & Gifts Banner"
                className="w-full h-full object-cover object-center"
              />
              {/* Rich Warm Vignette & Gradient Overlays */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#2C1A0E] via-[#2C1A0E]/90 to-transparent lg:w-2/3" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2C1A0E] via-transparent to-[#2C1A0E]/40" />
              {/* Warm Amber Glow Highlights */}
              <div className="absolute -top-24 -left-24 w-96 h-96 bg-[#D97706]/20 rounded-full blur-3xl pointer-events-none" />
            </div>

            {/* Banner Main Grid */}
            <div className="relative z-10 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 sm:px-12 py-10 items-center">
              {/* Left Column: Heading, Subheading & Action Buttons */}
              <div className="lg:col-span-7 space-y-5">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1, duration: 0.6 }}
                  className="inline-flex items-center gap-2 bg-[#D97706]/20 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#D97706]/50 text-[#F5E5D5] text-xs font-bold uppercase tracking-widest shadow-lg font-sans"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#D97706] animate-pulse" />
                  <span>Royal Indian Bakery & Gifting Studio</span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2, duration: 0.6 }}
                  className="font-serif-display text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#FFF8F2] leading-[1.12]"
                >
                  Fresh Cakes, <br className="hidden sm:inline" />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5E5D5] via-[#D97706] to-[#B45309]">
                    Flowers & Gifts
                  </span>
                </motion.h1>

                {/* Subheading */}
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3, duration: 0.6 }}
                  className="font-body-md text-sm sm:text-lg text-[#F5E5D5] leading-relaxed max-w-xl"
                >
                  Celebrate every occasion with freshly baked cakes, beautiful flowers, balloons and gifts delivered with love.
                </motion.p>

                {/* Action Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.6 }}
                  className="flex flex-wrap items-center gap-3.5 pt-2"
                >
                  {/* Explore Menu Button */}
                  <RippleButton
                    onClick={() => {
                      const menuElem = document.getElementById('menu-products-toolbar');
                      if (menuElem) {
                        menuElem.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    variant="primary"
                    className="py-3.5 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl flex items-center gap-2"
                  >
                    <Cake className="w-4 h-4 text-[#D97706]" />
                    <span>Explore Menu</span>
                  </RippleButton>

                  {/* Order on WhatsApp Button */}
                  <RippleButton
                    onClick={() => {
                      const cleanNum = (whatsappNumber || '15550192824').replace(/[\+\s]/g, '');
                      const message = encodeURIComponent("Hello Fresh Bakers! 👋 I'm browsing your menu and would like to order fresh cakes, flowers & gifts!");
                      window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
                    }}
                    variant="whatsapp"
                    className="py-3.5 px-6 text-xs sm:text-sm font-bold tracking-wider uppercase shadow-xl hover:shadow-2xl flex items-center gap-2"
                  >
                    <span className="material-symbols-outlined text-[18px]">chat</span>
                    <span>Order on WhatsApp</span>
                  </RippleButton>

                  {/* Active Count Badge */}
                  <span className="text-xs font-bold text-[#D97706] bg-black/60 backdrop-blur-md px-3.5 py-2.5 rounded-2xl border border-[#D97706]/40 shadow-inner flex items-center gap-1.5 ml-auto sm:ml-0 font-sans">
                    <Sparkles className="w-3.5 h-3.5 text-[#D97706]" />
                    {sortedProducts.length} Delicacies Ready
                  </span>
                </motion.div>
              </div>

              {/* Right Column: Floating Bakery Illustrations & Interactive Feature Badges */}
              <div className="hidden lg:block lg:col-span-5 relative min-h-[320px]">
                {/* Floating Illustration Card 1: Fresh Cakes & Eggless */}
                <motion.div
                  animate={{ y: [0, -12, 0] }}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute top-2 right-4 bg-[#2C1A0E]/92 backdrop-blur-xl p-4 rounded-2xl border border-[#D97706]/50 shadow-2xl flex items-center gap-3.5 max-w-xs z-20"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#D97706] to-[#7B3F00] p-2.5 flex items-center justify-center shrink-0 shadow-md">
                    <span className="text-2xl">🎂</span>
                  </div>
                  <div>
                    <h4 className="font-serif-display text-sm font-bold text-[#F5E5D5]">100% Eggless Cakes</h4>
                    <p className="text-[11px] text-[#EED4C0] font-body-md leading-tight">Baked with pure desi ghee, cardamom & gourmet cacao.</p>
                  </div>
                </motion.div>

                {/* Floating Illustration Card 2: Fresh Flowers & Hampers */}
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                  className="absolute top-36 left-2 bg-[#2C1A0E]/92 backdrop-blur-xl p-4 rounded-2xl border border-[#D97706]/50 shadow-2xl flex items-center gap-3.5 max-w-xs z-20"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-600 to-rose-900 p-2.5 flex items-center justify-center shrink-0 shadow-md">
                    <span className="text-2xl">💐</span>
                  </div>
                  <div>
                    <h4 className="font-serif-display text-sm font-bold text-rose-200">Flowers & Gift Hampers</h4>
                    <p className="text-[11px] text-[#EED4C0] font-body-md leading-tight">Marigold strands, fresh roses & mithai fusion hampers.</p>
                  </div>
                </motion.div>

                {/* Floating Illustration Card 3: Express Delivery Badge */}
                <motion.div
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="absolute bottom-4 right-8 bg-[#2C1A0E]/92 backdrop-blur-xl px-4 py-3 rounded-2xl border border-[#22C55E]/50 shadow-2xl flex items-center gap-3 z-20"
                >
                  <div className="w-9 h-9 rounded-full bg-[#22C55E]/20 border border-[#22C55E]/40 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-[#22C55E] animate-bounce" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#22C55E] tracking-wider block font-sans">Express Delivery</span>
                    <span className="text-xs font-bold text-white font-sans">Same-Day 2-3 Hr Slots</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* 2. STICKY SEARCH & FILTER TOOLBAR */}
      <div id="menu-products-toolbar" className="sticky top-16 sm:top-20 z-30 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto transition-all scroll-mt-24">
        <div className="bg-white/90 backdrop-blur-xl p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#e8dec9] shadow-xl shadow-[#1f1610]/5">
          {/* Primary Controls Row */}
          <div className="flex items-center justify-between gap-4 sm:gap-6">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#825425]" />
              <input
                type="text"
                placeholder="Search cakes, flowers, hampers, accessories..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 text-xs sm:text-sm bg-[#faf6f0] border border-[#e8dec9] rounded-2xl text-[#1f1610] placeholder-[#a38f7d] focus:outline-none focus:ring-2 focus:ring-[#c59b27]/40 focus:border-[#c59b27] transition-all shadow-inner font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#a38f7d] hover:text-[#1f1610] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Desktop Filters Dropdowns */}
            <div className="hidden lg:flex items-center gap-4 xl:gap-6 text-xs">
              {/* Category Dropdown */}
              <div className="flex items-center gap-2 bg-[#faf6f0] px-4 py-2.5 rounded-2xl border border-[#e8dec9] hover:border-[#c59b27]/60 transition-colors">
                <Cake className="w-4 h-4 text-[#825425]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="bg-transparent text-[#1f1610] font-bold focus:outline-none cursor-pointer text-xs pr-1"
                >
                  <option value="All">All Categories ({CATEGORIES.length})</option>
                  {CATEGORIES.map((cat) => (
                    <option key={cat.name} value={cat.name}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Price Filter Dropdown */}
              <div className="flex items-center gap-2 bg-[#faf6f0] px-4 py-2.5 rounded-2xl border border-[#e8dec9] hover:border-[#c59b27]/60 transition-colors">
                <Tag className="w-4 h-4 text-[#825425]" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value as any)}
                  className="bg-transparent text-[#1f1610] font-bold focus:outline-none cursor-pointer text-xs pr-1"
                >
                  <option value="all">All Prices</option>
                  <option value="under500">Under ₹500</option>
                  <option value="500to1000">₹500 to ₹1000</option>
                  <option value="above1000">Above ₹1000</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#faf6f0] px-4 py-2.5 rounded-2xl border border-[#e8dec9] hover:border-[#c59b27]/60 transition-colors">
                <ArrowUpDown className="w-4 h-4 text-[#825425]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#1f1610] font-bold focus:outline-none cursor-pointer text-xs pr-1"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              {/* Clear / Reset if filters active */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1.5 text-xs font-bold text-[#825425] hover:text-[#18130e] bg-[#f4ebe1] hover:bg-[#e8dec9] px-3.5 py-2.5 rounded-2xl border border-[#e8dec9] shrink-0 transition-colors cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Mobile / Tablet Drawer Toggle Button */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#18130e] text-[#faf6f0] px-4 py-2.5 rounded-2xl border border-[#c59b27]/50 text-xs font-bold shrink-0 shadow-md hover:bg-[#251d16] transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#c59b27]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-[#c59b27] text-[#18130e] w-5 h-5 rounded-full text-[10px] font-black flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>

          {/* Compact Active Filter Badges (if any active non-default selection) */}
          {hasActiveFilters && (
            <div className="flex flex-wrap items-center gap-2 pt-2.5 mt-2.5 border-t border-[#e8dec9]/60">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#a38f7d]">
                Active:
              </span>

              {selectedCategory !== 'All' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#18130e] text-[#f3cb81] px-2.5 py-0.5 rounded-lg border border-[#c59b27]/40">
                  Category: {selectedCategory}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-white"
                    onClick={() => setSelectedCategory('All')}
                  />
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#f4ebe1] text-[#1f1610] px-2.5 py-0.5 rounded-lg border border-[#e8dec9]">
                  Search: "{searchQuery}"
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => setSearchQuery('')}
                  />
                </span>
              )}

              {priceFilter !== 'all' && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#f4ebe1] text-[#1f1610] px-2.5 py-0.5 rounded-lg border border-[#e8dec9]">
                  Price:{' '}
                  {priceFilter === 'under500'
                    ? 'Under ₹500'
                    : priceFilter === '500to1000'
                    ? '₹500 - ₹1000'
                    : 'Above ₹1000'}
                  <X
                    className="w-3 h-3 cursor-pointer hover:text-red-600"
                    onClick={() => setPriceFilter('all')}
                  />
                </span>
              )}

              <button
                onClick={resetFilters}
                className="text-[10px] font-bold text-red-700 underline hover:text-red-900 ml-1 cursor-pointer"
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* 3. PREMIUM CATEGORY CARDS SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto">
        <ScrollReveal delay={0.2}>
          <CategorySection
            selectedCategory={selectedCategory}
            onSelectCategory={setSelectedCategory}
            products={availableProducts}
            title="Browse Our Premium Categories"
            subtitle="Explore handcrafted celebration cakes, fresh floral arrangements, chocolate bouquets, and luxury gift hampers."
          />
        </ScrollReveal>
      </section>

      {/* 4. PRODUCTS GRID OR SKELETON / EMPTY STATE */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto space-y-6">
        {/* Results Header */}
        <div className="flex items-center justify-between border-b border-[#e8dec9] pb-4">
          <div>
            <h2 className="font-serif-display text-2xl font-bold text-[#1f1610]">
              {selectedCategory === 'All' ? 'All Delicacies & Gifts' : selectedCategory}
            </h2>
            <p className="text-xs text-[#6e5d4f] font-body-md mt-0.5">
              Showing {sortedProducts.length} of {availableProducts.length} items
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#825425] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#faf6f0] border border-[#e8dec9] text-[#1f1610] text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

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
                  ? `No items matched your search query "${searchQuery}".`
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
              {sortedProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onOpenQuickView={onOpenQuickView}
                  onAddToCart={onAddToCart}
                  whatsappNumber={whatsappNumber}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        )}
      </section>

      {/* 5. RESPONSIVE MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {isMobileFilterOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileFilterOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Slide-over Drawer Content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="relative w-full max-w-xs sm:max-w-sm bg-[#faf6f0] h-full shadow-2xl z-10 flex flex-col justify-between overflow-hidden"
            >
              {/* Drawer Header */}
              <div className="p-5 bg-[#18130e] text-[#faf6f0] flex items-center justify-between border-b border-[#c59b27]/30">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-5 h-5 text-[#c59b27]" />
                  <h3 className="font-serif-display font-bold text-lg text-white">
                    Filter & Sort Menu
                  </h3>
                </div>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1.5 rounded-full hover:bg-white/10 text-white/80 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Drawer Scrollable Filter Sections */}
              <div className="p-6 space-y-6 overflow-y-auto flex-1 text-sm text-[#1f1610]">
                {/* Category Selection */}
                <div className="space-y-3">
                  <label className="font-serif-display font-bold text-base text-[#1f1610] block border-b border-[#e8dec9] pb-1">
                    Select Category
                  </label>
                  <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
                    <button
                      onClick={() => setSelectedCategory('All')}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                        selectedCategory === 'All'
                          ? 'bg-[#18130e] text-[#c59b27]'
                          : 'hover:bg-[#f4ebe1] text-[#6e5d4f]'
                      }`}
                    >
                      <span>All Categories</span>
                      <span>({availableProducts.length})</span>
                    </button>
                    {CATEGORIES.map((cat) => {
                      const count = availableProducts.filter((p) => p.category === cat.name).length;
                      return (
                        <button
                          key={cat.name}
                          onClick={() => setSelectedCategory(cat.name)}
                          className={`w-full text-left px-3 py-2 rounded-xl text-xs font-bold flex items-center justify-between transition-colors ${
                            selectedCategory === cat.name
                              ? 'bg-[#18130e] text-[#c59b27]'
                              : 'hover:bg-[#f4ebe1] text-[#6e5d4f]'
                          }`}
                        >
                          <span>{cat.name}</span>
                          <span className="text-[10px] opacity-75">({count})</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Price Range */}
                <div className="space-y-3">
                  <label className="font-serif-display font-bold text-base text-[#1f1610] block border-b border-[#e8dec9] pb-1">
                    Price Range
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'all', label: 'All Prices' },
                      { id: 'under500', label: 'Under ₹500' },
                      { id: '500to1000', label: '₹500 - ₹1000' },
                      { id: 'above1000', label: 'Above ₹1000' },
                    ].map((p) => (
                      <button
                        key={p.id}
                        onClick={() => setPriceFilter(p.id as any)}
                        className={`p-2.5 rounded-xl text-xs font-bold border transition-colors ${
                          priceFilter === p.id
                            ? 'bg-[#825425] text-white border-[#825425]'
                            : 'bg-white text-[#6e5d4f] border-[#e8dec9]'
                        }`}
                      >
                        {p.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort By */}
                <div className="space-y-3">
                  <label className="font-serif-display font-bold text-base text-[#1f1610] block border-b border-[#e8dec9] pb-1">
                    Sort Order
                  </label>
                  <div className="space-y-2 text-xs">
                    {[
                      { id: 'featured', label: 'Featured First' },
                      { id: 'priceLow', label: 'Price: Low to High' },
                      { id: 'priceHigh', label: 'Price: High to Low' },
                      { id: 'name', label: 'Name A-Z' },
                    ].map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setSortBy(s.id as any)}
                        className={`w-full text-left p-2.5 rounded-xl font-bold border flex items-center justify-between ${
                          sortBy === s.id
                            ? 'bg-[#18130e] text-[#c59b27] border-[#c59b27]'
                            : 'bg-white text-[#6e5d4f] border-[#e8dec9]'
                        }`}
                      >
                        <span>{s.label}</span>
                        {sortBy === s.id && <Check className="w-4 h-4 text-[#c59b27]" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-5 bg-white border-t border-[#e8dec9] space-y-2">
                <RippleButton
                  onClick={() => setIsMobileFilterOpen(false)}
                  variant="primary"
                  className="w-full py-3.5 text-xs font-bold uppercase tracking-wider"
                >
                  Show {sortedProducts.length} Results
                </RippleButton>
                {hasActiveFilters && (
                  <button
                    onClick={() => {
                      resetFilters();
                      setIsMobileFilterOpen(false);
                    }}
                    className="w-full py-2 text-xs font-bold text-red-700 hover:underline"
                  >
                    Reset All Filters
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 6. NEWSLETTER / MORNING BATCH DISPATCH */}
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


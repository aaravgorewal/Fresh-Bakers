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
    <div className="w-full space-y-8 pb-20 bg-[#FFFBF7]">
      {/* 1. REDUCED HEIGHT HERO */}
      <section className="relative px-4 sm:px-6 lg:px-8 pt-2 max-w-[1340px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#1F1610] text-[#FFFBF7] p-6 sm:p-10 shadow-lg border border-[#3D2C20]">
          {/* Subtle overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#1F1610] via-[#1F1610]/90 to-transparent z-10" />
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-30 z-0 hidden sm:block">
            <img
              src={
                selectedCategory === 'All'
                  ? 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1200'
                  : currentCategoryInfo?.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=1200'
              }
              alt="Bakery Hero"
              className="w-full h-full object-cover object-center"
            />
          </div>

          <div className="relative z-20 max-w-2xl space-y-3">
            {/* Breadcrumb */}
            <nav className="text-xs font-semibold text-[#C59B27] flex items-center gap-1.5 font-sans">
              <span>Home</span>
              <span>/</span>
              <span className="text-white">Menu & Catalog</span>
            </nav>

            {/* Heading */}
            <h1 className="font-serif-display text-2xl sm:text-4xl font-bold tracking-tight text-white leading-snug">
              Artisanal Bakery & Celebration Catalog
            </h1>

            {/* Short Description */}
            <p className="font-body-md text-xs sm:text-sm text-[#E5D8C8] leading-relaxed max-w-xl">
              Explore handcrafted celebration cakes, fresh floral arrangements, and gourmet gift hampers baked fresh daily.
            </p>

            {/* Small CTA */}
            <div className="pt-2">
              <button
                onClick={() => {
                  const cleanNum = (whatsappNumber || '15550192824').replace(/[\+\s]/g, '');
                  const message = encodeURIComponent("Hello Fresh Bakers! 👋 I'm browsing your menu and would like to place an order.");
                  window.open(`https://wa.me/${cleanNum}?text=${message}`, '_blank');
                }}
                className="bg-[#5C2E14] hover:bg-[#3D1E0C] text-white px-4 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-md inline-flex items-center gap-2 cursor-pointer"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                <span>Order via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. STICKY FILTER BAR */}
      <div id="menu-products-toolbar" className="sticky top-16 sm:top-20 z-30 px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto transition-all scroll-mt-24">
        <div className="bg-white/85 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-[#E8DEC9] shadow-sm">
          {/* Primary Controls Row */}
          <div className="flex items-center justify-between gap-3 sm:gap-4">
            {/* Live Search Input */}
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#825425]" />
              <input
                type="text"
                placeholder="Search cakes, flowers, hampers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-9 py-2 text-xs sm:text-sm bg-[#FAF6F0] border border-[#E8DEC9] rounded-xl text-[#1F1610] placeholder-[#825425]/60 focus:outline-none focus:ring-2 focus:ring-[#825425]/30 focus:border-[#825425] transition-all font-medium"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-[#825425]/60 hover:text-[#1F1610] transition-colors cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Desktop Filters Dropdowns */}
            <div className="hidden lg:flex items-center gap-3 text-xs">
              {/* Category Dropdown */}
              <div className="flex items-center gap-2 bg-[#FAF6F0] px-3 py-2 rounded-xl border border-[#E8DEC9] hover:border-[#825425]/50 transition-colors">
                <Cake className="w-4 h-4 text-[#825425]" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value as any)}
                  className="bg-transparent text-[#1F1610] font-bold focus:outline-none cursor-pointer text-xs pr-1"
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
              <div className="flex items-center gap-2 bg-[#FAF6F0] px-3 py-2 rounded-xl border border-[#E8DEC9] hover:border-[#825425]/50 transition-colors">
                <Tag className="w-4 h-4 text-[#825425]" />
                <select
                  value={priceFilter}
                  onChange={(e) => setPriceFilter(e.target.value as any)}
                  className="bg-transparent text-[#1F1610] font-bold focus:outline-none cursor-pointer text-xs pr-1"
                >
                  <option value="all">All Prices</option>
                  <option value="under500">Under ₹500</option>
                  <option value="500to1000">₹500 to ₹1000</option>
                  <option value="above1000">Above ₹1000</option>
                </select>
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#FAF6F0] px-3 py-2 rounded-xl border border-[#E8DEC9] hover:border-[#825425]/50 transition-colors">
                <ArrowUpDown className="w-4 h-4 text-[#825425]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-[#1F1610] font-bold focus:outline-none cursor-pointer text-xs pr-1"
                >
                  <option value="featured">Sort: Featured</option>
                  <option value="priceLow">Price: Low to High</option>
                  <option value="priceHigh">Price: High to Low</option>
                  <option value="name">Name A-Z</option>
                </select>
              </div>

              {/* Reset Filters */}
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="flex items-center gap-1 text-xs font-bold text-[#825425] bg-[#F4EBE1] hover:bg-[#E8DEC9] px-3 py-2 rounded-xl border border-[#E8DEC9] shrink-0 transition-colors cursor-pointer"
                  title="Reset all filters"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden flex items-center gap-2 bg-[#1F1610] text-white px-3.5 py-2 rounded-xl text-xs font-bold shrink-0 shadow-sm hover:bg-[#3D2C20] transition-all cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#C59B27]" />
              <span>Filters</span>
              {activeFilterCount > 0 && (
                <span className="bg-[#C59B27] text-[#1F1610] w-4 h-4 rounded-full text-[10px] font-bold flex items-center justify-center">
                  {activeFilterCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* 3. CATEGORIES HORIZONTAL STRIP */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto">
        <CategorySection
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          products={availableProducts}
        />
      </section>

      {/* 4. PRODUCT GRID (Desktop 4, Tablet 3, Mobile 2) */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-[1340px] mx-auto space-y-4">
        {/* Results Info */}
        <div className="flex items-center justify-between border-b border-[#E8DEC9] pb-3">
          <div>
            <h2 className="font-serif-display text-xl sm:text-2xl font-bold text-[#1F1610]">
              {selectedCategory === 'All' ? 'All Items' : selectedCategory}
            </h2>
            <p className="text-xs text-[#825425] font-medium mt-0.5">
              Showing {sortedProducts.length} items
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-[#825425] hidden sm:inline">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF6F0] border border-[#E8DEC9] text-[#1F1610] text-xs font-bold rounded-xl px-3 py-1.5 focus:outline-none cursor-pointer"
            >
              <option value="featured">Featured First</option>
              <option value="priceLow">Price: Low to High</option>
              <option value="priceHigh">Price: High to Low</option>
              <option value="name">Name A-Z</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {[...Array(8)].map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          /* 8. EMPTY STATE */
          <div className="py-16 text-center bg-white border border-[#E8DEC9] rounded-3xl p-8 max-w-md mx-auto space-y-4 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-[#F4EBE1] text-[#825425] flex items-center justify-center mx-auto">
              <Cake className="w-8 h-8 text-[#825425]" />
            </div>
            <h3 className="font-serif-display text-xl font-bold text-[#1F1610]">
              No Delicacies Found
            </h3>
            <p className="text-[#825425] text-xs sm:text-sm max-w-sm mx-auto leading-relaxed">
              {searchQuery
                ? `No products match your search "${searchQuery}". Try browsing another category or resetting filters.`
                : `No delicacies available under the selected filter criteria.`}
            </p>
            <button
              onClick={resetFilters}
              className="bg-[#5C2E14] hover:bg-[#3D1E0C] text-white py-2.5 px-6 rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-sm cursor-pointer"
            >
              Browse All Categories
            </button>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              layout
              className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6"
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


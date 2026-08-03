import React, { useState, useEffect } from 'react';
import { Category, ProductItem } from '../types';
import { PRODUCTS, CATEGORIES, CategoryInfo } from '../data/products';
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
  RotateCcw
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

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
const renderCategoryIcon = (iconName: string) => {
  switch (iconName) {
    case 'Cake': return <Cake className="w-5 h-5" />;
    case 'Heart': return <Heart className="w-5 h-5" />;
    case 'Sparkles': return <Sparkles className="w-5 h-5" />;
    case 'Camera': return <Camera className="w-5 h-5" />;
    case 'Crown': return <Crown className="w-5 h-5" />;
    case 'ShieldCheck': return <ShieldCheck className="w-5 h-5" />;
    case 'Flame': return <Flame className="w-5 h-5" />;
    case 'Smile': return <Smile className="w-5 h-5" />;
    case 'Apple': return <Apple className="w-5 h-5" />;
    case 'Gift': return <Gift className="w-5 h-5" />;
    case 'Flower2': return <Flower2 className="w-5 h-5" />;
    case 'Package': return <Package className="w-5 h-5" />;
    case 'Box': return <Box className="w-5 h-5" />;
    case 'PartyPopper': return <PartyPopper className="w-5 h-5" />;
    case 'Sparkle': return <Sparkle className="w-5 h-5" />;
    case 'ThumbsUp': return <ThumbsUp className="w-5 h-5" />;
    case 'TrendingUp': return <TrendingUp className="w-5 h-5" />;
    case 'Sprout': return <Sprout className="w-5 h-5" />;
    default: return <Sparkles className="w-5 h-5" />;
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
  }, []);

  // Filter products by Category, Search Query, Price Range, Signature Flag
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

    const matchesSignature = signatureOnly ? Boolean(item.isSignature) : true;

    return matchesCategory && matchesSearch && matchesPrice && matchesSignature;
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
    const rawPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price) || '0');
    const formattedPrice = `$${rawPrice.toFixed(2)}`;

    const message = `Hi Fresh Bakers! I would like to order: ${product.name} - ${formattedPrice} from your ${product.category} menu. Is it available for instant delivery/pickup?`;
    const encoded = encodeURIComponent(message);
    const cleanNum = (whatsappNumber || '15550192824').replace(/[\+\s]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  const cakeCategories = CATEGORIES.filter((c) => c.type === 'cake');
  const additionalCategories = CATEGORIES.filter((c) => c.type === 'additional');

  const resetFilters = () => {
    setSearchQuery('');
    setPriceFilter('all');
    setSortBy('featured');
    setSignatureOnly(false);
  };

  return (
    <div className="w-full space-y-10 pb-20">
      {/* 1. DYNAMIC INDIVIDUAL CATEGORY HERO BANNER */}
      <section className="relative px-4 sm:px-8 pt-4 max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#16110d] text-[#faf6f0] shadow-2xl border border-[#c59b27]/30 min-h-[360px] sm:min-h-[420px] flex items-center">
          {/* Banner Background Image */}
          <div className="absolute inset-0 z-0">
            <img
              src={
                selectedCategory === 'All'
                  ? 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600'
                  : currentCategoryInfo?.bannerImage || currentCategoryInfo?.image || 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1600'
              }
              alt={selectedCategory === 'All' ? 'Master Bakery Catalog' : `${selectedCategory} Banner`}
              className="w-full h-full object-cover object-center opacity-40 scale-105 transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#16110d] via-[#16110d]/85 to-transparent md:w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16110d] via-transparent to-transparent opacity-90" />
          </div>

          {/* Banner Content */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-10 space-y-4">
            <div className="inline-flex items-center gap-2 bg-[#d4a373]/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-widest">
              {currentCategoryInfo ? (
                <>
                  {renderCategoryIcon(currentCategoryInfo.icon)}
                  <span>{currentCategoryInfo.type === 'cake' ? 'Cake Collection' : 'Gifting & Styling'}</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
                  <span>Master Bakery & Gifting Catalog</span>
                </>
              )}
            </div>

            <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#faf6f0] leading-tight">
              {selectedCategory === 'All' ? 'Our Full Daily Menu & Gifting' : selectedCategory}
            </h1>

            <p className="font-body-md text-sm sm:text-base text-[#dccbbb] leading-relaxed max-w-xl">
              {selectedCategory === 'All'
                ? 'Explore our complete array of slow-fermented sourdoughs, birthday cakes, flower bouquets, luxury gift hampers, and party styling decor.'
                : currentCategoryInfo?.tagline || `Handcrafted delicacies prepared fresh daily under our ${selectedCategory} collection.`}
            </p>

            <div className="flex items-center gap-4 pt-2">
              <span className="text-xs font-bold text-[#c59b27] bg-black/50 px-3.5 py-1.5 rounded-full border border-white/10">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'Product Available' : 'Products Available'}
              </span>
              {selectedCategory !== 'All' && (
                <button
                  onClick={() => setSelectedCategory('All')}
                  className="text-xs text-[#d4a373] hover:text-white underline font-semibold transition-colors"
                >
                  ← Back to All Categories
                </button>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SELECTION PILLS (Organized by Cake Categories & Additional Categories) */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-4">
        <div className="glass-panel p-4 rounded-3xl border border-[#e8dec9] shadow-md space-y-3">
          <div className="flex items-center justify-between border-b border-[#e8dec9] pb-2">
            <span className="text-xs font-bold uppercase tracking-widest text-[#825425] flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5" /> Filter by Category
            </span>
            <button
              onClick={() => setSelectedCategory('All')}
              className={`text-xs font-bold px-3 py-1 rounded-full transition-colors ${
                selectedCategory === 'All' ? 'bg-[#825425] text-white' : 'text-[#6e5d4f] hover:bg-[#f4ebe1]'
              }`}
            >
              All Categories ({availableProducts.length})
            </button>
          </div>

          {/* Cake Categories Bar */}
          <div className="space-y-1.5">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a38f7d] block">
              Cake Categories ({cakeCategories.length}):
            </span>
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {cakeCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedCategory === cat.name
                      ? 'bg-[#825425] text-white shadow-md'
                      : 'bg-[#f4ebe1] text-[#6e5d4f] hover:bg-[#e5d8c8] hover:text-[#1f1610]'
                  }`}
                >
                  {renderCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Additional Categories Bar */}
          <div className="space-y-1.5 pt-2 border-t border-[#e8dec9]/60">
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#a38f7d] block">
              Additional Categories ({additionalCategories.length}):
            </span>
            <div className="flex flex-wrap items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none">
              {additionalCategories.map((cat) => (
                <button
                  key={cat.name}
                  onClick={() => setSelectedCategory(cat.name)}
                  className={`px-3.5 py-1.5 text-xs font-bold rounded-full transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    selectedCategory === cat.name
                      ? 'bg-[#825425] text-white shadow-md'
                      : 'bg-[#f4ebe1] text-[#6e5d4f] hover:bg-[#e5d8c8] hover:text-[#1f1610]'
                  }`}
                >
                  {renderCategoryIcon(cat.icon)}
                  <span>{cat.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 3. MULTI-FACETED FILTERING & SORTING TOOLBAR */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="bg-[#faf6f0] p-4 sm:p-5 rounded-2xl border border-[#e8dec9] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative flex-1 max-w-md">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#825425]" />
            <input
              type="text"
              placeholder={`Search within ${selectedCategory === 'All' ? 'catalog' : selectedCategory}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 text-xs bg-white border border-[#e8dec9] rounded-xl text-[#1f1610] placeholder-[#a38f7d] focus:outline-none focus:ring-2 focus:ring-[#825425]/30 focus:border-[#825425]"
            />
          </div>

          {/* Filter Controls Row */}
          <div className="flex flex-wrap items-center gap-3 text-xs">
            {/* Price Filter Dropdown */}
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-[#e8dec9]">
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
            <div className="flex items-center gap-1.5 bg-white px-3 py-2 rounded-xl border border-[#e8dec9]">
              <span className="font-bold text-[#825425]">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#1f1610] font-medium focus:outline-none cursor-pointer text-xs"
              >
                <option value="featured">Featured</option>
                <option value="priceLow">Price: Low to High</option>
                <option value="priceHigh">Price: High to Low</option>
                <option value="name">Name A-Z</option>
              </select>
            </div>

            {/* Signature Tag Toggle */}
            <button
              onClick={() => setSignatureOnly(!signatureOnly)}
              className={`px-3 py-2 rounded-xl border font-bold flex items-center gap-1.5 transition-colors ${
                signatureOnly
                  ? 'bg-[#825425] text-white border-[#825425]'
                  : 'bg-white text-[#6e5d4f] border-[#e8dec9] hover:bg-[#f4ebe1]'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              Signature Only
            </button>

            {/* Reset Filters */}
            {(searchQuery || priceFilter !== 'all' || sortBy !== 'featured' || signatureOnly) && (
              <button
                onClick={resetFilters}
                className="p-2 text-[#825425] hover:text-[#1f1610] hover:bg-[#f4ebe1] rounded-xl transition-colors"
                title="Reset all filters"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS GRID OR EMPTY STATE */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="luxury-card p-4 space-y-4 animate-pulse">
                <div className="w-full h-56 bg-[#e8dec9]/50 rounded-2xl" />
                <div className="h-4 bg-[#e8dec9]/60 rounded w-1/3" />
                <div className="h-6 bg-[#e8dec9] rounded w-2/3" />
                <div className="h-12 bg-[#e8dec9]/40 rounded w-full" />
              </div>
            ))}
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-20 text-center luxury-card p-8 max-w-lg mx-auto space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#f4ebe1] text-[#825425] flex items-center justify-center mx-auto mb-2">
              <Sparkles className="w-8 h-8 text-[#825425]" />
            </div>
            <h2 className="font-serif-display text-2xl font-bold text-[#1f1610]">
              No products found in {selectedCategory}
            </h2>
            <p className="text-[#6e5d4f] font-body-md text-sm max-w-md mx-auto leading-relaxed">
              {searchQuery
                ? `No items matched your search query "${searchQuery}".`
                : 'Try adjusting your filters or price ranges.'}
            </p>
            <button
              onClick={resetFilters}
              className="btn-gold py-2.5 px-6 text-xs font-bold uppercase tracking-wider"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {sortedProducts.map((product) => {
              const isSoldOut = product.available === false;
              const displayPrice =
                typeof product.price === 'number'
                  ? `$${product.price.toFixed(2)}`
                  : product.price;

              return (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="luxury-card overflow-hidden flex flex-col justify-between group relative"
                >
                  <div>
                    {/* Image Container */}
                    <div
                      className="relative aspect-[4/3] overflow-hidden bg-[#f4ebe1] cursor-pointer"
                      onClick={() => onOpenQuickView(product)}
                    >
                      <img
                        src={product.imageUrl || product.image}
                        alt={product.imageAlt || product.name}
                        className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out ${
                          isSoldOut ? 'grayscale opacity-75' : ''
                        }`}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Price Tag */}
                      <div className="absolute top-3 right-3 bg-[#1f1610]/90 backdrop-blur-md text-[#d4a373] text-sm font-bold font-serif-display px-3 py-1 rounded-full border border-[#d4a373]/30 shadow-md">
                        {displayPrice}
                      </div>

                      {/* Signature Badge */}
                      {product.isSignature && (
                        <span className="absolute top-3 left-3 bg-[#825425] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-300" /> Signature
                        </span>
                      )}

                      {/* Quick View Button */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onOpenQuickView(product);
                        }}
                        className="absolute bottom-3 right-3 z-10 bg-white/90 hover:bg-white text-[#1f1610] p-2.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0"
                        title="Quick details"
                      >
                        <Eye className="w-4 h-4 text-[#825425]" />
                      </button>
                    </div>

                    {/* Body Info */}
                    <div className="p-6">
                      <span className="font-label-caps text-[10px] text-[#825425] uppercase tracking-widest font-bold block mb-1">
                        {product.category}
                      </span>

                      <h3
                        onClick={() => onOpenQuickView(product)}
                        className="font-serif-display text-xl font-bold text-[#1f1610] hover:text-[#825425] cursor-pointer mb-2 transition-colors line-clamp-1"
                      >
                        {product.name}
                      </h3>

                      <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed line-clamp-2 mb-4">
                        {product.description}
                      </p>
                    </div>
                  </div>

                  {/* Footer Buttons */}
                  <div className="px-6 pb-6 pt-2 border-t border-[#e8dec9] flex gap-2">
                    <button
                      onClick={() => handleDirectWhatsAppOrder(product)}
                      className="flex-1 btn-primary py-2.5 text-[11px] flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      WhatsApp Order
                    </button>
                    <button
                      onClick={() => onAddToCart(product)}
                      className="btn-gold py-2.5 px-3 text-[11px]"
                      title="Add to order cart"
                    >
                      <ShoppingBag className="w-4 h-4" />
                    </button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </section>

      {/* 5. NEWSLETTER DISPATCH */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl bg-gradient-to-br from-[#f4ebe1] via-[#e5d8c8] to-[#f4ebe1] p-8 md:p-12 border border-[#e8dec9] shadow-xl overflow-hidden">
          <div className="max-w-xl mx-auto text-center space-y-4">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#825425] uppercase tracking-widest bg-white/60 px-3 py-1 rounded-full border border-[#e8dec9]">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Morning Oven Dispatch
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1f1610]">
              Get Notified When Fresh Batches Leave the Oven
            </h3>
            <p className="font-body-md text-xs sm:text-sm text-[#6e5d4f] leading-relaxed">
              Subscribe to our weekly bulletin for celebration cake drops, seasonal floral releases, and custom hamper offers.
            </p>

            {subscribed ? (
              <div className="bg-[#825425] text-white p-4 text-xs font-bold uppercase tracking-widest rounded-xl flex items-center justify-center gap-2 shadow-md">
                <CheckCircle2 className="w-4 h-4" /> Thank you! You are subscribed to bake alerts.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 bg-white border border-[#e8dec9] rounded-xl px-4 py-3 text-sm text-[#1f1610] focus:outline-none focus:ring-2 focus:ring-[#825425]/30 focus:border-[#825425]"
                />
                <button type="submit" className="btn-gold text-xs tracking-widest py-3 px-6 uppercase font-bold">
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

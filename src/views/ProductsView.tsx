import React, { useState } from 'react';
import { Category, ProductItem } from '../types';
import { PRODUCTS, CATEGORIES } from '../data/products';
import { Search, Filter, Clock, Sparkles, CheckCircle2 } from 'lucide-react';

interface ProductsViewProps {
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  onOpenQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  selectedCategory,
  setSelectedCategory,
  onOpenQuickView,
  onAddToCart,
  onOpenOrderModal,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const categoriesList: (Category | 'All')[] = ['All', ...CATEGORIES.map((c) => c.name)];

  const filteredProducts = PRODUCTS.filter((item) => {
    const matchesCategory = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="w-full px-5 md:px-16 py-12 max-w-[1200px] mx-auto">
      {/* Page Header matching Page 4 screenshot */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1">
          Handcrafted Daily Batch
        </span>
        <h1 className="font-display-lg md:text-5xl text-[#1b1c1a] font-bold mb-4">
          Our Daily Bake Menu
        </h1>
        <p className="font-body-md text-[#51443a] text-sm md:text-base leading-relaxed">
          Explore our complete selection of slow-fermented sourdoughs, buttery laminated viennoiserie, cookies, and artisanal cakes available for bakery pickup or WhatsApp order.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#f5f3ef] p-4 border border-[#d5c3b6]">
          {/* Category Pill Filters */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#825425] text-white shadow-xs'
                    : 'bg-[#e6ded9] text-[#51443a] hover:bg-[#d5c3b6]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#837469]" />
            <input
              type="text"
              placeholder="Search sourdough, croissant..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-[#d5c3b6] text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
            />
          </div>
        </div>
      </div>

      {/* Products Grid matching Page 4 screenshot */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-[#f5f3ef] border border-dashed border-[#d5c3b6] my-8">
          <p className="text-[#51443a] font-body-md text-base mb-2">
            No bakery items found matching "{searchQuery}".
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn-secondary text-xs uppercase tracking-widest mt-2"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="print-card bg-white p-5 flex flex-col justify-between group hover:shadow-xl transition-all duration-300"
            >
              <div>
                <div
                  className="relative overflow-hidden cursor-pointer mb-4 bg-[#f5f3ef]"
                  onClick={() => onOpenQuickView(product)}
                >
                  <img
                    src={product.image}
                    alt={product.imageAlt}
                    className="w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-3 right-3 bg-[#825425] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1">
                    {product.price}
                  </div>
                  {product.fermentationHours && (
                    <span className="absolute bottom-3 left-3 bg-[#1b1c1a]/80 text-[#e6ded9] text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#c68e5a]" /> {product.fermentationHours}H Cold Ferment
                    </span>
                  )}
                </div>

                <div className="flex justify-between items-start mb-1">
                  <span className="font-label-caps text-[11px] text-[#825425] uppercase tracking-widest">
                    {product.category}
                  </span>
                </div>

                <h3
                  onClick={() => onOpenQuickView(product)}
                  className="font-headline-sm text-xl font-bold text-[#1b1c1a] hover:text-[#825425] cursor-pointer mb-2 transition-colors"
                >
                  {product.name}
                </h3>

                <p className="font-body-md text-xs text-[#51443a] leading-relaxed mb-4 line-clamp-3">
                  {product.description}
                </p>
              </div>

              <div className="pt-4 border-t border-[#e4e2de] flex gap-2">
                <button
                  onClick={() => {
                    onAddToCart(product);
                    onOpenOrderModal();
                  }}
                  className="flex-1 btn-primary py-2.5 text-xs tracking-wider flex items-center justify-center gap-1.5"
                >
                  <span className="material-symbols-outlined text-[16px]">chat</span>
                  Order on WhatsApp
                </button>
                <button
                  onClick={() => onOpenQuickView(product)}
                  className="btn-secondary py-2.5 px-3 text-xs uppercase"
                  title="View Ingredients & Details"
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Newsletter Subscription Block (Matching Daily Bake Alerts) */}
      <div className="bg-[#e6ded9] p-8 md:p-12 border border-[#d5c3b6] relative overflow-hidden">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block">
            Morning Bake Bulletin
          </span>
          <h3 className="font-headline-md text-2xl md:text-3xl font-bold text-[#1b1c1a]">
            Get Notified When Fresh Loaves Leave the Oven
          </h3>
          <p className="font-body-md text-xs md:text-sm text-[#51443a] leading-relaxed">
            Subscribe to our weekly dispatch for weekend special bakes, seasonal pastry releases, and sourdough starter tips.
          </p>

          {subscribed ? (
            <div className="bg-[#825425] text-white p-4 text-xs font-semibold uppercase tracking-widest flex items-center justify-center gap-2 animate-fadeIn">
              <CheckCircle2 className="w-4 h-4" /> Thank you! You're subscribed to daily bake alerts.
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 pt-2">
              <input
                type="email"
                required
                placeholder="Enter your email address..."
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                className="flex-1 bg-white border border-[#d5c3b6] px-4 py-3 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
              />
              <button type="submit" className="btn-primary text-xs tracking-widest py-3 uppercase">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

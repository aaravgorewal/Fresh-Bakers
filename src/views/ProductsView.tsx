import React, { useState, useEffect } from 'react';
import { Category, ProductItem } from '../types';
import { PRODUCTS } from '../data/products';
import { Search, Clock, CheckCircle2 } from 'lucide-react';

interface ProductsViewProps {
  products?: ProductItem[];
  selectedCategory: Category | 'All';
  setSelectedCategory: (cat: Category | 'All') => void;
  onOpenQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
  whatsappNumber?: string;
}

export const ProductsView: React.FC<ProductsViewProps> = ({
  products = PRODUCTS,
  selectedCategory,
  setSelectedCategory,
  onOpenQuickView,
  onAddToCart,
  onOpenOrderModal,
  whatsappNumber = '15550192824',
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const availableProducts = products.length > 0 ? products : PRODUCTS;

  // Extract distinct categories from the products collection
  const distinctCategories = Array.from(
    new Set(availableProducts.map((p) => p.category))
  ).filter(Boolean) as Category[];

  const categoriesList: (Category | 'All')[] = ['All', ...distinctCategories];

  // Apply URL parameter filter on mount if present
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('category');
    if (catParam) {
      // Check if matching any category
      const matched = distinctCategories.find(
        (c) => c.toLowerCase() === catParam.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(matched);
      }
    }
  }, []);

  const filteredProducts = availableProducts.filter((item) => {
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

  const handleDirectWhatsAppOrder = (product: ProductItem) => {
    const rawPrice = typeof product.price === 'number' ? product.price : parseFloat(String(product.price) || '0');
    const formattedPrice = `₹${rawPrice.toFixed(2)}`;

    const message = `Hi! I'd like to order: ${product.name} - ${formattedPrice}. Is it available?`;
    const encoded = encodeURIComponent(message);
    const cleanNum = (whatsappNumber || '15550192824').replace(/[\+\s]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="w-full px-5 md:px-16 py-12 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1 font-semibold text-xs">
          Handcrafted Daily Batch
        </span>
        <h1 className="font-display-lg text-3xl md:text-5xl text-[#1b1c1a] font-bold mb-4">
          Our Daily Bake Menu
        </h1>
        <p className="font-body-md text-[#51443a] text-sm md:text-base leading-relaxed">
          Explore our complete selection of slow-fermented sourdoughs, buttery laminated viennoiserie, cookies, and artisanal cakes available for bakery pickup or WhatsApp order.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-10 space-y-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-[#f5f3ef] p-4 border border-[#d5c3b6]">
          {/* Category Pill Filters (Distinct categories from Firestore) */}
          <div className="flex flex-wrap gap-2 justify-center md:justify-start">
            {categoriesList.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-semibold uppercase tracking-wider transition-all ${
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

      {/* Products Grid - 3 Columns Desktop, 1 Column Mobile */}
      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-[#f5f3ef] border border-dashed border-[#d5c3b6] my-8 px-4">
          <p className="font-headline-sm text-xl font-bold text-[#1b1c1a] mb-2">
            {selectedCategory !== 'All' ? 'No items in this category yet' : 'No items found'}
          </p>
          <p className="text-[#51443a] font-body-md text-sm mb-4 max-w-md mx-auto">
            {searchQuery
              ? `No bakery items matched your search query "${searchQuery}".`
              : selectedCategory !== 'All'
              ? `We currently don't have active menu items under ${selectedCategory}. Check back soon or view our other categories!`
              : 'There are no products available at the moment.'}
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="btn-secondary text-xs uppercase tracking-widest px-4 py-2 font-semibold"
          >
            Show All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((product) => {
            const isSoldOut = product.available === false;
            const displayPrice = typeof product.price === 'number'
              ? `$${product.price.toFixed(2)}`
              : product.price;

            return (
              <div
                key={product.id}
                className="print-card bg-white p-5 flex flex-col justify-between group hover:shadow-xl transition-all duration-300 border border-[#d5c3b6]"
              >
                <div>
                  <div
                    className="relative overflow-hidden cursor-pointer mb-4 bg-[#f5f3ef]"
                    onClick={() => onOpenQuickView(product)}
                  >
                    <img
                      src={product.imageUrl || product.image}
                      alt={product.imageAlt || product.name}
                      className={`w-full h-60 object-cover group-hover:scale-105 transition-transform duration-500 ${
                        isSoldOut ? 'grayscale opacity-75' : ''
                      }`}
                    />
                    <div className="absolute top-3 right-3 bg-[#825425] text-white text-xs font-bold uppercase tracking-wider px-2.5 py-1 shadow-xs">
                      {displayPrice}
                    </div>

                    {isSoldOut && (
                      <span className="absolute top-3 left-3 bg-[#8b2626] text-white text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 shadow-xs">
                        Sold Out
                      </span>
                    )}

                    {product.fermentationHours && !isSoldOut && (
                      <span className="absolute bottom-3 left-3 bg-[#1b1c1a]/80 text-[#e6ded9] text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#c68e5a]" /> {product.fermentationHours}H Cold Ferment
                      </span>
                    )}
                  </div>

                  <div className="flex justify-between items-start mb-1">
                    <span className="font-label-caps text-[11px] text-[#825425] uppercase tracking-widest font-semibold">
                      {product.category}
                    </span>
                  </div>

                  <h3
                    onClick={() => onOpenQuickView(product)}
                    className="font-headline-sm text-xl font-bold text-[#1b1c1a] hover:text-[#825425] cursor-pointer mb-2 transition-colors line-clamp-1"
                  >
                    {product.name}
                  </h3>

                  <p className="font-body-md text-xs text-[#51443a] leading-relaxed mb-4 line-clamp-3">
                    {product.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#e4e2de] flex gap-2">
                  {isSoldOut ? (
                    <div className="flex-1 bg-[#e6ded9] text-[#837469] py-2.5 text-xs font-bold uppercase tracking-widest text-center cursor-not-allowed border border-[#d5c3b6]">
                      Sold Out
                    </div>
                  ) : (
                    <button
                      onClick={() => handleDirectWhatsAppOrder(product)}
                      className="flex-1 btn-primary py-2.5 text-xs tracking-wider flex items-center justify-center gap-1.5 uppercase font-semibold"
                    >
                      <span className="material-symbols-outlined text-[16px]">chat</span>
                      Order on WhatsApp
                    </button>
                  )}
                  <button
                    onClick={() => onOpenQuickView(product)}
                    className="btn-secondary py-2.5 px-3 text-xs uppercase font-semibold"
                    title="View Ingredients & Details"
                  >
                    Details
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Newsletter Subscription Block */}
      <div className="bg-[#e6ded9] p-8 md:p-12 border border-[#d5c3b6] relative overflow-hidden">
        <div className="max-w-xl mx-auto text-center space-y-4">
          <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block font-semibold">
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


import React, { useState } from 'react';
import { NavTab, ProductItem, Category } from '../types';
import { CATEGORIES, PRODUCTS } from '../data/products';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  ArrowRight,
  Star,
  Quote,
  Sparkles,
  Clock,
  Wheat,
  Eye,
  ShoppingBag,
  ShieldCheck,
  Gift,
  Cake,
  PartyPopper,
  Heart,
  MapPin,
  Navigation,
  MessageCircle,
  ExternalLink,
  X,
  Plus,
  Check,
  Flame,
  Award,
  Crown,
  Sparkle,
  Camera,
  Smile,
  Apple,
  Flower2,
  Package,
  Box,
  ThumbsUp,
  TrendingUp,
  Sprout
} from 'lucide-react';

interface HomeViewProps {
  products?: ProductItem[];
  setActiveTab: (tab: NavTab) => void;
  onSelectCategory: (cat: Category) => void;
  onOpenQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
}

// Custom data for popular cake categories
const POPULAR_CAKE_CATEGORIES = [
  {
    id: 'celebration-gateaux',
    title: 'Signature Celebration Gateaux',
    description: 'Multi-layer vanilla & Belgian dark chocolate sponges layered with fresh fruit compotes.',
    startingPrice: '$38.00',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bento-cakes',
    title: 'Bento Mini Party Cakes',
    description: 'Adorable 4-inch customized bento box cakes with personalized piping and vintage pastel frosting.',
    startingPrice: '$18.00',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fresh-fruit-tarts',
    title: 'Fresh Fruit & Tart Gateaux',
    description: 'Butter shortcrust loaded with vanilla bean diplomat cream and fresh seasonal berries.',
    startingPrice: '$32.00',
    tag: 'Fresh Harvest',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'pistachio-velvet',
    title: 'Pistachio & Matcha Velvet',
    description: 'Pure roasted Iranian pistachio mousse paired with delicate matcha sponge layers.',
    startingPrice: '$44.00',
    tag: 'Chef Choice',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'eggless-glutenfree',
    title: 'Eggless & Dietary Speciality',
    description: 'Decadent dark chocolate avocado mousse and almond flour sponge cakes.',
    startingPrice: '$36.00',
    tag: 'Dietary Safe',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'tiered-wedding',
    title: 'Tiered Wedding & Milestone',
    description: 'Multi-tier showpiece cakes adorned with wafer paper florals and edible 24k gold leaf.',
    startingPrice: '$120.00',
    tag: 'Bespoke',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
  },
];

// Custom Gift Hampers
const GIFT_HAMPERS = [
  {
    id: 'hamper-royal',
    name: 'The Royal Sourdough & Wild Honey Chest',
    price: 48.0,
    items: ['1x Classic Sourdough Loaf', '1x Jar Wildflower Raw Honey', '1x Seeded Rye Crispbread', '1x Wooden Honey Dipper'],
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    badge: 'Luxury Box',
  },
  {
    id: 'hamper-morning',
    name: "Morning Pastry Lover's Box",
    price: 36.0,
    items: ['2x Almond Croissants', '2x Pain au Chocolat', '2x Fruit Danish', '1x Single-Origin Coffee Bag'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular Gift',
  },
  {
    id: 'hamper-cookie',
    name: 'Artisan Cookie & Tea Tin',
    price: 28.0,
    items: ['6x Sea Salt Chocolate Cookies', '6x Pistachio Shortbread', '1x Loose Leaf Earl Grey Tin'],
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    badge: 'Sweet Treat',
  },
  {
    id: 'hamper-champagne',
    name: 'Celebration Cake & Macaron Hamper',
    price: 75.0,
    items: ['1x Mini Bento Celebration Cake', '6x French Macarons', '1x Sparkling Cider Bottle', 'Custom Greeting Card'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    badge: 'Grand Celebration',
  },
];

// Balloon Packages
const BALLOON_PACKAGES = [
  {
    id: 'balloon-arch',
    title: 'Pastel Organic Balloon Arch',
    price: '$85.00',
    desc: 'Soft nude, blush, and metallic gold balloon arch tailored for dessert table backdrops.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'balloon-numbers',
    title: 'Golden Metallic Age Balloons',
    price: '$18.00',
    desc: '40-inch foil helium number balloons (0-9) anchored with satin ribbon weights.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'balloon-backdrop',
    title: 'Theme Cake Table Decor Setup',
    price: '$120.00',
    desc: 'Complete table styling with arch, acrylic cake pedestal, and LED warm fairy lights.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'balloon-reveal',
    title: 'Gender Reveal Balloon Bundle',
    price: '$65.00',
    desc: '36-inch opaque confetti pop balloon plus matching pastel table bouquets.',
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&q=80&w=600',
  },
];

// Birthday Accessories
const BIRTHDAY_ACCESSORIES: ProductItem[] = [
  {
    id: 'acc-beeswax-candles',
    name: 'Honey Beeswax Birthday Candles',
    category: 'Birthday Accessories',
    price: 6.0,
    priceNum: 6.0,
    description: 'Hand-dipped 100% natural beeswax candles with subtle sweet honey aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-gold-topper',
    name: "Acrylic 'Happy Birthday' Topper",
    category: 'Birthday Accessories',
    price: 8.0,
    priceNum: 8.0,
    description: 'Mirror gold reusable acrylic cake topper statement piece.',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-sparkler-fountains',
    name: 'Golden Sparkler Fountains (Pack of 4)',
    category: 'Birthday Accessories',
    price: 12.0,
    priceNum: 12.0,
    description: 'Smokeless cake sparklers that erupt into 45 seconds of gold glitter flames.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-party-crown',
    name: 'Luxe Velvet Party Crown & Banner',
    category: 'Birthday Accessories',
    price: 10.0,
    priceNum: 10.0,
    description: 'Soft velvet embroidered crown and matching rustic linen celebration banner.',
    imageUrl: 'https://images.unsplash.com/photo-1531956531700-dc024130f3a0?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1531956531700-dc024130f3a0?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-wooden-server',
    name: 'Engraved Wooden Cake Server Set',
    category: 'Birthday Accessories',
    price: 16.0,
    priceNum: 16.0,
    description: 'Handcrafted walnut cake knife and slice server with brass brass accents.',
    imageUrl: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
];

// Gallery Images
const GALLERY_ITEMS = [
  {
    id: 'gal-1',
    title: 'Hearth Fired Sourdough Crumb',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=800',
    caption: 'Airy, open structure from 36-hour wild starter fermentation.',
  },
  {
    id: 'gal-2',
    title: 'Hand Laminated Viennoiserie',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&q=80&w=800',
    caption: '27 butter folds prepared with French cultured butter.',
  },
  {
    id: 'gal-3',
    title: 'Celebration Dessert Table Styling',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800',
    caption: 'Bespoke birthday dessert spreads designed for luxury venues.',
  },
  {
    id: 'gal-4',
    title: 'Fresh Berry Gateaux Assembly',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=800',
    caption: 'Organic local berries layered with vanilla diplomat cream.',
  },
  {
    id: 'gal-5',
    title: 'Artisan Gifting Hamper Boxes',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=800',
    caption: 'Handcrafted luxury hamper chests for holidays and corporate events.',
  },
  {
    id: 'gal-6',
    title: 'Stone-Ground Flour & Dough Kneading',
    image: 'https://images.unsplash.com/photo-1517433670267-08bbd4be890f?auto=format&fit=crop&q=80&w=800',
    caption: 'Traditional stone milling preserves natural vitamins and grain germ.',
  },
];

export const HomeView: React.FC<HomeViewProps> = ({
  products = PRODUCTS,
  setActiveTab,
  onSelectCategory,
  onOpenQuickView,
  onAddToCart,
  onOpenOrderModal,
}) => {
  const currentProducts = products.length > 0 ? products : PRODUCTS;

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchCategory, setSearchCategory] = useState<string>('All');

  // Gallery Modal State
  const [selectedGalleryImage, setSelectedGalleryImage] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  // Added To Cart Toast Feedback
  const [addedItemName, setAddedItemName] = useState<string | null>(null);

  const handleQuickAdd = (p: ProductItem) => {
    onAddToCart(p);
    setAddedItemName(p.name);
    setTimeout(() => {
      setAddedItemName(null);
    }, 2000);
  };

  // Filtered products for Search Section
  const filteredSearchProducts = currentProducts.filter((p) => {
    const matchesQuery =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = searchCategory === 'All' || p.category === searchCategory;
    return matchesQuery && matchesCat;
  });

  // Distinct categories
  const distinctCategories = Array.from(new Set(currentProducts.map((p) => p.category))).filter(Boolean) as Category[];
  const categoriesToShow = distinctCategories.length > 0 ? distinctCategories : CATEGORIES.map((c) => c.name);

  const renderLucideCategoryIcon = (iconName: string) => {
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

  const getCategoryMeta = (catName: Category) => {
    const predefined = CATEGORIES.find((c) => c.name === catName);
    const prodInCat = currentProducts.find((p) => p.category === catName);
    const count = currentProducts.filter((p) => p.category === catName).length;
    const image = predefined?.image || prodInCat?.imageUrl || prodInCat?.image || 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80';
    return {
      image,
      count,
      icon: predefined?.icon || 'Cake',
      tagline: predefined?.tagline || '',
      type: predefined?.type || 'cake',
    };
  };

  // Trending & Recommend sets
  const trendingProducts = currentProducts.slice(0, 6);
  const recommendedProducts = currentProducts.filter((p) => p.isSignature || p.priceNum! > 5.0).slice(0, 4);

  return (
    <div className="w-full space-y-20 pb-20 relative">
      {/* Toast Feedback */}
      <AnimatePresence>
        {addedItemName && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 right-6 z-50 bg-[#1f1610] text-[#faf6f0] px-5 py-3.5 rounded-2xl shadow-2xl border border-[#c59b27]/40 flex items-center gap-3"
          >
            <div className="w-8 h-8 rounded-full bg-[#825425] text-white flex items-center justify-center">
              <Check className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#faf6f0]">{addedItemName}</p>
              <p className="text-[10px] text-[#c59b27]">Added to WhatsApp Cart</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. HERO BANNER */}
      <section className="relative px-4 sm:px-8 pt-4 max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#16110d] text-[#faf6f0] shadow-2xl border border-[#c59b27]/30 min-h-[560px] md:min-h-[640px] flex items-center">
          {/* Hero Background Image with Multi-layer Gradient */}
          <div className="absolute inset-0 z-0">
            <img
              src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=1600"
              alt="Freshly baked sourdoughs & artisan pastries"
              className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#16110d] via-[#16110d]/90 to-transparent md:w-3/4" />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16110d] via-transparent to-transparent opacity-90" />
          </div>

          {/* Hero Content */}
          <div className="relative z-10 max-w-2xl px-6 sm:px-12 py-16 md:py-20 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 bg-[#d4a373]/15 backdrop-blur-md px-4 py-1.5 rounded-full border border-[#d4a373]/30 text-[#d4a373] text-xs font-bold uppercase tracking-widest"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" />
              Handcrafted Bakery & Celebration Haven
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-serif-display text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#faf6f0] leading-[1.15]"
            >
              Artisan Bakes, <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a373] via-[#c59b27] to-[#e5d8c8] italic">
                Custom Cakes & Gifts
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="font-body-md text-base sm:text-lg text-[#dccbbb] leading-relaxed max-w-xl"
            >
              Slow-fermented wild sourdoughs, flaky butter viennoiserie, custom celebration cakes, and handcrafted hampers — prepared daily with stone-ground heirloom grains.
            </motion.p>

            {/* Value Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="flex flex-wrap gap-2.5 text-xs text-[#d4a373] pt-1"
            >
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <Wheat className="w-3.5 h-3.5" /> 100% Stone-Ground
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <Clock className="w-3.5 h-3.5" /> 36h Wild Ferment
              </span>
              <span className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                <ShieldCheck className="w-3.5 h-3.5" /> 84% Normandy Butter
              </span>
            </motion.div>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4"
            >
              <button
                onClick={() => {
                  window.history.pushState(null, '', '/products');
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-gold py-3.5 px-8 flex items-center justify-center gap-2 font-bold shadow-lg group"
              >
                <span>Explore Full Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <button
                onClick={onOpenOrderModal}
                className="btn-primary py-3.5 px-8 flex items-center justify-center gap-2 bg-[#825425] hover:bg-[#673d10] text-white"
              >
                <MessageCircle className="w-4 h-4" />
                WhatsApp Pre-Order
              </button>
            </motion.div>
          </div>

          {/* Rating Badge */}
          <div className="hidden lg:flex absolute bottom-8 right-8 z-10 glass-panel-dark px-5 py-3.5 rounded-2xl items-center gap-4 border border-[#c59b27]/30 shadow-2xl">
            <div className="flex -space-x-2">
              <img className="w-9 h-9 rounded-full border-2 border-[#16110d] object-cover" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" alt="Customer avatar" />
              <img className="w-9 h-9 rounded-full border-2 border-[#16110d] object-cover" src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Customer avatar" />
              <img className="w-9 h-9 rounded-full border-2 border-[#16110d] object-cover" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100" alt="Customer avatar" />
            </div>
            <div>
              <div className="flex items-center gap-1 text-amber-400 text-xs">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                ))}
                <span className="font-bold text-white ml-1">4.9 / 5</span>
              </div>
              <p className="text-[11px] text-[#a38f7d] font-medium">Over 1,200+ WhatsApp Pre-Orders</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SEARCH PRODUCTS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="luxury-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block font-bold mb-1">
                Instant Discovery
              </span>
              <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#1f1610]">
                Search Our Bakery Catalog
              </h2>
            </div>
            <span className="text-xs text-[#6e5d4f] font-medium">
              Showing <strong className="text-[#825425]">{filteredSearchProducts.length}</strong> items
            </span>
          </div>

          {/* Search Input Bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#825425]" />
            <input
              type="text"
              placeholder="Search sourdough, almond croissant, celebration cake, cookies, hampers..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#f4ebe1] border border-[#e8dec9] rounded-2xl pl-12 pr-10 py-3.5 text-sm text-[#1f1610] placeholder-[#a38f7d] focus:outline-none focus:border-[#825425] transition-all shadow-inner"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a38f7d] hover:text-[#1f1610]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <button
              onClick={() => setSearchCategory('All')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                searchCategory === 'All'
                  ? 'bg-[#825425] text-white shadow-md'
                  : 'bg-[#f4ebe1] text-[#6e5d4f] hover:bg-[#e8dec9]'
              }`}
            >
              All Items
            </button>
            {categoriesToShow.map((cat) => (
              <button
                key={cat}
                onClick={() => setSearchCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                  searchCategory === cat
                    ? 'bg-[#825425] text-white shadow-md'
                    : 'bg-[#f4ebe1] text-[#6e5d4f] hover:bg-[#e8dec9]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Live Search Results Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-[#e8dec9]">
            {filteredSearchProducts.slice(0, 4).map((product) => {
              const formattedPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
              const img = product.imageUrl || product.image;
              return (
                <div
                  key={product.id}
                  className="bg-[#faf6f0] p-3 rounded-2xl border border-[#e8dec9] flex gap-3 items-center hover:border-[#c59b27] transition-all group"
                >
                  <img
                    src={img}
                    alt={product.name}
                    className="w-16 h-16 rounded-xl object-cover border border-[#e8dec9]"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] uppercase tracking-widest font-bold text-[#825425] block truncate">
                      {product.category}
                    </span>
                    <h4 className="font-serif-display font-bold text-xs text-[#1f1610] truncate group-hover:text-[#825425]">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-[#825425] mt-0.5">{formattedPrice}</p>
                  </div>
                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="p-2 rounded-xl bg-[#f4ebe1] hover:bg-[#825425] hover:text-white text-[#825425] transition-colors"
                    title="Add to WhatsApp cart"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. SHOP BY CATEGORY */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="font-label-caps text-[#825425] tracking-[0.2em] uppercase block mb-1 font-bold text-xs">
              Curated Collections
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
              Shop by Category
            </h2>
          </div>
          <button
            onClick={() => {
              window.history.pushState(null, '', '/products');
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center gap-2 text-xs font-bold text-[#825425] uppercase tracking-wider hover:text-[#673d10] transition-colors group"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categoriesToShow.map((catName) => {
            const { image, count, icon, tagline } = getCategoryMeta(catName);
            return (
              <motion.div
                key={catName}
                whileHover={{ y: -6, scale: 1.02 }}
                onClick={() => {
                  onSelectCategory(catName);
                  setActiveTab('products');
                }}
                className="luxury-card overflow-hidden cursor-pointer group flex flex-col justify-between relative border border-[#e8dec9] hover:border-[#825425] transition-all shadow-xs"
              >
                <div className="relative aspect-[4/3] bg-[#f4ebe1] overflow-hidden">
                  <img
                    src={image}
                    alt={catName}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

                  {/* Icon Badge */}
                  <div className="absolute top-2.5 left-2.5 w-8 h-8 rounded-full bg-[#1f1610]/90 text-[#c59b27] flex items-center justify-center shadow-md border border-[#c59b27]/30">
                    {renderLucideCategoryIcon(icon)}
                  </div>

                  {/* Product Count Pill */}
                  <div className="absolute bottom-2.5 right-2.5 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                    {count} {count === 1 ? 'item' : 'items'}
                  </div>
                </div>

                <div className="p-3.5 space-y-1">
                  <h3 className="font-serif-display font-bold text-sm text-[#1f1610] group-hover:text-[#825425] transition-colors leading-snug line-clamp-1">
                    {catName}
                  </h3>
                  {tagline && (
                    <p className="text-[10px] text-[#6e5d4f] line-clamp-1 leading-tight font-medium">
                      {tagline}
                    </p>
                  )}
                  <span className="text-[9px] uppercase tracking-widest font-bold text-[#825425] block pt-1 group-hover:translate-x-1 transition-transform">
                    Shop Now →
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 4. POPULAR CAKE CATEGORIES */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="bg-[#1f1610] text-[#faf6f0] rounded-3xl p-6 sm:p-10 border border-[#c59b27]/30 space-y-8 shadow-2xl">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#c59b27]/30 pb-6">
            <div className="space-y-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#c59b27] uppercase tracking-widest bg-[#c59b27]/10 px-3.5 py-1 rounded-full border border-[#c59b27]/30">
                <Cake className="w-3.5 h-3.5" /> Celebration Masterpieces
              </span>
              <h2 className="font-serif-display text-3xl md:text-4xl font-bold text-[#faf6f0]">
                Popular Cake Categories
              </h2>
            </div>
            <button
              onClick={() => {
                onSelectCategory('Cakes');
                setActiveTab('products');
              }}
              className="btn-gold py-2.5 px-6 text-xs font-bold uppercase tracking-wider"
            >
              Browse All Cakes
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {POPULAR_CAKE_CATEGORIES.map((cakeCat) => (
              <motion.div
                key={cakeCat.id}
                whileHover={{ y: -6 }}
                className="luxury-card overflow-hidden bg-[#2d2118] border border-[#c59b27]/30 flex flex-col justify-between group"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cakeCat.image}
                    alt={cakeCat.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#1f1610]/90 text-[#c59b27] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#c59b27]/40 shadow-md">
                    {cakeCat.tag}
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-serif-display font-bold text-lg text-[#faf6f0] group-hover:text-[#c59b27] transition-colors">
                      {cakeCat.title}
                    </h3>
                    <span className="text-xs font-bold text-[#d4a373] bg-[#c59b27]/10 px-2.5 py-1 rounded-md">
                      from {cakeCat.startingPrice}
                    </span>
                  </div>

                  <p className="font-body-md text-xs text-[#dccbbb] leading-relaxed line-clamp-2">
                    {cakeCat.description}
                  </p>

                  <button
                    onClick={() => {
                      onSelectCategory('Cakes');
                      setActiveTab('products');
                    }}
                    className="w-full pt-3 text-xs font-bold uppercase tracking-wider text-[#c59b27] group-hover:text-white transition-colors flex items-center justify-between border-t border-white/10"
                  >
                    <span>Order Custom Cake</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. TRENDING PRODUCTS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-3.5 py-1 rounded-full border border-[#e8dec9] mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600" /> Hearth Top Picks
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
              Trending Products This Week
            </h2>
          </div>
          <button
            onClick={() => {
              window.history.pushState(null, '', '/products');
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-secondary py-2.5 px-6 text-xs"
          >
            See Whole Catalog
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {trendingProducts.map((product) => {
            const formattedPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
            const img = product.imageUrl || product.image;
            return (
              <motion.div
                key={product.id}
                whileHover={{ y: -4 }}
                className="luxury-card overflow-hidden flex flex-col justify-between group"
              >
                <div className="relative aspect-[4/3] bg-[#f4ebe1]">
                  <img
                    src={img}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-[#825425] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-md flex items-center gap-1">
                    <Flame className="w-3 h-3 text-amber-300" /> HOT / TRENDING
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-widest font-bold text-[#825425]">
                      {product.category}
                    </span>
                    <span className="font-serif-display font-bold text-lg text-[#825425]">
                      {formattedPrice}
                    </span>
                  </div>

                  <h3 className="font-serif-display text-xl font-bold text-[#1f1610] group-hover:text-[#825425] transition-colors">
                    {product.name}
                  </h3>

                  <p className="font-body-md text-xs text-[#6e5d4f] line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="pt-3 border-t border-[#e8dec9] flex gap-2">
                    <button
                      onClick={() => handleQuickAdd(product)}
                      className="flex-1 btn-gold py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" /> Quick Add
                    </button>
                    <button
                      onClick={() => onOpenQuickView(product)}
                      className="btn-secondary py-2.5 px-3 text-xs"
                    >
                      Details
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* 6. RECOMMEND FOR YOU */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="bg-[#f4ebe1]/60 border border-[#e8dec9] rounded-3xl p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block font-bold mb-1">
                Personalized Pairing
              </span>
              <h2 className="font-serif-display text-3xl font-bold text-[#1f1610]">
                Recommended For You
              </h2>
            </div>
            <p className="text-xs text-[#6e5d4f] max-w-sm">
              Hand-picked pairings recommended by our head baker for morning breakfasts and afternoon tea pairings.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {recommendedProducts.map((product) => {
              const formattedPrice = typeof product.price === 'number' ? `$${product.price.toFixed(2)}` : product.price;
              const img = product.imageUrl || product.image;
              return (
                <div
                  key={product.id}
                  className="bg-[#faf6f0] rounded-2xl border border-[#e8dec9] p-4 flex flex-col justify-between space-y-3 hover:border-[#c59b27] transition-all shadow-xs group"
                >
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-[#f4ebe1]">
                    <img src={img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                    <span className="absolute top-2 left-2 bg-[#1f1610] text-[#c59b27] text-[9px] uppercase font-bold tracking-widest px-2 py-0.5 rounded-full border border-[#c59b27]/30">
                      Baker's Choice
                    </span>
                  </div>

                  <div>
                    <h4 className="font-serif-display font-bold text-base text-[#1f1610] group-hover:text-[#825425] truncate">
                      {product.name}
                    </h4>
                    <p className="text-xs font-bold text-[#825425] mt-0.5">{formattedPrice}</p>
                  </div>

                  <button
                    onClick={() => handleQuickAdd(product)}
                    className="w-full btn-primary py-2 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" /> Add to Order
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 7. MAKE EVERY OCCASION SPECIAL */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="relative rounded-3xl overflow-hidden bg-[#16110d] text-[#faf6f0] p-8 sm:p-14 border border-[#c59b27]/30 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4a373] uppercase tracking-widest bg-[#d4a373]/15 px-4 py-1 rounded-full border border-[#d4a373]/30">
              <Sparkle className="w-3.5 h-3.5 text-[#c59b27]" /> Bespoke Event Catering
            </span>

            <h2 className="font-serif-display text-3xl sm:text-4xl md:text-5xl font-bold leading-tight">
              Make Every Occasion <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#d4a373] via-[#c59b27] to-[#e5d8c8] italic">
                Unforgettably Sweet
              </span>
            </h2>

            <p className="font-body-md text-sm sm:text-base text-[#dccbbb] leading-relaxed max-w-xl">
              From intimate wedding dessert tables and milestone birthday cake reveals to executive breakfast hampers — our master pastry team crafts custom culinary moments tailored to your exact aesthetic.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-[#dccbbb]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c59b27]" /> Wedding Dessert Tables
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c59b27]" /> Custom Theme Birthday Cakes
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c59b27]" /> Corporate Artisan Hampers
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-[#c59b27]" /> Baby Shower & Gender Reveals
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={onOpenOrderModal}
                className="btn-gold py-3.5 px-8 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> Inquire Custom Event on WhatsApp
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-[#c59b27]/30 shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=800"
              alt="Celebration Dessert Table"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 8. GIFT PORTAL */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-4 py-1 rounded-full border border-[#e8dec9]">
            <Gift className="w-3.5 h-3.5 text-[#c59b27]" /> Curated Artisan Hampers
          </span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
            Artisan Gift Portal
          </h2>
          <p className="font-body-md text-sm text-[#6e5d4f] leading-relaxed">
            Handcrafted wooden chests, luxury gift boxes, and gourmet sourdough hampers packed with raw honeys, organic jams, and sweet bakery treats.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {GIFT_HAMPERS.map((hamper) => (
            <motion.div
              key={hamper.id}
              whileHover={{ y: -6 }}
              className="luxury-card overflow-hidden flex flex-col justify-between group"
            >
              <div className="relative h-48 bg-[#f4ebe1] overflow-hidden">
                <img src={hamper.image} alt={hamper.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <span className="absolute top-3 left-3 bg-[#825425] text-white text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-full shadow-md">
                  {hamper.badge}
                </span>
              </div>

              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <h3 className="font-serif-display font-bold text-base text-[#1f1610] group-hover:text-[#825425]">
                      {hamper.name}
                    </h3>
                  </div>
                  <p className="text-lg font-serif-display font-bold text-[#825425] mb-3">${hamper.price.toFixed(2)}</p>

                  <ul className="space-y-1.5 text-xs text-[#6e5d4f] border-t border-[#e8dec9] pt-3">
                    {hamper.items.map((item, idx) => (
                      <li key={idx} className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#c59b27]" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <button
                  onClick={() => {
                    onAddToCart({
                      id: hamper.id,
                      name: hamper.name,
                      category: 'Seasonal Specials',
                      price: hamper.price,
                      priceNum: hamper.price,
                      description: hamper.items.join(', '),
                      imageUrl: hamper.image,
                      image: hamper.image,
                      available: true,
                    });
                    onOpenOrderModal();
                  }}
                  className="w-full btn-gold py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 mt-4 shadow-md"
                >
                  <Gift className="w-3.5 h-3.5" /> Pre-Order Gift Box
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 9. BALLOON DECORATION */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-3.5 py-1 rounded-full border border-[#e8dec9] mb-2">
              <PartyPopper className="w-3.5 h-3.5 text-[#c59b27]" /> Party Styling Add-Ons
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
              Balloon & Table Styling Add-Ons
            </h2>
          </div>
          <p className="text-xs text-[#6e5d4f] max-w-sm">
            Elevate your celebration setup with our paired event decor packages available for store pickup or venue styling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {BALLOON_PACKAGES.map((pkg) => (
            <div key={pkg.id} className="luxury-card overflow-hidden flex flex-col justify-between group">
              <div className="relative h-44 bg-[#f4ebe1] overflow-hidden">
                <img src={pkg.image} alt={pkg.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                <span className="absolute bottom-3 right-3 bg-[#1f1610] text-[#c59b27] text-xs font-bold px-3 py-1 rounded-full border border-[#c59b27]/30">
                  {pkg.price}
                </span>
              </div>
              <div className="p-5 space-y-2 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif-display font-bold text-base text-[#1f1610]">{pkg.title}</h3>
                  <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed mt-1">{pkg.desc}</p>
                </div>
                <button
                  onClick={onOpenOrderModal}
                  className="w-full btn-secondary py-2.5 text-xs font-bold uppercase tracking-wider mt-3"
                >
                  Add to WhatsApp Inquiry
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. BIRTHDAY ACCESSORIES */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="luxury-card p-6 sm:p-10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#e8dec9] pb-4">
            <div>
              <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block font-bold mb-1">
                Celebration Essentials
              </span>
              <h2 className="font-serif-display text-3xl font-bold text-[#1f1610]">
                Birthday Cake Accessories
              </h2>
            </div>
            <p className="text-xs text-[#6e5d4f] max-w-sm">
              Complete your cake order with beeswax candles, golden sparkler fountains, and custom toppers.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {BIRTHDAY_ACCESSORIES.map((acc) => (
              <div key={acc.id} className="bg-[#faf6f0] p-4 rounded-2xl border border-[#e8dec9] flex flex-col justify-between space-y-3 hover:border-[#c59b27] transition-all">
                <img src={acc.imageUrl} alt={acc.name} className="w-full h-32 object-cover rounded-xl border border-[#e8dec9]" />
                <div>
                  <h4 className="font-serif-display font-bold text-xs text-[#1f1610] line-clamp-1">{acc.name}</h4>
                  <p className="text-xs font-bold text-[#825425] mt-0.5">${acc.price.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => handleQuickAdd(acc)}
                  className="w-full btn-primary py-2 text-[11px] font-bold uppercase tracking-wider flex items-center justify-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" /> Add to Order
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 11. TRUSTED BRANDS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="bg-[#1f1610] rounded-3xl p-6 sm:p-8 border border-[#c59b27]/30 text-[#faf6f0]">
          <div className="text-center mb-6">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c59b27]">
              Quality Assurance & Artisanal Standards
            </span>
            <h3 className="font-serif-display text-xl font-bold text-[#faf6f0] mt-1">
              Trusted Ingredient Partners
            </h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-center text-xs text-[#dccbbb]">
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1">
              <Wheat className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">Organic Heirloom Flour</span>
              <span className="text-[10px] text-[#a38f7d]">Stone Milled Weekly</span>
            </div>
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1">
              <ShieldCheck className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">84% Normandy Butter</span>
              <span className="text-[10px] text-[#a38f7d]">French Cultured</span>
            </div>
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1">
              <Award className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">Valrhona Belgian Choc</span>
              <span className="text-[10px] text-[#a38f7d]">72% Single Origin</span>
            </div>
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1">
              <Crown className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">Wildflower Raw Honey</span>
              <span className="text-[10px] text-[#a38f7d]">Local Apiary Direct</span>
            </div>
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1 col-span-2 sm:col-span-1">
              <Sparkles className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">Free-Range Farm Eggs</span>
              <span className="text-[10px] text-[#a38f7d]">100% Organic Pasture</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. GALLERY */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-label-caps text-[#825425] uppercase tracking-widest block font-bold text-xs">
            Visual Storytelling
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-[#1f1610]">
            Craftsmanship Gallery
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#6e5d4f]">
            Behind the scenes at our hearth: wild sourdough shaping, pastry lamination, and bespoke cake styling.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {GALLERY_ITEMS.map((item) => (
            <motion.div
              key={item.id}
              whileHover={{ y: -4 }}
              onClick={() => setSelectedGalleryImage(item)}
              className="luxury-card overflow-hidden cursor-pointer group relative aspect-[4/3]"
            >
              <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end text-[#faf6f0]">
                <h4 className="font-serif-display font-bold text-base text-[#faf6f0]">{item.title}</h4>
                <p className="text-xs text-[#dccbbb] mt-1">{item.caption}</p>
                <span className="text-[10px] uppercase tracking-widest font-bold text-[#c59b27] mt-2 block">
                  Click to Expand 🔍
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Gallery Lightbox Modal */}
        {selectedGalleryImage && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4" onClick={() => setSelectedGalleryImage(null)}>
            <div className="relative max-w-3xl w-full bg-[#1f1610] rounded-3xl overflow-hidden border border-[#c59b27]/40 shadow-2xl p-4" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={() => setSelectedGalleryImage(null)}
                className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full hover:bg-black/80 z-10"
              >
                <X className="w-5 h-5" />
              </button>
              <img src={selectedGalleryImage.image} alt={selectedGalleryImage.title} className="w-full h-[400px] object-cover rounded-2xl mb-4" />
              <div className="px-2 text-[#faf6f0]">
                <h3 className="font-serif-display font-bold text-xl text-[#c59b27]">{selectedGalleryImage.title}</h3>
                <p className="text-sm text-[#dccbbb] mt-1">{selectedGalleryImage.caption}</p>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 13. TESTIMONIALS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-label-caps text-[#825425] tracking-[0.2em] uppercase block font-bold text-xs">
            Community Stories
          </span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
            Loved by Sourdough Enthusiasts
          </h2>
          <p className="font-body-md text-sm text-[#6e5d4f]">
            Real feedback from local regulars, breakfast hosts, and custom cake clients.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div whileHover={{ y: -4 }} className="luxury-card p-7 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-[#d4a373] opacity-50 mb-3" />
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <p className="font-body-md text-sm text-[#1f1610] leading-relaxed mb-6 italic">
                "The Classic Sourdough has the most unbelievable blistered crust and open airy crumb. We order two loaves every single Friday for weekend family breakfasts!"
              </p>
            </div>
            <div className="pt-4 border-t border-[#e8dec9] flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-[#1f1610]">Sarah Mitchell</h4>
                <span className="text-[#a38f7d] text-[11px] block">Neighborhood Resident</span>
              </div>
              <span className="bg-[#f4ebe1] text-[#825425] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#e8dec9]">
                Classic Sourdough
              </span>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="luxury-card p-7 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-[#d4a373] opacity-50 mb-3" />
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <p className="font-body-md text-sm text-[#1f1610] leading-relaxed mb-6 italic">
                "Hands down the crispest almond croissants in town. The butter layers melt in your mouth and the WhatsApp pre-order makes morning pickup completely seamless."
              </p>
            </div>
            <div className="pt-4 border-t border-[#e8dec9] flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-[#1f1610]">David Kapoor</h4>
                <span className="text-[#a38f7d] text-[11px] block">Daily Bakery Regular</span>
              </div>
              <span className="bg-[#f4ebe1] text-[#825425] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#e8dec9]">
                Almond Croissant
              </span>
            </div>
          </motion.div>

          <motion.div whileHover={{ y: -4 }} className="luxury-card p-7 flex flex-col justify-between">
            <div>
              <Quote className="w-8 h-8 text-[#d4a373] opacity-50 mb-3" />
              <div className="flex items-center gap-1 text-amber-500 mb-3">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-500" />
                ))}
              </div>
              <p className="font-body-md text-sm text-[#1f1610] leading-relaxed mb-6 italic">
                "FreshBakers designed our custom pistachio raspberry celebratory cake. Not only was it visually breathtaking, but our guests were raving about how fresh every bite was!"
              </p>
            </div>
            <div className="pt-4 border-t border-[#e8dec9] flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-[#1f1610]">Priya & Rohan S.</h4>
                <span className="text-[#a38f7d] text-[11px] block">Event Client</span>
              </div>
              <span className="bg-[#f4ebe1] text-[#825425] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#e8dec9]">
                Custom Cake
              </span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 14. CONTACT */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="luxury-card p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-label-caps text-[#825425] tracking-[0.2em] uppercase block font-bold text-xs">
              Visit Our Bakery Hearth
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#1f1610]">
              Get in Touch & Pre-Order
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#6e5d4f]">
              142 Artisan Boulevard, Mill District • Tue – Sun: 7:00 AM – 4:00 PM
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#f4ebe1] p-6 rounded-2xl border border-[#e8dec9] text-center space-y-2">
              <MapPin className="w-6 h-6 text-[#825425] mx-auto" />
              <h4 className="font-serif-display font-bold text-base text-[#1f1610]">Bakery Storefront</h4>
              <p className="text-xs text-[#6e5d4f]">142 Artisan Boulevard, Mill District</p>
              <button
                onClick={() => {
                  window.open('https://maps.google.com/?q=142+Artisan+Boulevard', '_blank');
                }}
                className="text-xs font-bold text-[#825425] uppercase tracking-wider underline block pt-1"
              >
                Open Google Maps
              </button>
            </div>

            <div className="bg-[#f4ebe1] p-6 rounded-2xl border border-[#e8dec9] text-center space-y-2">
              <Clock className="w-6 h-6 text-[#825425] mx-auto" />
              <h4 className="font-serif-display font-bold text-base text-[#1f1610]">Hearth Hours</h4>
              <p className="text-xs text-[#6e5d4f]">Tue – Sun: 7:00 AM – 4:00 PM</p>
              <p className="text-[10px] text-[#a38f7d]">Fresh oven bakes ready at sunrise</p>
            </div>

            <div className="bg-[#f4ebe1] p-6 rounded-2xl border border-[#e8dec9] text-center space-y-2 sm:col-span-2 lg:col-span-1">
              <MessageCircle className="w-6 h-6 text-[#825425] mx-auto" />
              <h4 className="font-serif-display font-bold text-base text-[#1f1610]">Direct WhatsApp Line</h4>
              <p className="text-xs text-[#6e5d4f]">Instant Pre-Orders & Custom Cake Inquiries</p>
              <button
                onClick={onOpenOrderModal}
                className="btn-gold py-2 px-4 text-xs font-bold uppercase tracking-wider mt-1"
              >
                Start WhatsApp Chat
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

import React, { useState } from 'react';
import { NavTab, ProductItem, Category, CategoryInfo } from '../types';
import { CategorySection } from '../components/CategorySection';
import { ProductCard } from '../components/ProductCard';
import { motion, AnimatePresence } from 'motion/react';
import { ScrollReveal, ImageZoom, RippleButton, SkeletonCard } from '../components/animations/AnimatedComponents';
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
  products: ProductItem[];
  categories: CategoryInfo[];
  setActiveTab: (tab: NavTab) => void;
  onSelectCategory: (cat: Category) => void;
  onOpenQuickView: (product: ProductItem) => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
  whatsappNumber?: string;
}

const CATEGORY_ICON_EMOJI_MAP: Record<string, string> = {
  Cake: '🎂',
  Heart: '❤️',
  Sparkles: '✨',
  Camera: '📸',
  Crown: '👑',
  ShieldCheck: '🛡️',
  Flame: '🔥',
  Smile: '😊',
  Apple: '🍎',
  Gift: '🎁',
  Flower2: '🌸',
  Package: '📦',
  Box: '🧸',
  PartyPopper: '🎉',
  Sparkle: '✨',
  ThumbsUp: '👍',
  TrendingUp: '📈',
  Sprout: '🌿',
};

// Custom data for circular homepage categories
const CIRCULAR_CATEGORIES: { name: string; category: Category; iconEmoji: string; image: string }[] = [
  {
    name: 'Birthday Cakes',
    category: 'Birthday Cakes',
    iconEmoji: '🎂',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Anniversary Cakes',
    category: 'Anniversary Cakes',
    iconEmoji: '❤️',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Designer Cakes',
    category: 'Designer Cakes',
    iconEmoji: '🎨',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Photo Cakes',
    category: 'Photo Cakes',
    iconEmoji: '📸',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Premium Cakes',
    category: 'Premium Cakes',
    iconEmoji: '👑',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Flowers',
    category: 'Flowers',
    iconEmoji: '🌹',
    image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'Gift Hampers',
    category: 'Gift Hampers',
    iconEmoji: '🎁',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=400',
  },
  {
    name: 'All Categories',
    category: 'All' as unknown as Category,
    iconEmoji: '📂',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=400',
  },
];

// Custom data for popular cake categories
const POPULAR_CAKE_CATEGORIES = [
  {
    id: 'celebration-gateaux',
    title: 'Signature Celebration Gateaux',
    description: 'Multi-layer vanilla & Belgian dark chocolate sponges layered with fresh fruit compotes.',
    startingPrice: '₹499',
    tag: 'Bestseller',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'bento-cakes',
    title: 'Bento Mini Party Cakes',
    description: 'Adorable 4-inch customized bento box cakes with personalized piping and vintage pastel frosting.',
    startingPrice: '₹299',
    tag: 'Trending',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'fresh-fruit-tarts',
    title: 'Fresh Fruit & Tart Gateaux',
    description: 'Butter shortcrust loaded with vanilla bean diplomat cream and fresh seasonal berries.',
    startingPrice: '₹499',
    tag: 'Fresh Harvest',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'pistachio-velvet',
    title: 'Pistachio & Matcha Velvet',
    description: 'Pure roasted Iranian pistachio mousse paired with delicate matcha sponge layers.',
    startingPrice: '₹699',
    tag: 'Chef Choice',
    image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'eggless-glutenfree',
    title: 'Eggless & Dietary Speciality',
    description: 'Decadent dark chocolate avocado mousse and almond flour sponge cakes.',
    startingPrice: '₹599',
    tag: 'Dietary Safe',
    image: 'https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'tiered-wedding',
    title: 'Tiered Wedding & Milestone',
    description: 'Multi-tier showpiece cakes adorned with wafer paper florals and edible 24k gold leaf.',
    startingPrice: '₹1499',
    tag: 'Bespoke',
    image: 'https://images.unsplash.com/photo-1535254973040-607b474cb50d?auto=format&fit=crop&q=80&w=600',
  },
];

// Custom Gift Hampers
const GIFT_HAMPERS = [
  {
    id: 'hamper-royal',
    name: 'The Royal Indian Celebration & Tea Chest',
    price: 999,
    items: ['1x Premium Dry Fruit Cake', '1x Jar Wildflower Raw Honey', '1x Pistachio Shortbread Pack', '1x Wooden Dipper & Assam Tea'],
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&q=80&w=600',
    badge: 'Luxury Box',
  },
  {
    id: 'hamper-morning',
    name: 'Royal Indian Sweet & Bakery Lover Box',
    price: 799,
    items: ['2x Chocolate Truffle Jars', '2x Eggless Pineapple Slices', '2x Butterscotch Cupcakes', '1x Special Masala Chai Tin'],
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&q=80&w=600',
    badge: 'Popular Gift',
  },
  {
    id: 'hamper-cookie',
    name: 'Artisan Bakery Cookie & Tea Tin',
    price: 599,
    items: ['6x Choco Chunk Bakery Cookies', '6x Pista Nankhatai Biscuits', '1x Loose Leaf Assam Tea Tin'],
    image: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?auto=format&fit=crop&q=80&w=600',
    badge: 'Sweet Treat',
  },
  {
    id: 'hamper-champagne',
    name: 'Celebration Bento Cake & Flowers Hamper',
    price: 1499,
    items: ['1x Mini Bento Celebration Cake', '6x Ferrero Rocher Chocolates', '1x Fresh Rose Bouquet', 'Custom Greeting Card'],
    image: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=600',
    badge: 'Grand Celebration',
  },
];

// Balloon Packages
const BALLOON_PACKAGES = [
  {
    id: 'balloon-arch',
    title: 'Pastel Organic Balloon Arch',
    price: '₹1499',
    desc: 'Soft nude, blush, and metallic gold balloon arch tailored for dessert table backdrops.',
    image: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'balloon-numbers',
    title: 'Golden Metallic Age Balloons',
    price: '₹299',
    desc: '40-inch foil helium number balloons (0-9) anchored with satin ribbon weights.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'balloon-backdrop',
    title: 'Theme Cake Table Decor Setup',
    price: '₹1999',
    desc: 'Complete table styling with arch, acrylic cake pedestal, and LED warm fairy lights.',
    image: 'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=600',
  },
  {
    id: 'balloon-reveal',
    title: 'Gender Reveal Balloon Bundle',
    price: '₹999',
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
    price: 149,
    priceNum: 149,
    description: 'Hand-dipped 100% natural beeswax candles with subtle sweet honey aroma.',
    imageUrl: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-gold-topper',
    name: "Acrylic 'Happy Birthday' Topper",
    category: 'Birthday Accessories',
    price: 199,
    priceNum: 199,
    description: 'Mirror gold reusable acrylic cake topper statement piece.',
    imageUrl: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-sparkler-fountains',
    name: 'Golden Sparkler Fountains (Pack of 4)',
    category: 'Birthday Accessories',
    price: 299,
    priceNum: 299,
    description: 'Smokeless cake sparklers that erupt into 45 seconds of gold glitter flames.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-party-crown',
    name: 'Luxe Velvet Party Crown & Banner',
    category: 'Birthday Accessories',
    price: 199,
    priceNum: 199,
    description: 'Soft velvet embroidered crown and matching rustic linen celebration banner.',
    imageUrl: 'https://images.unsplash.com/photo-1531956531700-dc024130f3a0?auto=format&fit=crop&q=80&w=600',
    image: 'https://images.unsplash.com/photo-1531956531700-dc024130f3a0?auto=format&fit=crop&q=80&w=600',
    available: true,
  },
  {
    id: 'acc-wooden-server',
    name: 'Engraved Wooden Cake Server Set',
    category: 'Birthday Accessories',
    price: 399,
    priceNum: 399,
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
    title: 'Chocolate Truffle Cake Decorating',
    image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=800',
    caption: 'Rich 70% dark Belgian couverture truffle glaze poured over fresh cocoa sponge.',
  },
  {
    id: 'gal-2',
    title: 'Fresh Rasmalai Fusion Cake Layering',
    image: 'https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&q=80&w=800',
    caption: 'Authentic saffron milk soaked sponges infused with cardamom and pistachios.',
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
  products,
  categories = [],
  setActiveTab,
  onSelectCategory,
  onOpenQuickView,
  onAddToCart,
  onOpenOrderModal,
  whatsappNumber = '15550192824',
}) => {
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 4);
  const trendingProducts = products.filter((p) => p.isTrending).slice(0, 6);
  const recommendedProducts = products.filter((p) => p.isRecommended).slice(0, 4);
  const signatureProducts = products.filter((p) => p.isSignature).slice(0, 4);

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

  return (
    <div className="w-full space-y-24 md:space-y-32 pb-28 relative bg-[#FFFBF7]">
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
              src="https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&q=80&w=1600"
              alt="Freshly baked Indian cakes & celebration bakes"
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
              Freshly baked chocolate truffle cakes, authentic rasmalai fusion gateaux, custom bento cakes, and luxury gift hampers — prepared daily with fresh ingredients.
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
              <RippleButton
                onClick={() => {
                  window.history.pushState(null, '', '/products');
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="btn-gold py-3.5 px-8 font-bold shadow-lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Explore Full Menu
              </RippleButton>

              <RippleButton
                onClick={onOpenOrderModal}
                variant="primary"
                className="py-3.5 px-8 font-bold"
                icon={<MessageCircle className="w-4 h-4" />}
              >
                WhatsApp Pre-Order
              </RippleButton>
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

      {/* 2. CIRCULAR SHOP BY CATEGORY NAVIGATION */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="mb-8 text-center">
          <span className="font-label-caps text-[#825425] tracking-[0.2em] uppercase block mb-1 font-bold text-xs">
            Curated Collections
          </span>
          <h2 className="font-serif-display text-2xl sm:text-3xl md:text-4xl text-[#1f1610] font-bold">
            Shop by Category
          </h2>
        </div>

        <div className="flex items-center justify-start lg:justify-between gap-6 sm:gap-8 overflow-x-auto scrollbar-none pb-4 pt-2 max-w-full">
          {categories && categories.length > 0 ? (
            categories.map((cat) => (
              <button
                key={cat.id || cat.name}
                type="button"
                onClick={() => {
                  onSelectCategory(cat.name);
                  setActiveTab('products');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex flex-col items-center gap-3 group cursor-pointer shrink-0 transition-transform duration-300 hover:scale-105"
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full p-1 bg-[#F4EBE1] border-2 border-[#E8DEC9] group-hover:border-[#C59B27] shadow-sm group-hover:shadow-xl transition-all duration-300 relative overflow-hidden flex items-center justify-center">
                  <img
                    src={cat.bannerImage || cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-500 ease-out"
                  />
                </div>
                <span className="text-xs sm:text-sm font-bold text-[#1F1610] group-hover:text-[#825425] transition-colors whitespace-nowrap flex items-center gap-1">
                  <span>{cat.icon}</span>
                  <span>{cat.name}</span>
                </span>
              </button>
            ))
          ) : (
            <div className="w-full py-12 flex flex-col items-center justify-center text-center">
              <div className="w-28 h-28 rounded-full bg-[#F4EBE1] border-2 border-[#E8DEC9] flex items-center justify-center mb-4">
                <svg className="w-12 h-12 text-[#c59b27]" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2L15 8H9L12 2Z" stroke="#c59b27" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M4 22H20" stroke="#c59b27" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <p className="text-sm font-bold text-[#1f1610]">No categories available</p>
              <p className="text-xs text-[#6e5d4f]">Add categories in the Admin Panel to display them here.</p>
            </div>
          )}
        </div>
      </section>

      {/* 3. BEST SELLING CAKES */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-3.5 py-1 rounded-full border border-[#e8dec9] mb-2">
              <Crown className="w-3.5 h-3.5 text-amber-600" /> Bakery Best Sellers
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
              Best Selling Cakes
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
            Explore All Cakes
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={handleQuickAdd}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </section>

      {/* 4. MAKE EVERY OCCASION SPECIAL */}
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

      {/* 5. GIFT PORTAL */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-4 py-1 rounded-full border border-[#e8dec9]">
            <Gift className="w-3.5 h-3.5 text-[#c59b27]" /> Curated Artisan Hampers
          </span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
            Artisan Gift Portal
          </h2>
          <p className="font-body-md text-sm text-[#6e5d4f] leading-relaxed">
            Handcrafted wooden chests, luxury gift boxes, and gourmet celebration hampers packed with dry fruit cakes, artisanal cookies, chocolates, and flowers.
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
                  <p className="text-lg font-serif-display font-bold text-[#825425] mb-3">₹{hamper.price}</p>

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

      {/* 6. TRENDING PRODUCTS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-3.5 py-1 rounded-full border border-[#e8dec9] mb-2">
              <Flame className="w-3.5 h-3.5 text-amber-600" /> Bakery Top Picks
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
          {trendingProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={handleQuickAdd}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </section>

      {/* 7. RECOMMENDED PICKS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-3.5 py-1 rounded-full border border-[#e8dec9] mb-2">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" /> Recommended for You
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
              Curated Recommended Products
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
            Browse All Products
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recommendedProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={handleQuickAdd}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </section>

      {/* 8. SIGNATURE COLLECTION */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-3.5 py-1 rounded-full border border-[#e8dec9] mb-2">
              <Crown className="w-3.5 h-3.5 text-amber-600" /> Signature Selection
            </span>
            <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
              Signature Creations
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
            Explore Signature Line
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {signatureProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpenQuickView={onOpenQuickView}
              onAddToCart={handleQuickAdd}
              whatsappNumber={whatsappNumber}
            />
          ))}
        </div>
      </section>

      {/* 7. WHY CHOOSE US - TRUSTED INGREDIENT PARTNERS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="bg-[#1f1610] rounded-3xl p-8 sm:p-12 border border-[#c59b27]/30 text-[#faf6f0] space-y-8">
          <div className="text-center max-w-xl mx-auto">
            <span className="text-[10px] uppercase font-bold tracking-[0.2em] text-[#c59b27]">
              Quality Assurance & Artisanal Standards
            </span>
            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#faf6f0] mt-1">
              Why Choose Our Bakery
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
              <span className="font-bold text-[#faf6f0]">Pure Dairy Cream</span>
              <span className="text-[10px] text-[#a38f7d]">100% Rich Butter</span>
            </div>
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1">
              <Award className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">Belgian Dark Chocolate</span>
              <span className="text-[10px] text-[#a38f7d]">70% Cocoa Truffle</span>
            </div>
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1">
              <Crown className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">Authentic Saffron Kesar</span>
              <span className="text-[10px] text-[#a38f7d]">Direct Farm Sourced</span>
            </div>
            <div className="p-4 bg-[#2d2118] rounded-2xl border border-[#c59b27]/20 flex flex-col items-center justify-center space-y-1 col-span-2 sm:col-span-1">
              <Sparkles className="w-6 h-6 text-[#c59b27]" />
              <span className="font-bold text-[#faf6f0]">100% Eggless Option</span>
              <span className="text-[10px] text-[#a38f7d]">Pure Vegetarian Safe</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CUSTOMER TESTIMONIALS */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-label-caps text-[#825425] tracking-[0.2em] uppercase block font-bold text-xs">
            Community Stories
          </span>
          <h2 className="font-serif-display text-3xl md:text-4xl text-[#1f1610] font-bold">
            Loved by Cake & Dessert Lovers
          </h2>
          <p className="font-body-md text-sm text-[#6e5d4f]">
            Real feedback from local regulars, celebration hosts, and custom cake clients.
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
                "The Chocolate Truffle Cake has the most unbelievable rich ganache and moist sponge. We order it for every single family birthday!"
              </p>
            </div>
            <div className="pt-4 border-t border-[#e8dec9] flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-[#1f1610]">Aarav Sharma</h4>
                <span className="text-[#a38f7d] text-[11px] block">Neighborhood Resident</span>
              </div>
              <span className="bg-[#f4ebe1] text-[#825425] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#e8dec9]">
                Chocolate Truffle Cake
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
                "Hands down the best Rasmalai Fusion Cake in town! The saffron milk and fresh pistachios melted in our mouth. WhatsApp pre-order was seamless."
              </p>
            </div>
            <div className="pt-4 border-t border-[#e8dec9] flex items-center justify-between text-xs">
              <div>
                <h4 className="font-bold text-[#1f1610]">Neha & Rahul Kapoor</h4>
                <span className="text-[#a38f7d] text-[11px] block">Daily Bakery Regular</span>
              </div>
              <span className="bg-[#f4ebe1] text-[#825425] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#e8dec9]">
                Rasmalai Cake
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

      {/* 9. INSTAGRAM / CRAFTSMANSHIP GALLERY */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto space-y-8">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <span className="font-label-caps text-[#825425] uppercase tracking-widest block font-bold text-xs">
            Visual Storytelling
          </span>
          <h2 className="font-serif-display text-3xl font-bold text-[#1f1610]">
            Craftsmanship Gallery
          </h2>
          <p className="font-body-md text-xs sm:text-sm text-[#6e5d4f]">
            Behind the scenes at our bakery kitchen: chocolate truffle glazing, rasmalai cake layering, and bespoke cake styling.
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

      {/* 10. CONTACT & LOCATION */}
      <section className="px-4 sm:px-8 max-w-[1280px] mx-auto">
        <div className="luxury-card p-8 sm:p-12 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="font-label-caps text-[#825425] tracking-[0.2em] uppercase block font-bold text-xs">
              Visit Our Bakery
            </span>
            <h2 className="font-serif-display text-3xl font-bold text-[#1f1610]">
              Get in Touch & Pre-Order
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#6e5d4f]">
              142 Artisan Boulevard, MG Road • Mon – Sun: 8:00 AM – 10:00 PM
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-[#f4ebe1] p-6 rounded-2xl border border-[#e8dec9] text-center space-y-2">
              <MapPin className="w-6 h-6 text-[#825425] mx-auto" />
              <h4 className="font-serif-display font-bold text-base text-[#1f1610]">Bakery Storefront</h4>
              <p className="text-xs text-[#6e5d4f]">142 Artisan Boulevard, MG Road</p>
              <button
                onClick={() => {
                  window.open('https://maps.google.com/?q=142+Artisan+Boulevard', '_blank');
                }}
                className="text-xs font-bold text-[#825425] uppercase tracking-wider underline block pt-1 cursor-pointer"
              >
                Open Google Maps
              </button>
            </div>

            <div className="bg-[#f4ebe1] p-6 rounded-2xl border border-[#e8dec9] text-center space-y-2">
              <Clock className="w-6 h-6 text-[#825425] mx-auto" />
              <h4 className="font-serif-display font-bold text-base text-[#1f1610]">Bakery Hours</h4>
              <p className="text-xs text-[#6e5d4f]">Mon – Sun: 8:00 AM – 10:00 PM</p>
              <p className="text-[10px] text-[#a38f7d]">Fresh oven bakes ready every morning</p>
            </div>

            <div className="bg-[#f4ebe1] p-6 rounded-2xl border border-[#e8dec9] text-center space-y-2 sm:col-span-2 lg:col-span-1">
              <MessageCircle className="w-6 h-6 text-[#825425] mx-auto" />
              <h4 className="font-serif-display font-bold text-base text-[#1f1610]">Direct WhatsApp Line</h4>
              <p className="text-xs text-[#6e5d4f]">Instant Pre-Orders & Custom Cake Inquiries</p>
              <button
                onClick={onOpenOrderModal}
                className="btn-gold py-2 px-4 text-xs font-bold uppercase tracking-wider mt-1 cursor-pointer"
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

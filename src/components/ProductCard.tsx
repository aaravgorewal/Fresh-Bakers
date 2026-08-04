import React from 'react';
import { ProductItem } from '../types';
import { sendProductWhatsAppOrder } from '../utils/whatsapp';
import {
  Eye,
  ShoppingBag,
  Sparkles,
  Flame,
  Clock,
  Sprout,
  ShieldCheck,
  Zap,
  Tag,
  Scale
} from 'lucide-react';
import { motion } from 'motion/react';
import { RippleButton } from './animations/AnimatedComponents';

interface ProductCardProps {
  product: ProductItem;
  onOpenQuickView: (product: ProductItem) => void;
  onAddToCart?: (product: ProductItem) => void;
  whatsappNumber?: string;
  className?: string;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onOpenQuickView,
  onAddToCart,
  whatsappNumber = '15550192824',
  className = ''
}) => {
  // Format price
  const rawPrice =
    typeof product.price === 'number'
      ? product.price
      : product.priceNum || parseFloat(String(product.price).replace(/[^0-9.]/g, '') || '0');

  const formattedPrice = `₹${rawPrice.toLocaleString('en-IN')}`;

  // Image fallback
  const displayImage = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';

  // Egg / Eggless determination
  const isEggless = product.isEggless !== undefined ? product.isEggless : true;

  // Weight display (e.g. "500g / 1 Kg" or "Standard Pack")
  const displayWeight =
    (product as any).weight ||
    (product.weightOptions && product.weightOptions.length > 0
      ? product.weightOptions.map((w) => w.label).join(' / ')
      : product.category.includes('Cake')
      ? '500g / 1 Kg'
      : 'Standard Pack');

  // Delivery time label (e.g. "⚡ 2-3 Hrs Express")
  const displayDeliveryTime = (product as any).deliveryTime || '⚡ Same Day Delivery (2-3 hrs)';

  // Handle WhatsApp Direct Order
  const handleWhatsAppOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    sendProductWhatsAppOrder(product, whatsappNumber, {
      price: formattedPrice,
    });
  };

  return (
    <motion.div
      whileHover={{ y: -8, scale: 1.015 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`group relative bg-[#faf6f0] rounded-3xl border border-[#e8dec9] hover:border-[#c59b27] shadow-md hover:shadow-2xl hover:shadow-[#1f1610]/15 overflow-hidden flex flex-col justify-between transition-all duration-300 ${className}`}
    >
      <div>
        {/* LARGE IMAGE CONTAINER */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#18130e] cursor-pointer" onClick={() => onOpenQuickView(product)}>
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-700 ease-out"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';
            }}
          />

          {/* Dark Subtle Vignette Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#16110d]/80 via-transparent to-[#16110d]/40 opacity-70 group-hover:opacity-50 transition-opacity" />

          {/* TOP BADGES STACK */}
          <div className="absolute top-3 left-3 right-3 flex items-start justify-between gap-1.5 pointer-events-none z-10">
            {/* Left Column Badges */}
            <div className="flex flex-col gap-1.5 items-start">
              {/* Category Badge */}
              <span className="bg-[#18130e]/90 backdrop-blur-md text-[#d4a373] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#c59b27]/40 shadow-md">
                {product.category}
              </span>

              {/* Featured / Signature Badge */}
              {(product.isFeatured || product.isSignature) && (
                <span className="bg-gradient-to-r from-[#18130e]/95 to-[#2a1d12]/95 backdrop-blur-md text-[#f3cb81] text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-[#c59b27]/60 shadow-md flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#c59b27]" /> Featured
                </span>
              )}

              {/* Trending Badge */}
              {product.isTrending && (
                <span className="bg-amber-950/90 backdrop-blur-md text-amber-300 text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full border border-amber-500/50 shadow-md flex items-center gap-1">
                  <Flame className="w-3 h-3 text-amber-400" /> Trending
                </span>
              )}
            </div>

            {/* Right Column: Egg / Eggless Badge */}
            <div className="pointer-events-auto">
              {isEggless ? (
                <span className="bg-emerald-950/90 backdrop-blur-md text-emerald-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-emerald-500/50 shadow-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> 100% Eggless
                </span>
              ) : (
                <span className="bg-rose-950/90 backdrop-blur-md text-rose-300 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-rose-500/50 shadow-md flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-rose-500" /> Contains Egg
                </span>
              )}
            </div>
          </div>

          {/* Quick View Floating Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="absolute bottom-3 right-3 z-20 bg-white/95 hover:bg-white text-[#1f1610] p-2.5 rounded-full shadow-2xl opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-1 group-hover:translate-y-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold"
            title="Quick view product details"
          >
            <Eye className="w-4 h-4 text-[#825425]" />
            <span className="hidden sm:inline">Quick View</span>
          </button>
        </div>

        {/* PRODUCT DETAILS BODY */}
        <div className="p-5 space-y-3">
          {/* Weight & Delivery Bar */}
          <div className="flex items-center justify-between text-[11px] font-bold text-[#825425] bg-[#f4ebe1] px-3 py-1.5 rounded-xl border border-[#e8dec9]">
            <span className="flex items-center gap-1 text-[#1f1610]">
              <Scale className="w-3.5 h-3.5 text-[#825425]" /> {displayWeight}
            </span>
            <span className="flex items-center gap-1 text-[#6e5d4f] text-[10px]">
              <Zap className="w-3 h-3 text-amber-600" /> {displayDeliveryTime}
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="font-serif-display text-lg sm:text-xl font-bold text-[#1f1610] group-hover:text-[#825425] cursor-pointer transition-colors line-clamp-1 leading-snug"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="font-body-md text-xs text-[#6e5d4f] leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Price & Delivery Badge */}
          <div className="flex items-baseline justify-between pt-1">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-bold font-serif-display text-[#1f1610]">
                {formattedPrice}
              </span>
              <span className="text-[10px] text-[#a38f7d] uppercase font-bold tracking-wider">
                inclusive of taxes
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS FOOTER */}
      <div className="p-5 pt-0 space-y-2">
        <div className="flex items-center gap-2">
          {/* Order on WhatsApp Button */}
          <RippleButton
            onClick={handleWhatsAppOrder}
            variant="whatsapp"
            className="flex-1 py-3 text-xs font-bold tracking-wider uppercase shadow-md hover:shadow-lg flex items-center justify-center gap-2 rounded-2xl"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>Order on WhatsApp</span>
          </RippleButton>

          {/* Add To Cart or Quick View Button */}
          {onAddToCart && (
            <RippleButton
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              variant="secondary"
              className="py-3 px-3.5 rounded-2xl bg-[#f4ebe1] hover:bg-[#e8dec9] text-[#1f1610] border border-[#e8dec9]"
              title="Add to WhatsApp Order Cart"
            >
              <ShoppingBag className="w-4.5 h-4.5 text-[#825425]" />
            </RippleButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

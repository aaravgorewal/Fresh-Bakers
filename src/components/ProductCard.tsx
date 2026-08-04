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
      whileHover={{ y: -5 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`group relative bg-white rounded-2xl sm:rounded-3xl border border-[#F0E5DA] hover:border-[#D97706]/70 shadow-xs hover:shadow-xl hover:shadow-[#24140A]/8 overflow-hidden flex flex-col justify-between transition-all duration-300 ${className}`}
    >
      <div>
        {/* CLEAN IMAGE CONTAINER */}
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6F0] cursor-pointer" onClick={() => onOpenQuickView(product)}>
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';
            }}
          />

          {/* MINIMAL TOP BADGES */}
          <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none z-10">
            {/* Primary Tag */}
            {product.isFeatured || product.isSignature ? (
              <span className="bg-[#24140A]/85 backdrop-blur-md text-[#f3cb81] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#D97706]/40 shadow-sm flex items-center gap-1 font-sans">
                <Sparkles className="w-3 h-3 text-[#D97706]" /> Featured
              </span>
            ) : (
              <span className="bg-white/90 backdrop-blur-md text-[#5C2E14] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#F0E5DA] shadow-xs font-sans">
                {product.category}
              </span>
            )}

            {/* Egg / Eggless Badge */}
            <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs border flex items-center gap-1 font-sans ${
              isEggless
                ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500/40'
                : 'bg-rose-900/80 text-rose-200 border-rose-500/40'
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full ${isEggless ? 'bg-emerald-400' : 'bg-rose-400'}`} />
              {isEggless ? 'Eggless' : 'Contains Egg'}
            </span>
          </div>

          {/* Quick View Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onOpenQuickView(product);
            }}
            className="absolute bottom-3 right-3 z-20 bg-white/95 hover:bg-white text-[#24140A] px-3 py-1.5 rounded-xl shadow-lg opacity-90 sm:opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center gap-1.5 text-xs font-bold font-sans cursor-pointer"
            title="Quick view product details"
          >
            <Eye className="w-3.5 h-3.5 text-[#5C2E14]" />
            <span>Quick View</span>
          </button>
        </div>

        {/* PRODUCT DETAILS BODY */}
        <div className="p-4 sm:p-5 space-y-2">
          {/* Weight & Delivery Sub-line */}
          <div className="flex items-center justify-between text-[11px] text-[#6C584C] font-medium font-sans">
            <span className="flex items-center gap-1 font-bold text-[#5C2E14]">
              <Scale className="w-3 h-3 text-[#D97706]" /> {displayWeight}
            </span>
            <span className="text-[10px] text-[#825425]">
              ⚡ Same Day Delivery
            </span>
          </div>

          {/* Title */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="font-serif-display text-base sm:text-lg font-bold text-[#24140A] group-hover:text-[#D97706] cursor-pointer transition-colors line-clamp-1 leading-snug pt-0.5"
          >
            {product.name}
          </h3>

          {/* Description */}
          <p className="font-body-md text-xs text-[#6C584C]/90 leading-relaxed line-clamp-2">
            {product.description}
          </p>

          {/* Price */}
          <div className="pt-1 flex items-baseline justify-between">
            <span className="text-xl sm:text-2xl font-bold font-serif-display text-[#24140A]">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS FOOTER */}
      <div className="p-4 sm:p-5 pt-0">
        <div className="flex items-center gap-2">
          {/* Order on WhatsApp Button */}
          <RippleButton
            onClick={handleWhatsAppOrder}
            variant="whatsapp"
            className="flex-1 py-2.5 text-xs font-bold tracking-wider uppercase shadow-xs hover:shadow-md flex items-center justify-center gap-1.5 rounded-xl cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">chat</span>
            <span>Order</span>
          </RippleButton>

          {/* Add To Cart or Quick View Button */}
          {onAddToCart && (
            <RippleButton
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product);
              }}
              variant="secondary"
              className="py-2.5 px-3 rounded-xl bg-[#F4EBE1] hover:bg-[#E8DEC9] text-[#24140A] border border-[#F0E5DA] cursor-pointer"
              title="Add to WhatsApp Order Cart"
            >
              <ShoppingBag className="w-4 h-4 text-[#5C2E14]" />
            </RippleButton>
          )}
        </div>
      </div>
    </motion.div>
  );
};

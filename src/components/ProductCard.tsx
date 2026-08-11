import React from 'react';
import { ProductItem } from '../types';
import { sendProductWhatsAppOrder } from '../utils/whatsapp';
import {
  Eye,
  ShoppingBag,
  Sparkles,
  Scale,
  MessageCircle
} from 'lucide-react';
import { motion } from 'motion/react';

import { getOptimizedImageUrl } from '../lib/imageUtils';

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

  // Image fallback with dynamic Cloudinary & responsive sizing optimization
  const rawDisplayImage = product.imageUrl || product.image || 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';
  const displayImage = getOptimizedImageUrl(rawDisplayImage, 600);

  // Egg / Eggless determination
  const isEggless = product.isEggless !== undefined ? product.isEggless : true;

  // Weight display (e.g. "0.5 kg" or "500g")
  const displayWeight =
    (product as any).weight ||
    (product.weightOptions && product.weightOptions.length > 0
      ? product.weightOptions[0].label
      : product.category.includes('Cake')
      ? '0.5 kg / 1.0 kg'
      : 'Standard Pack');

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className={`group relative bg-white rounded-2xl border border-[#E8DEC9] hover:border-[#825425]/60 shadow-sm hover:shadow-xl overflow-hidden flex flex-col justify-between transition-all duration-300 h-full ${className}`}
    >
      <div>
        {/* LARGE PRODUCT IMAGE CONTAINER WITH HOVER ZOOM */}
        <div
          className="relative aspect-square w-full overflow-hidden bg-[#F4EBE1] cursor-pointer"
          onClick={() => onOpenQuickView(product)}
        >
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500 ease-out"
            loading="lazy"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&q=80&w=600';
            }}
          />

          {/* BADGES LAYER */}
          <div className="absolute top-2.5 left-2.5 right-2.5 flex items-center justify-between pointer-events-none z-10">
            {/* Bestseller / Signature Badge */}
            {product.isFeatured || product.isSignature || product.isTrending ? (
              <span className="bg-[#1F1610]/90 backdrop-blur-md text-[#C59B27] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#C59B27]/40 shadow-sm flex items-center gap-1 font-sans">
                <Sparkles className="w-3 h-3 text-[#C59B27]" /> Bestseller
              </span>
            ) : (
              <span className="bg-white/90 backdrop-blur-md text-[#825425] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border border-[#E8DEC9] shadow-xs font-sans">
                {product.category}
              </span>
            )}

            {/* Egg / Eggless Badge (Only for Cake categories) */}
            {product.category.toLowerCase().includes('cake') && (
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-md shadow-xs border flex items-center gap-1 font-sans ${
                isEggless
                  ? 'bg-emerald-900/80 text-emerald-200 border-emerald-500/40'
                  : 'bg-rose-900/80 text-rose-200 border-rose-500/40'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isEggless ? 'bg-emerald-400' : 'bg-rose-400'}`} />
                {isEggless ? 'Eggless' : 'Egg'}
              </span>
            )}
          </div>
        </div>

        {/* PRODUCT DETAILS BODY */}
        <div className="p-4 space-y-2">
          {/* Weight Indicator */}
          <div className="flex items-center justify-between text-[11px] text-[#825425] font-bold">
            <span className="flex items-center gap-1">
              <Scale className="w-3 h-3 text-[#825425]" /> {displayWeight}
            </span>
          </div>

          {/* Product Name */}
          <h3
            onClick={() => onOpenQuickView(product)}
            className="font-serif-display text-base font-bold text-[#1F1610] group-hover:text-[#825425] cursor-pointer transition-colors line-clamp-1 leading-snug"
          >
            {product.name}
          </h3>

          {/* Price */}
          <div className="pt-0.5">
            <span className="text-lg font-bold font-serif-display text-[#1F1610]">
              {formattedPrice}
            </span>
          </div>
        </div>
      </div>

      {/* ONE PRIMARY CTA BUTTON */}
      <div className="p-4 pt-0">
        <button
          onClick={() => onOpenQuickView(product)}
          className="w-full bg-[#5C2E14] hover:bg-[#3D1E0C] text-white py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 shadow-sm hover:shadow-md flex items-center justify-center gap-2 cursor-pointer"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>View Details</span>
        </button>
      </div>
    </motion.div>
  );
};


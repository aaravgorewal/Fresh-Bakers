import React, { useState, useEffect } from 'react';
import { ProductItem, Category } from '../types';
import { sendProductWhatsAppOrder } from '../utils/whatsapp';
import {
  X,
  Clock,
  ShoppingBag,
  Sparkles,
  Share2,
  Check,
  MessageCircle,
  ChevronRight,
  ShieldCheck,
  Eye,
  Star,
  Tag,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
  allProducts?: ProductItem[];
  onSelectProduct?: (product: ProductItem) => void;
  whatsappNumber?: string;
}

const DEFAULT_CAKE_WEIGHTS = [
  { label: '0.5 kg (Serves 4-6)', multiplier: 1.0 },
  { label: '1.0 kg (Serves 8-10)', multiplier: 1.8 },
  { label: '1.5 kg (Serves 12-15)', multiplier: 2.5 },
  { label: '2.0 kg (Serves 18-22)', multiplier: 3.2 },
];

const DEFAULT_GIFT_SIZES = [
  { label: 'Standard Pack', multiplier: 1.0 },
  { label: 'Deluxe Celebration Box', multiplier: 1.5 },
  { label: 'Grand Royal Hamper Edition', multiplier: 2.2 },
];

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenOrderModal,
  allProducts = [],
  onSelectProduct,
  whatsappNumber = '15550192824',
}) => {
  if (!product) return null;

  const isCakeCategory =
    product.category.includes('Cake') ||
    product.category === 'Birthday Cakes' ||
    product.category === 'Anniversary Cakes' ||
    product.category === 'Designer Cakes' ||
    product.category === 'Photo Cakes' ||
    product.category === 'Premium Cakes' ||
    product.category === 'Eggless Cakes' ||
    product.category === 'Chocolate Cakes' ||
    product.category === 'Kids Theme Cakes' ||
    product.category === 'Fruit Cakes';

  const weightOptions =
    product.weightOptions || (isCakeCategory ? DEFAULT_CAKE_WEIGHTS : DEFAULT_GIFT_SIZES);

  const [selectedWeightIndex, setSelectedWeightIndex] = useState(0);

  // Gallery images set up
  const mainImg = product.imageUrl || product.image;
  const gallery = Array.isArray(product.gallery) && product.gallery.length > 0 ? product.gallery : [mainImg];
  const [activeImage, setActiveImage] = useState(mainImg);

  const [copiedToast, setCopiedToast] = useState(false);

  // Reset state on product change
  useEffect(() => {
    setActiveImage(product.imageUrl || product.image);
    setSelectedWeightIndex(0);
  }, [product]);

  // Handle keypress ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  // Dynamic Price calculation
  const rawBasePrice =
    typeof product.price === 'number'
      ? product.price
      : parseFloat(String(product.price).replace(/[^0-9.]/g, '') || '0');
  const currentMultiplier = weightOptions[selectedWeightIndex]?.multiplier || 1.0;
  const finalPriceNum = Math.round(rawBasePrice * currentMultiplier);
  const formattedPrice = `₹${finalPriceNum}`;

  // Related products logic
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || isCakeCategory))
    .slice(0, 3);

  const handleShare = async () => {
    const shareData = {
      title: `${product.name} | Fresh Bakers`,
      text: product.description,
      url: window.location.href,
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        // Fallback clipboard
        copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedToast(true);
    setTimeout(() => setCopiedToast(false), 3000);
  };

  const handleWhatsAppDirectOrder = () => {
    const selectedWeightLabel = weightOptions[selectedWeightIndex]?.label || '1 Kg';
    sendProductWhatsAppOrder(product, whatsappNumber, {
      weight: selectedWeightLabel,
      price: formattedPrice,
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
        {/* Backdrop Overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md cursor-pointer"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 bg-[#faf6f0] w-full max-w-4xl border border-[#c59b27]/30 shadow-2xl rounded-3xl overflow-hidden flex flex-col max-h-[90vh] my-auto"
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-6 py-4 bg-[#24140A] text-[#FAF6F0] border-b border-[#D97706]/30">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest bg-[#D97706]/20 px-3 py-1 rounded-full border border-[#D97706]/40 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> Quick Detail View
              </span>
              <span className="text-xs text-[#E5D7C9] hidden sm:inline">• Freshly Baked Daily</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] transition-colors relative cursor-pointer"
                title="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-[#FAF6F0] transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Toast Notification */}
          {copiedToast && (
            <div className="bg-[#5C2E14] text-white text-xs font-bold py-2 px-4 text-center shadow-md animate-fadeIn flex items-center justify-center gap-2">
              <Check className="w-4 h-4 text-emerald-300" /> Link copied to clipboard! You can share it now.
            </div>
          )}

          {/* Main Content Area (Scrollable) */}
          <div className="overflow-y-auto p-6 md:p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              {/* LEFT COLUMN: LARGE PRODUCT IMAGE & GALLERY */}
              <div className="space-y-4">
                {/* Large Display Image */}
                <div className="relative aspect-square rounded-2xl overflow-hidden bg-[#F4EBE1] shadow-md border border-[#F0E5DA]">
                  <img
                    src={activeImage}
                    alt={product.name}
                    className="w-full h-full object-cover transition-all duration-500 hover:scale-105"
                  />

                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isSignature && (
                      <span className="bg-[#24140A]/90 text-[#D97706] text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full border border-[#D97706]/40 shadow-md flex items-center gap-1 backdrop-blur-md">
                        <Sparkles className="w-3 h-3 text-amber-400" /> Signature Bake
                      </span>
                    )}
                    {product.fermentationHours && (
                      <span className="bg-[#5C2E14] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-full flex items-center gap-1 shadow-md">
                        <Clock className="w-3 h-3" /> {product.fermentationHours}-Hr Ferment
                      </span>
                    )}
                  </div>

                </div>

                {/* Gallery Thumbnails */}
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#5C2E14] block mb-2">
                    Gallery Views ({gallery.length})
                  </span>
                  <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none">
                    {gallery.map((imgUrl, idx) => (
                      <button
                        key={idx}
                        onClick={() => setActiveImage(imgUrl)}
                        className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 cursor-pointer ${
                          activeImage === imgUrl
                            ? 'border-[#5C2E14] shadow-md scale-105'
                            : 'border-[#F0E5DA] opacity-70 hover:opacity-100 hover:border-[#5C2E14]/50'
                        }`}
                      >
                        <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT COLUMN: DETAILS & CUSTOMIZATIONS */}
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-label-caps text-xs text-[#5C2E14] uppercase tracking-widest font-bold">
                      {product.category}
                    </span>
                    <span className="text-[11px] font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> Fresh In Stock
                    </span>
                  </div>

                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#24140A] leading-tight mb-2">
                    {product.name}
                  </h2>

                  {/* Price Display */}
                  <div className="flex items-baseline gap-3 my-3">
                    <span className="font-serif-display text-3xl font-bold text-[#5C2E14]">
                      {formattedPrice}
                    </span>
                    {currentMultiplier !== 1.0 && (
                      <span className="text-xs text-[#6C584C]/70 line-through">
                        ₹{Math.round(rawBasePrice * currentMultiplier * 1.15)}
                      </span>
                    )}
                    <span className="text-[11px] font-bold text-[#6C584C] bg-[#F4EBE1] px-2.5 py-0.5 rounded-full border border-[#F0E5DA]">
                      Taxes & Delivery Included
                    </span>
                  </div>

                  <p className="font-body-md text-sm text-[#6C584C] leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* WEIGHT / SIZE SELECTION */}
                <div className="space-y-2 pt-4 border-t border-[#F0E5DA]">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-bold text-[#24140A] uppercase tracking-wider flex items-center gap-1.5">
                      <Tag className="w-3.5 h-3.5 text-[#5C2E14]" />
                      {isCakeCategory ? 'Select Cake Weight:' : 'Select Portion / Size:'}
                    </label>
                    <span className="text-xs font-semibold text-[#5C2E14]">
                      {weightOptions[selectedWeightIndex]?.label}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    {weightOptions.map((opt, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setSelectedWeightIndex(idx)}
                        className={`p-2.5 text-xs font-bold rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer ${
                          selectedWeightIndex === idx
                            ? 'bg-[#5C2E14] text-white border-[#5C2E14] shadow-md'
                            : 'bg-white text-[#6C584C] border-[#F0E5DA] hover:bg-[#F4EBE1]'
                        }`}
                      >
                        <span>{opt.label}</span>
                        {selectedWeightIndex === idx && <Check className="w-4 h-4 text-amber-300" />}
                      </button>
                    ))}
                  </div>
                </div>


                {/* INGREDIENTS LIST CHIPS */}
                {product.ingredients && product.ingredients.length > 0 && (
                  <div className="space-y-2 pt-4 border-t border-[#F0E5DA]">
                    <span className="text-[11px] font-bold text-[#5C2E14] uppercase tracking-widest block">
                      Stone-Ground Natural Ingredients:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {product.ingredients.map((ing, i) => (
                        <span
                          key={i}
                          className="bg-white text-[#6C584C] text-xs font-medium px-3 py-1 rounded-full border border-[#F0E5DA] flex items-center gap-1.5 shadow-xs"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-[#D97706]" />
                          {ing}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* ACTION BUTTONS */}
                <div className="pt-6 border-t border-[#F0E5DA] space-y-3">
                  <button
                    onClick={handleWhatsAppDirectOrder}
                    className="w-full btn-primary py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg hover:scale-[1.01] transition-transform cursor-pointer"
                  >
                    <MessageCircle className="w-4 h-4 text-emerald-400 fill-emerald-400/20" />
                    Instant Order on WhatsApp ({formattedPrice})
                  </button>

                  <button
                    onClick={() => {
                      onAddToCart({
                        ...product,
                        price: finalPriceNum,
                        priceNum: finalPriceNum,
                        name: `${product.name} (${weightOptions[selectedWeightIndex]?.label || ''})`,
                      });
                      onOpenOrderModal();
                      onClose();
                    }}
                    className="w-full btn-gold py-3 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" /> Add Selection to Cart
                  </button>
                </div>
              </div>
            </div>

            {/* RELATED PRODUCTS SECTION */}
            {relatedProducts.length > 0 && (
              <div className="pt-8 border-t border-[#F0E5DA] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-serif-display text-xl font-bold text-[#24140A] flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D97706]" /> You Might Also Love
                  </h3>
                  <span className="text-xs text-[#5C2E14] font-semibold">
                    Explore similar bakes & gifts
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {relatedProducts.map((rel) => {
                    const relPrice =
                      typeof rel.price === 'number' ? `₹${rel.price}` : rel.price;
                    return (
                      <div
                        key={rel.id}
                        onClick={() => onSelectProduct && onSelectProduct(rel)}
                        className="luxury-card p-3 cursor-pointer group flex items-center gap-3 hover:border-[#5C2E14] transition-all bg-white"
                      >
                        <img
                          src={rel.imageUrl || rel.image}
                          alt={rel.name}
                          className="w-16 h-16 rounded-xl object-cover bg-[#F4EBE1] flex-shrink-0 group-hover:scale-105 transition-transform"
                        />
                        <div className="overflow-hidden flex-1">
                          <span className="text-[9px] font-bold uppercase tracking-widest text-[#5C2E14] block">
                            {rel.category}
                          </span>
                          <h4 className="font-serif-display text-xs font-bold text-[#24140A] truncate group-hover:text-[#5C2E14] transition-colors">
                            {rel.name}
                          </h4>
                          <span className="font-serif-display text-xs font-bold text-[#5C2E14] block mt-0.5">
                            {relPrice}
                          </span>
                        </div>
                        <ChevronRight className="w-4 h-4 text-[#6C584C]/50 group-hover:text-[#5C2E14] group-hover:translate-x-1 transition-transform" />
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

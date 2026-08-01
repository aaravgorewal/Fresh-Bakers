import React from 'react';
import { ProductItem } from '../types';
import { X, Clock, Check, ShoppingBag, Sparkles } from 'lucide-react';

interface QuickViewModalProps {
  product: ProductItem | null;
  onClose: () => void;
  onAddToCart: (product: ProductItem) => void;
  onOpenOrderModal: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenOrderModal,
}) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-[#fbf9f5] w-full max-w-2xl border border-[#825425] shadow-2xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-[#fbf9f5]/80 p-1.5 text-[#1b1c1a] hover:text-[#825425] rounded-full transition-colors"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-[#f5f3ef] min-h-[260px] md:min-h-full">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="w-full h-full object-cover min-h-[260px]"
          />
          {product.fermentationHours && (
            <div className="absolute top-4 left-4 bg-[#825425] text-white text-[11px] uppercase font-bold tracking-widest px-3 py-1 flex items-center gap-1 shadow-md">
              <Clock className="w-3.5 h-3.5" />
              {product.fermentationHours}-Hour Cold Ferment
            </div>
          )}
          {product.isSignature && (
            <div className="absolute bottom-4 left-4 bg-[#1b1c1a]/90 text-[#e6ded9] text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 flex items-center gap-1">
              <Sparkles className="w-3 h-3 text-[#c68e5a]" /> Signature Artisan Bake
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block mb-1">
              {product.category}
            </span>
            <h2 className="font-headline-md text-2xl font-bold text-[#1b1c1a] mb-2">
              {product.name}
            </h2>
            <p className="font-serif-display text-xl text-[#825425] font-semibold mb-4">
              {product.price}
            </p>

            <p className="font-body-md text-sm text-[#51443a] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-6 pt-4 border-t border-[#d5c3b6]">
                <h4 className="font-label-caps text-[11px] text-[#825425] tracking-widest uppercase mb-2">
                  Stone-Ground Ingredients
                </h4>
                <ul className="grid grid-cols-1 gap-1.5 text-xs text-[#51443a]">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#825425]" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#d5c3b6] flex flex-col gap-2">
            <button
              onClick={() => {
                onAddToCart(product);
                onOpenOrderModal();
                onClose();
              }}
              className="w-full btn-primary py-3 text-xs tracking-widest flex items-center justify-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" /> Add to WhatsApp Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

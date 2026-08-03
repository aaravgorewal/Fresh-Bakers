import React from 'react';
import { ProductItem } from '../types';
import { X, Clock, ShoppingBag, Sparkles } from 'lucide-react';

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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-[#faf6f0] w-full max-w-2xl border border-[#c59b27]/30 shadow-2xl rounded-3xl relative overflow-hidden flex flex-col md:flex-row max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full transition-colors backdrop-blur-md"
          aria-label="Close details modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="md:w-1/2 relative bg-[#f4ebe1] min-h-[280px] md:min-h-full">
          <img
            src={product.image}
            alt={product.imageAlt}
            className="w-full h-full object-cover min-h-[280px]"
          />
          {product.fermentationHours && (
            <div className="absolute top-4 left-4 bg-[#825425] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
              <Clock className="w-3.5 h-3.5" />
              {product.fermentationHours}-Hour Fermentation
            </div>
          )}
          {product.isSignature && (
            <div className="absolute bottom-4 left-4 bg-[#1f1610]/90 text-[#faf6f0] text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1 border border-[#c59b27]/40 shadow-lg">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Signature Bake
            </div>
          )}
        </div>

        {/* Product Details */}
        <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-between overflow-y-auto">
          <div>
            <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block font-bold mb-1">
              {product.category}
            </span>
            <h2 className="font-serif-display text-2xl md:text-3xl font-bold text-[#1f1610] mb-2">
              {product.name}
            </h2>
            <p className="font-serif-display text-2xl text-[#825425] font-bold mb-4">
              {product.price}
            </p>

            <p className="font-body-md text-sm text-[#6e5d4f] leading-relaxed mb-6">
              {product.description}
            </p>

            {/* Ingredients */}
            {product.ingredients && product.ingredients.length > 0 && (
              <div className="mb-6 pt-4 border-t border-[#e8dec9]">
                <h4 className="font-label-caps text-[11px] text-[#825425] tracking-widest uppercase mb-3 font-bold">
                  Stone-Ground Ingredients
                </h4>
                <ul className="grid grid-cols-1 gap-2 text-xs text-[#6e5d4f] font-medium">
                  {product.ingredients.map((ing, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#c59b27]" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="pt-4 border-t border-[#e8dec9] flex flex-col gap-2">
            <button
              onClick={() => {
                onAddToCart(product);
                onOpenOrderModal();
                onClose();
              }}
              className="w-full btn-gold py-3.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg"
            >
              <ShoppingBag className="w-4 h-4" /> Add to WhatsApp Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};


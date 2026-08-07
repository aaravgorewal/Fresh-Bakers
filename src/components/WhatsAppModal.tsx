import React, { useState } from 'react';
import { OrderCartItem, ProductItem } from '../types';
import { X, Plus, Minus, Trash2, Calendar, User, FileText, Sparkles, MessageCircle } from 'lucide-react';

interface WhatsAppModalProps {
  isOpen: boolean;
  onClose: () => void;
  cart: OrderCartItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onClearCart: () => void;
  allProducts: ProductItem[];
  onAddToCart: (product: ProductItem) => void;
  whatsappNumber?: string;
}

export const WhatsAppModal: React.FC<WhatsAppModalProps> = ({
  isOpen,
  onClose,
  cart,
  onUpdateQuantity,
  onClearCart,
  allProducts,
  onAddToCart,
  whatsappNumber = '15550192824',
}) => {
  const [customerName, setCustomerName] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [notes, setNotes] = useState('');
  const [dateError, setDateError] = useState(false);

  const getTodayDateString = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const formatPickupDate = (dateValue: string) => {
    if (!dateValue) return '';
    return new Intl.DateTimeFormat('en-GB', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(new Date(dateValue));
  };

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.priceNum * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `Hello Fresh Bakers! 👋 I would like to place a bakery pre-order:\n\n`;
    
    if (cart.length > 0) {
      msg += `*Order Items:*\n`;
      cart.forEach((item) => {
        msg += `• ${item.quantity}x ${item.product.name} - ₹${(item.product.priceNum * item.quantity)}\n`;
      });
      msg += `\n*Total Amount:* ₹${totalAmount}\n`;
    } else {
      msg += `I have a general inquiry about your daily bakes & custom catering.\n`;
    }

    if (pickupDate) {
      msg += `*Requested Pickup Date:* ${formatPickupDate(pickupDate)}\n`;
    }
    if (customerName) {
      msg += `*Name:* ${customerName}\n`;
    }
    if (notes) {
      msg += `*Special Notes:* ${notes}\n`;
    }

    msg += `\nThank you!`;
    return msg;
  };

  const handleSendWhatsApp = () => {
    if (!pickupDate) {
      setDateError(true);
      return;
    }

    const rawMsg = generateWhatsAppMessage();
    const encoded = encodeURIComponent(rawMsg);
    const cleanNum = (whatsappNumber || '15550192824').replace(/[\+\s]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-[#FAF6F0] w-full max-w-xl max-h-[90vh] overflow-y-auto border border-[#D97706]/30 shadow-2xl rounded-3xl relative p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#F0E5DA] pb-4">
          <div>
            <span className="inline-flex items-center gap-1 font-label-caps text-xs text-[#5C2E14] tracking-widest uppercase block font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#D97706]" /> Direct Bakery Reservation
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#24140A] font-bold">WhatsApp Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#5C2E14] hover:bg-[#F4EBE1] rounded-full transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div>
          <h3 className="font-serif-display font-bold text-sm text-[#24140A] mb-3 uppercase tracking-wider flex items-center justify-between">
            <span>Your Selected Bakes ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            {cart.length > 0 && (
              <span className="text-[#5C2E14] font-bold text-base">₹{totalAmount}</span>
            )}
          </h3>

          {cart.length === 0 ? (
            <div className="bg-[#F4EBE1] p-6 text-center rounded-2xl border border-dashed border-[#F0E5DA] space-y-3">
              <p className="text-[#24140A] font-serif-display text-base font-bold">
                Your pre-order cart is currently empty.
              </p>
              <p className="text-xs text-[#6C584C]">
                Select items from our menu or send a custom inquiry directly to our master baker.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {allProducts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddToCart(p)}
                    className="text-xs bg-[#FAF6F0] hover:bg-[#5C2E14] hover:text-white px-3 py-1.5 rounded-full border border-[#F0E5DA] transition-all font-semibold flex items-center gap-1 shadow-xs cursor-pointer"
                  >
                    + Add {p.name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="space-y-3 max-h-48 overflow-y-auto pr-1 mb-4">
              {cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex items-center justify-between p-3.5 bg-[#F4EBE1] rounded-2xl border border-[#F0E5DA]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-xl border border-[#D97706]/30"
                    />
                    <div>
                      <h4 className="font-serif-display font-bold text-sm text-[#24140A]">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#5C2E14] font-bold">{item.product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#F0E5DA] text-[#24140A] flex items-center justify-center hover:bg-[#5C2E14] hover:text-white transition-colors cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-5 text-center text-[#24140A]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-8 h-8 rounded-full bg-[#FAF6F0] border border-[#F0E5DA] text-[#24140A] flex items-center justify-center hover:bg-[#5C2E14] hover:text-white transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Details Form */}
        <div className="space-y-4 pt-2 border-t border-[#F0E5DA]">
          <h3 className="font-serif-display font-bold text-sm text-[#24140A] uppercase tracking-wider">
            Reservation Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#6C584C] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#5C2E14]" /> Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#F4EBE1] border border-[#F0E5DA] rounded-xl px-3.5 py-2.5 text-sm text-[#24140A] focus:outline-none focus:border-[#5C2E14]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6C584C] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#5C2E14]" /> Preferred Pickup Date *
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={pickupDate}
                  min={getTodayDateString()}
                  onChange={(e) => {
                    setPickupDate(e.target.value);
                    if (dateError) setDateError(false);
                  }}
                  className={`w-full bg-[#F4EBE1] border ${dateError ? 'border-rose-500' : 'border-[#F0E5DA]'} rounded-xl px-3.5 py-2.5 pr-11 text-sm text-[#24140A] focus:outline-none focus:border-[#5C2E14]`}
                />
                <Calendar className="absolute right-3 top-1/2 -translate-y-1/2 text-[#5C2E14] w-5 h-5" />
              </div>
              {pickupDate && (
                <p className="mt-2 text-xs text-[#5C2E14]">{formatPickupDate(pickupDate)}</p>
              )}
              {dateError && (
                <p className="mt-2 text-xs text-rose-600">Please choose a pickup date.</p>
              )}
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6C584C] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#5C2E14]" /> Cake Message or Custom Notes
            </label>
            <input
              type="text"
              placeholder='e.g. Eggless preference, cake message "Happy Birthday Aarav!", gift wrapping'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#F4EBE1] border border-[#F0E5DA] rounded-xl px-3.5 py-2.5 text-sm text-[#24140A] focus:outline-none focus:border-[#5C2E14]"
            />
          </div>
        </div>

        {/* Live Message Preview */}
        <div className="bg-[#24140A] p-4 rounded-2xl border border-[#D97706]/30 font-mono text-xs text-[#FAF6F0] whitespace-pre-wrap leading-relaxed shadow-inner">
          <div className="text-[10px] font-sans uppercase font-bold text-[#D97706] mb-1.5 flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> WhatsApp Message Preview:
          </div>
          {generateWhatsAppMessage()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleSendWhatsApp}
            className="flex-1 btn-gold py-3.5 font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg cursor-pointer"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Send Order via WhatsApp
          </button>
          
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="px-4 py-3.5 border border-[#F0E5DA] text-[#6C584C] hover:bg-[#F4EBE1] rounded-xl transition-colors text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4 text-rose-600" /> Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


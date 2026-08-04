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
  const [pickupDate, setPickupDate] = useState('Tomorrow 9:00 AM');
  const [notes, setNotes] = useState('');

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
      msg += `*Requested Pickup:* ${pickupDate}\n`;
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
    const rawMsg = generateWhatsAppMessage();
    const encoded = encodeURIComponent(rawMsg);
    const cleanNum = (whatsappNumber || '15550192824').replace(/[\+\s]/g, '');
    const whatsappUrl = `https://wa.me/${cleanNum}?text=${encoded}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-fadeIn">
      <div className="bg-[#faf6f0] w-full max-w-xl max-h-[90vh] overflow-y-auto border border-[#c59b27]/30 shadow-2xl rounded-3xl relative p-6 md:p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#e8dec9] pb-4">
          <div>
            <span className="inline-flex items-center gap-1 font-label-caps text-xs text-[#825425] tracking-widest uppercase block font-bold mb-1">
              <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Direct Bakery Reservation
            </span>
            <h2 className="font-serif-display text-2xl sm:text-3xl text-[#1f1610] font-bold">WhatsApp Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-[#825425] hover:bg-[#f4ebe1] rounded-full transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart items list */}
        <div>
          <h3 className="font-serif-display font-bold text-sm text-[#1f1610] mb-3 uppercase tracking-wider flex items-center justify-between">
            <span>Your Selected Bakes ({cart.reduce((a, b) => a + b.quantity, 0)})</span>
            {cart.length > 0 && (
              <span className="text-[#825425] font-bold text-base">₹{totalAmount}</span>
            )}
          </h3>

          {cart.length === 0 ? (
            <div className="bg-[#f4ebe1] p-6 text-center rounded-2xl border border-dashed border-[#e8dec9] space-y-3">
              <p className="text-[#1f1610] font-serif-display text-base font-bold">
                Your pre-order cart is currently empty.
              </p>
              <p className="text-xs text-[#6e5d4f]">
                Select items from our menu or send a custom inquiry directly to our master baker.
              </p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {allProducts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddToCart(p)}
                    className="text-xs bg-[#faf6f0] hover:bg-[#825425] hover:text-white px-3 py-1.5 rounded-full border border-[#e8dec9] transition-all font-semibold flex items-center gap-1 shadow-xs"
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
                  className="flex items-center justify-between p-3.5 bg-[#f4ebe1] rounded-2xl border border-[#e8dec9]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover rounded-xl border border-[#c59b27]/30"
                    />
                    <div>
                      <h4 className="font-serif-display font-bold text-sm text-[#1f1610]">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#825425] font-bold">{item.product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-8 h-8 rounded-full bg-[#faf6f0] border border-[#e8dec9] text-[#1f1610] flex items-center justify-center hover:bg-[#825425] hover:text-white transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-5 text-center text-[#1f1610]">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-8 h-8 rounded-full bg-[#faf6f0] border border-[#e8dec9] text-[#1f1610] flex items-center justify-center hover:bg-[#825425] hover:text-white transition-colors"
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
        <div className="space-y-4 pt-2 border-t border-[#e8dec9]">
          <h3 className="font-serif-display font-bold text-sm text-[#1f1610] uppercase tracking-wider">
            Reservation Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-[#6e5d4f] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#825425]" /> Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Priya Sharma"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#f4ebe1] border border-[#e8dec9] rounded-xl px-3.5 py-2.5 text-sm text-[#1f1610] focus:outline-none focus:border-[#825425]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-[#6e5d4f] uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#825425]" /> Preferred Pickup Slot
              </label>
              <select
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#f4ebe1] border border-[#e8dec9] rounded-xl px-3.5 py-2.5 text-sm text-[#1f1610] focus:outline-none focus:border-[#825425]"
              >
                <option value="Today 2:00 PM - 4:00 PM">Today (2:00 PM – 4:00 PM)</option>
                <option value="Tomorrow 8:00 AM - 10:00 AM">Tomorrow Morning (8:00 AM – 10:00 AM)</option>
                <option value="Tomorrow 11:00 AM - 1:00 PM">Tomorrow Midday (11:00 AM – 1:00 PM)</option>
                <option value="Weekend Special Pre-Order">Weekend Bake Special</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#6e5d4f] uppercase tracking-wider mb-1.5 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#825425]" /> Cake Message or Custom Notes
            </label>
            <input
              type="text"
              placeholder='e.g. Eggless preference, cake message "Happy Birthday Aarav!", gift wrapping'
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#f4ebe1] border border-[#e8dec9] rounded-xl px-3.5 py-2.5 text-sm text-[#1f1610] focus:outline-none focus:border-[#825425]"
            />
          </div>
        </div>

        {/* Live Message Preview */}
        <div className="bg-[#1f1610] p-4 rounded-2xl border border-[#c59b27]/30 font-mono text-xs text-[#faf6f0] whitespace-pre-wrap leading-relaxed shadow-inner">
          <div className="text-[10px] font-sans uppercase font-bold text-[#c59b27] mb-1.5 flex items-center gap-1">
            <MessageCircle className="w-3 h-3" /> WhatsApp Message Preview:
          </div>
          {generateWhatsAppMessage()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-2">
          <button
            onClick={handleSendWhatsApp}
            className="flex-1 btn-gold py-3.5 font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-wider shadow-lg"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Send Order via WhatsApp
          </button>
          
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="px-4 py-3.5 border border-[#e8dec9] text-[#6e5d4f] hover:bg-[#f4ebe1] rounded-xl transition-colors text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-1"
            >
              <Trash2 className="w-4 h-4 text-rose-600" /> Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


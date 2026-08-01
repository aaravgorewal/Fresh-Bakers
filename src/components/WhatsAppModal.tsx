import React, { useState } from 'react';
import { OrderCartItem, ProductItem } from '../types';
import { X, Plus, Minus, Trash2, Send, Calendar, Clock, User, FileText } from 'lucide-react';

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
  const [copiedLink, setCopiedLink] = useState(false);

  if (!isOpen) return null;

  const totalAmount = cart.reduce((sum, item) => sum + item.product.priceNum * item.quantity, 0);

  const generateWhatsAppMessage = () => {
    let msg = `Hello Fresh Bakers! 👋 I would like to place a bakery pre-order:\n\n`;
    
    if (cart.length > 0) {
      msg += `*Order Items:*\n`;
      cart.forEach((item) => {
        msg += `• ${item.quantity}x ${item.product.name} - $${(item.product.priceNum * item.quantity).toFixed(2)}\n`;
      });
      msg += `\n*Total Amount:* $${totalAmount.toFixed(2)}\n`;
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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fadeIn">
      <div className="bg-[#fbf9f5] w-full max-w-xl max-h-[90vh] overflow-y-auto border border-[#825425] shadow-2xl relative p-6 md:p-8">
        {/* Header */}
        <div className="flex justify-between items-start border-b border-[#d5c3b6] pb-4 mb-6">
          <div>
            <span className="font-label-caps text-xs text-[#825425] tracking-widest uppercase block mb-1">
              Direct Hearth Reservation
            </span>
            <h2 className="font-headline-md text-2xl text-[#1b1c1a] font-bold">WhatsApp Bakery Order</h2>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#837469] hover:text-[#1b1c1a] transition-colors"
            aria-label="Close modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart items list */}
        <div className="mb-6">
          <h3 className="font-body-md font-semibold text-sm text-[#51443a] mb-3 uppercase tracking-wider">
            Your Selected Items ({cart.reduce((a, b) => a + b.quantity, 0)})
          </h3>

          {cart.length === 0 ? (
            <div className="bg-[#f5f3ef] p-6 text-center border border-dashed border-[#d5c3b6] mb-4">
              <p className="text-[#51443a] font-body-md text-sm mb-3">
                Your pre-order cart is currently empty.
              </p>
              <p className="text-xs text-[#837469] mb-4">
                Select items from our menu or send a custom inquiry directly to our baker.
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {allProducts.slice(0, 3).map((p) => (
                  <button
                    key={p.id}
                    onClick={() => onAddToCart(p)}
                    className="text-xs bg-[#e6ded9] hover:bg-[#825425] hover:text-white px-3 py-1.5 transition-colors font-medium flex items-center gap-1"
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
                  className="flex items-center justify-between p-3 bg-[#f5f3ef] border border-[#e4e2de]"
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-12 h-12 object-cover border border-[#d5c3b6]"
                    />
                    <div>
                      <h4 className="font-serif-display font-semibold text-sm text-[#1b1c1a]">
                        {item.product.name}
                      </h4>
                      <p className="text-xs text-[#825425] font-semibold">{item.product.price}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, -1)}
                      className="w-7 h-7 bg-[#e6ded9] text-[#1b1c1a] flex items-center justify-center hover:bg-[#825425] hover:text-white transition-colors"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-bold text-sm w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => onUpdateQuantity(item.product.id, 1)}
                      className="w-7 h-7 bg-[#e6ded9] text-[#1b1c1a] flex items-center justify-center hover:bg-[#825425] hover:text-white transition-colors"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {cart.length > 0 && (
            <div className="flex justify-between items-center pt-3 border-t border-[#d5c3b6] text-sm font-bold">
              <span>Estimated Total:</span>
              <span className="text-[#825425] text-lg font-serif-display">${totalAmount.toFixed(2)}</span>
            </div>
          )}
        </div>

        {/* Order Details Form */}
        <div className="space-y-4 mb-6 pt-4 border-t border-[#d5c3b6]">
          <h3 className="font-body-md font-semibold text-sm text-[#51443a] uppercase tracking-wider">
            Reservation Details
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1 flex items-center gap-1">
                <User className="w-3.5 h-3.5 text-[#825425]" /> Your Name
              </label>
              <input
                type="text"
                placeholder="e.g. Sarah Jenkins"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#825425]" /> Preferred Pickup Slot
              </label>
              <select
                value={pickupDate}
                onChange={(e) => setPickupDate(e.target.value)}
                className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
              >
                <option value="Today 2:00 PM - 4:00 PM">Today (2:00 PM – 4:00 PM)</option>
                <option value="Tomorrow 8:00 AM - 10:00 AM">Tomorrow Morning (8:00 AM – 10:00 AM)</option>
                <option value="Tomorrow 11:00 AM - 1:00 PM">Tomorrow Midday (11:00 AM – 1:00 PM)</option>
                <option value="Weekend Special Pre-Order">Weekend Bake Special</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1 flex items-center gap-1">
              <FileText className="w-3.5 h-3.5 text-[#825425]" /> Slicing or Custom Request
            </label>
            <input
              type="text"
              placeholder="e.g. Please slice sourdoughs, gift box packaging"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
            />
          </div>
        </div>

        {/* Live Message Preview */}
        <div className="bg-[#efeeea] p-4 border border-[#d5c3b6] mb-6 font-mono text-xs text-[#51443a] whitespace-pre-wrap rounded-sm">
          <div className="text-[10px] uppercase font-sans font-bold text-[#825425] mb-1">
            WhatsApp Message Preview:
          </div>
          {generateWhatsAppMessage()}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={handleSendWhatsApp}
            className="flex-1 btn-primary py-3 flex items-center justify-center gap-2 text-sm"
          >
            <span className="material-symbols-outlined text-xl">chat</span>
            Send Order via WhatsApp
          </button>
          
          {cart.length > 0 && (
            <button
              onClick={onClearCart}
              className="px-4 py-3 border border-[#837469] text-[#51443a] hover:bg-[#e6ded9] transition-colors text-xs font-semibold uppercase tracking-wider flex items-center justify-center gap-1"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

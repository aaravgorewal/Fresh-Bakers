import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, Navigation, MessageSquare } from 'lucide-react';

interface ContactViewProps {
  onOpenOrderModal: () => void;
}

export const ContactView: React.FC<ContactViewProps> = ({ onOpenOrderModal }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Pre-Order Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: 'Pre-Order Inquiry', message: '' });
    }, 6000);
  };

  return (
    <div className="w-full px-5 md:px-16 py-12 max-w-[1200px] mx-auto">
      {/* Page Header matching Page 3 screenshot */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1">
          Visit Our Bakery Hearth
        </span>
        <h1 className="font-display-lg md:text-5xl text-[#1b1c1a] font-bold mb-4">
          Find Us in the Flour
        </h1>
        <p className="font-body-md text-[#51443a] text-sm md:text-base leading-relaxed">
          Stop by our bakery counter for warm sourdough and coffee, or get in touch for pre-orders, custom wedding tier cakes, and catering inquiries.
        </p>
      </div>

      {/* Info Cards Grid matching Page 3 screenshot */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center">
          <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-5 h-5" />
          </div>
          <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2">Location</h3>
          <p className="font-headline-sm text-base font-bold text-[#1b1c1a]">142 Artisan Boulevard</p>
          <p className="font-body-md text-xs text-[#51443a]">Mill District, Flour Town</p>
        </div>

        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center">
          <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2">Hearth Hours</h3>
          <p className="font-headline-sm text-base font-bold text-[#1b1c1a]">Tue – Sun: 7am – 4pm</p>
          <p className="font-body-md text-xs text-[#51443a]">Closed Mondays for starter refresh</p>
        </div>

        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center">
          <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
            <Phone className="w-5 h-5" />
          </div>
          <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2">WhatsApp Line</h3>
          <p className="font-headline-sm text-base font-bold text-[#1b1c1a]">+1 (555) 019-2824</p>
          <p className="font-body-md text-xs text-[#51443a]">Fastest response for pre-orders</p>
        </div>

        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center">
          <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
            <Mail className="w-5 h-5" />
          </div>
          <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2">Direct Email</h3>
          <p className="font-headline-sm text-base font-bold text-[#1b1c1a]">hello@freshbakers.com</p>
          <p className="font-body-md text-xs text-[#51443a]">Wholesale & events</p>
        </div>
      </div>

      {/* Main Content: Map & Form Grid matching Page 3 screenshot */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 mb-16 items-start">
        {/* Left Column: Interactive Map Widget */}
        <div className="lg:col-span-7 space-y-4">
          <div className="border border-[#d5c3b6] bg-[#f5f3ef] p-4 relative">
            <div className="flex justify-between items-center mb-3">
              <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest font-bold">
                Mill District Map
              </span>
              <span className="text-xs text-[#51443a] flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-[#825425]" /> Directions available
              </span>
            </div>

            {/* Custom Interactive Map Graphic */}
            <div className="relative w-full h-80 bg-[#eae8e4] border border-[#d5c3b6] overflow-hidden flex items-center justify-center rounded-xs">
              {/* Map background styling lines */}
              <div className="absolute inset-0 bg-[radial-gradient(#d5c3b6_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
              
              {/* Roads / River simulation */}
              <div className="absolute top-0 bottom-0 left-1/3 w-12 bg-[#dbdad6] rotate-12"></div>
              <div className="absolute left-0 right-0 top-1/2 h-10 bg-[#c68e5a]/20 border-y border-[#c68e5a]/40"></div>

              {/* Bakery Location Marker */}
              <div className="relative z-10 flex flex-col items-center animate-bounce">
                <div className="bg-[#825425] text-white p-2.5 shadow-xl rounded-full border-2 border-white">
                  <MapPin className="w-6 h-6" />
                </div>
                <div className="bg-[#1b1c1a] text-white text-[11px] font-bold px-3 py-1 shadow-md mt-1 rounded-sm whitespace-nowrap">
                  Fresh Bakers Hearth
                </div>
              </div>

              {/* Landmarks */}
              <div className="absolute top-6 left-6 text-[10px] text-[#837469] font-semibold tracking-wider">
                📍 Heritage Grain Silos (200m)
              </div>
              <div className="absolute bottom-6 right-6 text-[10px] text-[#837469] font-semibold tracking-wider">
                🌊 Riverfront Promenade
              </div>
            </div>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
              <p className="text-xs text-[#51443a]">
                Free 30-minute bakery customer parking behind Mill Street.
              </p>
              <button
                onClick={() => window.open('https://maps.google.com', '_blank')}
                className="btn-secondary text-xs uppercase tracking-widest py-2 px-4 whitespace-nowrap"
              >
                Open in Google Maps
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Direct Message Form */}
        <div className="lg:col-span-5 bg-white p-6 md:p-8 border border-[#d5c3b6] shadow-sm">
          <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block mb-1">
            Send a Note
          </span>
          <h2 className="font-headline-sm text-2xl font-bold text-[#1b1c1a] mb-6">
            Contact Bakery Team
          </h2>

          {submitted ? (
            <div className="bg-[#825425] text-white p-6 text-center space-y-2 animate-fadeIn">
              <CheckCircle2 className="w-8 h-8 mx-auto" />
              <h3 className="font-headline-sm text-lg font-bold">Message Received!</h3>
              <p className="font-body-md text-xs leading-relaxed">
                Thank you for reaching out to Fresh Bakers. Our hearth manager will reply to your email within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Marcus Vance"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="marcus@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                  Topic / Inquiry
                </label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                >
                  <option value="Pre-Order Inquiry">Bakery Pre-Order</option>
                  <option value="Custom Event Cake">Custom Wedding & Event Cake</option>
                  <option value="Wholesale Supply">Wholesale Bread Supply</option>
                  <option value="Feedback">Feedback & Compliments</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#51443a] uppercase tracking-wider mb-1">
                  Your Message
                </label>
                <textarea
                  rows={4}
                  required
                  placeholder="Tell us about your event, preferred date, or bread inquiry..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full bg-[#f5f3ef] border border-[#d5c3b6] px-3 py-2 text-sm text-[#1b1c1a] focus:outline-none focus:border-[#825425]"
                ></textarea>
              </div>

              <button type="submit" className="w-full btn-primary py-3 text-xs uppercase tracking-widest flex items-center justify-center gap-2">
                <Send className="w-4 h-4" /> Send Message
              </button>
            </form>
          )}

          <div className="mt-6 pt-4 border-t border-[#d5c3b6] text-center">
            <span className="text-xs text-[#51443a]">Need an instant response for today's bake?</span>
            <button
              onClick={onOpenOrderModal}
              className="mt-2 w-full btn-secondary text-xs uppercase tracking-widest flex items-center justify-center gap-2"
            >
              <span className="material-symbols-outlined text-[18px]">chat</span>
              Chat via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

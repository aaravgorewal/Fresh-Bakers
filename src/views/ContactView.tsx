import React from 'react';
import { MapPin, Clock, Navigation, ExternalLink, Sparkles, MessageCircle } from 'lucide-react';
import { BakerySettings } from '../types';
import { motion } from 'motion/react';
import { ScrollReveal, RippleButton } from '../components/animations/AnimatedComponents';

interface ContactViewProps {
  onOpenOrderModal: () => void;
  settings?: BakerySettings;
}

export const ContactView: React.FC<ContactViewProps> = ({ settings }) => {
  const bakeryName = settings?.bakeryName || 'Fresh Bakers';
  const whatsappNumber = settings?.whatsappNumber || '15550192824';
  const address = settings?.address || '142 Artisan Boulevard, Mill District';
  const openingHours = settings?.openingHours || 'Tue – Sun: 7am – 4pm';
  const instagramUrl = settings?.instagramUrl || 'https://instagram.com/freshbakers';

  const cleanNum = whatsappNumber.replace(/[\+\s]/g, '');

  const handleWhatsAppClick = () => {
    const message = `Hi ${bakeryName}! I'd like to make an inquiry / order.`;
    const encoded = encodeURIComponent(message);
    window.open(`https://wa.me/${cleanNum}?text=${encoded}`, '_blank');
  };

  const handleOpenGoogleMaps = () => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  return (
    <div className="w-full px-4 sm:px-8 py-8 md:py-12 max-w-[1280px] mx-auto space-y-12">
      {/* 1. PAGE HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="inline-flex items-center gap-1.5 font-label-caps text-[#825425] tracking-[0.2em] uppercase font-bold text-xs bg-[#f4ebe1] px-4 py-1 rounded-full border border-[#e8dec9]">
          <Sparkles className="w-3.5 h-3.5 text-[#c59b27]" /> Visit Our Bakery
        </span>
        <h1 className="font-serif-display text-4xl sm:text-5xl text-[#1f1610] font-bold tracking-tight">
          Get in Touch
        </h1>
        <p className="font-body-md text-[#6e5d4f] text-sm sm:text-base leading-relaxed">
          Stop by our bakery counter for fresh cakes and artisanal beverages, or connect directly with us for pre-orders, custom celebratory cakes, and gift hampers.
        </p>
      </div>

      {/* 2. INFO CARDS GRID (Location, Hours, Instagram, WhatsApp) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Address Card */}
        <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-1 font-bold">
              Location & Address
            </h3>
            <p className="font-serif-display text-base font-bold text-[#1f1610]">
              {address}
            </p>
          </div>
          <button
            onClick={handleOpenGoogleMaps}
            className="text-xs text-[#825425] font-bold uppercase tracking-wider hover:underline flex items-center justify-center gap-1"
          >
            <span>Get Directions</span>
            <Navigation className="w-3.5 h-3.5" />
          </button>
        </motion.div>

        {/* Opening Hours Card */}
        <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-1 font-bold">
              Opening Hours
            </h3>
            <p className="font-serif-display text-base font-bold text-[#1f1610]">
              {openingHours}
            </p>
          </div>
          <p className="font-body-md text-xs text-[#a38f7d] font-medium">
            Fresh daily bakes ready at sunrise
          </p>
        </motion.div>

        {/* Instagram Card */}
        <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <span className="material-symbols-outlined text-[24px]">photo_camera</span>
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-1 font-bold">
              Instagram
            </h3>
            <p className="font-serif-display text-base font-bold text-[#1f1610] truncate">
              @{instagramUrl.replace(/https?:\/\/(www\.)?instagram\.com\/?/, '').replace(/\/$/, '') || 'freshbakers'}
            </p>
          </div>
          <a
            href={instagramUrl.startsWith('http') ? instagramUrl : `https://${instagramUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-[#825425] font-bold uppercase tracking-wider hover:underline flex items-center justify-center gap-1"
          >
            <span>Follow Our Bake Feed</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </motion.div>

        {/* WhatsApp Card */}
        <motion.div whileHover={{ y: -4 }} className="luxury-card p-6 text-center flex flex-col justify-between space-y-4">
          <div>
            <div className="w-12 h-12 rounded-2xl bg-[#825425] text-white flex items-center justify-center mx-auto mb-3 shadow-md">
              <MessageCircle className="w-6 h-6" />
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-1 font-bold">
              WhatsApp Line
            </h3>
            <p className="font-serif-display text-base font-bold text-[#1f1610]">
              +{cleanNum}
            </p>
          </div>
          <p className="font-body-md text-xs text-[#a38f7d] font-medium">
            Instant daily pre-orders
          </p>
        </motion.div>
      </div>

      {/* 3. HERO WHATSAPP ACTION CARD */}
      <div className="relative rounded-3xl bg-gradient-to-br from-[#16110d] via-[#2d2118] to-[#16110d] text-[#faf6f0] p-8 md:p-14 border border-[#c59b27]/40 shadow-2xl text-center max-w-3xl mx-auto space-y-6">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#d4a373] uppercase tracking-widest bg-[#d4a373]/15 px-4 py-1 rounded-full border border-[#d4a373]/30">
          <MessageCircle className="w-3.5 h-3.5" /> Primary Communication Channel
        </span>
        <h2 className="font-serif-display text-3xl sm:text-4xl font-bold">
          Connect Directly with {bakeryName}
        </h2>
        <p className="font-body-md text-sm sm:text-base text-[#dccbbb] leading-relaxed max-w-xl mx-auto">
          We process all customer inquiries, daily pre-orders, and custom cake bookings directly on WhatsApp for immediate and personalized assistance.
        </p>

        {/* Large WhatsApp Action Button */}
        <div className="pt-2">
          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 btn-gold font-bold text-sm uppercase tracking-wider px-8 py-4 shadow-xl"
          >
            <span className="material-symbols-outlined text-[24px]">chat</span>
            Order & Inquire via WhatsApp (+{cleanNum})
          </button>
        </div>
        <p className="text-[11px] text-[#a38f7d] uppercase font-bold tracking-widest">
          Opens directly in WhatsApp web or mobile app
        </p>
      </div>

      {/* 4. MAP LOCATION DISPLAY */}
      <div className="luxury-card p-6 max-w-4xl mx-auto space-y-4">
        <div className="flex justify-between items-center">
          <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest font-bold">
            Bakery Storefront Map
          </span>
          <span className="text-xs text-[#6e5d4f] flex items-center gap-1 font-medium">
            <Navigation className="w-3.5 h-3.5 text-[#825425]" /> {address}
          </span>
        </div>

        {/* Custom Map Styling */}
        <div className="relative w-full h-80 bg-[#f4ebe1] rounded-2xl border border-[#e8dec9] overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-[radial-gradient(#d4a373_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />
          <div className="absolute top-0 bottom-0 left-1/3 w-14 bg-[#e5d8c8] rotate-12" />
          <div className="absolute left-0 right-0 top-1/2 h-12 bg-[#825425]/10 border-y border-[#825425]/20" />

          {/* Marker */}
          <div className="relative z-10 flex flex-col items-center animate-bounce">
            <div className="bg-[#825425] text-white p-3.5 shadow-2xl rounded-full border-2 border-white">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="bg-[#1f1610] text-[#faf6f0] text-xs font-bold px-3.5 py-1.5 shadow-xl mt-1.5 rounded-full border border-[#c59b27]/40 whitespace-nowrap">
              {bakeryName} Storefront
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-between items-center pt-2">
          <p className="text-xs text-[#6e5d4f] font-medium">
            Customer parking available directly outside our storefront.
          </p>
          <button
            onClick={handleOpenGoogleMaps}
            className="btn-secondary text-xs uppercase font-bold tracking-wider py-2.5 px-5 whitespace-nowrap"
          >
            Open Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

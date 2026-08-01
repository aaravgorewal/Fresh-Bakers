import React from 'react';
import { MapPin, Clock, Navigation, ExternalLink } from 'lucide-react';
import { BakerySettings } from '../types';

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
    <div className="w-full px-5 md:px-16 py-12 max-w-[1200px] mx-auto">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1 font-semibold text-xs">
          Visit Our Bakery Hearth
        </span>
        <h1 className="font-display-lg text-3xl md:text-5xl text-[#1b1c1a] font-bold mb-4">
          Get in Touch
        </h1>
        <p className="font-body-md text-[#51443a] text-sm md:text-base leading-relaxed">
          Stop by our bakery counter for warm sourdough and coffee, or connect directly with us for pre-orders, custom celebratory cakes, and catering inquiries.
        </p>
      </div>

      {/* Info Cards Grid (Address, Hours, Instagram, WhatsApp) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {/* Address Card */}
        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
              <MapPin className="w-5 h-5" />
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2 font-semibold">
              Location & Address
            </h3>
            <p className="font-headline-sm text-base font-bold text-[#1b1c1a] mb-1">
              {address}
            </p>
          </div>
          <button
            onClick={handleOpenGoogleMaps}
            className="mt-4 text-[11px] text-[#825425] font-semibold uppercase tracking-wider underline flex items-center justify-center gap-1 hover:text-[#51443a]"
          >
            Get Directions <Navigation className="w-3 h-3" />
          </button>
        </div>

        {/* Opening Hours Card */}
        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2 font-semibold">
              Opening Hours
            </h3>
            <p className="font-headline-sm text-base font-bold text-[#1b1c1a]">
              {openingHours}
            </p>
          </div>
          <p className="mt-4 font-body-md text-[11px] text-[#837469]">
            Fresh bakes ready from opening
          </p>
        </div>

        {/* Instagram Card */}
        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[20px]">photo_camera</span>
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2 font-semibold">
              Instagram Page
            </h3>
            <p className="font-headline-sm text-base font-bold text-[#1b1c1a] truncate px-2">
              @{instagramUrl.replace(/https?:\/\/(www\.)?instagram\.com\/?/, '').replace(/\/$/, '') || 'freshbakers'}
            </p>
          </div>
          <a
            href={instagramUrl.startsWith('http') ? instagramUrl : `https://${instagramUrl}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 text-[11px] text-[#825425] font-semibold uppercase tracking-wider underline flex items-center justify-center gap-1 hover:text-[#51443a]"
          >
            Visit Instagram <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* WhatsApp Line Card */}
        <div className="bg-[#f5f3ef] p-6 border border-[#d5c3b6] text-center flex flex-col justify-between">
          <div>
            <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-3">
              <span className="material-symbols-outlined text-[20px]">chat</span>
            </div>
            <h3 className="font-label-caps text-xs text-[#825425] uppercase tracking-widest mb-2 font-semibold">
              WhatsApp Line
            </h3>
            <p className="font-headline-sm text-base font-bold text-[#1b1c1a]">
              +{cleanNum}
            </p>
          </div>
          <p className="mt-4 font-body-md text-[11px] text-[#837469]">
            Instant orders & inquiries
          </p>
        </div>
      </div>

      {/* Main Feature Section: Large WhatsApp Hero Action Button (No contact form) */}
      <div className="bg-white border border-[#d5c3b6] p-8 md:p-12 shadow-sm mb-16 text-center max-w-3xl mx-auto space-y-6">
        <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest block font-semibold">
          Primary Communication Channel
        </span>
        <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-[#1b1c1a]">
          Connect Direct with {bakeryName}
        </h2>
        <p className="font-body-md text-[#51443a] text-sm leading-relaxed max-w-xl mx-auto">
          We process all customer inquiries, daily pre-orders, and custom cake bookings directly on WhatsApp for immediate and personalized assistance.
        </p>

        {/* Large WhatsApp Action Button */}
        <div className="pt-2">
          <button
            onClick={handleWhatsAppClick}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-[#825425] hover:bg-[#6a421c] text-white font-bold text-base uppercase tracking-wider px-8 py-4 shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5"
          >
            <span className="material-symbols-outlined text-[24px]">chat</span>
            Order & Inquire via WhatsApp (+{cleanNum})
          </button>
        </div>
        <p className="text-[11px] text-[#837469] uppercase font-semibold tracking-wider">
          Opens directly in WhatsApp web or mobile app
        </p>
      </div>

      {/* Interactive Map Block */}
      <div className="border border-[#d5c3b6] bg-[#f5f3ef] p-5 relative max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-3">
          <span className="font-label-caps text-xs text-[#825425] uppercase tracking-widest font-bold">
            Hearth Location Map
          </span>
          <span className="text-xs text-[#51443a] flex items-center gap-1">
            <Navigation className="w-3.5 h-3.5 text-[#825425]" /> {address}
          </span>
        </div>

        {/* Custom Map Graphic */}
        <div className="relative w-full h-80 bg-[#eae8e4] border border-[#d5c3b6] overflow-hidden flex items-center justify-center rounded-xs">
          <div className="absolute inset-0 bg-[radial-gradient(#d5c3b6_1px,transparent_1px)] [background-size:16px_16px] opacity-40"></div>
          <div className="absolute top-0 bottom-0 left-1/3 w-12 bg-[#dbdad6] rotate-12"></div>
          <div className="absolute left-0 right-0 top-1/2 h-10 bg-[#c68e5a]/20 border-y border-[#c68e5a]/40"></div>

          {/* Bakery Location Marker */}
          <div className="relative z-10 flex flex-col items-center animate-bounce">
            <div className="bg-[#825425] text-white p-3 shadow-xl rounded-full border-2 border-white">
              <MapPin className="w-6 h-6" />
            </div>
            <div className="bg-[#1b1c1a] text-white text-[11px] font-bold px-3 py-1 shadow-md mt-1 rounded-sm whitespace-nowrap">
              {bakeryName} Hearth
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col sm:flex-row gap-3 justify-between items-center">
          <p className="text-xs text-[#51443a]">
            Customer parking available directly at our storefront location.
          </p>
          <button
            onClick={handleOpenGoogleMaps}
            className="btn-secondary text-xs uppercase tracking-widest py-2 px-4 whitespace-nowrap font-semibold"
          >
            Open in Google Maps
          </button>
        </div>
      </div>
    </div>
  );
};

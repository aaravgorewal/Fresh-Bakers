import React from 'react';
import { NavTab, BakerySettings } from '../types';
import { Wheat, Sparkles, ShieldCheck } from 'lucide-react';

interface AboutViewProps {
  setActiveTab: (tab: NavTab) => void;
  onOpenOrderModal: () => void;
  settings?: BakerySettings;
}

export const AboutView: React.FC<AboutViewProps> = ({ setActiveTab, onOpenOrderModal, settings }) => {
  const bakeryName = settings?.bakeryName || 'Fresh Bakers';

  return (
    <div className="w-full">
      {/* Hero Section matching Page 2 screenshot */}
      <section className="px-5 md:px-16 py-12 max-w-[1200px] mx-auto text-center">
        <span className="font-label-caps text-[#825425] tracking-widest uppercase block mb-1">
          Our Heritage & Ethos
        </span>
        <h1 className="font-display-lg md:text-5xl text-[#1b1c1a] font-bold mb-4">
          About {bakeryName}
        </h1>
        <p className="font-body-lg text-[#51443a] max-w-2xl mx-auto text-base md:text-lg leading-relaxed mb-10">
          A quiet devotion to traditional breadmaking, wild sourdough fermentation, and regional heritage grains.
        </p>

        {/* Hero Image Banner */}
        <div className="relative border border-[#d5c3b6] p-3 bg-white shadow-lg mb-16">
          <img
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvG0YpfGuIDIhlPMlQPxF1BMlL4AgniDbBJELDrOcddXmplAIPoavB5D3DqaDw3a8SB4c3SjutGdBIhkiDGEGG8OpfqbMEto9oOW3TfF4cuLZkfdlladXcNpraVDlrVkHAuvD5jruC0LiSmb9TZi4eKSOwnOuBbduIQxTdhf4cQRuVOQLNkZY_QRHWIV_K3RBmcT8CmSZPJ6SSAfzckK1poY7rksWSda2eofOlaDHsVMMyKZHVI1mcWg"
            alt={`Baker working at ${bakeryName}`}
            className="w-full h-[450px] object-cover"
          />
        </div>
      </section>

      {/* Main Narrative Section */}
      <section className="px-5 md:px-16 pb-16 max-w-[900px] mx-auto">
        <div className="space-y-8 text-[#1b1c1a] font-body-lg text-base md:text-lg leading-relaxed">
          <div className="border-l-2 border-[#825425] pl-6 py-1">
            <h2 className="font-headline-md text-2xl md:text-3xl font-bold text-[#1b1c1a] mb-2">
              The Philosophy of Slow Bread
            </h2>
            <p className="text-[#51443a] text-sm md:text-base">
              {bakeryName} was founded with a singular mission: to resurrect the lost art of slow-fermented, stone-ground hearth bread.
            </p>
          </div>

          <p className="text-[#51443a]">
            In an era of rapid commercial yeast and chemical dough conditioners, we choose the path of patience. Every piece of bread that leaves our hearth at {bakeryName} undergoes a rigorous 36-hour cold proof. This extended timeline allows native wild yeasts and lactic bacteria to naturally break down complex starches into deeply aromatic, gut-friendly nutrition.
          </p>

          <p className="text-[#51443a]">
            We work directly with local millers and grain farmers cultivating ancient heirloom wheat varieties—Einkorn, Emmer, Spelt, and Dark Rye. Our flour is stone-milled weekly, preserving the germ and essential oils that give our bread its golden crumb and distinct hazelnut aroma.
          </p>
        </div>

        {/* 3 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-16 pt-12 border-t border-[#d5c3b6]">
          <div className="p-6 bg-[#f5f3ef] border border-[#d5c3b6] text-center">
            <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-4">
              <Wheat className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1a] mb-2">100% Stone-Ground</h3>
            <p className="font-body-md text-xs text-[#51443a] leading-relaxed">
              Milled at low temperatures to retain natural vitamins, bran, and germ nutrients.
            </p>
          </div>

          <div className="p-6 bg-[#f5f3ef] border border-[#d5c3b6] text-center">
            <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1a] mb-2">36h Cold Ferment</h3>
            <p className="font-body-md text-xs text-[#51443a] leading-relaxed">
              Naturally fermented wild starter builds gut-friendly flora and rich caramelisation.
            </p>
          </div>

          <div className="p-6 bg-[#f5f3ef] border border-[#d5c3b6] text-center">
            <div className="w-10 h-10 rounded-full bg-[#825425] text-white flex items-center justify-center mx-auto mb-4">
              <Sparkles className="w-5 h-5" />
            </div>
            <h3 className="font-headline-sm text-lg font-bold text-[#1b1c1a] mb-2">Hand-Laminated</h3>
            <p className="font-body-md text-xs text-[#51443a] leading-relaxed">
              Our pastries are layered by hand with 84% fat French cultured butter over 3 days.
            </p>
          </div>
        </div>
      </section>

      {/* Craftsmanship Gallery matching Page 2 screenshot */}
      <section className="bg-[#f5f3ef] px-5 md:px-16 py-16 border-y border-[#d5c3b6]">
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center max-w-lg mx-auto mb-12">
            <span className="font-label-caps text-[#825425] uppercase tracking-widest block mb-1">
              Visual Journey
            </span>
            <h2 className="font-headline-md text-3xl font-bold text-[#1b1c1a]">
              Craftsmanship in Pictures
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-3 border border-[#d5c3b6]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDul2LQs2RG_9n7r3zLnleXJxS0v3iAxlSim0mTOpfBf6_CevWWYAQN6ecQiJesN7OcCq0lqOe6YfVnCAHOooJ0O876EwFe09PT8zYk34cnlpYuCkYL_YlLqgUzdn5E2KW23DZt3BIFlq70B13_vg4Q7ngeR2HrDLOadq3Lc7XgKiBCX1M_6hYH9jWSpHpy0HTREiR11T1LyqNb8iWVXGj5dms0hIlEbTM-jfEQf9TMfu6Bi9OBYN3oBQ"
                alt="Hand shaping sourdough dough"
                className="w-full h-64 object-cover mb-3"
              />
              <h4 className="font-headline-sm text-base font-bold text-[#1b1c1a]">Hand Shaping</h4>
              <p className="font-body-md text-xs text-[#51443a]">Gentle tension building preserves delicate fermentation gas bubbles.</p>
            </div>

            <div className="bg-white p-3 border border-[#d5c3b6]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCBDRFs1IWGO8cX-0jzwbK7bVrrMzXrFSdwVG2CgDRmgvOvvbC-DYYu3a5YUf7fpdHK7wnZWk7XFNo_LrP7uRC3Zcfr1Ywzhg3xjIhn2t-7SuQUfRsP5HoJ7l8GhgH7MDCQYuVyTyyrl0bkBCdJUMkGki7cNXK5tzFwpaLXvBkCkNB1bq_905drVPQ-0Unz_kXgwEP85kFB_CYIcyjBgVmPy938d6g9Pq8NPeME1Nwc6iCJEqIkd2u-cg"
                alt="Flaky viennoiserie croissant fold"
                className="w-full h-64 object-cover mb-3"
              />
              <h4 className="font-headline-sm text-base font-bold text-[#1b1c1a]">Viennoiserie Lamination</h4>
              <p className="font-body-md text-xs text-[#51443a]">27 precise butter folds create paper-thin flaky layers.</p>
            </div>

            <div className="bg-white p-3 border border-[#d5c3b6]">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDfun0VHGjAK63rKMcvGPLwxQJsDX_0xHQyy4iLiDIPAijnkgVzpvlxPvVWgBk3TReOwOIbFevkXDnmXhGto55uEAQ5MThseaKRUO5zhx6CvfPEKAemLIUKcc0Eina1zFPEzwivRQo8bcs03igdQn6ELCJe4g6k3Or6Do5Ni-cGu91ugYfBysG3FxCCRmedhIEU0B32EdXuWI7LDk6-Lqm9Ki-tDXJvmTayWa4F4Wrps6_hIJP6i6s20g"
                alt="Baguettes emerging hot from hearth oven"
                className="w-full h-64 object-cover mb-3"
              />
              <h4 className="font-headline-sm text-base font-bold text-[#1b1c1a]">Stone Hearth Firing</h4>
              <p className="font-body-md text-xs text-[#51443a]">Direct contact with 480°F stone deck produces dark caramelised crusts.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-5 md:px-16 py-16 max-w-[1200px] mx-auto text-center">
        <h2 className="font-headline-md text-3xl font-bold text-[#1b1c1a] mb-4">
          Taste the Difference of Real Bread
        </h2>
        <p className="font-body-md text-sm text-[#51443a] max-w-md mx-auto mb-6">
          Pre-order your morning loaf or pastry selection via WhatsApp for guaranteed pickup.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => {
              setActiveTab('products');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="btn-primary text-xs uppercase tracking-widest"
          >
            Explore Daily Menu
          </button>
          <button
            onClick={onOpenOrderModal}
            className="btn-secondary text-xs uppercase tracking-widest flex items-center gap-2"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            WhatsApp Order
          </button>
        </div>
      </section>
    </div>
  );
};

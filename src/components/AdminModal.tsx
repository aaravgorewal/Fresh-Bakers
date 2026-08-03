import React from 'react';
import { ProductItem, BakerySettings } from '../types';
import { AdminView } from '../views/AdminView';
import { X } from 'lucide-react';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: ProductItem[];
  settings?: BakerySettings;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, onClose, products, settings }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-y-auto animate-fadeIn">
      <div className="bg-white w-full max-w-6xl max-h-[92vh] overflow-y-auto rounded-2xl shadow-2xl relative border border-[#e8d8cb] my-auto">
        {/* Sticky Modal Close Header */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-[#e8d8cb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-600 animate-pulse" />
            <span className="text-xs font-bold uppercase tracking-wider text-[#825425]">Bakery Control Console</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-[#51443a] hover:text-[#1b1c1a] hover:bg-slate-100 rounded-full transition-colors"
            title="Close Admin Panel"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Admin Content */}
        <div className="p-2 sm:p-4">
          <AdminView products={products} settings={settings} />
        </div>
      </div>
    </div>
  );
};

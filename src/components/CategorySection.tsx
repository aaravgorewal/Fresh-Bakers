import React from 'react';
import { Category, ProductItem, CategoryInfo } from '../types';
import { motion } from 'motion/react';

interface CategorySectionProps {
  categories: CategoryInfo[];
  selectedCategory: Category | 'All';
  onSelectCategory: (category: Category | 'All') => void;
  products?: ProductItem[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
  className = ""
}) => {
  return (
    <div className={`w-full ${className}`}>
      {/* Horizontal categories container */}
      <div className="flex items-center gap-3 sm:gap-4 overflow-x-auto scrollbar-none pb-2 pt-1 -mx-4 px-4 sm:mx-0 sm:px-0">
        {/* All Categories Option */}
        <button
          onClick={() => onSelectCategory('All')}
          className={`flex items-center gap-2 px-5 py-3 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer ${
            selectedCategory === 'All'
              ? 'bg-[#5C2E14] text-white shadow-md scale-102 border border-[#5C2E14]'
              : 'bg-[#F4EBE1] hover:bg-[#E8DEC9] text-[#1F1610] border border-[#E8DEC9] hover:scale-102'
          }`}
        >
          <span>🎂 All Categories ({categories.length})</span>
        </button>

        {/* Circular / Rounded Category Cards */}
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat.name;

          return (
            <motion.button
              key={cat.name}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectCategory(cat.name)}
              className={`flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap shrink-0 transition-all duration-300 cursor-pointer ${
                isSelected
                  ? 'bg-[#5C2E14] text-white shadow-md border border-[#5C2E14]'
                  : 'bg-white hover:bg-[#F4EBE1] text-[#1F1610] border border-[#E8DEC9] hover:border-[#825425]/50'
              }`}
            >
              <div className="w-7 h-7 rounded-full overflow-hidden bg-[#F4EBE1] shrink-0 border border-[#E8DEC9]">
                <img src={cat.image} alt={cat.name} className="w-full h-full object-cover" />
              </div>
              <span>{cat.name}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};


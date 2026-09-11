import React from 'react';
import { X } from 'lucide-react';
import { FilterSidebar } from './FilterSidebar';
import { FilterState } from '../types/ecommerce';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const MobileFilterDrawer: React.FC<MobileFilterDrawerProps> = ({
  isOpen,
  onClose,
  filters,
  onChange,
  onReset,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end md:hidden">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-4/5 max-w-xs bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto p-4">
        <div className="flex items-center justify-between pb-4 mb-4 border-b border-vedic-gold/20">
          <h3 className="font-serif font-bold text-base text-vedic-maroon">Filters</h3>
          <button onClick={onClose} className="p-1 text-gray-400 hover:text-black">
            <X className="w-5 h-5" />
          </button>
        </div>

        <FilterSidebar filters={filters} onChange={onChange} onReset={onReset} />

        <div className="mt-6 pt-4 border-t border-vedic-beige">
          <button
            onClick={onClose}
            className="w-full bg-vedic-maroon text-vedic-ivory py-3 rounded-full text-xs font-bold shadow-md"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  );
};

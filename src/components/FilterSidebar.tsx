import React from 'react';
import { FilterState } from '../types/ecommerce';
import { CATEGORIES } from '../data/categories';
import { RotateCcw, Sparkles } from 'lucide-react';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
  onReset: () => void;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onChange, onReset }) => {
  const handleCategoryChange = (catSlug: string) => {
    onChange({
      ...filters,
      category: catSlug as any,
      subcategory: undefined,
    });
  };

  const handlePriceChange = (maxPrice: number) => {
    onChange({
      ...filters,
      priceRange: [0, maxPrice],
    });
  };

  const handleDiscountChange = (discount: number) => {
    onChange({
      ...filters,
      minDiscount: discount,
    });
  };

  return (
    <div className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-card space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-vedic-beige">
        <h3 className="font-serif font-bold text-base text-vedic-maroon flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-vedic-gold" /> Filter Products
        </h3>
        <button
          onClick={onReset}
          className="text-xs text-vedic-muted hover:text-vedic-maroon flex items-center gap-1 font-medium transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" /> Reset
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-2">
        <h4 className="text-xs font-bold text-vedic-dark uppercase tracking-wider">
          Categories
        </h4>
        <div className="space-y-1">
          <button
            onClick={() => handleCategoryChange('all')}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              filters.category === 'all' || !filters.category
                ? 'bg-vedic-maroon text-white font-bold'
                : 'text-vedic-charcoal hover:bg-vedic-ivory'
            }`}
          >
            All Spiritual Items
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategoryChange(cat.slug)}
              className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                filters.category === cat.slug
                  ? 'bg-vedic-maroon text-white font-bold'
                  : 'text-vedic-charcoal hover:bg-vedic-ivory'
              }`}
            >
              <span>{cat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Slider Filter */}
      <div className="space-y-2 pt-4 border-t border-vedic-beige">
        <div className="flex justify-between items-center text-xs font-bold text-vedic-dark">
          <span className="uppercase tracking-wider">Max Price</span>
          <span className="text-vedic-maroon">Up to ₹{filters.priceRange[1].toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="300"
          max="5000"
          step="100"
          value={filters.priceRange[1]}
          onChange={(e) => handlePriceChange(Number(e.target.value))}
          className="w-full accent-vedic-maroon cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-vedic-muted">
          <span>₹0</span>
          <span>₹5,000+</span>
        </div>
      </div>

      {/* Discount Filter */}
      <div className="space-y-2 pt-4 border-t border-vedic-beige">
        <h4 className="text-xs font-bold text-vedic-dark uppercase tracking-wider">
          Minimum Discount
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[0, 30, 50, 60].map((disc) => (
            <button
              key={disc}
              onClick={() => handleDiscountChange(disc)}
              className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-colors ${
                filters.minDiscount === disc
                  ? 'bg-vedic-gold text-vedic-maroon font-bold border-vedic-gold'
                  : 'bg-vedic-ivory border-vedic-gold/20 text-vedic-dark hover:border-vedic-gold'
              }`}
            >
              {disc === 0 ? 'All' : `${disc}% OFF & More`}
            </button>
          ))}
        </div>
      </div>

      {/* Lab Certified Toggle */}
      <div className="pt-4 border-t border-vedic-beige">
        <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-vedic-dark">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => onChange({ ...filters, inStockOnly: e.target.checked })}
            className="rounded text-vedic-maroon focus:ring-vedic-gold"
          />
          <span>Show In-Stock Only</span>
        </label>
      </div>
    </div>
  );
};

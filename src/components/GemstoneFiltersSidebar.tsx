import React from 'react';
import { Filter, X, RotateCcw, Check } from 'lucide-react';
import { ORIGINS_LIST, TREATMENTS_LIST, PRICE_RANGES } from '../data/gemstoneCatalogData';

export interface FilterState {
  category: string;
  priceIndex: number | null;
  gemType: string;
  origin: string;
  treatment: string;
}

interface GemstoneFiltersSidebarProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onResetFilters: () => void;
  isOpenMobile: boolean;
  onCloseMobile: () => void;
  totalResults: number;
}

const GEM_TYPES = [
  'All', 'Sapphire', 'Ruby', 'Emerald', 'Coral', 'Quartz', 'Opal', 'Tourmaline', 'Other'
];

export const GemstoneFiltersSidebar: React.FC<GemstoneFiltersSidebarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  isOpenMobile,
  onCloseMobile,
  totalResults
}) => {
  const activeCount = [
    filters.category !== 'all' ? 1 : 0,
    filters.priceIndex !== null ? 1 : 0,
    filters.gemType !== 'All' ? 1 : 0,
    filters.origin !== 'All' ? 1 : 0,
    filters.treatment !== 'All' ? 1 : 0
  ].reduce((a, b) => a + b, 0);

  const filterContent = (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-amber-800/40">
        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-amber-400" />
          <h3 className="font-serif font-bold text-amber-100 text-lg">Filters</h3>
          {activeCount > 0 && (
            <span className="bg-amber-500 text-amber-950 text-xs px-2 py-0.5 rounded-full font-bold">
              {activeCount}
            </span>
          )}
        </div>
        {activeCount > 0 && (
          <button
            onClick={onResetFilters}
            className="text-xs text-amber-400 hover:text-amber-200 flex items-center gap-1 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            Reset All
          </button>
        )}
      </div>

      {/* 1. Price Filter */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
          Price Range
        </h4>
        <div className="space-y-1.5">
          <button
            onClick={() => onFilterChange({ ...filters, priceIndex: null })}
            className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
              filters.priceIndex === null
                ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                : 'text-amber-200/80 hover:bg-amber-900/40 hover:text-amber-100'
            }`}
          >
            <span>All Prices</span>
            {filters.priceIndex === null && <Check className="w-3.5 h-3.5" />}
          </button>
          {PRICE_RANGES.map((range, index) => {
            const isSelected = filters.priceIndex === index;
            return (
              <button
                key={range.label}
                onClick={() => onFilterChange({ ...filters, priceIndex: isSelected ? null : index })}
                className={`w-full text-left px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center justify-between ${
                  isSelected
                    ? 'bg-amber-500/20 text-amber-300 font-semibold border border-amber-500/30'
                    : 'text-amber-200/80 hover:bg-amber-900/40 hover:text-amber-100'
                }`}
              >
                <span>{range.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. Gemstone Type */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
          Gemstone Type
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {GEM_TYPES.map((type) => {
            const isSelected = (filters.gemType || 'All') === type;
            return (
              <button
                key={type}
                onClick={() => onFilterChange({ ...filters, gemType: type })}
                className={`px-3 py-1 rounded-full text-xs transition-colors ${
                  isSelected
                    ? 'bg-amber-500 text-amber-950 font-bold'
                    : 'bg-amber-900/40 text-amber-200/80 hover:bg-amber-800/60 hover:text-amber-100 border border-amber-800/40'
                }`}
              >
                {type}
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. Origin */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
          Origin / Mine
        </h4>
        <select
          value={filters.origin || 'All'}
          onChange={(e) => onFilterChange({ ...filters, origin: e.target.value })}
          className="w-full bg-amber-900/40 border border-amber-700/40 rounded-lg px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
        >
          <option value="All" className="bg-amber-950 text-amber-100">All Origins</option>
          {ORIGINS_LIST.map((origin) => (
            <option key={origin} value={origin} className="bg-amber-950 text-amber-100">
              {origin}
            </option>
          ))}
        </select>
      </div>

      {/* 4. Treatment */}
      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-amber-400 mb-3">
          Treatment Status
        </h4>
        <select
          value={filters.treatment || 'All'}
          onChange={(e) => onFilterChange({ ...filters, treatment: e.target.value })}
          className="w-full bg-amber-900/40 border border-amber-700/40 rounded-lg px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400"
        >
          <option value="All" className="bg-amber-950 text-amber-100">All Treatments</option>
          {TREATMENTS_LIST.map((t) => (
            <option key={t} value={t} className="bg-amber-950 text-amber-100">
              {t}
            </option>
          ))}
        </select>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar (Left side, fixed width) */}
      <aside className="hidden lg:block w-64 flex-shrink-0 bg-amber-950/30 border border-amber-800/30 rounded-2xl p-5 self-start sticky top-32">
        {filterContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpenMobile && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={onCloseMobile}
          />
          <div className="relative ml-auto w-full max-w-xs bg-amber-950 border-l border-amber-800/60 p-6 overflow-y-auto h-full shadow-2xl flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 mb-4 border-b border-amber-800/40">
                <span className="font-serif font-bold text-amber-100 text-lg">Filters ({totalResults})</span>
                <button
                  onClick={onCloseMobile}
                  className="p-1 rounded-full text-amber-400 hover:text-amber-100 hover:bg-amber-900/50"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {filterContent}
            </div>

            <button
              onClick={onCloseMobile}
              className="mt-6 w-full py-3 bg-amber-500 text-amber-950 font-bold rounded-xl shadow-lg hover:bg-amber-400 transition-colors"
            >
              Show Results ({totalResults})
            </button>
          </div>
        </div>
      )}
    </>
  );
};

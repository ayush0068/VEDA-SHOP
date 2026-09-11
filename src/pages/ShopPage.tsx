import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { FilterSidebar } from '../components/FilterSidebar';
import { MobileFilterDrawer } from '../components/MobileFilterDrawer';
import { Breadcrumb } from '../components/Breadcrumb';
import { FilterState } from '../types/ecommerce';
import { Filter, SlidersHorizontal, Grid3x3, LayoutGrid, Sparkles } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'all';

  const [filters, setFilters] = useState<FilterState>({
    category: initialCategory as any,
    priceRange: [0, 5000],
    minDiscount: 0,
    minRating: 0,
    inStockOnly: false,
    sortBy: 'bestselling',
  });

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [gridCols, setGridCols] = useState<3 | 4>(3);

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((prod) => {
      if (filters.category && filters.category !== 'all' && prod.category !== filters.category) {
        return false;
      }
      if (prod.price > filters.priceRange[1]) {
        return false;
      }
      if (prod.discount < filters.minDiscount) {
        return false;
      }
      if (filters.inStockOnly && prod.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-low-to-high') return a.price - b.price;
      if (filters.sortBy === 'price-high-to-low') return b.price - a.price;
      if (filters.sortBy === 'discount') return b.discount - a.discount;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'bestselling') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      return 0;
    });
  }, [filters]);

  const handleResetFilters = () => {
    setFilters({
      category: 'all',
      priceRange: [0, 5000],
      minDiscount: 0,
      minRating: 0,
      inStockOnly: false,
      sortBy: 'bestselling',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Shop All Spiritual Products' }]} />

      {/* Header Banner */}
      <div className="bg-vedic-maroon text-vedic-ivory p-8 rounded-3xl border-2 border-vedic-gold shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-vedic-gold bg-black/30 px-3 py-1 rounded-full border border-vedic-gold/30">
            <Sparkles className="w-3.5 h-3.5" /> Complete Spiritual Catalog
          </span>
          <h1 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-goldLight">
            Sacred Spiritual Goods & Remedies
          </h1>
          <p className="text-xs text-gray-200 max-w-xl">
            Explore authentic Rudraksha, gemstone energy bracelets, Karungali mala, Kirtimukh door hangings, and Vastu crystals certified for authenticity.
          </p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-3xl font-extrabold text-vedic-gold font-serif block">
            {filteredProducts.length}
          </span>
          <span className="text-xs text-vedic-goldLight">Authentic Items Available</span>
        </div>
      </div>

      {/* Controls Bar: Mobile Filter Button & Desktop Layout/Sorting */}
      <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-vedic-gold/20 shadow-sm">
        <button
          onClick={() => setIsMobileFilterOpen(true)}
          className="md:hidden flex items-center gap-2 text-xs font-bold text-vedic-maroon bg-vedic-ivory px-4 py-2 rounded-xl border border-vedic-gold/30"
        >
          <Filter className="w-4 h-4 text-vedic-gold" /> Filter & Sort
        </button>

        <div className="hidden md:flex items-center gap-2">
          <span className="text-xs text-vedic-muted font-medium">Grid Layout:</span>
          <button
            onClick={() => setGridCols(3)}
            className={`p-1.5 rounded-lg border transition-colors ${
              gridCols === 3 ? 'bg-vedic-maroon text-white border-vedic-maroon' : 'bg-vedic-ivory text-vedic-muted'
            }`}
            title="3 Columns Grid"
          >
            <Grid3x3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setGridCols(4)}
            className={`p-1.5 rounded-lg border transition-colors ${
              gridCols === 4 ? 'bg-vedic-maroon text-white border-vedic-maroon' : 'bg-vedic-ivory text-vedic-muted'
            }`}
            title="4 Columns Grid"
          >
            <LayoutGrid className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-vedic-muted font-medium hidden sm:inline">Sort By:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
            className="text-xs font-semibold bg-vedic-ivory border border-vedic-gold/30 rounded-xl px-3 py-2 text-vedic-dark focus:outline-none focus:border-vedic-gold"
          >
            <option value="bestselling">Best Selling</option>
            <option value="price-low-to-high">Price: Low to High</option>
            <option value="price-high-to-low">Price: High to Low</option>
            <option value="discount">Biggest Discount %</option>
            <option value="rating">Highest Customer Rated</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Filter Sidebar Layout */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Desktop Sidebar Filter */}
        <div className="hidden md:block md:col-span-1 sticky top-28">
          <FilterSidebar
            filters={filters}
            onChange={(newFilters) => setFilters(newFilters)}
            onReset={handleResetFilters}
          />
        </div>

        {/* Product Grid Container */}
        <div className="md:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-3xl p-12 text-center border border-vedic-gold/20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-vedic-gold/10 flex items-center justify-center text-vedic-gold mx-auto">
                <SlidersHorizontal className="w-8 h-8" />
              </div>
              <h3 className="font-serif font-bold text-lg text-vedic-maroon">No Products Match Your Filter</h3>
              <p className="text-xs text-vedic-muted max-w-sm mx-auto">
                Try expanding your search criteria or resetting filters to explore all available spiritual items.
              </p>
              <button
                onClick={handleResetFilters}
                className="bg-vedic-maroon text-vedic-ivory px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroonDark transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div
              className={`grid grid-cols-2 ${
                gridCols === 3 ? 'sm:grid-cols-2 lg:grid-cols-3' : 'sm:grid-cols-3 lg:grid-cols-4'
              } gap-4 md:gap-6`}
            >
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Slide Drawer */}
      <MobileFilterDrawer
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        filters={filters}
        onChange={(newFilters) => setFilters(newFilters)}
        onReset={handleResetFilters}
      />
    </div>
  );
};

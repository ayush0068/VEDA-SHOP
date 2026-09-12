import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Filter, SlidersHorizontal, Search, RotateCcw, Gem, Sparkles, ShieldCheck } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { GemstoneHero } from '../components/GemstoneHero';
import { GemstoneWaySelector } from '../components/GemstoneWaySelector';
import { GemstonePurposeGrid } from '../components/GemstonePurposeGrid';
import { GemstoneNinePlanets } from '../components/GemstoneNinePlanets';
import { FeaturedGemstones } from '../components/FeaturedGemstones';
import { PersonalizedRecommendationStrip } from '../components/PersonalizedRecommendationStrip';
import { ExploreGemstonesByCategory } from '../components/ExploreGemstonesByCategory';
import { GemstoneCategoryNav } from '../components/GemstoneCategoryNav';
import { GemstoneZodiacStrip } from '../components/GemstoneZodiacStrip';
import { GemstoneCard } from '../components/GemstoneCard';
import { GemstoneFiltersSidebar, FilterState } from '../components/GemstoneFiltersSidebar';
import { FindMyGemstoneModal } from '../components/FindMyGemstoneModal';
import {
  GEMSTONE_CATALOG_DATA,
  GEMSTONE_CATEGORIES,
  PRICE_RANGES,
  GemstoneItem
} from '../data/gemstoneCatalogData';

export const GemstonesPage: React.FC = () => {
  const navigate = useNavigate();
  const { category: routeCategory } = useParams<{ category?: string }>();
  const [searchParams, setSearchParams] = useSearchParams();

  // State management
  const [searchQuery, setSearchQuery] = useState<string>(searchParams.get('q') || '');
  const [activeCategorySlug, setActiveCategorySlug] = useState<string>(routeCategory || 'all');
  const [sortBy, setSortBy] = useState<string>('recommended');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isFindMyGemstoneOpen, setIsFindMyGemstoneOpen] = useState<boolean>(false);

  // Sync category with route URL param if updated
  useEffect(() => {
    if (routeCategory) {
      setActiveCategorySlug(routeCategory);
    } else {
      setActiveCategorySlug('all');
    }
  }, [routeCategory]);

  // Filters State
  const [filters, setFilters] = useState<FilterState>({
    category: activeCategorySlug,
    priceIndex: null,
    gemType: 'All',
    origin: 'All',
    treatment: 'All'
  });

  // Sync filters.category when activeCategorySlug changes
  useEffect(() => {
    setFilters((prev) => ({ ...prev, category: activeCategorySlug }));
  }, [activeCategorySlug]);

  // Handle search query change
  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    if (query) {
      setSearchParams({ q: query });
    } else {
      searchParams.delete('q');
      setSearchParams(searchParams);
    }
  };

  // Handle Category selection from tabs or hero
  const handleCategorySelect = (slug: string) => {
    setActiveCategorySlug(slug);
    if (slug === 'all') {
      navigate('/gemstones');
    } else {
      navigate(`/gemstones/${slug}`);
    }
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilters({
      category: 'all',
      priceIndex: null,
      gemType: 'All',
      origin: 'All',
      treatment: 'All'
    });
    setActiveCategorySlug('all');
    navigate('/gemstones');
  };

  // Dynamic Filtering Logic
  const filteredGemstones = useMemo(() => {
    return GEMSTONE_CATALOG_DATA.filter((gem) => {
      // 1. Search Query Match (English name, alternate name, hindi/vedic name, category, description)
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase().trim();
        const nameMatch = gem.name.toLowerCase().includes(q);
        const altMatch = gem.alternateName?.toLowerCase().includes(q) || false;
        const hindiMatch = gem.hindiName?.toLowerCase().includes(q) || false;
        const catMatch = gem.category.toLowerCase().includes(q);
        const descMatch = gem.description.toLowerCase().includes(q);
        const planetMatch = gem.associatedPlanet?.toLowerCase().includes(q) || false;
        const zodiacMatch = gem.associatedZodiacSigns?.some((z) => z.toLowerCase().includes(q)) || false;

        if (!nameMatch && !altMatch && !hindiMatch && !catMatch && !descMatch && !planetMatch && !zodiacMatch) {
          return false;
        }
      }

      // 2. Category Filter
      if (activeCategorySlug !== 'all') {
        const categoryObj = GEMSTONE_CATEGORIES.find((c) => c.slug === activeCategorySlug);
        if (categoryObj) {
          if (activeCategorySlug === 'zodiac-stones' && gem.category !== 'Zodiac Stones') return false;
          if (activeCategorySlug === 'popular-vedic-gems' && gem.category !== 'Popular Vedic Gems') return false;
          if (activeCategorySlug === 'exclusive' && gem.category !== 'Exclusive Gemstones') return false;
          if (activeCategorySlug === 'other' && gem.category !== 'Other Gemstones') return false;
        }
      }

      // 3. Price Filter Range
      if (filters.priceIndex !== null) {
        const range = PRICE_RANGES[filters.priceIndex];
        if (range) {
          if (gem.startingPrice < range.min || gem.startingPrice > range.max) {
            return false;
          }
        }
      }

      // 4. Gemstone Type Filter
      if (filters.gemType && filters.gemType !== 'All') {
        if (gem.gemstoneType !== filters.gemType) {
          return false;
        }
      }

      // 5. Origin Filter
      if (filters.origin && filters.origin !== 'All') {
        if (gem.origin !== filters.origin) {
          return false;
        }
      }

      // 6. Treatment Filter
      if (filters.treatment && filters.treatment !== 'All') {
        if (filters.treatment === 'Natural (Untreated)' && !gem.treatment.includes('Natural')) return false;
        if (filters.treatment === 'Heated' && !gem.treatment.includes('Heated')) return false;
        if (filters.treatment === 'Certified Natural' && !gem.treatment.includes('Certified')) return false;
      }

      return true;
    });
  }, [searchQuery, activeCategorySlug, filters]);

  // Sorting Logic
  const sortedGemstones = useMemo(() => {
    const list = [...filteredGemstones];
    switch (sortBy) {
      case 'price-low':
        return list.sort((a, b) => a.startingPrice - b.startingPrice);
      case 'price-high':
        return list.sort((a, b) => b.startingPrice - a.startingPrice);
      case 'name-az':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-za':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      case 'popularity':
        return list.sort((a, b) => (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0));
      default:
        // Recommended default sort
        return list.sort((a, b) => (b.isExclusive ? 1 : 0) - (a.isExclusive ? 1 : 0));
    }
  }, [filteredGemstones, sortBy]);

  const activeCategoryTitle = useMemo(() => {
    const catObj = GEMSTONE_CATEGORIES.find((c) => c.slug === activeCategorySlug);
    return catObj ? catObj.name : 'All Gemstones';
  }, [activeCategorySlug]);

  return (
    <div className="bg-amber-950 text-amber-50 min-h-screen pb-16">
      {/* 1. Hero Section */}
      <GemstoneHero
        onExploreClick={() => handleCategorySelect('all')}
        onFindMyGemstoneClick={() => setIsFindMyGemstoneOpen(true)}
      />

      {/* 1b. Choose Your Way Section */}
      <GemstoneWaySelector
        onAstrologyClick={() => navigate('/rashi')}
        onPurposeClick={() => setIsFindMyGemstoneOpen(true)}
        onGemstoneClick={() => handleCategorySelect('all')}
      />

      {/* 1c. Explore Our Featured Gemstones */}
      <FeaturedGemstones
        onSelectGemstone={(slug) => navigate(`/gemstones/${slug}`)}
        onViewAllGemstones={() => navigate('/gemstones/view-all')}
      />

      {/* 1d. Shop By Purpose Section */}
      <GemstonePurposeGrid
        onSelectPurpose={(purposeSlug) => navigate(`/purpose/${purposeSlug}`)}
        onViewAllPurposes={() => navigate('/guides/gemstone')}
      />

      {/* 1e. The Nine Planets. The Nine Traditional Gemstones. */}
      <GemstoneNinePlanets
        onSelectPlanet={(planetSlug) => navigate(`/planets/${planetSlug}`)}
        onLearnMore={() => navigate('/guides/gemstone')}
        onCheckKundli={() => setIsFindMyGemstoneOpen(true)}
      />

        {/* Find My Gemstone Guided Flow Modal */}
        <FindMyGemstoneModal
          isOpen={isFindMyGemstoneOpen}
          onClose={() => setIsFindMyGemstoneOpen(false)}
        />

      {/* 1e. Explore Our Featured Gemstones */}
      {/* <FeaturedGemstones
        onSelectGemstone={(slug) => navigate(`/gemstones/${slug}`)}
        onViewAllGemstones={() => navigate('/gemstones/view-all')}
      /> */}
      
      {/* 1f. Not Sure Which Gemstone Is Right for You? — Personalized Recommendation Strip */}
      <PersonalizedRecommendationStrip
        onFindMyGemstone={() => setIsFindMyGemstoneOpen(true)}
      />

      {/* 1g. Explore Gemstones by Category */}
      <ExploreGemstonesByCategory
        onSelectCategory={(slug) => handleCategorySelect(slug)}
        onViewAllCategories={() => handleCategorySelect('all')}
      />

      {/* ================================================================
          COMMENTED OUT PER REQUEST: everything below "Explore Gemstones by
          Category" (Category Nav, Zodiac Strip, and the full Main Catalog
          Content Area — breadcrumb, control bar, sidebar filters, gemstone
          grid, empty state, and bottom category note) is temporarily
          disabled so the Footer renders directly after that section.
          Uncomment this block to restore the catalog section.

      {/ * 2. Horizontal Sticky Category Navigation * /}
      <GemstoneCategoryNav
        activeCategorySlug={activeCategorySlug}
        onSelectCategory={handleCategorySelect}
      />

      {/ * 3. Zodiac Strip Section * /}
      {activeCategorySlug === 'all' && !searchQuery && (
        <GemstoneZodiacStrip
          onSelectGemstone={(slug) => navigate(`/gemstones/${slug}`)}
          onExploreAllZodiac={() => handleCategorySelect('zodiac-stones')}
        />
      )}

      {/ * 4. Main Catalog Content Area * /}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/ * Breadcrumb * /}
        <div className="mb-6">
          <Breadcrumb
            items={[
              { label: 'Gemstones', path: '/gemstones' },
              ...(activeCategorySlug !== 'all' ? [{ label: activeCategoryTitle }] : [])
            ]}
          />
        </div>

        {/ * Catalog Control Bar * /}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 mb-6 border-b border-amber-800/40">
          <div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-amber-100 flex items-center gap-2">
              <span>{activeCategoryTitle}</span>
              <span className="text-xs font-sans font-normal text-amber-400 bg-amber-900/60 px-2.5 py-1 rounded-full border border-amber-700/40">
                {sortedGemstones.length} Gems Available
              </span>
            </h2>
            {searchQuery && (
              <p className="text-xs text-amber-300/80 mt-1">
                Showing search results for "<span className="text-amber-200 font-semibold">{searchQuery}</span>"
              </p>
            )}
          </div>

          {/ * Filter & Sort Controls * /}
          <div className="flex items-center gap-3">
            {/ * Mobile Filter Toggle * /}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden inline-flex items-center gap-2 px-4 py-2 bg-amber-900/60 border border-amber-700/50 rounded-xl text-xs font-semibold text-amber-200 hover:bg-amber-800 transition-colors"
            >
              <SlidersHorizontal className="w-4 h-4 text-amber-400" />
              <span>Filters</span>
            </button>

            {/ * Sorting Dropdown * /}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-amber-400/80 font-medium">Sort By:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-amber-900/60 border border-amber-700/50 rounded-xl px-3 py-2 text-xs text-amber-100 focus:outline-none focus:border-amber-400 font-medium"
              >
                <option value="recommended" className="bg-amber-950">Recommended</option>
                <option value="price-low" className="bg-amber-950">Price: Low to High</option>
                <option value="price-high" className="bg-amber-950">Price: High to Low</option>
                <option value="name-az" className="bg-amber-950">Name: A – Z</option>
                <option value="name-za" className="bg-amber-950">Name: Z – A</option>
                <option value="popularity" className="bg-amber-950">Popularity</option>
              </select>
            </div>
          </div>
        </div>

        {/ * Sidebar + Gemstone Grid Layout * /}
        <div className="flex gap-8">
          {/ * Left Sidebar Filter * /}
          <GemstoneFiltersSidebar
            filters={filters}
            onFilterChange={setFilters}
            onResetFilters={handleResetFilters}
            isOpenMobile={isMobileFilterOpen}
            onCloseMobile={() => setIsMobileFilterOpen(false)}
            totalResults={sortedGemstones.length}
          />

          {/ * Main Grid Area * /}
          <main className="flex-1 min-w-0">
            {sortedGemstones.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
                {sortedGemstones.map((gem) => (
                  <GemstoneCard
                    key={gem.id}
                    gem={gem}
                    onSelect={(slug) => navigate(`/gemstones/${slug}`)}
                  />
                ))}
              </div>
            ) : (
              /' Empty State '/
              <div className="text-center py-16 px-4 bg-amber-950/40 border border-amber-800/30 rounded-2xl max-w-md mx-auto my-8">
                <div className="w-16 h-16 bg-amber-900/40 rounded-full flex items-center justify-center mx-auto mb-4 text-amber-400">
                  <Search className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-serif font-bold text-amber-100 mb-2">
                  No Gemstones Found
                </h3>
                <p className="text-xs text-amber-300/80 mb-6 leading-relaxed">
                  We couldn't find any gemstones matching your search criteria or selected filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-amber-500 text-amber-950 font-bold text-xs rounded-xl hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/20"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Reset All Filters</span>
                </button>
              </div>
            )}

            {/ * Bottom Category Note * /}
            {activeCategorySlug !== 'all' && (
              <div className="mt-12 text-center pt-8 border-t border-amber-800/30">
                <button
                  onClick={() => handleCategorySelect('all')}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-amber-900/60 border border-amber-500/40 rounded-full text-amber-200 text-sm font-semibold hover:bg-amber-800 hover:text-amber-100 transition-all"
                >
                  <Gem className="w-4 h-4 text-amber-400" />
                  <span>View All Gemstones ({GEMSTONE_CATALOG_DATA.length})</span>
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
      ================================================================ */}
    </div>
  );
};
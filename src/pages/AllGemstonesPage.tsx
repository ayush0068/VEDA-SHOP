import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Gem, ChevronDown, SlidersHorizontal, X } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import {
  getAllGemstoneTiles,
  getGemstoneFilterOptions,
  buildTileGradient,
  GemstoneTile
} from '../services/gemstoneCatalogService';

type SortOption = 'name-asc' | 'name-desc';

export const AllGemstonesPage: React.FC = () => {
  const navigate = useNavigate();

  // `tiles` is populated by getAllGemstoneTiles() — today that resolves instantly from local
  // demo data, but it's already async so swapping the service's internals for a real Shopify
  // fetch later needs zero changes here; the loading/empty states below already handle it.
  const [tiles, setTiles] = useState<GemstoneTile[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [sortBy, setSortBy] = useState<SortOption>('name-asc');
  const [colorFilter, setColorFilter] = useState<string>('all');
  const [planetFilter, setPlanetFilter] = useState<string>('all');
  const [zodiacFilter, setZodiacFilter] = useState<string>('all');

  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    getAllGemstoneTiles()
      .then((data) => {
        if (isMounted) {
          setTiles(data);
          setLoadError(false);
        }
      })
      .catch(() => {
        if (isMounted) setLoadError(true);
      })
      .finally(() => {
        if (isMounted) setIsLoading(false);
      });
    return () => {
      isMounted = false;
    };
  }, []);

  const filterOptions = useMemo(() => getGemstoneFilterOptions(tiles || []), [tiles]);

  const visibleTiles = useMemo(() => {
    if (!tiles) return [];
    let result = tiles;

    if (colorFilter !== 'all') result = result.filter((t) => t.colorFamily === colorFilter);
    if (planetFilter !== 'all') result = result.filter((t) => t.planet === planetFilter);
    if (zodiacFilter !== 'all') result = result.filter((t) => t.zodiacSigns.includes(zodiacFilter));

    result = [...result].sort((a, b) =>
      sortBy === 'name-asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
    );

    return result;
  }, [tiles, sortBy, colorFilter, planetFilter, zodiacFilter]);

  const hasActiveFilters = colorFilter !== 'all' || planetFilter !== 'all' || zodiacFilter !== 'all';

  const resetFilters = () => {
    setColorFilter('all');
    setPlanetFilter('all');
    setZodiacFilter('all');
  };

  return (
    <div className="bg-vedic-ivory min-h-screen">
      {/* Banner */}
      <div className="bg-gradient-to-b from-[#FBF0E4] to-vedic-ivory border-b border-vedic-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-10 sm:pb-14 text-center">
          <Breadcrumb
            items={[{ label: 'Gemstones', path: '/gemstones' }, { label: 'All Gemstones' }]}
          />

          <div className="mt-6 flex justify-center">
            <span className="w-12 h-12 rounded-full bg-vedic-card flex items-center justify-center">
              <Gem className="w-5 h-5 text-vedic-goldDark" strokeWidth={1.5} />
            </span>
          </div>

          <p className="mt-4 text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase">
            Gemstone Collection
          </p>
          <h1 className="mt-2 font-serif font-semibold text-vedic-dark text-3xl sm:text-4xl lg:text-5xl">
            All Gemstones
          </h1>
          <p className="mt-3 text-sm sm:text-base text-vedic-muted max-w-xl mx-auto">
            Nature's finest gemstones, chosen for clarity, energy and authenticity — explore the full collection.
          </p>
        </div>
      </div>

      {/* Filter / Sort Bar */}
      <div className="border-b border-vedic-gold/15 bg-white/60 sticky top-0 z-20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-xs sm:text-sm text-vedic-muted mr-auto">
            <SlidersHorizontal className="w-3.5 h-3.5" />
            {isLoading ? 'Loading…' : `${visibleTiles.length} gemstone${visibleTiles.length === 1 ? '' : 's'}`}
          </div>

          <FilterSelect
            label="Name"
            value={sortBy}
            onChange={(v) => setSortBy(v as SortOption)}
            options={[
              { value: 'name-asc', label: 'A – Z' },
              { value: 'name-desc', label: 'Z – A' }
            ]}
          />

          <FilterSelect
            label="Color"
            value={colorFilter}
            onChange={setColorFilter}
            options={[{ value: 'all', label: 'All Colors' }, ...filterOptions.colors.map((c) => ({ value: c, label: c }))]}
          />

          <FilterSelect
            label="Planet"
            value={planetFilter}
            onChange={setPlanetFilter}
            options={[{ value: 'all', label: 'All Planets' }, ...filterOptions.planets.map((p) => ({ value: p, label: p }))]}
          />

          <FilterSelect
            label="Zodiac"
            value={zodiacFilter}
            onChange={setZodiacFilter}
            options={[
              { value: 'all', label: 'All Zodiac Signs' },
              ...filterOptions.zodiacSigns.map((z) => ({ value: z, label: z }))
            ]}
          />

          {hasActiveFilters && (
            <button
              onClick={resetFilters}
              className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-vedic-maroon hover:text-vedic-maroonDark transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {isLoading && <GemstoneTileGridSkeleton />}

        {!isLoading && loadError && (
          <div className="text-center py-20">
            <p className="text-vedic-dark font-semibold mb-1">Couldn't load gemstones right now.</p>
            <p className="text-sm text-vedic-muted">Please refresh the page to try again.</p>
          </div>
        )}

        {!isLoading && !loadError && visibleTiles.length === 0 && (
          <div className="text-center py-20">
            <p className="text-vedic-dark font-semibold mb-1">No gemstones match these filters.</p>
            <button
              onClick={resetFilters}
              className="text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors"
            >
              Clear filters
            </button>
          </div>
        )}

        {!isLoading && !loadError && visibleTiles.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {visibleTiles.map((tile) => (
              <GemstoneTileCard key={tile.id} tile={tile} onClick={() => navigate(`/gemstones/${tile.slug}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface FilterSelectProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string }[];
}

const FilterSelect: React.FC<FilterSelectProps> = ({ label, value, onChange, options }) => (
  <div className="relative">
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      aria-label={label}
      className="appearance-none bg-white border border-vedic-gold/25 hover:border-vedic-gold/50 text-vedic-dark text-xs sm:text-sm font-medium rounded-lg pl-3 pr-8 py-2 cursor-pointer focus:outline-none focus:ring-1 focus:ring-vedic-gold/50 transition-colors"
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {label}: {opt.label}
        </option>
      ))}
    </select>
    <ChevronDown className="w-3.5 h-3.5 text-vedic-muted absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
  </div>
);

const GemstoneTileCard: React.FC<{ tile: GemstoneTile; onClick: () => void }> = ({ tile, onClick }) => (
  <button
    onClick={onClick}
    className="group text-left bg-white border border-vedic-gold/15 hover:border-vedic-dark/70 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
  >
    <div
      className="aspect-square flex items-center justify-center p-4 sm:p-6"
      style={{ background: buildTileGradient(tile.themeColor) }}
    >
      <img
        src={tile.image}
        alt={tile.name}
        loading="lazy"
        className="max-w-full max-h-full object-contain mix-blend-multiply drop-shadow-lg group-hover:scale-110 transition-transform duration-500 ease-out"
        onError={(e) => {
          (e.target as HTMLImageElement).src = `https://placehold.co/400x400/FFF5DE/E9A331?text=${encodeURIComponent(
            tile.name
          )}`;
        }}
      />
    </div>
    <div className="px-3 py-4 text-center border-t border-vedic-gold/10">
      <p className="text-xs sm:text-sm font-bold uppercase tracking-wide text-vedic-dark leading-snug">
        {tile.name}
      </p>
    </div>
  </button>
);

const GemstoneTileGridSkeleton: React.FC = () => (
  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
    {Array.from({ length: 12 }).map((_, i) => (
      <div key={i} className="rounded-xl overflow-hidden border border-vedic-gold/10 animate-pulse">
        <div className="aspect-square bg-vedic-card/60" />
        <div className="px-3 py-4 border-t border-vedic-gold/10 flex justify-center">
          <div className="h-3 w-20 bg-vedic-card/60 rounded" />
        </div>
      </div>
    ))}
  </div>
);
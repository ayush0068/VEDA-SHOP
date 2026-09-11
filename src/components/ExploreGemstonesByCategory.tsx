import React from 'react';
import { ArrowRight, ChevronRight, Compass } from 'lucide-react';
import { GEMSTONE_CATALOG_DATA } from '../data/gemstoneCatalogData';

interface ExploreGemstonesByCategoryProps {
  /** Fires with the category slug (matches GEMSTONE_CATEGORIES slugs) when a card / "Explore" is clicked */
  onSelectCategory: (slug: string) => void;
  /** Fires when "View All Categories" is clicked */
  onViewAllCategories: () => void;
}

// Representative thumbnail for each category.
// "Precious Gemstones" always shows the Ruby — served locally from /public so it loads
// reliably and crops/displays consistently (no dependency on the remote catalog image).
const preciousThumb = '/images/gemstones-page/Ruby.png';
const semiPreciousThumb = '/images/gemstones-page/BlueSapphire.png';

const CATEGORY_CARDS = [
  {
    slug: 'exclusive',
    title: 'Precious Gemstones',
    subtitle: 'Ruby • Emerald • Sapphire • Diamond',
    image: preciousThumb
  },
  {
    slug: 'popular-vedic-gems',
    title: 'Semi-Precious Gemstones',
    subtitle: 'Amethyst • Citrine • Garnet • Peridot',
    image: semiPreciousThumb
  },
  {
    slug: 'zodiac-stones',
    title: 'Vedic Astrology Gemstones',
    subtitle: 'Navagraha & traditionally associated gemstones',
    image: null
  }
];

export const ExploreGemstonesByCategory: React.FC<ExploreGemstonesByCategoryProps> = ({
  onSelectCategory,
  onViewAllCategories
}) => {
  return (
    <div className="bg-vedic-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-serif font-semibold text-vedic-dark text-2xl sm:text-3xl mb-2">
              Explore Gemstones by Category
            </h2>
            <p className="text-sm text-vedic-muted">
              Find the perfect gemstone for your needs and preferences.
            </p>
          </div>
          <button
            onClick={onViewAllCategories}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors whitespace-nowrap"
          >
            View All Categories
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {CATEGORY_CARDS.map((cat) => (
            <div
              key={cat.slug}
              onClick={() => onSelectCategory(cat.slug)}
              className="group relative cursor-pointer bg-white border border-vedic-gold/15 hover:border-vedic-gold/40 rounded-2xl p-5 flex items-start gap-4 transition-colors"
            >
              <ChevronRight className="absolute top-4 right-4 w-4 h-4 text-vedic-gold/70 group-hover:text-vedic-goldDark transition-colors" />

              {/* Icon / Thumbnail — mix-blend-multiply drops the source image's own
                  white/cream background so only the gemstone itself is visible, blending
                  cleanly into the card's white background with no visible box behind it. */}
              {cat.image ? (
                <div className="w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center overflow-hidden shrink-0">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    loading="lazy"
                    className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/200x200/FFF5DE/E9A331?text=${encodeURIComponent(
                        cat.title
                      )}`;
                    }}
                  />
                </div>
              ) : (
                <div className="w-14 h-14 rounded-xl bg-vedic-gold/10 flex items-center justify-center shrink-0">
                  <Compass className="w-7 h-7 text-vedic-goldDark" strokeWidth={1.5} />
                </div>
              )}

              {/* Content */}
              <div className="min-w-0 pr-4">
                <h3 className="font-semibold text-vedic-dark text-sm sm:text-base leading-snug mb-1">
                  {cat.title}
                </h3>
                <p className="text-xs text-vedic-muted mb-2.5 leading-relaxed">
                  {cat.subtitle}
                </p>
                <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-vedic-goldDark group-hover:text-vedic-maroon transition-colors">
                  Explore
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-6 text-center sm:hidden">
          <button
            onClick={onViewAllCategories}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors"
          >
            View All Categories
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
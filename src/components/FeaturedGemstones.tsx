import React from 'react';
import { ArrowRight, Heart } from 'lucide-react';
import { GEMSTONE_CATALOG_DATA } from '../data/gemstoneCatalogData';
import { useWishlist } from '../context/WishlistContext';

interface FeaturedGemstonesProps {
  /** Fires with the gemstone slug when a card / "View Details" is clicked. Should route to /gemstones/:slug */
  onSelectGemstone: (slug: string) => void;
  /** Fires when "View All Gemstones" is clicked */
  onViewAllGemstones: () => void;
}

// The 4 curated picks shown on the homepage-style "Explore Our Featured Gemstones" strip.
// Each slug maps 1:1 to a real record in GEMSTONE_CATALOG_DATA, so every card always
// lands on a working /gemstones/:slug detail page.
const FEATURED_SLUGS = ['ruby', 'emerald', 'yellow-sapphire', 'blue-sapphire'];

// Local product images served from /public/images/gemstone-pages/<file>.png —
// same files already used by the Nine Planets section, reused here so you only
// need to keep one set of images in that folder.
const FEATURED_GEM_IMAGE: Record<string, string> = {
  ruby: '/images/gemstones-page/Ruby.png',
  emerald: '/images/gemstones-page/Emerald.png',
  'yellow-sapphire': '/images/gemstones-page/YellowSapphire.png',
  'blue-sapphire': '/images/gemstones-page/BlueSapphire.png'
};

export const FeaturedGemstones: React.FC<FeaturedGemstonesProps> = ({
  onSelectGemstone,
  onViewAllGemstones
}) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  const featuredGems = FEATURED_SLUGS.map((slug) =>
    GEMSTONE_CATALOG_DATA.find((g) => g.slug === slug)
  ).filter((g): g is NonNullable<typeof g> => !!g);

  return (
    <div className="bg-vedic-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase mb-2">
              Featured Gemstones
            </p>
            <h2 className="font-serif font-semibold text-vedic-dark text-2xl sm:text-3xl mb-2">
              Explore Our Featured Gemstones
            </h2>
            <p className="text-sm text-vedic-muted">
              Premium quality, certified and carefully selected for your journey.
            </p>
          </div>
          <button
            onClick={onViewAllGemstones}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors whitespace-nowrap"
          >
            View All Gemstones
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Featured Gemstone Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {featuredGems.map((gem) => {
            const wishlistProductPayload = {
              id: gem.id,
              title: gem.name,
              subtitle: gem.hindiName || gem.category,
              price: gem.startingPrice,
              originalPrice: Math.round(gem.startingPrice * 1.25),
              rating: 4.9,
              reviewsCount: 42,
              images: [FEATURED_GEM_IMAGE[gem.slug] || gem.image, ...gem.gallery],
              category: gem.category,
              isBestSeller: !!gem.isPopular,
              isNew: !!gem.isExclusive,
              inStock: true,
              sku: `GEM-${gem.id.toUpperCase()}`,
              description: gem.description,
              benefits: gem.benefits,
              tags: [gem.category, gem.gemstoneType, gem.origin]
            };

            const isLiked = isInWishlist(gem.id);
            const isNaturalTreatment = gem.treatment.toLowerCase().includes('natural');
            const isCertified = gem.certification.toLowerCase().includes('certified');
            const displayCarat = gem.availableWeights[0]?.carat;

            return (
              <div
                key={gem.id}
                onClick={() => onSelectGemstone(gem.slug)}
                className="group cursor-pointer bg-white border border-vedic-gold/15 hover:border-vedic-gold/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover flex flex-col"
              >
                {/* Image — mix-blend-multiply drops the photo's own white/off-white background so
                    only the gem itself sits on the tile; bg is a soft, low-saturation cream (not
                    the stronger vedic-card gold) so it reads subtle behind the stone. */}
                <div className="relative aspect-square bg-[#FBF6EE] p-6 flex items-center justify-center overflow-hidden">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleWishlist(wishlistProductPayload as any);
                    }}
                    aria-label={`Add ${gem.name} to Wishlist`}
                    className="absolute top-3 right-3 z-10 text-vedic-muted/70 hover:text-vedic-maroon transition-colors"
                  >
                    <Heart className={`w-4 h-4 ${isLiked ? 'fill-vedic-maroon text-vedic-maroon' : ''}`} />
                  </button>

                  <img
                    src={FEATURED_GEM_IMAGE[gem.slug] || gem.image}
                    alt={gem.name}
                    loading="lazy"
                    className="w-full h-full object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-500 ease-out"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/400x400/FFF5DE/E9A331?text=${encodeURIComponent(
                        gem.name
                      )}`;
                    }}
                  />
                </div>

                {/* Content */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <h3 className="font-serif font-semibold text-vedic-dark text-base sm:text-lg leading-tight">
                    {gem.name}
                  </h3>
                  <p className="text-xs text-vedic-muted mb-2.5">
                    {(gem.hindiName?.split(' ')[0] || gem.category)} • {gem.associatedPlanet?.split(' ')[0] || gem.gemstoneType}
                  </p>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-1.5 mb-3">
                    {isNaturalTreatment && (
                      <span className="text-[10px] font-semibold text-vedic-charcoal border border-vedic-dark/15 rounded px-2 py-0.5">
                        Natural
                      </span>
                    )}
                    {isCertified && (
                      <span className="text-[10px] font-semibold text-vedic-charcoal border border-vedic-dark/15 rounded px-2 py-0.5">
                        Certified
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-vedic-muted mb-3">
                    {displayCarat ? `${displayCarat} ct` : gem.hardness} <span className="mx-1 text-vedic-gold/60">•</span> {gem.origin}
                  </p>

                  <div className="mt-auto pt-2">
                    <p className="text-base sm:text-lg font-bold text-vedic-dark mb-1.5">
                      ₹{gem.startingPrice.toLocaleString('en-IN')}
                    </p>
                    <button
                      onClick={() => onSelectGemstone(gem.slug)}
                      className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-vedic-goldDark group-hover:text-vedic-maroon transition-colors"
                    >
                      View Details
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-6 text-center sm:hidden">
          <button
            onClick={onViewAllGemstones}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors"
          >
            View All Gemstones
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
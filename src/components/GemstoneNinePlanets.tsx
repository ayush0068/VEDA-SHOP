import React from 'react';
import { ArrowRight, Heart, Settings2 } from 'lucide-react';
import { PLANET_LIST } from '../data/gemstoneData';

// Local gem icon per planet — served from /public/images/gemstone-pages/<file>.png
// Drop each PNG (transparent background, any resolution — it auto-fits the card)
// into that folder using the exact filename listed below.
const PLANET_GEM_ICON: Record<string, string> = {
  sun: '/images/gemstones-page/Ruby.png',
  moon: '/images/gemstones-page/Pearl.png',
  mars: '/images/gemstones-page/RedCoral.png',
  mercury: '/images/gemstones-page/Emerald.png',
  jupiter: '/images/gemstones-page/YellowSapphire.png',
  venus: '/images/gemstones-page/Diamond.png',
  saturn: '/images/gemstones-page/BlueSapphire.png',
  rahu: '/images/gemstones-page/Hessonite.png',
  ketu: '/images/gemstones-page/CatsEye.png'
};

interface GemstoneNinePlanetsProps {
  /** Fires with the planet slug (e.g. 'sun') when a card / its Explore link is clicked. Should route to /planets/:planetSlug */
  onSelectPlanet: (planetSlug: string) => void;
  /** Fires when the "Learn More" link (top-right) is clicked */
  onLearnMore: () => void;
  /** Fires when "Check With Your Kundli" is clicked — intended to open the Find-My-Gemstone / Kundli modal */
  onCheckKundli: () => void;
}

export const GemstoneNinePlanets: React.FC<GemstoneNinePlanetsProps> = ({
  onSelectPlanet,
  onLearnMore,
  onCheckKundli
}) => {
  // Track a purely local "saved" state per card — decorative only, does not touch
  // the global WishlistContext (which is scoped to purchasable gemstone products).
  const [savedPlanets, setSavedPlanets] = React.useState<Record<string, boolean>>({});

  const toggleSaved = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedPlanets((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FBF4E7] via-[#F8EFDD] to-[#F5EAD6] border-y border-vedic-gold/15 py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="relative text-center mb-8 sm:mb-10">
          <button
            onClick={onLearnMore}
            className="hidden sm:inline-flex absolute right-0 top-1 items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors whitespace-nowrap"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5" />
          </button>

          <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase mb-2">
            The Nine Planets
          </p>
          <h2 className="font-serif font-semibold text-vedic-dark text-2xl sm:text-3xl mb-2">
            The Nine Planets. The Nine Traditional Gemstones.
          </h2>
          <p className="text-sm text-vedic-muted max-w-2xl mx-auto leading-relaxed">
            In Vedic astrology, certain gemstones are traditionally associated with the Navagraha.
            Explore their symbolism, qualities and traditional associations.
          </p>

          {/* Mobile "Learn More" link */}
          <button
            onClick={onLearnMore}
            className="sm:hidden inline-flex items-center gap-1.5 mt-3 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 9 Navagraha Planet Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {PLANET_LIST.map((planet) => {
            const iconSrc = PLANET_GEM_ICON[planet.id];
            const isSaved = !!savedPlanets[planet.id];

            return (
              <div
                key={planet.id}
                role="button"
                tabIndex={0}
                onClick={() => onSelectPlanet(planet.slug)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') onSelectPlanet(planet.slug);
                }}
                className="group relative cursor-pointer bg-white hover:bg-[#FFFDF9] border border-vedic-gold/15 hover:border-vedic-gold/40 rounded-2xl p-2 sm:p-2.5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover flex flex-col items-center aspect-square justify-center"
              >
                {/* Top-left planetary symbol badge */}
                {/* <span className="absolute top-2.5 left-2.5 w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-vedic-gold/25 bg-vedic-card/40 flex items-center justify-center text-[11px] leading-none">
                  {planet.symbol}
                </span> */}

                {/* Top-right save / wishlist icon (decorative) */}
                <button
                  onClick={(e) => toggleSaved(e, planet.id)}
                  aria-label={`Save ${planet.planetName}`}
                  className="absolute top-2.5 right-2.5 text-vedic-muted/70 hover:text-vedic-maroon transition-colors"
                >
                  <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isSaved ? 'fill-vedic-maroon text-vedic-maroon' : ''}`} />
                </button>

                {/* Gemstone Image — auto-fits any source size/aspect via object-contain.
                    mix-blend-multiply drops the image's own white/light background so only
                    the gem itself is visible on the card (works best with a plain white-bg photo;
                    for a perfectly clean look, use a transparent-background PNG cutout instead). */}
                <div className="w-14 h-14 sm:w-20 sm:h-20 md:w-20 md:h-20 lg:w-16 lg:h-16 mt-2 mb-1 flex items-center justify-center flex-shrink-0">
                  <img
                    src={iconSrc}
                    alt={planet.primaryGemstone}
                    loading="lazy"
                    className="max-w-full max-h-full w-auto h-auto object-contain mix-blend-multiply group-hover:scale-110 transition-transform duration-300"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = `https://placehold.co/200x200/FFF5DE/E9A331?text=${encodeURIComponent(
                        planet.primaryGemstone
                      )}`;
                    }}
                  />
                </div>

                {/* Planet & Gemstone Name */}
                <h3 className="text-xs sm:text-sm font-semibold text-vedic-dark leading-tight line-clamp-1">
                  {planet.planetName.split(' ')[0]}
                </h3>
                <p className="text-[10px] sm:text-[11px] text-vedic-muted leading-tight line-clamp-1">
                  {planet.primaryGemstone.split(' / ')[0].split(' (')[0]}
                </p>

                <span className="text-vedic-gold/50 text-xs my-0.5 leading-none">—</span>

                <span className="inline-flex items-center gap-1 text-[10px] sm:text-[11px] font-semibold text-vedic-goldDark group-hover:text-vedic-maroon transition-colors">
                  Explore
                  <ArrowRight className="w-3 h-3" />
                </span>
              </div>
            );
          })}
        </div>

        {/* Bottom Kundli Notice Bar — a compact, centered block (narrower than the card grid) */}
        <div className="mt-6 sm:mt-8 max-w-xl sm:max-w-2xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 bg-white/70 border border-vedic-gold/25 rounded-xl px-4 py-2.5 sm:px-5 sm:py-3">
          <div className="flex items-center gap-2.5 text-center sm:text-left">
            <div className="w-7 h-7 rounded-full bg-vedic-card flex items-center justify-center flex-shrink-0">
              <Settings2 className="w-3.5 h-3.5 text-vedic-goldDark" strokeWidth={1.75} />
            </div>
            <p className="text-xs text-vedic-charcoal">
              Gemstone suitability can vary from one birth chart to another.
            </p>
          </div>
          <button
            onClick={onCheckKundli}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-vedic-gold text-vedic-dark font-bold text-xs hover:bg-vedic-primary transition-colors shadow-gold whitespace-nowrap"
          >
            Check With Your Kundli
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </section>
  );
};
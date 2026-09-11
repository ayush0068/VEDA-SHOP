import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
import { GEMSTONE_CATALOG_DATA } from '../data/gemstoneCatalogData';

interface GemstoneZodiacStripProps {
  onSelectGemstone: (slug: string) => void;
  onExploreAllZodiac: () => void;
}

export const GemstoneZodiacStrip: React.FC<GemstoneZodiacStripProps> = ({
  onSelectGemstone,
  onExploreAllZodiac
}) => {
  // Extract 9 major Rashi Ratnas
  const zodiacGems = GEMSTONE_CATALOG_DATA.filter((g) => g.isZodiac).slice(0, 9);

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 border-y border-amber-500/20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Vedic Astrology Essentials</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
              Navratna & Zodiac Stones (Rashi Ratna)
            </h2>
            <p className="text-amber-300/80 text-sm mt-1">
              Find the sacred gemstone traditionally associated with your celestial Rashi & ruling planet
            </p>
          </div>
          <button
            onClick={onExploreAllZodiac}
            className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold text-sm transition-colors group self-start md:self-auto"
          >
            <span>Explore All Zodiac Stones</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* 9 Rashi Ratnas Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-3 sm:gap-4">
          {zodiacGems.map((gem) => (
            <div
              key={gem.id}
              onClick={() => onSelectGemstone(gem.slug)}
              className="group cursor-pointer bg-amber-900/40 border border-amber-500/20 hover:border-amber-400/60 rounded-xl p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-500/10 flex flex-col items-center justify-between"
            >
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden bg-amber-950/50 mb-2 p-1.5 flex items-center justify-center">
                <img
                  src={gem.image}
                  alt={gem.name}
                  className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://placehold.co/200x200/1F2937/F59E0B?text=${encodeURIComponent(gem.name)}`;
                  }}
                />
              </div>
              <h3 className="text-xs sm:text-sm font-semibold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
                {gem.name}
              </h3>
              {gem.hindiName && (
                <span className="text-[11px] text-amber-400/80 font-serif line-clamp-1">
                  {gem.hindiName.split(' ')[0]}
                </span>
              )}
              <span className="text-[10px] text-amber-300/60 mt-1 block">
                {gem.associatedPlanet?.split(' ')[0] || 'Vedic Gem'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

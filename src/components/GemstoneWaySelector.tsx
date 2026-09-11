import React from 'react';
import { ArrowRight, Compass, Flower2, Gem } from 'lucide-react';

interface GemstoneWaySelectorProps {
  onAstrologyClick: () => void;
  onPurposeClick: () => void;
  onGemstoneClick: () => void;
}

export const GemstoneWaySelector: React.FC<GemstoneWaySelectorProps> = ({
  onAstrologyClick,
  onPurposeClick,
  onGemstoneClick
}) => {
  const ways = [
    {
      icon: Compass,
      title: 'By Astrology',
      description: 'Explore gemstones traditionally associated with planets and your Kundli.',
      cta: 'Explore Astrology Gemstones',
      onClick: onAstrologyClick
    },
    {
      icon: Flower2,
      title: 'By Purpose',
      description: 'Start with what matters to you — career, love, peace, prosperity and more.',
      cta: 'Explore by Purpose',
      onClick: onPurposeClick
    },
    {
      icon: Gem,
      title: 'By Gemstone',
      description: 'Already know what you want? Choose from our premium collection.',
      cta: 'Explore Gemstones',
      onClick: onGemstoneClick
    }
  ];

  return (
    <div className="bg-vedic-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase mb-2">
              Your Way
            </p>
            <h2 className="font-serif font-semibold text-vedic-dark text-2xl sm:text-3xl mb-2">
              Choose Your Way
            </h2>
            <p className="text-sm text-vedic-muted">
              Different paths. The same goal — the right gemstone for you.
            </p>
          </div>
          <button
            onClick={onGemstoneClick}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors whitespace-nowrap"
          >
            Learn More
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Way Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 sm:gap-6">
          {ways.map((way) => {
            const Icon = way.icon;
            return (
              <button
                key={way.title}
                onClick={way.onClick}
                className="text-left bg-[#FBF6EC] hover:bg-white border border-vedic-gold/15 hover:border-vedic-gold/40 rounded-2xl p-6 flex items-start gap-4 transition-all hover:shadow-card-hover"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-vedic-card flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-vedic-goldDark" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-serif font-semibold text-vedic-dark text-base sm:text-lg mb-1.5">
                    {way.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-vedic-muted leading-relaxed mb-3">
                    {way.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-vedic-goldDark">
                    {way.cta}
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
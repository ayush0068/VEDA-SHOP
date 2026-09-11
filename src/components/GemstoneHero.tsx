import React from 'react';
import { ArrowRight, Compass, Gem, ClipboardCheck, PenLine, Sparkle } from 'lucide-react';

interface GemstoneHeroProps {
  onExploreClick: () => void;
  onFindMyGemstoneClick: () => void;
}

const TRUST_FEATURES = [
  {
    icon: Gem,
    title: 'Natural & Carefully Selected',
    subtitle: 'Quality-focused selection'
  },
  {
    icon: ClipboardCheck,
    title: 'Certification Available',
    subtitle: 'Lab report details where applicable'
  },
  {
    icon: PenLine,
    title: 'Transparent Specifications',
    subtitle: 'Carat • Origin • Treatment • Colour'
  },
  {
    icon: Sparkle,
    title: 'Vedic Guidance',
    subtitle: 'Traditional astrology-based guidance'
  }
];

export const GemstoneHero: React.FC<GemstoneHeroProps> = ({
  onExploreClick,
  onFindMyGemstoneClick
}) => {
  return (
    <div className="bg-vedic-ivory">
      {/* Hero — single full-bleed banner photo with copy overlaid on its softly-lit left side */}
      <div className="relative overflow-hidden min-h-[420px] sm:min-h-[440px] lg:min-h-[480px] flex items-center">
        {/* Full-width background photo (fades to cream on the left for text legibility).
            On mobile the frame is much narrower/taller than the wide source photo, so
            "object-right" alone crops in tight on the gem cluster with no cream fade
            behind the text — object position is shifted left on mobile only (sm: restores
            the original desktop crop untouched) and paired with a mobile-only gradient
            scrim below for reliable text contrast. */}
        <img
          src="/images/gemstones-page/hero-banner-bg.png"
          alt="Blue sapphire, ruby, diamond and yellow sapphire gemstones resting on natural stone"
          className="absolute inset-0 w-full h-full object-cover object-[68%_center] sm:object-right"
        />

        {/* Mobile-only scrim: recreates the left-side cream fade that the desktop crop
            already shows naturally, so heading/paragraph/buttons stay legible over the
            gemstones. Hidden from sm breakpoint up — desktop is untouched. */}
        <div className="absolute inset-0 bg-gradient-to-r from-vedic-ivory via-vedic-ivory/90 to-vedic-ivory/25 sm:hidden" />

        {/* Copy, sitting on top of the photo's faded left side */}
        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-lg">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase mb-4">
              Vedic Gemstones <span className="text-vedic-gold mx-1">•</span> Natural Beauty{' '}
              <span className="text-vedic-gold mx-1">•</span> Thoughtful Selection
            </p>

            <h1 className="font-serif font-semibold text-vedic-dark text-[2.5rem] sm:text-5xl lg:text-[3.25rem] leading-[1.1] tracking-tight mb-5">
              Find the Gemstone
              <br />
              That Fits Your Journey
            </h1>

            <p className="text-sm sm:text-base text-vedic-muted leading-relaxed max-w-md mb-8">
              Explore carefully selected gemstones with transparent specifications,
              certification details and traditional Vedic guidance.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={onExploreClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-vedic-gold text-vedic-dark font-bold text-sm hover:bg-vedic-primary transition-colors shadow-gold"
              >
                Explore Gemstones
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onFindMyGemstoneClick}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-vedic-dark/15 bg-white/70 backdrop-blur-sm text-vedic-dark font-semibold text-sm hover:border-vedic-gold hover:bg-white transition-colors"
              >
                <Compass className="w-4 h-4 text-vedic-goldDark" />
                Find My Gemstone
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Trust / Feature Strip */}
      <div className="border-t border-vedic-gold/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
            {TRUST_FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-vedic-card flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-vedic-goldDark" strokeWidth={1.75} />
                  </div>
                  <div>
                    <h3 className="text-xs sm:text-sm font-semibold text-vedic-dark leading-tight">
                      {feature.title}
                    </h3>
                    <p className="text-[11px] sm:text-xs text-vedic-muted mt-0.5 leading-snug">
                      {feature.subtitle}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
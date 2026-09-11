import React from 'react';
import {
  ArrowRight,
  Briefcase,
  Coins,
  Heart,
  BookOpen,
  Leaf,
  Shield,
  Flame,
  Compass,
  ChevronDown
} from 'lucide-react';

interface GemstonePurposeGridProps {
  /** Fires with the matched purpose slug (from purposeData.ts) when a card / its Explore link is clicked */
  onSelectPurpose: (purposeSlug: string) => void;
  /** Fires when "View All Purposes" is clicked */
  onViewAllPurposes: () => void;
}

// Each entry maps 1:1 to a real record in `PURPOSE_LIST` (src/data/purposeData.ts)
// via `purposeSlug`, so clicking through always lands on a working /purpose/:purposeId page.
const PURPOSE_SHORTCUTS = [
  { icon: Briefcase, label: 'Career & Growth', purposeSlug: 'career' },
  { icon: Coins, label: 'Prosperity & Success', purposeSlug: 'wealth' },
  { icon: Heart, label: 'Love & Relationships', purposeSlug: 'marriage' },
  { icon: BookOpen, label: 'Focus & Learning', purposeSlug: 'spiritual-growth' },
  { icon: Leaf, label: 'Peace & Balance', purposeSlug: 'peace' },
  { icon: Shield, label: 'Protection & Grounding', purposeSlug: 'protection' },
  { icon: Flame, label: 'Confidence & Energy', purposeSlug: 'meditation' },
  { icon: Compass, label: 'Vedic Astrology', purposeSlug: 'planetary-balance' }
];

export const GemstonePurposeGrid: React.FC<GemstonePurposeGridProps> = ({
  onSelectPurpose,
  onViewAllPurposes
}) => {
  return (
    <div className="bg-vedic-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {/* Section Header */}
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase mb-2">
              Shop By Purpose
            </p>
            <h2 className="font-serif font-semibold text-vedic-dark text-2xl sm:text-3xl mb-2">
              What Are You Looking For?
            </h2>
            <p className="text-sm text-vedic-muted">
              Discover gemstones traditionally associated with your goals and intentions.
            </p>
          </div>
          <button
            onClick={onViewAllPurposes}
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors whitespace-nowrap"
          >
            View All Purposes
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Purpose Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {PURPOSE_SHORTCUTS.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                onClick={() => onSelectPurpose(item.purposeSlug)}
                className="bg-white hover:bg-[#FBF6EC] border border-vedic-gold/15 hover:border-vedic-gold/40 rounded-2xl px-3 py-5 flex flex-col items-center text-center transition-all hover:shadow-card-hover"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-vedic-card flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-vedic-goldDark" strokeWidth={1.5} />
                </div>
                <h3 className="text-xs sm:text-sm font-semibold text-vedic-dark leading-snug mb-1">
                  {item.label}
                </h3>
                <ChevronDown className="w-3 h-3 text-vedic-gold/70 mb-1.5" />
                <span className="inline-flex items-center gap-1 text-[11px] sm:text-xs font-semibold text-vedic-goldDark">
                  Explore
                  <ArrowRight className="w-3 h-3" />
                </span>
              </button>
            );
          })}
        </div>

        {/* Mobile "View All" link */}
        <div className="mt-6 text-center sm:hidden">
          <button
            onClick={onViewAllPurposes}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors"
          >
            View All Purposes
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
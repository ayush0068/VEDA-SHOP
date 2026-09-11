import React from 'react';
import { Link } from 'react-router-dom';
import { RASHI_LIST } from '../data/rashiData';
import { Breadcrumb } from '../components/Breadcrumb';
import { Compass, Sparkles, ArrowRight } from 'lucide-react';

export const RashiGuidePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Shop By Rashi Directory' }]} />

      <div className="bg-vedic-maroon text-vedic-ivory p-8 rounded-3xl border-2 border-vedic-gold shadow-xl text-center max-w-3xl mx-auto space-y-3">
        <Compass className="w-10 h-10 text-vedic-gold mx-auto" />
        <h1 className="font-serif font-extrabold text-3xl md:text-4xl text-vedic-goldLight">
          Vedic Astrology Rashi Guide
        </h1>
        <p className="text-xs text-gray-200 leading-relaxed font-light">
          Align your life frequency with natural gemstone energy tailored specifically to your astrological birth sun & moon sign.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {RASHI_LIST.map((rashi) => (
          <div
            key={rashi.id}
            className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-4xl font-serif text-vedic-gold">{rashi.symbol}</span>
                <span className="text-xs font-bold bg-vedic-ivory text-vedic-maroon px-3 py-1 rounded-full border border-vedic-gold/30">
                  {rashi.element} Element
                </span>
              </div>

              <h3 className="font-serif font-extrabold text-xl text-vedic-maroon">
                {rashi.nameHi} <span className="text-xs font-sans text-vedic-muted">({rashi.nameEn})</span>
              </h3>

              <p className="text-xs font-semibold text-vedic-goldDark mt-1">
                Ruling Planet: {rashi.rulingPlanet}
              </p>

              <p className="text-xs text-vedic-muted mt-2 leading-relaxed">
                {rashi.description}
              </p>

              <div className="mt-4 p-3 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 text-xs">
                <span className="font-bold text-vedic-dark block">Recommended Crystal Stones:</span>
                <span className="text-vedic-maroon font-semibold">{rashi.recommendedGemstone}</span>
              </div>
            </div>

            <div className="mt-6 pt-3 border-t border-vedic-beige">
              <Link
                to={`/rashi/${rashi.nameEn.toLowerCase()}`}
                className="w-full bg-vedic-maroon text-vedic-ivory py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroonDark transition-colors flex items-center justify-center gap-1.5"
              >
                View {rashi.nameEn} Products <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

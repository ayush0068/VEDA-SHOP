import React from 'react';
import { Link } from 'react-router-dom';
import { RUDRAKSHA_MUKHI_LIST } from '../data/rudrakshaData';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from 'lucide-react';

export const RudrakshaGuidePage: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      <Breadcrumb items={[{ label: 'Know Your Rudraksha Guide' }]} />

      {/* Hero Header */}
      <div className="bg-vedic-maroon text-vedic-ivory p-8 md:p-12 rounded-3xl border-2 border-vedic-gold shadow-2xl text-center max-w-4xl mx-auto space-y-4">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-vedic-gold bg-black/40 px-3.5 py-1 rounded-full border border-vedic-gold/40">
          <Sparkles className="w-3.5 h-3.5 text-vedic-gold" /> Divine Himalayan Wisdom
        </span>

        <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
          The Complete Rudraksha Knowledge Guide
        </h1>

        <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-light max-w-2xl mx-auto">
          Learn about ruling deities, planetary alignment (Graha), Beeja mantras, and spiritual benefits of 1 Mukhi to 14 Mukhi original Nepalese Rudraksha beads.
        </p>
      </div>

      {/* Authenticity Testing Guide Box */}
      <div className="bg-white rounded-3xl p-6 md:p-8 border border-vedic-gold/30 shadow-card grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-3">
          <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-600" /> Lab Certified Authenticity Protocol
          </span>
          <h2 className="font-serif font-bold text-xl text-vedic-maroon">
            How Are Veda Structure Rudraksha Tested?
          </h2>
          <p className="text-xs text-vedic-muted leading-relaxed">
            Every Rudraksha bead undergo X-Ray inspection to verify complete internal compartment walls (Mukhi chambers). Unreliable folklore tests like water floating or copper coin spinning are avoided in favor of scientific lab certification.
          </p>
        </div>
        <div className="text-center md:text-right">
          <Link
            to="/authenticity"
            className="inline-block bg-vedic-goldDark text-white px-6 py-3 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroon transition-colors"
          >
            Learn About Lab Certificates →
          </Link>
        </div>
      </div>

      {/* Mukhi Directory Cards */}
      <div className="space-y-6">
        <h2 className="font-serif font-extrabold text-2xl text-vedic-maroon text-center">
          Explore Mukhi Classifications
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {RUDRAKSHA_MUKHI_LIST.map((rud) => (
            <div
              key={rud.mukhi}
              className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-card flex flex-col justify-between hover:shadow-card-hover transition-all"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-serif font-extrabold text-lg text-vedic-maroon">
                    {rud.mukhi}
                  </span>
                  <span className="text-[10px] font-bold bg-vedic-ivory text-vedic-goldDark px-2.5 py-1 rounded-full border border-vedic-gold/30">
                    Planet: {rud.rulingPlanet}
                  </span>
                </div>

                <div className="text-xs font-semibold text-vedic-dark">
                  Ruling Deity: <span className="text-vedic-maroon font-bold">{rud.rulingGod}</span>
                </div>

                <div className="p-2.5 bg-vedic-beige/60 rounded-xl text-xs font-mono font-bold text-vedic-maroon text-center border border-vedic-gold/20">
                  Mantra: {rud.beejaMantra}
                </div>

                <p className="text-xs text-vedic-muted leading-relaxed">
                  {rud.description}
                </p>

                <div className="space-y-1">
                  <span className="text-[11px] font-bold text-vedic-dark uppercase tracking-wider block">
                    Key Spiritual Benefits:
                  </span>
                  <ul className="space-y-1 text-xs text-vedic-charcoal">
                    {rud.benefits.map((b, i) => (
                      <li key={i} className="flex items-start gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-vedic-gold shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-3 border-t border-vedic-beige">
                <Link
                  to="/collections/rudraksha"
                  className="w-full bg-vedic-maroon text-vedic-ivory py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroonDark transition-colors flex items-center justify-center gap-1.5"
                >
                  Shop {rud.mukhi} Rudraksha <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

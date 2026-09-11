import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Sparkles, ShieldCheck, Phone, Gem, CheckCircle2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export const GemstoneGuidePage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'Guides' }, { label: 'Gemstone Guide' }]} />
      </div>

      <section className="bg-vedic-brown text-vedic-ivory py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Gem className="w-3.5 h-3.5" /> Authentic Vedic Science
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            Vedic Gemstone Selection Guide
          </h1>
          <p className="text-xs md:text-sm text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
            Learn how natural untreated gemstones harness planetary rays, balance your Kundli chakras, and transform personal energy.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-vedic-gold/30 shadow-card space-y-4">
          <h2 className="font-serif font-bold text-2xl text-vedic-maroon">
            Key Principles of Wearing Astrological Gemstones
          </h2>
          <div className="space-y-3 text-xs md:text-sm text-vedic-charcoal leading-relaxed">
            <p>
              1. <strong>Natural & Untreated:</strong> Glass-filled or synthetic gems have no astrological potency. All Veda Store gemstones are 100% natural and unheated.
            </p>
            <p>
              2. <strong>Prana Pratishtha Energization:</strong> Gemstones must be cleansed in Gangajal and energized with specific Vedic planetary mantras prior to wearing.
            </p>
            <p>
              3. <strong>Metal & Finger Selection:</strong> Ruby is worn on ring finger in Gold/Copper; Emerald on little finger in Silver/Gold; Blue Sapphire on middle finger in Panchdhatu/Iron.
            </p>
          </div>

          <div className="pt-4 border-t border-vedic-beige text-center">
            <Link
              to="/contact?subject=Gemstone%20Consultation"
              className="bg-gold-gradient text-vedic-dark font-serif font-bold text-xs px-6 py-3 rounded-full shadow hover:scale-105 transition-transform inline-flex items-center gap-2"
            >
              <Phone className="w-4 h-4" /> Book Complete Kundli Gemstone Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

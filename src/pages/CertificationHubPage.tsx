import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, FileText, CheckCircle2, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CertificationHubPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'Certification Hub' }]} />
      </div>

      <section className="bg-vedic-brown text-vedic-ivory py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <ShieldCheck className="w-3.5 h-3.5" /> 100% Laboratory Verified
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            Gemstone Certification & Transparency Hub
          </h1>
          <p className="text-xs md:text-sm text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Understand how accredited laboratories test species, carat weight, origins, and treatment disclosures for Veda Store gemstones.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-vedic-gold/30 shadow-card space-y-4">
          <h2 className="font-serif font-bold text-2xl text-vedic-maroon">
            Why Gemstone Certification Matters
          </h2>
          <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed">
            Synthetic lab-grown glass or chemically treated stones have zero astrological potency. An official lab report guarantees that your gemstone is natural, unheated (or transparently disclosed), and mined from earth.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-1">
              <h3 className="font-serif font-bold text-sm text-vedic-brown flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Species & Mineral Identification
              </h3>
              <p className="text-xs text-vedic-muted">Confirms Natural Corundum (Sapphire/Ruby), Beryl (Emerald), or Chrysoberyl.</p>
            </div>
            <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-1">
              <h3 className="font-serif font-bold text-sm text-vedic-brown flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" /> Treatment Disclosure
              </h3>
              <p className="text-xs text-vedic-muted">Explicitly certifies "No Indications of Heating" or discloses heat treatment.</p>
            </div>
          </div>

          <div className="pt-4 text-center">
            <Link
              to="/gemstones"
              className="bg-vedic-gold text-vedic-dark font-serif font-bold text-xs px-6 py-3 rounded-full shadow hover:bg-vedic-goldDark transition-all inline-block"
            >
              Explore Certified Gemstones →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ShieldCheck, Sparkles, CheckCircle2, FileText } from 'lucide-react';

export const AuthenticityPage: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Authenticity & Lab Certification' }]} />

      <div className="bg-vedic-maroon text-vedic-ivory p-8 rounded-3xl border-2 border-vedic-gold shadow-2xl text-center space-y-3">
        <ShieldCheck className="w-12 h-12 text-vedic-gold mx-auto" />
        <h1 className="font-serif font-extrabold text-3xl md:text-4xl text-vedic-goldLight">
          Authenticity & Lab Certification Standards
        </h1>
        <p className="text-xs text-gray-200 max-w-xl mx-auto">
          Every Rudraksha bead and natural crystal at Veda Structure is scientifically tested and accompanied by an official government-approved lab report.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-vedic-gold/20 shadow-card space-y-6 text-xs text-vedic-charcoal leading-relaxed">
        <h2 className="font-serif font-bold text-xl text-vedic-maroon">
          Our 4-Step Verification Process
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-2">
            <span className="w-6 h-6 rounded-full bg-vedic-maroon text-white font-bold text-xs flex items-center justify-center">1</span>
            <h3 className="font-serif font-bold text-sm text-vedic-dark">Direct Himalayan Sourcing</h3>
            <p className="text-vedic-muted text-[11px]">Sourced directly from verified growers in Nepal (Pashupatinath region) and Indonesia.</p>
          </div>

          <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-2">
            <span className="w-6 h-6 rounded-full bg-vedic-maroon text-white font-bold text-xs flex items-center justify-center">2</span>
            <h3 className="font-serif font-bold text-sm text-vedic-dark">X-Ray Lab Testing</h3>
            <p className="text-vedic-muted text-[11px]">High-resolution X-Ray scanning verifies internal seed chambers and natural mukhi contours.</p>
          </div>

          <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-2">
            <span className="w-6 h-6 rounded-full bg-vedic-maroon text-white font-bold text-xs flex items-center justify-center">3</span>
            <h3 className="font-serif font-bold text-sm text-vedic-dark">Prana Pratishtha Consecration</h3>
            <p className="text-vedic-muted text-[11px]">Traditional Vedic consecration rituals performed with holy water and sacred Beeja mantras.</p>
          </div>

          <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-2">
            <span className="w-6 h-6 rounded-full bg-vedic-maroon text-white font-bold text-xs flex items-center justify-center">4</span>
            <h3 className="font-serif font-bold text-sm text-vedic-dark">Sealed Tamper-Proof Packaging</h3>
            <p className="text-vedic-muted text-[11px]">Dispatched with physical lab report certificate and protective velvet pouch.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

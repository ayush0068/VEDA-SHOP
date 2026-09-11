import React, { useState } from 'react';
import { Upload, Gem, Hammer, CheckCircle, Sparkles, Send, PhoneCall } from 'lucide-react';
import { GemstoneType, MetalOption, CustomJewelleryRequest } from '../types/gemstone';

const METAL_OPTIONS: MetalOption[] = [
  'Silver (925 Sterling)',
  'Panchdhatu',
  '14K Yellow Gold',
  '18K Yellow Gold',
  '22K Yellow Gold',
  'Rose Gold'
];

const GEMSTONE_LIST: GemstoneType[] = [
  'Ruby',
  'Emerald',
  'Blue Sapphire',
  'Yellow Sapphire',
  'Pearl',
  'Red Coral',
  'Hessonite',
  'Cats Eye',
  'Diamond',
  'Opal',
  'Amethyst',
  'Citrine'
];

export const CustomJewelleryBuilder: React.FC = () => {
  const [activeStep, setActiveStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const [reqData, setReqData] = useState<CustomJewelleryRequest>({
    customerName: '',
    email: '',
    phone: '',
    jewelryType: 'Ring',
    metal: '18K Yellow Gold',
    gemstoneType: 'Yellow Sapphire',
    ringSize: '14 (Indian)',
    notes: '',
    status: 'Submitted'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div id="custom-jewellery-section" className="bg-white rounded-3xl p-6 sm:p-10 border border-vedic-gold/30 shadow-xl space-y-12">
      {/* SECTION HEADER */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest flex items-center justify-center gap-1.5">
          <Sparkles className="w-4 h-4 text-vedic-gold" /> Bespoke Jewelry Crafting
        </span>
        <h2 className="font-serif font-extrabold text-3xl md:text-4xl text-vedic-maroon">
          Design Your Own Custom Gemstone Jewelry
        </h2>
        <p className="text-xs md:text-sm text-vedic-muted">
          Transform your astrological gemstone into a handcrafted regal ring, pendant, or bracelet made in 18K Gold, Silver, or Sacred Panchdhatu.
        </p>
      </div>

      {/* 4-STEP VISUAL PROCESS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div
          onClick={() => setActiveStep(1)}
          className={`cursor-pointer rounded-2xl p-6 border transition-all ${
            activeStep === 1
              ? 'bg-vedic-maroon text-white border-vedic-gold shadow-lg scale-105'
              : 'bg-vedic-ivory/60 border-vedic-gold/20 text-vedic-dark hover:border-vedic-gold'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-full bg-vedic-gold text-vedic-dark font-serif font-bold text-sm flex items-center justify-center">
              1
            </span>
            <Upload className="w-5 h-5 text-vedic-gold" />
          </div>
          <h3 className="font-serif font-bold text-base">1. Share Your Idea</h3>
          <p className="text-xs opacity-80 mt-1">Upload sketch reference, screenshot, or pick jewelry style.</p>
        </div>

        <div
          onClick={() => setActiveStep(2)}
          className={`cursor-pointer rounded-2xl p-6 border transition-all ${
            activeStep === 2
              ? 'bg-vedic-maroon text-white border-vedic-gold shadow-lg scale-105'
              : 'bg-vedic-ivory/60 border-vedic-gold/20 text-vedic-dark hover:border-vedic-gold'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-full bg-vedic-gold text-vedic-dark font-serif font-bold text-sm flex items-center justify-center">
              2
            </span>
            <Gem className="w-5 h-5 text-vedic-gold" />
          </div>
          <h3 className="font-serif font-bold text-base">2. Select Gemstone</h3>
          <p className="text-xs opacity-80 mt-1">Choose unheated Ruby, Panna, Neelam, or Pukhraj by carat weight.</p>
        </div>

        <div
          onClick={() => setActiveStep(3)}
          className={`cursor-pointer rounded-2xl p-6 border transition-all ${
            activeStep === 3
              ? 'bg-vedic-maroon text-white border-vedic-gold shadow-lg scale-105'
              : 'bg-vedic-ivory/60 border-vedic-gold/20 text-vedic-dark hover:border-vedic-gold'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-full bg-vedic-gold text-vedic-dark font-serif font-bold text-sm flex items-center justify-center">
              3
            </span>
            <Hammer className="w-5 h-5 text-vedic-gold" />
          </div>
          <h3 className="font-serif font-bold text-base">3. Create Design</h3>
          <p className="text-xs opacity-80 mt-1">Select metal alloy (Gold/Panchdhatu) and ring size specifications.</p>
        </div>

        <div
          onClick={() => setActiveStep(4)}
          className={`cursor-pointer rounded-2xl p-6 border transition-all ${
            activeStep === 4
              ? 'bg-vedic-maroon text-white border-vedic-gold shadow-lg scale-105'
              : 'bg-vedic-ivory/60 border-vedic-gold/20 text-vedic-dark hover:border-vedic-gold'
          }`}
        >
          <div className="flex items-center justify-between mb-4">
            <span className="w-10 h-10 rounded-full bg-vedic-gold text-vedic-dark font-serif font-bold text-sm flex items-center justify-center">
              4
            </span>
            <CheckCircle className="w-5 h-5 text-vedic-gold" />
          </div>
          <h3 className="font-serif font-bold text-base">4. Approve & Order</h3>
          <p className="text-xs opacity-80 mt-1">Receive 3D CAD design rendering and place insured order.</p>
        </div>
      </div>

      {/* INTERACTIVE FORM & CUSTOMIZER */}
      {!submitted ? (
        <form onSubmit={handleSubmit} className="bg-vedic-ivory/40 rounded-3xl p-6 sm:p-8 border border-vedic-gold/20 space-y-6">
          <h3 className="font-serif font-extrabold text-xl text-vedic-maroon border-b border-vedic-gold/20 pb-3">
            Custom Jewelry Quote Request
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">Your Full Name *</label>
              <input
                type="text"
                required
                value={reqData.customerName}
                onChange={(e) => setReqData({ ...reqData, customerName: e.target.value })}
                placeholder="e.g. Priya Sharma"
                className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2.5 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">Email Address *</label>
              <input
                type="email"
                required
                value={reqData.email}
                onChange={(e) => setReqData({ ...reqData, email: e.target.value })}
                placeholder="priya@example.com"
                className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2.5 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">WhatsApp / Phone *</label>
              <input
                type="tel"
                required
                value={reqData.phone}
                onChange={(e) => setReqData({ ...reqData, phone: e.target.value })}
                placeholder="+91 9876543210"
                className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2.5 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">Jewelry Type</label>
              <select
                value={reqData.jewelryType}
                onChange={(e) => setReqData({ ...reqData, jewelryType: e.target.value as any })}
                className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2.5 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
              >
                <option value="Ring">Custom Ring</option>
                <option value="Pendant">Custom Pendant</option>
                <option value="Bracelet">Custom Bracelet</option>
                <option value="Earrings">Custom Earrings</option>
                <option value="Necklace">Custom Necklace</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">Preferred Metal</label>
              <select
                value={reqData.metal}
                onChange={(e) => setReqData({ ...reqData, metal: e.target.value as any })}
                className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2.5 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
              >
                {METAL_OPTIONS.map((m) => (
                  <option key={m} value={m}>{m}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">Selected Gemstone</label>
              <select
                value={reqData.gemstoneType}
                onChange={(e) => setReqData({ ...reqData, gemstoneType: e.target.value as any })}
                className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2.5 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
              >
                {GEMSTONE_LIST.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">Ring Size (if applicable)</label>
              <input
                type="text"
                value={reqData.ringSize}
                onChange={(e) => setReqData({ ...reqData, ringSize: e.target.value })}
                placeholder="e.g. 14 Indian / US 7"
                className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2.5 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-vedic-dark mb-1">Upload Reference Image (Optional)</label>
              <div className="bg-white border border-dashed border-vedic-gold/40 rounded-xl px-4 py-2 text-xs text-vedic-muted flex items-center justify-between">
                <span>Choose design photo / sketch...</span>
                <Upload className="w-4 h-4 text-vedic-gold" />
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-vedic-dark mb-1">Custom Notes / Special Astrological Instructions</label>
            <textarea
              rows={3}
              value={reqData.notes}
              onChange={(e) => setReqData({ ...reqData, notes: e.target.value })}
              placeholder="Specify bottom ring opening for gemstone skin contact, prana pratishtha energization, or engraving notes..."
              className="w-full bg-white border border-vedic-gold/30 rounded-xl px-4 py-2 text-xs text-vedic-dark focus:outline-none focus:border-vedic-gold"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-t border-vedic-gold/20">
            <div className="flex items-center gap-2 text-xs text-vedic-muted">
              <PhoneCall className="w-4 h-4 text-vedic-gold" /> Free 1-on-1 Design Consultation Included
            </div>

            <button
              type="submit"
              className="bg-gold-gradient text-vedic-dark px-8 py-3.5 rounded-full font-serif font-bold text-xs shadow-lg hover:scale-105 transition-transform flex items-center gap-2"
            >
              Submit Design Request <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </form>
      ) : (
        /* SUCCESS CONFIRMATION BOX */
        <div className="bg-emerald-50 border-2 border-emerald-300 rounded-3xl p-8 text-center space-y-4 max-w-xl mx-auto">
          <div className="w-16 h-16 rounded-full bg-emerald-600 text-white flex items-center justify-center mx-auto shadow-md">
            <CheckCircle className="w-8 h-8" />
          </div>
          <h3 className="font-serif font-extrabold text-2xl text-emerald-950">
            Design Request Submitted Successfully!
          </h3>
          <p className="text-xs text-emerald-800 leading-relaxed">
            Thank you, <strong>{reqData.customerName}</strong>! Our master jewelry artisan & astrologer will review your custom {reqData.jewelryType} specifications and contact you on WhatsApp/Phone at <strong>{reqData.phone}</strong> within 2 hours with 3D CAD renders and pricing.
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="bg-emerald-800 text-white text-xs font-bold px-6 py-2.5 rounded-full hover:bg-emerald-900 transition-colors"
          >
            Submit Another Request
          </button>
        </div>
      )}
    </div>
  );
};

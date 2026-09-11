import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Sparkles, ShieldCheck, CheckCircle2, Phone, Upload, Send } from 'lucide-react';
import { NAVAGRAHA_GEMSTONES } from '../data/gemstoneData';

export const CustomJewelleryPage: React.FC = () => {
  const [selectedStone, setSelectedStone] = useState('yellow-sapphire');
  const [metal, setMetal] = useState('Gold');
  const [jewelleryType, setJewelleryType] = useState('Ring');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'Custom Gemstone Jewellery' }]} />
      </div>

      <section className="bg-vedic-brown text-vedic-ivory py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Bespoke Craftsmen Workshop
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            Custom Gemstone Jewellery Configurator
          </h1>
          <p className="text-xs md:text-sm text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Craft your certified natural gemstone into a bespoke 18K/22K Gold, Sterling Silver, or Panchdhatu ring, pendant, or bracelet.
          </p>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4">
        {!submitted ? (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
            className="bg-white rounded-3xl p-8 border border-vedic-gold/30 shadow-card space-y-6"
          >
            <h2 className="font-serif font-bold text-xl text-vedic-maroon border-b border-vedic-gold/20 pb-2">
              Design Your Custom Jewel
            </h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="font-bold text-vedic-dark block mb-1">Step 1: Choose Natural Gemstone</label>
                <select
                  value={selectedStone}
                  onChange={(e) => setSelectedStone(e.target.value)}
                  className="w-full p-3 bg-vedic-ivory rounded-xl border border-vedic-gold/30 font-semibold text-vedic-dark"
                >
                  {NAVAGRAHA_GEMSTONES.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} ({g.localName}) — {g.rulingPlanet}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="font-bold text-vedic-dark block mb-1">Step 2: Choose Jewellery Type</label>
                <div className="grid grid-cols-3 gap-3">
                  {['Ring', 'Pendant', 'Bracelet'].map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setJewelleryType(t)}
                      className={`p-3 rounded-xl border text-center font-serif font-bold transition-all ${
                        jewelleryType === t
                          ? 'border-2 border-vedic-gold bg-vedic-goldLight text-vedic-brown'
                          : 'border-vedic-gold/30 bg-vedic-ivory text-vedic-dark'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-vedic-dark block mb-1">Step 3: Choose Metal Setting</label>
                <div className="grid grid-cols-4 gap-2">
                  {['Yellow Gold', 'White Gold', 'Sterling Silver', 'Panchdhatu'].map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setMetal(m)}
                      className={`p-2.5 rounded-xl border text-center text-[11px] font-semibold transition-all ${
                        metal === m
                          ? 'border-2 border-vedic-gold bg-vedic-goldLight text-vedic-brown font-bold'
                          : 'border-vedic-gold/30 bg-vedic-ivory text-vedic-dark'
                      }`}
                    >
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-vedic-dark block mb-1">Step 4: Special Instructions / Ring Size</label>
                <textarea
                  rows={3}
                  placeholder="Specify ring size, design preference, or special Pandit energization note..."
                  className="w-full p-3 bg-vedic-ivory rounded-xl border border-vedic-gold/30 text-xs focus:outline-none focus:border-vedic-gold"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-gold-gradient text-vedic-dark font-serif font-bold text-sm rounded-full shadow-lg hover:scale-[1.01] transition-transform flex items-center justify-center gap-2"
              >
                REQUEST CUSTOM ESTIMATE & CONSULTATION <Send className="w-4 h-4" />
              </button>
            </div>
          </form>
        ) : (
          <div className="bg-white rounded-3xl p-8 border border-vedic-gold/40 shadow-card text-center space-y-4">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
            <h3 className="font-serif font-extrabold text-2xl text-vedic-maroon">
              Custom Request Received!
            </h3>
            <p className="text-xs text-vedic-muted max-w-md mx-auto">
              Our master jeweller and Vedic team will contact you within 2 hours with 3D design previews and exact metal weight pricing.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs font-bold text-vedic-goldDark hover:underline"
            >
              Submit Another Custom Request
            </button>
          </div>
        )}
      </section>
    </div>
  );
};

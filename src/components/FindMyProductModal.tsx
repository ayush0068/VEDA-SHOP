import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, ArrowRight, Compass, ShieldCheck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { PURPOSE_LIST } from '../data/purposeData';
import { RASHI_LIST } from '../data/rashiData';
import { MOCK_PRODUCTS } from '../data/products';
import { Product } from '../types/ecommerce';

interface FindMyProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FindMyProductModal: React.FC<FindMyProductModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [selectedPurpose, setSelectedPurpose] = useState<string>('');
  const [selectedRashi, setSelectedRashi] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [recommendations, setRecommendations] = useState<Product[]>([]);

  if (!isOpen) return null;

  const handleCalculateRecommendation = (type: string) => {
    setSelectedType(type);

    // Rule based lookup
    let filtered = MOCK_PRODUCTS.filter((p) => {
      let matchesPurpose = true;
      let matchesType = true;

      if (type !== 'not-sure' && type) {
        if (type === 'rudraksha') matchesType = p.category === 'rudraksha';
        else if (type === 'gemstone') matchesType = p.category === 'gemstones';
        else if (type === 'bracelet') matchesType = p.category === 'bracelets';
        else if (type === 'yantra') matchesType = p.category === 'yantra';
        else if (type === 'puja') matchesType = p.category === 'puja-kits' || p.category === 'puja-samagri';
      }

      return matchesType;
    });

    if (filtered.length < 3) {
      filtered = MOCK_PRODUCTS.slice(0, 4);
    } else {
      filtered = filtered.slice(0, 4);
    }

    setRecommendations(filtered);
    setStep(4); // Results step
  };

  const resetQuiz = () => {
    setStep(1);
    setSelectedPurpose('');
    setSelectedRashi('');
    setSelectedType('');
    setRecommendations([]);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-vedic-gold/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-vedic-brown text-vedic-ivory p-5 flex items-center justify-between border-b border-vedic-gold/30">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-vedic-gold animate-spin-slow" />
            <div>
              <h3 className="font-serif font-bold text-lg text-vedic-goldLight">Find Your Sacred Product</h3>
              <p className="text-[11px] text-vedic-gold/80">Vedic Recommendation Engine • Kashi Heritage</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-vedic-maroonDark rounded-full text-vedic-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="bg-vedic-beige/60 px-6 py-2 border-b border-vedic-gold/20 flex items-center justify-between text-xs font-semibold text-vedic-brown">
          <span>Step {step} of 4</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s <= step ? 'w-6 bg-vedic-gold' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: PURPOSE */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Question 01
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  What is your primary intention or goal?
                </h4>
                <p className="text-xs text-vedic-muted">Select what you seek to invite into your life right now.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {PURPOSE_LIST.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => {
                      setSelectedPurpose(p.name);
                      setStep(2);
                    }}
                    className="p-4 rounded-2xl border border-vedic-gold/30 bg-vedic-ivory/50 hover:bg-vedic-goldLight hover:border-vedic-gold text-left transition-all group flex flex-col justify-between h-24 shadow-sm"
                  >
                    <span className="font-serif font-bold text-sm text-vedic-dark group-hover:text-vedic-maroon">
                      {p.name}
                    </span>
                    <span className="text-xs text-vedic-goldDark font-semibold">{p.hindiName}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: RASHI */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Question 02
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  What is your Zodiac Sign (Rashi)?
                </h4>
                <p className="text-xs text-vedic-muted">Your birth sign helps tailor planetary recommendations.</p>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 pt-2 max-h-64 overflow-y-auto">
                {RASHI_LIST.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => {
                      setSelectedRashi(r.nameEn);
                      setStep(3);
                    }}
                    className="p-2.5 rounded-xl border border-vedic-gold/20 bg-vedic-ivory hover:border-vedic-gold hover:bg-vedic-goldLight text-center transition-all group flex flex-col items-center justify-center"
                  >
                    <span className="text-2xl text-vedic-gold font-serif">{r.symbol}</span>
                    <span className="font-bold text-xs text-vedic-dark group-hover:text-vedic-maroon mt-1">
                      {r.nameEn}
                    </span>
                    <span className="text-[10px] text-vedic-muted">{r.nameHi.split(' ')[0]}</span>
                  </button>
                ))}
              </div>

              <div className="pt-2 text-center">
                <button
                  onClick={() => {
                    setSelectedRashi('Not Sure');
                    setStep(3);
                  }}
                  className="text-xs text-vedic-muted hover:text-vedic-maroon underline"
                >
                  I don't know my Rashi (Skip this)
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: PRODUCT TYPE */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Question 03
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  What type of spiritual product do you prefer?
                </h4>
                <p className="text-xs text-vedic-muted">Choose your preferred form of sacred item.</p>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                {[
                  { key: 'rudraksha', title: 'Nepali Rudraksha', desc: '1 to 14 Mukhi divine seeds' },
                  { key: 'gemstone', title: 'Natural Gemstone', desc: 'Precious planetary crystal stones' },
                  { key: 'bracelet', title: 'Gemstone Bracelet', desc: 'Wearable energy crystal jewelry' },
                  { key: 'yantra', title: 'Sacred Yantra', desc: 'Vedic copper energy grid frame' },
                  { key: 'puja', title: 'Complete Puja Kit', desc: 'Authentic worship samagri' },
                  { key: 'not-sure', title: 'Recommend Best For Me', desc: 'Show top suitable remedies' },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => handleCalculateRecommendation(item.key)}
                    className="p-4 rounded-2xl border border-vedic-gold/30 bg-vedic-ivory/50 hover:bg-vedic-goldLight hover:border-vedic-gold text-left transition-all group"
                  >
                    <span className="font-serif font-bold text-sm text-vedic-dark group-hover:text-vedic-maroon block">
                      {item.title}
                    </span>
                    <span className="text-xs text-vedic-muted">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 4: RECOMMENDATION RESULTS */}
          {step === 4 && (
            <div className="space-y-5">
              <div className="bg-vedic-ivory p-4 rounded-2xl border border-vedic-gold/30 text-center space-y-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Recommendations Calculated
                </span>
                <h4 className="font-serif font-extrabold text-lg text-vedic-maroon mt-1">
                  Tailored for {selectedPurpose} {selectedRashi ? `• ${selectedRashi}` : ''}
                </h4>
                <p className="text-xs text-vedic-muted italic">
                  "Traditionally associated with balancing planetary energies and inviting abundance."
                </p>
              </div>

              {/* Product Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {recommendations.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex gap-3 bg-white p-3 rounded-2xl border border-vedic-gold/20 shadow-sm"
                  >
                    <img
                      src={prod.images[0]}
                      alt={prod.title}
                      className="w-16 h-16 object-cover rounded-xl border border-vedic-gold/20 shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col justify-between">
                      <div>
                        <h5 className="text-xs font-bold text-vedic-dark truncate">{prod.title}</h5>
                        <p className="text-[10px] text-vedic-muted line-clamp-1">{prod.shortDescription}</p>
                      </div>
                      <div className="flex items-center justify-between mt-1">
                        <span className="text-xs font-bold text-vedic-maroon">
                          ₹{prod.price.toLocaleString('en-IN')}
                        </span>
                        <Link
                          to={`/products/${prod.slug}`}
                          onClick={onClose}
                          className="bg-vedic-gold text-vedic-dark hover:bg-vedic-goldDark font-bold text-[10px] px-2.5 py-1 rounded-full flex items-center gap-1"
                        >
                          View Details <ArrowRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Disclaimer & Astrologer CTA */}
              <div className="bg-amber-50 p-3 rounded-xl border border-amber-200 text-center space-y-2">
                <p className="text-[11px] text-amber-900 leading-snug">
                  <strong>Vedic Note:</strong> Rashi alone is one factor. For comprehensive Kundli-based gemstone selection, consult our verified Vedic astrologer.
                </p>
                <div className="flex items-center justify-center gap-3">
                  <Link
                    to="/contact?subject=Kundli%20Astrology%20Consultation"
                    onClick={onClose}
                    className="text-xs font-bold text-vedic-maroon hover:underline"
                  >
                    Consult Astrologer →
                  </Link>
                  <button
                    onClick={resetQuiz}
                    className="text-xs font-medium text-vedic-muted hover:text-vedic-dark flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" /> Retake Quiz
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { X, Sparkles, Compass, ShieldCheck, ArrowRight, RefreshCw, CheckCircle2, Phone, Calendar, Clock, MapPin } from 'lucide-react';
import { NAVAGRAHA_GEMSTONES } from '../data/gemstoneData';

interface FindMyGemstoneModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FindMyGemstoneModal: React.FC<FindMyGemstoneModalProps> = ({ isOpen, onClose }) => {
  const [step, setStep] = useState<number>(1);
  const [purpose, setPurpose] = useState<string>('');
  const [knowBirthDetails, setKnowBirthDetails] = useState<boolean | null>(null);
  const [dob, setDob] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [birthPlace, setBirthPlace] = useState<string>('');
  const [gender, setGender] = useState<string>('Male');
  const [budget, setBudget] = useState<string>('');
  const [format, setFormat] = useState<string>('');
  const [recommendationResult, setRecommendationResult] = useState<typeof NAVAGRAHA_GEMSTONES[0] | null>(null);

  if (!isOpen) return null;

  const handleStep5Submit = (selectedFormat: string) => {
    setFormat(selectedFormat);

    // Pick suitable stone based on purpose or default to Yellow Sapphire / Ruby / Emerald
    let chosen = NAVAGRAHA_GEMSTONES.find((g) => g.id === 'yellow-sapphire') || NAVAGRAHA_GEMSTONES[0];
    if (purpose === 'Career' || purpose === 'Business') {
      chosen = NAVAGRAHA_GEMSTONES.find((g) => g.id === 'emerald') || chosen;
    } else if (purpose === 'Confidence') {
      chosen = NAVAGRAHA_GEMSTONES.find((g) => g.id === 'ruby') || chosen;
    } else if (purpose === 'Protection') {
      chosen = NAVAGRAHA_GEMSTONES.find((g) => g.id === 'blue-sapphire') || chosen;
    }

    setRecommendationResult(chosen);
    setStep(6); // Results step
  };

  const resetTool = () => {
    setStep(1);
    setPurpose('');
    setKnowBirthDetails(null);
    setDob('');
    setBirthTime('');
    setBirthPlace('');
    setBudget('');
    setFormat('');
    setRecommendationResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl border border-vedic-gold/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-vedic-brown text-vedic-ivory p-5 flex items-center justify-between border-b border-vedic-gold/30">
          <div className="flex items-center gap-2">
            <Compass className="w-6 h-6 text-vedic-gold animate-spin-slow" />
            <div>
              <h3 className="font-serif font-bold text-lg text-vedic-goldLight">Find My Gemstone</h3>
              <p className="text-[11px] text-vedic-gold/80">Vedic Recommendation Engine 2.0</p>
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
          <span>Step {Math.min(step, 5)} of 5</span>
          <div className="flex gap-1.5">
            {[1, 2, 3, 4, 5].map((s) => (
              <div
                key={s}
                className={`h-2 rounded-full transition-all ${
                  s <= step ? 'w-6 bg-vedic-gold' : 'w-2 bg-gray-300'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto">
          
          {/* STEP 1: PURPOSE */}
          {step === 1 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Step 01 of 05
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  What would you like guidance for?
                </h4>
                <p className="text-xs text-vedic-muted">Select your primary objective or intent.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  'Career', 'Business', 'Wealth', 'Marriage',
                  'Education', 'Confidence', 'Peace', 'Spiritual Growth', 'General Guidance'
                ].map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setPurpose(item);
                      setStep(2);
                    }}
                    className="p-4 rounded-2xl border border-vedic-gold/30 bg-vedic-ivory/50 hover:bg-vedic-goldLight hover:border-vedic-gold text-center transition-all group font-serif font-bold text-sm text-vedic-dark hover:text-vedic-maroon shadow-sm"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 2: DO YOU KNOW BIRTH DETAILS? */}
          {step === 2 && (
            <div className="space-y-6 text-center">
              <div className="space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Step 02 of 05
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  Do you know your exact birth details?
                </h4>
                <p className="text-xs text-vedic-muted">Date, time, and place of birth enable Kundli calculation.</p>
              </div>

              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto pt-2">
                <button
                  onClick={() => {
                    setKnowBirthDetails(true);
                    setStep(3);
                  }}
                  className="p-5 rounded-2xl border-2 border-vedic-gold bg-vedic-goldLight text-vedic-brown font-serif font-bold text-base hover:scale-105 transition-transform"
                >
                  Yes, I know
                </button>
                <button
                  onClick={() => {
                    setKnowBirthDetails(false);
                    setStep(4);
                  }}
                  className="p-5 rounded-2xl border border-vedic-gold/40 bg-vedic-ivory text-vedic-dark font-serif font-bold text-base hover:bg-vedic-goldLight transition-colors"
                >
                  No / Approximate
                </button>
              </div>

              {!knowBirthDetails && knowBirthDetails === false && (
                <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 text-xs text-amber-900 space-y-2">
                  <p>Without exact birth details, our astrologer can conduct palmistry or Prashna Kundli analysis.</p>
                  <Link
                    to="/contact?subject=Prashna%20Kundli%20Consultation"
                    onClick={onClose}
                    className="inline-flex items-center gap-1 font-bold text-vedic-maroon hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" /> Talk directly to Vedic Astrologer →
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* STEP 3: BIRTH DETAILS INPUT */}
          {step === 3 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Step 03 of 05
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  Enter Your Birth Information
                </h4>
              </div>

              <div className="space-y-3 pt-2">
                <div>
                  <label className="text-xs font-bold text-vedic-dark block mb-1 flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-vedic-gold" /> Date of Birth
                  </label>
                  <input
                    type="date"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    className="w-full p-2.5 bg-vedic-ivory rounded-xl border border-vedic-gold/30 text-xs focus:outline-none focus:border-vedic-gold"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-bold text-vedic-dark block mb-1 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-vedic-gold" /> Birth Time
                    </label>
                    <input
                      type="time"
                      value={birthTime}
                      onChange={(e) => setBirthTime(e.target.value)}
                      className="w-full p-2.5 bg-vedic-ivory rounded-xl border border-vedic-gold/30 text-xs focus:outline-none focus:border-vedic-gold"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-vedic-dark block mb-1 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-vedic-gold" /> Place of Birth
                    </label>
                    <input
                      type="text"
                      placeholder="City, State, Country"
                      value={birthPlace}
                      onChange={(e) => setBirthPlace(e.target.value)}
                      className="w-full p-2.5 bg-vedic-ivory rounded-xl border border-vedic-gold/30 text-xs focus:outline-none focus:border-vedic-gold"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-bold text-vedic-dark block mb-1">Gender</label>
                  <div className="flex gap-4">
                    {['Male', 'Female', 'Other'].map((g) => (
                      <label key={g} className="flex items-center gap-1.5 text-xs text-vedic-dark font-medium cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={gender === g}
                          onChange={() => setGender(g)}
                        />
                        {g}
                      </label>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(4)}
                  className="w-full py-3 bg-vedic-maroon text-vedic-ivory font-serif font-bold text-xs rounded-full shadow hover:bg-vedic-maroonDark transition-colors mt-2"
                >
                  Continue to Budget Selection →
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: BUDGET RANGE */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Step 04 of 05
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  What is your preferred budget range?
                </h4>
                <p className="text-xs text-vedic-muted">Gemstone pricing depends on carat weight, clarity, and origin.</p>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  'Under ₹5,000',
                  '₹5,000 – ₹10,000',
                  '₹10,000 – ₹25,000',
                  '₹25,000 – ₹50,000',
                  '₹50,000+',
                  'Not Sure'
                ].map((b) => (
                  <button
                    key={b}
                    onClick={() => {
                      setBudget(b);
                      setStep(5);
                    }}
                    className="p-3.5 rounded-2xl border border-vedic-gold/30 bg-vedic-ivory/50 hover:bg-vedic-goldLight hover:border-vedic-gold text-center font-bold text-xs text-vedic-dark hover:text-vedic-maroon transition-all shadow-sm"
                  >
                    {b}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 5: JEWELLERY FORMAT */}
          {step === 5 && (
            <div className="space-y-4">
              <div className="text-center space-y-1">
                <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">
                  Step 05 of 05
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon">
                  How would you prefer to wear the gemstone?
                </h4>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                {[
                  { title: 'Loose Gemstone', desc: 'Unset certified stone' },
                  { title: 'Gemstone Ring', desc: 'Gold/Silver/Panchdhatu ring' },
                  { title: 'Gemstone Pendant', desc: 'Locket pendant setting' },
                  { title: 'Gemstone Bracelet', desc: 'Wearable energy bracelet' },
                  { title: 'Custom Jewellery', desc: 'Bespoke design config' },
                  { title: 'Not Sure', desc: 'Recommend suitable setting' },
                ].map((item) => (
                  <button
                    key={item.title}
                    onClick={() => handleStep5Submit(item.title)}
                    className="p-4 rounded-2xl border border-vedic-gold/30 bg-vedic-ivory/50 hover:bg-vedic-goldLight hover:border-vedic-gold text-left transition-all group"
                  >
                    <span className="font-serif font-bold text-xs text-vedic-dark group-hover:text-vedic-maroon block">
                      {item.title}
                    </span>
                    <span className="text-[10px] text-vedic-muted">{item.desc}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* STEP 6: PRELIMINARY GUIDANCE RESULT */}
          {step === 6 && recommendationResult && (
            <div className="space-y-5">
              <div className="bg-vedic-ivory p-4 rounded-2xl border border-vedic-gold/30 text-center space-y-1">
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Preliminary Recommendation Ready
                </span>
                <h4 className="font-serif font-extrabold text-xl text-vedic-maroon mt-1">
                  Potentially Suitable Stone: {recommendationResult.name} ({recommendationResult.localName})
                </h4>
                <p className="text-xs text-vedic-muted">
                  Ruling Planet: {recommendationResult.rulingPlanet} • Target Goal: {purpose || 'General Harmony'}
                </p>
              </div>

              {/* Stone Summary Box */}
              <div className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-vedic-gold/30 shadow-sm">
                <img
                  src={recommendationResult.image}
                  alt={recommendationResult.name}
                  className="w-20 h-20 object-cover rounded-xl border border-vedic-gold/20 shrink-0"
                />
                <div className="flex-1 min-w-0 space-y-1">
                  <h5 className="font-serif font-bold text-base text-vedic-brown">
                    Natural {recommendationResult.name} ({recommendationResult.sanskritName})
                  </h5>
                  <p className="text-xs text-vedic-charcoal line-clamp-2">{recommendationResult.shortDescription}</p>
                  <p className="text-xs font-bold text-vedic-maroon">
                    From ₹{recommendationResult.pricePerCaratStarting.toLocaleString('en-IN')} / ct
                  </p>
                </div>
              </div>

              {/* Astrological Responsibility Note */}
              <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200 space-y-2 text-center">
                <p className="text-xs text-amber-900 leading-relaxed">
                  <strong>Vedic Precautionary Note:</strong> This preliminary result is calculated based on general parameters. A complex birth chart (Kundli) requires detailed planet degree & house inspection before final prescription.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  <Link
                    to="/contact?subject=Personalized%20Gemstone%20Review"
                    onClick={onClose}
                    className="bg-gold-gradient text-vedic-dark font-serif font-bold text-xs px-6 py-2.5 rounded-full shadow hover:scale-105 transition-transform flex items-center gap-2"
                  >
                    <Phone className="w-3.5 h-3.5" /> GET PERSONALIZED ASTROLOGER REVIEW
                  </Link>
                  <Link
                    to={`/gemstones/${recommendationResult.slug}`}
                    onClick={onClose}
                    className="text-xs font-bold text-vedic-maroon hover:underline"
                  >
                    Explore {recommendationResult.name} Collection →
                  </Link>
                </div>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

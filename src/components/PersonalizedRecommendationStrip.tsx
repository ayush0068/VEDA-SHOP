import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, UserCircle2 } from 'lucide-react';

interface PersonalizedRecommendationStripProps {
  /** Fires with { dob, birthTime, birthPlace } when "Find My Gemstone" is clicked */
  onFindMyGemstone: (details: { dob: string; birthTime: string; birthPlace: string }) => void;
}

// One-line swap point: drop the actual banner photo (Kashi ghat / sunset silhouette, etc.)
// at this path in /public. Until then, the warm gold-to-brown gradient below stands in for it,
// so the section still looks intentional with no image present.
const RECOMMENDATION_BANNER_IMAGE = '/images/banners/personalized-recommendation-banner.png';

export const PersonalizedRecommendationStrip: React.FC<PersonalizedRecommendationStripProps> = ({
  onFindMyGemstone
}) => {
  const [dob, setDob] = useState<string>('');
  const [birthTime, setBirthTime] = useState<string>('');
  const [birthPlace, setBirthPlace] = useState<string>('');
  const [imageFailed, setImageFailed] = useState<boolean>(false);

  const handleSubmit = () => {
    onFindMyGemstone({ dob, birthTime, birthPlace });
  };

  return (
    <div className="bg-vedic-ivory">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 sm:pb-14">
        <div className="rounded-2xl overflow-hidden shadow-card bg-white">
          <div className="flex flex-col lg:flex-row">
            {/* Left — Personalized recommendation banner */}
            <div className="relative lg:w-[38%] min-h-[200px] sm:min-h-[220px] overflow-hidden bg-gradient-to-br from-[#8a5a2b] via-[#4d3018] to-vedic-dark">
              {!imageFailed && (
                <img
                  src={RECOMMENDATION_BANNER_IMAGE}
                  alt="Personalized Vedic gemstone recommendation"
                  className="absolute inset-0 w-full h-full object-cover"
                  onError={() => setImageFailed(true)}
                />
              )}
              {/* Light warm overlay — keeps the copy readable without hiding the photo underneath */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

              <div className="relative z-10 h-full flex flex-col justify-center px-6 sm:px-8 py-7 sm:py-8">
                <p className="text-[10px] sm:text-[11px] font-bold tracking-[0.15em] text-vedic-gold uppercase mb-2.5">
                  Personalized Recommendation
                </p>
                <h2 className="font-serif font-semibold text-white text-xl sm:text-2xl leading-snug mb-2.5 max-w-sm">
                  Not Sure Which Gemstone Is Right for You?
                </h2>
                <p className="text-xs sm:text-sm text-white/80 max-w-xs leading-relaxed mb-3">
                  Start with your Kundli and get a personalised gemstone recommendation based on your birth chart.
                </p>
                <span className="block w-14 h-px bg-vedic-gold/60" />
              </div>
            </div>

            {/* Middle — Enter Your Details form */}
            <div className="lg:w-[42%] px-6 sm:px-8 py-7 sm:py-8 flex flex-col justify-center">
              <h3 className="font-sans font-semibold text-vedic-dark text-base sm:text-lg mb-4">
                Enter Your Details
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
                <div className="border border-vedic-gold/20 rounded-xl px-3 py-2">
                  <label className="block text-[11px] font-medium text-vedic-charcoal mb-0.5">
                    Date of Birth
                  </label>
                  <input
                    type="text"
                    value={dob}
                    onChange={(e) => setDob(e.target.value)}
                    placeholder="DD / MM / YYYY"
                    className="w-full text-xs text-vedic-dark placeholder:text-vedic-muted/70 bg-transparent focus:outline-none"
                  />
                </div>
                <div className="border border-vedic-gold/20 rounded-xl px-3 py-2">
                  <label className="block text-[11px] font-medium text-vedic-charcoal mb-0.5">
                    Time of Birth
                  </label>
                  <input
                    type="text"
                    value={birthTime}
                    onChange={(e) => setBirthTime(e.target.value)}
                    placeholder="HH : MM (AM/PM)"
                    className="w-full text-xs text-vedic-dark placeholder:text-vedic-muted/70 bg-transparent focus:outline-none"
                  />
                </div>
                <div className="border border-vedic-gold/20 rounded-xl px-3 py-2">
                  <label className="block text-[11px] font-medium text-vedic-charcoal mb-0.5">
                    Place of Birth
                  </label>
                  <input
                    type="text"
                    value={birthPlace}
                    onChange={(e) => setBirthPlace(e.target.value)}
                    placeholder="City, State"
                    className="w-full text-xs text-vedic-dark placeholder:text-vedic-muted/70 bg-transparent focus:outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSubmit}
                className="self-start inline-flex items-center gap-2 bg-vedic-primary text-vedic-dark font-sans font-semibold text-sm px-6 py-3 rounded-xl hover:brightness-95 active:scale-[0.98] transition-all"
              >
                Find My Gemstone
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Right — Prefer Personal Guidance */}
            <div className="lg:w-[20%] px-6 sm:px-8 py-7 sm:py-8 flex flex-col items-center justify-center text-center bg-vedic-ivory/50">
              <UserCircle2 className="w-8 h-8 text-vedic-goldDark mb-3" strokeWidth={1.5} />
              <p className="font-sans font-semibold text-vedic-dark text-sm sm:text-base mb-2">
                Prefer Personal Guidance?
              </p>
              <Link
                to="/contact?subject=Kundli%20Astrology%20Consultation"
                className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors"
              >
                Consult an Astrologer
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
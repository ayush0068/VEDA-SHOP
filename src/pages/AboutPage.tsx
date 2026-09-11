import React from 'react';
import { Sparkles, ShieldCheck, Award, Heart, Compass, BookOpen, Users, MapPin } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-vedic-ivory min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb items={[{ label: 'About Veda Structure' }]} />

        {/* Hero Banner */}
        <div className="bg-vedic-maroon text-vedic-ivory rounded-3xl p-8 md:p-14 my-8 shadow-xl border-2 border-vedic-gold relative overflow-hidden">
          <div className="relative z-10 max-w-3xl">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-vedic-gold bg-vedic-gold/20 px-3 py-1 rounded-full border border-vedic-gold/40 mb-3">
              Established 2022 • Varanasi, India
            </span>
            <h1 className="font-serif text-3xl md:text-5xl font-extrabold text-vedic-goldLight leading-tight">
              Veda Structure — Sacred Vedic Astrology & Spiritual Platform
            </h1>
            <p className="text-sm md:text-base text-vedic-ivory/90 mt-4 leading-relaxed">
              Veda Structure brings together a dedicated collective of astrologers, sages, pundits, and spiritual experts. Founded in the holy city of Varanasi, we bridge ancient Vedic wisdom with authentic spiritual merchandise.
            </p>
          </div>
          <div className="absolute right-[-40px] bottom-[-40px] opacity-10 text-vedic-gold pointer-events-none">
            <Sparkles className="w-96 h-96" />
          </div>
        </div>

        {/* Brand Overview & Ecosystem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
          <div className="bg-white p-8 rounded-3xl shadow-sm border border-vedic-gold/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-vedic-gold/20 border border-vedic-gold flex items-center justify-center text-vedic-maroon mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-vedic-maroon">
                Our Comprehensive Services
              </h2>
              <p className="text-xs text-vedic-charcoal mt-3 leading-relaxed">
                Veda Structure offers a complete ecosystem combining traditional consultation with energized merchandise:
              </p>
              <ul className="mt-4 space-y-2 text-xs text-vedic-dark font-medium">
                <li className="flex items-center gap-2">✨ Vedic Astrology & Personal Consultations</li>
                <li className="flex items-center gap-2">✨ Detailed Horoscope Predictions & Birth Chart Analysis</li>
                <li className="flex items-center gap-2">✨ Numerology Calculations & Name Corrections</li>
                <li className="flex items-center gap-2">✨ Vedic Puja, Online Puja & Pandit Services</li>
                <li className="flex items-center gap-2">✨ Online Astrology Courses & Educational Content</li>
                <li className="flex items-center gap-2">✨ Personalized Astrology Reports</li>
              </ul>
            </div>
          </div>

          <div className="bg-white p-8 rounded-3xl shadow-sm border border-vedic-gold/20 flex flex-col justify-between">
            <div>
              <div className="w-12 h-12 rounded-2xl bg-vedic-gold/20 border border-vedic-gold flex items-center justify-center text-vedic-maroon mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="font-serif font-bold text-2xl text-vedic-maroon">
                Authentic Spiritual Merchandise
              </h2>
              <p className="text-xs text-vedic-charcoal mt-3 leading-relaxed">
                Every sacred product at Veda Structure undergoes authentic Vedic energization (Prana Pratishtha) by our experts before dispatch:
              </p>
              <ul className="mt-4 space-y-2 text-xs text-vedic-dark font-medium">
                <li className="flex items-center gap-2">🔱 100% Original Nepali Rudraksha (1 to 14 Mukhi, Gauri Shankar & Ganesh)</li>
                <li className="flex items-center gap-2">💎 Energized Gemstones tailored to your Birth Chart</li>
                <li className="flex items-center gap-2">📿 Sacred Crystal Energy Bracelets & Karungali Malas</li>
                <li className="flex items-center gap-2">🔱 Sacred Yantras, Protection Hangings & Home Decor</li>
                <li className="flex items-center gap-2">📜 Official X-Ray Laboratory Testing Certificates</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 4 Pillars of Veda Structure */}
        <div className="my-16">
          <div className="text-center max-w-xl mx-auto mb-10">
            <h2 className="font-serif text-2xl md:text-3xl font-bold text-vedic-maroon">
              Why Devotees Trust Veda Structure
            </h2>
            <p className="text-xs text-vedic-muted mt-2">
              Wear Your Blessings Every Day — Recommended by Astrologers | Trusted by Devotees
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-vedic-gold/30 shadow-sm text-center">
              <div className="w-14 h-14 rounded-full bg-vedic-maroon text-vedic-gold flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-base text-vedic-maroon">Expert Guidance</h3>
              <p className="text-xs text-vedic-charcoal mt-2">
                Personalized guidance provided by experienced astrologers, sages, and Vedic pundits.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-vedic-gold/30 shadow-sm text-center">
              <div className="w-14 h-14 rounded-full bg-vedic-maroon text-vedic-gold flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-base text-vedic-maroon">100% Genuine Products</h3>
              <p className="text-xs text-vedic-charcoal mt-2">
                Lab certified authentic Nepalese Rudraksha and unheated gemstones with test cards.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-vedic-gold/30 shadow-sm text-center">
              <div className="w-14 h-14 rounded-full bg-vedic-maroon text-vedic-gold flex items-center justify-center mx-auto mb-4">
                <Award className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-base text-vedic-maroon">Secure Payments</h3>
              <p className="text-xs text-vedic-charcoal mt-2">
                Safe & encrypted payment options including UPI, Cards, Net Banking, and COD across India.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-vedic-gold/30 shadow-sm text-center">
              <div className="w-14 h-14 rounded-full bg-vedic-maroon text-vedic-gold flex items-center justify-center mx-auto mb-4">
                <Sparkles className="w-7 h-7" />
              </div>
              <h3 className="font-serif font-bold text-base text-vedic-maroon">Free Shipping</h3>
              <p className="text-xs text-vedic-charcoal mt-2">
                Free express shipping on all eligible orders above INR 999 across Pan India.
              </p>
            </div>
          </div>
        </div>

        {/* Location Footer Note */}
        <div className="bg-white p-8 rounded-3xl border border-vedic-gold/30 text-center max-w-3xl mx-auto my-12">
          <MapPin className="w-8 h-8 text-vedic-maroon mx-auto mb-2" />
          <h3 className="font-serif font-bold text-xl text-vedic-maroon">Rooted in Sacred Varanasi</h3>
          <p className="text-xs text-vedic-charcoal mt-2 leading-relaxed">
            Headquartered in Varanasi, Uttar Pradesh 221001, India, Veda Structure connects spiritual seekers worldwide to authentic Himalayan Rudraksha and Vedic rituals performed along the holy Ganges.
          </p>
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Sparkles, Flame, CheckCircle2, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export const PujaGuidePage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'Guides' }, { label: 'Puja Guide' }]} />
      </div>

      <section className="bg-vedic-brown text-vedic-ivory py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Flame className="w-3.5 h-3.5" /> Ritual Wisdom from Kashi
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            Vedic Puja & Ritual Procedure Guide
          </h1>
          <p className="text-xs md:text-sm text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
            Discover the sacred Vidhi for performing Rudrabhishek, Mahalakshmi Puja, and Navgraha Shanti at home with authentic Varanasi pandits.
          </p>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 space-y-6">
        <div className="bg-white rounded-3xl p-8 border border-vedic-gold/30 shadow-card space-y-4">
          <h2 className="font-serif font-bold text-2xl text-vedic-maroon">
            Steps for Sacred Home Rudrabhishek
          </h2>
          <ol className="list-decimal list-inside space-y-2 text-xs md:text-sm text-vedic-charcoal leading-relaxed">
            <li>Cleanse your mandir alter with pure Kashi Gangajal.</li>
            <li>Place sacred Brass Shivling on Jaladhari facing North or East direction.</li>
            <li>Perform Sankalp with Akshat (unbroken rice) and Kusha grass.</li>
            <li>Offer Panchamrit (Milk, Curd, Honey, Ghee, Sugar) while chanting Om Namah Shivaya 108 times.</li>
            <li>Conclude with Aarti, Dhoop, and Prasad distribution.</li>
          </ol>

          <div className="pt-4 border-t border-vedic-beige text-center">
            <Link
              to="/collections/puja-kits"
              className="bg-vedic-maroon text-vedic-ivory font-serif font-bold text-xs px-6 py-3 rounded-full shadow hover:bg-vedic-maroonDark transition-all inline-flex items-center gap-2"
            >
              Explore Complete Puja Kits →
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

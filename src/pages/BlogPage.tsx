import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { BookOpen, Calendar, ArrowRight, User } from 'lucide-react';
import { Link } from 'react-router-dom';

const ARTICLES = [
  {
    id: 'b1',
    title: '5 Mukhi Rudraksha: Complete Guide, Benefits & Identification',
    category: 'Rudraksha',
    date: 'September 2026',
    author: 'Veda Knowledge Desk',
    image: 'https://images.unsplash.com/photo-1608755728617-aefab37d159c?auto=format&fit=crop&q=80&w=800',
    summary: 'Everything you need to know about Nepalese 5 Mukhi Rudraksha. How to wear, energization rituals, and health benefits.'
  },
  {
    id: 'b2',
    title: 'Which Gemstone Suits Your Rashi? A Comprehensive Kundli Blueprint',
    category: 'Gemstones',
    date: 'August 2026',
    author: 'Vedic Astrologer Acharya Ji',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&q=80&w=800',
    summary: 'Discover how planetary transits govern your gemstone choice. Why Rashi alone is only part of Kundli prescription.'
  },
  {
    id: 'b3',
    title: 'Sacred Rituals of Kashi: Significance of Rudrabhishek at Manikarnika Ghat',
    category: 'Vedic Heritage',
    date: 'August 2026',
    author: 'Kashi Pandit Parishad',
    image: 'https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=800',
    summary: 'Explore the millennia-old spiritual tradition of Shiva Abhishekam performed in the holy city of Varanasi.'
  }
];

export const BlogPage: React.FC = () => {
  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'Blog & Vedic Knowledge' }]} />
      </div>

      <section className="bg-vedic-brown text-vedic-ivory py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <BookOpen className="w-3.5 h-3.5" /> Content to Commerce
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            Vedic Knowledge & Spiritual Insights
          </h1>
          <p className="text-xs md:text-sm text-gray-200 font-light leading-relaxed max-w-2xl mx-auto">
            Authentic guidance on Rudraksha, Vedic astrology, natural gemstones, and sacred rituals from Kashi experts.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {ARTICLES.map((art) => (
            <div key={art.id} className="bg-white rounded-3xl overflow-hidden border border-vedic-gold/20 shadow-card hover:shadow-card-hover transition-all flex flex-col justify-between">
              <div>
                <img src={art.image} alt={art.title} className="w-full h-48 object-cover" />
                <div className="p-6 space-y-3">
                  <span className="text-[10px] font-bold text-vedic-goldDark bg-vedic-ivory px-2.5 py-1 rounded-full border border-vedic-gold/20 uppercase">
                    {art.category}
                  </span>
                  <h3 className="font-serif font-bold text-base text-vedic-dark hover:text-vedic-maroon">
                    {art.title}
                  </h3>
                  <p className="text-xs text-vedic-muted line-clamp-3 leading-relaxed">
                    {art.summary}
                  </p>
                </div>
              </div>
              <div className="p-6 pt-0 border-t border-vedic-beige/60 flex items-center justify-between text-xs text-vedic-muted">
                <span>{art.date}</span>
                <Link to="/products/5-mukhi-rudraksha" className="font-bold text-vedic-maroon hover:underline flex items-center gap-1">
                  Read Guide <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

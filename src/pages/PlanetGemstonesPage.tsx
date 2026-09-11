import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Sparkles, ArrowRight, ShieldCheck, Phone } from 'lucide-react';
import { PLANET_LIST } from '../data/gemstoneData';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { NotFoundPage } from './NotFoundPage';

export const PlanetGemstonesPage: React.FC = () => {
  const { planetSlug } = useParams<{ planetSlug: string }>();

  const planet = PLANET_LIST.find(
    (p) => p.slug === planetSlug?.toLowerCase() || p.id === planetSlug?.toLowerCase()
  );

  if (!planet) {
    return <NotFoundPage />;
  }

  const products = MOCK_PRODUCTS.filter((p) => p.category === 'gemstones').slice(0, 8);

  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'Gemstones', path: '/gemstones' }, { label: planet.planetName }]} />
      </div>

      <section className="bg-vedic-brown text-vedic-ivory py-16 text-center relative overflow-hidden">
        <div className="relative max-w-4xl mx-auto px-4 space-y-4">
          <div className="text-5xl font-serif text-vedic-gold mx-auto">{planet.symbol}</div>
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" /> Planetary Gemstone Architecture
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            Gemstones Associated with {planet.planetName}
          </h1>
          <p className="text-xs md:text-sm text-gray-200 font-light max-w-xl mx-auto leading-relaxed">
            {planet.description}
          </p>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-8 border border-vedic-gold/30 shadow-card space-y-4">
          <h2 className="font-serif font-bold text-2xl text-vedic-maroon">
            Astrological Significance of {planet.planetName} Remedies
          </h2>
          <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed">
            {planet.astrologicalSignificance}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-1">
              <span className="text-[10px] font-bold text-vedic-goldDark uppercase">Primary Prescribed Gemstone</span>
              <h3 className="font-serif font-bold text-base text-vedic-brown">{planet.primaryGemstone}</h3>
              <Link to={`/gemstones/${planet.primaryGemstoneSlug}`} className="text-xs font-bold text-vedic-maroon hover:underline block pt-1">
                Explore {planet.primaryGemstone} →
              </Link>
            </div>

            <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 space-y-1">
              <span className="text-[10px] font-bold text-vedic-goldDark uppercase">Approved Alternatives (Uparatna)</span>
              <p className="text-xs font-semibold text-vedic-dark">{planet.alternativeGemstones.join(', ')}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="border-b border-vedic-gold/20 pb-4">
          <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest">Available Items</span>
          <h2 className="font-serif font-extrabold text-2xl text-vedic-maroon mt-1">
            Shop {planet.planetName} Gemstones
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-vedic-brown text-vedic-ivory rounded-3xl p-8 border border-vedic-gold/40 text-center space-y-3">
          <h3 className="font-serif font-bold text-xl text-vedic-goldLight">Check with Your Birth Chart</h3>
          <p className="text-xs text-gray-300 max-w-md mx-auto">
            Get personalized astrological validation before wearing planetary stones.
          </p>
          <Link
            to="/contact?subject=Planetary%20Gemstone%20Consultation"
            className="bg-gold-gradient text-vedic-dark font-serif font-bold text-xs px-6 py-3 rounded-full shadow hover:scale-105 transition-transform inline-flex items-center gap-2"
          >
            <Phone className="w-4 h-4" /> CONSULT AN ASTROLOGER
          </Link>
        </div>
      </section>
    </div>
  );
};

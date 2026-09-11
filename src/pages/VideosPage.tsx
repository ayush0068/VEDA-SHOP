import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { Play, Sparkles } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { VideoProductCard } from '../components/VideoProductCard';

export const VideosPage: React.FC = () => {
  const videoProducts = MOCK_PRODUCTS.slice(0, 8);

  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'Video Knowledge' }]} />
      </div>

      <section className="bg-vedic-maroon text-vedic-ivory py-14 text-center border-b-4 border-vedic-gold">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <Play className="w-3.5 h-3.5 fill-current" /> Video Commerce & Guidance
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            See Authentic Veda Store Products in 360°
          </h1>
          <p className="text-xs md:text-sm text-vedic-gold/80 max-w-2xl mx-auto">
            Watch authentic Nepalese Rudraksha, gemstone jewelry, and Kashi rituals in video reels.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {videoProducts.map((p) => (
            <VideoProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>
    </div>
  );
};

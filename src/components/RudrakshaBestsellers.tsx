import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

// Spec section 6 ("Most Loved Rudraksha"): a curated bestseller carousel mixing numbered Mukhi
// with the special beads. Picked by real slug from MOCK_PRODUCTS — today that's the local demo
// catalog, but every one of these slugs maps 1:1 to what will be a real Shopify product handle,
// so this list is the only thing that ever needs editing (or replaced by a Shopify
// "most-loved-rudraksha" collection fetch — see the note above bestsellerProducts below).
const CURATED_BESTSELLER_SLUGS = [
  '5-mukhi-rudraksha',
  '7-mukhi-rudraksha',
  '6-mukhi-rudraksha',
  '8-mukhi-rudraksha',
  'gauri-shankar-rudraksha',
  'ganesh-rudraksha',
  '1-mukhi-rudraksha'
];

const AUTO_SLIDE_INTERVAL = 3000;

export const RudrakshaBestsellers: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // ---------------------------------------------------------------------
  // DATA SOURCE — swap this block for a real Shopify collection fetch
  // (e.g. `shopifyClient.collection.fetchByHandle('most-loved-rudraksha')`)
  // once connected. Everything below — the slider, the cards, Add to Cart,
  // Wishlist, Quick View — already runs on the standard `Product` shape via
  // the same ProductCard used across the rest of the storefront, so nothing
  // else here needs to change.
  // ---------------------------------------------------------------------
  const bestsellerProducts = CURATED_BESTSELLER_SLUGS.map((slug) =>
    MOCK_PRODUCTS.find((p) => p.category === 'rudraksha' && p.slug === slug)
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));

  const scroll = (direction: 'left' | 'right') => {
    const el = containerRef.current;
    if (!el) return;
    const scrollAmount = direction === 'left' ? -280 : 280;
    const { scrollLeft, scrollWidth, clientWidth } = el;

    if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 15) {
      el.scrollTo({ left: 0, behavior: 'smooth' });
    } else if (direction === 'left' && scrollLeft <= 15) {
      el.scrollTo({ left: scrollWidth, behavior: 'smooth' });
    } else {
      el.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Automatic infinite sliding loop — pauses on hover, same behaviour as the homepage carousel.
  useEffect(() => {
    if (isHovered || !bestsellerProducts.length) return;
    const timer = setInterval(() => scroll('right'), AUTO_SLIDE_INTERVAL);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isHovered, bestsellerProducts.length]);

  if (bestsellerProducts.length === 0) return null;

  return (
    <section id="most-loved-rudraksha" className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Section Header */}
        <div
          className="flex items-end justify-between gap-4 mb-6 sm:mb-8"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase mb-2">
              Most Loved
            </p>
            <h2 className="font-serif font-semibold text-vedic-dark text-2xl sm:text-3xl mb-2">
              Most Loved Rudraksha
            </h2>
            <p className="text-sm text-vedic-muted max-w-xl">
              Our devotees' favourites — trusted, lab-certified where applicable, and reordered
              again and again.
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <Link
              to="/collections/rudraksha"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors whitespace-nowrap"
            >
              View All Rudraksha
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => scroll('left')}
                className="p-2 rounded-full bg-white border border-vedic-gold/30 hover:bg-vedic-gold hover:text-vedic-dark transition-colors shadow-sm"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={() => scroll('right')}
                className="p-2 rounded-full bg-white border border-vedic-gold/30 hover:bg-vedic-gold hover:text-vedic-dark transition-colors shadow-sm"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Product Carousel */}
        <div
          ref={containerRef}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="flex gap-4 sm:gap-5 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
        >
          {bestsellerProducts.map((product) => (
            <div key={product.id} className="w-[220px] sm:w-[260px] shrink-0">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        {/* Mobile-only fallback for the header link above (hidden on sm+) */}
        <div className="mt-6 text-center sm:hidden">
          <Link
            to="/collections/rudraksha"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-vedic-goldDark hover:text-vedic-maroon transition-colors"
          >
            View All Rudraksha
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};
import React from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Search, Sparkles } from 'lucide-react';

export const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const searchResults = MOCK_PRODUCTS.filter((prod) => {
    if (!query.trim()) return true;
    const q = query.toLowerCase();
    return (
      prod.title.toLowerCase().includes(q) ||
      prod.category.toLowerCase().includes(q) ||
      prod.tags.some((t) => t.toLowerCase().includes(q)) ||
      (prod.mukhi && prod.mukhi.toLowerCase().includes(q)) ||
      (prod.rashi && prod.rashi.some((r) => r.toLowerCase().includes(q)))
    );
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumb items={[{ label: `Search: "${query}"` }]} />

      <div className="bg-white rounded-3xl p-8 border border-vedic-gold/20 shadow-card flex items-center justify-between gap-4">
        <div className="space-y-1">
          <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Search Results
          </span>
          <h1 className="font-serif font-extrabold text-2xl md:text-3xl text-vedic-maroon">
            Results for "{query}"
          </h1>
          <p className="text-xs text-vedic-muted">
            Found {searchResults.length} matching spiritual items.
          </p>
        </div>
      </div>

      {searchResults.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-vedic-gold/20 space-y-4">
          <Search className="w-12 h-12 text-vedic-gold mx-auto" />
          <h3 className="font-serif font-bold text-lg text-vedic-maroon">
            No Spiritual Products Found
          </h3>
          <p className="text-xs text-vedic-muted max-w-md mx-auto">
            We couldn't find matches for "{query}". Try checking spellings or browsing our top collections below.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-vedic-maroon text-vedic-ivory px-6 py-2.5 rounded-full text-xs font-bold"
          >
            View All Shop Items
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {searchResults.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Heart, Sparkles } from 'lucide-react';

export const WishlistPage: React.FC = () => {
  const { wishlist } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Saved Wishlist' }]} />

      <div className="flex items-center justify-between border-b border-vedic-gold/20 pb-4">
        <div>
          <span className="text-xs font-bold text-vedic-goldDark uppercase tracking-widest flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> Saved Items
          </span>
          <h1 className="font-serif font-extrabold text-2xl md:text-3xl text-vedic-maroon mt-1">
            My Sacred Wishlist ({wishlist.length})
          </h1>
        </div>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center border border-vedic-gold/20 space-y-4 max-w-lg mx-auto">
          <Heart className="w-12 h-12 text-vedic-gold mx-auto" />
          <h3 className="font-serif font-bold text-lg text-vedic-maroon">
            Your Wishlist is Empty
          </h3>
          <p className="text-xs text-vedic-muted">
            Click the heart icon on any product to save items you love for later.
          </p>
          <Link
            to="/shop"
            className="inline-block bg-vedic-maroon text-vedic-ivory px-6 py-2.5 rounded-full text-xs font-bold shadow-md"
          >
            Explore Spiritual Shop
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {wishlist.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

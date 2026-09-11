import React from 'react';
import { Link } from 'react-router-dom';
import { Sparkles, Home, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-20 h-20 bg-vedic-gold/10 text-vedic-gold rounded-full flex items-center justify-center mx-auto border border-vedic-gold/30">
        <Sparkles className="w-10 h-10 animate-spin" />
      </div>

      <h1 className="font-serif font-extrabold text-3xl md:text-4xl text-vedic-maroon">
        Looks Like You've Taken a Spiritual Detour
      </h1>

      <p className="text-xs text-vedic-muted max-w-md mx-auto leading-relaxed">
        The page or sacred path you are looking for has moved or does not exist. Let us guide you back to our divine collection.
      </p>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="bg-vedic-maroon text-vedic-ivory px-7 py-3 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroonDark transition-colors flex items-center gap-2"
        >
          <Home className="w-4 h-4 text-vedic-gold" /> Return Home
        </Link>
        <Link
          to="/shop"
          className="bg-white text-vedic-dark border border-vedic-gold/40 px-6 py-3 rounded-full text-xs font-bold hover:bg-vedic-ivory transition-colors flex items-center gap-2"
        >
          <ShoppingBag className="w-4 h-4 text-vedic-gold" /> Explore Shop
        </Link>
      </div>
    </div>
  );
};

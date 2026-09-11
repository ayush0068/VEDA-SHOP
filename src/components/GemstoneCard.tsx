import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Sparkles, ShieldCheck, ArrowRight } from 'lucide-react';
import { GemstoneItem } from '../data/gemstoneCatalogData';
import { useWishlist } from '../context/WishlistContext';

interface GemstoneCardProps {
  gem: GemstoneItem;
  onSelect: (slug: string) => void;
}

export const GemstoneCard: React.FC<GemstoneCardProps> = ({ gem, onSelect }) => {
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Convert GemstoneItem to compatible Product schema for global Wishlist Context
  const wishlistProductPayload = {
    id: gem.id,
    title: gem.name,
    subtitle: gem.hindiName || gem.category,
    price: gem.startingPrice,
    originalPrice: Math.round(gem.startingPrice * 1.25),
    rating: 4.9,
    reviewsCount: 42,
    images: [gem.image, ...gem.gallery],
    category: gem.category,
    isBestSeller: !!gem.isPopular,
    isNew: !!gem.isExclusive,
    inStock: true,
    sku: `GEM-${gem.id.toUpperCase()}`,
    description: gem.description,
    benefits: gem.benefits,
    tags: [gem.category, gem.gemstoneType, gem.origin]
  };

  const isLiked = isInWishlist(gem.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(wishlistProductPayload as any);
  };

  return (
    <div
      onClick={() => onSelect(gem.slug)}
      className="group cursor-pointer bg-amber-950/40 border border-amber-500/20 hover:border-amber-400/70 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-amber-500/15 flex flex-col justify-between"
    >
      {/* Top Image Section */}
      <div className="relative aspect-square w-full overflow-hidden bg-gradient-to-b from-amber-950/80 to-amber-900/50 p-4 flex items-center justify-center">
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1.5 items-start">
          {gem.isExclusive && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-500 text-amber-950 uppercase tracking-wider shadow-md">
              <Sparkles className="w-3 h-3" /> Exclusive
            </span>
          )}
          {gem.isPopular && !gem.isExclusive && (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-amber-900/90 text-amber-300 border border-amber-500/40 uppercase tracking-wider shadow-md">
              Popular
            </span>
          )}
          {gem.isZodiac && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-semibold bg-amber-950/90 text-amber-400 border border-amber-700/50">
              Rashi Ratna
            </span>
          )}
        </div>

        {/* Wishlist Heart Icon */}
        <button
          onClick={handleWishlistClick}
          aria-label="Add to Wishlist"
          className={`absolute top-3 right-3 z-10 p-2 rounded-full backdrop-blur-md transition-all duration-200 ${
            isLiked
              ? 'bg-red-500/20 text-red-400 border border-red-500/40'
              : 'bg-amber-950/60 text-amber-300/70 hover:text-amber-200 border border-amber-500/20'
          }`}
        >
          <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
        </button>

        {/* Gem Image */}
        <img
          src={gem.image}
          alt={gem.name}
          loading="lazy"
          className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500 ease-out"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://placehold.co/600x600/1F2937/F59E0B?text=${encodeURIComponent(
              gem.name
            )}`;
          }}
        />

        <div className="absolute bottom-2 left-3 z-10 text-[10px] text-amber-400/80 font-mono flex items-center gap-1">
          <ShieldCheck className="w-3 h-3 text-amber-400" />
          <span>{gem.certification.split(' ')[0]} Certified</span>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between gap-2 text-xs text-amber-400/70 mb-1">
            <span className="truncate">{gem.category}</span>
            <span className="truncate text-amber-300/50">{gem.origin}</span>
          </div>

          <h3 className="text-base sm:text-lg font-serif font-bold text-amber-100 group-hover:text-amber-300 transition-colors line-clamp-1">
            {gem.name}
          </h3>

          {gem.hindiName && (
            <p className="text-xs font-serif text-amber-400 font-medium mb-2">
              {gem.hindiName}
            </p>
          )}

          <p className="text-xs text-amber-200/70 line-clamp-2 mb-4 leading-relaxed font-light">
            {gem.description}
          </p>
        </div>

        {/* Footer Price & CTA */}
        <div className="pt-3 border-t border-amber-800/40 flex items-center justify-between gap-2">
          <div>
            <span className="text-[10px] text-amber-400/70 block uppercase tracking-wider">Starts From</span>
            <span className="text-sm sm:text-base font-bold text-amber-300">
              ₹{gem.startingPrice.toLocaleString('en-IN')}
            </span>
          </div>

          <button
            onClick={() => onSelect(gem.slug)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-amber-500/10 hover:bg-amber-500 text-amber-300 hover:text-amber-950 border border-amber-500/40 text-xs font-semibold transition-all duration-200"
          >
            <span>View Details</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};

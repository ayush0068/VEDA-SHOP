import React from 'react';
import { GEMSTONE_CATEGORIES } from '../data/gemstoneCatalogData';

interface GemstoneCategoryNavProps {
  activeCategorySlug: string;
  onSelectCategory: (slug: string) => void;
}

export const GemstoneCategoryNav: React.FC<GemstoneCategoryNavProps> = ({
  activeCategorySlug,
  onSelectCategory
}) => {
  return (
    <div className="bg-amber-950/90 border-b border-amber-800/40 sticky top-16 z-30 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-2 sm:space-x-4 overflow-x-auto py-3 no-scrollbar scroll-smooth">
          {GEMSTONE_CATEGORIES.map((cat) => {
            const isActive = activeCategorySlug === cat.slug;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.slug)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 flex-shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-amber-950 font-bold shadow-md shadow-amber-500/20'
                    : 'bg-amber-900/40 text-amber-200 hover:bg-amber-800/60 hover:text-amber-100 border border-amber-700/30'
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CATEGORIES } from '../data/categories';
import { MOCK_PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { Breadcrumb } from '../components/Breadcrumb';
import { Sparkles, ChevronDown, CheckCircle2 } from 'lucide-react';

export const CategoryPage: React.FC = () => {
  const { category, subcategory } = useParams<{ category: string; subcategory?: string }>();

  const currentCategory = useMemo(() => {
    return CATEGORIES.find((c) => c.slug === category) || CATEGORIES[0];
  }, [category]);

  const currentSubcategory = useMemo(() => {
    if (!subcategory || !currentCategory) return null;
    return currentCategory.subcategories.find((s) => s.slug === subcategory);
  }, [subcategory, currentCategory]);

  const categoryProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((p) => {
      if (p.category !== currentCategory.slug) return false;
      if (subcategory && subcategory !== 'all' && p.subcategory !== subcategory) {
        return false;
      }
      return true;
    });
  }, [currentCategory, subcategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-8">
      <Breadcrumb
        items={[
          { label: currentCategory.name, path: `/collections/${currentCategory.slug}` },
          ...(currentSubcategory ? [{ label: currentSubcategory.name }] : []),
        ]}
      />

      {/* Category Hero Banner */}
      <div className="relative rounded-3xl overflow-hidden bg-vedic-dark text-white border-2 border-vedic-gold shadow-2xl p-8 md:p-12">
        <img
          src={currentCategory.image}
          alt={currentCategory.name}
          className="absolute inset-0 w-full h-full object-cover opacity-35"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <span className="inline-flex items-center gap-1.5 text-xs font-bold text-vedic-gold bg-black/40 px-3 py-1 rounded-full border border-vedic-gold/40">
            <Sparkles className="w-3.5 h-3.5" /> Sacred {currentCategory.name} Collection
          </span>

          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            {currentSubcategory ? currentSubcategory.name : currentCategory.name}
          </h1>

          <p className="text-xs md:text-sm text-gray-200 leading-relaxed font-light">
            {currentSubcategory?.description || currentCategory.description}
          </p>

          <div className="flex items-center gap-4 text-xs font-semibold text-vedic-gold pt-2">
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Lab Certified</span>
            <span className="flex items-center gap-1"><CheckCircle2 className="w-4 h-4" /> Prana Pratishtha Energized</span>
          </div>
        </div>
      </div>

      {/* Subcategories Horizontal Tabs */}
      {currentCategory.subcategories.length > 0 && (
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-vedic-dark uppercase tracking-wider">
            Explore Sub-Collections
          </h3>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
            <Link
              to={`/collections/${currentCategory.slug}`}
              className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                !subcategory || subcategory === 'all'
                  ? 'bg-vedic-maroon text-vedic-goldLight border-vedic-gold shadow-md'
                  : 'bg-white text-vedic-dark border-vedic-gold/20 hover:border-vedic-gold'
              }`}
            >
              All {currentCategory.name}
            </Link>

            {currentCategory.subcategories.map((sub) => {
              const isActive = subcategory === sub.slug;
              return (
                <Link
                  key={sub.slug}
                  to={`/collections/${currentCategory.slug}/${sub.slug}`}
                  className={`px-4 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-all border ${
                    isActive
                      ? 'bg-vedic-maroon text-vedic-goldLight border-vedic-gold shadow-md'
                      : 'bg-white text-vedic-dark border-vedic-gold/20 hover:border-vedic-gold'
                  }`}
                >
                  {sub.name}
                </Link>
              );
            })}
          </div>
        </div>
      )}

      {/* Product Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="font-serif font-bold text-xl text-vedic-maroon">
            Available Products ({categoryProducts.length})
          </h2>
        </div>

        {categoryProducts.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-vedic-gold/20">
            <h3 className="font-serif font-bold text-lg text-vedic-maroon">Coming Soon</h3>
            <p className="text-xs text-vedic-muted mt-2">
              New authentic items are being energized and tested for this sub-collection.
            </p>
            <Link
              to="/shop"
              className="inline-block mt-4 bg-vedic-maroon text-white px-6 py-2.5 rounded-full text-xs font-bold"
            >
              Browse All Shop Items
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {categoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

      {/* Category SEO Content & FAQ Section */}
      {currentCategory.faqs && (
        <div className="bg-white rounded-3xl p-8 border border-vedic-gold/20 space-y-6">
          <div className="space-y-2">
            <h3 className="font-serif font-bold text-lg text-vedic-maroon">
              About Authentic {currentCategory.name} Sourcing
            </h3>
            <p className="text-xs text-vedic-muted leading-relaxed">
              {currentCategory.seoText || currentCategory.description}
            </p>
          </div>

          <div className="space-y-3 pt-4 border-t border-vedic-beige">
            <h4 className="font-serif font-bold text-sm text-vedic-dark">
              Frequently Asked Questions About {currentCategory.name}
            </h4>
            {currentCategory.faqs.map((faq, idx) => (
              <div key={idx} className="bg-vedic-ivory p-4 rounded-2xl space-y-1">
                <h5 className="font-semibold text-xs text-vedic-maroon">{faq.question}</h5>
                <p className="text-xs text-vedic-muted">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RudrakshaHero } from '../components/RudrakshaHero';
import { RudrakshaQuickFinder } from '../components/RudrakshaQuickFinder';
import { RudrakshaShopByMukhi } from '../components/RudrakshaShopByMukhi';
import { RudrakshaBestsellers } from '../components/RudrakshaBestsellers';

// /rudraksha — the main Rudraksha landing page (per spec: Learn → Understand → Find Right
// Rudraksha → Compare → Trust → Buy → Energization → Consultation). Built section by section;
// Hero + Quick Finder are wired up so far. #shop-by-purpose and #shop-by-rashi are left as real
// anchors so the Quick Finder's Purpose/Rashi picks already scroll to the right spot once those
// sections land here next.
export const RudrakshaPage: React.FC = () => {
  const navigate = useNavigate();

  const scrollToQuickFinder = () => {
    document.getElementById('quick-finder')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="bg-vedic-ivory">
      <RudrakshaHero onFindRudrakshaClick={scrollToQuickFinder} />

      <div id="quick-finder">
        <RudrakshaQuickFinder onSelectMukhi={(mukhi) => navigate(`/products/${mukhi}-mukhi-rudraksha`)} />
      </div>

      {/* Section 5 (spec): Shop By Mukhi — reusable, data-driven 1–14 Mukhi grid.
          Demo data today via rudrakshaCatalogService.ts; swaps to the real Shopify
          "rudraksha-by-mukhi" collection later with no changes to this component. */}
      <RudrakshaShopByMukhi onSelectMukhi={(mukhi) => navigate(`/products/${mukhi}-mukhi-rudraksha`)} />

      {/* Section 6 (spec): Featured/Bestseller Rudraksha — "Most Loved Rudraksha" carousel.
          Reuses the site's real ProductCard + MOCK_PRODUCTS (same data source, cards, cart,
          wishlist and Quick View as the rest of the storefront) so it's already Shopify-ready:
          only the curated slug list swaps for a real collection fetch later. */}
      <RudrakshaBestsellers />

      {/* Next up: Shop by Purpose, Shop by Rashi... */}
    </div>
  );
};
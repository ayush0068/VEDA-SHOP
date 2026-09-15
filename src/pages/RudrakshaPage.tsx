import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RudrakshaHero } from '../components/RudrakshaHero';
import { RudrakshaQuickFinder } from '../components/RudrakshaQuickFinder';

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

      {/* Next up: Shop by Mukhi, Featured/Bestsellers, Shop by Purpose, Shop by Rashi... */}
    </div>
  );
};
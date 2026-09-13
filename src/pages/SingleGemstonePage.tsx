import React, { useState, useMemo, useRef, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Sparkles,
  Heart,
  ShoppingBag,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  ChevronLeft,
  Sun,
  Compass,
  Award,
  Share2,
  Check
} from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';
import { GemstoneCard } from '../components/GemstoneCard';
import { GEMSTONE_CATALOG_DATA, WeightOption, GemstoneItem } from '../data/gemstoneCatalogData';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

// Tab strip shown under the gemstone's guide header. Each entry jumps to a real section
// already on this page where one exists ('#about', '#vedic-guidance', '#pricing'); the rest
// (Who Should Wear, How to Wear, Types, Jewellery, Cleaning & Care, Buyer Beware, FAQs) are
// placeholders for the dedicated content sections planned next — they currently just sit
// as tab labels without a target section built yet.
const PAGE_TABS: { label: string; anchor: string }[] = [
  { label: 'About', anchor: '#about' },
  { label: 'Who Should Wear', anchor: '#' },
  { label: 'How to Wear', anchor: '#' },
  { label: 'Benefits', anchor: '#vedic-guidance' },
  { label: 'Types', anchor: '#' },
  { label: 'Quality & Price', anchor: '#pricing' },
  { label: 'Jewellery', anchor: '#' },
  { label: 'Cleaning & Care', anchor: '#' },
  { label: 'Buyer Beware', anchor: '#' },
  { label: 'FAQs', anchor: '#' }
];

/**
 * Demo "varieties / origin types" shown in the horizontal scroller under the gemstone header
 * (e.g. Zambian Emerald, Colombian Emerald...). Keyed by `gemstoneType` from the catalog data.
 *
 * This is placeholder/demo content for now. When Shopify is connected, swap this for a real
 * lookup — e.g. fetch the products tagged/collected under this gemstone's type — and return
 * the same `{ name }` shape (or extend it with a real per-variety image/slug) so the scroller
 * component below needs no changes.
 */
const GEMSTONE_VARIETY_DEMO_DATA: Record<string, string[]> = {
  Emerald: [
    'Zambian Emerald',
    'Brazilian Emerald',
    'Colombian Emerald',
    'Ethiopian Emerald',
    'Vivid Green Emerald',
    'Russian Emerald',
    'Panjshir Emerald',
    'Indian Emerald',
    'Swat Emerald'
  ],
  Ruby: [
    'Burmese Ruby',
    'Mozambique Ruby',
    'Thai Ruby',
    'African Ruby',
    'Ceylon Ruby',
    'Vietnamese Ruby',
    'Madagascar Ruby'
  ],
  Sapphire: [
    'Ceylon Blue Sapphire',
    'Kashmir Blue Sapphire',
    'Burmese Blue Sapphire',
    'Madagascar Blue Sapphire',
    'Australian Blue Sapphire',
    'Thai Blue Sapphire'
  ],
  Pearl: ['South Sea Pearl', 'Basra Pearl', 'Hyderabadi Pearl', 'Venezuelan Pearl', 'Freshwater Pearl'],
  Coral: ['Italian Red Coral', 'Japani Red Coral', 'Taiwan Red Coral'],
  Hessonite: ['Ceylon Hessonite', 'African Hessonite'],
  'Cat\'s Eye': ["Ceylon Cat's Eye", "Indian Cat's Eye", "Chrysoberyl Cat's Eye"]
};

/** Picks a variety list for this gemstone — matches by gemstoneType keyword, else falls back to a generic set. */
function getGemstoneVarieties(gem: GemstoneItem): string[] {
  const typeKey = Object.keys(GEMSTONE_VARIETY_DEMO_DATA).find((key) =>
    gem.gemstoneType.toLowerCase().includes(key.toLowerCase())
  );
  if (typeKey) return GEMSTONE_VARIETY_DEMO_DATA[typeKey];

  // Generic fallback so every gemstone always has something to show here.
  return [
    `Premium ${gem.name}`,
    `Natural ${gem.name}`,
    `Certified ${gem.name}`,
    `${gem.origin} ${gem.name}`,
    `Rare ${gem.name}`
  ];
}

/**
 * Optional per-gemstone image override for the big hero banner at the top of this page.
 *
 * By default the hero uses `gem.image` (from GEMSTONE_CATALOG_DATA / Shopify later) — so it
 * already works with no setup. If you want to swap in your own photo for a specific gemstone
 * here (without touching the data file), drop the file in /public/images/gemstones-page/hero/
 * and add one line below, keyed by the gemstone's slug:
 *
 *   'blue-sapphire': '/images/gemstones-page/hero/blue-sapphire.png',
 *   'emerald': '/images/gemstones-page/hero/emerald.png',
 *
 * Any slug not listed here just falls back to gem.image automatically.
 */
const HERO_IMAGE_OVERRIDES: Record<string, string> = {
   'blue-sapphire': '/images/gemstones-page/all/hero/Blue-Sapphire.png',
};

/** A single option in the swappable "Types & Varieties" picker — the base gem itself, or one of its varieties. */
interface GemstoneVariantOption {
  key: string; // 'default' for the base gem, else a slugified variety name
  name: string;
  image: string;
}

function slugify(text: string): string {
  return text.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export const SingleGemstonePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { addToCart, setIsCartOpen } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();

  // Find gemstone by slug or fallback to first item
  const gem = useMemo(() => {
    return GEMSTONE_CATALOG_DATA.find((g) => g.slug === slug) || null;
  }, [slug]);

  // If gem not found
  if (!gem) {
    return (
      <div className="bg-amber-950 text-amber-50 min-h-screen py-24 px-4 text-center">
        <h1 className="text-3xl font-serif font-bold text-amber-100 mb-4">Gemstone Not Found</h1>
        <p className="text-amber-300/80 mb-8">The requested gemstone page could not be located.</p>
        <Link
          to="/gemstones"
          className="inline-flex items-center gap-2 px-6 py-3 bg-amber-500 text-amber-950 font-bold rounded-xl hover:bg-amber-400"
        >
          Return to Gemstone Catalog
        </Link>
      </div>
    );
  }

  // Weight / Carat variant selection
  const [selectedWeight, setSelectedWeight] = useState<WeightOption>(gem.availableWeights[0]);
  const [copiedLink, setCopiedLink] = useState(false);

  // ------------------------------------------------------------------------
  // "Types & Varieties" swap picker.
  //
  // `variantOptions` is the full set: the base gem itself ('default') plus every
  // variety (e.g. Ceylon / Kashmir / Burmese Blue Sapphire). `activeVariantKey`
  // is whichever one is currently on display up top and in the PDP below.
  //
  // Behaviour: whichever option is active is removed from the visible picker
  // row, and whatever was active before slides back into the row in its place
  // — so the row always shows "everything except what you're currently
  // looking at", including the base gem once you've moved away from it.
  //
  // DEMO DATA NOTE: right now every variety reuses the base gem's image,
  // price, description, benefits etc. — only the name actually changes.
  // When Shopify is connected, `getGemstoneVarieties` (above) should instead
  // return real variant records (own image, price, description...), and
  // `activeVariant` below just needs those extra fields merged in the same
  // way `name`/`image` are today. Nothing else in this component changes.
  // ------------------------------------------------------------------------
  const varieties = useMemo(() => getGemstoneVarieties(gem), [gem]);
  const variantOptions: GemstoneVariantOption[] = useMemo(
    () => [
      { key: 'default', name: gem.name, image: HERO_IMAGE_OVERRIDES[gem.slug] || gem.image },
      ...varieties.map((name) => ({
        key: slugify(name),
        name,
        image: HERO_IMAGE_OVERRIDES[gem.slug] || gem.image // TODO(Shopify): use this variant's own image
      }))
    ],
    [gem, varieties]
  );

  const [activeVariantKey, setActiveVariantKey] = useState<string>('default');
  const activeVariant = variantOptions.find((v) => v.key === activeVariantKey) || variantOptions[0];
  const pickerOptions = variantOptions.filter((v) => v.key !== activeVariantKey);

  // Full display title — only the base gem gets the "(Hindi Stone)" suffix; a selected
  // variety's own name (e.g. "Ceylon Blue Sapphire") is already descriptive on its own.
  const displayTitle =
    activeVariantKey === 'default' && gem.hindiName
      ? `${gem.name} (${gem.hindiName.split(' ')[0]} Stone)`
      : activeVariant.name;

  // Reset back to the base gem whenever the person navigates to a different gemstone page.
  useEffect(() => {
    setActiveVariantKey('default');
  }, [gem.slug]);

  const [selectedImage, setSelectedImage] = useState<string>(activeVariant.image);
  useEffect(() => {
    setSelectedImage(activeVariant.image);
  }, [activeVariant.image]);

  const varietyScrollRef = useRef<HTMLDivElement>(null);
  const scrollVarieties = (direction: 'left' | 'right') => {
    varietyScrollRef.current?.scrollBy({ left: direction === 'left' ? -240 : 240, behavior: 'smooth' });
  };

  // Only show the prev/next arrows once the strip actually overflows and needs scrolling.
  const [canScrollVarieties, setCanScrollVarieties] = useState(false);
  useEffect(() => {
    const checkOverflow = () => {
      const el = varietyScrollRef.current;
      if (el) setCanScrollVarieties(el.scrollWidth > el.clientWidth + 4);
    };
    checkOverflow();
    window.addEventListener('resize', checkOverflow);
    return () => window.removeEventListener('resize', checkOverflow);
  }, [pickerOptions.length]);

  // Dynamic Price calculation based on weight multiplier
  // (still driven by the base gem's price for now — see the DEMO DATA NOTE above)
  const calculatedPrice = Math.round(gem.startingPrice * selectedWeight.priceMultiplier);

  // Product payload for global Cart & Wishlist context — reflects whichever
  // variety is currently active, so "Add to Cart" adds the right one.
  const contextProductPayload = {
    id: `${gem.id}-${activeVariantKey}-${selectedWeight.carat}ct`,
    title: `${activeVariant.name} (${selectedWeight.label})`,
    subtitle: gem.hindiName || gem.category,
    price: calculatedPrice,
    originalPrice: Math.round(calculatedPrice * 1.25),
    rating: 4.9,
    reviewsCount: 48,
    images: [activeVariant.image, ...gem.gallery],
    category: gem.category,
    isBestSeller: !!gem.isPopular,
    isNew: !!gem.isExclusive,
    inStock: true,
    sku: `GEM-${gem.id.toUpperCase()}-${activeVariantKey.toUpperCase()}-${selectedWeight.carat}CT`,
    description: gem.description,
    benefits: gem.benefits,
    tags: [gem.category, gem.gemstoneType, gem.origin]
  };

  const isLiked = isInWishlist(gem.id);

  const handleAddToCart = () => {
    addToCart(contextProductPayload as any, 1);
    setIsCartOpen(true);
  };

  const handleBuyNow = () => {
    addToCart(contextProductPayload as any, 1);
    navigate('/checkout');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  // 4 Related Gemstones based on category or type
  const relatedGems = useMemo(() => {
    return GEMSTONE_CATALOG_DATA.filter(
      (g) => g.id !== gem.id && (g.category === gem.category || g.gemstoneType === gem.gemstoneType)
    ).slice(0, 4);
  }, [gem]);

  const whatsappMessage = encodeURIComponent(
    `Namaste! I am interested in inquiring about ${activeVariant.name}, Weight: ${selectedWeight.label}, Price: ₹${calculatedPrice.toLocaleString('en-IN')}. Please guide me.`
  );

  return (
    <>
      {/* ------------------------------------------------------------------ */}
      {/* NEW: Guide-style top header — matches the requested reference      */}
      {/* layout, restyled to the site's Vedic (ivory/gold/maroon) theme.    */}
      {/* Everything here reads straight off `gem` (GEMSTONE_CATALOG_DATA),  */}
      {/* so once that data source is swapped for real Shopify products     */}
      {/* (same shape, via the catalog service), this header needs no       */}
      {/* changes at all — it will just render whatever comes from the API. */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-[#F7F4EF]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <Breadcrumb
            items={[
              { label: 'Gemstones', path: '/gemstones' },
              { label: displayTitle }
            ]}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-4 sm:pb-5 grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center">
          {/* Hero image — no card/frame, just the gemstone itself. mix-blend-multiply drops the
              product photo's white studio background so only the stone shows on the page bg.
              Swaps automatically to whichever variety is currently active. */}
          <div className="lg:col-span-3 flex justify-center lg:justify-start">
            <div className="w-full max-w-[200px] sm:max-w-[220px] aspect-[4/3] flex items-center justify-center">
              <img
                src={activeVariant.image}
                alt={activeVariant.name}
                className="max-w-[75%] max-h-[75%] object-contain mix-blend-multiply drop-shadow-xl"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/600x600/F7F4EF/E9A331?text=${encodeURIComponent(
                    activeVariant.name
                  )}`;
                }}
              />
            </div>
          </div>

          {/* Title, description, top benefits */}
          <div className="lg:col-span-9" id="about">
            <h1 className="font-serif font-bold text-vedic-dark text-xl sm:text-2xl lg:text-3xl mb-2 inline-block relative pb-2">
              {displayTitle}
              <span className="absolute left-0 bottom-0 w-14 h-[3px] bg-vedic-dark" />
            </h1>

            <p className="text-xs sm:text-sm text-vedic-muted leading-relaxed mb-3 max-w-3xl">
              {gem.description}
            </p>

            {gem.benefits && gem.benefits.length > 0 && (
              <div className="flex flex-wrap gap-x-5 gap-y-1.5">
                {gem.benefits.slice(0, 4).map((benefit, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-vedic-dark font-medium"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5 text-vedic-goldDark flex-shrink-0" />
                    {benefit}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Section tab strip */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-5 sm:gap-7 overflow-x-auto no-scrollbar border-t border-vedic-gold/20 py-2.5 text-xs sm:text-sm font-semibold text-vedic-dark">
            {PAGE_TABS.map((tab) => (
              <a
                key={tab.label}
                href={tab.anchor}
                className="whitespace-nowrap hover:text-vedic-maroon transition-colors"
              >
                {tab.label}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* "Types & Varieties" swap picker. Clicking an option makes it the    */}
      {/* active gem shown above + in the shopping section below, and puts   */}
      {/* whatever was active before back into this row. Demo data for now   */}
      {/* (see GEMSTONE_VARIETY_DEMO_DATA above) — swap that for a real       */}
      {/* Shopify variant lookup later; this section itself needs no changes.*/}
      {/* ------------------------------------------------------------------ */}
      <div id="types" className="bg-vedic-ivory border-t border-vedic-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="mb-8 sm:mb-10">
            <p className="text-[11px] sm:text-xs font-bold tracking-[0.15em] text-vedic-goldDark uppercase mb-2">
              Explore Varieties
            </p>
            <h2 className="font-serif font-semibold text-vedic-dark text-xl sm:text-2xl">
              {gem.name} Types &amp; Varieties
            </h2>
          </div>

          {/* Carousel row — prev/next arrows float over the edges and only appear once
              the strip actually overflows and needs scrolling. */}
          <div className="relative">
            {canScrollVarieties && (
              <button
                onClick={() => scrollVarieties('left')}
                aria-label="Scroll left"
                className="hidden sm:flex absolute left-0 top-11 sm:top-12 -translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-vedic-gold/30 bg-white items-center justify-center text-vedic-dark hover:bg-vedic-gold hover:border-vedic-gold hover:text-white transition-colors shadow-md"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
            )}

            <div
              ref={varietyScrollRef}
              className="flex items-start gap-5 sm:gap-7 overflow-x-auto no-scrollbar scroll-smooth pt-2 pb-1"
            >
              {pickerOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setActiveVariantKey(option.key)}
                  className="flex-shrink-0 w-24 sm:w-28 flex flex-col items-center gap-2.5 group"
                >
                  <span className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-vedic-card flex items-center justify-center overflow-hidden transition-all duration-300 shadow-md ring-1 ring-vedic-dark/5 group-hover:ring-vedic-gold/50 group-hover:-translate-y-0.5 group-hover:shadow-lg">
                    <img
                      src={option.image}
                      alt={option.name}
                      className="w-[88%] h-[88%] object-contain mix-blend-multiply"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = `https://placehold.co/200x200/FFF5DE/E9A331?text=${encodeURIComponent(
                          option.name
                        )}`;
                      }}
                    />
                  </span>
                  <span className="text-xs sm:text-sm text-center leading-snug font-medium text-vedic-dark/80 group-hover:text-vedic-dark transition-colors">
                    {option.name}
                  </span>
                </button>
              ))}
            </div>

            {canScrollVarieties && (
              <button
                onClick={() => scrollVarieties('right')}
                aria-label="Scroll right"
                className="hidden sm:flex absolute right-0 top-11 sm:top-12 translate-x-1/2 -translate-y-1/2 z-10 w-9 h-9 rounded-full border border-vedic-gold/30 bg-white items-center justify-center text-vedic-dark hover:bg-vedic-gold hover:border-vedic-gold hover:text-white transition-colors shadow-md"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* Existing shopping section (image gallery, weight/price, cart) —    */}
      {/* left as-is for now; this gets its Vedic-theme pass next.          */}
      {/* ------------------------------------------------------------------ */}
      <div className="bg-amber-950 text-amber-50 min-h-screen pb-20">
      {/* Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">

        {/* Product PDP Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-16">
          {/* Left Column: Image Gallery (5 cols) */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square w-full bg-gradient-to-b from-amber-900/40 to-amber-950 border border-amber-500/30 rounded-3xl overflow-hidden p-8 flex items-center justify-center group shadow-2xl">
              {/* Badges */}
              <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                {gem.isExclusive && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500 text-amber-950 text-xs font-bold uppercase tracking-wider shadow-lg">
                    <Sparkles className="w-3.5 h-3.5" /> Exclusive Collector
                  </span>
                )}
                {gem.isZodiac && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-900/90 text-amber-300 border border-amber-500/40 text-xs font-semibold shadow-lg">
                    Rashi Ratna
                  </span>
                )}
              </div>

              {/* Main Display Image — follows the active variety selected above */}
              <img
                src={selectedImage}
                alt={activeVariant.name}
                className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = `https://placehold.co/600x600/1F2937/F59E0B?text=${encodeURIComponent(activeVariant.name)}`;
                }}
              />
            </div>

            {/* Thumbnail Carousel */}
            {gem.gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2 no-scrollbar">
                {gem.gallery.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(imgUrl)}
                    className={`w-20 h-20 rounded-xl overflow-hidden border-2 p-1 bg-amber-900/40 flex-shrink-0 transition-all ${
                      selectedImage === imgUrl ? 'border-amber-400 scale-105' : 'border-amber-800/40 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Verification Guarantee */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-amber-800/40 text-center">
              <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-800/30">
                <ShieldCheck className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-amber-200 block">100% Certified</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-800/30">
                <Award className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-amber-200 block">Vedic Sanctified</span>
              </div>
              <div className="p-3 rounded-xl bg-amber-900/30 border border-amber-800/30">
                <Sparkles className="w-5 h-5 text-amber-400 mx-auto mb-1" />
                <span className="text-[11px] font-medium text-amber-200 block">Worldwide Express</span>
              </div>
            </div>
          </div>

          {/* Right Column: Gem Info & Options (6 cols) */}
          <div className="lg:col-span-6 space-y-6" id="pricing">
            <div>
              <div className="flex items-center justify-between text-xs text-amber-400/80 mb-2">
                <span className="uppercase tracking-widest font-semibold">{gem.category}</span>
                <button
                  onClick={handleShare}
                  className="inline-flex items-center gap-1 text-amber-400 hover:text-amber-200 transition-colors"
                >
                  {copiedLink ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
                  <span>{copiedLink ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>

              <h1 className="text-3xl sm:text-4xl font-serif font-bold text-amber-100 mb-1">
                {activeVariant.name}
              </h1>

              {activeVariantKey === 'default' && gem.hindiName && (
                <p className="text-lg font-serif text-amber-400 font-medium mb-4">
                  {gem.hindiName} {gem.alternateName ? `• ${gem.alternateName}` : ''}
                </p>
              )}

              <p className="text-amber-200/80 text-sm leading-relaxed font-light mb-6">
                {gem.description}
              </p>

              {/* Specs Tag Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-6">
                <div className="bg-amber-900/40 p-2.5 rounded-lg border border-amber-800/40">
                  <span className="text-[10px] text-amber-400/70 block uppercase">Origin</span>
                  <span className="text-xs font-semibold text-amber-100">{gem.origin}</span>
                </div>
                <div className="bg-amber-900/40 p-2.5 rounded-lg border border-amber-800/40">
                  <span className="text-[10px] text-amber-400/70 block uppercase">Treatment</span>
                  <span className="text-xs font-semibold text-amber-100 truncate block">{gem.treatment}</span>
                </div>
                <div className="bg-amber-900/40 p-2.5 rounded-lg border border-amber-800/40">
                  <span className="text-[10px] text-amber-400/70 block uppercase">Certification</span>
                  <span className="text-xs font-semibold text-amber-100 truncate block">{gem.certification}</span>
                </div>
                <div className="bg-amber-900/40 p-2.5 rounded-lg border border-amber-800/40">
                  <span className="text-[10px] text-amber-400/70 block uppercase">Hardness</span>
                  <span className="text-xs font-semibold text-amber-100">{gem.hardness}</span>
                </div>
              </div>
            </div>

            {/* Dynamic Carat Weight Selector */}
            <div className="p-4 bg-amber-900/30 border border-amber-800/40 rounded-2xl space-y-3">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-amber-300 uppercase tracking-wider">
                  Select Gemstone Weight / Carat (Ratti):
                </label>
                <span className="text-xs text-amber-400 font-semibold">{selectedWeight.label}</span>
              </div>

              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {gem.availableWeights.map((w) => {
                  const isSelected = selectedWeight.carat === w.carat;
                  return (
                    <button
                      key={w.carat}
                      onClick={() => setSelectedWeight(w)}
                      className={`py-2 px-3 rounded-xl text-xs font-semibold transition-all ${
                        isSelected
                          ? 'bg-amber-500 text-amber-950 shadow-lg shadow-amber-500/20 scale-105'
                          : 'bg-amber-950/70 text-amber-200 hover:bg-amber-800/60 border border-amber-800/50'
                      }`}
                    >
                      {w.carat} Carat
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Dynamic Price Display */}
            <div className="flex items-baseline gap-3 pt-2">
              <span className="text-3xl sm:text-4xl font-bold text-amber-300">
                ₹{calculatedPrice.toLocaleString('en-IN')}
              </span>
              <span className="text-sm text-amber-400/60 line-through">
                ₹{Math.round(calculatedPrice * 1.25).toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-emerald-400 font-bold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                Save 20%
              </span>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-3 pt-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className="py-3.5 px-6 rounded-xl bg-amber-500 text-amber-950 font-bold text-sm hover:bg-amber-400 transition-colors shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>
                <button
                  onClick={handleBuyNow}
                  className="py-3.5 px-6 rounded-xl bg-amber-200 text-amber-950 font-bold text-sm hover:bg-white transition-colors shadow-xl flex items-center justify-center gap-2"
                >
                  <span>Buy Now</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Ask Expert */}
                <a
                  href={`https://wa.me/919876543210?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="py-3 px-4 rounded-xl bg-emerald-900/60 hover:bg-emerald-800 border border-emerald-500/40 text-emerald-200 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  <span>Ask an Expert on WhatsApp</span>
                </a>

                {/* Wishlist Button */}
                <button
                  onClick={() => toggleWishlist(contextProductPayload as any)}
                  className={`py-3 px-4 rounded-xl border font-semibold text-xs transition-colors flex items-center justify-center gap-2 ${
                    isLiked
                      ? 'bg-red-500/20 text-red-300 border-red-500/40'
                      : 'bg-amber-900/40 text-amber-200 border-amber-800/40 hover:bg-amber-800/60'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} />
                  <span>{isLiked ? 'In Wishlist' : 'Add to Wishlist'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3. Vedic Astrology & Cultural Guidance Section */}
        <section id="vedic-guidance" className="mb-16 bg-gradient-to-b from-amber-900/40 via-amber-950 to-amber-900/40 border border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-semibold border border-amber-500/20">
                <Sun className="w-4 h-4 text-amber-400" />
                <span>Sacred Vedic Astrology Guidance</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-amber-100">
                Astrological Benefits & Ritual Parameters
              </h2>
              <p className="text-xs sm:text-sm text-amber-300/80">
                Traditional recommendation parameters according to classical Parasara Vedic Scriptures
              </p>
            </div>

            {/* Vedic Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {gem.associatedPlanet && (
                <div className="p-4 bg-amber-950/60 border border-amber-800/40 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-900/80 text-amber-400">
                    <Sun className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">Ruling Planet (Graha)</span>
                    <span className="text-sm font-semibold text-amber-100">{gem.associatedPlanet}</span>
                  </div>
                </div>
              )}

              {gem.associatedZodiacSigns && gem.associatedZodiacSigns.length > 0 && (
                <div className="p-4 bg-amber-950/60 border border-amber-800/40 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-900/80 text-amber-400">
                    <Compass className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">Suitable Zodiac Rashi</span>
                    <span className="text-sm font-semibold text-amber-100">{gem.associatedZodiacSigns.join(', ')}</span>
                  </div>
                </div>
              )}

              {gem.recommendedMetal && (
                <div className="p-4 bg-amber-950/60 border border-amber-800/40 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-900/80 text-amber-400">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">Recommended Metal</span>
                    <span className="text-sm font-semibold text-amber-100">{gem.recommendedMetal}</span>
                  </div>
                </div>
              )}

              {gem.recommendedDay && (
                <div className="p-4 bg-amber-950/60 border border-amber-800/40 rounded-xl flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-amber-900/80 text-amber-400">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block">Wearing Day & Muhurat</span>
                    <span className="text-sm font-semibold text-amber-100">{gem.recommendedDay}</span>
                  </div>
                </div>
              )}
            </div>

            {/* Benefits Bullet Points */}
            {gem.benefits && gem.benefits.length > 0 && (
              <div className="bg-amber-950/50 p-5 rounded-2xl border border-amber-800/40 space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400">
                  Key Astrological & Personal Benefits:
                </h3>
                <ul className="space-y-2">
                  {gem.benefits.map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2 text-xs sm:text-sm text-amber-200/90">
                      <CheckCircle2 className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                      <span>{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Mantra if available */}
            {gem.traditionalMantra && (
              <div className="text-center bg-amber-900/40 p-4 rounded-xl border border-amber-700/40">
                <span className="text-[10px] text-amber-400 uppercase font-bold tracking-wider block mb-1">Traditional Activation Mantra</span>
                <p className="text-sm font-serif font-bold text-amber-200">{gem.traditionalMantra}</p>
              </div>
            )}

            {/* IMPORTANT Cultural Disclaimer Box */}
            <div className="p-4 bg-amber-950 border border-amber-800/60 rounded-xl text-center">
              <p className="text-[11px] text-amber-400/80 leading-relaxed font-light">
                <span className="font-semibold text-amber-300">Cultural & Traditional Disclaimer:</span> Gemstone and astrological recommendations are provided for traditional and cultural guidance and should not be considered scientific, medical, financial, or guaranteed outcomes.
              </p>
            </div>
          </div>
        </section>

        {/* 4. Related Gemstones ("You May Also Like") */}
        {relatedGems.length > 0 && (
          <section>
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-serif font-bold text-amber-100">
                  You May Also Like
                </h2>
                <p className="text-xs text-amber-300/80">Complementary Vedic gems and category highlights</p>
              </div>
              <Link
                to="/gemstones"
                className="text-xs text-amber-400 hover:text-amber-200 font-semibold flex items-center gap-1"
              >
                <span>View Full Catalog</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedGems.map((relGem) => (
                <GemstoneCard
                  key={relGem.id}
                  gem={relGem}
                  onSelect={(slug) => navigate(`/gemstones/${slug}`)}
                />
              ))}
            </div>
          </section>
        )}
      </div>
      </div>
    </>
  );
};
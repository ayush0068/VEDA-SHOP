import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles, ShieldCheck, ArrowRight, Compass, Star, CheckCircle2, ChevronLeft, ChevronRight,
  Award, Truck, Lock, Phone, HelpCircle, BookOpen, Heart, Flame, Gift, Video, Check
} from 'lucide-react';
import { CATEGORIES } from '../data/categories';
import { MOCK_PRODUCTS } from '../data/products';
import { RASHI_LIST } from '../data/rashiData';
import { PURPOSE_LIST } from '../data/purposeData';
import { ProductCard } from '../components/ProductCard';
import { VideoProductCard } from '../components/VideoProductCard';
import { FindMyProductModal } from '../components/FindMyProductModal';
import { HeroBannerSlider } from '../components/HeroBannerSlider';
import { Product } from '../types/ecommerce';

const REVIEWS = [
  {
    id: 'r1',
    customerName: 'Aarav Sharma',
    location: 'Varanasi, UP',
    rating: 5,
    date: 'August 2026',
    comment: 'Ordered 7 Mukhi Rudraksha and Citrine Bracelet. Received genuine Nepalese bead with official lab certificate. Highly trustworthy service from Veda Store!',
    productPurchased: '7 Mukhi Rudraksha & Citrine Bracelet'
  },
  {
    id: 'r2',
    customerName: 'Priya Patel',
    location: 'Ahmedabad, Gujarat',
    rating: 5,
    date: 'August 2026',
    comment: 'The Red Carnelian bracelet "Embrace the Fire Within" is stunning! Fast delivery across India and pristine packaging.',
    productPurchased: 'Red Carnelian Bracelet'
  },
  {
    id: 'r3',
    customerName: 'Rohan Deshmukh',
    location: 'Pune, Maharashtra',
    rating: 5,
    date: 'July 2026',
    comment: 'Bought Gauri Shankar Rudraksha for our home mandir. Received Prana Pratishtha energized bead. Truly authentic Veda Store quality.',
    productPurchased: 'Gauri Shankar Rudraksha'
  }
];

// Reusable Slider Component for Product Carousels with < > Controls and Auto-slide
const ProductSliderControls: React.FC<{
  title: string;
  subtitle?: string;
  products: Product[];
  showPrice?: boolean;
  linkTo?: string;
  linkText?: string;
  autoSlideInterval?: number;
}> = ({
  title,
  subtitle,
  products,
  showPrice = true,
  linkTo,
  linkText,
  autoSlideInterval = 3000
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const scroll = (direction: 'left' | 'right') => {
    if (containerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;

      if (direction === 'right' && scrollLeft + clientWidth >= scrollWidth - 15) {
        containerRef.current.scrollTo({ left: 0, behavior: 'smooth' });
      } else if (direction === 'left' && scrollLeft <= 15) {
        containerRef.current.scrollTo({ left: scrollWidth, behavior: 'smooth' });
      } else {
        containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  // Automatic infinite sliding loop
  useEffect(() => {
    if (isHovered || !products.length) return;

    const timer = setInterval(() => {
      scroll('right');
    }, autoSlideInterval);

    return () => clearInterval(timer);
  }, [isHovered, products, autoSlideInterval]);

  return (
    <div
      className="space-y-4"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-end justify-between border-b border-vedic-gold/20 pb-3">
        <div>
          {subtitle && (
            <span className="text-[11px] font-bold text-vedic-goldDark uppercase tracking-widest block">
              {subtitle}
            </span>
          )}
          <h3 className="font-serif font-extrabold text-xl md:text-3xl text-vedic-maroon mt-0.5">
            {title}
          </h3>
        </div>
        <div className="flex items-center gap-3">
          {linkTo && (
            <Link to={linkTo} className="hidden sm:inline-block text-xs font-bold text-vedic-maroon hover:underline uppercase tracking-wider">
              {linkText || 'View All →'}
            </Link>
          )}
          <div className="flex items-center space-x-1.5">
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

      <div
        ref={containerRef}
        className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-2 pt-1"
      >
        {products.map((p) => (
          <div key={p.id} className="w-[220px] sm:w-[260px] shrink-0">
            <ProductCard product={p} showPrice={showPrice} />
          </div>
        ))}
      </div>
    </div>
  );
};

const TRUST_ITEMS = [
  { icon: ShieldCheck, title: 'Authenticity Focused', subtitle: '100% Lab Certified' },
  { icon: Flame, title: 'Kashi Connection', subtitle: 'Blessed at Varanasi Ghats' },
  { icon: Award, title: 'Quality Checked', subtitle: 'Direct Nepalese Origin' },
  { icon: Lock, title: 'Secure Payments', subtitle: 'Encrypted Checkout' },
  { icon: Truck, title: 'Pan India Delivery', subtitle: 'Free Shipping Pan India' },
];

export const HomePage: React.FC = () => {
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [activeCategoryTab, setActiveCategoryTab] = useState<'bestsellers' | 'new' | 'trending'>('bestsellers');

  // Exact Selection: 5 Rudrakshas, 2 Gemstones, and 3 Bracelets for Best Sellers Carousel
  const rudrakshaList = MOCK_PRODUCTS.filter((p) => p.category === 'rudraksha');
  const gemstoneList = MOCK_PRODUCTS.filter((p) => p.category === 'gemstones');
  const braceletList = MOCK_PRODUCTS.filter((p) => p.category === 'bracelets');

  const selectedRudrakshas = rudrakshaList.slice(0, 5); // 5 Rudrakshas
  const selectedGemstones = gemstoneList.slice(0, 2);   // 2 Gemstones
  const selectedBracelets = braceletList.slice(0, 3);   // 3 Bracelets

  // Interleave for a dynamic, rich sliding showcase
  const bestSellers = [
    selectedRudrakshas[0], // 1 Mukhi Rudraksha
    selectedGemstones[0],  // Natural Ceylon Ruby Manik
    selectedBracelets[0],  // White Aura Quartz Bracelet
    selectedRudrakshas[1], // 2 Mukhi Rudraksha
    selectedGemstones[1],  // Natural Ceylon Yellow Sapphire Pukhraj
    selectedBracelets[1],  // Black Tourmaline Bracelet
    selectedRudrakshas[2], // 3 Mukhi Rudraksha
    selectedBracelets[2],  // Red Carnelian Bracelet
    selectedRudrakshas[3], // 4 Mukhi Rudraksha
    selectedRudrakshas[4], // 5 Mukhi Rudraksha
  ].filter(Boolean);

  const newArrivals = MOCK_PRODUCTS.slice(0, 8);
  const trendingNow = MOCK_PRODUCTS.slice(2, 10);

  const activeCategoryProducts =
    activeCategoryTab === 'new'
      ? newArrivals
      : activeCategoryTab === 'trending'
      ? trendingNow
      : bestSellers;

  const rudrakshaProducts = MOCK_PRODUCTS.filter((p) => p.category === 'rudraksha');
  const gemstoneProducts = MOCK_PRODUCTS.filter((p) => p.category === 'gemstones');
  const braceletProducts = MOCK_PRODUCTS.filter((p) => p.category === 'bracelets');
  const essentialProducts = MOCK_PRODUCTS.filter((p) => p.category === 'puja-samagri');
  const yantraProducts = MOCK_PRODUCTS.filter((p) => p.category === 'yantra');
  const pujaKitProducts = MOCK_PRODUCTS.filter((p) => p.category === 'puja-kits');
  const videoProducts = MOCK_PRODUCTS.slice(0, 4);

  return (
    <div className="space-y-16 pb-16 bg-[#FAF6F0] text-vedic-dark">
      {/* Recommendation Quiz Modal */}
      <FindMyProductModal isOpen={isQuizOpen} onClose={() => setIsQuizOpen(false)} />

      {/* 01. HERO SLIDER BANNER */}
      <HeroBannerSlider />

      {/* 02. TRUST STRIP BAR - SINGLE LINE CONTINUOUS SLIDER */}
      <section className="w-full bg-[#FFF5DE] border-y border-[#E9A331]/30 py-3.5 shadow-inner overflow-hidden relative">
        <div className="animate-marquee flex items-center gap-6 sm:gap-10 text-vedic-dark whitespace-nowrap">
          {[...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS, ...TRUST_ITEMS].map((item, index) => (
            <div key={index} className="flex items-center gap-2.5 shrink-0 bg-white/90 px-4 py-2 rounded-full border border-[#E9A331]/30 shadow-sm hover:border-[#E9A331] transition-colors">
              <item.icon className="w-4 h-4 sm:w-5 sm:h-5 text-[#E9A331] shrink-0" />
              <div className="flex items-center gap-1.5 text-xs sm:text-sm">
                <span className="font-serif font-bold text-vedic-brown">{item.title}</span>
                <span className="text-[#E9A331] font-bold">•</span>
                <span className="text-[11px] sm:text-xs text-vedic-muted font-medium">{item.subtitle}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03. OUR CATEGORIES + TABBED PRODUCTS (NEW ARRIVALS / BESTSELLERS / TRENDING NOW) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-1.5">
          <span className="text-xs font-bold text-[#E9A331] uppercase tracking-widest">
            Handpicked Sacred Collections
          </span>
          <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
            Our Categories
          </h2>
          <p className="text-xs md:text-sm text-vedic-muted">
            Explore authentic energized items sourced directly from Kashi & the Himalayas.
          </p>
        </div>

        {/* 3 Tabs Container: Desktop 3 tabs in 1 line, Mobile horizontal swipe */}
        <div className="bg-[#FFF5DE] p-2 rounded-2xl border border-[#E9A331]/30 shadow-inner max-w-3xl mx-auto">
          <div className="flex items-center justify-between overflow-x-auto no-scrollbar gap-2">
            {[
              { id: 'new', label: 'NEW ARRIVALS' },
              { id: 'bestsellers', label: 'BESTSELLERS' },
              { id: 'trending', label: 'TRENDING NOW' },
            ].map((tab) => {
              const isActive = activeCategoryTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveCategoryTab(tab.id as any)}
                  className={`flex-1 min-w-[140px] py-3 px-4 rounded-xl font-bold text-xs md:text-sm uppercase transition-all duration-300 shrink-0 text-center ${
                    isActive
                      ? 'bg-[#E9A331] text-vedic-dark shadow-md scale-[1.02]'
                      : 'text-vedic-dark/70 hover:text-vedic-dark hover:bg-white/50'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Tabbed Products Grid: Desktop 4-6 cards per row, Mobile 2 cards per row */}
        {/* Note: In this section, we show main product names without prices (showPrice={false}) */}
        <div className="transition-opacity duration-300 min-h-[340px]">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {activeCategoryProducts.map((product) => (
              <ProductCard key={product.id} product={product} showPrice={false} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to={
                activeCategoryTab === 'new'
                  ? '/shop?sort=newest'
                  : activeCategoryTab === 'trending'
                  ? '/shop?sort=popular'
                  : '/shop?filter=bestseller'
              }
              className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-8 py-3 rounded-full shadow-md transition-transform hover:scale-105"
            >
              <span>VIEW ALL {activeCategoryTab.toUpperCase()}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 04. BEST SELLERS PRODUCTS SLIDES < > */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-[#E9A331]/30 shadow-card">
          <ProductSliderControls
            title="Best Sellers Products"
            subtitle="Most Loved by Devotees"
            products={bestSellers}
            linkTo="/shop?filter=bestseller"
            linkText="EXPLORE ALL BEST SELLERS →"
            autoSlideInterval={2500}
          />
        </div>
      </section>

      {/* 05. NUMBERED FEATURE SECTION: 01. RUDRAKSHA */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Graphic Banner Image */}
        <Link
          to="/collections/rudraksha"
          className="block w-full overflow-hidden rounded-3xl border border-[#E9A331]/40 shadow-xl hover:scale-[1.01] transition-transform duration-300 group"
        >
          <img
            src="/images/banners/rudraksha-banner.png"
            alt="Authentic Rudraksha for Your Spiritual Journey - VEDA STORE"
            className="w-full h-auto object-cover rounded-3xl"
          />
        </Link>

        <div className="bg-[#FFF5DE] rounded-3xl p-6 md:p-10 border border-[#E9A331]/40 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Text details */}
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-black text-[#E9A331] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#E9A331]/30">
                01. RUDRAKSHA
              </span>
              <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
                Find the Right Rudraksha for You
              </h2>
              <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed font-light">
                Explore carefully selected Rudraksha sourced with attention to authenticity, quality and traditional Vedic knowledge. Whether you seek a Mala, Bracelet or specific Mukhi Rudraksha, discover options suited to your spiritual practice with personalized guidance from our Vedic experts.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Personalized Consultation',
                  'Rudraksha Recommendation',
                  'Exclusive Discounts',
                  'Authenticity & Quality',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-vedic-dark bg-white/80 p-2.5 rounded-xl border border-[#E9A331]/20">
                    <Check className="w-4 h-4 text-[#E9A331] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/collections/rudraksha"
                  className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  FIND YOUR RUDRAKSHA →
                </Link>
              </div>
            </div>

            {/* Rudraksha Graphic & Slider Container */}
            <div className="lg:col-span-7">
              <ProductSliderControls
                title="Rudraksha Collection"
                subtitle="Explore All Rudraksha"
                products={rudrakshaProducts}
                linkTo="/collections/rudraksha"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 06. NUMBERED FEATURE SECTION: 02. GEMSTONE */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Graphic Banner Image */}
        <Link
          to="/gemstones"
          className="block w-full overflow-hidden rounded-3xl border border-[#E9A331]/40 shadow-xl hover:scale-[1.01] transition-transform duration-300 group"
        >
          <img
            src="/images/banners/gemstones-banner.png"
            alt="Discover the Right Gemstone for Your Journey - VEDA STORE"
            className="w-full h-auto object-cover rounded-3xl"
          />
        </Link>

        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E9A331]/40 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-black text-[#E9A331] uppercase tracking-widest bg-[#FFF5DE] px-3 py-1 rounded-full border border-[#E9A331]/30">
                02. GEMSTONE
              </span>
              <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
                Discover Your Ideal Gemstone
              </h2>
              <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed font-light">
                Explore natural gemstones selected with care for quality, authenticity and traditional Vedic astrology. From individual gemstones to rings and pendants, discover options based on your preferences and receive guidance to help you make a more informed choice.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Personalized Gemstone Guidance',
                  'Natural & Quality-Focused Selection',
                  'Certified Options',
                  'Exclusive Collections',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-vedic-dark bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E9A331]/20">
                    <Check className="w-4 h-4 text-[#E9A331] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/gemstones"
                  className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  EXPLORE GEMSTONES →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductSliderControls
                title="Natural Gemstones"
                subtitle="Certified Astrology Gemstones"
                products={gemstoneProducts}
                linkTo="/gemstones"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 07. NUMBERED FEATURE SECTION: 03. BRACELETS */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        {/* Graphic Banner Image */}
        <Link
          to="/collections/bracelets"
          className="block w-full overflow-hidden rounded-3xl border border-[#E9A331]/40 shadow-xl hover:scale-[1.01] transition-transform duration-300 group"
        >
          <img
            src="/images/banners/bracelets-banner.png"
            alt="Spiritual Bracelets, Made for Your Journey - VEDA STORE"
            className="w-full h-auto object-cover rounded-3xl"
          />
        </Link>

        <div className="bg-[#FFF5DE] rounded-3xl p-6 md:p-10 border border-[#E9A331]/40 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-black text-[#E9A331] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#E9A331]/30">
                03. BRACELETS
              </span>
              <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
                Wear Your Spiritual Style
              </h2>
              <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed font-light">
                Discover thoughtfully designed bracelets combining spiritual tradition with everyday style. Explore Rudraksha, gemstone, crystal and spiritual bracelets in a range of designs created for daily wear, gifting and personal spiritual practice.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Rudraksha Bracelets',
                  'Gemstone & Crystal Bracelets',
                  'Everyday Spiritual Wear',
                  'Exclusive Designs',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-vedic-dark bg-white/80 p-2.5 rounded-xl border border-[#E9A331]/20">
                    <Check className="w-4 h-4 text-[#E9A331] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/collections/bracelets"
                  className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  EXPLORE BRACELETS →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductSliderControls
                title="Spiritual Bracelets"
                subtitle="Rudraksha & Healing Crystals"
                products={braceletProducts}
                linkTo="/collections/bracelets"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 08. NUMBERED FEATURE SECTION: 04. SPIRITUAL ESSENTIALS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E9A331]/40 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-black text-[#E9A331] uppercase tracking-widest bg-[#FFF5DE] px-3 py-1 rounded-full border border-[#E9A331]/30">
                04. SPIRITUAL ESSENTIALS
              </span>
              <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
                Bring Spirituality Into Everyday Life
              </h2>
              <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed font-light">
                Discover essential products for your daily puja, meditation and spiritual practices. From incense and diyas to malas, puja accessories and sacred essentials, find thoughtfully selected products for creating a meaningful spiritual space at home.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Daily Puja Essentials',
                  'Dhoop, Incense & Fragrance',
                  'Japa & Meditation Essentials',
                  'Sacred Accessories',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-vedic-dark bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E9A331]/20">
                    <Check className="w-4 h-4 text-[#E9A331] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/collections/spiritual-essentials"
                  className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  EXPLORE SPIRITUAL ESSENTIALS →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductSliderControls
                title="Spiritual Essentials"
                subtitle="Puja, Incense & Meditation"
                products={essentialProducts}
                linkTo="/collections/spiritual-essentials"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 09. NUMBERED FEATURE SECTION: 05. YANTRAS */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#FFF5DE] rounded-3xl p-6 md:p-10 border border-[#E9A331]/40 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-black text-[#E9A331] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#E9A331]/30">
                05. YANTRAS
              </span>
              <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
                Explore Sacred Symbols & Traditions
              </h2>
              <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed font-light">
                Discover traditional Yantras associated with deities, planetary energies, prosperity, protection and spiritual practices. Explore carefully crafted Yantras along with meaningful guidance about their traditional significance and methods of worship.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Deity Yantras',
                  'Navgraha Yantras',
                  'Vastu Yantras',
                  'Puja & Energization Services',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-vedic-dark bg-white/80 p-2.5 rounded-xl border border-[#E9A331]/20">
                    <Check className="w-4 h-4 text-[#E9A331] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/collections/yantra"
                  className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  EXPLORE YANTRAS →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductSliderControls
                title="Sacred Yantras"
                subtitle="Deity & Planetary Geometry"
                products={yantraProducts}
                linkTo="/collections/yantra"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 10. NUMBERED FEATURE SECTION: 06. PUJA KIT */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-[#E9A331]/40 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-black text-[#E9A331] uppercase tracking-widest bg-[#FFF5DE] px-3 py-1 rounded-full border border-[#E9A331]/30">
                06. PUJA KIT
              </span>
              <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
                Everything You Need for Your Puja
              </h2>
              <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed font-light">
                Make your traditional rituals simpler with thoughtfully assembled Puja Kits. From daily worship to festivals and special occasions, find essential samagri and accessories conveniently brought together in one complete collection.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Daily Puja Kits',
                  'Festival Puja Kits',
                  'Special Occasion Kits',
                  'Carefully Selected Samagri',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-vedic-dark bg-[#FAF6F0] p-2.5 rounded-xl border border-[#E9A331]/20">
                    <Check className="w-4 h-4 text-[#E9A331] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/collections/puja-kits"
                  className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  SHOP PUJA KITS →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7">
              <ProductSliderControls
                title="Complete Ritual Kits"
                subtitle="Authentic Worship Samagri"
                products={pujaKitProducts}
                linkTo="/collections/puja-kits"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 11. SHOP BY RASHI (ZODIAC SIGN) */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-[#E9A331] uppercase tracking-widest flex items-center justify-center gap-1">
            <Compass className="w-4 h-4 text-[#E9A331]" /> Zodiac Guidance
          </span>
          <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
            Shop by Rashi (Zodiac Sign)
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {RASHI_LIST.map((r) => (
            <Link
              key={r.id}
              to={`/rashi/${r.slug}`}
              className="p-4 rounded-2xl bg-white border border-[#E9A331]/20 shadow-card hover:shadow-card-hover hover:border-[#E9A331] transition-all duration-300 flex items-center gap-3 group"
            >
              <span className="text-3xl text-[#E9A331] font-serif shrink-0">{r.symbol}</span>
              <div className="flex-1 min-w-0">
                <h3 className="font-serif font-bold text-sm text-vedic-dark group-hover:text-vedic-maroon truncate">
                  {r.nameEn}
                </h3>
                <p className="text-[11px] text-vedic-muted truncate">{r.nameHi}</p>
                <span className="text-[10px] text-[#E9A331] font-semibold block mt-0.5">Explore →</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 12. CUSTOMERS VIDEO REVIEWS */}
      <section className="bg-vedic-maroon text-vedic-ivory py-14 border-y-4 border-[#E9A331]">
        <div className="max-w-7xl mx-auto px-4 space-y-8">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-bold text-[#F5B041] uppercase tracking-widest flex items-center justify-center gap-1">
              <Video className="w-4 h-4 text-[#F5B041]" /> Customer Experiences
            </span>
            <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-[#FFF5DE]">
              Customers Video Reviews
            </h2>
            <p className="text-xs text-[#F5B041]">
              Watch honest video reviews from devotees across India sharing their genuine experiences.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {videoProducts.map((p) => (
              <VideoProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* 13. SHOP BY NEED */}
      <section className="max-w-7xl mx-auto px-4 space-y-6" id="shop-by-purpose">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-[#E9A331] uppercase tracking-widest">
            Goal Based
          </span>
          <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
            Shop by Need
          </h2>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {PURPOSE_LIST.map((p) => (
            <Link
              key={p.id}
              to={`/purpose/${p.slug}`}
              className="p-5 rounded-2xl bg-white border border-[#E9A331]/20 shadow-card hover:shadow-card-hover hover:border-[#E9A331] transition-all duration-300 flex flex-col justify-between h-32 group"
            >
              <div>
                <h3 className="font-serif font-bold text-base text-vedic-dark group-hover:text-vedic-maroon">
                  {p.name}
                </h3>
                <p className="text-xs text-[#E9A331] font-semibold mt-0.5">{p.hindiName}</p>
              </div>
              <span className="text-xs font-bold text-vedic-maroon flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Browse Items <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* 14. NUMBERED FEATURE SECTION: 07. BLOG */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-[#FFF5DE] rounded-3xl p-6 md:p-10 border border-[#E9A331]/40 shadow-card space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-5 space-y-4">
              <span className="inline-block text-xs font-black text-[#E9A331] uppercase tracking-widest bg-white px-3 py-1 rounded-full border border-[#E9A331]/30">
                07. BLOG
              </span>
              <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
                Learn. Explore. Practice.
              </h2>
              <p className="text-xs md:text-sm text-vedic-charcoal leading-relaxed font-light">
                Discover practical knowledge and timeless insights on Vedic astrology, Rudraksha, gemstones, Yantras, Puja, Mantras, festivals and spiritual traditions. Learn the significance behind the practices and make more informed choices for your spiritual journey.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                {[
                  'Vedic Knowledge',
                  'Astrology & Remedies',
                  'Puja & Mantra Guides',
                  'Rudraksha & Gemstone Insights',
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs font-semibold text-vedic-dark bg-white/80 p-2.5 rounded-xl border border-[#E9A331]/20">
                    <Check className="w-4 h-4 text-[#E9A331] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="pt-3">
                <Link
                  to="/blog"
                  className="inline-flex items-center gap-2 bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs md:text-sm px-7 py-3.5 rounded-full shadow-lg transition-transform hover:scale-105"
                >
                  EXPLORE THE BLOG →
                </Link>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link to="/guides/rudraksha" className="p-6 bg-white rounded-2xl border border-[#E9A331]/30 shadow-card hover:border-[#E9A331] transition-all space-y-2 group">
                <span className="text-[10px] font-bold text-[#E9A331] uppercase">Rudraksha Insights</span>
                <h3 className="font-serif font-bold text-base text-vedic-dark group-hover:text-vedic-maroon">Rudraksha Buying & Care Guide</h3>
                <p className="text-xs text-vedic-muted leading-relaxed">Learn how to choose original 1 to 14 Mukhi Rudraksha beads and their authentic Vedic benefits.</p>
                <span className="text-xs font-bold text-vedic-maroon block pt-1">Read Article →</span>
              </Link>
              <Link to="/guides/gemstone" className="p-6 bg-white rounded-2xl border border-[#E9A331]/30 shadow-card hover:border-[#E9A331] transition-all space-y-2 group">
                <span className="text-[10px] font-bold text-[#E9A331] uppercase">Gemstone Insights</span>
                <h3 className="font-serif font-bold text-base text-vedic-dark group-hover:text-vedic-maroon">Astrology Gemstone Selection</h3>
                <p className="text-xs text-vedic-muted leading-relaxed">Understand which gemstone suits your planetary chart, wearing rules, and lab certification.</p>
                <span className="text-xs font-bold text-vedic-maroon block pt-1">Read Article →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 15. CUSTOMER REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 space-y-6">
        <div className="text-center max-w-xl mx-auto space-y-1">
          <span className="text-xs font-bold text-[#E9A331] uppercase tracking-widest">
            What People Say
          </span>
          <h2 className="font-serif font-extrabold text-2xl md:text-4xl text-vedic-maroon">
            Customer Reviews
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="bg-white rounded-3xl p-6 border border-[#E9A331]/20 shadow-card flex flex-col justify-between">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(rev.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-current" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Verified Purchase
                  </span>
                </div>
                <p className="text-xs text-vedic-charcoal italic leading-relaxed">"{rev.comment}"</p>
              </div>
              <div className="mt-4 pt-3 border-t border-vedic-beige">
                <h4 className="font-serif font-bold text-sm text-vedic-brown">{rev.customerName}</h4>
                <p className="text-[10px] text-vedic-muted">{rev.location}</p>
                <p className="text-[10px] font-semibold text-[#E9A331] mt-0.5">Purchased: {rev.productPurchased}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 16. NEWSLETTER & ASTROLOGER CONSULTATION */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="bg-vedic-brown text-vedic-ivory rounded-3xl p-8 md:p-12 border border-[#E9A331]/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E9A331] uppercase tracking-widest">
              <Phone className="w-4 h-4" /> Free Vedic Guidance
            </span>
            <h3 className="font-serif font-extrabold text-2xl md:text-4xl text-[#FFF5DE]">
              Need Help Choosing the Right Product?
            </h3>
            <p className="text-xs md:text-sm text-gray-300 font-light leading-relaxed">
              Consult with experienced Vedic astrologers to discover which Rudraksha or Gemstone matches your Kundali and energy goals.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              to="/contact?subject=Vedic%20Astrology%20Consultation"
              className="bg-[#E9A331] hover:bg-[#F5B041] text-vedic-dark font-serif font-bold text-xs px-6 py-3.5 rounded-full shadow-lg hover:scale-105 transition-transform flex items-center justify-center gap-2"
            >
              CONSULT AN ASTROLOGER
            </Link>
            <button
              onClick={() => setIsQuizOpen(true)}
              className="bg-white/10 text-white border border-white/30 font-bold text-xs px-6 py-3.5 rounded-full hover:bg-white/20 transition-all"
            >
              RECOMMENDATION QUIZ
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

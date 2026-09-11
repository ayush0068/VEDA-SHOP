import React, { useState, useEffect } from 'react';
import { ShieldCheck, Truck, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const ANNOUNCEMENTS = [
  'FREE SHIPPING | PAN INDIA (Free shipping on all orders)',
  'Recommended by Astrologers / Energized by Experts / Free Shipping Pan India',
  'Shop Authentic Energized Nepali Rudraksha – Direct from the Himalayas',
];

export const AnnouncementBar: React.FC = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % ANNOUNCEMENTS.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-vedic-brown text-vedic-goldLight text-xs py-2 px-4 border-b border-vedic-gold/30">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left Trust Statement */}
        <div className="hidden lg:flex items-center space-x-4 text-[11px] font-medium tracking-wide">
          <span className="flex items-center gap-1 text-vedic-ivory">
            <ShieldCheck className="w-3.5 h-3.5 text-vedic-gold" /> Kashi Heritage
          </span>
          <span className="flex items-center gap-1 text-vedic-ivory">
            <Sparkles className="w-3.5 h-3.5 text-vedic-gold" /> Lab Certified
          </span>
        </div>

        {/* Dynamic Carousel Message */}
        <div className="flex-1 flex justify-center items-center font-medium">
          <span className="flex items-center gap-2 text-center text-xs md:text-sm">
            <Truck className="w-4 h-4 text-vedic-gold shrink-0 animate-pulse" />
            <span className="text-vedic-ivory">{ANNOUNCEMENTS[index]}</span>
          </span>
        </div>

        {/* Quick Action CTA */}
        <Link
          to="/shop"
          className="bg-vedic-gold hover:bg-vedic-goldDark text-vedic-dark font-bold text-[10px] md:text-[11px] px-3 py-1 rounded-full flex items-center gap-1 transition-transform hover:scale-105 shadow-sm shrink-0"
        >
          <span>EXPLORE</span>
          <ArrowRight className="w-3 h-3" />
        </Link>
      </div>
    </div>
  );
};

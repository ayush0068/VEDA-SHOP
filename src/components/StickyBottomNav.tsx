import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Grid, Search, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

interface StickyBottomNavProps {
  onOpenSearch?: () => void;
}

export const StickyBottomNav: React.FC<StickyBottomNavProps> = ({ onOpenSearch }) => {
  const { pathname } = useLocation();
  const { totalItems, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();

  const NAV_ITEMS = [
    { label: 'Home', path: '/', icon: Home },
    { label: 'Shop', path: '/shop', icon: Grid },
    { label: 'Search', path: '/search', icon: Search, isAction: true },
    { label: 'Wishlist', path: '/wishlist', icon: Heart, badge: wishlistCount },
    { label: 'Cart', path: '/cart', icon: ShoppingBag, badge: totalItems, isCart: true },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-vedic-gold/30 shadow-2xl md:hidden px-2 py-1.5">
      <div className="flex items-center justify-around">
        {NAV_ITEMS.map((item, idx) => {
          const Icon = item.icon;
          const isActive = pathname === item.path;

          if (item.isCart) {
            return (
              <button
                key={idx}
                onClick={() => setIsCartOpen(true)}
                className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                  isActive ? 'text-vedic-maroon font-bold' : 'text-vedic-dark hover:text-vedic-maroon'
                }`}
              >
                <div className="relative">
                  <Icon className="w-5 h-5" />
                  {item.badge > 0 && (
                    <span className="absolute -top-1.5 -right-2.5 bg-vedic-maroon text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                      {item.badge}
                    </span>
                  )}
                </div>
                <span className="text-[10px] font-medium mt-0.5">{item.label}</span>
              </button>
            );
          }

          return (
            <Link
              key={idx}
              to={item.path}
              className={`relative flex flex-col items-center justify-center flex-1 py-1 transition-colors ${
                isActive ? 'text-vedic-maroon font-bold' : 'text-vedic-dark hover:text-vedic-maroon'
              }`}
            >
              <div className="relative">
                <Icon className={`w-5 h-5 ${isActive ? 'text-vedic-maroon scale-110' : ''}`} />
                {item.badge !== undefined && item.badge > 0 && (
                  <span className="absolute -top-1.5 -right-2.5 bg-vedic-maroon text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </div>
              <span className={`text-[10px] ${isActive ? 'font-bold text-vedic-maroon' : 'font-medium'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

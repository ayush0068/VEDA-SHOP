import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { User, Package, MapPin, Heart, LogOut, Sparkles } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

export const AccountPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'addresses'>('profile');
  const { wishlistCount } = useWishlist();

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'My Account' }]} />

      <div className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-card flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-vedic-maroon text-vedic-gold flex items-center justify-center font-bold font-serif text-xl border-2 border-vedic-gold">
          YS
        </div>
        <div>
          <h1 className="font-serif font-extrabold text-xl text-vedic-maroon">Yash Sharma</h1>
          <p className="text-xs text-vedic-muted">yash@example.com • Member since 2026</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-start">
        {/* Navigation Sidebar */}
        <div className="bg-white rounded-3xl p-4 border border-vedic-gold/20 shadow-card space-y-1">
          <button
            onClick={() => setActiveTab('profile')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'profile' ? 'bg-vedic-maroon text-white' : 'text-vedic-dark hover:bg-vedic-ivory'
            }`}
          >
            <User className="w-4 h-4 text-vedic-gold" /> Personal Profile
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'orders' ? 'bg-vedic-maroon text-white' : 'text-vedic-dark hover:bg-vedic-ivory'
            }`}
          >
            <Package className="w-4 h-4 text-vedic-gold" /> My Orders History
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold transition-colors ${
              activeTab === 'addresses' ? 'bg-vedic-maroon text-white' : 'text-vedic-dark hover:bg-vedic-ivory'
            }`}
          >
            <MapPin className="w-4 h-4 text-vedic-gold" /> Saved Delivery Addresses
          </button>
          <Link
            to="/wishlist"
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-bold text-vedic-dark hover:bg-vedic-ivory"
          >
            <Heart className="w-4 h-4 text-vedic-gold" /> Wishlist ({wishlistCount})
          </Link>
        </div>

        {/* Content Area */}
        <div className="md:col-span-3 bg-white rounded-3xl p-6 md:p-8 border border-vedic-gold/20 shadow-card space-y-6">
          {activeTab === 'profile' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-vedic-maroon border-b border-vedic-beige pb-3">
                Account Details
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-vedic-ivory rounded-xl">
                  <span className="text-vedic-muted font-medium block">Full Name:</span>
                  <span className="font-bold text-vedic-dark">Yash Sharma</span>
                </div>
                <div className="p-3 bg-vedic-ivory rounded-xl">
                  <span className="text-vedic-muted font-medium block">Email Address:</span>
                  <span className="font-bold text-vedic-dark">yash@example.com</span>
                </div>
                <div className="p-3 bg-vedic-ivory rounded-xl">
                  <span className="text-vedic-muted font-medium block">Phone Number:</span>
                  <span className="font-bold text-vedic-dark">+91 98765 43210</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <h3 className="font-serif font-bold text-base text-vedic-maroon border-b border-vedic-beige pb-3">
                Recent Orders
              </h3>
              <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold font-mono text-vedic-maroon block">Order #VA-ORD-849201</span>
                  <span className="text-vedic-muted">Placed on Aug 27, 2026 • 2 Items</span>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-vedic-dark block">₹1,998</span>
                  <Link to="/track-order?id=VA-ORD-849201" className="text-vedic-goldDark font-bold hover:underline">
                    Track Package →
                  </Link>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'addresses' && (
            <div className="space-y-4 text-xs">
              <h3 className="font-serif font-bold text-base text-vedic-maroon border-b border-vedic-beige pb-3">
                Saved Address
              </h3>
              <div className="p-4 bg-vedic-ivory rounded-2xl border border-vedic-gold/20">
                <span className="font-bold text-vedic-dark block">Yash Sharma (Default)</span>
                <p className="text-vedic-muted mt-1">
                  Flat 402, Lotus Towers, MG Road, Connaught Place, New Delhi - 110001
                </p>
                <p className="text-vedic-muted mt-1">Phone: +91 98765 43210</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

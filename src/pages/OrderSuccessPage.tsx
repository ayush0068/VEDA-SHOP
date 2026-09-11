import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, Package, ArrowRight, Printer } from 'lucide-react';

export const OrderSuccessPage: React.FC = () => {
  const location = useLocation();
  const state = location.state || {};
  const orderId = state.orderId || `VA-ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  const grandTotal = state.grandTotal || 1299;

  return (
    <div className="max-w-3xl mx-auto px-4 py-12 text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-lg">
        <CheckCircle2 className="w-12 h-12" />
      </div>

      <div className="space-y-2">
        <span className="inline-flex items-center gap-1.5 text-xs font-bold text-vedic-gold bg-vedic-maroon px-3 py-1 rounded-full">
          <Sparkles className="w-3.5 h-3.5" /> Order Successfully Placed & Consecrated
        </span>
        <h1 className="font-serif font-extrabold text-3xl md:text-4xl text-vedic-maroon">
          Thank You For Your Divine Purchase!
        </h1>
        <p className="text-xs text-vedic-muted">
          Your order has been registered and is being prepared for traditional Prana Pratishtha ritual before dispatch.
        </p>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-vedic-gold/30 shadow-card text-left space-y-4 max-w-lg mx-auto">
        <div className="flex justify-between items-center border-b border-vedic-beige pb-3 text-xs font-bold">
          <span className="text-vedic-muted">Order Reference:</span>
          <span className="text-vedic-maroon font-mono">{orderId}</span>
        </div>

        <div className="space-y-1 text-xs">
          <div className="flex justify-between">
            <span className="text-vedic-muted">Estimated Express Delivery:</span>
            <span className="font-bold text-vedic-dark">3 - 5 Business Days</span>
          </div>
          <div className="flex justify-between">
            <span className="text-vedic-muted">Payment Status:</span>
            <span className="font-bold text-emerald-700">Confirmed (Secure)</span>
          </div>
          <div className="flex justify-between text-sm font-extrabold text-vedic-maroon pt-2 border-t border-vedic-beige">
            <span>Total Paid:</span>
            <span>₹{grandTotal.toLocaleString('en-IN')}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <Link
          to={`/track-order?id=${orderId}`}
          className="bg-vedic-maroon text-vedic-ivory px-7 py-3 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroonDark transition-colors flex items-center gap-2"
        >
          <Package className="w-4 h-4 text-vedic-gold" /> Track Live Order Status
        </Link>
        <Link
          to="/"
          className="bg-white text-vedic-dark border border-vedic-gold/40 px-6 py-3 rounded-full text-xs font-bold hover:bg-vedic-ivory transition-colors"
        >
          Continue Spiritual Shopping
        </Link>
      </div>
    </div>
  );
};

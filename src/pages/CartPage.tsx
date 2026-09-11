import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Breadcrumb } from '../components/Breadcrumb';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    grandTotal,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [couponMsg, setCouponMsg] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();

  const handleCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const res = applyCoupon(couponInput);
    setCouponMsg(res);
    if (res.success) setCouponInput('');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-vedic-gold/10 text-vedic-gold flex items-center justify-center mx-auto">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif font-extrabold text-2xl md:text-3xl text-vedic-maroon">
          Your Sacred Cart is Empty
        </h1>
        <p className="text-xs text-vedic-muted max-w-sm mx-auto">
          Explore our certified Rudraksha beads, crystal energy bracelets, and Vastu decor.
        </p>
        <Link
          to="/shop"
          className="inline-block bg-vedic-maroon text-vedic-ivory px-8 py-3 rounded-full text-xs font-bold shadow-lg hover:bg-vedic-maroonDark transition-colors"
        >
          Explore All Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumb items={[{ label: 'Shopping Bag' }]} />

      <h1 className="font-serif font-extrabold text-2xl md:text-3xl text-vedic-maroon">
        Your Shopping Bag ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Cart Item List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => {
            const price = item.selectedVariant ? item.selectedVariant.price : item.product.price;
            return (
              <div
                key={`${item.product.id}-${item.selectedSize}`}
                className="bg-white rounded-3xl p-4 border border-vedic-gold/20 shadow-card flex gap-4 items-center"
              >
                <img
                  src={item.product.images[0]}
                  alt={item.product.title}
                  className="w-24 h-24 object-cover rounded-2xl border border-vedic-gold/20 shrink-0"
                />

                <div className="flex-1 min-w-0 space-y-1">
                  <Link
                    to={`/products/${item.product.slug}`}
                    className="font-serif font-bold text-sm text-vedic-dark hover:text-vedic-maroon line-clamp-1"
                  >
                    {item.product.title}
                  </Link>
                  {item.selectedSize && (
                    <p className="text-[11px] text-vedic-muted">Size: {item.selectedSize}</p>
                  )}
                  {item.product.labCertified && (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                      <ShieldCheck className="w-3 h-3" /> Lab Certified
                    </span>
                  )}
                  <div className="text-sm font-extrabold text-vedic-maroon pt-1">
                    ₹{(price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>

                <div className="flex flex-col items-end gap-3 shrink-0">
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-gray-400 hover:text-red-600 p-1"
                    title="Remove Item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>

                  <div className="flex items-center border border-vedic-gold/30 rounded-xl bg-vedic-ivory">
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                      className="px-2.5 py-1 text-vedic-dark hover:text-vedic-maroon font-bold"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-2 text-xs font-bold text-vedic-dark">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                      className="px-2.5 py-1 text-vedic-dark hover:text-vedic-maroon font-bold"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Order Summary Side Panel */}
        <div className="bg-white rounded-3xl p-6 border border-vedic-gold/20 shadow-card space-y-6">
          <h3 className="font-serif font-bold text-lg text-vedic-maroon border-b border-vedic-beige pb-3">
            Order Summary
          </h3>

          {/* Coupon Code Form */}
          <div className="space-y-2">
            {!appliedCoupon ? (
              <form onSubmit={handleCouponSubmit} className="flex gap-2">
                <input
                  type="text"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  placeholder="Coupon Code (e.g. VEDIC10)"
                  className="flex-1 px-3 py-2 text-xs bg-vedic-ivory rounded-xl border border-vedic-gold/30 uppercase focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-vedic-goldDark text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-vedic-maroon"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between bg-emerald-50 p-2.5 rounded-xl text-xs font-bold text-emerald-800 border border-emerald-200">
                <span>Applied: {appliedCoupon}</span>
                <button onClick={removeCoupon} className="text-red-600 text-[11px] underline">
                  Remove
                </button>
              </div>
            )}
            {couponMsg && !appliedCoupon && (
              <p className={`text-[11px] font-medium ${couponMsg.success ? 'text-emerald-700' : 'text-red-600'}`}>
                {couponMsg.message}
              </p>
            )}
          </div>

          <div className="space-y-2 text-xs text-vedic-dark border-t border-vedic-beige pt-3">
            <div className="flex justify-between">
              <span className="text-vedic-muted">Subtotal</span>
              <span className="font-bold">₹{subtotal.toLocaleString('en-IN')}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-700 font-bold">
                <span>Coupon Savings</span>
                <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-vedic-muted">Express Shipping</span>
              <span className="font-bold">
                {shippingFee === 0 ? <span className="text-emerald-700">FREE</span> : `₹${shippingFee}`}
              </span>
            </div>
            <div className="flex justify-between text-base font-extrabold text-vedic-maroon pt-3 border-t border-vedic-beige">
              <span>Total Payable</span>
              <span>₹{grandTotal.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <button
            onClick={() => navigate('/checkout')}
            className="w-full bg-gold-gradient text-vedic-dark py-4 rounded-full font-serif font-bold text-sm shadow-xl hover:brightness-105 transition-all flex items-center justify-center gap-2"
          >
            Proceed to Checkout <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

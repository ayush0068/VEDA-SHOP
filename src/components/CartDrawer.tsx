import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Trash2, Plus, Minus, ShoppingBag, Sparkles, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    subtotal,
    discountAmount,
    shippingFee,
    freeShippingThreshold,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    grandTotal,
  } = useCart();

  const [couponCode, setCouponCode] = useState('');
  const [couponFeedback, setCouponFeedback] = useState<{ success: boolean; message: string } | null>(null);
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    const res = applyCoupon(couponCode);
    setCouponFeedback(res);
    if (res.success) setCouponCode('');
  };

  const handleCheckoutProceed = () => {
    setIsCartOpen(false);
    navigate('/checkout');
  };

  const freeShippingNeeded = freeShippingThreshold - subtotal;
  const freeShippingProgress = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-vedic-ivory h-full shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="bg-vedic-maroon text-vedic-ivory p-4 flex items-center justify-between border-b border-vedic-gold/30">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-vedic-gold" />
            <h3 className="font-serif font-bold text-lg text-vedic-goldLight">Your Sacred Cart</h3>
            <span className="text-xs bg-vedic-gold/20 text-vedic-gold px-2 py-0.5 rounded-full font-bold">
              {cart.reduce((sum, item) => sum + item.quantity, 0)} items
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-1.5 hover:bg-vedic-maroonLight rounded-full text-vedic-gold transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="bg-vedic-beige/80 p-3 border-b border-vedic-gold/20 text-center">
          {freeShippingNeeded > 0 ? (
            <p className="text-xs text-vedic-dark font-medium">
              Add <span className="font-bold text-vedic-maroon">₹{freeShippingNeeded.toLocaleString('en-IN')}</span> more for <span className="font-bold text-vedic-goldDark">FREE Shipping!</span>
            </p>
          ) : (
            <p className="text-xs font-bold text-emerald-700 flex items-center justify-center gap-1">
              <Sparkles className="w-4 h-4 text-vedic-gold" /> You’ve Unlocked FREE Express Shipping!
            </p>
          )}
          <div className="w-full bg-gray-200 h-2 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-gold-gradient h-full transition-all duration-500 rounded-full"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Recommended Add-ons Section as per Section 33 */}
        {cart.length > 0 && (
          <div className="bg-vedic-ivory p-3 border-b border-vedic-gold/20 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-vedic-gold shrink-0" />
              <div>
                <div className="font-bold text-vedic-brown">Kashi Gangajal & Energization</div>
                <div className="text-[10px] text-vedic-muted">Sacred blessing package (₹199)</div>
              </div>
            </div>
            <button
              onClick={() => {
                const gangajalProd = {
                  id: 'prod-gangajal-addon',
                  title: 'Pure Kashi Sacred Gangajal (100ml)',
                  slug: 'kashi-gangajal',
                  category: 'puja-samagri',
                  description: 'Sealed sacred Gangajal from Kashi ghats.',
                  shortDescription: 'Sealed holy water from Varanasi ghats.',
                  images: ['https://images.unsplash.com/photo-1609357605129-26f69add5d6e?auto=format&fit=crop&q=80&w=400'],
                  price: 199,
                  compareAtPrice: 299,
                  discount: 33,
                  rating: 5.0,
                  reviewCount: 95,
                  sku: 'VS-ACC-001',
                  stock: 100,
                  tags: ['gangajal', 'kashi', 'puja'],
                  benefits: ['Sacred cleansing'],
                  labCertified: false
                };
                // Use cart addToCart logic indirectly or notify
                window.location.href = '/products/1-mukhi-rudraksha';
              }}
              className="bg-vedic-gold hover:bg-vedic-goldDark text-vedic-dark font-bold text-[10px] px-3 py-1 rounded-full shadow-sm"
            >
              + ADD ₹199
            </button>
          </div>
        )}

        {/* Cart Item List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
              <div className="w-16 h-16 rounded-full bg-vedic-gold/10 flex items-center justify-center text-vedic-gold">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h4 className="font-serif font-bold text-lg text-vedic-maroon">Your Cart is Empty</h4>
              <p className="text-xs text-vedic-muted max-w-xs">
                Explore our authentic Rudraksha, protection bracelets, and Vastu crystals to invite divine vibrations.
              </p>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/shop');
                }}
                className="bg-vedic-maroon text-vedic-ivory px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroonDark transition-colors"
              >
                Explore Spiritual Shop
              </button>
            </div>
          ) : (
            cart.map((item) => {
              const itemPrice = item.selectedVariant ? item.selectedVariant.price : item.product.price;
              const comparePrice = item.selectedVariant ? item.selectedVariant.compareAtPrice : item.product.compareAtPrice;
              return (
                <div
                  key={`${item.product.id}-${item.selectedSize}`}
                  className="flex gap-3 bg-white p-3 rounded-2xl border border-vedic-gold/20 shadow-sm relative group"
                >
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-20 h-20 object-cover rounded-xl border border-vedic-gold/20 shrink-0"
                  />
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <h4 className="text-xs font-bold text-vedic-dark line-clamp-2 pr-6">
                        {item.product.title}
                      </h4>
                      {item.selectedSize && (
                        <p className="text-[10px] text-vedic-muted">Size: {item.selectedSize}</p>
                      )}
                      {item.product.labCertified && (
                        <span className="inline-flex items-center gap-1 text-[9px] text-emerald-700 font-semibold mt-0.5">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" /> Lab Certified
                        </span>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-vedic-gold/30 rounded-lg bg-vedic-ivory">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="p-1 text-vedic-dark hover:text-vedic-maroon"
                        >
                          <Minus className="w-3.5 h-3.5" />
                        </button>
                        <span className="px-2 text-xs font-bold text-vedic-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="p-1 text-vedic-dark hover:text-vedic-maroon"
                        >
                          <Plus className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-bold text-vedic-maroon">
                          ₹{(itemPrice * item.quantity).toLocaleString('en-IN')}
                        </span>
                        {comparePrice > itemPrice && (
                          <span className="text-[10px] text-vedic-muted line-through ml-1 block">
                            ₹{(comparePrice * item.quantity).toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="absolute top-3 right-3 text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              );
            })
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-4 bg-white border-t border-vedic-gold/30 space-y-3 shadow-inner">
            {/* Coupon Code Input */}
            <div className="space-y-1">
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-4 h-4 text-vedic-gold absolute left-2.5 top-2.5" />
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      placeholder="Coupon (e.g. VEDIC10)"
                      className="w-full pl-8 pr-2 py-1.5 text-xs bg-vedic-ivory rounded-lg border border-vedic-gold/30 focus:outline-none uppercase font-semibold"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-vedic-goldDark text-white px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-vedic-maroon transition-colors"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 p-2 rounded-lg text-xs text-emerald-800 font-semibold">
                  <span>Applied Coupon: {appliedCoupon}</span>
                  <button onClick={removeCoupon} className="text-red-600 hover:underline text-[11px]">
                    Remove
                  </button>
                </div>
              )}
              {couponFeedback && !appliedCoupon && (
                <p className={`text-[10px] font-medium ${couponFeedback.success ? 'text-emerald-700' : 'text-red-600'}`}>
                  {couponFeedback.message}
                </p>
              )}
            </div>

            {/* Price Calculations */}
            <div className="space-y-1 text-xs border-t border-vedic-beige pt-2 text-vedic-dark">
              <div className="flex justify-between">
                <span className="text-vedic-muted">Subtotal</span>
                <span className="font-semibold">₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount</span>
                  <span>-₹{discountAmount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-vedic-muted">Shipping</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? <span className="text-emerald-700 font-bold">FREE</span> : `₹${shippingFee}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-vedic-maroon pt-1 border-t border-vedic-beige">
                <span>Grand Total</span>
                <span>₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2 pt-1">
              <button
                onClick={handleCheckoutProceed}
                className="w-full bg-gold-gradient text-vedic-dark py-3 rounded-full font-serif font-bold text-sm shadow-lg hover:brightness-105 transition-all flex items-center justify-center gap-2"
              >
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  setIsCartOpen(false);
                  navigate('/cart');
                }}
                className="w-full text-center text-xs font-semibold text-vedic-muted hover:text-vedic-maroon hover:underline py-1"
              >
                View Detailed Shopping Bag
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

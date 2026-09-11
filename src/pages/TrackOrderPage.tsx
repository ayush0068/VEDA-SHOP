import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { Package, CheckCircle2, Clock, Truck, Home, Search, Sparkles } from 'lucide-react';

export const TrackOrderPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const initialId = searchParams.get('id') || '';

  const [orderId, setOrderId] = useState(initialId);
  const [searchedOrder, setSearchedOrder] = useState<string | null>(initialId || null);

  const handleTrackSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (orderId.trim()) {
      setSearchedOrder(orderId.trim());
    }
  };

  const STAGES = [
    { label: 'Order Placed', time: 'August 27, 2026 - 10:30 AM', done: true, current: false },
    { label: 'Traditional Consecrated / Energized', time: 'August 27, 2026 - 02:15 PM', done: true, current: false },
    { label: 'Quality Checked & Packed', time: 'August 27, 2026 - 05:00 PM', done: true, current: true },
    { label: 'Shipped via BlueDart Express', time: 'Estimated Aug 28', done: false, current: false },
    { label: 'Out for Delivery', time: 'Estimated Aug 30', done: false, current: false },
    { label: 'Delivered', time: 'Estimated Aug 30', done: false, current: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-8">
      <Breadcrumb items={[{ label: 'Track Order' }]} />

      <div className="bg-white rounded-3xl p-8 border border-vedic-gold/20 shadow-card text-center space-y-4">
        <Sparkles className="w-8 h-8 text-vedic-gold mx-auto" />
        <h1 className="font-serif font-extrabold text-2xl md:text-3xl text-vedic-maroon">
          Live Order Status Tracker
        </h1>
        <p className="text-xs text-vedic-muted max-w-md mx-auto">
          Enter your Order ID or registered mobile phone number to trace shipment progress.
        </p>

        <form onSubmit={handleTrackSubmit} className="flex gap-2 max-w-md mx-auto">
          <input
            type="text"
            required
            value={orderId}
            onChange={(e) => setOrderId(e.target.value)}
            placeholder="Enter Order ID (e.g. VA-ORD-849201)"
            className="flex-1 px-4 py-2.5 text-xs bg-vedic-ivory rounded-full border border-vedic-gold/40 focus:outline-none"
          />
          <button
            type="submit"
            className="bg-vedic-maroon text-white px-6 py-2.5 rounded-full text-xs font-bold shadow-md hover:bg-vedic-maroonDark"
          >
            Track Order
          </button>
        </form>
      </div>

      {searchedOrder && (
        <div className="bg-white rounded-3xl p-6 md:p-8 border border-vedic-gold/30 shadow-card space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-vedic-beige pb-4 gap-2">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-vedic-goldDark">
                Tracking Details For
              </span>
              <h3 className="font-serif font-bold text-lg text-vedic-maroon font-mono">
                {searchedOrder}
              </h3>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              <Truck className="w-3.5 h-3.5 text-emerald-600" /> In Transit - On Schedule
            </span>
          </div>

          {/* Timeline */}
          <div className="space-y-6 relative before:absolute before:left-3.5 before:top-3 before:bottom-3 before:w-0.5 before:bg-vedic-gold/30">
            {STAGES.map((stg, idx) => (
              <div key={idx} className="relative flex items-start gap-4 pl-8">
                <div
                  className={`absolute left-0 top-0.5 w-7 h-7 rounded-full flex items-center justify-center border-2 ${
                    stg.done
                      ? 'bg-vedic-maroon border-vedic-gold text-vedic-gold'
                      : stg.current
                      ? 'bg-vedic-gold border-vedic-maroon text-vedic-maroon animate-pulse'
                      : 'bg-vedic-ivory border-gray-300 text-gray-400'
                  }`}
                >
                  {stg.done ? <CheckCircle2 className="w-4 h-4" /> : <Clock className="w-4 h-4" />}
                </div>

                <div>
                  <h4 className={`text-xs font-bold ${stg.done || stg.current ? 'text-vedic-dark' : 'text-gray-400'}`}>
                    {stg.label}
                  </h4>
                  <p className="text-[10px] text-vedic-muted">{stg.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

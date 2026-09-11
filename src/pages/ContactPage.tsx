import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, ShieldCheck, Sparkles } from 'lucide-react';
import { Breadcrumb } from '../components/Breadcrumb';

export const ContactPage: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Astrology Consultation / Product Inquiry',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-vedic-ivory min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb items={[{ label: 'Contact Us' }]} />

        <div className="text-center max-w-2xl mx-auto my-8">
          <span className="text-xs font-bold uppercase tracking-widest text-vedic-goldDark bg-vedic-gold/10 px-3 py-1 rounded-full border border-vedic-gold/30">
            Get In Touch
          </span>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-vedic-maroon mt-3">
            Contact Veda Structure
          </h1>
          <p className="text-sm text-vedic-charcoal mt-2 leading-relaxed">
            Our team of astrologers, sages, pundits, and spiritual experts are available to guide you with astrology consultations, Kundali birth chart energization, and product support.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-10">
          {/* Contact Information Cards */}
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-vedic-gold/20 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-vedic-maroon/10 border border-vedic-gold/40 flex items-center justify-center shrink-0">
                <MapPin className="w-6 h-6 text-vedic-maroon" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-vedic-dark">Veda Structure Headquarters</h3>
                <p className="text-xs text-vedic-charcoal mt-1">
                  Varanasi, Uttar Pradesh 221001, India
                </p>
                <p className="text-[11px] text-vedic-muted mt-1">
                  Spiritual Heart of Sacred India
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-vedic-gold/20 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-vedic-maroon/10 border border-vedic-gold/40 flex items-center justify-center shrink-0">
                <Phone className="w-6 h-6 text-vedic-maroon" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-vedic-dark">Helpline & WhatsApp</h3>
                <p className="text-xs text-vedic-charcoal mt-1 font-semibold">
                  +91 96348 76239
                </p>
                <p className="text-xs text-vedic-charcoal mt-0.5 font-semibold">
                  +91 96213 04116
                </p>
                <p className="text-[11px] text-vedic-muted mt-1">
                  Available Monday – Saturday (9:00 AM – 7:00 PM IST)
                </p>
              </div>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-sm border border-vedic-gold/20 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-vedic-maroon/10 border border-vedic-gold/40 flex items-center justify-center shrink-0">
                <Mail className="w-6 h-6 text-vedic-maroon" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-vedic-dark">Official Email Support</h3>
                <p className="text-xs text-vedic-maroon font-bold mt-1">
                  Support@vedastructure.com
                </p>
                <p className="text-xs text-vedic-maroon font-bold mt-0.5">
                  care@vedastructure.com
                </p>
                <p className="text-[11px] text-vedic-muted mt-1">
                  Guaranteed response within 24 business hours.
                </p>
              </div>
            </div>

            <div className="bg-vedic-maroon text-vedic-ivory p-6 rounded-2xl shadow-md border border-vedic-gold">
              <div className="flex items-center gap-2 mb-2 text-vedic-gold">
                <Sparkles className="w-5 h-5" />
                <h4 className="font-serif font-bold text-base">Astrology & Puja Consultations</h4>
              </div>
              <p className="text-xs leading-relaxed text-vedic-goldLight">
                Seeking personalized birth chart guidance or customized pandit puja services in Varanasi? Reach out to our expert Vedic team directly.
              </p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2 bg-white p-8 rounded-3xl shadow-md border border-vedic-gold/30">
            <h2 className="font-serif font-bold text-2xl text-vedic-maroon mb-2">
              Send Us a Message
            </h2>
            <p className="text-xs text-vedic-muted mb-6">
              Have questions about Mukhi selection, energization, or birth chart recommendations? Fill out the form below.
            </p>

            {submitted ? (
              <div className="p-8 text-center bg-vedic-ivory rounded-2xl border border-vedic-gold">
                <div className="w-16 h-16 bg-vedic-maroon rounded-full flex items-center justify-center mx-auto mb-4 text-vedic-gold">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h3 className="font-serif font-bold text-xl text-vedic-maroon">
                  Thank You for Contacting Veda Structure!
                </h3>
                <p className="text-xs text-vedic-charcoal mt-2">
                  Our Vedic expert team has received your message and will reach back to you shortly at {formData.email || 'your email'}.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 px-6 py-2.5 bg-vedic-maroon text-vedic-goldLight font-bold text-xs rounded-full hover:bg-vedic-maroonDark transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-vedic-dark mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-4 py-2.5 text-xs bg-vedic-ivory/50 rounded-xl border border-vedic-gold/30 focus:border-vedic-maroon focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-vedic-dark mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      className="w-full px-4 py-2.5 text-xs bg-vedic-ivory/50 rounded-xl border border-vedic-gold/30 focus:border-vedic-maroon focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-bold text-vedic-dark mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="rahul@example.com"
                      className="w-full px-4 py-2.5 text-xs bg-vedic-ivory/50 rounded-xl border border-vedic-gold/30 focus:border-vedic-maroon focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-vedic-dark mb-1">
                      Inquiry Category
                    </label>
                    <select
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-2.5 text-xs bg-vedic-ivory/50 rounded-xl border border-vedic-gold/30 focus:border-vedic-maroon focus:outline-none"
                    >
                      <option>Astrology Consultations & Predictions</option>
                      <option>Rudraksha Mukhi Recommendation</option>
                      <option>Online Puja & Pandit Services</option>
                      <option>Order & Tracking Support</option>
                      <option>Gemstones & Yantras Inquiry</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-vedic-dark mb-1">
                    Your Message / Details *
                  </label>
                  <textarea
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your query or birth chart consultation requirement..."
                    className="w-full px-4 py-2.5 text-xs bg-vedic-ivory/50 rounded-xl border border-vedic-gold/30 focus:border-vedic-maroon focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-vedic-maroon text-vedic-goldLight font-bold text-sm rounded-xl hover:bg-vedic-maroonDark transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4 text-vedic-gold" />
                  Submit Inquiry to Veda Structure
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

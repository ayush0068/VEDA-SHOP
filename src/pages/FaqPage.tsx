import React, { useState } from 'react';
import { Breadcrumb } from '../components/Breadcrumb';
import { ChevronDown, HelpCircle } from 'lucide-react';

const GENERAL_FAQS = [
  {
    question: 'Are all Veda Store products authentic and lab certified?',
    answer: 'Yes! 100% of our Rudraksha beads and precious gemstones are verified with official government X-Ray lab test reports.'
  },
  {
    question: 'Where do your Rudraksha beads originate from?',
    answer: 'All our Rudrakshas are authentic Nepalese origin (Himalayan beads), which are traditionally considered highest in bio-electric energy.'
  },
  {
    question: 'What is the shipping policy?',
    answer: 'We provide Free Express Shipping across Pan India on all orders above ₹999.'
  },
  {
    question: 'How do I consult an astrologer before buying?',
    answer: 'You can click on "Consult an Astrologer" in our menu or product pages to book a personalized Kundli session with Varanasi experts.'
  }
];

export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <div className="space-y-12 pb-16 bg-vedic-ivory text-vedic-dark">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <Breadcrumb items={[{ label: 'FAQs' }]} />
      </div>

      <section className="bg-vedic-brown text-vedic-ivory py-14 text-center">
        <div className="max-w-4xl mx-auto px-4 space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-vedic-gold/20 text-vedic-gold border border-vedic-gold/40 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-widest">
            <HelpCircle className="w-3.5 h-3.5" /> Support & Clarity
          </span>
          <h1 className="font-serif font-extrabold text-3xl md:text-5xl text-vedic-goldLight">
            Frequently Asked Questions
          </h1>
        </div>
      </section>

      <section className="max-w-3xl mx-auto px-4 space-y-3">
        {GENERAL_FAQS.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div key={idx} className="bg-white rounded-2xl border border-vedic-gold/20 overflow-hidden shadow-sm">
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full flex items-center justify-between p-5 text-left font-serif font-bold text-sm text-vedic-dark hover:text-vedic-maroon"
              >
                <span>{faq.question}</span>
                <ChevronDown className={`w-4 h-4 text-vedic-gold transition-transform ${isOpen ? 'rotate-180' : ''}`} />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 text-xs text-vedic-charcoal border-t border-vedic-beige/60 pt-3 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </section>
    </div>
  );
};

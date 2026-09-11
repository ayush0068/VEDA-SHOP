import React from 'react';
import { useParams } from 'react-router-dom';
import { Breadcrumb } from '../components/Breadcrumb';
import { FileText } from 'lucide-react';

export const PolicyPage: React.FC = () => {
  const { policyType } = useParams<{ policyType: string }>();

  const policyTitles: Record<string, { title: string; content: string }> = {
    shipping: {
      title: 'Shipping & Pan India Delivery Policy',
      content:
        'Veda Structure offers express shipping across 26,000+ pincodes in India. Orders are processed within 24 hours of traditional consecration. Standard express delivery takes 2-5 business days. Free shipping is applicable on all orders above INR 999.',
    },
    returns: {
      title: 'Return & 7-Day Exchange Policy',
      content:
        'We stand behind the quality of our authentic spiritual products. If you receive a damaged or incorrect item, you may request a replacement within 7 days of delivery with unboxing video proof.',
    },
    refund: {
      title: 'Refund & Credit Policy',
      content:
        'Approved refunds are processed within 5-7 business days to your original payment method (UPI / Credit Card / Bank Transfer).',
    },
    cancellation: {
      title: 'Order Cancellation Policy',
      content:
        'Orders can be cancelled prior to dispatch by contacting Support@vedastructure.com or calling +91 96348 76239 / +91 96213 04116.',
    },
    privacy: {
      title: 'Privacy Policy',
      content:
        'We respect your privacy. All customer data, shipping addresses, and payment transactions are encrypted using 256-bit SSL protocols. We never share customer personal information with third parties.',
    },
    terms: {
      title: 'Terms & Conditions of Service',
      content:
        'By using Veda Structure website, you agree to our terms of service. Spiritual products are traditional cultural aids and should not replace professional medical or legal guidance.',
    },
    cookies: {
      title: 'Cookie Policy',
      content:
        'We use cookies to maintain your active shopping cart, remember wishlist items, and improve website navigation performance.',
    },
  };

  const currentPolicy = policyTitles[policyType || 'shipping'] || policyTitles.shipping;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
      <Breadcrumb items={[{ label: currentPolicy.title }]} />

      <div className="bg-white rounded-3xl p-8 border border-vedic-gold/20 shadow-card space-y-4">
        <div className="flex items-center gap-2 text-vedic-gold">
          <FileText className="w-6 h-6" />
          <span className="text-xs font-bold uppercase tracking-wider text-vedic-goldDark">Legal & Customer Policy</span>
        </div>

        <h1 className="font-serif font-extrabold text-2xl md:text-3xl text-vedic-maroon">
          {currentPolicy.title}
        </h1>

        <p className="text-xs text-vedic-charcoal leading-relaxed pt-3 border-t border-vedic-beige">
          {currentPolicy.content}
        </p>

        <div className="pt-6 border-t border-vedic-beige text-xs text-vedic-muted">
          For any clarifications regarding this policy, please email Support@vedastructure.com or call +91 96348 76239 / +91 96213 04116.
        </div>
      </div>
    </div>
  );
};

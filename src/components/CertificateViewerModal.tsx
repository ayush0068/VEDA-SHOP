import React from 'react';
import { X, ShieldCheck, CheckCircle2, Download, ExternalLink } from 'lucide-react';

interface CertificateViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  stoneTitle?: string;
  labName?: string;
  reportNumber?: string;
  weight?: string;
  dimensions?: string;
  treatment?: string;
  certificateUrl?: string;
}

export const CertificateViewerModal: React.FC<CertificateViewerModalProps> = ({
  isOpen,
  onClose,
  stoneTitle = 'Natural Ceylon Yellow Sapphire — 2.25 Carat',
  labName = 'Government Approved Gemological Testing Laboratory (GTL)',
  reportNumber = 'GTL-2026-88914',
  weight = '2.25 Carat (2.47 Ratti)',
  dimensions = '8.12 x 6.45 x 4.20 mm',
  treatment = 'No indications of heating / Untreated',
  certificateUrl = 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800'
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-vedic-gold/40 overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-vedic-brown text-vedic-ivory p-4 flex items-center justify-between border-b border-vedic-gold/30">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-vedic-gold" />
            <div>
              <h3 className="font-serif font-bold text-base text-vedic-goldLight">Official Gemstone Lab Certificate</h3>
              <p className="text-[10px] text-vedic-gold/80">Government Authorized Laboratory Verification</p>
            </div>
          </div>
          <button onClick={onClose} className="p-1 hover:bg-vedic-maroonDark rounded-full text-vedic-gold">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Certificate Mock Image */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-vedic-gold/40 shadow-inner bg-vedic-ivory p-2 text-center">
            <img src={certificateUrl} alt="Gemstone Certificate" className="w-full h-56 object-cover rounded-xl" />
            <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 absolute top-4 right-4">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Authenticated Report
            </span>
          </div>

          {/* Certificate Data Sheet Table */}
          <div className="bg-vedic-ivory rounded-2xl p-4 border border-vedic-gold/20 space-y-2 text-xs">
            <h4 className="font-serif font-bold text-sm text-vedic-brown border-b border-vedic-gold/20 pb-1">
              Report Data Breakdown
            </h4>

            <div className="grid grid-cols-2 gap-y-1.5 pt-1 text-vedic-dark">
              <div><span className="text-vedic-muted">Item Name:</span> <strong className="block">{stoneTitle}</strong></div>
              <div><span className="text-vedic-muted">Issuing Lab:</span> <strong className="block">{labName}</strong></div>
              <div><span className="text-vedic-muted">Report Number:</span> <strong className="block text-vedic-maroon">{reportNumber}</strong></div>
              <div><span className="text-vedic-muted">Carat / Weight:</span> <strong className="block">{weight}</strong></div>
              <div><span className="text-vedic-muted">Dimensions:</span> <strong className="block">{dimensions}</strong></div>
              <div><span className="text-vedic-muted">Treatment Status:</span> <strong className="block text-emerald-700">{treatment}</strong></div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between pt-2 text-xs">
            <a
              href={certificateUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-vedic-goldDark hover:text-vedic-maroon font-bold flex items-center gap-1 underline"
            >
              Verify on Lab Portal <ExternalLink className="w-3.5 h-3.5" />
            </a>
            <button
              onClick={onClose}
              className="bg-vedic-gold hover:bg-vedic-goldDark text-vedic-dark font-bold px-4 py-2 rounded-full shadow-sm"
            >
              Close Viewer
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

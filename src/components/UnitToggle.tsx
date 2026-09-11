import React from 'react';
import { useUnit } from '../context/UnitContext';

export const UnitToggle: React.FC = () => {
  const { unit, setUnit } = useUnit();

  return (
    <div className="inline-flex items-center bg-white/80 backdrop-blur-md p-1 rounded-full border border-vedic-gold/40 shadow-sm text-xs font-serif font-bold">
      <span className="text-[10px] text-vedic-muted uppercase tracking-wider px-2 font-sans font-bold">Unit:</span>
      <button
        onClick={() => setUnit('carat')}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          unit === 'carat'
            ? 'bg-vedic-maroon text-vedic-gold shadow-md'
            : 'text-vedic-dark hover:bg-vedic-gold/20'
        }`}
      >
        Carat (ct)
      </button>
      <button
        onClick={() => setUnit('ratti')}
        className={`px-3 py-1 rounded-full transition-all duration-200 ${
          unit === 'ratti'
            ? 'bg-vedic-maroon text-vedic-gold shadow-md'
            : 'text-vedic-dark hover:bg-vedic-gold/20'
        }`}
      >
        Ratti (≈ 1.11ct)
      </button>
    </div>
  );
};

import React, { createContext, useContext, useState } from 'react';

type WeightUnit = 'carat' | 'ratti';

interface UnitContextType {
  unit: WeightUnit;
  setUnit: (unit: WeightUnit) => void;
  toggleUnit: () => void;
  formatWeight: (carat: number) => string;
}

const UnitContext = createContext<UnitContextType | undefined>(undefined);

export const UnitProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [unit, setUnit] = useState<WeightUnit>('carat');

  const toggleUnit = () => {
    setUnit((prev) => (prev === 'carat' ? 'ratti' : 'carat'));
  };

  const formatWeight = (carat: number): string => {
    if (unit === 'carat') {
      return `${carat.toFixed(2)} ct`;
    } else {
      // 1 Carat = 1.11 Ratti (approx standard Vedic conversion)
      const ratti = (carat * 1.11).toFixed(2);
      return `${ratti} Ratti`;
    }
  };

  return (
    <UnitContext.Provider value={{ unit, setUnit, toggleUnit, formatWeight }}>
      {children}
    </UnitContext.Provider>
  );
};

export const useUnit = () => {
  const context = useContext(UnitContext);
  if (!context) {
    throw new Error('useUnit must be used within a UnitProvider');
  }
  return context;
};

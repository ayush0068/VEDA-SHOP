import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="flex items-center text-xs text-vedic-muted py-3 px-1 overflow-x-auto no-scrollbar">
      <Link to="/" className="flex items-center gap-1 hover:text-vedic-maroon transition-colors shrink-0">
        <Home className="w-3.5 h-3.5" />
        <span>Home</span>
      </Link>

      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-vedic-gold mx-1.5 shrink-0" />
          {item.path ? (
            <Link
              to={item.path}
              className="hover:text-vedic-maroon transition-colors whitespace-nowrap capitalize"
            >
              {item.label}
            </Link>
          ) : (
            <span className="font-semibold text-vedic-dark whitespace-nowrap capitalize truncate max-w-xs">
              {item.label}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

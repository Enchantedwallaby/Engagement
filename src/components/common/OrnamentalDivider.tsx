import React from 'react';

interface OrnamentalDividerProps {
  className?: string;
}

/**
 * OrnamentalDivider
 * Minimal traditional Indian floral/diamond gold motif divider.
 */
export const OrnamentalDivider: React.FC<OrnamentalDividerProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center justify-center gap-2 py-3 ${className}`} aria-hidden="true">
      <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-gold-champagne/60" />
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-gold-antique/80"
      >
        <path
          d="M12 2L14.5 9.5L22 12L14.5 14.5L12 22L9.5 14.5L2 12L9.5 9.5L12 2Z"
          stroke="currentColor"
          strokeWidth="1.2"
          fill="rgba(197, 164, 109, 0.15)"
        />
        <circle cx="12" cy="12" r="2" fill="currentColor" />
      </svg>
      <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-gold-champagne/60" />
    </div>
  );
};

export default OrnamentalDivider;

import React from 'react';

interface GoldBorderFrameProps {
  children?: React.ReactNode;
  className?: string;
  inset?: string;
}

/**
 * GoldBorderFrame
 * Delicate traditional thin champagne gold border frame with corner accents.
 * Respects strict luxury aesthetics without excessive ornamentation.
 */
export const GoldBorderFrame: React.FC<GoldBorderFrameProps> = ({
  children,
  className = '',
  inset = 'inset-3',
}) => {
  return (
    <div
      className={`absolute ${inset} pointer-events-none border border-gold-champagne/40 z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Delicate inner hairline frame */}
      <div className="absolute inset-[3px] border border-gold-champagne/25" />

      {/* Top Left Corner Accent */}
      <div className="absolute -top-1 -left-1 w-2.5 h-2.5 border-t border-l border-gold-antique" />

      {/* Top Right Corner Accent */}
      <div className="absolute -top-1 -right-1 w-2.5 h-2.5 border-t border-r border-gold-antique" />

      {/* Bottom Left Corner Accent */}
      <div className="absolute -bottom-1 -left-1 w-2.5 h-2.5 border-b border-l border-gold-antique" />

      {/* Bottom Right Corner Accent */}
      <div className="absolute -bottom-1 -right-1 w-2.5 h-2.5 border-b border-r border-gold-antique" />

      {children}
    </div>
  );
};

export default GoldBorderFrame;

import React from 'react';

interface WaxSealProps {
  className?: string;
  glowRef?: React.Ref<HTMLDivElement>;
}

/**
 * WaxSeal
 * Luxurious traditional Indian gold wax seal with embossed G & S monogram.
 * Features two intertwined golden engagement rings between G and S replacing the ampersand.
 * Realistic metallic gold texture with organic rim, bevel depth, and illumination glow.
 */
export const WaxSeal: React.FC<WaxSealProps> = ({ className = '', glowRef }) => {
  return (
    <div
      className={`relative w-16 h-16 sm:w-18 sm:h-18 rounded-full flex items-center justify-center select-none ${className}`}
      style={{
        background: 'radial-gradient(circle at 35% 30%, #E6C894 0%, #C5A46D 45%, #9B7E4B 85%, #7D6336 100%)',
        boxShadow:
          '0 6px 16px -2px rgba(73, 59, 45, 0.4), 0 2px 6px rgba(168, 139, 89, 0.35), inset 0 2px 3px rgba(255, 255, 255, 0.4), inset 0 -2px 4px rgba(73, 59, 45, 0.5)',
      }}
      aria-label="Gold Wax Seal"
    >
      {/* Illumination glow aura (controlled by GSAP) */}
      <div
        ref={glowRef}
        className="absolute -inset-4 rounded-full pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(255, 242, 190, 0.95) 0%, rgba(212, 175, 55, 0.65) 45%, rgba(197, 164, 109, 0) 75%)',
          filter: 'blur(6px)',
        }}
      />

      {/* Outer irregular melted wax ring effect */}
      <div className="absolute inset-[3px] rounded-full border border-gold-champagne/60 opacity-80 pointer-events-none" />

      {/* Inner recessed stamp circle */}
      <div
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full flex items-center justify-center relative pointer-events-none"
        style={{
          background: 'radial-gradient(circle at 40% 35%, #D4B279 0%, #B8965E 70%, #8E713E 100%)',
          boxShadow:
            'inset 0 2px 4px rgba(73, 59, 45, 0.45), inset 0 -1px 2px rgba(255, 255, 255, 0.3), 0 1px 2px rgba(0,0,0,0.1)',
        }}
      >
        {/* Delicate inner bead ring */}
        <div className="absolute inset-[2px] rounded-full border border-dashed border-gold-antique/50 pointer-events-none" />

        {/* Embossed G [Two Intertwined Golden Rings] S monogram */}
        <div className="flex items-center justify-center font-cinzel text-brown-deep font-bold tracking-wider text-sm sm:text-base pl-0.5">
          <span
            style={{
              textShadow: '0 1px 0 rgba(255, 255, 255, 0.45), 0 -1px 1px rgba(73, 59, 45, 0.6)',
            }}
          >
            G
          </span>

          {/* Two intertwined golden engagement rings positioned between G and S */}
          <span className="inline-flex items-center justify-center mx-0.5" aria-hidden="true">
            <svg
              width="18"
              height="13"
              viewBox="0 0 24 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="drop-shadow-[0_1px_1px_rgba(73,59,45,0.6)]"
            >
              <defs>
                <linearGradient id="sealRingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FFF2D4" />
                  <stop offset="40%" stopColor="#DFC084" />
                  <stop offset="80%" stopColor="#C5A46D" />
                  <stop offset="100%" stopColor="#8A6C35" />
                </linearGradient>
              </defs>
              {/* Left Ring (with solitaire sparkle) */}
              <circle
                cx="8"
                cy="8.5"
                r="5.5"
                stroke="url(#sealRingGrad)"
                strokeWidth="1.5"
                fill="none"
              />
              <path
                d="M 8 1.8 L 9.3 3 L 8 4.2 L 6.7 3 Z"
                fill="#FFFDF7"
                stroke="#8A6C35"
                strokeWidth="0.4"
              />
              {/* Right Ring */}
              <circle
                cx="15"
                cy="8.5"
                r="5.5"
                stroke="url(#sealRingGrad)"
                strokeWidth="1.5"
                fill="none"
              />
              {/* Overlap weave arc: left ring crosses over right ring */}
              <path
                d="M 12 5.2 A 5.5 5.5 0 0 1 13.5 8.5"
                stroke="url(#sealRingGrad)"
                strokeWidth="1.5"
                fill="none"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <span
            style={{
              textShadow: '0 1px 0 rgba(255, 255, 255, 0.45), 0 -1px 1px rgba(73, 59, 45, 0.6)',
            }}
          >
            S
          </span>
        </div>
      </div>
    </div>
  );
};

export default WaxSeal;

import React, { useRef } from 'react';
import { GoldBorderFrame } from '../common/GoldBorderFrame';
import { OrnamentalDivider } from '../common/OrnamentalDivider';
import { useGSAP, gsap } from '../../lib/gsap';
import type { Language } from '../../types';

interface LanguageSelectionProps {
  onSelectLanguage: (language: Language) => void;
  selectedLanguage?: Language | null;
}

/**
 * LanguageSelection Screen
 * Mobile-first luxury invitation language picker.
 * Features traditional Indian champagne-gold detailing, subtle paper texture,
 * refined G & S monogram, and dual Kannada/English typography.
 */
export const LanguageSelection: React.FC<LanguageSelectionProps> = ({
  onSelectLanguage,
  selectedLanguage,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsRef = useRef<HTMLDivElement>(null);

  // Elegant subtle entrance animation with gentle stagger
  useGSAP(
    () => {
      const items = elementsRef.current?.querySelectorAll('.gsap-item');
      if (items && items.length > 0) {
        gsap.fromTo(
          items,
          {
            opacity: 0,
            y: 16,
          },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.12,
            ease: 'power2.out',
          }
        );
      }
    },
    { scope: containerRef }
  );

  const handleLanguageClick = (lang: Language) => {
    // Elegant quick micro-haptic visual tap feedback
    onSelectLanguage(lang);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-ivory paper-texture flex flex-col justify-between items-center py-10 px-6 overflow-hidden select-none"
    >
      {/* Delicate Traditional Champagne-Gold Double Frame */}
      <GoldBorderFrame inset="inset-4 sm:inset-5" />

      {/* Top Balancing Spacer */}
      <div className="w-full h-2" aria-hidden="true" />

      {/* Main Symmetrical Content Container */}
      <div
        ref={elementsRef}
        className="relative z-20 w-full max-w-[320px] flex flex-col items-center text-center my-auto"
      >
        {/* 1. Small G & S Luxury Monogram */}
        <div className="gsap-item mb-5 flex justify-center">
          <div className="w-16 h-16 rounded-full border border-gold-champagne/60 p-1 flex items-center justify-center bg-ivory/80 shadow-[0_2px_12px_rgba(197,164,109,0.12)]">
            <div className="w-full h-full rounded-full border border-gold-champagne/30 flex items-center justify-center">
              <span className="font-cinzel text-lg tracking-widest text-brown-deep font-medium pl-0.5">
                G<span className="text-gold-antique text-xs mx-1 font-serif italic">&amp;</span>S
              </span>
            </div>
          </div>
        </div>

        {/* 2. Delicate Ornamental Gold Divider */}
        <div className="gsap-item w-full flex justify-center mb-6">
          <OrnamentalDivider className="py-0" />
        </div>

        {/* 3. Kannada Heading */}
        <h1 className="gsap-item font-kannada text-xl sm:text-[22px] font-semibold text-brown-deep leading-relaxed tracking-wide mb-2.5">
          ನಿಮ್ಮ ಭಾಷೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ
        </h1>

        {/* 4. English Subtitle */}
        <p className="gsap-item font-cinzel text-[11px] sm:text-xs text-gold-antique font-medium tracking-[0.24em] uppercase mb-8 leading-snug">
          Please Select Your Preferred Language
        </p>

        {/* 5. Two Vertically Arranged Language Selection Buttons */}
        <div className="w-full flex flex-col items-center gap-3.5">
          {/* First Button: Kannada */}
          <button
            type="button"
            onClick={() => handleLanguageClick('kn')}
            className={`gsap-item group relative w-full py-4 px-6 rounded-[2px] transition-all duration-300 ease-out flex items-center justify-center cursor-pointer border ${
              selectedLanguage === 'kn'
                ? 'border-gold-antique bg-gold-champagne/15 text-brown-deep shadow-[0_2px_12px_rgba(197,164,109,0.2)]'
                : 'border-gold-champagne/45 bg-ivory/50 hover:bg-gold-champagne/10 hover:border-gold-champagne text-brown-deep active:scale-[0.99] active:bg-gold-champagne/15'
            }`}
            aria-label="ಕನ್ನಡ ಆಯ್ಕೆಮಾಡಿ (Select Kannada)"
          >
            {/* Subtle inner corner marks for traditional card look */}
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-gold-champagne/40 group-hover:border-gold-antique transition-colors" />
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-gold-champagne/40 group-hover:border-gold-antique transition-colors" />

            <span className="font-kannada text-lg font-medium tracking-wider group-hover:text-brown transition-colors">
              ಕನ್ನಡ
            </span>
          </button>

          {/* Second Button: English */}
          <button
            type="button"
            onClick={() => handleLanguageClick('en')}
            className={`gsap-item group relative w-full py-4 px-6 rounded-[2px] transition-all duration-300 ease-out flex items-center justify-center cursor-pointer border ${
              selectedLanguage === 'en'
                ? 'border-gold-antique bg-gold-champagne/15 text-brown-deep shadow-[0_2px_12px_rgba(197,164,109,0.2)]'
                : 'border-gold-champagne/45 bg-ivory/50 hover:bg-gold-champagne/10 hover:border-gold-champagne text-brown-deep active:scale-[0.99] active:bg-gold-champagne/15'
            }`}
            aria-label="Select English"
          >
            {/* Subtle inner corner marks for traditional card look */}
            <span className="absolute top-1 left-1 w-1.5 h-1.5 border-t border-l border-gold-champagne/40 group-hover:border-gold-antique transition-colors" />
            <span className="absolute bottom-1 right-1 w-1.5 h-1.5 border-b border-r border-gold-champagne/40 group-hover:border-gold-antique transition-colors" />

            <span className="font-cinzel text-sm font-semibold tracking-[0.25em] uppercase group-hover:text-brown transition-colors">
              English
            </span>
          </button>
        </div>
      </div>

      {/* Subtle Bottom Accent - Symmetrical & Understated */}
      <div className="relative z-20 text-center pb-2">
        <span className="text-[10px] uppercase font-sans tracking-[0.28em] text-gold-antique/70">
          Gagan &amp; Sinchana
        </span>
      </div>
    </div>
  );
};

export default LanguageSelection;

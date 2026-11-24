import React, { useRef } from 'react';
import { useGSAP, gsap } from '../../lib/gsap';
import type { Language } from '../../types';
import { MapPin } from 'lucide-react';

interface InvitationScreenProps {
  language: Language;
}

/**
 * InvitationScreen
 * Full-screen edge-to-edge luxury traditional Indian engagement invitation.
 * Sits permanently on screen with warm ivory paper texture, champagne-gold floral
 * ornamentation, deep brown typography, and separate high-readability English and Kannada layouts.
 */
export const InvitationScreen: React.FC<InvitationScreenProps> = ({ language }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const isKannada = language === 'kn';

  // Google Maps link for The Ocean Pearl, Ujire
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=The+Ocean+Pearl+Ujire+Karnataka';

  // Smooth calm entrance fade-in
  useGSAP(
    () => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 1.2, ease: 'power2.out' }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full min-h-[100dvh] bg-ivory paper-texture text-brown flex flex-col justify-between items-center py-4 sm:py-6 px-4 sm:px-6 select-none overflow-y-auto overflow-x-hidden"
    >
      {/* Main Content Stage (Full-screen, edge-to-edge, stationary) */}
      <div
        ref={contentRef}
        className="relative z-20 w-full max-w-[360px] flex flex-col items-center text-center my-auto py-1"
      >
        {/* =========================================================================
            TRADITIONAL TOP ORNAMENTAL FLORAL ARTWORK
           ========================================================================= */}
        <div className="w-full flex items-center justify-center mb-2 sm:mb-3" aria-hidden="true">
          <svg
            width="120"
            height="24"
            viewBox="0 0 160 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gold-champagne/80"
          >
            {/* Center Paisley / Lotus Flower Motif */}
            <path
              d="M80 4C78 12 73 18 68 20C75 22 78 26 80 30C82 26 85 22 92 20C87 18 82 12 80 4Z"
              fill="currentColor"
              fillOpacity="0.25"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            {/* Left Vine & Florets */}
            <path
              d="M8 16H66C60 12 55 8 46 8C36 8 32 16 24 16C16 16 12 12 4 16"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <circle cx="46" cy="8" r="1.5" fill="currentColor" />
            <circle cx="28" cy="12" r="1.2" fill="currentColor" />
            {/* Right Vine & Florets */}
            <path
              d="M152 16H94C100 12 105 8 114 8C124 8 128 16 136 16C144 16 148 12 156 16"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <circle cx="114" cy="8" r="1.5" fill="currentColor" />
            <circle cx="132" cy="12" r="1.2" fill="currentColor" />
          </svg>
        </div>

        {/* =========================================================================
            CENTRAL G & S MONOGRAM
           ========================================================================= */}
        <div className="mb-2.5 sm:mb-3.5 flex flex-col items-center">
          <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-full border border-gold-champagne/60 p-1 flex items-center justify-center bg-cream/40 shadow-xs">
            <div className="w-full h-full rounded-full border border-gold-champagne/30 flex items-center justify-center">
              <span className="font-cinzel text-sm sm:text-base tracking-widest text-brown-deep font-medium pl-0.5">
                G<span className="text-gold-antique text-xs mx-0.5 font-serif italic">&amp;</span>S
              </span>
            </div>
          </div>
        </div>

        {/* =========================================================================
            TWO SEPARATE FULL-SCREEN INVITATION LAYOUTS
           ========================================================================= */}
        {isKannada ? (
          /* =======================================================================
             KANNADA INVITATION LAYOUT (Natural, Formal, Traditional)
             ======================================================================= */
          <div className="w-full flex flex-col items-center">
            {/* Auspicious Invocation */}
            <p className="font-kannada text-xs font-semibold text-gold-antique tracking-widest mb-1">
              ॥ ಓಂ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥
            </p>

            {/* Header */}
            <h1 className="font-kannada text-xs sm:text-sm font-semibold tracking-wider text-brown-muted uppercase mb-2">
              ನಿಶ್ಚಿತಾರ್ಥದ ಕರೆಯೋಲೆ
            </h1>

            {/* Traditional Invitation Note */}
            <p className="font-kannada text-xs sm:text-[13px] text-brown-deep/90 leading-relaxed max-w-[310px] mb-2">
              ನಮ್ಮ ಕುಟುಂಬದ ವತಿಯಿಂದ ತಮಗೆ ಹಾಗೂ ತಮ್ಮ ಕುಟುಂಬದವರಿಗೆ ಆತ್ಮೀಯವಾದ ಆಮಂತ್ರಣ
            </p>

            <span className="font-kannada text-xs text-gold-antique tracking-wider mb-1.5">
              ನಮ್ಮ ಪ್ರೀತಿಯ
            </span>

            {/* Groom Name */}
            <div className="w-full py-0.5">
              <h2 className="font-kannada text-xl sm:text-2xl font-bold text-brown-deep tracking-wide leading-snug">
                ಗಗನ್ ಜಿ. ಶೆಟ್ಟಿ
              </h2>
            </div>

            {/* Ampersand Divider */}
            <div className="flex items-center justify-center gap-3 my-2 sm:my-2.5 w-full">
              <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-gold-champagne/70" />
              <span className="font-serif italic text-gold-antique text-lg">&amp;</span>
              <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-gold-champagne/70" />
            </div>

            {/* Bride Name */}
            <div className="w-full py-0.5 mb-3.5 sm:mb-4">
              <h2 className="font-kannada text-xl sm:text-2xl font-bold text-brown-deep tracking-wide leading-snug">
                ಡಾ. ಸಿಂಚನಾ ಶೆಟ್ಟಿ
              </h2>
            </div>

            {/* Ceremony Statement */}
            <p className="font-kannada text-[11.5px] sm:text-[12px] text-brown-muted leading-relaxed max-w-[320px] mb-3">
              ಇವರ ನಿಶ್ಚಿತಾರ್ಥ ಸಮಾರಂಭಕ್ಕೆ ತಾವುಗಳು ಸಕುಟುಂಬ ಸಮೇತರಾಗಿ ಆಗಮಿಸಿ, ವಧು-ವರರನ್ನು ಹರಸಿ ಆಶೀರ್ವದಿಸಬೇಕಾಗಿ ವಿನಂತಿ.
            </p>

            {/* Date & Time Badge */}
            <div className="w-full max-w-[280px] bg-cream/50 rounded-[2px] border border-gold-champagne/35 py-2 px-4 mb-2.5 text-center">
              <div className="font-kannada text-xs sm:text-sm font-bold text-brown-deep tracking-wide">
                ದಿನಾಂಕ: 24 ಡಿಸೆಂಬರ್ 2026, ಗುರುವಾರ
              </div>
              <div className="font-kannada text-[11px] font-semibold text-gold-antique mt-0.5">
                ಸಮಯ: ಬೆಳಿಗ್ಗೆ 11:30 ಕ್ಕೆ
              </div>
            </div>

            {/* Venue Details */}
            <div className="mb-2.5">
              <span className="block font-kannada text-[10.5px] uppercase tracking-wider text-gold-antique font-semibold mb-0.5">
                ಸ್ಥಳ
              </span>
              <p className="font-kannada text-sm sm:text-base font-bold text-brown-deep">
                ದಿ ಓಷನ್ ಪರ್ಲ್
              </p>
              <p className="font-kannada text-xs text-brown-muted">
                ಉಜಿರೆ
              </p>
            </div>

            {/* Closing Family Sign-off */}
            <div className="text-center mb-3">
              <p className="font-kannada text-xs text-gold-antique tracking-wide mb-1">
                ತಮ್ಮ ಆಗಮನದ ನಿರೀಕ್ಷೆಯಲ್ಲಿ,
              </p>
              <p className="font-kannada text-xs sm:text-[13px] text-brown-deep font-semibold leading-snug">
                ಗಣೇಶ್ ಶೆಟ್ಟಿ ಮತ್ತು ಕುಟುಂಬ
              </p>
              <p className="font-kannada text-xs sm:text-[13px] text-brown-deep font-semibold leading-snug mt-0.5">
                ಜಯಾನಂದ ಶೆಟ್ಟಿ ಮತ್ತು ಕುಟುಂಬ
              </p>
            </div>
          </div>
        ) : (
          /* =======================================================================
             ENGLISH INVITATION LAYOUT (Formal, Elegant, Serif)
             ======================================================================= */
          <div className="w-full flex flex-col items-center">
            {/* Header */}
            
            {/* Introductory Invitation Text */}
            <p className="font-serif italic text-sm sm:text-[15px] text-brown-muted leading-relaxed max-w-[290px] mb-3">
              With immense pleasure and joy,<br />
              we invite you to grace the engagement ceremony of
            </p>

            {/* Groom Name */}
            <div className="w-full py-0.5">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-brown-deep leading-snug uppercase">
                GAGAN G. SHETTY
              </h2>
            </div>

            {/* Ampersand Divider */}
            <div className="flex items-center justify-center gap-3 my-2 sm:my-2.5 w-full">
              <div className="h-[0.5px] w-12 bg-gradient-to-r from-transparent to-gold-champagne/70" />
              <span className="font-serif italic text-gold-antique text-lg">&amp;</span>
              <div className="h-[0.5px] w-12 bg-gradient-to-l from-transparent to-gold-champagne/70" />
            </div>

            {/* Bride Name */}
            <div className="w-full py-0.5 mb-4 sm:mb-5">
              <h2 className="font-cinzel text-xl sm:text-2xl font-bold tracking-wider text-brown-deep leading-snug uppercase">
                DR. SINCHANA SHETTY
              </h2>
            </div>

            {/* Date & Time Badge */}
            <div className="w-full max-w-[280px] bg-cream/50 rounded-[2px] border border-gold-champagne/35 py-2 px-4 mb-3 text-center">
              <div className="font-serif text-sm sm:text-base font-semibold text-brown-deep tracking-wide">
                Thursday, 24 December 2026
              </div>
              <div className="font-sans text-[11px] uppercase tracking-widest text-gold-antique font-semibold mt-0.5">
                11:30 AM
              </div>
            </div>

            {/* Venue Details */}
            <div className="mb-3">
              <span className="block font-cinzel text-[10.5px] tracking-[0.25em] uppercase text-gold-antique font-semibold mb-0.5">
                VENUE
              </span>
              <p className="font-cinzel text-sm sm:text-base font-bold text-brown-deep tracking-wide">
                The Ocean Pearl
              </p>
              <p className="font-serif italic text-xs sm:text-sm text-brown-muted">
                Ujire, Karnataka
              </p>
            </div>

            {/* Closing Family Sign-off */}
            <div className="text-center mb-3.5">
              <p className="font-serif italic text-xs sm:text-[13px] text-gold-antique tracking-wide mb-1">
                With warm regards,
              </p>
              <p className="font-serif text-[13.5px] sm:text-sm text-brown-deep font-semibold tracking-wide leading-snug">
                Ganesh Shetty and Family
              </p>
              <p className="font-serif text-[13.5px] sm:text-sm text-brown-deep font-semibold tracking-wide leading-snug mt-0.5">
                Jayanand Shetty and Family
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            DISCREET GOOGLE MAPS DIRECTIONS BUTTON
           ========================================================================= */}
        <div className="w-full flex justify-center mt-0.5">
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-2 py-1.5 px-4 rounded-[2px] border border-gold-champagne/50 bg-ivory/90 hover:bg-gold-champagne/15 hover:border-gold-antique active:scale-95 transition-all duration-300 shadow-xs text-brown-deep"
            aria-label="View Venue Location on Google Maps"
          >
            <MapPin className="w-3.5 h-3.5 text-gold-antique group-hover:scale-110 transition-transform" />
            <span
              className={`${
                isKannada ? 'font-kannada text-xs font-medium' : 'font-cinzel text-[11px] font-semibold tracking-wider uppercase'
              } text-brown-deep group-hover:text-brown transition-colors`}
            >
              {isKannada ? 'ಸ್ಥಳದ ಮ್ಯಾಪ್ ನೋಡಿ' : 'View on Google Maps'}
            </span>
          </a>
        </div>

        {/* =========================================================================
            TRADITIONAL BOTTOM ORNAMENTAL ARTWORK
           ========================================================================= */}
        <div className="w-full flex items-center justify-center mt-3 sm:mt-4" aria-hidden="true">
          <svg
            width="80"
            height="16"
            viewBox="0 0 100 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-gold-champagne/70"
          >
            <path
              d="M10 10H45M55 10H90"
              stroke="currentColor"
              strokeWidth="0.8"
              strokeLinecap="round"
            />
            <path
              d="M50 4L54 10L50 16L46 10L50 4Z"
              fill="currentColor"
              fillOpacity="0.3"
              stroke="currentColor"
              strokeWidth="0.8"
            />
            <circle cx="50" cy="10" r="1.5" fill="currentColor" />
          </svg>
        </div>
      </div>

      {/* Symmetrical Bottom Watermark */}
      <div className="relative z-20 text-center pb-1">
        <span className="text-[10px] uppercase font-sans tracking-[0.28em] text-gold-antique/70">
          Gagan &amp; Sinchana • 2026
        </span>
      </div>
    </div>
  );
};

export default InvitationScreen;

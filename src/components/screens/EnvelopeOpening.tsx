import React, { useRef } from 'react';
import { WaxSeal } from '../common/WaxSeal';
import { useGSAP, gsap } from '../../lib/gsap';
import type { Language } from '../../types';
import { Sparkles } from 'lucide-react';

interface EnvelopeOpeningProps {
  language: Language;
  onComplete: () => void;
}

/**
 * EnvelopeOpening Screen
 *
 * Automatic Royal Envelope Opening Experience:
 * 1. Seamless golden light bloom transition (0.4s) from the entrance video.
 * 2. Pristine CLOSED ivory envelope appears in the centre of the screen.
 * 3. Holds clearly visible for ~1.0s for guests to appreciate the craftsmanship,
 *    warm ivory paper texture, and Indian floral engravings.
 * 4. Central G&S wax seal (featuring intertwined golden engagement rings) illuminates and releases.
 * 5. Envelope flap visibly rotates backwards in 3D (-180deg).
 * 6. Invitation card visibly slides upwards from INSIDE the envelope pocket:
 *    - Both groom & bride names (GAGAN G. SHETTY & SINCHANA SHETTY) are 100% visible.
 *    - The date and venue are also 100% visible.
 *    - The front pocket holds the lower part of the card, creating an authentic layered effect.
 * 7. Card expands smoothly to fill the screen, calling onComplete to reveal the final InvitationScreen.
 */
export const EnvelopeOpening: React.FC<EnvelopeOpeningProps> = ({ language, onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const bloomOverlayRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const flapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const sealWrapperRef = useRef<HTMLDivElement>(null);
  const sealGlowRef = useRef<HTMLDivElement>(null);
  const envelopeContainerRef = useRef<HTMLDivElement>(null);

  const isKannada = language === 'kn';

  useGSAP(
    () => {
      const tl = gsap.timeline({
        onComplete: onComplete,
      });

      // 0. Initial States
      gsap.set(envelopeContainerRef.current, { opacity: 0, scale: 0.96 });
      gsap.set(bloomOverlayRef.current, { opacity: 1 });
      gsap.set(headerRef.current, { opacity: 1 });
      gsap.set(sealWrapperRef.current, { scale: 1, opacity: 1 });
      gsap.set(sealGlowRef.current, { opacity: 0, scale: 1 });
      gsap.set(cardRef.current, { y: 0, scale: 1 });
      if (flapRef.current) {
        flapRef.current.style.transform = 'rotateX(0deg)';
        flapRef.current.style.zIndex = '30';
      }

      // Step 1: Golden bloom softens and closed envelope appears in centre of screen
      tl.to(envelopeContainerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'power2.out',
      })
      .to(
        bloomOverlayRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power1.out',
        },
        '<'
      )

      // Step 2: Hold the closed envelope for ~1.0 second so guests appreciate the craft
      .to({}, { duration: 1.0 })

      // Step 3: G&S golden wax seal illuminates warmly
      .to(
        sealGlowRef.current,
        {
          opacity: 1,
          scale: 1.35,
          duration: 0.45,
          ease: 'sine.inOut',
        }
      )
      .to(
        sealWrapperRef.current,
        {
          scale: 1.08,
          duration: 0.45,
          ease: 'sine.inOut',
        },
        '<'
      )

      // Step 4: Wax seal releases with soft golden dissolution
      .to(
        sealWrapperRef.current,
        {
          scale: 1.22,
          opacity: 0,
          duration: 0.35,
          ease: 'power2.in',
        }
      )
      .to(
        sealGlowRef.current,
        {
          opacity: 0,
          scale: 1.6,
          duration: 0.35,
          ease: 'power2.out',
        },
        '<'
      )

      // Step 5: Envelope flap visibly rotates backwards in 3D (-180deg)
      .to(flapRef.current, {
        rotateX: -180,
        duration: 1.0,
        ease: 'power2.inOut',
        onUpdate: function () {
          // At 90deg, drop flap z-index behind the inner card
          const progress = this.progress();
          if (flapRef.current) {
            flapRef.current.style.zIndex = progress >= 0.5 ? '5' : '30';
          }
        },
      })

      // Step 6: Invitation card visibly slides upwards out of the envelope pocket
      // Soften top header so the risen card has beautiful unobstructed vertical space
      .to(
        headerRef.current,
        {
          opacity: 0,
          y: -8,
          duration: 0.45,
          ease: 'power2.in',
        },
        '-=0.2'
      )
      .to(
        cardRef.current,
        {
          y: -220,
          scale: 1.02,
          duration: 1.35,
          ease: 'power2.out',
          boxShadow:
            '0 24px 48px -6px rgba(73, 59, 45, 0.28), 0 8px 20px -2px rgba(73, 59, 45, 0.14)',
        },
        '-=0.35'
      )

      // Hold the fully emerged invitation card so guests clearly read the couple names, date & venue
      .to({}, { duration: 0.9 })

      // Step 7: Card expands smoothly to fill the screen
      .to(
        cardRef.current,
        {
          scale: 1.08,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.inOut',
        }
      )
      .to(
        envelopeContainerRef.current,
        {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.inOut',
        },
        '<'
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] bg-ivory paper-texture flex flex-col justify-between items-center py-6 px-4 overflow-hidden select-none"
    >
      {/* Seamless Golden Bloom Overlay that connects from the video's ending */}
      <div
        ref={bloomOverlayRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          zIndex: 50,
          background: 'radial-gradient(ellipse at 50% 50%, #FFFDF7 20%, #F8F5ED 65%, #EFE8DA 100%)',
          boxShadow: 'inset 0 0 140px rgba(197, 164, 109, 0.45)',
        }}
      />

      {/* Main Envelope Stage */}
      <div
        ref={envelopeContainerRef}
        className="w-full h-full flex flex-col justify-between items-center relative"
        style={{ zIndex: 10 }}
      >
        {/* Top Header Note (Fades smoothly when card ascends) */}
        <div ref={headerRef} className="text-center pt-2 px-2 z-20">
          <div className="flex items-center justify-center gap-1.5 text-gold-antique text-[11px] tracking-[0.25em] uppercase font-sans mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span
              className={
                isKannada
                  ? 'font-kannada tracking-normal font-semibold text-xs'
                  : 'font-cinzel font-semibold'
              }
            >
              {isKannada ? '॥ ಶ್ರೀ ಗಣೇಶಾಯ ನಮಃ ॥' : 'ENGAGEMENT INVITATION'}
            </span>
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <p
            className={`${
              isKannada ? 'font-kannada text-xs' : 'font-serif italic text-xs'
            } text-brown-muted tracking-wider`}
          >
            {isKannada ? 'ಶುಭ ನಿಶ್ಚಿತಾರ್ಥ ಆಹ್ವಾನ ಪತ್ರಿಕೆ' : 'A special invitation awaits you'}
          </p>
        </div>

        {/* 3D Envelope Container (78-84% mobile width, ~290px-320px) */}
        <div
          className="relative w-[84%] max-w-[320px] min-w-[280px] h-[395px] sm:h-[415px] my-auto"
          style={{ perspective: '1200px', top: 'clamp(32px, 7.8vh, 72px)' }}
        >
          {/* Layer A: Envelope Back Base Plate (z-index: 1) */}
          <div
            className="absolute inset-0 bg-[#EFE8DA] rounded-[3px] border border-gold-champagne/50 overflow-hidden"
            style={{
              zIndex: 1,
              boxShadow:
                '0 16px 40px -4px rgba(73, 59, 45, 0.28), 0 6px 16px rgba(73, 59, 45, 0.12)',
            }}
          >
            {/* Inner gold frame lining */}
            <div className="absolute inset-2 border border-gold-champagne/35 rounded-[2px]" />
          </div>

          {/* Layer B: Inner Invitation Card (Emerges and slides upwards, z-index: 10) */}
          <div
            ref={cardRef}
            className="absolute top-4 left-[4%] w-[92%] h-[365px] sm:h-[385px] bg-ivory paper-texture rounded-[2px] border border-gold-champagne/65 p-4 pt-5 pb-4 flex flex-col justify-start items-center text-center transition-shadow duration-300 pointer-events-none"
            style={{
              zIndex: 10,
              boxShadow: '0 4px 18px rgba(73, 59, 45, 0.12)',
            }}
          >
            {/* Inner Gold Frame */}
            <div className="absolute inset-1.5 border border-gold-champagne/40 rounded-[1px] pointer-events-none" />

            {/* Top Card Floral Artwork */}
            <div className="w-full flex items-center justify-center mt-0.5 mb-1.5" aria-hidden="true">
              <svg
                width="84"
                height="18"
                viewBox="0 0 160 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-gold-champagne/85"
              >
                <path
                  d="M80 4C78 12 73 18 68 20C75 22 78 26 80 30C82 26 85 22 92 20C87 18 82 12 80 4Z"
                  fill="currentColor"
                  fillOpacity="0.25"
                  stroke="currentColor"
                  strokeWidth="0.8"
                />
                <path
                  d="M16 16H66C60 12 55 8 46 8C36 8 32 16 24 16C16 16 12 12 4 16"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <circle cx="46" cy="8" r="1.5" fill="currentColor" />
                <path
                  d="M144 16H94C100 12 105 8 114 8C124 8 128 16 136 16C144 16 148 12 156 16"
                  stroke="currentColor"
                  strokeWidth="0.8"
                  strokeLinecap="round"
                />
                <circle cx="114" cy="8" r="1.5" fill="currentColor" />
              </svg>
            </div>

            {/* Couple Monogram */}
            <div className="mb-2 flex flex-col items-center">
              <div className="w-10 h-10 rounded-full border border-gold-champagne/60 flex items-center justify-center bg-cream/50 shadow-xs mb-1">
                <span className="font-cinzel text-xs font-semibold text-brown-deep tracking-wider">
                  G<span className="text-gold-antique text-[9px] font-serif italic mx-0.5">&amp;</span>S
                </span>
              </div>
              <span className="text-[8.5px] tracking-[0.25em] text-gold-antique font-cinzel uppercase">
                {isKannada ? 'ನಿಶ್ಚಿತಾರ್ಥ' : 'ENGAGEMENT'}
              </span>
            </div>

            {/* Couple Names (Positioned in upper-mid section so they are 100% visible when risen) */}
            <div className="w-full px-2 mb-2">
              <h2
                className={`${
                  isKannada
                    ? 'font-kannada text-base font-bold'
                    : 'font-cinzel text-sm sm:text-base font-bold'
                } text-brown-deep tracking-wide leading-relaxed`}
              >
                {isKannada ? 'ಗಗನ್ ಜಿ ಶೆಟ್ಟಿ' : 'GAGAN G SHETTY'}
              </h2>
              <div className="flex items-center justify-center gap-2 my-1">
                <div className="h-[0.5px] w-8 bg-gradient-to-r from-transparent to-gold-champagne" />
                <span className="font-serif italic text-gold-antique text-xs">&amp;</span>
                <div className="h-[0.5px] w-8 bg-gradient-to-l from-transparent to-gold-champagne" />
              </div>
              <h2
                className={`${
                  isKannada
                    ? 'font-kannada text-base font-bold'
                    : 'font-cinzel text-sm sm:text-base font-bold'
                } text-brown-deep tracking-wide leading-relaxed`}
              >
                {isKannada ? 'ಸಿಂಚನಾ ಶೆಟ್ಟಿ' : 'SINCHANA SHETTY'}
              </h2>
              <div className="w-12 h-[1px] bg-gradient-to-r from-transparent via-gold-champagne to-transparent mx-auto my-1.5" />
              <p className="text-[11.5px] font-serif italic text-brown-muted font-medium">
                {isKannada ? '24 ಡಿಸೆಂಬರ್ 2026' : 'Thursday, 24 December 2026'}
              </p>
              <p className="text-[10.5px] font-sans text-gold-antique mt-0.5 font-medium">
                {isKannada ? 'ಓಷನ್ ಪರ್ಲ್, ಉಜಿರೆ' : 'Ocean Pearl, Ujire'}
              </p>
            </div>

            {/* Bottom Card Detailing (Sits inside the pocket, creating the authentic layered effect) */}
            <div className="mt-auto mb-1">
              <span className="text-[8px] uppercase tracking-[0.25em] text-gold-antique/70 font-sans">
                Save The Date
              </span>
            </div>
          </div>

          {/* Layer C: Envelope Top Flap (Hinged at top, opens 3D rotateX -180deg, starts z-30 -> switches to z-5) */}
          <div
            ref={flapRef}
            className="absolute top-0 left-0 w-full h-[58%] pointer-events-none"
            style={{
              zIndex: 30,
              transformOrigin: 'top center',
              transformStyle: 'preserve-3d',
              backfaceVisibility: 'visible',
            }}
          >
            <svg
              className="w-full h-full drop-shadow-[0_4px_8px_rgba(73,59,45,0.16)]"
              viewBox="0 0 100 60"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="envelopeFlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#F8F5ED" />
                  <stop offset="60%" stopColor="#F3EDE0" />
                  <stop offset="100%" stopColor="#EFE8DA" />
                </linearGradient>
              </defs>
              {/* Flap Body */}
              <polygon points="0,0 100,0 50,56" fill="url(#envelopeFlapGrad)" />

              {/* Flap Gold Borders */}
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="56"
                stroke="#C5A46D"
                strokeWidth="0.85"
                strokeOpacity="0.9"
              />
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="56"
                stroke="#C5A46D"
                strokeWidth="0.85"
                strokeOpacity="0.9"
              />

              {/* Delicate inner accent hairlines */}
              <polygon
                points="3,0 97,0 50,52"
                fill="none"
                stroke="#C5A46D"
                strokeWidth="0.4"
                strokeOpacity="0.45"
              />

              {/* Traditional Indian Floral Flap Engraving at the tip */}
              <path
                d="M 50,42 C 48,45 45,48 50,51 C 55,48 52,45 50,42 Z"
                fill="#C5A46D"
                fillOpacity="0.3"
                stroke="#A88B59"
                strokeWidth="0.35"
              />
              <circle cx="50" cy="40" r="1.1" fill="#C5A46D" fillOpacity="0.6" />
            </svg>
          </div>

          {/* Layer D: Envelope Front Pocket (Lower 58%, holds lower part of card, z-index: 20) */}
          <div
            className="absolute bottom-0 left-0 w-full h-[58%] pointer-events-none overflow-hidden rounded-b-[3px]"
            style={{ zIndex: 20 }}
          >
            <svg
              className="w-full h-full"
              viewBox="0 0 100 70"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="envelopePocketGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#EFE8DA" />
                  <stop offset="40%" stopColor="#F5EFE3" />
                  <stop offset="100%" stopColor="#F8F5ED" />
                </linearGradient>
              </defs>

              {/* Pocket Body: V-neck front */}
              <polygon
                points="0,70 100,70 100,0 50,26 0,0"
                fill="url(#envelopePocketGrad)"
                stroke="#C5A46D"
                strokeWidth="0.75"
                strokeOpacity="0.8"
              />

              {/* Inner diagonal gold accents */}
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="26"
                stroke="#C5A46D"
                strokeWidth="0.75"
                strokeOpacity="0.9"
              />
              <line
                x1="100"
                y1="0"
                x2="50"
                y2="26"
                stroke="#C5A46D"
                strokeWidth="0.75"
                strokeOpacity="0.9"
              />

              {/* Dual accent hairline parallel to V-fold */}
              <polyline
                points="2,7 50,31.5 98,7"
                fill="none"
                stroke="#C5A46D"
                strokeWidth="0.35"
                strokeOpacity="0.45"
              />

              {/* Traditional Indian Floral Corner Engravings */}
              <g opacity="0.7">
                <path
                  d="M 5,65 C 10,58 15,58 20,62 C 22,60 25,61 24,66"
                  stroke="#C5A46D"
                  strokeWidth="0.55"
                  fill="none"
                />
                <circle cx="10" cy="59" r="1.1" fill="#C5A46D" />
                <circle cx="17" cy="59.5" r="1.0" fill="#C5A46D" />
                <path
                  d="M 6,55 C 8,50 14,48 18,52"
                  stroke="#C5A46D"
                  strokeWidth="0.5"
                  strokeDasharray="1 1"
                  fill="none"
                />
              </g>

              {/* Right Corner Floral Filigree (Mirrored) */}
              <g opacity="0.7">
                <path
                  d="M 95,65 C 90,58 85,58 80,62 C 78,60 75,61 76,66"
                  stroke="#C5A46D"
                  strokeWidth="0.55"
                  fill="none"
                />
                <circle cx="90" cy="59" r="1.1" fill="#C5A46D" />
                <circle cx="83" cy="59.5" r="1.0" fill="#C5A46D" />
                <path
                  d="M 94,55 C 92,50 86,48 82,52"
                  stroke="#C5A46D"
                  strokeWidth="0.5"
                  strokeDasharray="1 1"
                  fill="none"
                />
              </g>

              {/* Center Lower Lotus Medallion Motif */}
              <g opacity="0.65">
                <path
                  d="M 50,60 C 47,63 45,66 50,68 C 55,66 53,63 50,60 Z"
                  fill="#C5A46D"
                  fillOpacity="0.3"
                  stroke="#C5A46D"
                  strokeWidth="0.45"
                />
                <circle cx="50" cy="57" r="1.2" fill="#C5A46D" />
                <line x1="42" y1="64" x2="47" y2="64" stroke="#C5A46D" strokeWidth="0.45" />
                <line x1="53" y1="64" x2="58" y2="64" stroke="#C5A46D" strokeWidth="0.45" />
              </g>
            </svg>

            {/* Bottom & Side Gold Hairline Trim */}
            <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gold-champagne/50" />
            <div className="absolute inset-y-0 left-0 w-[1px] bg-gold-champagne/50" />
            <div className="absolute inset-y-0 right-0 w-[1px] bg-gold-champagne/50" />
          </div>

          {/* Layer E: Central Gold Wax Seal (At the apex of flap, z-index: 40) */}
          <div
            ref={sealWrapperRef}
            className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ zIndex: 40 }}
          >
            <WaxSeal glowRef={sealGlowRef} />
          </div>
        </div>

        {/* Symmetrical Bottom Watermark */}
        <div className="text-center pb-1 z-20">
          <span className="text-[10px] uppercase font-sans tracking-[0.28em] text-gold-antique/70">
            Gagan &amp; Sinchana • 2026
          </span>
        </div>
      </div>
    </div>
  );
};

export default EnvelopeOpening;

import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

// Sophisticated timing and easing presets for luxury invitation pacing
export const ANIMATION_DEFAULTS = {
  ease: 'power2.out',
  duration: 0.9,
  stagger: 0.15,
};

export const EASINGS = {
  luxury: 'power2.out',
  gentle: 'power1.inOut',
  smooth: 'power3.out',
};

export { gsap, ScrollTrigger, useGSAP };

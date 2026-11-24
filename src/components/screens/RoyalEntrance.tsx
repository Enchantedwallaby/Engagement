import React, { useRef, useEffect, useCallback } from 'react';
import { MusicToggle } from '../common/MusicToggle';
import { useBackgroundMusic } from '../../hooks/useBackgroundMusic';
import { useGSAP, gsap } from '../../lib/gsap';
import type { Language } from '../../types';

interface RoyalEntranceProps {
  language: Language;
  onComplete: () => void;
}

/**
 * RoyalEntrance Screen
 *
 * Cinematic Entrance:
 * 1. Full-screen royal entrance cinematic video autoplays edge-to-edge.
 * 2. Background instrumental music plays peacefully during entrance.
 * 3. At 5.6s (camera enters G&S golden emblem):
 *    - Background music smoothly fades out and stops completely.
 *    - Golden light transition expands smoothly to fill the screen (0.8s).
 * 4. At completion of golden bloom (~6.4s):
 *    - Calls onComplete() so the video disappears completely
 *      and the dedicated EnvelopeOpening screen takes the stage.
 */
export const RoyalEntrance: React.FC<RoyalEntranceProps> = ({ onComplete }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const lightBloomRef = useRef<HTMLDivElement>(null);
  const topAudioControlRef = useRef<HTMLDivElement>(null);

  const hasTransitionStartedRef = useRef<boolean>(false);

  // Background music integration
  const { isPlaying, isMuted, isAudioAvailable, playMusic, fadeOutAndStop, toggleMute } =
    useBackgroundMusic();

  // Start instrumental music on mount
  useEffect(() => {
    playMusic();
  }, [playMusic]);

  // Seamless Golden Transition Trigger
  const triggerTransition = useCallback(() => {
    if (hasTransitionStartedRef.current) return;
    hasTransitionStartedRef.current = true;

    // Immediately start fading out background music so it stops completely
    fadeOutAndStop();

    // Fade out floating entrance audio toggle
    if (topAudioControlRef.current) {
      gsap.to(topAudioControlRef.current, { opacity: 0, duration: 0.4 });
    }

    const tl = gsap.timeline();

    // Golden light bloom expands smoothly as camera passes through G&S golden emblem
    tl.to(lightBloomRef.current, {
      opacity: 1,
      duration: 0.8,
      ease: 'power2.inOut',
      onComplete: () => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        // Advance to the dedicated EnvelopeOpening screen!
        onComplete();
      },
    });
  }, [fadeOutAndStop, onComplete]);

  // Time update listener: Triggers transition at 5.6s when camera enters G&S emblem
  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.currentTime >= 5.6 && !hasTransitionStartedRef.current) {
      triggerTransition();
    }
  };

  // Video ended fallback
  const handleVideoEnded = () => {
    if (!hasTransitionStartedRef.current) {
      triggerTransition();
    }
  };

  // Error fallback
  const handleVideoError = useCallback(() => {
    setTimeout(() => {
      triggerTransition();
    }, 1200);
  }, [triggerTransition]);

  // Autoplay video on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.play().catch(() => {
      video.muted = true;
      video.play().catch(() => {
        handleVideoError();
      });
    });
  }, [handleVideoError]);

  // Initial calm fade-in
  useGSAP(
    () => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6, ease: 'power1.out' }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[100dvh] min-h-[100dvh] bg-ivory overflow-hidden select-none m-0 p-0"
    >
      {/* =========================================================================
          FULL-SCREEN CINEMATIC ENTRANCE VIDEO (Edge-to-edge)
         ========================================================================= */}
      <video
        ref={videoRef}
        playsInline
        autoPlay
        muted
        preload="auto"
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleVideoEnded}
        onError={handleVideoError}
        className="absolute inset-0 w-full h-full object-cover object-center m-0 p-0 pointer-events-none"
        style={{ zIndex: 10 }}
      >
        <source src="/videos/royal-entrance.mp4" type="video/mp4" />
        <source src="/videos/royal-entrance/royal-entrance.mp4" type="video/mp4" />
      </video>

      {/* Floating Audio Control (Fades out when transition begins) */}
      <div
        ref={topAudioControlRef}
        className="absolute top-0 right-0 p-4 pt-5 pointer-events-auto"
        style={{ zIndex: 20 }}
      >
        <MusicToggle
          isPlaying={isPlaying}
          isMuted={isMuted}
          onToggleMute={toggleMute}
          hasAudioSource={isAudioAvailable}
        />
      </div>

      {/* Champagne-Gold Light Bloom Overlay */}
      <div
        ref={lightBloomRef}
        className="absolute inset-0 pointer-events-none opacity-0"
        style={{
          zIndex: 30,
          background: 'radial-gradient(ellipse at 50% 50%, #FFFDF7 20%, #F8F5ED 65%, #EFE8DA 100%)',
          boxShadow: 'inset 0 0 140px rgba(197, 164, 109, 0.45)',
        }}
      />
    </div>
  );
};

export default RoyalEntrance;

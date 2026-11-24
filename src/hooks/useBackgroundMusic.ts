import { useRef, useState, useEffect, useCallback } from 'react';

const AUDIO_SRC = '/music/entrance-music.mp3';

/** Fade-out duration in milliseconds */
const FADE_DURATION_MS = 900;
/** Interval step for volume reduction */
const FADE_INTERVAL_MS = 50;

export function useBackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const fadeIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isAudioAvailable, setIsAudioAvailable] = useState<boolean>(true);

  // Initialize Audio element
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = false;
    audio.preload = 'metadata';

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => setIsPlaying(false);
    const handleError = () => {
      // Missing file (404) or unsupported format handled gracefully
      setIsAudioAvailable(false);
      setIsPlaying(false);
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    audioRef.current = audio;

    return () => {
      // Clear any running fade interval
      if (fadeIntervalRef.current) {
        clearInterval(fadeIntervalRef.current);
        fadeIntervalRef.current = null;
      }
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  const playMusic = useCallback(() => {
    if (!audioRef.current || !isAudioAvailable) return;

    audioRef.current.volume = 1;
    audioRef.current.play().catch(() => {
      // Handled silently: browser autoplay block or file not found
      setIsAudioAvailable(false);
    });
  }, [isAudioAvailable]);

  const pauseMusic = useCallback(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
  }, []);

  /**
   * Smoothly fade the audio volume from current level to 0, then stop playback.
   * Resolves once the audio has fully stopped.
   */
  const fadeOutAndStop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;

    // If already paused, nothing to fade
    if (audio.paused) return;

    // Clear any previous fade
    if (fadeIntervalRef.current) {
      clearInterval(fadeIntervalRef.current);
    }

    const startVolume = audio.volume;
    const steps = Math.ceil(FADE_DURATION_MS / FADE_INTERVAL_MS);
    const volumeStep = startVolume / steps;
    let currentStep = 0;

    fadeIntervalRef.current = setInterval(() => {
      currentStep++;
      const newVolume = Math.max(0, startVolume - volumeStep * currentStep);
      audio.volume = newVolume;

      if (currentStep >= steps || newVolume <= 0) {
        if (fadeIntervalRef.current) {
          clearInterval(fadeIntervalRef.current);
          fadeIntervalRef.current = null;
        }
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1; // Reset for potential future use
        setIsPlaying(false);
      }
    }, FADE_INTERVAL_MS);
  }, []);

  const toggleMute = useCallback(() => {
    if (!audioRef.current) return;
    const nextMuted = !isMuted;
    audioRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  }, [isMuted]);

  return {
    isPlaying,
    isMuted,
    isAudioAvailable,
    playMusic,
    pauseMusic,
    fadeOutAndStop,
    toggleMute,
  };
}

export default useBackgroundMusic;

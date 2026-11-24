import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';

interface MusicToggleProps {
  isPlaying: boolean;
  isMuted: boolean;
  onToggleMute: () => void;
  className?: string;
  hasAudioSource?: boolean;
}

/**
 * MusicToggle
 * Discreet, luxury champagne-gold audio control button.
 */
export const MusicToggle: React.FC<MusicToggleProps> = ({
  isPlaying,
  isMuted,
  onToggleMute,
  className = '',
  hasAudioSource = true,
}) => {
  if (!hasAudioSource && !isPlaying) {
    // Discreetly hide if audio is not available/playing
    return null;
  }

  return (
    <button
      type="button"
      onClick={onToggleMute}
      className={`group relative flex items-center justify-center w-9 h-9 rounded-full border border-gold-champagne/40 bg-ivory/80 backdrop-blur-xs text-gold-antique hover:text-brown-deep hover:border-gold-antique active:scale-95 transition-all duration-300 shadow-xs cursor-pointer ${className}`}
      aria-label={isMuted ? 'Unmute music' : 'Mute music'}
      title={isMuted ? 'Unmute' : 'Mute'}
    >
      {/* Subtle outer micro ring */}
      <span className="absolute inset-[2px] rounded-full border border-gold-champagne/20 pointer-events-none group-hover:border-gold-champagne/40 transition-colors" />

      {isMuted ? (
        <VolumeX className="w-4 h-4 transition-transform group-hover:scale-110" />
      ) : (
        <Volume2 className="w-4 h-4 transition-transform group-hover:scale-110" />
      )}
    </button>
  );
};

export default MusicToggle;

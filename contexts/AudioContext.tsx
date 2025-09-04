"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Extend HTMLAudioElement to include custom properties
declare global {
  interface HTMLAudioElement {
    removeListeners?: () => void;
  }
}

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  volume: number;
  toggleMusic: () => void;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider = ({ children }: AudioProviderProps) => {
  const [isPlaying, setIsPlaying] = useState(true); // Default to true
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolumeState] = useState(60); // Default to 60%
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Create audio element
    const audioElement = new Audio('/Lana Del Rey - Say Yes To Heaven.mp3');
    audioElement.loop = true;
    audioElement.volume = volume / 100; // Set volume from state (0-1 range)
    audioElement.preload = 'auto'; // Preload the audio file
    
    // Check if user has previously turned off music in this session
    const musicDisabledThisSession = sessionStorage.getItem('musicDisabled') === 'true';
    
    if (musicDisabledThisSession) {
      setIsPlaying(false);
    }

    // Function to attempt playing music immediately
    const playAudio = async () => {
      if (musicDisabledThisSession) return;
      
      try {
        // Try to play immediately
        await audioElement.play();
        setIsPlaying(true);
        setUserInteracted(true);
      } catch (error) {
        // Autoplay failed, set up immediate response to user interaction
        console.log('Autoplay prevented, setting up immediate user interaction response');
        
        // More comprehensive event listeners for instant response
        const handleFirstInteraction = async (event: Event) => {
          if (!musicDisabledThisSession && !userInteracted) {
            try {
              await audioElement.play();
              setIsPlaying(true);
              setUserInteracted(true);
              // Remove all listeners immediately after success
              removeAllListeners();
            } catch (e) {
              console.log('Failed to play after user interaction:', e);
            }
          }
        };

        const removeAllListeners = () => {
          document.removeEventListener('click', handleFirstInteraction, true);
          document.removeEventListener('touchstart', handleFirstInteraction, true);
          document.removeEventListener('touchend', handleFirstInteraction, true);
          document.removeEventListener('keydown', handleFirstInteraction, true);
          document.removeEventListener('mousemove', handleFirstInteraction, true);
          document.removeEventListener('scroll', handleFirstInteraction, true);
        };

        // Add event listeners with capture phase for immediate response
        document.addEventListener('click', handleFirstInteraction, true);
        document.addEventListener('touchstart', handleFirstInteraction, true);
        document.addEventListener('touchend', handleFirstInteraction, true);
        document.addEventListener('keydown', handleFirstInteraction, true);
        document.addEventListener('mousemove', handleFirstInteraction, true);
        document.addEventListener('scroll', handleFirstInteraction, true);

        // Store cleanup function for later use
        audioElement.removeListeners = removeAllListeners;
      }
    };

    setAudio(audioElement);
    
    // Try to play immediately without delay
    playAudio();

    return () => {
      if (audioElement.removeListeners) {
        audioElement.removeListeners();
      }
      audioElement.pause();
      audioElement.src = '';
    };
  }, []);

  const toggleMusic = async () => {
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
        // Remember that user turned off music for this session
        sessionStorage.setItem('musicDisabled', 'true');
      } else {
        await audio.play();
        setIsPlaying(true);
        // Remove the disabled flag when user turns music back on
        sessionStorage.removeItem('musicDisabled');
      }
    } catch (error) {
      console.error('Error toggling music:', error);
    }
  };

  const toggleMute = () => {
    if (!audio) return;
    
    const newMutedState = !isMuted;
    audio.muted = newMutedState;
    setIsMuted(newMutedState);
  };

  const setVolume = (newVolume: number) => {
    if (!audio) return;
    
    // Clamp volume between 0 and 100
    const clampedVolume = Math.max(0, Math.min(100, newVolume));
    setVolumeState(clampedVolume);
    audio.volume = clampedVolume / 100; // Convert to 0-1 range for HTML audio
  };

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, volume, toggleMusic, toggleMute, setVolume }}>
      {children}
    </AudioContext.Provider>
  );
};

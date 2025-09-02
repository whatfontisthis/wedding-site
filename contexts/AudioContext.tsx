"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface AudioContextType {
  isPlaying: boolean;
  isMuted: boolean;
  toggleMusic: () => void;
  toggleMute: () => void;
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
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);
  const [userInteracted, setUserInteracted] = useState(false);

  useEffect(() => {
    // Create audio element
    const audioElement = new Audio('/Lana Del Rey - Say Yes To Heaven.mp3');
    audioElement.loop = true;
    audioElement.volume = 0.3; // Set to 30% volume
    
    // Check if user has previously turned off music in this session
    const musicDisabledThisSession = sessionStorage.getItem('musicDisabled') === 'true';
    
    if (musicDisabledThisSession) {
      setIsPlaying(false);
    }

    // Function to attempt playing music
    const playAudio = async () => {
      if (musicDisabledThisSession) return;
      
      try {
        await audioElement.play();
        setIsPlaying(true);
      } catch (error) {
        // Autoplay failed, wait for user interaction
        console.log('Autoplay prevented, waiting for user interaction');
        
        // Add event listeners for first user interaction
        const handleFirstInteraction = async () => {
          if (!musicDisabledThisSession && !userInteracted) {
            try {
              await audioElement.play();
              setIsPlaying(true);
              setUserInteracted(true);
            } catch (e) {
              console.log('Failed to play after user interaction:', e);
            }
          }
          // Remove event listeners after first interaction
          document.removeEventListener('click', handleFirstInteraction);
          document.removeEventListener('touchstart', handleFirstInteraction);
          document.removeEventListener('keydown', handleFirstInteraction);
        };

        document.addEventListener('click', handleFirstInteraction);
        document.addEventListener('touchstart', handleFirstInteraction);
        document.addEventListener('keydown', handleFirstInteraction);
      }
    };

    setAudio(audioElement);
    
    // Attempt autoplay after a short delay
    const timer = setTimeout(playAudio, 1000);

    return () => {
      clearTimeout(timer);
      audioElement.pause();
      audioElement.src = '';
      // Clean up event listeners
      document.removeEventListener('click', () => {});
      document.removeEventListener('touchstart', () => {});
      document.removeEventListener('keydown', () => {});
    };
  }, [userInteracted]);

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

  return (
    <AudioContext.Provider value={{ isPlaying, isMuted, toggleMusic, toggleMute }}>
      {children}
    </AudioContext.Provider>
  );
};

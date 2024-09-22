// audioContext.tsx
import React, { createContext, useContext, useState, useCallback } from 'react';
import { Audio } from 'expo-av';

interface AudioContextProps {
  soundInstance: Audio.Sound | null;
  loadSound: (uri: string, positionMillis: number, onPlaybackStatusUpdate: (status: any) => void) => Promise<Audio.Sound | null>;
  playSound: () => Promise<void>;
  pauseSound: () => Promise<void>;
  stopSound: () => Promise<void>;
}

const AudioContext = createContext<AudioContextProps | undefined>(undefined);

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [soundInstance, setSoundInstance] = useState<Audio.Sound | null>(null);

  const loadSound = useCallback(async (uri: string, positionMillis: number, onPlaybackStatusUpdate: (status: any) => void): Promise<Audio.Sound | null> => {
    if (soundInstance) {
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
    }
    try {
      const { sound } = await Audio.Sound.createAsync(
        { uri },
        { shouldPlay: false, positionMillis },
        onPlaybackStatusUpdate
      );
      setSoundInstance(sound);
      return sound;
    } catch (error) {
      console.error("Failed to load sound:", error);
      return null;
    }
  }, [soundInstance]);

  const playSound = useCallback(async () => {
    if (soundInstance) {
      await soundInstance.playAsync();
    }
  }, [soundInstance]);

  const pauseSound = useCallback(async () => {
    if (soundInstance) {
      await soundInstance.pauseAsync();
    }
  }, [soundInstance]);

  const stopSound = useCallback(async () => {
    if (soundInstance) {
      await soundInstance.stopAsync();
      await soundInstance.unloadAsync();
      setSoundInstance(null);
    }
  }, [soundInstance]);

  return (
    <AudioContext.Provider value={{ soundInstance, loadSound, playSound, pauseSound, stopSound }}>
      {children}
    </AudioContext.Provider>
  );
};

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

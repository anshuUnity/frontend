import React, { createContext, useState, useContext } from 'react';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

type AudioData = {
  uri: string;
  title: string;
  host: string;
  cover_image: string;
};

type PlaybackContextType = {
  playbackObj: Audio.Sound | null;
  soundObj: AVPlaybackStatus | null;
  currentAudio: AudioData | null;
  playPauseHandler: (audio: AudioData) => Promise<void>;
};

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playbackObj, setPlaybackObj] = useState<Audio.Sound | null>(null);
  const [soundObj, setSoundObj] = useState<AVPlaybackStatus | null>(null);
  const [currentAudio, setCurrentAudio] = useState<AudioData | null>(null);

  const handlePlaybackStatusUpdate = (
    status: AVPlaybackStatus,
    setSoundObj: React.Dispatch<React.SetStateAction<AVPlaybackStatus | null>>
  ) => {
    if (status.isLoaded) {
      const updatedStatus = status as AVPlaybackStatusSuccess;
      setSoundObj(updatedStatus);
    }
  };

  const playPauseHandler = async (audio: AudioData) => {
    if (soundObj === null || currentAudio?.uri !== audio.uri) {
      if (playbackObj) {
        await playbackObj.unloadAsync();
      }

      const newPlaybackObj = new Audio.Sound();
      const status = await newPlaybackObj.loadAsync({ uri: audio.uri }, { shouldPlay: true });

      if (status.isLoaded) {
        newPlaybackObj.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) =>
          handlePlaybackStatusUpdate(status, setSoundObj)
        );

        setPlaybackObj(newPlaybackObj);
        setCurrentAudio(audio);
        setSoundObj(status as AVPlaybackStatusSuccess);
      } else {
        console.error('Failed to load the sound', status);
      }
      return;
    }

    // Existing logic for play/pause
    if (soundObj.isLoaded && 'isPlaying' in soundObj && soundObj.isPlaying) {
      const status = await playbackObj?.setStatusAsync({ shouldPlay: false });

      if (status?.isLoaded) {
        setSoundObj(status as AVPlaybackStatusSuccess);
      }
      return;
    }

    if (soundObj.isLoaded && 'isPlaying' in soundObj && !soundObj.isPlaying) {
      const status = await playbackObj?.playAsync();

      if (status?.isLoaded) {
        playbackObj?.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) =>
          handlePlaybackStatusUpdate(status, setSoundObj)
        );
      }
    }
  };

  return (
    <PlaybackContext.Provider value={{ playbackObj, soundObj, currentAudio, playPauseHandler }}>
      {children}
    </PlaybackContext.Provider>
  );
};

export const usePlayback = (): PlaybackContextType => {
  const context = useContext(PlaybackContext);
  if (!context) {
    throw new Error('usePlayback must be used within a PlaybackProvider');
  }
  return context;
};

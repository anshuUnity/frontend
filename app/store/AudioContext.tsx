import React, { createContext, useState, useContext } from 'react';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

type PlaybackContextType = {
  playbackObj: Audio.Sound | null;
  soundObj: AVPlaybackStatus | null;
  currentAudio: string | null;
  playPauseHandler: (audio_file: string) => Promise<void>;
};

const PlaybackContext = createContext<PlaybackContextType | undefined>(undefined);

export const PlaybackProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [playbackObj, setPlaybackObj] = useState<Audio.Sound | null>(null);
  const [soundObj, setSoundObj] = useState<AVPlaybackStatus | null>(null);
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  const handlePlaybackStatusUpdate = (
    status: AVPlaybackStatus,
    setSoundObj: React.Dispatch<React.SetStateAction<AVPlaybackStatus | null>>
  ) => {
    if (status.isLoaded) {
      const updatedStatus = status as AVPlaybackStatusSuccess;
      setSoundObj(updatedStatus);
    }
  };

  const playPauseHandler = async (audio_file: string) => {
    if (soundObj === null || currentAudio !== audio_file) {
      if (playbackObj) {
        await playbackObj.unloadAsync();
      }

      const newPlaybackObj = new Audio.Sound();
      const status = await newPlaybackObj.loadAsync({ uri: audio_file }, { shouldPlay: true });

      if (status.isLoaded) {
        const successStatus = status as AVPlaybackStatusSuccess;
        newPlaybackObj.setOnPlaybackStatusUpdate((status: AVPlaybackStatus) =>
          handlePlaybackStatusUpdate(status, setSoundObj)
        );

        setPlaybackObj(newPlaybackObj);
        setCurrentAudio(audio_file);
        setSoundObj(successStatus);
      } else {
        console.error('Failed to load the sound', status);
      }
      return;
    }

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

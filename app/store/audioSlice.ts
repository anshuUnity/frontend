import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Audio, AVPlaybackStatus, AVPlaybackStatusSuccess } from 'expo-av';

interface AudioState {
  playbackObj: Audio.Sound | null;
  soundObj: AVPlaybackStatus | null;
  currentAudio: string | null;
}

const initialState: AudioState = {
  playbackObj: null,
  soundObj: null,
  currentAudio: null,
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    setPlaybackObj(state, action: PayloadAction<Audio.Sound | null>) {
      state.playbackObj = action.payload;
    },
    setSoundObj(state, action: PayloadAction<AVPlaybackStatus | null>) {
      state.soundObj = action.payload;
    },
    setCurrentAudio(state, action: PayloadAction<string | null>) {
      state.currentAudio = action.payload;
    },
  },
});

export const { setPlaybackObj, setSoundObj, setCurrentAudio } = audioSlice.actions;

export default audioSlice.reducer;

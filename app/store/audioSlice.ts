import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface PodcastState {
  id: string | null;
  isPlaying: boolean;
  position: number;
  duration: number;
  title: string;
  host: string;
  cover_image: string;
  audio_file: string;
  category: string;
}

const initialState: PodcastState = {
  id: null,
  isPlaying: false,
  position: 0,
  duration: 0,
  title: '',
  host: '',
  cover_image: '',
  audio_file: '',
  category: '',
};

const audioSlice = createSlice({
  name: 'audio',
  initialState,
  reducers: {
    playPodcast(state, action: PayloadAction<Omit<PodcastState, 'position' | 'duration' | 'isPlaying'>>) {
      return {
        ...state,
        id: action.payload.id,
        position: 0,
        duration: 0,
        title: action.payload.title,
        host: action.payload.host,
        cover_image: action.payload.cover_image,
        audio_file: action.payload.audio_file,
        category: action.payload.category,
        isPlaying: true,
      };
    },
    pausePodcast(state) {
      return {
        ...state,
        isPlaying: false,
      };
    },
    updatePosition(state, action: PayloadAction<number>) {
      return {
        ...state,
        position: action.payload,
      };
    },
    updateDuration(state, action: PayloadAction<number>) {
      return {
        ...state,
        duration: action.payload,
      };
    },
    stopPodcast(state) {
      return {
        ...state,
        isPlaying: false,
        position: 0,
      };
    },
  },
});

export const { playPodcast, pausePodcast, updatePosition, updateDuration, stopPodcast } = audioSlice.actions;

export default audioSlice.reducer;

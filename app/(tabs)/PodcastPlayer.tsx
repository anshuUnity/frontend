import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';
import { useSelector, useDispatch } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { playPodcast, pausePodcast, updatePosition, updateDuration } from '../store/audioSlice';
import { useAudio } from '../store/AudioContext';


export default function PodcastPlayer({ route }: any) {
  const { id, title, host, cover_image, audio_file, category } = route.params;
  const dispatch = useDispatch<AppDispatch>();
  const audioState = useSelector((state: RootState) => state.audio);
  const { loadSound, playSound, pauseSound, stopSound } = useAudio();

  useEffect(() => {
    loadAudio();

    // Cleanup function to stop and unload audio when component unmounts
    return () => {
      stopSound();
    };
  }, [id]);

  const loadAudio = async () => {
    await loadSound(
      audio_file,
      audioState.id === id ? audioState.position : 0,
      onPlaybackStatusUpdate
    );

    if (audioState.isPlaying && audioState.id === id) {
      await playSound();
    }
  };

  const onPlaybackStatusUpdate = (status: any) => {
    if (status.isLoaded) {
      dispatch(updatePosition(status.positionMillis || 0));
      if (status.durationMillis && status.durationMillis !== audioState.duration) {
        dispatch(updateDuration(status.durationMillis));
      }
      if (status.didJustFinish) {
        dispatch(pausePodcast());
      }
    }
  };

  const playPauseHandler = async () => {
    if (audioState.isPlaying) {
      await pauseSound();
      dispatch(pausePodcast());
    } else {
      await playSound();
      dispatch(
        playPodcast({
          id,
          title,
          host,
          cover_image,
          audio_file,
          category,
        })
      );
    }
  };

  const formatTime = (millis: number) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = Math.floor((millis % 60000) / 1000);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const onSlidingComplete = async (value: number) => {
    const soundInstance = await loadSound(audio_file, value, onPlaybackStatusUpdate);
    if (soundInstance) {
      dispatch(updatePosition(value));
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: cover_image }} style={styles.coverImage} />
      <Text style={styles.category}>{`#${category.toLowerCase()}`}</Text>
      <Text style={styles.host}>{host}</Text>
      <Text style={styles.title}>{title}</Text>
      <Slider
        style={styles.slider}
        value={audioState.id === id ? audioState.position : 0}
        minimumValue={0}
        maximumValue={audioState.duration}
        minimumTrackTintColor="white"
        maximumTrackTintColor="gray"
        thumbTintColor="white"
        onSlidingComplete={onSlidingComplete}
      />
      <View style={styles.timeContainer}>
        <Text style={styles.time}>{formatTime(audioState.id === id ? audioState.position : 0)}</Text>
        <Text style={styles.time}>{formatTime(audioState.duration)}</Text>
      </View>
      <View style={styles.controls}>
        <TouchableOpacity onPress={playPauseHandler}>
          <Ionicons
            name={audioState.isPlaying && audioState.id === id ? 'pause-circle' : 'play-circle'}
            size={60}
            color="red"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1e1e1e',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  coverImage: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  category: {
    marginTop: 20,
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  host: {
    marginTop: 10,
    color: 'red',
    fontSize: 18,
  },
  title: {
    marginTop: 5,
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  slider: {
    width: '100%',
    marginTop: 40,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  time: {
    color: '#ffffff',
  },
  controls: {
    flexDirection: 'row',
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

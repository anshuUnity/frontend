import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayback } from '../store/AudioContext';
import { FontAwesome } from '@expo/vector-icons';

export default function PodcastDetail({ route }: any) {
  const { id, title, host, description, cover_image, category, audio_file } = route.params;
  const { playbackObj, soundObj, currentAudio, playPauseHandler } = usePlayback();
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastPress, setLastPress] = useState<number>(0);

  const audioData = { uri: audio_file, title, host, cover_image };

  useEffect(() => {
    if (soundObj && currentAudio?.uri == audio_file) {
      if (!soundObj.isLoaded) {
        setIsPlaying(false);
        setIsLoading(true); // Set loading to true while sound is loading
      } else if (soundObj.isLoaded && soundObj.isBuffering) {
        setIsPlaying(false);
        setIsLoading(true);
      } else if (soundObj.isLoaded && !soundObj.isBuffering) {
        setIsPlaying(soundObj.isPlaying);
        setIsLoading(false); // Stop loading once playing or paused
      }
    }
  }, [soundObj]);

  const debouncedPlayPauseHandler = useCallback(() => {
    const now = Date.now();
    if (now - lastPress < 1000) {
      return; // Prevent action if the last press was less than 500ms ago
    }
    setLastPress(now);

    // if (!isLoading && !isPlaying) {
      playPauseHandler(audioData);
    // }
  }, [lastPress, isLoading, isPlaying, playPauseHandler]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => console.log('Go Back')}>
        <Ionicons name="arrow-back" size={24} color="black" />
      </TouchableOpacity>

      <View style={styles.headerContainer}>
        <Image source={{ uri: cover_image }} style={styles.coverImage} />
        <View style={styles.infoContainer}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.starsContainer}>
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star" size={16} color="#FFD700" />
            <FontAwesome name="star-half" size={16} color="#FFD700" />
          </View>
          <Text style={styles.category}>{`#${category.toLowerCase()}`}</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity
          style={[styles.playButton, isLoading && styles.disabledButton]}
          onPress={debouncedPlayPauseHandler}
          disabled={isLoading}
        >
          <Text style={styles.playButtonText}>{isLoading ? 'LOADING...' : isPlaying ? 'PAUSE' : 'PLAY'}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToPlaylistButton} onPress={() => console.log('Add to Playlist')}>
          <Text style={styles.addToPlaylistText}>ADD TO PLAYLIST</Text>
        </TouchableOpacity>
        <Ionicons name="cloud-download-outline" size={28} color="black" />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>

      <View style={styles.authorContainer}>
        <Text style={styles.authorTitle}>Author</Text>
        <View style={styles.authorInfo}>
          <Image source={{ uri: cover_image }} style={styles.authorImage} />
          <Text style={styles.authorName}>{host}</Text>
          <Ionicons name="search" size={20} color="black" style={styles.searchIcon} />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  coverImage: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginRight: 20,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: '#000000',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  starsContainer: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  category: {
    marginTop: 5,
    color: '#ffffff',
    fontSize: 16,
    backgroundColor: '#000000',
    paddingVertical: 3,
    paddingHorizontal: 10,
    borderRadius: 5,
    alignSelf: 'flex-start',
  },
  actionsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  playButton: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  disabledButton: {
    backgroundColor: 'grey',
  },
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToPlaylistButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    borderColor: 'black',
    borderWidth: 1,
  },
  addToPlaylistText: {
    color: 'black',
    fontSize: 16,
  },
  descriptionContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  descriptionTitle: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    color: '#333333',
    fontSize: 16,
  },
  authorContainer: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
  },
  authorTitle: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  authorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  authorImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    color: '#000000',
    fontSize: 16,
  },
  searchIcon: {
    marginLeft: 'auto',
  },
});

import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayback } from '../store/AudioContext';


export default function PodcastDetail({ route }: any) {
  const { id, title, host, description, cover_image, category, audio_file } = route.params;
  const { playbackObj, soundObj, currentAudio, playPauseHandler } = usePlayback(); // Use context

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => console.log('Go Back')}>
        <Ionicons name="arrow-back" size={24} color="white" />
      </TouchableOpacity>

      <Image source={{ uri: cover_image }} style={styles.coverImage} />
      
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.category}>{`#${category.toLowerCase()}`}</Text>
      </View>

      <View style={styles.actionsContainer}>
        <TouchableOpacity style={styles.playButton} onPress={() => playPauseHandler(audio_file)}>
          <Text style={styles.playButtonText}>PLAY</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.addToPlaylistButton} onPress={() => console.log('Add to Playlist')}>
          <Text style={styles.addToPlaylistText}>ADD TO PLAYLIST</Text>
        </TouchableOpacity>
        <Ionicons name="cloud-download-outline" size={28} color="white" />
      </View>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.descriptionText}>{description}</Text>
      </View>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1e1e1e',
    padding: 20,
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
  coverImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  title: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  category: {
    marginTop: 5,
    color: '#ffffff',
    fontSize: 16,
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
  playButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  addToPlaylistButton: {
    backgroundColor: '#333',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  addToPlaylistText: {
    color: 'white',
    fontSize: 16,
  },
  descriptionContainer: {
    marginTop: 20,
  },
  descriptionTitle: {
    color: 'red',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  descriptionText: {
    color: '#ffffff',
    fontSize: 16,
  },
});

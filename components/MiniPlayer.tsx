import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayback } from '@/app/store/AudioContext';

export default function MiniPlayer() {
  const { playbackObj, soundObj, currentAudio, playPauseHandler } = usePlayback();

  if (!soundObj || !currentAudio || !('isPlaying' in soundObj) || !soundObj.isPlaying) {
    return null; // Don't render the MiniPlayer if no audio is playing
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: currentAudio.cover_image }} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{currentAudio.title}</Text>
        <Text style={styles.host} numberOfLines={1}>{currentAudio.host}</Text>
      </View>
        <TouchableOpacity onPress={() => playPauseHandler(currentAudio)}>
            {soundObj && soundObj.isLoaded && 'isPlaying' in soundObj && soundObj.isPlaying ? (
                <Ionicons name="pause-circle" size={32} color="black" />
            ) : (
                <Ionicons name="play-circle" size={32} color="black" />
            )}
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
    position: 'absolute',
    bottom: 80,
    left: 0,
    right: 0,
    zIndex: 10,
  },
  coverImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
  },
  title: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
  },
  host: {
    color: '#777',
    fontSize: 14,
  },
});

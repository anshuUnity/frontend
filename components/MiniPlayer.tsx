import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { usePlayback } from '@/app/store/AudioContext';


export default function MiniPlayer() {
  const { soundObj, currentAudio, playPauseHandler } = usePlayback();
  const [visible, setVisible] = useState(false);
  const [progressAnim] = useState(new Animated.Value(0)); // Animation value for the progress bar

  useEffect(() => {
    if (soundObj && currentAudio && 'isLoaded' in soundObj && !visible) {
      setVisible(true); // Make the MiniPlayer visible
    }

    if (soundObj && soundObj.isLoaded && soundObj.isBuffering) {
      startProgressAnimation(); // Start the progress bar animation when buffering
    } else {
      stopProgressAnimation(); // Stop the progress bar if not buffering
    }
  }, [soundObj]);

  const startProgressAnimation = () => {
    progressAnim.setValue(0);
    Animated.loop(
      Animated.timing(progressAnim, {
        toValue: 1,
        duration: 2000, // Duration of the animation cycle
        useNativeDriver: false,
      })
    ).start();
  };

  const stopProgressAnimation = () => {
    progressAnim.stopAnimation(); // Stop the animation
    resetProgressAnimation(); // Reset the progress bar to 0
  };

  const resetProgressAnimation = () => {
    progressAnim.setValue(0);
  };

  if (!visible || !soundObj || !currentAudio || !('isLoaded' in soundObj)) {
    return null; // Don't render the MiniPlayer if it's not visible or audio is not loaded
  }

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.progressBar, { width: progressWidth }]} />
      <Image source={{ uri: currentAudio.cover_image }} style={styles.coverImage} />
      <View style={styles.infoContainer}>
        <Text style={styles.title} numberOfLines={1}>{currentAudio.title}</Text>
        <Text style={styles.host} numberOfLines={1}>{currentAudio.host}</Text>
      </View>
      <TouchableOpacity onPress={() => playPauseHandler(currentAudio)}>
        {soundObj && soundObj.isLoaded && soundObj.isPlaying ? (
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
    bottom: 78, // Adjust based on the height of your bottom navigation
    left: 0,
    right: 0,
    zIndex: 10,
  },
  progressBar: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: 3,
    backgroundColor: 'red',
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

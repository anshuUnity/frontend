import { Podcast } from '@/constants/types';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface PodcastCardProps {
  podcast: Podcast;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <View style={styles.card}>
      <Image source={{ uri: podcast.cover_image }} style={styles.image} />
      <Text style={styles.title}>{podcast.title}</Text>
      <Text style={styles.host}>{podcast.host}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    margin: 5,
    borderRadius: 10,
    padding: 10,
  },
  image: {
    width: '100%',
    height: 150,
    borderRadius: 10,
  },
  title: {
    color: '#000',
    marginTop: 10,
    fontWeight: 'bold',
  },
  host: {
    color: '#666',
    marginTop: 5,
  },
});

export default PodcastCard;

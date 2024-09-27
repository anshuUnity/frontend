import { Podcast, PodcastPlayerNavigationProp } from '@/constants/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface PodcastCardProps {
  podcast: Podcast;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {

  const navigation = useNavigation<PodcastPlayerNavigationProp>();

  const handlePodcastPress = () => {
    navigation.navigate('PodcastDetail', {
        id: podcast.id,
        title: podcast.title,
        host: podcast.host,
        description: podcast.description,
        duration: podcast.duration,
        cover_image: podcast.cover_image,
        audio_file: podcast.audio_file,
        category: podcast.category
    });
    };
    
  return (
    <TouchableOpacity onPress={handlePodcastPress}>
        <View style={styles.card}>
          <Image source={{ uri: podcast.cover_image }} style={styles.image} />
          <Text style={styles.title}>{podcast.title}</Text>
          <Text style={styles.host}>{podcast.host}</Text>
        </View>
    </TouchableOpacity>
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

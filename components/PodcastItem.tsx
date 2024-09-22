import { PodcastPlayerNavigationProp } from '@/constants/types';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface PodcastItemProps {
  id: number;
  title: string;
  host: string;
  duration: string;
  cover_image: string;
  audio_file: string;
  category: string;
}

const PodcastItem: React.FC<PodcastItemProps> = ({ title, host, duration, cover_image, audio_file, category }) => {

    // Inside your component
    const navigation = useNavigation<PodcastPlayerNavigationProp>();

    const handlePodcastPress = () => {
    navigation.navigate('PodcastPlayer', {
        title,
        host,
        cover_image,
        audio_file,
        category,
    });
    };
  return (
    <TouchableOpacity onPress={handlePodcastPress}>
        <View style={styles.container}>
            <Image source={{ uri: cover_image }} style={styles.image} />
            <View style={styles.details}>
                <Text style={styles.title}>{title}</Text>
                <Text style={styles.host}>{host}</Text>
            </View>
            <Text style={styles.duration}>{duration}</Text>
        </View>
    </TouchableOpacity>
  );
};



const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 8,
  },
  details: {
    flex: 1,
    marginLeft: 15,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  host: {
    color: 'gray',
    marginTop: 4,
  },
  duration: {
    color: 'gray',
  },
});

export default PodcastItem;

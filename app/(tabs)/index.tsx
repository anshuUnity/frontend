import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import podcastsData from '@/assets/podcast.json'; // Import the JSON file directly
import PodcastItem from '@/components/PodcastItem';
import PodcastShimmerItem from '@/components/PodcastShimmerItem';
import { Podcast, PodcastApiResponse } from '@/constants/types';

export default function DiscoverScreen() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async () => {
    try {
      // 4d43-2607-fea8-29c0-bd00-6d56-68bd-fbf3-aed1.ngrok-free.app
      const response = await fetch('https://3afa-2607-fea8-29c0-bd00-fdd5-9ada-295b-e22.ngrok-free.app/podcasts/');
      
      const data: PodcastApiResponse = await response.json();
      setPodcasts(data.results);
    } catch (error) {
      console.error('Failed to load podcasts:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderPodcastItem = ({ item }: { item: Podcast }) => <PodcastItem {...item} />;

  const renderShimmerItem = () => <PodcastShimmerItem />;

  return (
    <View style={styles.container}>
      {loading ? (
        <FlatList
          data={Array(3).fill({})} // Render 3 shimmer items as placeholders
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderShimmerItem}
        />
      ) : (
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPodcastItem}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
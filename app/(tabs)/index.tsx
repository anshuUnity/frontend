import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import podcastsData from '@/assets/podcast.json'; // Import the JSON file directly
import PodcastItem from '@/components/PodcastItem';
import PodcastShimmerItem from '@/components/PodcastShimmerItem';
import { Podcast, PodcastApiResponse } from '@/constants/types';

export default function DiscoverScreen() {
  const [podcasts, setPodcasts] = useState<Podcast[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);

  useEffect(() => {
    fetchPodcasts();
  }, []);

  const fetchPodcasts = async (url: string = 'https://5802-2607-fea8-29c0-bd00-5982-1cbf-e92d-572a.ngrok-free.app/podcasts/') => {
    try {
      const response = await fetch(url);
      const data: PodcastApiResponse = await response.json();
      setPodcasts((prevPodcasts) => [...prevPodcasts, ...data.results]);
      setNextPageUrl(data.next);
    } catch (error) {
      console.error('Failed to load podcasts:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMorePodcasts = () => {
    if (nextPageUrl && !loadingMore) {
      setLoadingMore(true);
      fetchPodcasts(nextPageUrl);
    }
  };

  const renderPodcastItem = ({ item }: { item: Podcast }) => <PodcastItem {...item} />;

  const renderShimmerItem = () => <PodcastShimmerItem />;

  const renderFooter = () => {
    return loadingMore ? <ActivityIndicator size="large" color="#0000ff" /> : null;
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <FlatList
          data={Array(9).fill({})} // Render 3 shimmer items as placeholders
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderShimmerItem}
        />
      ) : (
        <FlatList
          data={podcasts}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPodcastItem}
          contentContainerStyle={styles.listContainer}
          onEndReached={loadMorePodcasts}
          onEndReachedThreshold={0.1}
          ListFooterComponent={renderFooter}
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

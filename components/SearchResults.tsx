import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet, Dimensions } from 'react-native';
import PodcastCard from './PostCard';
import { Podcast } from '@/constants/types';

const { width } = Dimensions.get('window');

interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Podcast[]>([]); 

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://podcastapp-bnh5e7d3abhncph2.canadacentral-01.azurewebsites.net/search/?q=${query}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (query) {
      fetchSearchResults();
    }
  }, []);

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <FlatList
      data={results}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.itemContainer}>
          <PodcastCard podcast={item} />
        </View>
      )}
      numColumns={2}
      contentContainerStyle={styles.gridContainer}
    />
  );
};

const styles = StyleSheet.create({
  gridContainer: {
    paddingHorizontal: 10,
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    width: (width / 2) - 15, // Half of the screen width minus some padding for spacing
    marginBottom: 15,        // Space between items
    marginRight: 10,         // Add right margin to avoid spacing issues in two columns
  },
});

export default SearchResults;

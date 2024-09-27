import React, { useState, useEffect } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import PodcastCard from './PostCard';
import { Podcast } from '@/constants/types';


interface SearchResultsProps {
  query: string;
}

const SearchResults: React.FC<SearchResultsProps> = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<Podcast[]>([]); // Use the Podcast interface

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`https://94c2-2607-fea8-29c0-bd00-6859-8fdb-a05f-defb.ngrok-free.app/search/?q=${query}`);
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
  }, [query]);

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
      renderItem={({ item }) => <PodcastCard podcast={item} />}
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
});

export default SearchResults;

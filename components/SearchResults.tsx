import React, { useState } from 'react';
import { View, FlatList, ActivityIndicator, StyleSheet } from 'react-native';
import PodcastCard from './PostCard';

const SearchResults = ({ query }) => {
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState([]);

  const fetchSearchResults = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/search/?q=${query}`);
      const data = await response.json();
      setResults(data.results);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
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

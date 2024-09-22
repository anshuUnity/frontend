import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

export default function PodcastShimmerItem() {
  return (
    <View style={styles.container}>
      <ShimmerPlaceholder style={styles.image} />
      <View style={styles.details}>
        <ShimmerPlaceholder style={styles.title} />
        <ShimmerPlaceholder style={styles.author} />
      </View>
      <ShimmerPlaceholder style={styles.duration} />
    </View>
  );
}

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
    width: '80%',
    height: 20,
    marginBottom: 6,
  },
  author: {
    width: '60%',
    height: 15,
  },
  duration: {
    width: 50,
    height: 15,
  },
});

import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SearchResults from '@/components/SearchResults';

const ExploreScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isExpanded, setIsExpanded] = useState(true);
  const [showGrid, setShowGrid] = useState(false);

  const handleSearch = () => {
    Keyboard.dismiss();
    setShowGrid(true);
  };

  const handleCancel = () => {
    setSearchQuery('');
    setShowGrid(false);
    setIsExpanded(false);
    Keyboard.dismiss();
  };

  const handleFocus = () => {
    setIsExpanded(true);
  };

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TouchableOpacity onPress={handleFocus} style={isExpanded ? styles.searchBoxExpanded : styles.searchBoxCollapsed}>
          <Ionicons name="search" size={20} color="#8e8e93" />
          <TextInput
            style={styles.searchInput}
            placeholder="Artists, Songs, Lyrics, and More"
            placeholderTextColor="#8e8e93"
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFocus={handleFocus}
            onSubmitEditing={handleSearch}
          />
        </TouchableOpacity>
        {isExpanded && (
          <TouchableOpacity onPress={handleCancel} style={styles.cancelButtonContainer}>
            <Text style={styles.cancelButton}>Cancel</Text>
          </TouchableOpacity>
        )}
      </View>

      {showGrid && <SearchResults query={searchQuery} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  searchBoxCollapsed: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  searchBoxExpanded: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    padding: 10,
    flex: 1,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: '#000',
  },
  cancelButtonContainer: {
    marginLeft: 10,
  },
  cancelButton: {
    color: '#ff3b30',
  },
});

export default ExploreScreen;

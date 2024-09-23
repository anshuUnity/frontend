import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '@/components/navigation/BottomTabNavigator';
import store from '../store/store';
import { PlaybackProvider } from '../store/AudioContext';
import MiniPlayer from '@/components/MiniPlayer';

export default function Layout() {
  return (
    <Provider store={store}>
      <PlaybackProvider>
        <NavigationContainer independent={true}>
          <BottomTabNavigator />
          <MiniPlayer />
        </NavigationContainer>
      </PlaybackProvider>
    </Provider>
  );
}

import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from '@/components/navigation/BottomTabNavigator';
import store from '../store/store';
import { PlaybackProvider } from '../store/AudioContext';
import MiniPlayer from '@/components/MiniPlayer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function Layout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PlaybackProvider>
          <NavigationContainer independent={true}>
            <BottomTabNavigator />
            <MiniPlayer />
          </NavigationContainer>
        </PlaybackProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

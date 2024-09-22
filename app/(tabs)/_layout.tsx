// app/(tabs)/_layout.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../store/store';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '@/components/navigation/BottomTabNavigator';
import PodcastPlayer from './PodcastPlayer';
import { AudioProvider } from '../store/AudioContext';

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <Provider store={store}>
      <AudioProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PodcastPlayer"
            component={PodcastPlayer}
            options={{ title: 'Podcast Player' }}
          />
        </Stack.Navigator>
      </AudioProvider>
    </Provider>
  );
}

// app/(tabs)/_layout.tsx
import React from 'react';
import { Provider } from 'react-redux';


import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from '@/components/navigation/BottomTabNavigator';

import PodcastDetail from './PodcastDetail';
import store from '../store/store';
import { PlaybackProvider } from '../store/AudioContext';

const Stack = createNativeStackNavigator();

export default function Layout() {
  return (
    <Provider store={store}>
      <PlaybackProvider>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PodcastDetail"
            component={PodcastDetail}
            options={{ title: 'Podcast Detail' }}
          />
        </Stack.Navigator>
      </PlaybackProvider>
    </Provider>
  );
}

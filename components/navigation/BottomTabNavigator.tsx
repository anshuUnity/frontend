import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from '@expo/vector-icons/Ionicons';
import DiscoverScreen from '@/app/(tabs)';
import ExploreScreen from '@/app/(tabs)/explore';
import LibraryScreen from '@/app/(tabs)/Library';
import SettingsScreen from '@/app/(tabs)/Settings';


const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = 'compass'; // Default icon
  
            if (route.name === 'Discover') {
              iconName = focused ? 'compass' : 'compass-outline';
            } else if (route.name === 'Explore') {
              iconName = focused ? 'search' : 'search-outline';
            }else if (route.name === 'Library') {
                iconName = focused
                  ? 'list'
                  : 'list-outline';
              } else if (route.name === 'Settings') {
                iconName = focused
                  ? 'settings'
                  : 'settings-outline';
              }
  
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
        })}
      >
        <Tab.Screen name="Discover" component={DiscoverScreen} />
        <Tab.Screen name="Explore" component={ExploreScreen} />
        <Tab.Screen name="Library" component={LibraryScreen} />
        <Tab.Screen name="Settings" component={SettingsScreen} />
        {/* Add more tabs here as needed */}
      </Tab.Navigator>
    );
  }



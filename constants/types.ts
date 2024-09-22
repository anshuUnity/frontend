import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

export interface Podcast {
    id: number;
    title: string;
    description: string;
    host: string;
    cover_image: string;
    category: string;
    language: string;
    publish_date: string;
    duration: string;
    audio_file: string;
    is_explicit: boolean;
    tags: Tag[];
  }
  
  export interface Tag {
    id: number;
    name: string;
  }
  
  export interface PodcastApiResponse {
    count: number;
    next: string | null;
    previous: string | null;
    results: Podcast[];
  }

  

export type RootStackParamList = {
  Discover: undefined;
  PodcastPlayer: {
    title: string;
    host: string;
    cover_image: string;
    audio_file: string;
    category: string;
  };
};

// Navigation prop types
export type PodcastPlayerNavigationProp = StackNavigationProp<
  RootStackParamList,
  'PodcastPlayer'
>;

export type PodcastPlayerRouteProp = RouteProp<
  RootStackParamList,
  'PodcastPlayer'
>;

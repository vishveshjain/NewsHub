export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio: string;
  credibilityScore: number;
  joinedDate: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  followersCount: number;
  followingCount: number;
}

export interface Location {
  city: string;
  state: string;
  country: string;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  type: 'article' | 'video';
  videoUrl?: string;
  location: Location;
  categories: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
  viewCount: number;
  isModerated: boolean;
  comments: number;
}

export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
}

export interface SearchFilters {
  location?: {
    city?: string;
    state?: string;
    country?: string;
  };
  dateRange?: {
    from?: string;
    to?: string;
  };
  categories?: string[];
  contentType?: 'article' | 'video' | 'all';
  sortBy?: 'trending' | 'newest' | 'mostViewed';
}
// User related types
export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string;
  bio?: string;
  credibilityScore: number;
  joinedDate: string;
  location: {
    city: string;
    state: string;
    country: string;
  };
  followersCount: number;
  followingCount: number;
  following?: User[];
}

// News related types
export interface NewsItem {
  id: string;
  title: string;
  description: string;
  content: string;
  thumbnail: string;
  videoUrl?: string;
  type: 'article' | 'video' | 'image' | 'audio';
  location: {
    city: string;
    state: string;
    country: string;
    coordinates?: {
      lat: number;
      lng: number;
    };
  };
  categories: string[];
  author: User;
  createdAt: string;
  updatedAt: string;
  upvotes: number;
  downvotes: number;
  viewCount: number;
  isModerated: boolean;
  comments: number;
  isBookmarked?: boolean;
}

// Search related types
export interface SearchFilters {
  query?: string;
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
  contentType?: 'all' | 'article' | 'video' | 'image' | 'audio';
  sortBy?: 'trending' | 'newest' | 'mostViewed';
}

// Comment related types
export interface Comment {
  id: string;
  content: string;
  author: User;
  createdAt: string;
  upvotes: number;
  downvotes: number;
  replies?: Comment[];
}

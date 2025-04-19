import React, { createContext, useState, useContext, useEffect } from 'react';
import { NewsItem, SearchFilters } from '../types';
import { fetchTrendingNews } from '../utils/mockData';

interface NewsContextType {
  trendingNews: NewsItem[];
  forYouNews: NewsItem[];
  recentNews: NewsItem[];
  isLoading: boolean;
  error: string | null;
  voteOnNews: (id: string, vote: 'up' | 'down') => void;
  bookmarkNews: (id: string) => void;
  refreshNews: () => Promise<void>;
  searchNews: (filters: SearchFilters) => Promise<NewsItem[]>;
}

const NewsContext = createContext<NewsContextType>({
  trendingNews: [],
  forYouNews: [],
  recentNews: [],
  isLoading: false,
  error: null,
  voteOnNews: () => {},
  bookmarkNews: () => {},
  refreshNews: async () => {},
  searchNews: async () => [],
});

export const useNews = () => useContext(NewsContext);

export const NewsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [trendingNews, setTrendingNews] = useState<NewsItem[]>([]);
  const [forYouNews, setForYouNews] = useState<NewsItem[]>([]);
  const [recentNews, setRecentNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [bookmarkedNews, setBookmarkedNews] = useState<string[]>([]);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = async () => {
    try {
      setIsLoading(true);
      // Load trending news
      const trending = await fetchTrendingNews();
      
      // Add isBookmarked property to each news item
      const trendingWithBookmarks = trending.map(news => ({
        ...news,
        isBookmarked: false
      }));
      
      setTrendingNews(trendingWithBookmarks);
      
      // For demo, we'll use the same data source but sort differently for other sections
      const recent = [...trendingWithBookmarks].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      setRecentNews(recent);
      
      // For demo, personalized recommendations can be a shuffled subset
      const forYou = [...trendingWithBookmarks]
        .sort(() => 0.5 - Math.random())
        .slice(0, 4);
      setForYouNews(forYou);
      
      setIsLoading(false);
    } catch (err) {
      console.error('Error loading news data:', err);
      setError('Failed to load news data');
      setIsLoading(false);
    }
  };

  const refreshNews = async () => {
    await loadInitialData();
  };

  const voteOnNews = (id: string, vote: 'up' | 'down') => {
    // Update news items in all lists
    const updateNewsInList = (list: NewsItem[]) => {
      return list.map(item => {
        if (item.id === id) {
          const updatedItem = { ...item };
          if (vote === 'up') {
            updatedItem.upvotes += 1;
          } else {
            updatedItem.downvotes += 1;
          }
          return updatedItem;
        }
        return item;
      });
    };

    setTrendingNews(updateNewsInList(trendingNews));
    setForYouNews(updateNewsInList(forYouNews));
    setRecentNews(updateNewsInList(recentNews));
  };

  const bookmarkNews = (id: string) => {
    if (bookmarkedNews.includes(id)) {
      setBookmarkedNews(bookmarkedNews.filter(newsId => newsId !== id));
    } else {
      setBookmarkedNews([...bookmarkedNews, id]);
    }
  };

  const searchNews = async (filters: SearchFilters): Promise<NewsItem[]> => {
    // In a real app, this would call an API with the filters
    // For this demo, we'll filter the trending news based on the provided filters
    let results = [...trendingNews];

    // Filter by location
    if (filters.location) {
      const { city, state, country } = filters.location;
      if (city) {
        results = results.filter(news => 
          news.location.city.toLowerCase().includes(city.toLowerCase())
        );
      }
      if (state) {
        results = results.filter(news => 
          news.location.state.toLowerCase().includes(state.toLowerCase())
        );
      }
      if (country) {
        results = results.filter(news => 
          news.location.country.toLowerCase().includes(country.toLowerCase())
        );
      }
    }

    // Filter by date range
    if (filters.dateRange) {
      const { from, to } = filters.dateRange;
      if (from) {
        const fromDate = new Date(from);
        results = results.filter(news => new Date(news.createdAt) >= fromDate);
      }
      if (to) {
        const toDate = new Date(to);
        results = results.filter(news => new Date(news.createdAt) <= toDate);
      }
    }

    // Filter by categories
    if (filters.categories && filters.categories.length > 0) {
      results = results.filter(news => 
        news.categories.some(category => 
          filters.categories?.includes(category)
        )
      );
    }

    // Filter by content type
    if (filters.contentType && filters.contentType !== 'all') {
      results = results.filter(news => news.type === filters.contentType);
    }

    // Sort by selected criteria
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'newest':
          results.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
          break;
        case 'mostViewed':
          results.sort((a, b) => b.viewCount - a.viewCount);
          break;
        case 'trending':
        default:
          results.sort((a, b) => {
            const aScore = a.upvotes - a.downvotes + (a.viewCount / 1000);
            const bScore = b.upvotes - b.downvotes + (b.viewCount / 1000);
            return bScore - aScore;
          });
          break;
      }
    }

    return new Promise(resolve => {
      setTimeout(() => resolve(results), 500);
    });
  };

  return (
    <NewsContext.Provider
      value={{
        trendingNews,
        forYouNews,
        recentNews,
        isLoading,
        error,
        voteOnNews,
        bookmarkNews,
        refreshNews,
        searchNews,
      }}
    >
      {children}
    </NewsContext.Provider>
  );
};
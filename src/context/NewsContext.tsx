import React, { createContext, useState, useContext, useEffect } from 'react';
import { NewsItem, SearchFilters } from '../types';
import { newsAPI } from '../services/api';

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
      setError(null);
      // Load trending news from backend
      const trending = await newsAPI.getAll(1, 10, { sortBy: 'trending' });
      setTrendingNews(trending);

      // Recent news (sorted by newest)
      const recent = await newsAPI.getAll(1, 10, { sortBy: 'newest' });
      setRecentNews(recent);

      // ForYou news (random subset of trending)
      const forYou = trending
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
    // Use backend API for searching news
    const apiFilters: any = {};
    if (filters.categories && filters.categories.length > 0) {
      apiFilters.category = filters.categories.join(',');
    }
    if (filters.location) {
      // Assuming backend supports a location string
      const { city, state, country } = filters.location;
      apiFilters.location = [city, state, country].filter(Boolean).join(',');
    }
    if (filters.sortBy) {
      apiFilters.sortBy = filters.sortBy;
    }
    if (filters.contentType && filters.contentType !== 'all') {
      apiFilters.contentType = filters.contentType;
    }
    if (filters.query) {
      apiFilters.search = filters.query;
    }
    // Date range, if supported by backend
    if (filters.dateRange) {
      if (filters.dateRange.from) apiFilters.from = filters.dateRange.from;
      if (filters.dateRange.to) apiFilters.to = filters.dateRange.to;
    }
    return await newsAPI.getAll(1, 20, apiFilters);
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
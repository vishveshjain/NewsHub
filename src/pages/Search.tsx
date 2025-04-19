import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search as SearchIcon, MapPin } from 'lucide-react';
import { SearchFilters } from '../components/search/SearchFilters';
import { NewsGrid } from '../components/news/NewsGrid';
import { Card } from '../components/common/Card';
import { useNews } from '../context/NewsContext';
import { NewsItem, SearchFilters as SearchFiltersType } from '../types';

export const Search: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { searchNews } = useNews();
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [searchResults, setSearchResults] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  
  // Get initial filters from URL params
  const getInitialFilters = (): SearchFiltersType => {
    const filters: SearchFiltersType = {};
    
    // Location
    const locationParam = searchParams.get('location');
    if (locationParam) {
      const [city, state, country] = locationParam.split(',').map(part => part.trim());
      filters.location = {};
      if (city) filters.location.city = city;
      if (state) filters.location.state = state;
      if (country) filters.location.country = country;
    }
    
    // Categories
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      filters.categories = [categoryParam];
    }
    
    // Content Type
    const contentTypeParam = searchParams.get('type') as 'article' | 'video' | undefined;
    if (contentTypeParam) {
      filters.contentType = contentTypeParam;
    }
    
    // Sort
    const sortParam = searchParams.get('sort') as 'trending' | 'newest' | 'mostViewed' | undefined;
    if (sortParam) {
      filters.sortBy = sortParam;
    } else {
      filters.sortBy = 'trending';
    }
    
    return filters;
  };

  const [filters, setFilters] = useState<SearchFiltersType>(getInitialFilters());

  // Handle search form submission
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
    // Update URL query parameter
    setSearchParams({ q: searchQuery, ...serializeFiltersForUrl(filters) });
  };

  // Convert filters to URL params
  const serializeFiltersForUrl = (filters: SearchFiltersType) => {
    const params: Record<string, string> = {};
    
    if (filters.location) {
      const locationParts = [];
      if (filters.location.city) locationParts.push(filters.location.city);
      if (filters.location.state) locationParts.push(filters.location.state);
      if (filters.location.country) locationParts.push(filters.location.country);
      
      if (locationParts.length > 0) {
        params.location = locationParts.join(', ');
      }
    }
    
    if (filters.categories && filters.categories.length === 1) {
      params.category = filters.categories[0];
    } else if (filters.categories && filters.categories.length > 1) {
      params.categories = filters.categories.join(',');
    }
    
    if (filters.contentType && filters.contentType !== 'all') {
      params.type = filters.contentType;
    }
    
    if (filters.sortBy && filters.sortBy !== 'trending') {
      params.sort = filters.sortBy;
    }
    
    return params;
  };

  // Handle filter changes
  const handleApplyFilters = (newFilters: SearchFiltersType) => {
    setFilters(newFilters);
    
    // Update URL with filters
    setSearchParams({
      ...(searchQuery && { q: searchQuery }),
      ...serializeFiltersForUrl(newFilters)
    });
    
    // Perform search with new filters
    performSearch(newFilters);
  };

  // Perform search with current query and filters
  const performSearch = async (searchFilters = filters) => {
    setIsLoading(true);
    try {
      const results = await searchNews(searchFilters);
      
      // Filter by search query if present
      let filteredResults = results;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        filteredResults = results.filter(item => 
          item.title.toLowerCase().includes(query) ||
          item.description.toLowerCase().includes(query) ||
          item.content.toLowerCase().includes(query) ||
          item.author.username.toLowerCase().includes(query) ||
          item.categories.some(cat => cat.toLowerCase().includes(query)) ||
          item.location.city.toLowerCase().includes(query) ||
          item.location.state.toLowerCase().includes(query) ||
          item.location.country.toLowerCase().includes(query)
        );
      }
      
      setSearchResults(filteredResults);
      setTotalResults(filteredResults.length);
    } catch (error) {
      console.error('Error performing search:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Initial search on component mount and when URL params change
  useEffect(() => {
    const query = searchParams.get('q') || '';
    setSearchQuery(query);
    
    const newFilters = getInitialFilters();
    setFilters(newFilters);
    
    performSearch(newFilters);
  }, [searchParams.toString()]);

  return (
    <div className="container mx-auto pt-24 pb-12 px-4 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Search News</h1>
      
      {/* Search Form */}
      <Card className="mb-6">
        <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
          <div className="relative flex-grow">
            <input
              type="text"
              placeholder="Search for news, topics, or locations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 pr-10 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <SearchIcon className="h-5 w-5 text-gray-400" />
            </div>
          </div>
          <button 
            type="submit" 
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Search
          </button>
        </form>
      </Card>
      
      {/* Filters */}
      <SearchFilters onApplyFilters={handleApplyFilters} initialFilters={filters} />
      
      {/* Results Summary */}
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            {isLoading ? 'Searching...' : `${totalResults} results found`}
          </h2>
          {filters.location && (Object.values(filters.location).some(val => val)) && (
            <div className="flex items-center mt-1 text-gray-600">
              <MapPin size={16} className="mr-1" />
              <span>
                {[
                  filters.location.city,
                  filters.location.state,
                  filters.location.country
                ].filter(Boolean).join(', ')}
              </span>
            </div>
          )}
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="flex justify-center my-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
      )}
      
      {/* Results Grid */}
      {!isLoading && (
        <NewsGrid news={searchResults} columns={3} />
      )}
    </div>
  );
};
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Map, TrendingUp, Globe, Sparkles } from 'lucide-react';
import { useNews } from '../context/NewsContext';
import { NewsGrid } from '../components/news/NewsGrid';
import { NewsCard } from '../components/news/NewsCard';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { trendingTopics, categories } from '../utils/mockData';

export const Home: React.FC = () => {
  console.log('Rendering Home component');
  
  const [searchQuery, setSearchQuery] = useState('');
  const newsContext = useNews();
  console.log('News context:', newsContext);
  
  // Safely access news data with null checks
  const { trendingNews = [], forYouNews = [], recentNews = [], isLoading = false, error = null, refreshNews } = newsContext || {};
  console.log('News data:', { trendingNews, forYouNews, recentNews, isLoading, error });

  // Split the trending news for the hero section
  const featuredNews = trendingNews && trendingNews.length > 0 ? [trendingNews[0]] : [];
  const secondaryNews = trendingNews && trendingNews.length > 1 ? trendingNews.slice(1, 3) : [];
  const remainingTrendingNews = trendingNews && trendingNews.length > 3 ? trendingNews.slice(3) : [];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to search page with query
    window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="text-red-500 mb-4 text-xl">
          <span>⚠️ {error}</span>
        </div>
        <Button variant="primary" onClick={() => refreshNews()}>
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="pt-16 pb-12">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 via-blue-800 to-teal-800 text-white py-16 md:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Stay Connected to What Matters
            </h1>
            <p className="text-lg md:text-xl text-blue-100 mb-8">
              Discover local and global news that impacts your world
            </p>
            
            <form onSubmit={handleSearchSubmit} className="flex w-full max-w-md mx-auto">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search by location or topic..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-3 pr-10 rounded-l-lg text-gray-900 focus:outline-none"
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <button type="submit" className="bg-blue-600 text-white px-4 py-3 rounded-r-lg hover:bg-blue-700 transition-colors">
                Search
              </button>
            </form>
          </div>

          {trendingNews.length > 0 && (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {/* Main Featured Article */}
              <div className="lg:col-span-2">
                {featuredNews.map(news => (
                  <NewsCard key={news.id} news={news} variant="featured" />
                ))}
              </div>
              
              {/* Secondary Articles */}
              <div className="space-y-6">
                {secondaryNews.map(news => (
                  <NewsCard key={news.id} news={news} variant="compact" />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Trending Topics */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-blue-600" />
              Trending Topics
            </h2>
            <Link to="/search" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
              View All Topics
            </Link>
          </div>
          
          <div className="flex overflow-x-auto pb-4 -mx-4 px-4 space-x-4 scrollbar-hide">
            {trendingTopics.map((topic, index) => (
              <Link 
                key={index} 
                to={`/search?topic=${encodeURIComponent(topic)}`}
                className="flex-shrink-0 bg-gradient-to-r from-blue-600 to-teal-500 hover:from-blue-700 hover:to-teal-600 text-white rounded-lg overflow-hidden shadow-md transition-transform hover:scale-105"
              >
                <div className="w-48 h-24 flex items-center justify-center p-4">
                  <h3 className="text-lg font-bold text-center">{topic}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Trending News */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center">
                  <Globe className="h-6 w-6 mr-2 text-blue-600" />
                  Trending News
                </h2>
                <Link to="/search?sort=trending" className="text-blue-600 hover:text-blue-800 font-medium text-sm">
                  See More
                </Link>
              </div>
              
              <div className="space-y-6">
                <NewsGrid news={remainingTrendingNews} columns={2} />
              </div>
            </div>
            
            {/* Right Column: Personalized & Categories */}
            <div>
              {/* For You Section */}
              <div className="mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold text-gray-900 flex items-center">
                    <Sparkles className="h-5 w-5 mr-2 text-blue-600" />
                    For You
                  </h2>
                </div>
                
                <div className="space-y-4">
                  {forYouNews.map(news => (
                    <NewsCard key={news.id} news={news} variant="compact" />
                  ))}
                </div>
              </div>
              
              {/* Categories Section */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-4">
                  Explore Categories
                </h2>
                
                <div className="grid grid-cols-2 gap-3">
                  {categories.slice(0, 8).map((category, index) => (
                    <Link 
                      key={index}
                      to={`/search?category=${encodeURIComponent(category)}`}
                      className="bg-white p-3 rounded-lg shadow-sm hover:shadow-md border border-gray-100 transition-shadow text-center"
                    >
                      <span className="font-medium text-gray-800">{category}</span>
                    </Link>
                  ))}
                </div>
                
                <div className="mt-4 text-center">
                  <Link 
                    to="/search"
                    className="text-blue-600 hover:text-blue-800 font-medium text-sm"
                  >
                    View All Categories
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              News From Around The World
            </h2>
            <p className="text-lg text-gray-600">
              Discover what's happening in your area or explore news from different locations
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {['San Francisco, USA', 'London, UK', 'Tokyo, Japan'].map((location, index) => (
              <Card key={index} elevated className="overflow-hidden group">
                <Link to={`/search?location=${encodeURIComponent(location)}`} className="block">
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={`https://images.pexels.com/photos/${[414837, 460672, 1134166][index]}/pexels-photo-${[414837, 460672, 1134166][index]}.jpeg?auto=compress&cs=tinysrgb&w=640`} 
                      alt={location}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
                      <div className="p-4 w-full">
                        <div className="flex items-center justify-between">
                          <h3 className="text-xl font-bold text-white">{location}</h3>
                          <div className="bg-blue-600 text-white p-2 rounded-full">
                            <Map size={18} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <Button variant="primary" size="lg">
              Explore Location-Based News
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
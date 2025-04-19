import React, { useState } from 'react';
import { Calendar, MapPin, Bookmark, Tag, Film, FileText, SlidersHorizontal } from 'lucide-react';
import { Button } from '../common/Button';
import { categories } from '../../utils/mockData';
import { SearchFilters as SearchFiltersType } from '../../types';

interface SearchFiltersProps {
  onApplyFilters: (filters: SearchFiltersType) => void;
  initialFilters?: SearchFiltersType;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({ 
  onApplyFilters,
  initialFilters = {}
}) => {
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<SearchFiltersType>(initialFilters);
  const [locationInput, setLocationInput] = useState({
    city: initialFilters.location?.city || '',
    state: initialFilters.location?.state || '',
    country: initialFilters.location?.country || ''
  });
  const [dateRange, setDateRange] = useState({
    from: initialFilters.dateRange?.from || '',
    to: initialFilters.dateRange?.to || ''
  });
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    initialFilters.categories || []
  );
  const [contentType, setContentType] = useState<'all' | 'article' | 'video'>(
    initialFilters.contentType || 'all'
  );
  const [sortBy, setSortBy] = useState<'trending' | 'newest' | 'mostViewed'>(
    initialFilters.sortBy || 'trending'
  );

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const applyFilters = () => {
    const newFilters: SearchFiltersType = {
      sortBy
    };

    // Only add location if at least one field is filled
    if (locationInput.city || locationInput.state || locationInput.country) {
      newFilters.location = {
        ...(locationInput.city && { city: locationInput.city }),
        ...(locationInput.state && { state: locationInput.state }),
        ...(locationInput.country && { country: locationInput.country })
      };
    }

    // Only add date range if at least one date is selected
    if (dateRange.from || dateRange.to) {
      newFilters.dateRange = {
        ...(dateRange.from && { from: dateRange.from }),
        ...(dateRange.to && { to: dateRange.to })
      };
    }

    // Only add categories if any are selected
    if (selectedCategories.length > 0) {
      newFilters.categories = selectedCategories;
    }

    // Only add content type if not 'all'
    if (contentType !== 'all') {
      newFilters.contentType = contentType;
    }

    setFilters(newFilters);
    onApplyFilters(newFilters);
    setFiltersOpen(false);
  };

  const clearFilters = () => {
    setLocationInput({ city: '', state: '', country: '' });
    setDateRange({ from: '', to: '' });
    setSelectedCategories([]);
    setContentType('all');
    setSortBy('trending');
    
    const emptyFilters = { sortBy: 'trending' as const };
    setFilters(emptyFilters);
    onApplyFilters(emptyFilters);
  };

  // Count active filters
  const countActiveFilters = () => {
    let count = 0;
    if (locationInput.city || locationInput.state || locationInput.country) count++;
    if (dateRange.from || dateRange.to) count++;
    if (selectedCategories.length > 0) count++;
    if (contentType !== 'all') count++;
    if (sortBy !== 'trending') count++;
    return count;
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      {/* Filter Toggle Button */}
      <div className="flex justify-between items-center mb-4">
        <Button 
          variant="ghost" 
          onClick={() => setFiltersOpen(!filtersOpen)}
          icon={<SlidersHorizontal size={18} />}
        >
          Filters
          {countActiveFilters() > 0 && (
            <span className="ml-2 px-2 py-0.5 bg-blue-100 text-blue-800 text-xs rounded-full">
              {countActiveFilters()}
            </span>
          )}
        </Button>
        
        <div className="flex space-x-2">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'trending' | 'newest' | 'mostViewed')}
            className="px-3 py-2 bg-gray-100 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="trending">Trending</option>
            <option value="newest">Newest</option>
            <option value="mostViewed">Most Viewed</option>
          </select>
        </div>
      </div>
      
      {/* Filter Panel */}
      {filtersOpen && (
        <div className="border-t border-gray-200 pt-4 animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Location Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <MapPin size={16} className="mr-1" />
                Location
              </h3>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="City"
                  value={locationInput.city}
                  onChange={(e) => setLocationInput({ ...locationInput, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="State/Province"
                  value={locationInput.state}
                  onChange={(e) => setLocationInput({ ...locationInput, state: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Country"
                  value={locationInput.country}
                  onChange={(e) => setLocationInput({ ...locationInput, country: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            
            {/* Date Range Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Calendar size={16} className="mr-1" />
                Date Range
              </h3>
              <div className="space-y-2">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">From</label>
                  <input
                    type="date"
                    value={dateRange.from}
                    onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">To</label>
                  <input
                    type="date"
                    value={dateRange.to}
                    onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
            
            {/* Categories Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Tag size={16} className="mr-1" />
                Categories
              </h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-2 py-1 text-xs rounded-md transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Content Type Filter */}
            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                <Film size={16} className="mr-1" />
                Content Type
              </h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => setContentType('all')}
                  className={`px-3 py-2 text-sm rounded-md flex items-center transition-colors ${
                    contentType === 'all'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>All</span>
                </button>
                <button
                  onClick={() => setContentType('article')}
                  className={`px-3 py-2 text-sm rounded-md flex items-center transition-colors ${
                    contentType === 'article'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <FileText size={16} className="mr-1" />
                  <span>Articles</span>
                </button>
                <button
                  onClick={() => setContentType('video')}
                  className={`px-3 py-2 text-sm rounded-md flex items-center transition-colors ${
                    contentType === 'video'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Film size={16} className="mr-1" />
                  <span>Videos</span>
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-end mt-6 space-x-3">
            <Button variant="ghost" onClick={clearFilters}>
              Clear Filters
            </Button>
            <Button variant="primary" onClick={applyFilters}>
              Apply Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
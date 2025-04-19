import React from 'react';
import { NewsItem } from '../../types';
import { NewsCard } from './NewsCard';

interface NewsGridProps {
  news: NewsItem[];
  columns?: 1 | 2 | 3 | 4;
  variant?: 'standard' | 'compact' | 'featured';
}

export const NewsGrid: React.FC<NewsGridProps> = ({ 
  news, 
  columns = 3, 
  variant = 'standard'
}) => {
  const gridColumns = {
    1: 'grid-cols-1',
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4',
  };

  if (news.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center">
        <div className="text-gray-400 mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2"></path>
            <path d="M18 14h-8"></path>
            <path d="M15 18h-5"></path>
            <path d="M10 6h8v4h-8z"></path>
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-gray-700">No News Found</h3>
        <p className="text-gray-500 mt-2">Try adjusting your search filters or check back later</p>
      </div>
    );
  }

  return (
    <div className={`grid ${gridColumns[columns]} gap-6`}>
      {news.map((item) => (
        <NewsCard key={item.id} news={item} variant={variant} />
      ))}
    </div>
  );
};
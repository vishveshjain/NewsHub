import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MapPin, Calendar, Eye, MessageSquare, Bookmark, Share2 } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { NewsItem } from '../../types';
import { Card } from '../common/Card';
import { useNews } from '../../context/NewsContext';

const getVideoThumbnail = (url: string) => {
  let id = '';
  try {
    const u = new URL(url);
    id = u.searchParams.get('v') || u.pathname.split('/').pop() || '';
  } catch {
    id = '';
  }
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
};

interface NewsCardProps {
  news: NewsItem;
  variant?: 'standard' | 'compact' | 'featured';
}

export const NewsCard: React.FC<NewsCardProps> = ({ news, variant = 'standard' }) => {
  const { voteOnNews, bookmarkNews } = useNews();
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(news.upvotes);
  const [localDownvotes, setLocalDownvotes] = useState(news.downvotes);
  
  const handleBookmark = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    bookmarkNews(news.id);
  };
  
  const handleUpvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalUpvotes(localUpvotes + 1);
    voteOnNews(news.id, 'up');
  };
  
  const handleDownvote = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLocalDownvotes(localDownvotes + 1);
    voteOnNews(news.id, 'down');
  };

  const handleShare = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(window.location.origin + '/news/' + news.id);
    // In a real app, you would show a toast notification here
  };
  
  const renderFeatured = () => (
    <Card elevated className="w-full h-full overflow-hidden group transform transition-transform hover:scale-[1.01]">
      <Link to={`/news/${news.id}`} className="block h-full">
        <div className="relative h-80">
          <img 
            src={news.thumbnail || (news.videoUrl ? getVideoThumbnail(news.videoUrl) : '')} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0 mr-3">
                <img 
                  src={news.author.avatar} 
                  alt={news.author.username} 
                  className="h-10 w-10 rounded-full border-2 border-white"
                />
              </div>
              <div>
                <p className="text-white font-medium">{news.author.username}</p>
                <div className="flex items-center space-x-2 text-sm text-gray-300">
                  <MapPin size={14} />
                  <span>{news.location.city}, {news.location.country}</span>
                </div>
              </div>
            </div>
            
            <span className="inline-flex mb-2">
              {news.categories.slice(0, 3).map((category, index) => (
                <span 
                  key={index} 
                  className="mr-2 px-2 py-1 bg-blue-600 text-white text-xs rounded-md"
                >
                  {category}
                </span>
              ))}
            </span>
            
            <h2 className="text-2xl font-bold text-white mb-2">{news.title}</h2>
            <p className="text-gray-200 mb-3 line-clamp-2">{news.description}</p>
            
            <div className="flex items-center justify-between text-gray-300 pt-3 border-t border-gray-700">
              <div className="flex items-center space-x-3">
                <div className="flex items-center">
                  <Calendar size={16} className="mr-1" />
                  <span>{formatDistanceToNow(new Date(news.createdAt), { addSuffix: true })}</span>
                </div>
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span>{news.viewCount.toLocaleString()}</span>
                </div>
                <div className="flex items-center">
                  <MessageSquare size={16} className="mr-1" />
                  <span>{news.comments}</span>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleBookmark} 
                  className={`p-1.5 rounded-full transition-colors ${isBookmarked ? 'text-yellow-400' : 'text-gray-300 hover:text-yellow-400'}`}
                >
                  <Bookmark size={18} />
                </button>
                <button 
                  onClick={handleShare} 
                  className="p-1.5 rounded-full text-gray-300 hover:text-white transition-colors"
                >
                  <Share2 size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
  
  const renderStandard = () => (
    <Card elevated className="overflow-hidden group hover:shadow-lg transition-all">
      <Link to={`/news/${news.id}`} className="block">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={news.thumbnail || (news.videoUrl ? getVideoThumbnail(news.videoUrl) : '')} 
            alt={news.title} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {news.type === 'video' && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-14 h-14 rounded-full bg-blue-600 bg-opacity-75 flex items-center justify-center">
                <div className="w-0 h-0 border-y-8 border-y-transparent border-l-12 border-l-white ml-1"></div>
              </div>
            </div>
          )}
        </div>
        
        <div className="p-4">
          <div className="flex items-center mb-3">
            <div className="flex-shrink-0 mr-3">
              <img 
                src={news.author.avatar} 
                alt={news.author.username} 
                className="h-8 w-8 rounded-full border-2 border-white"
              />
            </div>
            <div>
              <p className="text-gray-900 font-medium">{news.author.username}</p>
              <div className="flex items-center text-sm text-gray-500">
                <MapPin size={14} className="mr-1" />
                <span>{news.location.city}, {news.location.country}</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap mb-2">
            {news.categories.slice(0, 3).map((category, index) => (
              <span 
                key={index} 
                className="mr-2 mb-2 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-md"
              >
                {category}
              </span>
            ))}
          </div>
          
          <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">{news.title}</h2>
          <p className="text-gray-600 mb-4 line-clamp-2">{news.description}</p>
          
          <div className="flex items-center justify-between text-gray-500 pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-4">
              <button 
                onClick={handleUpvote} 
                className="flex items-center text-gray-500 hover:text-blue-600 transition-colors"
              >
                <ThumbsUp size={16} className="mr-1" />
                <span>{localUpvotes}</span>
              </button>
              <button 
                onClick={handleDownvote} 
                className="flex items-center text-gray-500 hover:text-red-600 transition-colors"
              >
                <ThumbsDown size={16} className="mr-1" />
                <span>{localDownvotes}</span>
              </button>
              <div className="flex items-center">
                <MessageSquare size={16} className="mr-1" />
                <span>{news.comments}</span>
              </div>
            </div>
            <div className="flex items-center text-sm">
              <Calendar size={14} className="mr-1" />
              <span>{formatDistanceToNow(new Date(news.createdAt), { addSuffix: true })}</span>
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
  
  const renderCompact = () => (
    <Card className="flex hover:shadow-md transition-all">
      <Link to={`/news/${news.id}`} className="flex w-full">
        <div className="w-1/3 flex-shrink-0">
          <img 
            src={news.thumbnail || (news.videoUrl ? getVideoThumbnail(news.videoUrl) : '')} 
            alt={news.title} 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-2/3 p-3">
          <div className="flex items-center mb-1 text-xs text-gray-500">
            <span>{news.location.city}, {news.location.country}</span>
            <span className="mx-2">•</span>
            <span>{formatDistanceToNow(new Date(news.createdAt), { addSuffix: true })}</span>
          </div>
          <h3 className="text-md font-bold text-gray-900 mb-1 line-clamp-2">{news.title}</h3>
          <p className="text-xs text-gray-600 mb-2 line-clamp-1">{news.description}</p>
          
          <div className="flex items-center justify-between text-xs text-gray-500">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <ThumbsUp size={12} className="mr-1" />
                <span>{localUpvotes}</span>
              </div>
              <div className="flex items-center">
                <Eye size={12} className="mr-1" />
                <span>{news.viewCount.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              {news.categories.slice(0, 1).map((category, index) => (
                <span key={index} className="px-1.5 py-0.5 bg-blue-100 text-blue-800 text-xs rounded">
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Link>
    </Card>
  );
  
  switch (variant) {
    case 'featured':
      return renderFeatured();
    case 'compact':
      return renderCompact();
    case 'standard':
    default:
      return renderStandard();
  }
};
import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThumbsUp, ThumbsDown, MapPin, Eye, MessageSquare, Bookmark, Share2, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { NewsGrid } from '../components/news/NewsGrid';
import { fetchNewsById, fetchCommentsByNewsId, fetchTrendingNews, mockUsers } from '../utils/mockData';
import { NewsItem, Comment } from '../types';

export const NewsDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [news, setNews] = useState<NewsItem | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [relatedNews, setRelatedNews] = useState<NewsItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [localUpvotes, setLocalUpvotes] = useState(0);
  const [localDownvotes, setLocalDownvotes] = useState(0);
  const [commentContent, setCommentContent] = useState('');

  useEffect(() => {
    const loadNewsData = async () => {
      if (!id) return;
      
      try {
        setIsLoading(true);
        setError(null);
        
        // Fetch news details
        const newsData = await fetchNewsById(id);
        if (!newsData) {
          setError('News not found');
          setIsLoading(false);
          return;
        }
        
        setNews(newsData);
        setLocalUpvotes(newsData.upvotes);
        setLocalDownvotes(newsData.downvotes);
        
        // Fetch comments
        const commentsData = await fetchCommentsByNewsId(id);
        setComments(commentsData);
        
        // Fetch related news
        const allNews = await fetchTrendingNews();
        const related = allNews
          .filter(item => 
            item.id !== id && 
            item.categories.some(cat => newsData.categories.includes(cat))
          )
          .slice(0, 3);
        setRelatedNews(related);
        
        setIsLoading(false);
      } catch (err) {
        setError('Failed to load news details');
        setIsLoading(false);
      }
    };
    
    loadNewsData();
  }, [id]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };
  
  const handleUpvote = () => {
    setLocalUpvotes(prev => prev + 1);
  };
  
  const handleDownvote = () => {
    setLocalDownvotes(prev => prev + 1);
  };
  
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // In a real app, you would show a toast notification here
  };
  
  const handleSubmitComment = () => {
    if (!commentContent.trim()) return;
    
    const newComment: Comment = {
      id: `temp-${Date.now()}`,
      content: commentContent,
      author: mockUsers[0], // Current user
      createdAt: new Date().toISOString(),
      upvotes: 0,
      downvotes: 0
    };
    
    setComments([newComment, ...comments]);
    setCommentContent('');
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error || !news) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="text-red-500 mb-4 text-xl flex items-center justify-center">
          <AlertTriangle className="mr-2" />
          <span>{error || 'News not found'}</span>
        </div>
        <Link to="/">
          <Button variant="primary">
            Back to Home
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 pb-12">
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-wrap items-center mb-4 text-blue-100">
              {news.categories.map((category, index) => (
                <Link 
                  key={index}
                  to={`/search?category=${encodeURIComponent(category)}`}
                  className="mr-2 mb-2 px-3 py-1 bg-blue-800 hover:bg-blue-700 rounded-full text-sm transition-colors"
                >
                  {category}
                </Link>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{news.title}</h1>
            
            <p className="text-xl text-blue-100 mb-6">{news.description}</p>
            
            <div className="flex flex-wrap items-center justify-between">
              <div className="flex items-center mb-4 md:mb-0">
                <Link to={`/profile/${news.author.id}`} className="flex items-center group">
                  <img 
                    src={news.author.avatar}
                    alt={news.author.username}
                    className="w-12 h-12 rounded-full mr-4"
                  />
                  <div className="ml-3">
                    <Link to={`/profile/${news.author.id}`} className="font-semibold text-blue-600 hover:text-blue-800">
                      {news.author.username}
                    </Link>
                    <p className="text-sm text-blue-200">
                      {format(new Date(news.createdAt), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </Link>
              </div>
              
              <div className="flex items-center space-x-3 text-sm">
                <div className="flex items-center">
                  <MapPin size={16} className="mr-1" />
                  <span>{news.location.city}, {news.location.country}</span>
                </div>
                <div className="flex items-center">
                  <Eye size={16} className="mr-1" />
                  <span>{news.viewCount.toLocaleString()} views</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Content Section */}
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-8">
            {/* Featured Image */}
            <div className="relative">
              <img 
                src={news.thumbnail}
                alt={news.title}
                className="w-full h-auto object-cover max-h-[500px]"
              />
              
              {news.type === 'video' && news.videoUrl && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <a 
                    href={news.videoUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-20 h-20 rounded-full bg-blue-600 bg-opacity-75 flex items-center justify-center hover:bg-opacity-90 transition-all"
                  >
                    <div className="w-0 h-0 border-y-10 border-y-transparent border-l-16 border-l-white ml-2"></div>
                  </a>
                </div>
              )}
            </div>
            
            {/* Article Content */}
            <div className="p-6 md:p-8">
              <div className="prose prose-lg max-w-none">
                {news.content.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
              
              {/* Action Bar */}
              <div className="flex flex-wrap items-center justify-between mt-8 pt-4 border-t border-gray-200">
                <div className="flex items-center space-x-4 mb-4 sm:mb-0">
                  <button 
                    onClick={handleUpvote}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-blue-100 rounded-full transition-colors"
                  >
                    <ThumbsUp size={18} className="text-blue-600" />
                    <span>{localUpvotes}</span>
                  </button>
                  <button 
                    onClick={handleDownvote}
                    className="flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-red-100 rounded-full transition-colors"
                  >
                    <ThumbsDown size={18} className="text-red-600" />
                    <span>{localDownvotes}</span>
                  </button>
                  <button 
                    onClick={handleBookmark}
                    className={`flex items-center space-x-1 px-4 py-2 rounded-full transition-colors ${
                      isBookmarked ? 'bg-yellow-100' : 'bg-gray-100 hover:bg-yellow-100'
                    }`}
                  >
                    <Bookmark size={18} className={isBookmarked ? 'text-yellow-600 fill-yellow-600' : 'text-gray-600'} />
                    <span>Save</span>
                  </button>
                </div>
                
                <button 
                  onClick={handleShare}
                  className="flex items-center space-x-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                >
                  <Share2 size={18} />
                  <span>Share</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Author Information */}
          <Card className="mb-8 p-6">
            <div className="flex items-start">
              <Link to={`/profile/${news.author.id}`} className="flex-shrink-0 mr-4">
                <img 
                  src={news.author.avatar}
                  alt={news.author.username}
                  className="h-10 w-10 rounded-full"
                />
              </Link>
              <div className="ml-3">
                <Link to={`/profile/${news.author.id}`} className="font-medium text-blue-600 hover:text-blue-800">
                  {news.author.username}
                </Link>
                <p className="text-sm text-gray-500 mb-2">
                  Credibility score: <span className="font-medium text-green-600">{news.author.credibilityScore}%</span>
                </p>
                <p className="text-gray-700">{news.author.bio}</p>
                <div className="mt-3">
                  <Button variant="ghost" size="sm">
                    Follow
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Comments Section */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <MessageSquare className="mr-2 text-blue-600" />
              Comments ({comments.length})
            </h2>
            
            {/* Add Comment Form */}
            <Card className="mb-6">
              <div className="p-4">
                <div className="flex items-start mb-4">
                  <div className="flex-shrink-0 mr-3">
                    <img 
                      src={mockUsers[0].avatar}
                      alt="Your Avatar"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="flex-grow">
                    <textarea
                      value={commentContent}
                      onChange={(e) => setCommentContent(e.target.value)}
                      placeholder="Add your comment..."
                      className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      rows={3}
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-end">
                  <Button variant="primary" onClick={handleSubmitComment}>
                    Post Comment
                  </Button>
                </div>
              </div>
            </Card>
            
            {/* Comments List */}
            {comments.length > 0 ? (
              <div className="space-y-4">
                {comments.map((comment) => (
                  <Card key={comment.id} padding="md">
                    <div className="flex items-start">
                      <Link to={`/profile/${comment.author.id}`} className="flex-shrink-0 mr-3">
                        <img 
                          src={comment.author.avatar}
                          alt={comment.author.username}
                          className="w-10 h-10 rounded-full"
                        />
                      </Link>
                      <div className="flex-grow">
                        <div className="flex items-center mb-1">
                          <Link to={`/profile/${comment.author.id}`} className="font-medium text-gray-900 hover:text-blue-600 mr-2">
                            {comment.author.username}
                          </Link>
                          <span className="text-sm text-gray-500">
                            {formatDistanceToNow(new Date(comment.createdAt), { addSuffix: true })}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3">{comment.content}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <button className="flex items-center mr-4 hover:text-blue-600">
                            <ThumbsUp size={14} className="mr-1" />
                            <span>{comment.upvotes}</span>
                          </button>
                          <button className="flex items-center mr-4 hover:text-red-600">
                            <ThumbsDown size={14} className="mr-1" />
                            <span>{comment.downvotes}</span>
                          </button>
                          <button className="hover:text-blue-600">
                            Reply
                          </button>
                        </div>
                        
                        {/* Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-4 pl-4 border-l-2 border-gray-200 space-y-3">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="flex items-start">
                                <Link to={`/profile/${reply.author.id}`} className="flex-shrink-0 mr-3">
                                  <img 
                                    src={reply.author.avatar}
                                    alt={reply.author.username}
                                    className="w-8 h-8 rounded-full"
                                  />
                                </Link>
                                <div>
                                  <div className="flex items-center mb-1">
                                    <Link to={`/profile/${reply.author.id}`} className="font-medium text-gray-900 hover:text-blue-600 mr-2">
                                      {reply.author.username}
                                    </Link>
                                    <span className="text-xs text-gray-500">
                                      {formatDistanceToNow(new Date(reply.createdAt), { addSuffix: true })}
                                    </span>
                                  </div>
                                  <p className="text-gray-700 mb-2">{reply.content}</p>
                                  <div className="flex items-center text-xs text-gray-500">
                                    <button className="flex items-center mr-3 hover:text-blue-600">
                                      <ThumbsUp size={12} className="mr-1" />
                                      <span>{reply.upvotes}</span>
                                    </button>
                                    <button className="flex items-center hover:text-red-600">
                                      <ThumbsDown size={12} className="mr-1" />
                                      <span>{reply.downvotes}</span>
                                    </button>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="text-center p-8">
                <p className="text-gray-500 mb-4">No comments yet. Be the first to share your thoughts!</p>
              </Card>
            )}
          </div>
          
          {/* Related News */}
          {relatedNews.length > 0 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related News</h2>
              <NewsGrid news={relatedNews} columns={3} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
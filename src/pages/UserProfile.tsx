import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MapPin, Calendar, Award, User as UserIcon, Edit, Settings, Share2, Shield, Users, BookOpen, ThumbsUp, MessageSquare, AlertTriangle } from 'lucide-react';
import { format } from 'date-fns';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Tab } from '../components/common/Tab';
import { NewsGrid } from '../components/news/NewsGrid';
import { mockUsers, mockNews } from '../utils/mockData';
import { User, NewsItem } from '../types';

export const UserProfile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('posts');
  const [userPosts, setUserPosts] = useState<NewsItem[]>([]);
  const [isFollowing, setIsFollowing] = useState(false);
  
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      
      // Simulate API call
      setTimeout(() => {
        const foundUser = mockUsers.find(u => u.id === id);
        
        if (foundUser) {
          setUser(foundUser);
          
          // Get posts by this user
          const posts = mockNews.filter(news => news.author.id === foundUser.id);
          setUserPosts(posts);
        }
        
        setIsLoading(false);
      }, 500);
    };
    
    loadUserData();
  }, [id]);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-24 flex justify-center items-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-24 text-center">
        <div className="text-red-500 mb-4 text-xl">
          <span>User not found</span>
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
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-700 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-center md:items-start">
              <div className="md:mr-8 mb-4 md:mb-0">
                <img 
                  src={user.avatar} 
                  alt={user.username} 
                  className="w-32 h-32 rounded-full object-cover border-4 border-white shadow-lg"
                />
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-white mb-2">{user.username}</h1>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start text-blue-100 mb-4">
                  <div className="flex items-center mr-4 mb-2">
                    <MapPin size={16} className="mr-1" />
                    <span>{user.location.city}, {user.location.country}</span>
                  </div>
                  <div className="flex items-center mr-4 mb-2">
                    <Calendar size={16} className="mr-1" />
                    <span>Joined {format(new Date(user.joinedDate), 'MMMM yyyy')}</span>
                  </div>
                  <div className="flex items-center mb-2">
                    <Award size={16} className="mr-1" />
                    <span>Credibility: {user.credibilityScore}%</span>
                  </div>
                </div>
                
                <p className="text-blue-100 mb-6 max-w-2xl">{user.bio}</p>
                
                <div className="flex flex-wrap justify-center md:justify-start space-x-3">
                  <button
                    className={`px-4 py-2 rounded font-medium w-full md:w-auto ${isFollowing ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
                    onClick={() => setIsFollowing(!isFollowing)}
                  >
                    {isFollowing ? 'Following' : 'Follow'}
                  </button>
                  <button className="flex items-center text-gray-600 hover:text-blue-600 bg-transparent px-3 py-2 rounded">
                    <Share2 size={18} className="mr-2" />
                    Share
                  </button>
                  {user.id === '1' && (
                    <button className="flex items-center bg-blue-800/50 text-white hover:bg-blue-800 px-3 py-2 rounded">
                      <Edit size={18} className="mr-2" />
                      Edit Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 py-4">
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-gray-900">{userPosts.length}</div>
                <div className="text-sm text-gray-500">Publications</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-gray-900">{user.followersCount}</div>
                <div className="text-sm text-gray-500">Followers</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-gray-900">{user.followingCount}</div>
                <div className="text-sm text-gray-500">Following</div>
              </div>
              <div className="text-center p-3">
                <div className="text-2xl font-bold text-gray-900">{user.credibilityScore}</div>
                <div className="text-sm text-gray-500">Credibility Score</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Tabs */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex border-b border-gray-200 mb-8 overflow-x-auto pb-px">
            <Tab
              isActive={activeTab === 'posts'}
              onClick={() => setActiveTab('posts')}
              icon={<BookOpen size={18} />}
              label="Posts"
            />
            <Tab
              isActive={activeTab === 'activity'}
              onClick={() => setActiveTab('activity')}
              icon={<UserIcon size={18} />}
              label="Activity"
            />
            <Tab
              isActive={activeTab === 'following'}
              onClick={() => setActiveTab('following')}
              icon={<Users size={18} />}
              label="Following"
            />
            <Tab
              isActive={activeTab === 'credibility'}
              onClick={() => setActiveTab('credibility')}
              icon={<Shield size={18} />}
              label="Credibility"
            />
            {user.id === '1' && (
              <button className="flex items-center text-gray-600 hover:text-blue-600 bg-transparent px-3 py-2 rounded">
                <Settings size={18} className="mr-2" />
                Settings
              </button>
            )}
          </div>
          
          {/* Tab Content */}
          <div>
            {activeTab === 'posts' && (
              <>
                {userPosts.length > 0 ? (
                  <NewsGrid news={userPosts} columns={3} />
                ) : (
                  <Card className="p-8 text-center">
                    <div className="text-gray-400 mb-3">
                      <BookOpen size={48} className="mx-auto" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-700 mb-2">No Posts Yet</h3>
                    <p className="text-gray-500">This user hasn't published any news yet.</p>
                  </Card>
                )}
              </>
            )}
            
            {activeTab === 'activity' && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
                
                <div className="space-y-4">
                  <div className="flex items-start pb-4 border-b border-gray-100">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                      <ThumbsUp size={16} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">
                        <span className="font-medium">{user.username}</span> upvoted the news 
                        <Link to="/news/5" className="font-medium text-blue-600 hover:underline mx-1">
                          Historic Sports Upset as Underdogs Win Championship
                        </Link>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">2 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start pb-4 border-b border-gray-100">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-3">
                      <MessageSquare size={16} className="text-green-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">
                        <span className="font-medium">{user.username}</span> commented on 
                        <Link to="/news/3" className="font-medium text-blue-600 hover:underline mx-1">
                          Global Summit on Climate Change Announces New Targets
                        </Link>
                      </p>
                      <div className="bg-gray-50 p-2 rounded mt-2 text-sm text-gray-700">
                        "About time we saw some concrete targets! Let's hope they actually follow through this time."
                      </div>
                      <p className="text-sm text-gray-500 mt-1">4 days ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full mr-3">
                      <Users size={16} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="text-gray-800">
                        <span className="font-medium">{user.username}</span> started following 
                        <Link to="/profile/2" className="font-medium text-blue-600 hover:underline mx-1">
                          sarahsmith
                        </Link>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">1 week ago</p>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            
            {activeTab === 'following' && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {mockUsers.filter(u => u.id !== user.id).map((followedUser) => (
                  <Card key={followedUser.id} className="p-6">
                    <div className="flex items-center">
                      <Link to={`/profile/${followedUser.id}`} className="flex-shrink-0 mr-4">
                        <img 
                          src={followedUser.avatar} 
                          alt={followedUser.username} 
                          className="w-16 h-16 rounded-full object-cover"
                        />
                      </Link>
                      <div>
                        <Link to={`/profile/${followedUser.id}`} className="text-lg font-medium text-gray-900 hover:text-blue-600">
                          {followedUser.username}
                        </Link>
                        <p className="text-sm text-gray-500 mb-1">
                          {followedUser.location.city}, {followedUser.location.country}
                        </p>
                        <p className="text-xs text-gray-400">
                          Credibility: {followedUser.credibilityScore}%
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 mt-3 line-clamp-2">{followedUser.bio}</p>
                    <div className="mt-4">
                      <button className="text-gray-500 hover:text-blue-600 bg-transparent text-sm px-2 py-1 rounded">
                        View All
                      </button>
                    </div>
                  </Card>
                ))}
              </div>
            )}
            
            {activeTab === 'credibility' && (
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">Credibility Score</h3>
                  <div className="flex items-center bg-green-100 px-3 py-1 rounded-full">
                    <Shield className="h-4 w-4 text-green-600 mr-1" />
                    <span className="text-green-700 font-medium">{user.credibilityScore}%</span>
                  </div>
                </div>
                
                <div className="mb-6">
                  <div className="h-4 w-full bg-gray-200 rounded-full">
                    <div 
                      className="h-4 bg-gradient-to-r from-green-500 to-teal-400 rounded-full" 
                      style={{ width: `${user.credibilityScore}%` }}
                    ></div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-start pb-4 border-b border-gray-100">
                    <div className="flex-shrink-0 bg-green-100 p-2 rounded-full mr-3">
                      <ThumbsUp size={18} className="text-green-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Accurate Reporting</p>
                      <p className="text-gray-600 text-sm">Consistently shares factual and verified news</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        +30 points
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start pb-4 border-b border-gray-100">
                    <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-3">
                      <Users size={18} className="text-blue-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Community Standing</p>
                      <p className="text-gray-600 text-sm">Well-respected by other community members</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                        +25 points
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start pb-4 border-b border-gray-100">
                    <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full mr-3">
                      <Calendar size={18} className="text-purple-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Consistent Activity</p>
                      <p className="text-gray-600 text-sm">Regular contributions to the platform</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                        +20 points
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <div className="flex-shrink-0 bg-yellow-100 p-2 rounded-full mr-3">
                      <AlertTriangle size={18} className="text-yellow-600" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Areas for Improvement</p>
                      <p className="text-gray-600 text-sm">Include more diverse sources in reporting</p>
                    </div>
                    <div className="ml-auto">
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                        Suggestion
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8 bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-800 mb-2">How Credibility Scores Work</h4>
                  <p className="text-sm text-blue-700">
                    Credibility scores are calculated based on the accuracy of your shared news, 
                    community feedback, and your overall contribution to the platform. Higher scores 
                    increase your content's visibility and trustworthiness to other users.
                  </p>
                </div>
              </Card>
            )}
            
            {activeTab === 'settings' && user.id === '1' && (
              <Card className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Account Settings</h3>
                
                <div className="space-y-6">
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Profile Information</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Username
                        </label>
                        <input
                          type="text"
                          value={user.username}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Bio
                        </label>
                        <textarea
                          value={user.bio}
                          rows={3}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        ></textarea>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Location</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          City
                        </label>
                        <input
                          type="text"
                          value={user.location.city}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          State/Province
                        </label>
                        <input
                          type="text"
                          value={user.location.state}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Country
                        </label>
                        <input
                          type="text"
                          value={user.location.country}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="text-lg font-medium text-gray-800 mb-3">Privacy Settings</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Show my location on posts</p>
                          <p className="text-sm text-gray-500">Allow others to see your location on your posts</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-blue-600">
                          <label
                            htmlFor="toggle-1"
                            className="absolute left-0 w-6 h-6 mb-2 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-6"
                          ></label>
                          <input
                            type="checkbox"
                            id="toggle-1"
                            className="w-full h-full opacity-0 cursor-pointer"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Email notifications</p>
                          <p className="text-sm text-gray-500">Receive email updates about your activity</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-blue-600">
                          <label
                            htmlFor="toggle-2"
                            className="absolute left-0 w-6 h-6 mb-2 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-6"
                          ></label>
                          <input
                            type="checkbox"
                            id="toggle-2"
                            className="w-full h-full opacity-0 cursor-pointer"
                            defaultChecked
                          />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-gray-800">Public profile</p>
                          <p className="text-sm text-gray-500">Make your profile visible to everyone</p>
                        </div>
                        <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full bg-blue-600">
                          <label
                            htmlFor="toggle-3"
                            className="absolute left-0 w-6 h-6 mb-2 transition duration-100 ease-in-out transform bg-white rounded-full cursor-pointer translate-x-6"
                          ></label>
                          <input
                            type="checkbox"
                            id="toggle-3"
                            className="w-full h-full opacity-0 cursor-pointer"
                            defaultChecked
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 flex justify-end">
                  <Button variant="primary">
                    Save Changes
                  </Button>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// These components are now properly imported from lucide-react at the top of the file
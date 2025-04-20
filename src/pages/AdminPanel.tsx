import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, FileText, AlertCircle } from 'lucide-react';
import { Card } from '../components/common/Card';
import { useAuth } from '../context/AuthContext';
import { adminAPI } from '../services/api';

export const AdminPanel: React.FC = () => {
  const { isAuthenticated, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [stats, setStats] = useState({ totalUsers: 0, totalNews: 0, pendingModeration: 0 });
  const [users, setUsers] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'news'>('dashboard');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Redirect if not authenticated or not admin
    if (!isAuthenticated || !isAdmin) {
      navigate('/login');
    }
  }, [isAuthenticated, isAdmin, navigate]);

  useEffect(() => {
    if (isAuthenticated && isAdmin) {
      fetchDashboardData();
    }
  }, [isAuthenticated, isAdmin, activeTab]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');
      
      // Fetch statistics
      if (activeTab === 'dashboard') {
        const statsData = await adminAPI.getStats(token);
        setStats(statsData);
      }
      
      // Fetch users if on users tab
      if (activeTab === 'users') {
        const usersData = await adminAPI.getAllUsers(token);
        setUsers(usersData.users);
      }
      
      // You could add code to fetch pending news articles here
      
    } catch (error: any) {
      setError(error.message || 'Failed to fetch admin data');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleChange = async (userId: string, newRole: 'user' | 'admin') => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');
      
      await adminAPI.updateUserRole(userId, newRole, token);
      
      // Refresh user list
      const usersData = await adminAPI.getAllUsers(token);
      setUsers(usersData.users);
      
    } catch (error: any) {
      setError(error.message || 'Failed to update user role');
    }
  };

  // This function will be used when implementing news moderation feature
  /*
  const handleApproveNews = async (newsId: string) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('Authentication token not found');
      
      await adminAPI.moderateNews(newsId, true, token);
      
      // Refresh news and stats
      fetchDashboardData();
      
    } catch (error: any) {
      setError(error.message || 'Failed to moderate news');
    }
  };
  */

  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Panel</h1>
        <p className="text-gray-600 mb-8">Manage users and content</p>
        
        {error && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          </div>
        )}
        
        <div className="flex border-b border-gray-200 mb-6">
          <button
            className={`py-3 px-4 font-medium ${activeTab === 'dashboard' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button
            className={`py-3 px-4 font-medium ${activeTab === 'users' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
          <button
            className={`py-3 px-4 font-medium ${activeTab === 'news' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-500 hover:text-gray-700'}`}
            onClick={() => setActiveTab('news')}
          >
            News Articles
          </button>
        </div>
        
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full p-3 mr-4">
                    <Users className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Total Users</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalUsers}</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="bg-green-100 rounded-full p-3 mr-4">
                    <FileText className="h-6 w-6 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Published News</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.totalNews}</p>
                  </div>
                </div>
              </div>
            </Card>
            <Card>
              <div className="p-6">
                <div className="flex items-center">
                  <div className="bg-orange-100 rounded-full p-3 mr-4">
                    <AlertCircle className="h-6 w-6 text-orange-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-1">Pending Moderation</h3>
                    <p className="text-3xl font-bold text-gray-900">{stats.pendingModeration}</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}
        
        {activeTab === 'users' && (
          <Card>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-4 text-center">Loading users...</td>
                    </tr>
                  ) : (
                    users.map((user) => (
                      <tr key={user._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0 overflow-hidden">
                              {user.avatar && (
                                <img src={user.avatar} alt={user.username} className="h-full w-full object-cover" />
                              )}
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">{user.username}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">{user.email}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-500">
                            {new Date(user.joinedDate).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : 'bg-green-100 text-green-800'}`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          {user.role === 'admin' ? (
                            <button 
                              onClick={() => handleRoleChange(user._id, 'user')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Make User
                            </button>
                          ) : (
                            <button 
                              onClick={() => handleRoleChange(user._id, 'admin')}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              Make Admin
                            </button>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        )}
        
        {activeTab === 'news' && (
          <div className="space-y-6">
            <Card>
              <div className="p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Pending Moderation</h3>
                {loading ? (
                  <p>Loading news articles...</p>
                ) : (
                  <p className="text-gray-500">
                    Implementation for fetching and displaying pending news articles would go here.
                  </p>
                )}
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

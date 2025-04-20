import { User, NewsItem } from '../types';

const API_URL = 'http://localhost:5000/api';

// Helper function to handle API responses
const handleResponse = async (response: Response) => {
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Server error');
  }
  return await response.json();
};

// Authentication API
export const authAPI = {
  login: async (identifier: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ identifier, password }),
    });
    return handleResponse(response);
  },
  
  signup: async (username: string, email: string, password: string) => {
    const response = await fetch(`${API_URL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, email, password }),
    });
    return handleResponse(response);
  },
  
  getMe: async (token: string) => {
    const response = await fetch(`${API_URL}/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// News API
export const newsAPI = {
  getAll: async (page: number = 1, limit: number = 10, filters?: any) => {
    let url = `${API_URL}/news?page=${page}&limit=${limit}`;
    
    if (filters) {
      if (filters.category) url += `&category=${filters.category}`;
      if (filters.location) url += `&location=${filters.location}`;
      if (filters.sortBy) url += `&sortBy=${filters.sortBy}`;
      if (filters.search) url += `&search=${filters.search}`;
    }
    
    const response = await fetch(url);
    const data = await handleResponse(response);
    // Always return an array and map backend `_id` to `id`
    let items: any[] = [];
    if (Array.isArray(data)) items = data;
    else if (Array.isArray(data.news)) items = data.news;
    else if (Array.isArray((data as any).data)) items = (data as any).data;
    else return [];
    return items.map(item => item._id ? { ...item, id: item._id } : item);
  },
  
  getById: async (id: string) => {
    const response = await fetch(`${API_URL}/news/${id}`);
    const data = await handleResponse(response);
    if (data && data._id) {
      return { ...data, id: data._id };
    }
    return data;
  },
  
  create: async (newsData: Partial<NewsItem>, token: string) => {
    const response = await fetch(`${API_URL}/news`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(newsData),
    });
    return handleResponse(response);
  },
  
  update: async (id: string, updates: Partial<NewsItem>, token: string) => {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },
  
  delete: async (id: string, token: string) => {
    const response = await fetch(`${API_URL}/news/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
};

// User API
export const userAPI = {
  getProfile: async (username: string) => {
    const response = await fetch(`${API_URL}/users/${username}`);
    return handleResponse(response);
  },
  
  getUserNews: async (username: string, page: number = 1, limit: number = 10) => {
    const response = await fetch(`${API_URL}/users/${username}/news?page=${page}&limit=${limit}`);
    return handleResponse(response);
  },
  
  updateProfile: async (updates: Partial<User>, token: string) => {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },
  
  changePassword: async (currentPassword: string, newPassword: string, token: string) => {
    const response = await fetch(`${API_URL}/users/change-password`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    return handleResponse(response);
  },
};

// Admin API
export const adminAPI = {
  getStats: async (token: string) => {
    const response = await fetch(`${API_URL}/admin/stats`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
  
  getAllUsers: async (token: string, page: number = 1, limit: number = 10, search?: string) => {
    let url = `${API_URL}/admin/users?page=${page}&limit=${limit}`;
    if (search) url += `&search=${search}`;
    
    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    return handleResponse(response);
  },
  
  moderateNews: async (id: string, isModerated: boolean, token: string) => {
    const response = await fetch(`${API_URL}/admin/moderate/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ isModerated }),
    });
    return handleResponse(response);
  },
  
  updateUserRole: async (id: string, role: 'user' | 'admin', token: string) => {
    const response = await fetch(`${API_URL}/admin/user-role/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ role }),
    });
    return handleResponse(response);
  },
};

import React, { createContext, useState, useContext, useEffect } from 'react';
import { User } from '../types';
import { authAPI, userAPI } from '../services/api';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (identifier: string, password: string) => Promise<void>;
  logout: () => void;
  signup: (username: string, email: string, password: string) => Promise<void>;
  updateUser: (updates: Partial<User>) => Promise<void>;
  loading: boolean;
  error: string | null;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  login: async () => {},
  logout: () => {},
  signup: async () => {},
  updateUser: async () => {},
  loading: false,
  error: null,
  isAdmin: false
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    // Check for token in localStorage
    const token = localStorage.getItem('token');
    if (token) {
      checkAuthState(token);
    } else {
      setLoading(false);
    }
  }, []);

  const checkAuthState = async (token: string) => {
    try {
      setLoading(true);
      const response = await authAPI.getMe(token);
      setUser(response.user);
      setIsAuthenticated(true);
      setIsAdmin(response.user.role === 'admin');
    } catch (error) {
      // Token invalid or expired
      localStorage.removeItem('token');
      setError('Session expired. Please log in again.');
    } finally {
      setLoading(false);
    }
  };

  const login = async (identifier: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.login(identifier, password);
      const { user, token } = response;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      setUser(user);
      setIsAuthenticated(true);
      setIsAdmin(user.role === 'admin');
    } catch (error: any) {
      setError(error.message || 'Login failed. Please check your credentials.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      const response = await authAPI.signup(username, email, password);
      const { user, token } = response;
      
      // Save token to localStorage
      localStorage.setItem('token', token);
      
      setUser(user);
      setIsAuthenticated(true);
    } catch (error: any) {
      setError(error.message || 'Signup failed. Please try again.');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const updateUser = async (updates: Partial<User>) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token || !user) throw new Error('Not authenticated');
      
      const updatedUser = await userAPI.updateProfile(updates, token);
      setUser({
        ...user,
        ...updatedUser,
      });
      return updatedUser;
    } catch (error: any) {
      setError(error.message || 'Failed to update profile');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated, 
      login, 
      logout, 
      signup,
      updateUser, 
      loading, 
      error,
      isAdmin
    }}>
      {children}
    </AuthContext.Provider>
  );
};
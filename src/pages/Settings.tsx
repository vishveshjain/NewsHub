import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { useAuth } from '../context/AuthContext';

export const Settings: React.FC = () => {
  const { user, updateUser, loading, error, logout } = useAuth();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [bio, setBio] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (!user) return;
    setUsername(user.username);
    setEmail(user.email);
    setAvatar(user.avatar);
    setBio(user.bio || '');
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await updateUser({ username, email, avatar, bio });
      setSuccess(true);
    } catch {
      // handled in context
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2"></div>
    </div>
  );

  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex justify-center bg-gray-100 min-h-screen pt-24 pb-12">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Account Settings</h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input id="username" value={username} onChange={e => setUsername(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">Avatar URL</label>
            <input id="avatar" type="url" value={avatar} onChange={e => setAvatar(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500" />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
            <textarea id="bio" rows={3} value={bio} onChange={e => setBio(e.target.value)} className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"></textarea>
          </div>
          <div className="flex items-center justify-between">
            <Button type="submit" variant="primary" disabled={submitting}>{submitting ? 'Updating...' : 'Update Profile'}</Button>
            <Button variant="secondary" onClick={() => logout()}>Logout</Button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">Profile updated successfully!</p>}
        </form>
      </div>
    </div>
  );
};

export default Settings;

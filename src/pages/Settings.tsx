import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Settings: React.FC = () => {
  return (
    <div className="flex justify-center bg-gray-100 min-h-screen pt-24 pb-12">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4">Settings</h1>
        <p className="text-gray-700 mb-6">Manage your account settings and preferences here.</p>
        <div className="mt-6">
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Settings;

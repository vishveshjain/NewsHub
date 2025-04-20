import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Help: React.FC = () => (
  <div className="flex justify-center bg-gray-100 min-h-screen pt-24 pb-12">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Help Center</h1>
      <p className="text-gray-700 mb-6">Find answers to frequently asked questions and guides to get you started.</p>
      <article className="mb-6 prose prose-sm md:prose lg:prose-lg">
        <h2>Getting Started</h2>
        <p>Welcome to NewsHub! Here’s a quick guide to help you navigate our platform:</p>
        <ol className="list-decimal list-inside">
          <li>Create an account or sign in to personalize your experience.</li>
          <li>Browse the Home page for trending news.</li>
          <li>Use the Search feature to find articles by keyword.</li>
          <li>Submit your own news tips using the Submit News page.</li>
        </ol>
        <h2>Support Article</h2>
        <p>If you encounter any issues or have questions, please visit our Contact Us page to send us a message. Our team is here to help 24/7.</p>
      </article>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  </div>
);

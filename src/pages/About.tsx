import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const About: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
    <div className="w-full max-w-3xl bg-white shadow-md rounded-lg p-8">
      <h1 className="text-3xl font-bold mb-6">About NewsHub</h1>
      <p className="text-gray-700 mb-6">
        NewsHub is a community-driven platform that empowers users to share and discover location-based news. Our mission is to connect individuals with stories that matter most in their local areas.
      </p>
      <article className="prose prose-sm md:prose-md lg:prose-lg text-gray-600 mb-6">
        <h2>Our Vision</h2>
        <p>
          We believe in informed communities. By enabling users to report, read, and engage with news from their neighborhoods, we foster transparency and civic participation.
        </p>
        <h2>What We Offer</h2>
        <ul className="list-disc list-inside">
          <li>Real-time news updates from your local area.</li>
          <li>Customizable feed based on your interests and location.</li>
          <li>Ability to submit and verify community reports.</li>
          <li>Secure and private user experience.</li>
        </ul>
      </article>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default About;

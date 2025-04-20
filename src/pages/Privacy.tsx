import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Privacy: React.FC = () => (
  <div className="flex justify-center bg-gray-100 min-h-screen pt-24 pb-12">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-6">
        Your privacy is important to us. This policy explains how we collect, use, and protect your information.
      </p>
      <article className="mb-6 prose prose-sm md:prose lg:prose-lg">
        <h2>Information We Collect</h2>
        <p>We collect information you provide directly when you register, submit news, or contact us.</p>
        <h2>How We Use Information</h2>
        <p>We use your information to improve our services, personalize your experience, and communicate with you.</p>
        <h2>Data Security</h2>
        <p>We implement industry-standard security measures to protect your data from unauthorized access.</p>
        <h2>Sharing Your Information</h2>
        <p>We do not sell your personal information. We may share data with trusted partners for operational purposes.</p>
        <h2>Contact Us</h2>
        <p>If you have questions about this Privacy Policy, please reach out via our Contact Us page.</p>
      </article>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Privacy;

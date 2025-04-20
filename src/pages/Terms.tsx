import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Terms: React.FC = () => (
  <div className="flex justify-center bg-gray-100 min-h-screen pt-24 pb-12">
    <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-3xl">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-700 mb-6">
        These Terms of Service govern your use of NewsHub. By accessing or using our services, you agree to comply with these terms.
      </p>
      <article className="mb-6 prose prose-sm md:prose lg:prose-lg">
        <h2>1. Acceptance of Terms</h2>
        <p>By using NewsHub, you agree to be bound by these Terms and all applicable laws.</p>
        <h2>2. User Conduct</h2>
        <p>Users must not post harmful, illegal, or infringing content. You are responsible for any content you share.</p>
        <h2>3. Content Ownership</h2>
        <p>All user-submitted content remains yours, but you grant NewsHub a license to display and distribute it.</p>
        <h2>4. Termination</h2>
        <p>We reserve the right to suspend or terminate accounts that violate these terms.</p>
        <h2>5. Changes to Terms</h2>
        <p>We may update these Terms at any time. Continued use signifies acceptance of changes.</p>
      </article>
      <div className="mt-6">
        <Link to="/">
          <Button variant="primary">Back to Home</Button>
        </Link>
      </div>
    </div>
  </div>
);

export default Terms;

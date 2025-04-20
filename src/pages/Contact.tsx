import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Contact: React.FC = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success') === 'true';

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="max-w-md w-full text-center p-6 bg-white rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-4 text-green-600">Thank You!</h2>
          <p className="text-gray-700 mb-6">Your message has been sent successfully. We'll get back to you soon.</p>
          <Link to="/">
            <Button variant="primary">Back to Home</Button>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 pt-16">
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Contact Us</h1>
        <form action="https://formspree.io/f/mqkoqnoe" method="POST" className="space-y-6">
          <input type="hidden" name="_captcha" value="false" />
          <input type="hidden" name="_next" value={`${window.location.origin}/contact?success=true`} />
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Name</label>
            <input id="name" name="name" type="text" placeholder="Your Name" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input id="email" name="email" type="email" placeholder="Your Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
            <input id="subject" name="subject" type="text" placeholder="Subject" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Message</label>
            <textarea id="message" name="message" rows={5} placeholder="Your Message" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
          </div>
          <Button type="submit" variant="primary" fullWidth>Send Message</Button>
        </form>
      </div>
    </div>
  );
};

export default Contact;

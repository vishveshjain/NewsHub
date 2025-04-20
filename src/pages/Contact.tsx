import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Contact form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-md">
      {submitted ? (
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Thank You!</h2>
          <p className="text-gray-700">Your message has been sent. We'll get back to you soon.</p>
          <div className="mt-6">
            <Link to="/">
              <Button variant="primary">Back to Home</Button>
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <input
            type="text"
            name="subject"
            placeholder="Subject"
            value={formData.subject}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            className="w-full px-3 py-2 border rounded h-32"
            required
          />
          <Button type="submit" variant="primary" fullWidth>Send Message</Button>
        </form>
      )}
    </div>
  );
};

export default Contact;

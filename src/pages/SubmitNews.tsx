import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FileText, Video, Upload, MapPin, Globe, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { categories } from '../utils/mockData';

enum ContentType {
  ARTICLE = 'article',
  VIDEO = 'video'
}

export const SubmitNews: React.FC = () => {
  const [contentType, setContentType] = useState<ContentType>(ContentType.ARTICLE);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [location, setLocation] = useState({
    city: '',
    state: '',
    country: ''
  });
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(prev => 
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (!file.type.startsWith('image/')) {
      setErrors(prev => ({ ...prev, thumbnail: 'Please upload an image file' }));
      return;
    }
    
    const reader = new FileReader();
    reader.onload = () => {
      setThumbnailPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    } else if (title.length < 10) {
      newErrors.title = 'Title must be at least 10 characters long';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 20) {
      newErrors.description = 'Description must be at least 20 characters long';
    }
    
    if (contentType === ContentType.ARTICLE) {
      if (!content.trim()) {
        newErrors.content = 'Content is required';
      } else if (content.length < 100) {
        newErrors.content = 'Content must be at least 100 characters long';
      }
    } else {
      if (!videoUrl.trim()) {
        newErrors.videoUrl = 'Video URL is required';
      } else if (!videoUrl.includes('youtube.com') && !videoUrl.includes('youtu.be')) {
        newErrors.videoUrl = 'Please enter a valid YouTube URL';
      }
    }
    
    if (selectedCategories.length === 0) {
      newErrors.categories = 'Please select at least one category';
    }
    
    if (!location.city && !location.state && !location.country) {
      newErrors.location = 'Please provide at least one location detail';
    }
    
    if (!thumbnailPreview && contentType === ContentType.ARTICLE) {
      newErrors.thumbnail = 'Please upload a thumbnail image';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call with timeout
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setTitle('');
        setDescription('');
        setContent('');
        setVideoUrl('');
        setSelectedCategories([]);
        setLocation({ city: '', state: '', country: '' });
        setThumbnailPreview(null);
        setSubmitSuccess(false);
      }, 5000);
    }, 1500);
  };

  return (
    <div className="container mx-auto pt-24 pb-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submit News</h1>
        <p className="text-gray-600 mb-8">Share important stories with the community</p>
        
        {submitSuccess && (
          <div className="mb-8 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative animate-fade-in" role="alert">
            <div className="flex items-center">
              <div className="py-1 mr-3">
                <svg className="fill-current h-6 w-6 text-green-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" fillRule="evenodd"></path>
                </svg>
              </div>
              <div>
                <p className="font-bold">Thank you for your submission!</p>
                <p className="text-sm">Your news has been submitted and will be reviewed by our team shortly.</p>
              </div>
            </div>
          </div>
        )}
        
        {Object.keys(errors).length > 0 && (
          <div className="mb-8 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-fade-in" role="alert">
            <div className="flex items-start">
              <div className="py-1 mr-3">
                <AlertCircle className="h-6 w-6 text-red-500" />
              </div>
              <div>
                <p className="font-bold">Please correct the following errors:</p>
                <ul className="mt-1 ml-6 list-disc">
                  {Object.values(errors).map((error, index) => (
                    <li key={index} className="text-sm">{error}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
        
        <Card>
          <form onSubmit={handleSubmit} className="p-6">
            {/* Content Type Selection */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Content Type</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setContentType(ContentType.ARTICLE)}
                  className={`flex items-center p-4 border rounded-lg transition-colors ${
                    contentType === ContentType.ARTICLE
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <FileText className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <h3 className="font-medium">Text Article</h3>
                    <p className="text-sm text-gray-500">Write your own news article</p>
                  </div>
                </button>
                <button
                  type="button"
                  onClick={() => setContentType(ContentType.VIDEO)}
                  className={`flex items-center p-4 border rounded-lg transition-colors ${
                    contentType === ContentType.VIDEO
                      ? 'border-blue-600 bg-blue-50 text-blue-700'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                  }`}
                >
                  <Video className="h-6 w-6 mr-3" />
                  <div className="text-left">
                    <h3 className="font-medium">Video Content</h3>
                    <p className="text-sm text-gray-500">Share a YouTube video</p>
                  </div>
                </button>
              </div>
            </div>
            
            {/* Basic Information */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Basic Information</h2>
              <div className="space-y-4">
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                    Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter a descriptive title"
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.title ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                  {errors.title && <p className="mt-1 text-sm text-red-500">{errors.title}</p>}
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                    Description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Provide a brief summary of your news"
                    rows={3}
                    className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                      errors.description ? 'border-red-500' : 'border-gray-300'
                    }`}
                  ></textarea>
                  {errors.description && <p className="mt-1 text-sm text-red-500">{errors.description}</p>}
                </div>
                
                {contentType === ContentType.ARTICLE ? (
                  <div>
                    <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
                      Content <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Write your news article here"
                      rows={8}
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.content ? 'border-red-500' : 'border-gray-300'
                      }`}
                    ></textarea>
                    {errors.content && <p className="mt-1 text-sm text-red-500">{errors.content}</p>}
                  </div>
                ) : (
                  <div>
                    <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                      YouTube Video URL <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="videoUrl"
                      value={videoUrl}
                      onChange={(e) => setVideoUrl(e.target.value)}
                      placeholder="e.g., https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                      className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none ${
                        errors.videoUrl ? 'border-red-500' : 'border-gray-300'
                      }`}
                    />
                    {errors.videoUrl && <p className="mt-1 text-sm text-red-500">{errors.videoUrl}</p>}
                    <p className="mt-1 text-xs text-gray-500">
                      Only YouTube links are supported at this time
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Categories */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Categories <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Select all categories that apply to your news (at least one)
              </p>
              
              <div className={`flex flex-wrap gap-3 ${errors.categories ? 'border border-red-500 p-3 rounded-lg' : ''}`}>
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => handleCategoryToggle(category)}
                    className={`px-3 py-2 rounded-md text-sm transition-colors ${
                      selectedCategories.includes(category)
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {errors.categories && <p className="mt-2 text-sm text-red-500">{errors.categories}</p>}
            </div>
            
            {/* Location */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <MapPin className="mr-2 h-5 w-5 text-blue-600" />
                Location <span className="text-red-500">*</span>
              </h2>
              <p className="text-sm text-gray-500 mb-3">
                Where did this news occur? Provide at least one location detail.
              </p>
              
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 ${errors.location ? 'border border-red-500 p-3 rounded-lg' : ''}`}>
                <div>
                  <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                    City
                  </label>
                  <input
                    type="text"
                    id="city"
                    value={location.city}
                    onChange={(e) => setLocation({ ...location, city: e.target.value })}
                    placeholder="City"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                    State/Province
                  </label>
                  <input
                    type="text"
                    id="state"
                    value={location.state}
                    onChange={(e) => setLocation({ ...location, state: e.target.value })}
                    placeholder="State or Province"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    value={location.country}
                    onChange={(e) => setLocation({ ...location, country: e.target.value })}
                    placeholder="Country"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              {errors.location && <p className="mt-2 text-sm text-red-500">{errors.location}</p>}
              
              <div className="mt-4 flex items-center text-sm text-blue-600">
                <Globe className="h-4 w-4 mr-1" />
                <span>Your location will be used to help others find local news</span>
              </div>
            </div>
            
            {/* Thumbnail */}
            <div className="mb-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Upload className="mr-2 h-5 w-5 text-blue-600" />
                Thumbnail Image
                {contentType === ContentType.ARTICLE && <span className="text-red-500 ml-1">*</span>}
              </h2>
              
              <div className={`border-2 border-dashed rounded-lg p-6 text-center ${
                errors.thumbnail ? 'border-red-500' : 'border-gray-300'
              }`}>
                {thumbnailPreview ? (
                  <div className="mb-4">
                    <img 
                      src={thumbnailPreview} 
                      alt="Thumbnail preview" 
                      className="max-h-48 mx-auto rounded-lg"
                    />
                  </div>
                ) : (
                  <div className="mb-4 flex justify-center">
                    <div className="p-3 rounded-full bg-blue-100">
                      <Upload className="h-8 w-8 text-blue-600" />
                    </div>
                  </div>
                )}
                
                <p className="text-sm text-gray-600 mb-4">
                  {contentType === ContentType.ARTICLE 
                    ? 'Upload a high-quality image for your article (required)'
                    : 'Upload a custom thumbnail or we will use the YouTube thumbnail'}
                </p>
                
                <label className="inline-block cursor-pointer">
                  <span className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    {thumbnailPreview ? 'Change Thumbnail' : 'Select File'}
                  </span>
                  <input 
                    type="file" 
                    accept="image/*"
                    className="hidden"
                    onChange={handleThumbnailChange}
                  />
                </label>
              </div>
              {errors.thumbnail && <p className="mt-2 text-sm text-red-500">{errors.thumbnail}</p>}
            </div>
            
            {/* Submit Buttons */}
            <div className="flex flex-col sm:flex-row justify-end gap-3">
              <Link to="/">
                <Button variant="ghost">Cancel</Button>
              </Link>
              <Button 
                type="submit" 
                variant="primary" 
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Submitting...' : 'Submit News'}
              </Button>
            </div>
          </form>
        </Card>
        
        {/* Guidelines */}
        <div className="mt-8 bg-blue-50 border border-blue-100 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-3">Submission Guidelines</h3>
          <ul className="list-disc pl-5 space-y-2 text-blue-700">
            <li>Ensure your news is accurate and fact-checked</li>
            <li>Provide sources for any claims or statistics</li>
            <li>Avoid sensationalist headlines or clickbait</li>
            <li>Respect copyright and only share content you have rights to</li>
            <li>Be aware that submissions are moderated before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
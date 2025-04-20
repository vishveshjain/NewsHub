import express from 'express';
import News from '../models/news.js';
import User from '../models/user.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'newshub-secret-key';

// Middleware to verify token and authenticate user
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user by id
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.userId = decoded.id;
    req.userRole = decoded.role;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Get all news articles with pagination and filters
router.get('/', async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      location, 
      sortBy = 'createdAt', 
      search 
    } = req.query;
    
    // Build query based on filters
    const query = {};
    
    // Filter by category (case-insensitive, support comma-separated)
    if (category) {
      const cats = category.split(',').map(c => c.trim());
      query.categories = { $in: cats.map(c => new RegExp(`^${c}$`, 'i')) };
    }
    
    // Filter by location
    if (location) {
      query.$or = [
        { 'location.city': { $regex: location, $options: 'i' } },
        { 'location.state': { $regex: location, $options: 'i' } },
        { 'location.country': { $regex: location, $options: 'i' } }
      ];
    }
    
    // Search in title, description, content
    if (search) {
      query.$text = { $search: search };
    }
    
    // Sort options
    let sort = {};
    switch(sortBy) {
      case 'trending':
        sort = { upvotes: -1, viewCount: -1 };
        break;
      case 'popular':
        sort = { viewCount: -1 };
        break;
      default:
        sort = { createdAt: -1 };
    }
    
    // Get total count of articles matching the query
    const totalArticles = await News.countDocuments(query);
    
    // Get news articles with pagination
    const news = await News.find(query)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .populate({
        path: 'author',
        select: 'username avatar credibilityScore'
      });
    
    res.status(200).json({
      news,
      totalPages: Math.ceil(totalArticles / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get a single news article by ID
router.get('/:id', async (req, res) => {
  try {
    const newsId = req.params.id;
    
    const news = await News.findById(newsId).populate({
      path: 'author',
      select: 'username avatar bio credibilityScore joinedDate location followersCount followingCount'
    });
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    // Increase view count
    news.viewCount += 1;
    await news.save();
    
    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create a new news article
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { 
      title, 
      description, 
      content, 
      thumbnail, 
      type,
      videoUrl,
      location,
      categories
    } = req.body;
    
    const userId = req.userId;
    
    // Create new news article
    const newNews = new News({
      title,
      description,
      content,
      thumbnail,
      type,
      videoUrl: type === 'video' ? videoUrl : undefined,
      location,
      categories,
      author: userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
    
    await newNews.save();
    
    // Populate author details for response
    const populatedNews = await News.findById(newNews._id).populate({
      path: 'author',
      select: 'username avatar credibilityScore'
    });
    
    res.status(201).json(populatedNews);
  } catch (error) {
    // Handle validation errors (e.g., missing videoUrl)
    if (error.name === 'ValidationError') {
      const firstError = Object.values(error.errors)[0].message;
      return res.status(400).json({ message: firstError });
    }
    console.error(error);
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update a news article (only by author or admin)
router.patch('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const userRole = req.userRole;
    
    const news = await News.findById(id);
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    // Check if user is author or admin
    if (news.author.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to update this news article' });
    }
    
    // Update only the fields that are sent in the request
    const updates = req.body;
    
    // Add updated timestamp
    updates.updatedAt = new Date().toISOString();
    
    const updatedNews = await News.findByIdAndUpdate(
      id, 
      updates, 
      { new: true }
    ).populate({
      path: 'author',
      select: 'username avatar credibilityScore'
    });
    
    res.status(200).json(updatedNews);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Delete a news article (only by author or admin)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.userId;
    const userRole = req.userRole;
    
    const news = await News.findById(id);
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    // Check if user is author or admin
    if (news.author.toString() !== userId && userRole !== 'admin') {
      return res.status(403).json({ message: 'Not authorized to delete this news article' });
    }
    
    await News.findByIdAndDelete(id);
    
    res.status(200).json({ message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

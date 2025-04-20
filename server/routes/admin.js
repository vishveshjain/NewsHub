import express from 'express';
import User from '../models/user.js';
import News from '../models/news.js';
import jwt from 'jsonwebtoken';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'newshub-secret-key';

// Admin middleware - verifies user is an admin
const adminMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user by id and verify admin role
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    if (user.role !== 'admin') {
      return res.status(403).json({ message: 'Access denied. Admin only.' });
    }

    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

// Admin dashboard stats
router.get('/stats', adminMiddleware, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalNews = await News.countDocuments();
    const pendingModeration = await News.countDocuments({ isModerated: false });
    
    const stats = {
      totalUsers,
      totalNews,
      pendingModeration
    };
    
    res.status(200).json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get all users (admin only)
router.get('/users', adminMiddleware, async (req, res) => {
  try {
    const { page = 1, limit = 10, search } = req.query;
    
    let query = {};
    if (search) {
      query = {
        $or: [
          { username: { $regex: search, $options: 'i' } },
          { email: { $regex: search, $options: 'i' } }
        ]
      };
    }
    
    const totalUsers = await User.countDocuments(query);
    
    const users = await User.find(query)
      .select('-password')
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    res.status(200).json({
      users,
      totalPages: Math.ceil(totalUsers / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Moderate a news article
router.patch('/moderate/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { isModerated } = req.body;
    
    const news = await News.findById(id);
    
    if (!news) {
      return res.status(404).json({ message: 'News article not found' });
    }
    
    news.isModerated = isModerated;
    await news.save();
    
    res.status(200).json({ message: 'News moderation updated successfully', news });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user role (make admin or revert to user)
router.patch('/user-role/:id', adminMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ message: 'Invalid role' });
    }
    
    const user = await User.findByIdAndUpdate(
      id,
      { role },
      { new: true }
    ).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({ message: 'User role updated successfully', user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

import express from 'express';
import User from '../models/user.js';
import News from '../models/news.js';
import jwt from 'jsonwebtoken';
import mongoose from 'mongoose';

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

// Get user profile by ID or username
router.get('/:identifier', async (req, res) => {
  try {
    const { identifier } = req.params;
    let user = mongoose.Types.ObjectId.isValid(identifier)
      ? await User.findById(identifier).select('-password')
      : null;
    if (!user) {
      user = await User.findOne({ username: identifier }).select('-password');
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Convert to plain object and map _id to id
    const userObj = user._doc ? { ...user._doc } : user.toObject();
    userObj.id = userObj._id.toString();
    delete userObj._id;
    res.status(200).json(userObj);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get news submitted by a user by ID or username
router.get('/:identifier/news', async (req, res) => {
  try {
    const { identifier } = req.params;
    const { page = 1, limit = 10 } = req.query;
    let user = mongoose.Types.ObjectId.isValid(identifier)
      ? await User.findById(identifier)
      : null;
    if (!user) {
      user = await User.findOne({ username: identifier });
    }

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    const totalNews = await News.countDocuments({ author: user._id });
    
    const news = await News.find({ author: user._id })
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);
    
    res.status(200).json({
      news,
      totalPages: Math.ceil(totalNews / limit),
      currentPage: page
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Update user profile (only own profile)
router.patch('/profile', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    
    // Fields that can be updated
    const allowedUpdates = ['avatar', 'bio', 'location'];
    const updates = {};
    
    // Filter out only allowed fields for update
    Object.keys(req.body).forEach(key => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });
    
    const updatedUser = await User.findByIdAndUpdate(
      userId, 
      updates, 
      { new: true }
    ).select('-password');
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Change password (only own password)
router.patch('/change-password', authMiddleware, async (req, res) => {
  try {
    const userId = req.userId;
    const { currentPassword, newPassword } = req.body;
    
    const user = await User.findById(userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Verify current password
    const isPasswordValid = await user.isValidPassword(currentPassword);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    user.password = newPassword;
    await user.save();
    
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

export default router;

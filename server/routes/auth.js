import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || 'newshub-secret-key';
const JWT_EXPIRE = '7d';

// Register a new user
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ 
      $or: [{ email }, { username }] 
    });
    
    if (existingUser) {
      return res.status(400).json({ 
        message: 'User already exists with this email or username' 
      });
    }

    // Create new user
    const newUser = new User({ 
      username, 
      email, 
      password,
      joinedDate: new Date().toISOString(),
      location: {
        city: '',
        state: '',
        country: ''
      }
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRE }
    );

    // Return user info without password
    // Handle both Mongoose document formats
    const userObj = newUser._doc ? newUser._doc : newUser.toObject();
    const userWithoutPassword = { ...userObj };
    delete userWithoutPassword.password;
    
    // Convert Mongoose ObjectId to string for proper JSON serialization
    userWithoutPassword.id = userWithoutPassword._id.toString();

    res.status(201).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Login user
router.post('/login', async (req, res) => {
  console.log('Login request body:', req.body);
  try {
    // Accept identifier, email, or username
    const { identifier, email, username, password } = req.body;
    const loginValue = (identifier || email || username || '').trim();
    if (!loginValue) {
      return res.status(400).json({ message: 'Email or username is required' });
    }
    const loginFieldLower = loginValue.toLowerCase();
    console.log('Login attempt for identifier:', loginValue);

    // Find user by email (case-insensitive) or username (case-insensitive)
    const user = await User.findOne({
      $or: [
        { email: loginFieldLower },
        { username: { $regex: `^${loginFieldLower}$`, $options: 'i' } }
      ]
    });
    if (!user) {
      console.warn('No user found for identifier:', loginValue);
      return res.status(404).json({ message: 'User not found' });
    }

    // Validate password
    const isPasswordValid = await user.isValidPassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role }, 
      JWT_SECRET, 
      { expiresIn: JWT_EXPIRE }
    );

    // Return user info without password
    // Handle both Mongoose document formats
    const userObj = user._doc ? user._doc : user.toObject();
    const userWithoutPassword = { ...userObj };
    delete userWithoutPassword.password;
    
    // Convert Mongoose ObjectId to string for proper JSON serialization
    userWithoutPassword.id = userWithoutPassword._id.toString();

    res.status(200).json({
      user: userWithoutPassword,
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Get current user (for token verification)
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verify token
    const decoded = jwt.verify(token, JWT_SECRET);
    
    // Find user by id
    const user = await User.findById(decoded.id).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Format user object for consistent response
    const userObj = user._doc ? user._doc : user.toObject();
    
    // Convert Mongoose ObjectId to string for proper JSON serialization
    userObj.id = userObj._id.toString();

    res.status(200).json({ user: userObj });
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;

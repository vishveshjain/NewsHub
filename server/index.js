import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';

// Import routes
import authRoutes from './routes/auth.js';
import newsRoutes from './routes/news.js';
import userRoutes from './routes/users.js';
import adminRoutes from './routes/admin.js';
import contactRoutes from './routes/contact.js';

// Create Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json({ limit: '30mb' }));
app.use(express.urlencoded({ extended: true, limit: '30mb' }));
app.use(cors());
app.use(morgan('dev'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/news', newsRoutes);
app.use('/api/users', userRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/contact', contactRoutes);

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/newshub')
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`));
  })
  .catch((error) => console.log(`Failed to connect to MongoDB: ${error.message}`));

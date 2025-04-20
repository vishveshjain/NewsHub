import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const locationSchema = new mongoose.Schema({
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  country: { type: String, default: '' }
});

const userSchema = new mongoose.Schema({
  username: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true,
    minlength: 3 
  },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,
    trim: true 
  },
  password: { 
    type: String, 
    required: true, 
    minlength: 6 
  },
  avatar: { 
    type: String, 
    default: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150' 
  },
  bio: { 
    type: String, 
    default: '' 
  },
  credibilityScore: { 
    type: Number, 
    default: 50 
  },
  joinedDate: { 
    type: Date, 
    default: Date.now 
  },
  location: { 
    type: locationSchema, 
    default: () => ({}) 
  },
  followersCount: { 
    type: Number, 
    default: 0 
  },
  followingCount: { 
    type: Number, 
    default: 0 
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
}, { timestamps: true });

// Pre-save middleware to hash password
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to check password validity
userSchema.methods.isValidPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.model('User', userSchema);

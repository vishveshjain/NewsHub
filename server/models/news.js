import mongoose from 'mongoose';

const locationSchema = new mongoose.Schema({
  city: { type: String, default: '' },
  state: { type: String, default: '' },
  country: { type: String, default: '' },
  coordinates: {
    lat: Number,
    lng: Number
  }
});

const newsSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 10
  },
  description: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 20
  },
  content: { 
    type: String, 
    required: [function() { return this.type === 'article'; }, 'Content is required for articles'],
    validate: {
      validator: function(v) {
        if (this.type === 'video') return true;
        return typeof v === 'string' && v.length >= 100;
      },
      message: 'Content must be at least 100 characters long'
    }
  },
  thumbnail: { 
    type: String, 
    required: [function() { return this.type === 'article'; }, 'Thumbnail is required for articles'] 
  },
  type: { 
    type: String, 
    enum: ['article', 'video'],
    default: 'article'
  },
  videoUrl: { 
    type: String,
    default: '',
    required: [function() { return this.type === 'video'; }, 'Video URL is required for video news']
  },
  location: { 
    type: locationSchema, 
    required: true 
  },
  categories: [{ 
    type: String,
    required: true 
  }],
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  upvotes: { 
    type: Number, 
    default: 0 
  },
  downvotes: { 
    type: Number, 
    default: 0 
  },
  viewCount: { 
    type: Number, 
    default: 0 
  },
  isModerated: { 
    type: Boolean, 
    default: false 
  },
  comments: { 
    type: Number, 
    default: 0 
  }
}, { timestamps: true });

// Create index for full-text search
newsSchema.index({ title: 'text', description: 'text', content: 'text' });

export default mongoose.model('News', newsSchema);

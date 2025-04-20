import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  content: { 
    type: String, 
    required: true,
    trim: true,
    minlength: 1
  },
  author: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  newsId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'News',
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
  parentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Comment',
    default: null
  }
}, { timestamps: true });

export default mongoose.model('Comment', commentSchema);

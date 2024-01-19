const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reviewSchema = new Schema({
  content: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
    default: 5
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  userName: String,
  userAvatar: String, 
  }, {
  timestamps: true
 });

const bookSchema = new Schema({
  title: {
    type: String
  },
  authors: [{
    type: String
  }],
  rating: {
    type: String
  },
  description: {
    type: String
  },
  googleId: {
    type: String
  },
  reviews: [reviewSchema],
  image: String,
  subtitle: String,
  categories: [],
  // users who added to library
  addedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  }, {
  timestamps: true
 });




module.exports = mongoose.model('Book', bookSchema);
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

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
  reviews: [],
  image: String,
  subtitle: String,
  categories: [],
  // users who added to library
  addedBy: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  ratings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rating'
    }
  ]
});




module.exports = mongoose.model('Book', bookSchema);
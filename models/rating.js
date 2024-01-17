const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  book: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'Book',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  userName: String,
  value: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  },
  comment: String
});

const Rating = mongoose.model('Rating', ratingSchema);

module.exports = Rating;
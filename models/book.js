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
    type: Number
  },
  description: {
    type: String
  },
  googleId: {
    type: String
  },
  reviews: [],
  image: String
});


module.exports = mongoose.model('Book', bookSchema);
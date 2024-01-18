const Book = require('../models/book');

module.exports = {
  create,
  deleteReview,
};

async function deleteReview(req, res) {
  const book = await Book.findOne({ 'reviews._id': req.params.reviewId, 'reviews.user': req.user._id });
  if (!book) return res.redirect('/books/library');
  book.reviews.remove(req.params.reviewId);
  await book.save();
  res.redirect(`/books/${book._id}`);
}

async function create(req, res) {
  const book = await Book.findById(req.params.id);
  req.body.user = req.user._id;
  req.body.userName = req.user.name;
  req.body.userAvatar = req.user.avatar;
  book.reviews.push(req.body);
  try {
    await book.save();
  } catch (err) {
    console.log(err);
  }
  res.redirect(`/books/${book._id}`);
}


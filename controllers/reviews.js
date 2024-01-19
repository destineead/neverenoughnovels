const Book = require('../models/book');

module.exports = {
  create,
  deleteReview,
  edit,
  update
};

async function create(req, res) {
  console.log('req.body',req.body)
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

async function deleteReview(req, res) {
  const book = await Book.findOne({ 'reviews._id': req.params.reviewId, 'reviews.user': req.user._id });
  if (!book) return res.redirect('/books/library');
  book.reviews.remove(req.params.reviewId);
  await book.save();
  res.redirect(`/books/${book._id}`);
}

async function edit(req, res) {
  const book = await Book.findOne({
    'reviews._id': req.params.reviewId,
    'reviews.user': req.user._id,
  });
  const review = book.reviews.id(req.params.reviewId)
  res.render('reviews/edit', { title: 'Edit Review', book , review })
}

async function update(req, res) {
  const book = await Book.findOne({
    'reviews._id': req.params.reviewId,
    'reviews.user': req.user._id,
  });
  const reviewSubdoc = book.reviews.id(req.params.reviewId);

  if(!reviewSubdoc.user.equals(req.user._id)) return res.redirect(`/books/${book._id}`);
  reviewSubdoc.content = req.body.content;
  reviewSubdoc.rating = req.body.rating;
  try {
  await book.save();
  } catch (err) {
  console.log(err);
  }
  res.redirect(`/books/${book._id}`);
}


const Rating = require('../models/rating');

module.exports = {
  create,
}

async function create(req, res) {
    const book = await Rating.findById(req.params.id);
    const newRating = new Rating ({
      book: book._id,
      user: req.user.id,
      userName: req.user.name,
      value: req.body.value,
      // comment: req.body.comment,
    });
    try {
    await newRating.save();
    res.redirect(`/books/${book._id}`);
    } catch (err) {
      console.log(err);
    }
}
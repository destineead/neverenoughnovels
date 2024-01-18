const express = require('express');
const router = express.Router();
const reviewsCtrl = require('../controllers/reviews');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.post('/books/:id/reviews', ensureLoggedIn, reviewsCtrl.create);

router.get('/books/:id/reviews/:reviewId/edit', ensureLoggedIn, reviewsCtrl.edit);

router.delete('/books/:id/reviews/:reviewId', ensureLoggedIn, reviewsCtrl.deleteReview);

module.exports = router;
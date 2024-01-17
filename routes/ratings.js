const express = require('express');
const router = express.Router();
const ratingsCtrl = require('../controllers/ratings');

//POST /books/:id/ratings  create a rating for a book
router.post('/books/:id/ratings', ratingsCtrl.create)
// Delete /ratings

module.exports = router;
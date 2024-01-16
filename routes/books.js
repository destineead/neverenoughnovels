var express = require('express');
var router = express.Router();
const bookCtrl = require('../controllers/books');
const ensureLoggedIn = require('../config/ensureLoggedIn');


router.get('/search', bookCtrl.searchAPI);
router.post('/',  ensureLoggedIn, bookCtrl.addToLibrary);
router.get('/library', ensureLoggedIn, bookCtrl.getLibrary);
router.delete('/library/:id', bookCtrl.deleteBook);


module.exports = router;
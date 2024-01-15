var express = require('express');
var router = express.Router();
const bookCtrl = require('../controllers/books');

/* GET home page. */
router.get('/search', bookCtrl.searchAPI);
router.post('/library', bookCtrl.addToLibrary);




module.exports = router;
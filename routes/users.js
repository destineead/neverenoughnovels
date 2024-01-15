const express = require('express');
const router = express.Router();

// GET users page
router.get('/', function(req, res) {
  res.send('In users')
});

module.exports = router;

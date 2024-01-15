const User = require('../models/user');

/* GET user page. */
router.get('/users' , function (req ,res) {
  res.redirect('/users', { text: 'My Profile'})
});



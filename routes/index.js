var express = require('express');
var router = express.Router();

router.get('/', checkAuth, function(req, res) {
    res.render('index');
});

function checkAuth(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  else {
    //req.flash('error_msg', 'You must log in');
    res.redirect('/users/login');
  }
}

module.exports = router;



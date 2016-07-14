var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../models/user');

router.get('/register', function(req, res) {
    res.render('register');
});

router.post('/register', function(req, res) {
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(password);

  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {errors: errors});
  }
  else {
    User.createUser(username, password, function(err, username) {
      if (err) {
        if (err.code == 23505) { msg = 'Username already exists: ' + username; }
        else { msg = 'Unknown error, contact administrator'; }
        console.log(msg);
        console.log(err.detail);
        req.flash('error_msg', msg);
        res.redirect('register');
      }
      else {
        console.log('Registered new user: ' + username);
        req.flash('success_msg', 'Registered new user: ' + username);
        res.redirect('/users/login');
      }
    });
  }
});

router.get('/login', function(req, res) {
    res.render('login');
});

passport.use(new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user){
      if(err) throw err;
      if(!user){
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if(err) throw err;
        if(isMatch){
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.userid);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

router.post('/login',
  passport.authenticate('local', {successRedirect:'/', failureRedirect:'/users/login',failureFlash: true}),
  function(req, res) {
    res.redirect('/');
  }
);

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;

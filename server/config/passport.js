'use strict';

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function() {
  passport.use(new LocalStrategy(
    function(username, password, done) {
      User.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        if (!user.isAuthenticated(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }

        return done(null, user);
      });
    }
  ));

  passport.serializeUser(function(user, done) {
    // return done(null, user.id);
    if (user) {
      return done(null, user._id);
    }
  });

  passport.deserializeUser(function(id, done) {
/*    User.findById(id, function(err, user) {
      done(err, user);
    });*/
    User.findOne({_id: id}).exec(function(err, user) {
      if (err) {
        console.log('Error loading user: ' + err);
        return;
      }

      if (user) {
        return done(null, user);
      }
      else {
        return done(null, false);
      }
    })
  });
};

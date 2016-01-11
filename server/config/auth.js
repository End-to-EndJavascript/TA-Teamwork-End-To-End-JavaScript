'use strict';

var passport = require('passport');

module.exports = {
  login: function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        req.session.error = 'Username or password are invalid!';
        res.redirect('/login');
      }

      req.login(user, function(err) {
        if (err) {
          return next(err);
        }

        res.redirect('/');
      });
    });

    auth(req, res, next);
  },
  logout: function(req, res) {
    req.logout();
    res.redirect('/');
  },
  isAuthenticated: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res.redirect('/login');
    } else {
      next();
    }
  }
};

'use strict';

var passport = require('passport');

module.exports = {
  login: function(req, res, next) {
    var auth = passport.authenticate('local', function(err, user) {
      if (err) {
        return next(err);
      }

      if (!user) {
        res
          .status(400)
          .json({ errorMessage: 'Incorrect username or password!' });
      }

      req.login(user, function(err) {
        if (err) {
          return next(err);
        }

        res
          .status(200)
          .json({ username: user.username, message: 'Login successful'});
      });
    });

    auth(req, res, next);
  },
  logout: function(req, res) {
    req.logout();
    res
      .status(200)
      .json({ success: true });
  },
  authenticate: function(req, res, next) {
    if (!req.isAuthenticated()) {
      res
        .status(403)
        .end();
    } else {
      next();
    }
  }
};

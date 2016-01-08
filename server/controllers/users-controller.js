'use strict';

var users = require('../data/users-data');

module.exports = {
  getRegister: function(req, res, next) {
    res.render('users/register');
  },
  postRegister: function(req, res, next) {
    var user = req.body;

    if (user.password !== user.confirmPassword) {
      req.session.error = 'Passwords do not match!';
      res.redirect('/register');
    }
    else {
      users
        .create(user)
        .then(function(dbUser){
          res.redirect('/');
        });
    }
  }
};

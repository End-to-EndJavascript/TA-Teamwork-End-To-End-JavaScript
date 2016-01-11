'use strict';

var users = require('../data/users-data'),
  encryption = require('../utilities/encryption');

var CONTROLLER_NAME = 'users';

module.exports = {
  getRegister: function (req, res, next) {
    res.render(CONTROLLER_NAME + '/register');
  },
  postRegister: function (req, res, next) {
    var user = req.body;
    console.log(user);
    if (!user) {
      req.session.error = 'Not all required fields are filled!';
      res.redirect('/register');
    }

    if (user.password !== user.confirmPassword) {
      req.session.error = 'Passwords do not match!';
      res.redirect('/register');
    } else {
      user.salt = encryption.generateSalt();
      user.passHash = encryption.generateHashedPassword(user.salt, user.password);

      users
        .create(user)
        .then(function (dbUser) {
          // TODO: login user?
          res.redirect('/login');
        });
    }
  },
  getLogin: function (req, res, next) {
    res.render(CONTROLLER_NAME + '/login');
  },
  getProfile: function (req, res, next) {
    res.render(CONTROLLER_NAME + '/profile');
  },
  getEditProfile: function (req, res, next) {
    res.render(CONTROLLER_NAME + '/edit');
  },
  updateProfile: function (req, res, next) {
    console.log(req.user);
    console.log(req.body);
    console.log(1);
   /* if (req.user._id != req.body._id) {
      req.session.error = 'You do not have permission!';
      res.redirect('/register');
    } else {*/
      var updatedUser = req.body;
      if (updatedUser.password && updatedUser.password.length > 0) {
        updatedUser.salt = encryption.generateSalt();
        updatedUser.hashPass = encryption.generateHashedPassword(updatedUser.salt, updatedUser.password);
      }

      users
        .update(req.user._id, updatedUser)
          .then(function (dbUser) {
            console.log('After update: ' + dbUser);
            res.render('/');
          })
          .catch(function (err) {
            console.log('Error' + err);
          });
    //}
  }
};

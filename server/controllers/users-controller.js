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

      if (!user.image && req.file) {
        user.image = req.file.path.substr('public'.length);
      }

      users
        .create(user)
        .then(function (dbUser) {
          // TODO: login user?
          res.redirect('/login');
        })
        .catch(function (err) {
          req.session.error = 'Not all required fields are filled correctly!';
          res.redirect('/register');
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
    res.render(CONTROLLER_NAME + '/edit-profile');
  },
  updateProfile: function (req, res, next) {
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
        res.json(dbUser);
      })
      .catch(function (err) {
        req.session.error = 'Could not update the profile!';
        res.redirect('/profile/edit');
      });
    //}
  },
  getEditAvatar: function (req, res, next) {
    res.render(CONTROLLER_NAME + '/edit-avatar');
  },
  updateAvatar: function (req, res, next) {
    var updatedUser = {};

    if (req.file) {
      updatedUser.image = req.file.path.substr('public'.length);
    }

    users
      .update(req.user._id, updatedUser)
      .then(function (dbUser) {
        res.redirect('/profile');
      })
      .catch(function (err) {
        req.session.error = 'Could not update the image!';
        res.redirect('/profile/edit/avatar');
      });
  }
};

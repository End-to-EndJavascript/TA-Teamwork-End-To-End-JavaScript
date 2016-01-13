'use strict';

var users = require('../data/users-data');

module.exports = {
  getAdminAllUsersPage: function (req, res, next) {
    res.render('administration/users');
  },
  getAllUsersInfo: function (req, res, next) {
    users
      .getAll()
      .then(function(dbUsers) {
        res.json(dbUsers);
      });
  },
  deleteUser: function (req, res, next) {
    users
      .deleteUser(req.body.userId)
      .then(function() {
      })
  }
}

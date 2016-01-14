'use strict';

var users = require('../data/users-data');

module.exports = {
  getUsers: function (req, res, next) {
    if (req.accepts('text/html')) {
      res.render('administration/users');
    } else if(req.accepts('application/json')) {
      var searchQuery = req.query.search || "";

      users
        .getAll(searchQuery)
        .then(function(dbUsers) {
          res.json(dbUsers);
        });
    }
  },
  deleteUser: function (req, res, next) {
    users
      .deleteUser(req.body.userId)
      .then(function() {
        res.redirect("/admin/users")
      })
  }
}

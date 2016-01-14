'use strict';

var User = require('mongoose').model('User');

module.exports = {
  create: function (user) {
    var promise = new Promise(function (resolve, reject) {
      User.create(user, function (err, dbUser) {
        if (err) {
          if (err.code === 11000) {
            reject('Username has already been taken!');
          } else {
            reject(err);
          }
        }

        if (!dbUser) {
          reject('User could not be saved in database!');
        }

        resolve(dbUser);
      });
    });

    return promise;
  },
  update: function (id, user) {
    var promise = new Promise(function (resolve, reject) {
      User.findByIdAndUpdate(id, user, function (err, dbUser) {
        if (err) {
          reject(err);
        }

        if (!dbUser) {
          reject('User could not be saved in database!');
        }

        resolve(dbUser);
      });
    });

    return promise;
  },
  getAll: function (query) {
    var promise = new Promise(function (resolve, reject) {
      console.log(query);
      User.find({username: new RegExp(query)}, function (err, dbUsers) {
        if (err) {
          reject(err);
        }

        if (!dbUsers) {
          reject('User could not be saved in database!');
        }

        resolve(dbUsers);
      });
    });

    return promise;
  },
  deleteUser: function (id) {
    var promise = new Promise(function (resolve, reject) {
      User.findOne({_id: id}, function(err, userToDelete) {
        if (err) {
          reject(err);
        }

        userToDelete.remove(function(err) {
          resolve(true);
        })
      })
    });

    return promise;
  }
};

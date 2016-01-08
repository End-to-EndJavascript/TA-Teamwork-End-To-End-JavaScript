'use strict';

var mongoose = require('mongoose');

module.exports = (function() {
  var userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  });

  userSchema.method({
    verifyPassword: function(password) {
      return password === this.password;
    }
  });

  mongoose.model('User', userSchema);
}());

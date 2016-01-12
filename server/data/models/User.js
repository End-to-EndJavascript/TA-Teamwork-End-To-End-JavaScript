'use strict';

var mongoose = require('mongoose');
var encryption = require('../../utilities/encryption');

module.exports = (function() {
  var userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    description: { type: String, default: 'No description' },
    image: { type: String },
    salt: { type: String, required: true },
    passHash: { type: String, require: true },
    isAdmin: { type: Boolean, default: false }
  });

  userSchema.method({
    verifyPassword: function(password) {
      return encryption.generateHashedPassword(this.salt, password) === this.passHash;
    }
  });

  mongoose.model('User', userSchema);
}());

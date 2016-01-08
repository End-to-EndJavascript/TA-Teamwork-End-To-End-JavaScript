'use strict';

var mongoose = require('mongoose'),
  encryption = require('../../utilities/encryption');;

module.exports = (function () {
  var userSchema = mongoose.Schema({
    firstName: {type: String, required: true},
    lastName: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    salt: {type: String, required: true},
    passHash: {type: String, require: true},
    isAdmin: {type: Boolean, default: false}
  });

  userSchema.method({
    /*verifyPassword: function(password) {
     return password === this.password;
     },*/
    isAuthenticated: function (password) {
      console.log(encryption.generateHashedPassword(this.salt, password));
      console.log(this.passHash); 
      if (encryption.generateHashedPassword(this.salt, password) === this.passHash) {
        return true;
      }
      else {
        return false;
      }
    }
  });

  mongoose.model('User', userSchema);
}());

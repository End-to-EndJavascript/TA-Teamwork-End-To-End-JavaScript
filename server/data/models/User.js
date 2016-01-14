'use strict';

var mongoose = require('mongoose'),
  encryption = require('../../utilities/encryption'),
  validator = require('../../utilities/validator');

var INVALID_MESSAGE_OUTPUT = '{PATH} is not valid!',
  DEFAULT_DESCRIPTION_MESSAGE = 'No description';

module.exports = (function () {
  var userSchema = mongoose.Schema({
    firstName: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.lengthBetween3and25(v, 3, 25);
        },
        message: INVALID_MESSAGE_OUTPUT
      }
    },
    lastName: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.lengthBetween3and25(v, 3, 25);
        },
        message: INVALID_MESSAGE_OUTPUT
      }
    },
    username: {
      type: String,
      required: true,
      unique: true,
      validate: {
        validator: function (v) {
          return validator.lengthBetween3and25(v, 3, 25);
        },
        message: INVALID_MESSAGE_OUTPUT
      }
    },
    password: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.lengthBetween3and25(v, 3, 25);
        },
        message: INVALID_MESSAGE_OUTPUT
      }
    },
    description: {
      type: String,
      default: DEFAULT_DESCRIPTION_MESSAGE,
      validate: {
        validator: function (v) {
          return validator.lengthBetween3and25(v, 0, 300);
        },
        message: INVALID_MESSAGE_OUTPUT
      }
    },
    image: {type: String},
    salt: {type: String, required: true},
    passHash: {type: String, require: true},
    isAdmin: {type: Boolean, default: false}
  });

  userSchema.method({
    verifyPassword: function (password) {
      return encryption.generateHashedPassword(this.salt, password) === this.passHash;
    }
  });

  mongoose.model('User', userSchema);
}());

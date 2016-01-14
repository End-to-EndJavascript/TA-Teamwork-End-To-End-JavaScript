'use strict';

var multer = require('multer'),
  encryption = require('../utilities/encryption');


var userAvatarStorage = multer.diskStorage({
  destination: 'public/images/users',
  filename: function(req, file, cb) {
    var username = req.body.username || req.user.username;

    cb(null, username + '-' + file.fieldname + '-' + file.originalname);
  }
});

var recipeImageStorage = multer.diskStorage({
  destination: 'public/images/recipes',
  filename: function(req, file, cb) {
    var recipeName = req.body.name;

    cb(null, recipeName + '-' + file.fieldname + '-' + file.originalname);
  }
});

module.exports = {
  userAvatar: multer({ storage: userAvatarStorage }),
  recipeImage: multer({ storage: recipeImageStorage })
};

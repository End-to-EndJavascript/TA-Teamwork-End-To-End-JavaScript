'use strict';

var mongoose = require('mongoose');

module.exports = function(config) {
  mongoose.connect(config.dbConnection);
  var db = mongoose.connection;

  db.on('error', function(err) {
    console.log('Connection error: ' + err);
  });

  db.once('open', function(err) {
    if (err) {
      console.log('Database error: ' + err);
    } else {
      console.log('MongoDB up and running...');
    }
  });

  require('../data/models/User');
  require('../data/models/Product');
  require('../data/models/Recipe');

  
};

'use strict';

var path = require('path');

var rootPath = path.normalize(__dirname + './../..');

module.exports = {
  development: {
    port: 3030,
    rootPath: rootPath,
    dbConnection: 'mongodb://localhost/foodnodeappdb'
  },
  production: {
    port: process.env.PORT,
    rootPath: rootPath,
    dbConnection: 'mongodb://admin:admin@ds035995.mongolab.com:35995/foodnodeappdb'
  }
};

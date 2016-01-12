'use strict';

var products = require('../data/products-data');

var CONTROLLER_NAME = 'common';

module.exports = {
  getUnauthorized: function(req, res, next) {
    res.render(CONTROLLER_NAME + '/unauthorized');
  }
};

'use strict';

var products = require('../data/products-data');

module.exports = {
  getAllProducts: function(req, res, next) {
    if (req.accepts('text/html')) {
      res.render('products/all');
    } else if(req.accepts('application/json')) {
      products
        .getAll()
        .then(function(dbProducts) {
          res.json(dbProducts);
        });
    }
  },
  getAddProduct: function(req, res, next) {
    res.render('products/add');
  },
  postAddProduct: function(req, res, next) {
    var product = req.body;

    products
      .create(product)
      .then(function() {
        res.redirect('/products');
      });
  },
  updateProduct: function(req, res, next) {
    products
      .update(req.params.id, req.body)
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  }
};

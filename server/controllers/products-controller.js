'use strict';

var products = require('../data/products-data');

module.exports = {
  getAllProducts: function(req, res, next) {
    products
      .getAll()
      .then(function(dbProducts) {
        res.render('products/all-products', { products: dbProducts });
      });
  },
  getAddProduct: function(req, res, next) {
    res.render('products/add-product');
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
    var updatedProduct = req.body.product;
    var id = req.body.id;

    products
      .update(id, updatedProduct)
      .then(function(dbProduct) {
        res.json(dbProduct);
      });
  }
};

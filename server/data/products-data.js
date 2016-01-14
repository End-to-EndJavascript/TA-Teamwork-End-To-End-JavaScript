'use strict';

var Product = require('mongoose').model('Product');

module.exports = {
  create: function(product) {
    var promise = new Promise(function(resolve, reject) {
      Product.create(product, function(err, dbProduct) {
        if (err) {
          reject(err);
        }

        if (!dbProduct) {
          reject('Product could not be saved in database!');
        }

        resolve(dbProduct);
      });
    });

    return promise;
  },
  getAll: function() {
    var promise = new Promise(function(resolve, reject) {
      Product.find({}, function(err, dbProducts) {
        if (err) {
          reject(err);
        }

        if (!dbProducts) {
          reject('Products could not be loaded from database!');
        }

        resolve(dbProducts);
      });
    });

    return promise;
  },
  update: function(id, updatedProduct) {
    delete updatedProduct['__v'];
    delete updatedProduct['_id'];

    var promise = new Promise(function(resolve, reject) {
      Product.findByIdAndUpdate(id, updatedProduct, { new: true }, function(err, dbProduct) {
        if (err) {
          reject(err);
        }

        resolve(dbProduct);
      });
    });

    return promise;
  },
  remove: function(id) {
    var promise = new Promise(function(resolve, reject) {
      Product.remove({ _id: id }, function(err) {
        if (err) {
          reject('Product could not be removed from database!');
        }

        resolve(true);
      });
    });

    return promise;
  }
};

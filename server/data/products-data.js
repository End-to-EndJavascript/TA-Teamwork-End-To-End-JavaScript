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
    // console.log(updatedProduct);
    var promise = new Promise(function(resolve, reject) {
      Product.findByIdAndUpdate(id, updatedProduct, function(err, dbProduct) {
        if (err) {
          console.log(err);

          reject(err);

        }

        console.log(dbProduct);

        resolve(dbProduct);
      });



      // Product.findById(updatedProduct._id, function(err, dbProduct) {
      //   if (err) {
      //     reject(err);
      //   }

      //   dbProduct.name = 'pesho';
      //   dbProduct.save(function(err) {
      //     if (err) {
      //       reject(err);
      //     }

      //     resolve(dbProduct);
      //   });
      // });
    });

    return promise;
  },
  remove: function(id) {
    var promise = new Promise(function(resolve, reject) {
      Product.remove({
        _id: id
      }, function(err) {
        if (err) {
          reject('Product could not be removed from database!');
        }

        resolve();
      });
    });

    return promise;
  }
};

(function() {
  'use strict';

  angular
    .module('foodApp.controllers')
    .controller('AllProductsController', ['$scope', 'products', AllProductsController]);

  function AllProductsController($scope, products) {
    var vm = this;

    products
      .getAll()
      .then(function(products) {
        vm.products = products;
      });

    $scope.$on('product-updated', function(ev, updatedProduct) {
      vm.products[vm.editProductIndex] = updatedProduct;
    });

    vm.broadcastEditEvent = function(product, index) {
      vm.editProductIndex = index;
      $scope.$broadcast('init-product-edit', product);
    };

    vm.setRemoveAction = function(product, index) {
      vm.productToRemove = product;
      vm.productToRemove.index = index;
    };

    vm.removeProduct = function(product) {
      products
        .remove(product._id)
        .then(function() {
          vm.products.splice(product.index, 1);
        });
    };
  }
}());

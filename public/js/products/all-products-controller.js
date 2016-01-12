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
  }
}());

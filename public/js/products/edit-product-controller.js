(function() {
  'use strict';

  angular
    .module('foodApp.controllers')
    .controller('EditProductController', ['$scope', 'products', EditProductController]);

  function EditProductController($scope, products) {
    var vm = this;

    $scope.$on('init-product-edit', function(ev, product) {
      vm.product = angular.copy(product);
    });

    vm.edit = function(updatedProduct) {
      products
        .edit(updatedProduct)
        .then(function(response) {
          $scope.$emit('product-updated', response);
        });
    };
  }
}());

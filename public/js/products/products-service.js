(function() {
  'use strict';

  angular
    .module('foodApp.services')
    .factory('products', ['data', products]);

  function products(data) {
    var url = 'products';

    function getAll() {
      return data.get(url);
    }

    function edit(updatedProduct) {
      return data.put(url + '/' + updatedProduct._id, updatedProduct);
    }

    return {
      getAll: getAll,
      edit: edit
    };
  }
}());

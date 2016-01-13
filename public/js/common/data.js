(function() {
  'use strict';

  angular
    .module('foodApp.services')
    .factory('data', ['$http', '$q', 'baseServiceUrl', data]);

  function data($http, $q, baseServiceUrl) {
   function get(url) {
      var defered = $q.defer();

      $http.get(baseServiceUrl + url)
        .then(function(response) {
          defered.resolve(response.data);
        }, function(error) {
          defered.reject(error);
        });

      return defered.promise;
    }

    function post(url, data) {

      var defered = $q.defer();
      $http.post(baseServiceUrl + url, data)
        .then(function (response) {

          defered.resolve(response.data);
        }, function (error) {
          defered.reject(error);
        });

      return defered.promise;
    }

    function put(url, putData) {
      var defered = $q.defer();

      $http.put(baseServiceUrl + url, putData)
        .then(function(response) {
          defered.resolve(response.data);
        }, function(error) {
          defered.reject(error);
        });

      return defered.promise;
    }

    return {
      get: get,
      put: put,
      post: post
    };
  }
}());

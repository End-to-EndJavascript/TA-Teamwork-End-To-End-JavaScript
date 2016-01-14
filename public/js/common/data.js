(function() {
  'use strict';

  angular
    .module('foodApp.services')
    .factory('data', ['$http', '$q', 'baseServiceUrl', data]);

  function data($http, $q, baseServiceUrl) {
   function get(url, params) {
      var defered = $q.defer();

      $http({
        url: baseServiceUrl + url,
        method: "GET",
        params: params
      })
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
        .then(function(response) {

          defered.resolve(response.data);
        }, function(error) {
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

    function remove(url, data) {
      var defered = $q.defer();

      $http.delete(baseServiceUrl + url, data)
        .then(function(response) {
          defered.resolve(response.data);
        }, function(error) {
          defered.reject(error);
        });

      return defered.promise;
    }

    return {
      get: get,
      post: post,
      put: put,
      remove: remove
    };
  }
}());

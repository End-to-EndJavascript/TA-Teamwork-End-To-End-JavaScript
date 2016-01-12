(function () {
  'use strict';

  function data($http, $q, baseServiceUrl) {
    function get(url, data) {
      var defered = $q.defer();

      $http.get(baseServiceUrl + '/' + url)
        .then(function (response) {
          defered.resolve(response.data);
        }, function (error) {
          error = getErrorMessage(error);
          defered.reject(error);
        });

      return defered.promise;
    }

    function put(url, postData) {
      var defered = $q.defer();

      $http.put(baseServiceUrl + '/' + url, postData)
        .then(function (response) {
          defered.resolve(response.data);
        }, function (error) {
          error = getErrorMessage(error);
          defered.reject(error);
        });

      return defered.promise;
    }

    function deleteUser(url, data) {

      var defered = $q.defer();
      $http.post(baseServiceUrl + '/' + url, data)
        .then(function (response) {

          defered.resolve(response.data);
        }, function (error) {
          error = getErrorMessage(error);
          defered.reject(error);
        });

      return defered.promise;
    }

    function getErrorMessage(response) {
      var error = response.data.modelState;
      if (error && error[Object.keys(error)[0]][0]) {
        error = error[Object.keys(error)[0]][0];
      }
      else {
        error = response.data.message;
      }

      return error;
    }

    return {
      get: get,
      put: put,
      deleteUser: deleteUser
    };
  }

  angular.module('foodApp.services')
    .factory('data', ['$http', '$q', 'baseServiceUrl', data]);
}());

(function () {
  'use strict';

  function data($http, $q, baseServiceUrl) {
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
      put: put
    };
  }

  angular.module('foodApp.services')
    .factory('data', ['$http', '$q', 'baseServiceUrl', data]);
}());

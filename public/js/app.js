(function() {
  'use strict';

  angular.module('foodApp.services', []);
  angular.module('foodApp.controllers', ['foodApp.services']);
  angular.module('foodApp', ['ui.materialize', 'foodApp.controllers'])
    .constant('baseServiceUrl', 'http://localhost:3030/')
    .run(['$http', function($http) {
      $http.defaults.headers.common.Accept = 'application/json';
    }]);
}());

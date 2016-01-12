(function() {
  'use strict';

  angular.module('foodApp.services', []);
  angular.module('foodApp.controllers', ['foodApp.services']);
  angular.module('foodApp', ['ui.materialize', 'foodApp.controllers'])
    .config(['$locationProvider', function ($locationProvider) {
      $locationProvider.html5Mode(true);
    }])
    .constant('baseServiceUrl', 'http://localhost:3030/')
    .run(['$http', function($http) {
      $http.defaults.headers.common.Accept = 'application/json';
    }]);
}());

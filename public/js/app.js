(function () {
  'use strict';


  angular.module('foodApp.services', []);
  angular.module('foodApp.controllers', ['foodApp.services']);
  angular.module('foodApp', ['ngRoute', 'foodApp.controllers'])
    .constant('baseServiceUrl', 'http://localhost:3030');      // http://localhost:1337, http://spa2014.bgcoder.com
}());

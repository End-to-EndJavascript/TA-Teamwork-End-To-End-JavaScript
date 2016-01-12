(function() {
  'use strict';

  angular
    .module('foodApp.controllers')
    .controller('UsersController', ['$window', '$location', 'users', UsersController]);

  function UsersController($window, $location, users) {
    var vm = this;

    vm.edit = function(updatedUser) {
      users.edit(updatedUser)
        .then(function (response) {
          $location.path('/profile');
          $window.location.reload();
        });
    };
  }
}());

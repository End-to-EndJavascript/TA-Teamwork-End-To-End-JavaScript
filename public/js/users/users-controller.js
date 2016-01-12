(function() {
  'use strict';

  angular
    .module('foodApp.controllers')
    .controller('UsersController', ['users', UsersController]);

  function UsersController(users) {
    var vm = this;

    vm.edit = function(updatedUser) {
      users.edit(updatedUser);
    };
  }
}());

(function () {
  'use strict';

  function UsersController(data) {
    var vm = this;

    vm.edit = function (request) {
      data.put('profile/edit', request);
    }
  }

  angular.module('foodApp.controllers').controller('UsersController', ['data', UsersController]);
}());

(function () {
  'use strict';

  function AdminUsersController($location, data) {
      var vm = this;

      data.get('admin/users/all')
        .then(function(data) {

          vm.users = data;
        });

      vm.deleteUser = function (userId) {
        data.deleteUser('admin/users/deleteUser', { userId })
            .then(function() {
              location.reload();
            });
      }

  }

  angular.module('foodApp.controllers').controller('AdminUsersController', ['$location', 'data', AdminUsersController]);
}());

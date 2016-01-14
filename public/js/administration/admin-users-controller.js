(function () {
  'use strict';

  function AdminUsersController($location, data) {
      var vm = this;


      data.get('admin/users')
          .then(function(data) {
          vm.users = data;
        });

      vm.deleteUser = function (userId) {
        data.post('admin/users/deleteUser', { userId });
      }

      vm.getSortedUsers = function (params) {
        data.get('admin/users', params)
            .then(function(data) {
              vm.users = data;
            });
      }

  }

  angular.module('foodApp.controllers').controller('AdminUsersController', ['$location', 'data', AdminUsersController]);
}());

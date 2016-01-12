(function() {
  'use strict';

  angular
    .module('foodApp.services')
    .factory('users', ['data', users]);

  function users(data) {
    var url = 'users';

    function edit(updatedUser) {
      data.put(url, updatedUser);
    }

    return {
      edit: edit
    };
  }
}());

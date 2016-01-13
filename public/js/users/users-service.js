(function() {
  'use strict';

  angular
    .module('foodApp.services')
    .factory('users', ['data', users]);

  function users(data) {
    var url = 'profile/edit';

    function edit(updatedUser) {
      return data.put(url, updatedUser);
    }

    return {
      edit: edit
    };
  }
}());

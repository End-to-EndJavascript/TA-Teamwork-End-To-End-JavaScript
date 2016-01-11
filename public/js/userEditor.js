$(document).ready(function() {
  $('#user-edit').on('click', function() {
    var obj = {
      firstName: 'asd',
      lastName: 'asd',
      password: 'asd',
      confirmPassword: 'asd',
      description: 'asd'
    }

    $.ajax({
      url: '/profile/edit',
      method: 'PUT',
      data: obj,
      success: function(result) {
        console.log('Updated');
        //window.location = 'http://localhost:3030/profile';
      },
      error: function (error) {
        console.log(error);
      }
    });
  });
});

$(document).ready(function() {
    $('#btn-add-ingredient').on('click', function() {
        var ingredientsContainer = $('#add-ingredients-container');
        var ingredientsMenu = $('#add-ingredient')[0];
        $('#add-ingredients-container').append(ingredientsMenu.outerHTML);
    });
});

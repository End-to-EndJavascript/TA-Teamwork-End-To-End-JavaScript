'use strict';

var controllers = require('../controllers');

module.exports = function(app) {
  app.get('/register', controllers.users.getRegister);
  app.post('/register', controllers.users.postRegister);

  app.get('/recipes', controllers.recipes.getAllRecipes);
  app.get('/recipes/add', controllers.recipes.getAddNewRecipe);
  app.post('/recipes/add', controllers.recipes.postAddNewRecipe);
  app.get('/recipes/:id', controllers.recipes.getRecipeDetails);

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('*', function(req, res) {
    res.render('index');
  });
};

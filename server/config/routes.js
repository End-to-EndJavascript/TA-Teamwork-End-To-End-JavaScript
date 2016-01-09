'use strict';

var auth = require('./auth'),
  controllers = require('../controllers');

module.exports = function(app) {
  app.get('/register', controllers.users.getRegister);
  app.post('/register', controllers.users.postRegister);

  app.get('/login', controllers.users.getLogin);
  app.post('/login', auth.login);
  app.get('/logout', auth.isAuthenticated, auth.logout);
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

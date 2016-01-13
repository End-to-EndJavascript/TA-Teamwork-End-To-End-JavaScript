'use strict';

var recipes = require('../data/recipes-data');

module.exports = {
  getAllRecipes: function(req, res, next) {
    var query = {};
    query.page = req.query.page || 1;
    query.category = req.query.category;
    query.sortBy = req.query.sortBy || 'asc';

    recipes
      .getAll(query)
      .then(function(data) {
        query.recipes = data.recipes;
        query.pages = data.pages;

        res.render('recipes/all', query);
      });
  },
  getRecipeDetails: function(req, res, next) {
    recipes.getById(req.params.id)
           .then(function (recipe) {
             res.render('recipes/details', { recipe: recipe });
           });
  },
  getAddNewRecipe: function(req, res, next) {
    res.render('recipes/add');
  },
  postAddNewRecipe: function(req, res, next) {
    var recipe = req.body;

    recipes.create(recipe)
           .then(function(dbRecipe) {
              res.redirect('/recipes');
            });
  }
};

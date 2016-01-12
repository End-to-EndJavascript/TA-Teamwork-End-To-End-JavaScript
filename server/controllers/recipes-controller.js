'use strict';

var recipes = require('../data/recipes-data');

module.exports = {
  getAllRecipes: function(req, res, next) {
    recipes.getAll(req.query.page, req.query.category, req.query.sortBy)
           .then(function (recipes) {
             res.render('recipes/all',  recipes );
           })
  },
  getRecipeDetails: function(req, res, next) {
    recipes.getById(req.params.id)
           .then(function (recipe) {
             res.render('recipes/details',  recipe );
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

'use strict';

var recipes = require('../data/recipes-data');
var products = require('../data/products-data');

module.exports = {
  getAllRecipes: function(req, res, next) {
    recipes.getAll(req.query.page, req.query.category, req.query.sortBy)
           .then(function (recipes) {
             res.render('recipes/all', { recipes });
           })
  },
  getRecipeDetails: function(req, res, next) {
    recipes.getById(req.params.id)
           .then(function (recipe) {
            //  var array = [
            //    { name: recipe.ingredients[0].name.toString()},
            //    { name: recipe.ingredients[1].name}
            //  ]
             res.render('recipes/details', { recipe });
           });
  },
  getAddNewRecipe: function(req, res, next) {
    products.getAll()
            .then(function (products) {
              // TODO: Change
              products.sort(function(a, b) {
                if (a.category > b.category) {
                    return 1;
                } else {
                    return -1;
                }
              });

              res.render('recipes/add', { products });
            })
  },
  postAddNewRecipe: function(req, res, next) {
    var recipe = req.body;
    
    recipes.create(recipe)
           .then(function(dbRecipe) {
              res.redirect('/recipes');
            });
  }
};

'use strict';

var recipes = require('../data/recipes-data');
var products = require('../data/products-data');

module.exports = {
  getAllRecipes: function(req, res, next) {
    var query = {};
    query.page = req.query.page || 1;
    query.category = req.query.category;
    query.sortBy = req.query.sortBy || 'createdOn';

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
    products.getAll()
            .then(function (products) {

              products.sort(function(a, b) {
                if (a.category > b.category) {
                    return 1;
                } else {
                    return -1;
                }
              });

              res.render('recipes/add', { products: products });
            })
  },
  postAddNewRecipe: function(req, res, next) {
    var recipe = req.body;

    if (req.file) {
      recipe.imageUrl = req.file.path.substr('public'.length);
    } else {
      recipe.imageUrl = '/images/recipes/default-recipe-image.jpg';
    }

    if (!recipe || !recipe.name || !recipe.howToPrepare) {
      req.session.error = '"Name", "Category", "Ingredients" and "How to prepare" cannot be empty!';
      res.redirect('/recipes/add');
    }

    recipes.create(recipe)
           .then(function(dbRecipe) {
              res.redirect('/recipes');
            });
  }
};

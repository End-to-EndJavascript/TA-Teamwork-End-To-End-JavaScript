'use strict';

var Recipe = require('mongoose').model('Recipe');

module.exports = {
  create: function(recipe) {
    var promise = new Promise(function(resolve, reject) {
      Recipe.create(recipe, function(err, dbRecipe) {
        if (err) {
          reject('Failed to create recipe: ' + err);
          return;
        }

        if (!dbRecipe) {
          reject('Recipe could not be saved in database!');
        }

        resolve(dbRecipe);
      });
    });

    return promise;
  },
  getAll: function() {
    var promise = new Promise(function(resolve, reject) {
      Recipe.find({}).exec(function(err, recipes) {
        if (err) {
          reject('Failed to get all recipes: ' + err);
          return;
        }

        if (!recipes) {
          reject('No recipes found int DB: ' + err);
        }

        resolve(recipes);
      });
    });

    return promise;
  },
  getById: function(id) {
    var promise = new Promise(function(resolve, reject) {
      Recipe.findOne({_id: id}).exec(function(err, recipe) {
        if (err) {
          reject('Failed to get recipe details: ' + err);
          return;
        }

        if(!recipe){
          reject('Recipe not found: ' + err);
        }

        resolve(recipe);
      });
    });

    return promise;
  }
};

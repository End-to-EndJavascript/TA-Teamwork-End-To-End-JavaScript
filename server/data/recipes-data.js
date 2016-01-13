'use strict';

var request = require('request');
var fs = require('fs');
var Recipe = require('mongoose').model('Recipe');

module.exports = {
  create: function(recipe) {
    if (recipe.imageUrl) {
      request(recipe.imageUrl).pipe(fs.createWriteStream('public/images/' + recipe.name + '.jpg')).on('close', function() {});

      recipe.imageUrl = '/images/' + recipe.name + '.jpg';
    } else {
      recipe.imageUrl = '/images/default-image.jpg';
    }

    var promise = new Promise(function(resolve, reject) {
      Recipe.create(recipe, function(err, dbRecipe) {
        if (err) {
          reject('Failed to create recipe: ' + err);
          return;
        }

        if (!dbRecipe) {
          reject('Recipe could not be saved in database!');
          return;
        }

        resolve(dbRecipe);
      });
    });

    return promise;
  },
  getAll: function(query) {
    var take = 8;
    var filter = {};
    var page = query.page - 1;
    var sortBy = query.sortBy;

    if (query.category) {
      filter.category = query.category;
    }

    var promise = new Promise(function(resolve, reject) {
      Recipe
        .find(filter)
        .limit(take)
        .skip(take * page)
        .sort(sortBy)
        .exec(function(err, recipes) {
          if (err) {
            reject('Failed to get all recipes: ' + err);
          }

          Recipe
            .count(filter)
            .exec(function(err, count) {
              if (err) {
                reject('Failed to get all recipes: ' + err);
              }

              resolve({ recipes: recipes, pages: Math.round(count / take) });
            });
        });
    });

    return promise;
  },
  getById: function(id) {
    var promise = new Promise(function(resolve, reject) {
      Recipe.findOne({ _id: id }).exec(function(err, recipe) {
        if (err) {
          reject('Failed to get recipe details: ' + err);
          return;
        }

        if (!recipe) {
          reject('Recipe not found: ' + err);
        }

        resolve(recipe);
      });
    });

    return promise;
  }
};

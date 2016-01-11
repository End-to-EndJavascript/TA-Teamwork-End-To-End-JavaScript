'use strict';

var request = require('request'),
    fs = require('fs');
var Recipe = require('mongoose').model('Recipe');

module.exports = {
  create: function(recipe) {
    if (recipe.imageUrl) {
      request(recipe.imageUrl).pipe(fs.createWriteStream('public/images/'+ recipe.name +'.jpg')).on('close', function() {
      });

      recipe.imageUrl = '/images/'+ recipe.name +'.jpg';
    }
    else {
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
  getAll: function(page, category, sortBy) {
    var promise = new Promise(function(resolve, reject) {
      var query = {};
      var sort = {};

      if (category) {
        query = { category: category };
      }

      if (sortBy) {
        if (sortBy === 'name') {
          sort[sortBy] = 'asc';
        }
        else {
          sort[sortBy] = 'desc';
        }
      }
      else {
        sort = { createdOn: 'desc' }
      }

      Recipe.paginate(query, { page: page || 1, limit: 8, sort: sort }, function(err, recipes) {
        if (err) {
          reject('Failed to get all recipes: ' + err);
          return;
        }

        if (!recipes) {
          reject('No recipes found int DB: ' + err);
          return;
        }

        recipes.category = category || "";
        recipes.sortBy = sortBy || "";

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

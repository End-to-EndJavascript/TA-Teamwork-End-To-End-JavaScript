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
          console.log('Failed to create recipe: ' + err);
          return;
        }

        if (!dbRecipe) {
          console.log('Recipe could not be saved in database!');
          return;
        }

        Recipe.populate(dbRecipe, {
          path: 'ingredients',
          populate: { path: 'ingredients' }
        }, function(err, res){
          for (var i = 0; i < res.ingredients.length; i++) {
            var currentIngredient = res.ingredients[i];

            dbRecipe.calories += currentIngredient.calories * (res.quantity[i] / 100);
            dbRecipe.proteins += currentIngredient.proteins * (res.quantity[i] / 100);
            dbRecipe.carbohydrates += currentIngredient.carbohydrates * (res.quantity[i] / 100);
            dbRecipe.fats += currentIngredient.fats * (res.quantity[i] / 100);
          };

          Recipe.update({_id: dbRecipe._id}, dbRecipe, {upsert: true}, function(){});
        });

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
      Recipe.findOne({_id: id}).populate({
        path: 'ingredients',
        populate: { path: 'ingredients' }
      }).exec(function(err, recipe) {

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

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
          }

          dbRecipe.calories = dbRecipe.calories.toFixed(2);
          dbRecipe.proteins = dbRecipe.proteins.toFixed(2);
          dbRecipe.carbohydrates = dbRecipe.carbohydrates.toFixed(2);
          dbRecipe.fats = dbRecipe.fats.toFixed(2);

          Recipe.update({_id: dbRecipe._id}, dbRecipe, {upsert: true}, function(){});
        });

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

              resolve({ recipes: recipes, pages: Math.ceil(count / take) });
            });
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

        if (!recipe) {
          reject('Recipe not found: ' + err);
        }

        resolve(recipe);
      });
    });

    return promise;
  }
};

'use strict';

var mongoose = require('mongoose');
var mongoosePaginate = require('mongoose-paginate');

module.exports = (function() {
  var recipeSchema = mongoose.Schema({
    name: { type: String, required: true },
    createdOn: { type: Date, default: Date.now },
    imageUrl: { type: String },
    howToPrepare: { type: String, required: true },
    category: { type: String, required: true },
    calories: { type: Number, default: 0 },
    proteins: { type: Number, default: 0 },
    carbohydrates: { type: Number, default: 0 },
    fats: { type: Number, default: 0 },
    ingredients: [] // Schema.Ingredients,
  });

  recipeSchema.plugin(mongoosePaginate);

  mongoose.model('Recipe', recipeSchema);
}());

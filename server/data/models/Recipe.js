'use strict';

var mongoose = require('mongoose');
var ProductSchema = require('mongoose').model('Product').schema;

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
    ingredients: [{type: mongoose.Schema.Types.ObjectId, ref: 'Product'}],
    quantity: [Number]
  });

  mongoose.model('Recipe', recipeSchema);
}());

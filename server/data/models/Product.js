'use strict';

var mongoose = require('mongoose');

module.exports = (function() {
  var productSchema = mongoose.Schema({
    name: { type: String, required: true, unique: true, lowercase: true },
    category: { type: String, required: true, lowercase: true },
    proteins: { type: Number, required: true },
    carbohydrates: { type: Number, required: true },
    fats: { type: Number, required: true },
    calories: { type: Number, required: true }
  });

  mongoose.model('Product', productSchema);
}());

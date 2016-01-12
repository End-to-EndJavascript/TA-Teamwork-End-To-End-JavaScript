var users = require('./users-controller');
var products = require('./products-controller');
var recipes = require('./recipes-controller');
var admin = require('./admin-controller');

module.exports = {
  users: users,
  products: products,
  recipes: recipes,
  admin: admin
};

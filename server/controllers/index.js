var main = require('./main-controller');
var users = require('./users-controller');
var products = require('./products-controller');
var recipes = require('./recipes-controller');
var admin = require('./admin-controller');

module.exports = {
  main: main,
  users: users,
  products: products,
  recipes: recipes,
  admin: admin
};

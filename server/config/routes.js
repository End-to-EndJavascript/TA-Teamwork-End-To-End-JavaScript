'use strict';

var controllers = require('../controllers');

module.exports = function(app) {
  app.get('/register', controllers.users.getRegister);
  app.post('/register', controllers.users.postRegister);

  app.get('/products', controllers.products.getAllProducts);
  app.get('/products/add', controllers.products.getAddProduct);
  app.post('/products/add', controllers.products.postAddProduct);

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('*', function(req, res) {
    res.render('index');
  });
};

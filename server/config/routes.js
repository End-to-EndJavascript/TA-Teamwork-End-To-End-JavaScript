'use strict';

var auth = require('./auth'),
  controllers = require('../controllers'),
  multer = require('multer');

var storage = multer.diskStorage({
  destination: 'public/images/users',
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + req.body.username)
  }
});

var upload = multer({storage: storage});

module.exports = function (app) {
  app.get('/register', controllers.users.getRegister);
  app.post('/register', upload.single('image'), controllers.users.postRegister);

  app.get('/login', controllers.users.getLogin);
  app.post('/login', auth.login);
  app.get('/logout', auth.isAuthenticated, auth.logout);

  app.get('/products', controllers.products.getAllProducts);
  app.get('/products/add', auth.isAuthenticated, controllers.products.getAddProduct);
  app.post('/products/add', auth.isAuthenticated, controllers.products.postAddProduct);
  app.put('/products/:id', controllers.products.updateProduct);

  app.get('/recipes', controllers.recipes.getAllRecipes);
  app.get('/recipes/add', auth.isAuthenticated, controllers.recipes.getAddNewRecipe);
  app.post('/recipes/add', auth.isAuthenticated, controllers.recipes.postAddNewRecipe);
  app.get('/recipes/:id', controllers.recipes.getRecipeDetails);

  app.get('/profile', auth.isAuthenticated, controllers.users.getProfile);
  app.get('/profile/edit', auth.isAuthenticated, controllers.users.getEditProfile);
  app.put('/profile/edit', auth.isAuthenticated, controllers.users.updateProfile);
  app.get('/profile/edit/avatar', auth.isAuthenticated, controllers.users.getEditAvatar);
  app.post('/profile/edit/avatar', auth.isAuthenticated, upload.single('image'), controllers.users.updateAvatar);

  app.get('/unauthorized', controllers.main.getUnauthorized);

  app.get('/admin/users', auth.isAdmin, controllers.admin.getUsers);
  app.post('/admin/users/deleteUser', auth.isAdmin, controllers.admin.deleteUser);

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('*', function (req, res) {
    res.render('index');
  });
};

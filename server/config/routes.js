'use strict';

var auth = require('./auth'),
  controllers = require('../controllers');

module.exports = function(app) {
  app.get('/register', controllers.users.getRegister);
  app.post('/register', controllers.users.postRegister);

  app.get('/login', controllers.users.getLogin);
  app.post('/login', auth.login);
  app.get('/logout', auth.isAuthenticated, auth.logout);

  app.get('/profile', controllers.users.getProfile);

  app.get('/profile/edit', controllers.users.getEditProfile);
  app.put('/profile/edit', controllers.users.updateProfile);

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('*', function(req, res) {
    res.render('index');
  });
};

'use strict';

var express = require('express'),
  bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  passport = require('passport');

var breadcrumbs = require('../middlewares/breadcrumps'),
  currentUser = require('../middlewares/current-user'),
  errorMessage = require('../middlewares/error-message');

module.exports = function(app, config) {
  app.set('view engine', 'jade');
  app.set('views', config.rootPath + '/server/views');
  app.use(express.static(config.rootPath + '/public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(cookieParser());
  app.use(session({
    secret: 'javascript-end-to-end-applications',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(breadcrumbs(app));
  app.use(currentUser(app));
  app.use(errorMessage(app));
};

'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function (app, config) {
  app.set('view engine', 'jade');
  app.set('views', config.rootPath + '/server/views');
  app.use(express.static(config.rootPath + '/public'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(cookieParser());
  app.use(session({
    secret: 'javascript-end-to-end-applications',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());
  app.use(function (req, res, next) {
    if (req.user) {
      app.locals.currentUser = req.user;
    } else {
      app.locals.currentUser = undefined;
    }

    next();
  });
  app.use(function (req, res, next) {
    if (req.session.error) {
      var message = req.session.error;
      req.session.error = undefined;
      app.locals.errorMessage = message;
    } else {
      app.locals.errorMessage = undefined;
    }

    next();
  });
};

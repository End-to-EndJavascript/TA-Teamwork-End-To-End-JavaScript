'use strict';

var url = require('url');

module.exports = function(app) {
  return function(req, res, next) {
    var pathname = url.parse(req.url).pathname;
    var currUrl = '';

    app.locals.breadcrumbs = pathname
      .split('/')
      .filter(function(item) {
        return item !== '';
      })
      .map(function(item) {
        currUrl += '/' + item;
        return { name: item, url: currUrl };
      });

    next();
  };
};

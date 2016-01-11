'use strict';

module.exports = function(app) {
  return function breadcrumbs(req, res, next) {
    var url = '';

    app.locals.breadcrumbs = req.url
      .split('/')
      .filter(function(item) {
        return item !== '';
      })
      .map(function(item) {
        url += '/' + item;
        return { name: item, url: url };
      });

    next();
  };
};

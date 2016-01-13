'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    if (req.session.error) {
      var message = req.session.error;
      req.session.error = undefined;
      app.locals.errorMessage = message;
    } else {
      app.locals.errorMessage = undefined;
    }

    next();
  };
};

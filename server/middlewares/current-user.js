'use strict';

module.exports = function(app) {
  return function(req, res, next) {
    app.locals.currentUser = req.user;

    if (req.user) {
      app.locals.isAdmin = req.user.isAdmin;
    }
    
    next();
  };
};

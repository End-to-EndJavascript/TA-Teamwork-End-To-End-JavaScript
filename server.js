'use strict';

var express = require('express');

var env = process.env.NODE_ENV || 'development';
var config = require('./server/config/config')[env];
var app = express();

require('./server/config/express')(app, config);
require('./server/config/mongoose')(config);
require('./server/config/routes')(app);
require('./server/config/passport')();

app.listen(config.port, function() {
  console.log('Server running at http://localhost:' + config.port);
});

'use strict';

/**
 * Main application file
 */


/***
 * Set default node environment to development
 */
process.env.NODE_ENV = process.env.NODE_ENV || 'development';


/**
 * Dependencies
 */
var express = require('express'),
  config = require('./config/environment/index'),
  Worker = require('./worker/worker');


/**
 * Setup server
 */
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);

/**
 * Setup models
 */
var models = require('./models/index');

/**
 * Setup routes
 */
var routes = require('./routes/index')(app);


/**
 * Start server
 */
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));

  console.log('Connecting worker.');
  var worker = new Worker({},function(err){
    if (err) {
      console.log('err', err);
    } else {
      console.log('Starting worker.');
      worker.start();
    }
  });

});

// Expose app
module.exports = app;

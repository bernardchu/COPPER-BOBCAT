var passport = require('passport');
var authController = require('./authController.js');

/**
	* @param {function} app - app is the argument passed in from server.js
	* Catches routes, passport authenticated credentials with github, and delegates request to controller
	*/
module.exports = function (app) {
  app.get('/github/callback', passport.authenticate('github'), authController.authenticateCB);
};
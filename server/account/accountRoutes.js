var ensureAuthenticated = require('../helpers/ensureAuthenticated.js')
var accountController = require('./accountController.js');

/**
	* @param {function} app - app is the argument passed in from server.js
	* Catches routes, runs the ensureAuthenticated function, and delegates request to controller
	*/
module.exports = function (app) {
  app.get('/', ensureAuthenticated, accountController.account);
  app.get('/logout', accountController.logout);

};
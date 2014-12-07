var ensureAuthenticated = require('../helpers/ensureAuthenticated.js')
var accountController = require('./accountController.js');


module.exports = function (app) {
  app.get('/', ensureAuthenticated, accountController.account);
  app.get('/logout', ensureAuthenticated, accountController.logout);

};
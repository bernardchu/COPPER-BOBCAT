var passport = require('passport');
var authController = require('./authController.js');

module.exports = function (app) {
  app.get('/github', passport.authenticate('github'), authController.authenticate);
  app.get('/github/callback', passport.authenticate('github'), authController.authenticateCB);

};
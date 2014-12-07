var questionController = require('./questionController.js');
var ensureAuthenticated = require('../helpers/ensureAuthenticated.js')


module.exports = function (app) {
  app.get('/', ensureAuthenticated, questionController.getQuestions);
};
var questionController = require('./questionController.js');
var ensureAuthenticated = require('../helpers/ensureAuthenticated.js')

/**
	* @param {function} app - app is the argument passed in from server.js
	* Catches '/' route, runs the ensureAuthenticated function, and delegates request to controller
	*/
module.exports = function (app) {
  app.get('/', ensureAuthenticated,  questionController.getQuestions);

  app.post('/addQuestion',  questionController.addQuestion);
  app.post('/delete',  questionController.deleteQuestion);

};//ensureAuthenticated,

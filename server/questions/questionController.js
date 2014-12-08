
var db = require('../db/indexDB.js');

/**
  * @param {object} getQuestions - check the getQuestions() method in db/indexDB.js 
  */
module.exports = {
	getQuestions: function(req, res) {
	  db.queryDb.getQuestions(function(data) {
	    if(data) {
	      res.json(data);
	    }
	  });
	}, 

  addQuestion : function(req, res){
    db.updateDb.addQuestion(req.body.text, req.body.answer, req.body.difficulty);
  },

  deleteQuestion : function(req, res){
    db.updateDb.deleteById(req.body.id, function(data) {

    });
  }
}
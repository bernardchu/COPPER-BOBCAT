
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
    db.updateDb.addQuestion(req.body.text, req.body.answer, req.body.difficulty, function(){
      //send response
      res.send(201);
    });
  },

  modifyQuestion : function(req, res){
    console.log(req.body);
    db.updateDb.modifyQuestion(req.body.id, req.body.field, req.body.value, function(){
      //send response
      res.send(201);
    });
  },

  deleteQuestion : function(req, res){
    db.updateDb.deleteById(req.body.id, function() {
      //send response
      res.send(201);
    });
  }
}
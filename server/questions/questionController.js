
var db = require('../db/indexDB.js');

module.exports = {
	getQuestions: function(req, res) {
		  db.queryDb.getQuestions(function(data) {
		    if(data) {
		      console.log(data);
		      res.json(data);
		    }
		  });
	}
}
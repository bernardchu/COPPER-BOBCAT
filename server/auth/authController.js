var db = require('../db/indexDB.js');


module.exports = {
  authenticate: function(req, res) {
    
  },

  authenticateCB: function(req, res) {
    res.redirect('/account');
  }
}

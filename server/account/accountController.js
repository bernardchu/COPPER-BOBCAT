var db = require('../db/indexDB.js');

/**
  * @param {object} logout - redirect to root and remove session 
  */
module.exports = {
  logout: function(req, res) {
    req.session.destroy(function() {
      res.redirect('/');
    });
  }
}


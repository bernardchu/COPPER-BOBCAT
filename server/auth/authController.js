var db = require('../db/indexDB.js');

/**
  * @param {object} authenticate - empty placeholder, no need for anything here yet.
  * @param {object} authenticateCB - will be invoked after returning from Github authentication.
  * If a user is authenticated but does not exist in the DB, the user will be added
  * Session will be created and user will be redirected to root
  * Check the getUsers() method from /db/indexDB.js
  */
module.exports = {
  authenticate: function(req, res) {
    
  },

  authenticateCB: function(req, res) {
    db.queryDb.getUsers(function (user) {
          if(!user) {
            db.updateDb.addUser({username: req.user.username, displayName: req.user.displayName, gitId: req.user.id});
          }
          req.session.regenerate(function() {
            req.session.user = req.user;
          });
          res.redirect('/');
      }, {where: {gitId: req.user.id}});
  }
}

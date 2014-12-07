var db = require('../db/indexDB.js');


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

var express = require('express');
var db = require('./db/indexDB.js');
var session = require('express-session');
var config = require('./auth/oauth.js');
var ensureAuthenticated = require('./auth/ensureAuthenticated.js')
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var router = require('./routes.js');
var app = express();
// passport boilerplate code - serialize and deserialize allows user data to be stored in a session.
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

// passport boilerplate code - define behavior for each Oauth provider.
passport.use(new GithubStrategy(
  {
    clientID: config.github.clientID,
    clientSecret: config.github.clientSecret,
    callbackURL: config.github.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
      process.nextTick(function () {
      return done(null, profile);
    });
  }
));

/*future modularizing*/
// app.use("/questions", router);

// authentication middleware
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/account', ensureAuthenticated, function(req, res){
  console.log('authenticated');
  
  db.queryDb.getUsers(function (user) {
    if(!user) {
      db.updateDb.addUser({username: req.user.username, displayName: req.user.displayName, gitId: req.user.id});
    }
    console.log(user);
    req.session.regenerate(function() {
      req.session.user = req.user;
    });
    res.redirect('/');
  }
  , {where: {gitId: req.user.id}});
  // res.json({ user: req.user });
});
app.get('/auth/github',
  passport.authenticate('github'),
  function(req, res){    
  }
);
app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect('/account');
  }
);
app.get('/logout', function(req, res){
  console.log(req.session);
  req.session.destroy(function() {
      res.redirect('/');
  });
});



//handling requests and DB queries
//ensureAuthenticated, 
app.get('/questions', function(req, res) {
// app.get('/questions', ensureAuthenticated, function(req, res) {

  db.queryDb.getQuestions(function(data) {
    if(data) {
      console.log(data);
      res.json(data);
    }
  }) //add in id later
  
});


// start server
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '../../public'));

app.listen(port);
module.exports = app;

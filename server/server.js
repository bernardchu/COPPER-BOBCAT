var express = require('express');
var db = require('./db/indexDB.js');
var app = express();
var config = require('./oauth.js');
var session = require('express-session');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
var router = require('./routes.js');
var config = require('./oauth.js');
var passport = require('passport');

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



app.use("/questions", router);

// authentication middleware
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/account', ensureAuthenticated, function(req, res){
  console.log('authenticated');
  res.json({ user: req.user });
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
  req.logout();
  res.redirect('/');
});

// helper function to test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('not authenticated!');
  res.redirect('/');
}

// REMOVE ME!------------------------
// hard-coded server response with dummy data
var dummyData = [
  {question:"\nfunction add(a, b) {\n return a + b \n} \nadd(12, 3)", answer: '15'},
  {question:"\nfunction subtract(a, b) {\n return a - b \n} \nsubtract(12, 3)", answer: '9'},
  {question:"\nfunction divide(a, b) {\n return a / b \n} \ndivide(12, 3)", answer: '4'}
];
app.get('/questions', function(req, res) {
  res.json(dummyData);
});

// start server
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '../../public'));

app.listen(port);

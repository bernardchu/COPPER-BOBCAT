var express = require('express');
var db = require('./db/indexDB.js');
var app = express();
var config = require('./oauth.js');
var session = require('express-session');
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

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

// test authentication
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  console.log('not authenticated!');
  res.redirect('/');
}

// start server
var port = process.env.PORT || 3000;
app.use(express.static('./public'));

app.listen(port);

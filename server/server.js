var express = require('express');
var db = require('./db/indexDB.js');
var app = express();
var config = require('./oauth.js');
var session = require('express-session');
var passport = require('passport');
var GoogleStrategy = require('passport-google').Strategy;

// serialize and deserialize
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
  returnURL: config.google.returnURL,
    realm: config.google.realm
  },
  function(identifier, profile, done) {
    process.nextTick(function () {
      profile.identifier = identifier;
      return done(null, profile);
    });
  }
));

<<<<<<< HEAD

// authentication middleware
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());

// authentication routes
app.get('/account', ensureAuthenticated, function(req, res){
  console.log('authenticated');
  res.json({ user: req.user });
});
app.get('/auth/google',
  passport.authenticate('google'),
  function(req, res){    
  }
);
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
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
app.use(express.static(__dirname + '../../public'));
=======
>>>>>>> 9bb3d5397c88c694130054462a12154e74962572

var port = process.env.PORT || 3000;
app.use(express.static('./public'));

app.listen(port);

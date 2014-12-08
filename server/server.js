var express = require('express');
var session = require('express-session');
var config = require('./helpers/oauth.js');
var passport = require('passport');
var parser = require('body-parser');
var GithubStrategy = require('passport-github').Strategy;
var app = express();


/**
 * Passport boilerplate code - serialize and deserialize allows user data to be stored in a session.
 */
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

/**
  * Passport boilerplate code - define behavior for each Oauth provider.
  */
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

/** 
  * Set express routers
  */
var questionRouter = express.Router();
var authRouter = express.Router();
var accountRouter = express.Router();


/** 
  * Create session
  * Authentication middleware
  */
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());

/** 
  * Body Parser
  */

app.use(parser.urlencoded({extended : true}));
app.use(parser.json());

/** 
  * Assign routes to appropriate router
  */
app.use('/api/questions', questionRouter); 
app.use('/auth', authRouter); 
app.use('/api/account', accountRouter);


require('./questions/questionRoutes.js')(questionRouter);
require('./auth/authRoutes.js')(authRouter);
require('./account/accountRoutes.js')(accountRouter);

var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '../../public'));

app.listen(port);
module.exports = app;

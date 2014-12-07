var express = require('express');
// var db = require('./db/indexDB.js');
var session = require('express-session');
var config = require('./helpers/oauth.js');
// var ensureAuthenticated = require('./helpers/ensureAuthenticated.js')
var passport = require('passport');
var GithubStrategy = require('passport-github').Strategy;
// var router = require('./routes.js');
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

//set routers
var questionRouter = express.Router();
var authRouter = express.Router();
var accountRouter = express.Router();


// authentication middleware
app.use(session({ secret: 'my_precious' }));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/questions', questionRouter); 
app.use('/auth', authRouter); 
app.use('/api/account', accountRouter);

require('./questions/questionRoutes.js')(questionRouter);
require('./auth/authRoutes.js')(authRouter);
require('./account/accountRoutes.js')(accountRouter);


// start server
var port = process.env.PORT || 3000;
app.use(express.static(__dirname + '../../public'));

app.listen(port);
module.exports = app;

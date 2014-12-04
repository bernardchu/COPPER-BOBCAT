var express = require('express');
var app = express();
var config = require('./oauth.js')
var passport = require('passport')
var GoogleStrategy = require('passport-google').Strategy;



var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '../../public'));


app.listen(port);

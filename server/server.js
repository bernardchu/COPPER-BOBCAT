var express = require('express');
var Sequelize = require('sequelize')
  , sequelize = new Sequelize('copperdb', 'copperdb', 'Copper2014!');



// var User = sequelize.define('User', {
//   username: Sequelize.STRING,
//   birthday: Sequelize.DATE
// });

// return sequelize.sync().then(function() {
//   return User.create({
//     username: 'sdepold',
//     birthday: new Date(1986, 06, 28)
//   }).then(function(sdepold) {
//     console.log(sdepold.values)
//   });
// });



var app = express();

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + '../../public'));


app.listen(port);
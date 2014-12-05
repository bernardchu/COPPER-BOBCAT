var Sequelize = require('Sequelize');

var sequelize = new Sequelize('copperdb', 'bcb996835c867c', 'ad7bf91f', {
  host: 'us-cdbr-azure-west-a.cloudapp.net'
});



var User = sequelize.define('user', {
  username: Sequelize.STRING
});

var Category = sequelize.define('category', {
  category: Sequelize.STRING
});

var Question = sequelize.define('question', {
  question: Sequelize.STRING,
  answer: Sequelize.STRING,
  difficulty: Sequelize.INTEGER
});

User.hasMany(Question);
Category.hasMany(Question);


//Create tables if not exist 
User.sync().then(function(){
  console.log("Created User");
});
Category.sync().then(function(){
  console.log("Created Category");
});
Question.sync().then(function(){
  console.log("Created Question");
});

exports.User = User;
exports.Category = Category;
exports.Question = Question;

/************************************ CAUTION ************************************/
/* Do this with everything else commented out to drop all tables 
* sequelize.sync({force: true}).then(function(){
*   console.log("successfully synced");
* }, function(){
*   console.log("failed to sync");
* });
*/


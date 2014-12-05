var Sequelize = require('Sequelize');

var sequelize = new Sequelize('copperdb', 'bcb996835c867c', 'ad7bf91f', {
  logging: console.log
});
var sequelize = new Sequelize('copperdb', 'bcb996835c867c', 'ad7bf91f');
var sequelize = new Sequelize('CB', 'root', '');

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

User.hasMany(Question, { as: 'User_Question', foreignKey: 'question_Id' });
Category.hasMany(Question, { as: 'Category_Question', foreignKey: 'question_Id' });

// var newQueston = Question.build({
//   question: 'Rick',
//   answer: , 
//   difficulty: ''
// });

// newQueston.save().success(function() {
//   console.log('Question Added');
// });

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
>>>>>>> writing db setup

exports.User = User;
exports.Category = Category;
exports.Question = Question;

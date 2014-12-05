var Sequelize = require('Sequelize');

var sequelize = new Sequelize('copperdb', 'bcb996835c867c', 'ad7bf91f', {
  host: 'us-cdbr-azure-west-a.cloudapp.net'
});

// var User = sequelize.define('user', {
//   username: Sequelize.STRING
// });

// var Category = sequelize.define('category', {
//   category: Sequelize.STRING
// });

// var Question = sequelize.define('question', {
//   question: Sequelize.STRING,
//   answer: Sequelize.STRING,
//   difficulty: Sequelize.INTEGER
// });

// User.hasMany(Question);
// Category.hasMany(Question);

// User.sync();
// Category.sync();
// Question.sync();

sequelize.sync({force: true});

// exports.User = User;
// exports.Category = Category;
// exports.Question = Question;
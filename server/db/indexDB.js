var Sequelize = require('Sequelize');

function runSql(){

  //MySql Connection
  var sequelize = new Sequelize('copperdb', 'bcb996835c867c', 'ad7bf91f', {
    host: 'us-cdbr-azure-west-a.cloudapp.net'
  });


  //Define MySql Tables
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

  // var newQueston = Question.build({
  //   question: 'var a = [1, 2, 3].splice(0,2);\n a = ?',
  //   answer: '[1, 2]', 
  //   difficulty: '5'
  // });

  // newQueston.save().success(function() {
  //   console.log('Question Added');
  // });


  var newCategory = Category.build({
    category: 'Functions',
  });

  newCategory.save().success(function() {
    console.log('Category Added');
  }).error(function(err){
    console.error("There was an error: " + err);
  });


  // query persistence for instances
  var quests = Question.all()
    .error(function(err) {
      // error callback
    })
    .success(function() {
      // success callback
    });

  // 
  //{question:"\nfunction add(a, b) {\n return a + b \n} \nadd(12, 3)", answer: '15'},
  //{question:"\nfunction subtract(a, b) {\n return a - b \n} \nsubtract(12, 3)", answer: '9'},
  //{question:"\nfunction divide(a, b) {\n return a / b \n} \ndivide(12, 3)", answer: '4'}
  // 
  // 

  // Create tables if not exist 
  // User.sync().then(function(){
  //   console.log("Created User");
  // });
  // Category.sync().then(function(){
  //   console.log("Created Category");
  // });
  // Question.sync().then(function(){
  //   console.log("Created Question");
  // });


  //Make objects available externally
  exports.User = User;
  exports.Category = Category;
  exports.Question = Question;


};

//runSql();


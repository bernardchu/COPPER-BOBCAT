var Sequelize = require('Sequelize');

  //MySql Connection
  var sequelize = new Sequelize('copperdb', 'bcb996835c867c', 'ad7bf91f', {
    host: 'us-cdbr-azure-west-a.cloudapp.net'
  });

  /**
   * Defines the sequelize User model
   * @type {model}
   */
  var User = sequelize.define('user', {
    username: Sequelize.STRING, 
    displayName: Sequelize.STRING,
    gitId : Sequelize.STRING
  });

  /**
   * Defines the sequelze Category model
   * @type {model}
   */
  var Category = sequelize.define('category', {
    categoryName: Sequelize.STRING,
    categorySlug: Sequelize.STRING
  });

  /**
   * Defines the sequelize Question model
   * @type {model}
   */
  var Question = sequelize.define('question', {
    question: Sequelize.STRING,
    answer: Sequelize.STRING,
    difficulty: Sequelize.INTEGER
  });


Category.hasMany(Question);
Question.hasMany(Category);


/******************CAUTION*********************
* This will drop all tables and recreate them
***********************************************/
//sequelize.sync({force: true});


/**
 * Queries DB for all or an optional query
 * @param {object} model - The sequelize model.
 * @param {function} callback - a callback to recieve the returned data from the database.
 */
function modelQuery(Model, callback, query){
  if(query){
    Model.find(query)
    .error(function(err) {
      console.error('There was an error retrieving users: ' + err);
    })
    .success(function(data) {
      callback(data);
    });
  }else{
    Model.all()
    .error(function(err) {
      console.error('There was an error retrieving users: ' + err);
    })
    .success(function(data) {
      callback(data);
    });
  }; 
};


/**
 * A colleciton of Database Querying Functions For Getting Data
 * The query must be an object in the sequelize format.  
 * Example: ' {where: {name: 'John' } }' 
 * @type {object}
 * @param {function} callback - A callback to recieve the returned data from the database.
 * @param {object} query - A query in the sequelize format
 */

var queryDb = {

/**
 * Gets all users, with optional query param to get indidividual users
 * @type {function}
 * @param {function} callback - The sequelize model.
 * @param {object} query - A query in the sequelize format.  
 */

  getUsers : function(callback, query){
    modelQuery(User, callback, query);
  }, 

/**
 * Gets all questions, with optional query param to get indidividual question
 * @type {function}
 * @param {function} callback - The sequelize model.
 * @param {object} query - A query in the sequelize format.  
 */
  getQuestions : function(callback, query){
    modelQuery(Question, callback, query);
  },

/**
 * Gets all categories, with optional query param to get indidividual category
 * @type {function}
 * @param {function} callback - The sequelize model.
 * @param {object} query - A query in the sequelize format.  
 */ 
  getCategories : function(callback, query){
    modelQuery(Category, callback, query);
  }
};


/**
 * A collection of Database Querying Functions For Creating and Modifying Data
 * Each function takes arguments to add or modify on the database
 * Errors or Success will be logged in the node console
 * @type  {object}
 */
var updateDb = {


/**
 * A function to add a user to the datbase
 * @type {function}
 * @param {string} username - Username returned by gitHub authentication
 * @param {string} displayName - Display Name returned by gitHub authentication
 * @param {string} gitId - Git ID returned by gitHub authentication 
 */

  addUser : function(username, displayName, gitId){

    var newUser = User.build({
      username: username,
      displayName: displayName,
      gitId : gitId
    });

    newUser.save().success(function() {
      console.log('User Added');
    }).error(function(err){
      console.log('There was an error creating: ' + err);
    });

  },

/**
 * A function to add a user to the datbase
 * @type {function}
 * @param {string} question - the stringified question to be saved
 * @param {string} answer  - the stringified answer to the question
 * @param {int} difficulty - guestion difficulty between 0 - 10
 */
  addQuestion : function(question, answer, difficulty, callback){
    var newQuestion = Question.build({
      question: question,
      answer: answer,
      difficulty : difficulty
    });

    newQuestion.save().success(function() {
      console.log('Question Added');
      callback();
    }).error(function(err){
      console.log('There was an error creating: ' + err);
    });

  },


/**
 * A function to add a user to the datbase
 * @type {function}
 * @param {string} categoryName - the name of the category.  A category slug will also be created with spaces replaced by '-'. 
 */
  addCategory : function(categoryName){
    var newCategory = Category.build({
      categoryName : categoryName,
      categorySlug : categoryName.toLowerCase().replace(' ', '-')
    });

    newCategory.save().success(function() {
      console.log('Category Added');
    }).error(function(err){
      console.log('There was an error creating: ' + err);
    });
  }, 


 //Add modification function here
  modifyUser : function(){

  },

  modifyQuestion : function(id, field, value, callback){
    Question.find({where: {id: id}})
    .error(function(err) {
      console.error('There was an error retrieving users: ' + err);
    })
    .success(function(quest) {
      quest[field] = value;
      quest.save([field]).success(function() {
       console.log('question updated');
       callback();
      })
    });
  },

  modifyCategory : function(){

  },

  deleteById : function(id, callback){


    Question.find({where: {id: id}})
    .error(function(err) {
      console.error('There was an error retrieving users: ' + err);
    })
    .success(function(data) {
      data.destroy().success(function() {
        console.log('deleted');
        callback();
      });
    });
  }


};


/********************************************************************
* Export items for use in app
*********************************************************************/
exports.queryDb = queryDb;
exports.updateDb = updateDb;



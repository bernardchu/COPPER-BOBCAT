angular.module('copperBobcat.questions', [])
.controller('QuestionsController', function ($scope, Questions, $http) {

  angular.extend($scope, Questions);

}).factory('Questions', function() {
  //Linked list?
  var questions = {};
  questions.list = [{question:"\nfunction add(a, b) {\n return a + b \n} \nadd(12, 3)", answer: '15'},
                    {question:"\nfunction subtract(a, b) {\n return a - b \n} \nsubtract(12, 3)", answer: '9'},
                    {question:"\nfunction divide(a, b) {\n return a / b \n} \ndivide(12, 3)", answer: '4'}];
  questions.index = 0;
  questions.isAnswered = false;
  
  questions.tap = function(){
    if(questions.isAnswered) {
      questions.isAnswered = false;
      questions.index += 1;
    } else {
      questions.isAnswered = true;
    }
  };

  return {
    questions: questions
  };

});
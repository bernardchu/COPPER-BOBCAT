angular.module('copperBobcat.questions', ['ngRoute'])
.controller('QuestionsController', function ($scope, Questions, $http) {

  angular.extend($scope, Questions);

}).factory('Questions', function() {
  //Linked list?
  var questions = [{question: "function add(a, b) {\n return a + b \n} \n add(12, 3)"}];
  var questionIndex = 0;
  var isAnswered = false;
  
  var tap = function(){
    if(isAnswered) {
      isAnswered = false;
      questionIndex += 1;
    } else {
      isAnswered = true;
    }
  };

  return {
    questions: questions,
    questionIndex: questionIndex, 
    isAnswered: isAnswered,
    addLink: addLink,
    tap: tap
  };

});
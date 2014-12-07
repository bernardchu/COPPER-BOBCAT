angular.module('copperBobcat.questions', [])
.controller('QuestionsController', function ($scope, Questions, $http, $state) {
  angular.extend($scope, Questions);

  Questions.getQuestions()
    .then(function(res) {
      if (res === 'Forbidden') {
        $state.go('login');
      }
      else {
        $scope.serverQuestions = res; 
      }
    });

  $scope.tap = function(){
    if($scope.questions.isAnswered) {
      $scope.questions.isAnswered = false;
      $scope.questions.index += 1;
      if ($scope.questions.index >= $scope.serverQuestions.length) {
        $state.go('finished');
      }
    } else {
      $scope.questions.isAnswered = true;
    }
  };
}).factory('Questions', function($http) {
  //Linked list?
  var questions = {};
  //Line break in questions is to fix uneven indenting in the pre tag
  //This is a hack ans should be removed eventually.
  // questions.list = [{question:"\nfunction add(a, b) {\n return a + b \n} \nadd(12, 3)", answer: '15'},
  //                   {question:"\nfunction subtract(a, b) {\n return a - b \n} \nsubtract(12, 3)", answer: '9'},
  //                   {question:"\nfunction divide(a, b) {\n return a / b \n} \ndivide(12, 3)", answer: '4'}];
  questions.index = 0;
  questions.isAnswered = false;
  

  var getQuestions = function() {
    return $http({
      method: 'GET',
      url: '/api/questions/'
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    questions: questions,
    getQuestions: getQuestions
  };

});
angular.module('copperBobcat.questions', [])
.controller('QuestionsController', function ($scope, Questions, $http, $state, $mdDialog) {
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

  $scope.alert = '';
  $scope.answerDisplay = '';
  $scope.userAnswer = '';

  $scope.showAlert = function(ev, userAnswer) {
    $scope.answerDisplay = 'The answer is: ' + $scope.serverQuestions[$scope.questions.index].answer;
      
    if(userAnswer === $scope.serverQuestions[$scope.questions.index].answer.toString()) {
      $scope.answerDisplay += ' you got it RIGHT!';
    } else {
      $scope.answerDisplay += ' you got it WRONG!';
    }

    $scope.userAnswer = '';
    $scope.questions.isAnswered = true;

    $mdDialog.show(
      $mdDialog.alert()
        .title('This is an alert title')
        .content($scope.answerDisplay)
        .ok('Next Question')
        .targetEvent(ev)

    ).then(function(){
      $scope.questions.isAnswered = false;     
    });
  };

  $scope.flip = function(dir){
    if(dir === 'left') {
      $scope.questions.index -= 1;
    } else if(dir === 'right') {
      $scope.questions.index += 1;
    }
  }

  $scope.tap = function(userAnswer){
    if($scope.questions.isAnswered) {
      $scope.questions.isAnswered = false;
      $scope.questions.index += 1;
      if ($scope.questions.index >= $scope.serverQuestions.length) {
        $state.go('finished');
      }
    } else {
      $scope.answerDisplay = 'The answer is: ' + $scope.serverQuestions[$scope.questions.index].answer;
      
      if(userAnswer === $scope.serverQuestions[$scope.questions.index].answer.toString()) {
        $scope.answerDisplay += ' you got it RIGHT!';
      } else {
        $scope.answerDisplay += ' you got it WRONG!';
      }

      $scope.userAnswer = '';
      $scope.questions.isAnswered = true;
    }
  };
}).factory('Questions', function($http) {
  
  var questions = {};
  
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
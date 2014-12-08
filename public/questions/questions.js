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

  $scope.showAlert = function(ev) {
    $scope.answerDisplay = 'The answer is: ' + $scope.serverQuestions[$scope.questions.index].answer;
      
    if(this.userAnswer === $scope.serverQuestions[$scope.questions.index].answer.toString()) {
      $scope.answerDisplay += ' you got it RIGHT!';
    } else {
      $scope.answerDisplay += ' you got it WRONG!';
    }

    this.userAnswer = '';

    $mdDialog.show(
      $mdDialog.alert()
        .title('Wow you answered a question!')
        .content($scope.answerDisplay)
        .ok('Next Question')
        .targetEvent(ev)
    )
  };

  $scope.flip = function(dir){
    if(dir === 'left') {
      if($scope.questions.index === 0) {
        $scope.questions.index = $scope.serverQuestions.length - 1;
      } else {
        $scope.questions.index -= 1;  
      }
    } else if(dir === 'right') {
      if($scope.questions.index === $scope.serverQuestions.length - 1) {
        $scope.questions.index = 0;  
      } else {
        $scope.questions.index += 1;  
      }
      
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
    getQuestions: getQuestions,
    userAnswer: ''
  };

});
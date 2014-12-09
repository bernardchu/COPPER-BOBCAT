angular.module('copperBobcat.questions', [])
.controller('QuestionsController', function ($scope, Questions, $http, $state, $mdDialog) {
  angular.extend($scope, Questions);

  /*
    Here we're getting the questions from the database
  */
  Questions.getQuestions()
    .then(function(res) {
      if (res === 'Forbidden') {
        $state.go('login');
      }
      else {
        $scope.serverQuestions = res; 
      }
    });

  

  $scope.showAnswer = function(ev) {
    var that = this;

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
    ).then(function(){
      that.flip('right');
    })
  };

  /*
    This function flips between the questions.
  */
  $scope.flip = function(dir){
    if(dir === 'left') {
      if($scope.questions.index > 0) {
        $scope.questions.index -= 1;
      }
    } else if(dir === 'right') {
      if($scope.questions.index === $scope.serverQuestions.length - 1) {
        $scope.questions.index = 0;
        $state.go('finished');
      } else {
        $scope.questions.index += 1;  
      }
      
    }
  }
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
    userAnswer: '',
    answerDisplay: ''
  };

});
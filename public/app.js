var bobcatApp = angular.module('copperBobcat', [
  'ngRoute',
  'copperBobcat.questions'
]);

bobcatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'lib/questions/questions.html',
        controller: 'QuestionsController'
      })
  }]);

var bobcatApp = angular.module('copperBobcat', [
  'ui.router',
  'copperBobcat.questions'
]);

bobcatApp.config(
function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
    $stateProvider.
      state('question', {
      	url: '/',
        templateUrl: '/questions/questions.html',
        controller: 'QuestionsController'
      })
  });

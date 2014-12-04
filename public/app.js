var bobcatApp = angular.module('copperBobcat', [
  'ui.router',
  'copperBobcat.questions',
  'hljs'
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

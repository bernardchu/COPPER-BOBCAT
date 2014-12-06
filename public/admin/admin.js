angular.module('copperBobcat.admin', [])
.controller('AdminController', function ($scope, Admin, $http, $state) {
  angular.extend($scope, Admin);

   Admin.getQuestions()
    .then(function(questions) {
      $scope.adminData = questions;
    });

}).factory('Admin', function($http) {
  var getQuestions = function() {
    return $http({
      method: 'GET',
      url: '/questions'
    })
    .then(function(res){
      return res.data;
    });
  };

  return {
    getQuestions: getQuestions
  };

});
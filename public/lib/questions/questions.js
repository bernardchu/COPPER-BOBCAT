angular.module('bobcat.questions', ['ngRoute'])
.controller('LinksController', function ($scope, Questions, $http) {

  angular.extend($scope, Questions);

}).factory('Questions', function() {

  var links = [];

  var addLink = function(link){
    links.push({
      url: link,
      shortenedUrl: null,
      visitCount: 0
    });
  };

  var incrementCount = function(link){
    link.visitCount++;
  };

  return {
    links: links,
    addLink: addLink,
    incrementCount: incrementCount
  };

});
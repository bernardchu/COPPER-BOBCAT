var bobcatApp = angular.module('copperBobcat', [
  'ui.router',
  'copperBobcat.questions',
  'copperBobcat.admin',
  'hljs',
  'ngTouch',
  'ngMaterial',
  'mobile-angular-ui',
  'mobile-angular-ui.gestures',
  'datatables', 
  'xeditable'
]);

bobcatApp.config(
function($stateProvider, $urlRouterProvider) {
	$urlRouterProvider.otherwise('/');
    $stateProvider
      .state('question', {
      	url: '/',
        templateUrl: '/questions/questions.html',
        controller: 'QuestionsController'
      })
      .state('finished', {
        url: '/finished',
        templateUrl: '/questions/finished.html'
      })
      .state('login', {
        url: '/login',
        templateUrl: '/login/login.html'
      }).state('admin', {
        url: '/admin', 
        templateUrl: '/admin/admin.html',
        controller: 'AdminController'
      })

});

bobcatApp.directive('carousel', function(){
    return {
      restrict: 'C',
      //scope: {},
      controller: function($scope) {
        this.itemCount = 0;
        this.activeItem = null;

        this.addItem = function(){
          var newId = this.itemCount++;
          this.activeItem = this.itemCount == 1 ? newId : this.activeItem;
          return newId;
        };

        this.next = function(){
          this.activeItem = this.activeItem || 0;
          this.activeItem = this.activeItem == this.itemCount - 1 ? 0 : this.activeItem + 1;
        };

        this.prev = function(){
          this.activeItem = this.activeItem || 0;
          this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
        };
      }
    };
  });

bobcatApp.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    //scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();
      
      var zIndex = function(){
        var res = 0;
        if (id == carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(n, o){
        elem[0].style['z-index']=zIndex();
      });
      

      $drag.bind(elem, {
        constraint: { minY: 0, maxY: 0 },
        adaptTransform: function(t, dx, dy, x, y, x0, y0) {
          var maxAngle = 15;
          var velocity = 0.02;
          var r = t.getRotation();
          var newRot = r + Math.round(dx * velocity);
          newRot = Math.min(newRot, maxAngle);
          newRot = Math.max(newRot, -maxAngle);
          t.rotate(-r);
          t.rotate(newRot);
        },
        move: function(c){
          if(c.left >= c.width / 4 || c.left <= -(c.width / 4)) {
            elem.addClass('dismiss');  
          } else {
            elem.removeClass('dismiss');  
          }          
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(c, undo, reset) {
          console.log('firing end');
          elem.removeClass('dismiss');
          if(c.left >= c.width / 4) {
            scope.$apply(function() {
              scope.flip('left');
              carousel.prev();
            });
          } else if (c.left <= -(c.width / 4)) {
            scope.$apply(function() {
              scope.flip('right');
              carousel.next();
            });
          }
          reset();
        }
      });
    }
  };
});



//random name.
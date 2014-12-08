
angular.module('copperBobcat.admin', ['datatables'])
.controller('AdminController', function($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {
    $scope.reloadData = function() {
      console.log('reload');
        $scope.dtOptions.reloadData();
    };

    $scope.question = {};

    $scope.addQuestion = function(data) {

        $http({
            method: 'POST',
            url: '/api/questions/addQuestion',
            data: data
          })
          .then(function(res){
            $scope.dtOptions.reloadData(); 
          });
    };


    // $scope.editItem = function(id) {
    //     // Edit some data and call server to make changes...
    //     // Then reload the data so that DT is refreshed
    //     console.log('Edit item' + id);
        
    // };

    $scope.deleteItem = function(id) {
        // Delete some data and call server to make changes...
        // Then reload the data so that DT is refreshed
        console.log('Delete Item ' + id);

        $http({
            method: 'POST',
            url: '/api/questions/delete',
            data: {'id' : id}
          })
          .then(function(res){
            console.log(res);
            $scope.dtOptions.reloadData(); 
            $scope.$apply();
          });
    };

    $scope.dtOptions = DTOptionsBuilder.fromSource('/api/questions/')
      .withPaginationType('full_numbers')
      .withOption('createdRow', function(row, data, dataIndex){
        $compile(angular.element(row).contents())($scope);
    });

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('question').withTitle('Question'),
        DTColumnBuilder.newColumn('answer').withTitle('Answer'),
        DTColumnBuilder.newColumn('difficulty').withTitle('Difficulty'),
        DTColumnBuilder.newColumn('createdAt').withTitle('Created At'),
        DTColumnBuilder.newColumn('updatedAt').withTitle('Updated At'),
        DTColumnBuilder.newColumn('id').withTitle('Edit Options')
        .renderWith(function(data, type, full, meta) {
                return '<button class="btn btn-warning" ng-click="editItem('+ data +')">' +
                    '   <i class="fa fa-edit"></i>' +
                    '</button>&nbsp;' +
                    '<button class="btn btn-danger" ng-click="deleteItem('+ data +')">' +
                    '   <i class="fa fa-trash-o"></i>' +
                    '</button>';
            })
       //$scope.$apply()
    ];
});



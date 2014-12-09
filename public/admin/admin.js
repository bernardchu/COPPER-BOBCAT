
angular.module('copperBobcat.admin', ['datatables'])
.controller('AdminController', function($scope, $http, $compile, DTOptionsBuilder, DTColumnBuilder) {
    $scope.reloadData = function() {
      console.log('reload');
        $scope.dtOptions.reloadData();
    };

    //used for inline editing and question creation
    $scope.question = {};
    $scope.questionEdit = {};

    $scope.diffOptions = [0,1,2,3,4,5,6,7,8,9,10];

    $scope.getVal = function(data){
      console.log('fired');
    };

    $scope.addQuestion = function(data) {

        $http({
            method: 'POST',
            url: '/api/questions/addQuestion',
            data: data
          })
          .then(function(res){
            $scope.question = {};
            $scope.dtOptions.reloadData(); 
          });
    };


    $scope.updateEntry = function(userInput) {

        var cols = ['id', 'question', 'answer', 'difficulty'];
        var data = {
            id: userInput.id,
            field : cols[userInput.field],
            value : userInput.data
        };
          $http({
            method: 'POST',
            url: '/api/questions/updateQuestion',
            data: data
          })
          .then(function(res){
            console.log('fired');
            $scope.dtOptions.reloadData(); 
          });
        
    };

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
            $scope.dtOptions.reloadData(); 
          });
    };

    $scope.dtOptions = DTOptionsBuilder.fromSource('/api/questions/')
      .withPaginationType('full_numbers')
      .withOption('createdRow', function(row, data, dataIndex){
        $compile(angular.element(row).contents())($scope);
    }).withOption('order', [0, 'desc']);

    $scope.dtColumns = [
        DTColumnBuilder.newColumn('id').withTitle('ID'),
        DTColumnBuilder.newColumn('question').withTitle('Question').renderWith(function(data, type, full, meta){

          return '<span class="editable" editable-textarea="questionEdit.text"  onbeforesave="updateEntry({id: '+full.id+', field: '+meta.col+', data: $data})">'+ data +'</span>';
        }),
        DTColumnBuilder.newColumn('answer').withTitle('Answer').renderWith(function(data, type, full, meta){
          return '<span class="editable" editable-textarea="questionEdit.answer" onbeforesave="updateEntry({id: '+full.id+', field: '+meta.col+', data: $data})">'+ data +'</span>';
        }),
        DTColumnBuilder.newColumn('difficulty').withTitle('Difficulty').renderWith(function(data, type, full, meta){
          return '<span class="editable" editable-text="questionEdit.difficulty"  onbeforesave="updateEntry({id: '+full.id+', field: '+meta.col+', data: $data})">'+ data +'</span>';
        }),
        DTColumnBuilder.newColumn('createdAt').withTitle('Created At'),
        DTColumnBuilder.newColumn('updatedAt').withTitle('Updated At'),
        DTColumnBuilder.newColumn('id').withTitle('Edit Options')
        .renderWith(function(data, type, full, meta) {
                return '<button class="btn btn-danger" ng-click="deleteItem('+ data +')">' +
                    '   <i class="fa fa-trash-o"></i>' +
                    '</button>';
            })
    ];
});



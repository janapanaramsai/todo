'use strict';
    // Initialize Firebase
    var config = {
      apiKey: "AIzaSyAfjQC4qL7tMu37XA2z469jfLCrsMsHdAM",
      authDomain: "todo-5a1c3.firebaseapp.com",
      databaseURL: "https://todo-5a1c3.firebaseio.com",
      storageBucket: "todo-5a1c3.appspot.com",
      messagingSenderId: "636959211631"
    };
    firebase.initializeApp(config);
angular.module('myApp.todo', ['ngRoute'])
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'todo/todo.html',
    controller: 'TodoCtrl'
  });
}])

.controller('TodoCtrl', ['$scope','$firebaseArray',function($scope,$firebaseArray) {

  var rootRef = firebase.database().ref();

  $scope.addFormShow = true;
  $scope.editFormShow = false;

  $scope.todos = $firebaseArray(rootRef.child('todos'));

  $scope.showEditTodo = function(todo){
    $scope.addFormShow = false;
    $scope.editFormShow = true;

    $scope.id = todo.$id;
    $scope.activity = todo.activity;
    $scope.notes = todo.notes;

  }

  $scope.addTodo = function(){
    console.log("adding contact");

    $scope.todos.$add({
      activity: $scope.activity,
      notes   : $scope.notes
    }).then(function(rootRef){
      var id = rootRef.key;
      console.log('Added Contant '+id);
      $scope.activity = '';
      $scope.notes = '';
    });
  }

  $scope.editTodo = function(){
    var id = $scope.id;

    var record = $scope.todos.$getRecord(id);
    record.activity = $scope.activity;
    record.notes = $scope.notes

    $scope.todos.$save(record).then(function(ref){
      console.log(ref.key);
    });

    $scope.activity = '';
    $scope.notes = '';
  }

  $scope.removeTodo = function(todo){
    $scope.todos.$remove(todo);
  }

}]);
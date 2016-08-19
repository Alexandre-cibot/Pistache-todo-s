// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic']);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

app.controller('listCtrl',function($scope, $ionicPopup, $timeout, $ionicModal) {
  $scope.showTodolist = true;
  $scope.deleting_mode = false;
   $scope.list = []; 

   if(localStorage && localStorage.getItem('todo')){
     $scope.list = JSON.parse(localStorage.getItem('todo'));
    }
  // Triggered on a button click, or some other target
  $scope.addTodo = function() {
    $scope.deleting_mode = false;
    $scope.data = {};
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.todo">',
      title: 'Entre un titre à ton mémo ',
      subTitle: 'Ton titre ne doit pas dépasser les 25 caractères',
      scope: $scope,
      buttons: [
        { text: 'Cancel',
          onTap: function(){
            myPopup.close();
          }
        },
        {
          text: '<b>Save</b>',
          type: 'button-positive',
          onTap: function(e) {
            if (!$scope.data.todo) {
              //Impossible to save if the field is empty
              e.preventDefault();
            } 
            else if ($scope.data.todo.length > 25) {
              myPopup.close();
              var alertPopup = $ionicPopup.alert({
                title: 'Ooooops !',
                template: "Attention à ne pas dépasser les 25 caratères maximum.",
                cssClass:'alertPopup'
              }).then(function(){
                $scope.addTodo();
              })
            }
            else {
              return $scope.data.todo;
            }
          }
        }
      ]
    });


    myPopup.then(function(result) {
      if(result !== undefined){
        if(result.length > 0){
          $scope.list.push({
          id :  Math.round(Math.random() * 78996385274796324 - 0.5) ,
          title : result
          });
          //We update de Localstorage
          localStorage.setItem('todo', JSON.stringify($scope.list));
          console.log('Tapped!', result);
        }
      }
      else{
        console.log('Nothing enter');
      }
    });
   };



    $ionicModal.fromTemplateUrl('templates/modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });
    $scope.openModal = function(index) {
      $scope.modal.show();
      //console.log(index);
      $scope.currentTodo = $scope.list[index];
      // console.log($scope.list);
      // console.log($scope.currentTodo)
    };

    $scope.closeModal = function() {
      $scope.modal.hide();
      //On met a jour le localstorage si il y a besoin
      if(localStorage.todo != JSON.stringify($scope.list)){
        //Si il y a des differences entre les deux JSON, on met a jours le localstorage
        localStorage.setItem('todo', JSON.stringify($scope.list));
        //alert('Your description has been perfectly updated héhé :)')
      }
      else{
        //console.log('Not need to update')
      }
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function() {
      $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function() {
      // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function() {
      // Execute action
    });


   $ionicModal.fromTemplateUrl('templates/infos.html', {
      scope: $scope,
      animation: "slide-in-right"
   }).then(function(infos){
      $scope.infos = infos;
   })
   $scope.showInfos = function(){
    $scope.infos.show();
   }
   $scope.closeInfos = function(){
    $scope.infos.hide();
   }

   $scope.removeTodos = function(){
    //We make sure that we have at least on todo
    if($scope.list.length > 0){
      if(!$scope.deleting_mode){
        $scope.deleting_mode = true;
      }
      else{
        $scope.deleting_mode = false;
      }
    } 
   };

   $scope.removeSingleTodo = function(index){
    console.log('Nombre dans la liste Avant : ' + $scope.list.length);
    console.log('Contenue supprimé : ' + JSON.stringify($scope.list[index]) + ' index : ' +  index);
    //Then
    //We maka a wonderful animation...

    $scope.list[index]._removing = true;
    //We remove this element from the list

    $timeout(function () {
      $scope.list.splice(index, 1);

      localStorage.setItem('todo', JSON.stringify($scope.list));
      console.log('Nombre dans la liste Apres : ' + $scope.list.length);
      // If it remains any todo, we "stop" the deleting_mode. 
      if($scope.list.length == 0){
        $scope.deleting_mode = false; 
      }
    }, 200);

   };

});



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
  $scope.showSpecificalTodo = false;
   $scope.list = []; 

   if(localStorage && localStorage.getItem('todo')){
     $scope.list = JSON.parse(localStorage.getItem('todo'));
    }
  // Triggered on a button click, or some other target
  $scope.addTodo = function() {
    $scope.data = {};
    // An elaborate, custom popup
    var myPopup = $ionicPopup.show({
      template: '<input type="text" ng-model="data.todo">',
      title: 'hmmm oui ...? ',
      subTitle: 'Entre le titre de ton mémo',
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
              //don't allow the user to close unless he enters wifi password
              e.preventDefault();
            } else {
              return $scope.data.todo;
            }
          }
        }
      ]
    });


    myPopup.then(function(result) {
      console.log('Tapped!', result);
      if(result.length > 0){
          $scope.list.push({
          id :  Math.round(Math.random() * 78996385274796324 - 0.5) ,
          title : result
          });
          //We update de Localstorage
          localStorage.setItem('todo', JSON.stringify($scope.list));
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
    // When button is clicked, the popup will be show...
  
      var confirmPopup = $ionicPopup.confirm({
         title: 'Supprimer les mémos',
         template: 'Est-tu sur de tout vouloir supprimer?'
      });

      confirmPopup.then(function(res) {
         if(res) {
            console.log('Sure!');
            $scope.list = [];
            localStorage.removeItem('todo');
         } else {
            console.log('Not sure!');
         }
      });
   };

});



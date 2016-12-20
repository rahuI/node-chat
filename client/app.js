'use strict';

angular.module("fileApp",[])
.controller("FileCtrl",["$scope","$http","$rootScope",function($scope,$http,$rootScope){
  var myType = {};
  $scope.users = [];
  var chatTo = {};
  $scope.sendPublic = function(){
    console.log($scope.getMessage);
    $http({
        method: "post",
        url: "/setpublicmessage",
        params: "",
        headers: "",
        data: {
          msg : $scope.getMessage,
          id : myType.id,
          name : myType.name
        }
    })
    .then(function(response){
      console.log("sent");
      // $scope.message.push({
      //   you : response.data.from,
      //   msg : $scope.getMessage
      // });
      $scope.getMessage = "";
    })
    .catch(function(err){
      console.log(err)
    });
  }
  $scope.start = function(){
    $http({
        method: "post",
        url: "/online",
        params: "",
        headers: "",
        data:{
          name : $scope.name
        }
    })
    .then(function(response){
      if(response.data.status){
        myType = response.data.data;
      }
      console.log(myType);
    })
    .catch(function(err){
      console.log(err);
    });
  }
  $scope.message = [];

  window.setInterval(function(){
    $http({
				method: "post",
				url: "/getpublicmessage",
				params: "",
				headers: "",
				data: {
          id : myType.id
        }
		})
    .then(function(response){
      // console.log(response.data);
      if(response.data.status){
        console.log(response.data);
        $scope.message.push({
          msg : response.data.msg,
          from : response.data.from,
          name : response.data.name,
          he : response.data.from != myType.id,
          you : response.data.from == myType.id,
        });
        console.log("abc: " + $scope.message[$scope.message.length-1]);
      }
    })
    .catch(function(err){
      // $scope.$apply(function(){
      //   $scope.message = response.data.msg;
      // });
    });
  }, 100);
  //keep getting list of users
  window.setInterval(function(){
    $http({
				method: "get",
				url: "/getonlineusers",
				params: "",
				headers: "",
				data: ""
		})
    .then(function(response){
      // console.log(response.data);
      if(response.data.status)
        $scope.users = response.data.users;
    })
    .catch(function(err){
      // $scope.$apply(function(){
      //   $scope.message = response.data.msg;
      // });
    });
  }, 500);
}])

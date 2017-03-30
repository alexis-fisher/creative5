var app = angular.module('comment', [])

app.factory('getImage', getImage)
app.controller('MainCtrl',MainCtrl);

function getImage ($http) {
  var API_ROOT = 'comments'
  return {
    get: function () {
      return $http
        .get(API_ROOT)
        .then(function (resp) {
          return resp.data
        })
    },
    post: function (formData) {
      return $http
        .post(API_ROOT,formData)
        .then(function (resp) {
          console.log("Post worked");
      })
    }
  }
}

function MainCtrl (getImage,$scope,$http){
    $scope.comments = [];
 
    getImage.get()
       .then(function(data) {
         $scope.comments = data
       })    

    $scope.addComment = function() {
      var newcomment = {title:$scope.formContent,upvotes:0};
      getImage.post(newcomment);
      $scope.comments.push(newcomment);
      $scope.formContent='';
    }

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
        .success(function(data){
          console.log("upvote worked");
          comment.upvotes = data.upvotes;
        })
    }
	$scope.incrementUpvotes = function(comment) {
	  $scope.upvote(comment);
    }
    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id )
        .success(function(data){
          console.log("delete worked");
        })
      $scope.getAll();
    }
    $scope.getAll = function() {
      return $http.get('/comments').success(function(data){
        angular.copy(data, $scope.comments);
      })
    }
   
     $scope.getAll();
   
}

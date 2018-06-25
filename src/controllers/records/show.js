import checkOwner from '../../functions/checkOwner.js';

function RecordsShowCtrl($scope, $http, $state, $auth){
  $scope.isOwner;

  $scope.deleteRecord = function(){
    $http({
      method: 'DELETE',
      url: `/api/records/${$state.params.id}`
    })
      .then(() => $state.go('recordsIndex'));
  };
  $http({
    method: 'GET',
    url: `/api/records/${$state.params.id}`
  })
    .then(res  => {
      $scope.record = res.data;
      $scope.isOwner = checkOwner(res, $auth) ? true : false;
    });

  $scope.commentData = {};
  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/records/${$state.params.id}/comments`,
      data: $scope.commentData
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
  $scope.deleteComment = function(comment){
    $http({
      method: 'DELETE',
      url: `/api/records/${$state.params.id}/comments/${comment._id}`
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
}

export default RecordsShowCtrl;

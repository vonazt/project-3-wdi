function MessagesShowCtrl($scope, $state,  $http){
  $http({
    method: 'GET',
    url: `/api/messages/${$state.params.id}`
  })
    .then(res  => $scope.message = res.data);

  $scope.commentData = {};
  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/messages/${$state.params.id}/comments`,
      data: $scope.commentData
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
  $scope.deleteComment = function(comment){
    $http({
      method: 'DELETE',
      url: `/api/messages/${$state.params.id}/comments/${comment._id}`
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };


}

export default MessagesShowCtrl;

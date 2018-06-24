function ProfilesShowCtrl($scope, $http, $state) {

  $http({
    method: 'GET',
    url: `/api/profiles/${$state.params.id}`
  })
    .then(res => $scope.user = res.data);

  $scope.commentData = {};
  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/profiles/${$state.params.id}/profile-comments`,
      data: $scope.commentData
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
  $scope.deleteComment = function(comment){
    $http({
      method: 'DELETE',
      url: `/api/profiles/${$state.params.id}/profile-comments/${comment._id}`
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
}

export default ProfilesShowCtrl;

import isOwner from '../../functions/isOwner.js';

function ProfilesShowCtrl($scope, $http, $state, $auth) {

  $http({
    method: 'GET',
    url: `/api/profiles/${$state.params.id}`
  })
    .then(res => {
      $scope.user = res.data;
      isOwner(res, $auth);
    });

  $scope.deleteUser = function() {
    $http({
      method: 'DELETE',
      url: `/api/profiles/${$state.params.id}`
    })
      .then(() => {
        $auth.logout();
        $state.go('home');
      });
  };


  $scope.commentData = {};
  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/profiles/${$state.params.id}/comments`,
      data: $scope.commentData
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
  $scope.deleteComment = function(comment){
    $http({
      method: 'DELETE',
      url: `/api/profiles/${$state.params.id}/comments/${comment._id}`
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
}

export default ProfilesShowCtrl;

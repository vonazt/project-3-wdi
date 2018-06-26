import checkProfileOwner from '../../functions/checkProfileOwner.js';

function UsersShowCtrl($scope, $http, $state, $auth) {
  $scope.isOwner;

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      $scope.user = res.data;
      $scope.isOwner = checkProfileOwner(res, $auth) ? true : false;
    });

  $scope.deleteUser = function() {
    $http({
      method: 'DELETE',
      url: `/api/users/${$state.params.id}`
    })
      .then(() => {
        $auth.logout();
        $state.go('home');
      });
  };

  $scope.acceptOffer = function(request) {
    request.status = 'accepted';
    $http({
      method: 'PUT',
      url: `/api/requests/${request._id}`,
      data: request
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }));
  };

  $scope.declineOffer = function(request){
    request.status = 'declined';
    $http({
      method: 'PUT',
      url: `/api/requests/${request._id}`,
      data: request
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }));
  };

  $scope.deleteOffer = function(request) {
    $http({
      method: 'DELETE',
      url: `/api/requests/${request._id}`
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };

  $scope.commentData = {};
  $scope.createComment = function() {
    $http({
      method: 'POST',
      url: `/api/users/${$state.params.id}/comments`,
      data: $scope.commentData
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
  $scope.deleteComment = function(comment){
    $http({
      method: 'DELETE',
      url: `/api/users/${$state.params.id}/comments/${comment._id}`
    })
      .then(() => $state.go($state.current, {}, { reload: true }));
  };
}

export default UsersShowCtrl;

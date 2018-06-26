import checkProfileOwner from '../../functions/checkProfileOwner.js';

function UsersShowCtrl($scope, $http, $state, $auth) {
  $scope.isOwner;
  $scope.currentUser = $auth.getPayload();

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
    request.stage[0]++;
    request.stage[1]++;
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

  $scope.incomingRecordsSent = function(username, request) {
    request.status = `records sent by ${username}`;
    request.stage[0]++;
    $http({
      method: 'PUT',
      url: `/api/requests/${request._id}`,
      data: request
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }));
  };
  $scope.outgoingRecordsSent = function(username, request) {
    request.status = `records sent by ${username}`;
    request.stage[1]++;
    $http({
      method: 'PUT',
      url: `/api/requests/${request._id}`,
      data: request
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }));
  };

  $scope.incomingRecordsReceived = function(username, request) {
    request.status = `records received by ${username}`;
    request.stage[1]++;
    $http({
      method: 'PUT',
      url: `/api/requests/${request._id}`,
      data: request
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }));
  };
  $scope.outgoingRecordsReceived = function(username, request) {
    request.status = `records received by ${username}`;
    request.stage[0]++;
    $http({
      method: 'PUT',
      url: `/api/requests/${request._id}`,
      data: request
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }));
  };

  $scope.swapRecords = function(outgoingRecordId, incomingRecordId ) {
    const data = {
      ownedRecordId: outgoingRecordId,
      offeredRecordId: incomingRecordId
    };
    $http({
      method: 'POST',
      url: '/api/records/swap',
      data: data
    })
      .then(() => $state.go('collectionsIndex'));
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

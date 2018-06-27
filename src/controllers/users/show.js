import checkProfileOwner from '../../functions/checkProfileOwner.js';

function UsersShowCtrl($scope, $http, $state, $auth) {
  $scope.isOwner;
  $scope.currentUser = $auth.getPayload();

  function getUser() {
    $http({
      method: 'GET',
      url: `/api/users/${$state.params.id}`
    })
      .then(res => {
        $scope.user = res.data;
        $scope.isOwner = checkProfileOwner(res, $auth) ? true : false;
      });
  }

  getUser();

  $scope.createMessage = function(user, currentUser) {
    const data = {
      userOneId: user._id,
      userTwoId: currentUser.sub
    };
    $http({
      method: 'POST',
      url: '/api/messages',
      data: data
    })
      .then(() => $state.go('messagesIndex'));
  };

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
      .then(getUser);
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

  $scope.recordsAction = function(username, request, status, stageNumber) {
    request.status = `${status} by ${username}`;
    request.stage[stageNumber]++;
    $http({
      method: 'PUT',
      url: `/api/requests/${request._id}`,
      data: request
    })
      .then(getUser);
  };

  $scope.swapRecords = function(outgoingRecordId, incomingRecordId, requestId) {
    const data = {
      ownedRecordId: outgoingRecordId,
      offeredRecordId: incomingRecordId,
      requestId: requestId
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
      .then(getUser);
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

function RequestsNewCtrl($scope, $state, $http, $auth) {
  $scope.data = {};
  $scope.currentUserId = $auth.getPayload().sub;
  $scope.submitRequest = function(currentUserId) {
    $http({
      method: 'POST',
      url: `/api/records/${$state.params.id}/requests`,
      data: $scope.data
    })
      .then(() => $state.go('usersShow', { id: currentUserId }));
  };

  $http({
    method: 'GET',
    url: `/api/records/${$state.params.id}/requests`
  })
    .then(res => $scope.record = res.data);
}

export default RequestsNewCtrl;

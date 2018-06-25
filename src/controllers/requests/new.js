function RequestsNewCtrl($scope, $state, $http) {
  $scope.data = {};

  $scope.submitRequest = function() {
    $http({
      method: 'POST',
      url: `/api/records/${$state.params.id}/requests`,
      data: $scope.data
    })
      .then(() => $state.go('recordsShow', { id: $state.params.id }));
  };

  $http({
    method: 'GET',
    url: `/api/records/${$state.params.id}/requests`
  })
    .then(res => $scope.record = res.data);
}

export default RequestsNewCtrl;

function RequestsEditCtrl($scope, $state, $http) {

  $http({
    method: 'GET',
    url: `/api/requests/${$state.params.id}`
  })
    .then(res => $scope.data = res.data);
}

export default RequestsEditCtrl;

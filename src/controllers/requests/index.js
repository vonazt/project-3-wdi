function RequestsIndexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/requests'
  })
    .then(res => $scope.records = res.data);
}

export default RequestsIndexCtrl;

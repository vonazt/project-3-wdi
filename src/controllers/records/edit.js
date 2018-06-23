function RecordsEditCtrl($scope, $state, $http) {

  $scope.updateRecord = function() {
    $http({
      method: 'PUT',
      url: `/api/records/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('recordsShow', { id: $state.params.id }));
  };

  $http({
    method: 'GET',
    url: `/api/records/${$state.params.id}`
  })
    .then(res => $scope.data = res.data);
}

export default RecordsEditCtrl;

function RecordsNewCtrl($scope, $state, $http) {
  $scope.data = {};

  $scope.createRecord = function() {
    $http({
      method: 'POST',
      url: '/api/records',
      data: $scope.data
    })
      .then(() => $state.go('recordsIndex'));
  };
}

export default RecordsNewCtrl;

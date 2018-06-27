function RequestsNewCtrl($scope, $state, $http, $auth) {
  $scope.recordToDisplay = [];
  $scope.userRecords = [];
  $scope.offerArray = [];
  $scope.data = {};
  $scope.currentUserId = $auth.getPayload().sub;

  $scope.addToOffer = function(record) {
    $scope.offerArray.push(record);
    const recordIndex = $scope.userRecords.indexOf(record);
    $scope.userRecords.splice(recordIndex, 1);
  };

  $scope.removeRecord = function(record) {
    const recordIndex = $scope.offerArray.indexOf(record);
    $scope.offerArray.splice(recordIndex, 1);
    $scope.userRecords.push(record);
  };

  $scope.submitRequest = function(currentUserId) {
    $scope.data.offeredRecord = $scope.offerArray.map(item => item._id);
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
    .then(res => {
      $scope.records = res.data;
      $scope.records.forEach(record => {
        if(record._id === $state.params.id) {
          $scope.recordToDisplay.push(record);
        } else if(record.owner._id === $auth.getPayload().sub) {
          $scope.userRecords.push(record);
        }
      });
    });
}

export default RequestsNewCtrl;

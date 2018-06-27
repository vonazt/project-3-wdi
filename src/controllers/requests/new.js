function RequestsNewCtrl($scope, $state, $http, $auth) {
  $scope.recordToDisplay = [];
  $scope.userRecords = [];
  $scope.offerArray = [];
  $scope.data = {};
  $scope.currentUserId = $auth.getPayload().sub;

  $scope.addToOffer = function(record) {
    $scope.offerArray.push(record);
  };

  $scope.removeRecord = function(e) {
    // const index = $scope.offerDisplay.indexOf(e);
    // $scope.offerDisplay.splice(index, 1);
    // $scope.userRecords.push(tempRecordData.filter(record => record.title === e));
    // offerArray.splice(indexOf)
    // console.log($scope.userRecords);
  };

  $scope.submitRequest = function(currentUserId) {
    $scope.data.offeredRecord = $scope.offerArray.map(item => item._id);
    console.log($scope.data.offeredRecord);
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

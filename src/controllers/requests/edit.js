function RequestsEditCtrl($scope, $state, $http, $auth) {
  $scope.data = {};
  $scope.userRecords = [];
  $scope.offerArray = [];
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

  $scope.editRequest = function(currentUserId) {
    $scope.data.offeredRecord = $scope.offerArray.map(item => item._id);
    $scope.data.message = $scope.data.message;
    $http({
      method: 'PUT',
      url: `/api/requests/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('usersShow', { id: currentUserId }));
  };

  $http({
    method: 'GET',
    url: `/api/requests/${$state.params.id}`
  })
    .then(res => {
      $scope.data = res.data;
      $scope.offerArray = $scope.data.offeredRecord.map(record => record);
      const checkRecordArray = $scope.data.offeredRecord.map(record => record._id);
      $scope.data.offeredRecord[0].owner.records.forEach(record => {
        if(!checkRecordArray.includes(record._id)) {
          $scope.userRecords.push(record);
        }
      });
    });
}

export default RequestsEditCtrl;

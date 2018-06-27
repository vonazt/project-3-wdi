function RequestsEditCtrl($scope, $state, $http) {

  $scope.userRecords = [];
  $scope.offerArray = [];

  $scope.removeRecord = function(record) {
    const recordIndex = $scope.offerArray.indexOf(record);
    $scope.offerArray.splice(recordIndex, 1);
    $scope.userRecords.push(record);
    console.log($scope.userRecords);
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

function RequestsEditCtrl($scope, $state, $http) {

  $scope.userRecords = [];

  $http({
    method: 'GET',
    url: `/api/requests/${$state.params.id}`
  })
    .then(res => {
      $scope.data = res.data;
      const checkRecordArray = $scope.data.offeredRecord.map(record => record._id);
      $scope.data.offeredRecord[0].owner.records.forEach(record => {
        if(!checkRecordArray.includes(record._id)) {
          $scope.userRecords.push(record);
        }
      });
    });
}

export default RequestsEditCtrl;
//
// .then(res => {
//   $scope.data = res.data;
//   $scope.data.offeredRecord[0].owner.records.forEach(record => {
//     if(record._id !== $scope.data.offeredRecord[0]._id) {
//       $scope.userRecords.push(record);
//     }
//   });
// });
// }

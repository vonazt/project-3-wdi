function CollectionsIndexCtrl($scope, $http, $auth){
  $http({
    method: 'GET',
    url: '/api/records'
  })
    .then((res) => {
      $scope.records = res.data;
      const filteredRecordsArray = [];
      $scope.records.forEach(record => {
        if(record.owner.id ===  $auth.getPayload().sub) filteredRecordsArray.push(record);
      });
      $scope.records = filteredRecordsArray;
      return $scope.records = filteredRecordsArray;
    });
}

export default CollectionsIndexCtrl;

function RecordsIndexCtrl($scope, $http){
  $http({
    method: 'GET',
    url: '/api/records'
  })
    .then(res  => $scope.records = res.data);
}

export default RecordsIndexCtrl;

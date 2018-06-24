function CollectionsIndexCtrl($scope, $http){
  $http({
    method: 'GET',
    url: '/api/records'
  })
    .then((res) => {
      $scope.records = res.data;
      console.log(res);
    });
}

export default CollectionsIndexCtrl;

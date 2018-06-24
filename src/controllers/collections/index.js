function CollectionsIndexCtrl($scope, $http, $auth){
  $http({
    method: 'GET',
    url: '/api/records'
  })
    .then((res) => {
      $scope.records = res.data;
      const currentUserId = $auth.getPayload().sub;
      res.data.forEach(record => {
        if(record.owner === currentUserId) record.isOwner = true;
      });
      // console.log($auth.getPayload().sub);
      console.log(res.data);
      // console.log($auth.getPayload().sub === res.data[0].owner);

    });
}

export default CollectionsIndexCtrl;

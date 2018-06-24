import isMultipleRecordsOwner from '../../functions/isMultipleRecordsOwner.js';

function CollectionsIndexCtrl($scope, $http, $auth){
  $http({
    method: 'GET',
    url: '/api/records'
  })
    .then((res) => {
      $scope.records = res.data;
      isMultipleRecordsOwner(res, $auth);
    });
}

export default CollectionsIndexCtrl;

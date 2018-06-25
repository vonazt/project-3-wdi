function UsersIndexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/users'
  })
    .then(res => $scope.users = res.data);
}

export default UsersIndexCtrl;

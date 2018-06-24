function ProfilesIndexCtrl($scope, $http) {
  $http({
    method: 'GET',
    url: '/api/profiles'
  })
    .then(res => $scope.users = res.data);
}

export default ProfilesIndexCtrl;

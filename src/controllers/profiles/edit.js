function ProfilesEditCtrl($scope, $state, $http) {

  $scope.updateUser = function() {
    $http({
      method: 'PUT',
      url: `/api/profiles/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('profilesShow', { id: $state.params.id }));
  };

  $http({
    method: 'GET',
    url: `/api/profiles/${$state.params.id}`
  })
    .then(res => $scope.data = res.data);
}

export default ProfilesEditCtrl;

function ProfilesEditCtrl($scope, $state, $http, $rootScope) {

  $scope.updateUser = function() {
    $http({
      method: 'PUT',
      url: `/api/profiles/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('profilesShow', { id: $state.params.id }))
      .catch(() => {
        $rootScope.$broadcast('flashMessage', {
          type: 'danger',
          content: 'Username or email already exists'
        });
      });
  };

  $http({
    method: 'GET',
    url: `/api/profiles/${$state.params.id}`
  })
    .then(res => {
      $scope.data = res.data;
      // $scope.data.passwordConfirmation = res.data.password;
    });
}

export default ProfilesEditCtrl;

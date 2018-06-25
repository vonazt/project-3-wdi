function UsersEditCtrl($scope, $state, $http, $rootScope) {

  $scope.updateUser = function() {
    $http({
      method: 'PUT',
      url: `/api/users/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('usersShow', { id: $state.params.id }))
      .catch(() => {
        $rootScope.$broadcast('flashMessage', {
          type: 'danger',
          content: 'Username or email already exists'
        });
      });
  };

  $http({
    method: 'GET',
    url: `/api/users/${$state.params.id}`
  })
    .then(res => {
      $scope.data = res.data;
      // $scope.data.passwordConfirmation = res.data.password;
    });
}

export default UsersEditCtrl;

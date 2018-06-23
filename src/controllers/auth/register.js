function AuthRegisterCtrl($scope, $auth, $state, $rootScope) {
  $scope.data = {};

  $scope.handleSubmit = function() {
    $auth.signup($scope.data)
      .then($state.go('login'))
      .catch(() => {
        $rootScope.$broadcast('flashMessage', {
          type: 'danger',
          content: 'Username or password already exists'
        });
      });
  };
}

export default AuthRegisterCtrl;

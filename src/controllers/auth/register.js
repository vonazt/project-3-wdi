function AuthRegisterCtrl($scope, $auth, $state) {
  $scope.data = {};

  $scope.handleSubmit = function() {
    $auth.signup($scope.data)
      .then($state.go('/'));
  };
}

export default AuthRegisterCtrl;

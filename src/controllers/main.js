function MainCtrl($scope, $state, $auth, $transitions, $rootScope, $timeout) {
  $scope.isAuthenticated = $auth.isAuthenticated;

  $transitions.onSuccess({}, () => {
    $scope.isHomepage = $state.$current.name === 'home';
  });

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => {
      $scope.flashMessage = null;
    }, 3000);
  });

  $scope.logout = function() {
    $auth.logout();
    $state.go('home');
  };
}

export default MainCtrl;

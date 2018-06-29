function MainCtrl($scope, $state, $auth, $transitions, $rootScope, $timeout) {
  $scope.isAuthenticated = $auth.isAuthenticated;
  $scope.navbarOpen = false;

  $scope.getUserId = function() {
    return $scope.currentUserId = $auth.getPayload().sub;
  };

  $transitions.onSuccess({}, () => {
    $scope.navbarOpen = false;
    $scope.isHomepage = $state.$current.name === 'home';
  });

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => {
      $scope.flashMessage = null;
    }, 3000);
  });

  $scope.toggleMenu = function() {
    $scope.navbarOpen = !$scope.navbarOpen;
  };

  $scope.logout = function() {
    $auth.logout();
    $state.go('home');
  };
}

export default MainCtrl;

function MainCtrl($scope, $state, $transitions, $rootScope, $timeout) {

  $transitions.onSuccess({}, () => {
    $scope.isHomepage = $state.$current.name === 'home';
  });

  $rootScope.$on('flashMessage', (e, data) => {
    $scope.flashMessage = data;

    $timeout(() => {
      $scope.flashMessage = null;
    }, 3000);
  });
}

export default MainCtrl;

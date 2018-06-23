function MainCtrl($scope, $state, $transitions) {

  $transitions.onSuccess({}, () => {
    $scope.isHomepage = $state.$current.name === 'home';
  });
}

export default MainCtrl;

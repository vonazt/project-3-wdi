function ProfilesShowCtrl($scope, $http, $state) {

  $http({
    method: 'GET',
    url: `/api/profiles/${$state.params.id}`
  })
    .then(res => {
      $scope.user = res.data;

    });
}

export default ProfilesShowCtrl;

function UsersIndexCtrl($scope, $state, $http, $auth) {
  $scope.isOwner;
  $scope.currentUser = $auth.getPayload();

  
  $http({
    method: 'GET',
    url: '/api/users'
  })
    .then(res => $scope.users = res.data);

  $scope.createMessage = function(user, currentUser) {
    const data = {
      userOneId: user._id,
      userTwoId: currentUser.sub
    };
    $http({
      method: 'POST',
      url: '/api/messages',
      data: data
    })
      .then(() => $state.go('messagesIndex'));
  };
}



export default UsersIndexCtrl;

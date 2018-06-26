function MessagesIndexCtrl($scope, $http){
  $http({
    method: 'GET',
    url: '/api/messages'
  })
    .then(res  => $scope.messages = res.data);
}

export default MessagesIndexCtrl;

import checkMessageOwner from '../../functions/checkMessageOwner.js';

function MessagesIndexCtrl($scope, $http, $auth){
  $http({
    method: 'GET',
    url: '/api/messages'
  })
    .then(res => {
      $scope.messages = res.data;
      $scope.isOwner = checkMessageOwner(res, $auth) ? true : false;
      console.log($scope);
    });
}

export default MessagesIndexCtrl;

import checkMessageOwner from '../../functions/checkMessageOwner.js';

function MessagesIndexCtrl($scope, $http, $auth){
  $http({
    method: 'GET',
    url: '/api/messages'
  })
    .then(res => {
      $scope.user = res.data;
      $scope.isOwner = checkMessageOwner(res, $auth) ? true : false;
    });
}

export default MessagesIndexCtrl;

function RequestsEditCtrl($scope, $state, $http, $auth) {
  $scope.data = {};
  $scope.userRecords = [];
  $scope.offerArray = [];
  $scope.currentUserId = $auth.getPayload().sub;
  $scope.currentUser = $auth.getPayload();

  $scope.addToOffer = function(record) {
    $scope.offerArray.push(record);
    const recordIndex = $scope.userRecords.indexOf(record);
    $scope.userRecords.splice(recordIndex, 1);
  };

  $scope.removeRecord = function(record) {
    const recordIndex = $scope.offerArray.indexOf(record);
    $scope.offerArray.splice(recordIndex, 1);
    $scope.userRecords.push(record);
  };

  $scope.editRequest = function(currentUserId) {
    $scope.data.offeredRecords = $scope.offerArray.map(item => item._id);
    $http({
      method: 'PUT',
      url: `/api/requests/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('usersShow', { id: currentUserId }));
  };

  $http({
    method: 'GET',
    url: `/api/requests/${$state.params.id}`
  })
    .then(res => {
      $scope.data = res.data;
      $scope.offerArray = $scope.data.offeredRecords.map(record => record);
      const checkRecordArray = $scope.data.offeredRecords.map(record => record._id);
      $scope.data.offeredRecords[0].owner.records.forEach(record => {
        if(!checkRecordArray.includes(record._id)) {
          $scope.userRecords.push(record);
        }
      });
    });

  $scope.createMessage = function(user, currentUser) {
    const data = {
      userOneId: user,
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

export default RequestsEditCtrl;

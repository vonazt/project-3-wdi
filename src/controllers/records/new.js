function RecordsNewCtrl($scope, $state, $http) {
  $scope.data = {};
  $scope.genreArray = [];
  $scope.showGenreArray = false;

  $scope.addGenre = function() {
    $scope.genreArray.push($scope.data.genre);
    $scope.showGenreArray = true;
    $scope.data.genre = '';
  };

  $scope.createRecord = function() {
    if($scope.genreArray.length > 0) $scope.data.genre = $scope.genreArray;
    $http({
      method: 'POST',
      url: '/api/records',
      data: $scope.data
    })
      .then(() => $state.go('recordsIndex'));
  };
}

export default RecordsNewCtrl;

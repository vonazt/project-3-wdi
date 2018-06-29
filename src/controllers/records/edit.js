function RecordsEditCtrl($scope, $state, $http) {
  $scope.genreArray = [];
  $scope.showGenreArray = false;

  $scope.addGenre = function() {
    $scope.genreArray.push($scope.data.genre);
    $scope.showGenreArray = true;
    $scope.data.genres = '';
  };

  $scope.removeGenre = function(e) {
    const index = $scope.genreArray.indexOf(e);
    $scope.genreArray.splice(index, 1);
    $scope.data.genres = '';
  };

  $scope.updateRecord = function() {
    $scope.data.genre = $scope.genreArray;
    $http({
      method: 'PUT',
      url: `/api/records/${$state.params.id}`,
      data: $scope.data
    })
      .then(() => $state.go('recordsShow', { id: $state.params.id }));
  };

  $http({
    method: 'GET',
    url: `/api/records/${$state.params.id}`
  })
    .then(res => {
      $scope.data = res.data;
      res.data.genres.forEach(item => $scope.genreArray.push(item));
      $scope.showGenreArray = true;
      $scope.data.genres = '';
    });
}

export default RecordsEditCtrl;

function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html'
    })
    .state('recordsIndex', {
      url: '/records',
      templateUrl: './views/records/index.html',
      controller: 'RecordsIndexCtrl'
    })
    .state('recordsShow', {
      url: '/records/:id',
      templateUrl: './views/records/show.html',
      controller: 'RecordsShowCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;

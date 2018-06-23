function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;

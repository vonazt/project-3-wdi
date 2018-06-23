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
    .state('login', {
      url: '/login',
      templateUrl: './views/auth/login.html',
      controller: 'AuthLoginCtrl'
    })
    .state('register', {
      url: '/register',
      templateUrl: './views/auth/register.html',
      controller: 'AuthRegisterCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;

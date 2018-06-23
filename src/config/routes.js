function Router($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: './views/home.html'
    })
    .state('register', {
      url: '/register',
      templateUrl: './views/auth/register.html',
      controller: 'AuthRegisterCtrl'
    });

  $urlRouterProvider.otherwise('/');
}

export default Router;

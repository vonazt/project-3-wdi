function secureState($q, $state, $auth, $rootScope) {
  return new $q(resolve => {
    if($auth.isAuthenticated()) return resolve();

    $rootScope.$broadcast('flashMessage', {
      type: 'warning',
      content: 'Please login to view this page'
    });

    $state.go('login');
  });
}

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
    })
    .state('recordsNew', {
      url: '/records/new',
      templateUrl: './views/records/new.html',
      controller: 'RecordsNewCtrl',
      resolve: { secureState }
    })
    .state('recordsEdit', {
      url: '/records/:id/edit',
      templateUrl: './views/records/edit.html',
      controller: 'RecordsEditCtrl',
      resolve: {secureState}
    })
    .state('collectionsIndex', {
      url: '/collections',
      templateUrl: './views/collections/index.html',
      controller: 'CollectionsIndexCtrl'
    })
    .state('profilesIndex', {
      url: '/profiles',
      templateUrl: './views/profiles/index.html',
      controller: 'ProfilesIndexCtrl'
    })
    .state('profilesShow', {
      url: '/profiles/:id',
      templateUrl: './views/profiles/show.html',
      controller: 'ProfilesShowCtrl'
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

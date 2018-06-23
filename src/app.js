import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';

import 'bulma';

import Router from './config/routes';
import Auth from './config/satellizer';

import MainCtrl from './controllers/main';
import RecordsIndexCtrl from './controllers/records/index.js';
import RecordsShowCtrl from './controllers/records/show.js';
import AuthRegisterCtrl from './controllers/auth/register';

angular.module('tallManRecordsApi', ['ui.router', 'satellizer', 'ngMessages'])
  .config(Router)
  .config(Auth)
  .controller('MainCtrl', MainCtrl)
  .controller('RecordsIndexCtrl', RecordsIndexCtrl)
  .controller('RecordsShowCtrl', RecordsShowCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl);

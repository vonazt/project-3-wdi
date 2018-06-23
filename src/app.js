import angular from 'angular';
import '@uirouter/angularjs';

import 'bulma';

import Router from './config/routes';

import MainCtrl from './controllers/main';
import RecordsIndexCtrl from './controllers/records/index.js';

angular.module('tallManRecordsApi', ['ui.router'])
  .config(Router)
  .controller('MainCtrl', MainCtrl)
  .controller('RecordsIndexCtrl', RecordsIndexCtrl);

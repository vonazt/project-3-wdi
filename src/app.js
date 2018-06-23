import angular from 'angular';
import '@uirouter/angularjs';

import 'bulma';

import Router from './config/routes';

import MainCtrl from './controllers/main';
import RecordsIndexCtrl from './controllers/records/index.js';
import RecordsShowCtrl from './controllers/records/show.js';

angular.module('tallManRecordsApi', ['ui.router'])
  .config(Router)
  .controller('MainCtrl', MainCtrl)
  .controller('RecordsIndexCtrl', RecordsIndexCtrl)
  .controller('RecordsShowCtrl', RecordsShowCtrl);

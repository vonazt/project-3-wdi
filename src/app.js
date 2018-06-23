import angular from 'angular';
import '@uirouter/angularjs';

import 'bulma';

import Router from './config/routes';

angular.module('tallManRecordsApi', ['ui.router'])
  .config(Router);

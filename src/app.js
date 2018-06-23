import angular from 'angular';
import '@uirouter/angularjs';
import 'satellizer';
import 'angular-messages';
import 'filepicker-js';
import 'angular-filepicker/dist/angular_filepicker';

import 'bulma';

import Router from './config/routes';
import Auth from './config/satellizer';
import Upload from './config/filepicker';

import MainCtrl from './controllers/main';
import RecordsIndexCtrl from './controllers/records/index.js';
import RecordsShowCtrl from './controllers/records/show.js';
import RecordsNewCtrl from './controllers/records/new.js';
import RecordsEditCtrl from './controllers/records/edit.js';
import AuthLoginCtrl from './controllers/auth/login';
import AuthRegisterCtrl from './controllers/auth/register';

import filePicker from './directives/filePicker';

angular.module('tallManRecordsApi', [
  'ui.router',
  'satellizer',
  'ngMessages',
  'angular-filepicker'
])
  .config(Router)
  .config(Auth)
  .config(Upload)
  .controller('MainCtrl', MainCtrl)
  .controller('RecordsIndexCtrl', RecordsIndexCtrl)
  .controller('RecordsShowCtrl', RecordsShowCtrl)
  .controller('RecordsNewCtrl', RecordsNewCtrl)
  .controller('RecordsEditCtrl', RecordsEditCtrl)
  .controller('AuthLoginCtrl', AuthLoginCtrl)
  .controller('AuthRegisterCtrl', AuthRegisterCtrl)
  .directive('filePicker', filePicker);

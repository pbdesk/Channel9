(function () {
	'use strict';

	var coreApp = angular.module('PBDesk.IdSys.Core', [
		'ngAnimate', 'ngRoute', 'ngCookies', 'LocalStorageModule', 'angular-loading-bar',
		'PBDesk.Toastr', 'PBDesk.Logger', 'PBDesk.Exception', 'PBDesk.Router'
	]);



	coreApp.config(function ($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptorService');
	});                     

	coreApp.config(function (localStorageServiceProvider) {
		localStorageServiceProvider
		  .setPrefix('IdSys');
	});

  //  coreApp.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
  //  	cfpLoadingBarProvider.includeSpinner = true;
  //  	cfpLoadingBarProvider.includeBar = true;
  //}])

})();

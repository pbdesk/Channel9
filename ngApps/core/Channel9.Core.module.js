(function () {
	'use strict';

	var coreApp = angular.module('PBDesk.C9Core', [
		'ngAnimate', 'ngRoute', 'ngCookies', 'LocalStorageModule', 'angular-loading-bar',
		'PBDesk.Toastr', 'PBDesk.Logger', 'PBDesk.Exception'
	]);



	coreApp.config(function ($httpProvider) {
		$httpProvider.interceptors.push('AuthInterceptorService');
	});                     

	coreApp.config(function (localStorageServiceProvider) {
		localStorageServiceProvider
		  .setPrefix('C9');
	});

  //  coreApp.config(['cfpLoadingBarProvider', function (cfpLoadingBarProvider) {
  //  	cfpLoadingBarProvider.includeSpinner = true;
  //  	cfpLoadingBarProvider.includeBar = true;
  //}])

})();

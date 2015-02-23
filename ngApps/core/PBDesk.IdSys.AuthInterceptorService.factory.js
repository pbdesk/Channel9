(function () {
	'use strict';

	angular
		.module('PBDesk.IdSys.Core')
		.factory('AuthInterceptorService', AuthInterceptorService);

	AuthInterceptorService.$inject = ['$q', '$injector', '$location', 'localStorageService', 'IdSysSettings', 'Logger'];

	function AuthInterceptorService($q, $injector, $location, localStorageService,IdSysSettings, Logger) {

		

		var service = {
			request: _request,
			responseError: _responseError
		};

		return service;

		
		function _request(config) {

			config.headers = config.headers || {};

			var authData = localStorageService.get('authorizationData');
			if (authData) {
				config.headers.Authorization = 'Bearer ' + authData.token;
			}

			return config;
		}

		function _responseError(rejection) {
			if (rejection.status === 401) {
				var authService = $injector.get('AuthService');
				var authData = localStorageService.get('authorizationData');

				if (authData) {
					if (authData.useRefreshTokens) {
					    $location.url('/refresh?url=' + $location.path());
					    //window.location = '#/refresh?url=' + $location.path();
					    return $q.reject(rejection);
					}
				}
				authService.logout();
			    //$location.path('/login');
				window.location = IdSysSettings.loginUrl;
			}
			return $q.reject(rejection);
		}

	} //EOF AuthInterceptorService
})();
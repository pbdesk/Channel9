﻿///#source 1 1 /ngApps/core/PBDesk.IdSys.Core.module.js
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

///#source 1 1 /ngApps/core/PBDesk.IdSys.Core.config.js
(function () {
	'use strict';

	var coreApp = angular.module('PBDesk.IdSys.Core');

	var appUrl = 'http://localhost:28000/';
	coreApp.constant('IdSysSettings', {
		apiServiceBaseUrl:  appUrl + 'IdSys/api/',
		clientBaseUrl: appUrl,
		clientId: 'selfLocalHost',
		confirmationUrl: appUrl + 'account/#/ConfirmEmail',
		loginUrl: '/account/#/login',
		forgetPasswordUrl: appUrl + 'account/#/resetPassword'
	});

	

	/*
		apiServiceBaseUrl: 'http://idsys.azurewebsites.net/IdSys/api/',
		clientBaseUrl: 'http://idsys.azurewebsites.net/',
		clientId: 'selfHostAzure',
		confirmationUrl: 'http://idsys.azurewebsites.net/account/#/ConfirmEmail',
		loginUrl: '/account/#/login' ,
		forgetPasswordUrl: 'http://idsys.azurewebsites.net/account/#/resetPassword'
	 */
	/*
		apiServiceBaseUrl: 'http://account.pbdesk.com/IdSys/api/',
		clientBaseUrl: 'http://account.pbdesk.com/',
		clientId: 'selfHostArvixe',
		confirmationUrl: 'http://account.pbdesk.com/account/#/ConfirmEmail',
		loginUrl: '/account/#/login' ,
		forgetPasswordUrl: 'http://account.pbdesk.com/account/#/resetPassword'
	 */

})();

///#source 1 1 /ngApps/core/PBDesk.IdSys.AuthService.factory.js
(function () {
	'use strict';

	angular
		.module('PBDesk.IdSys.Core')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http', '$q', 'localStorageService', 'IdSysSettings'];

	function AuthService($http, $q, localStorageService, IdSysSettings) {

		var serviceBase = IdSysSettings.apiServiceBaseUrl;
		var _authentication = {
			isAuth: false,
			userName: "",
			useRefreshTokens: false,
			displayName: '',
			roles: '',
			prole: ''
		};

		

		var service = {
		    authData: _authentication,
			saveRegistration: _saveRegistration,
			login: _login,
			logout: _logOut,
			isLoggedIn: _isLoggedIn,
			fillAuthData: _fillAuthData,
			refreshToken: _refreshToken,
			getUserData: _getUserData,
			reSendVarificationEmail: _reSendVarificationEmail,
			sendForgetPasswordEmail: _sendForgetPasswordEmail,
			confirmEmail: _confirmEmail,
			authorizationCheck: _authorizationCheck,
			resetPassword: _resetPassword,
			getErrStrFromModelState: _getErrStrFromModelState
		};

		return service;

		
		function _logOut() {

			localStorageService.remove('authorizationData');
		


			_authentication.isAuth = false;
			_authentication.userName = "";
			_authentication.useRefreshTokens = false;
			_authentication.displayName = "";
			_authentication.roles = "";
			_authentication.prole = "";

		};

		function _saveRegistration(registration) {

			_logOut();

			registration.clientId = IdSysSettings.clientId;
			registration.confirmationUrl = IdSysSettings.confirmationUrl;
			return $http.post(serviceBase + 'Register', registration)
				.then(function (response) {
				return response;
			});

		};

		function _login(loginData) {

			var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

			// if Use Refresh Tokens checkbox is checked on
			if (loginData.useRefreshTokens) {
				data = data + "&client_id=" + IdSysSettings.clientId;
			}

			var deferred = $q.defer();

			$http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

				if (loginData.useRefreshTokens) {
					localStorageService.set('authorizationData', { token: response.access_token, refreshToken: response.refresh_token, useRefreshTokens: true, userName: loginData.userName, displayName: response.displayName, roles: response.roles, prole: _getPRole(response.roles) });
				}
				else {
					localStorageService.set('authorizationData', { token: response.access_token, refreshToken: "", useRefreshTokens: false, userName: loginData.userName, displayName: response.displayName, roles: response.roles, prole: _getPRole(response.roles) });
				}

				_fillAuthData();

				//_authentication.isAuth = true;
				//_authentication.userName = loginData.userName;
				//_authentication.useRefreshTokens = loginData.useRefreshTokens;
				//_authentication.displayName = response.displayName;
				//_authentication.roles = response.roles;
				//// // // // // // _authentication.prole = response.prole;

				deferred.resolve(response);

			}).error(function (err, status) {
				_logOut();
				deferred.reject(err);
			});

			return deferred.promise;

		};

		function _fillAuthData() {

			var authData = localStorageService.get('authorizationData');
			if (authData) {
				_authentication.isAuth = true;
				_authentication.userName = authData.userName;
				_authentication.useRefreshTokens = authData.useRefreshTokens;
				_authentication.displayName = authData.displayName;
				_authentication.roles = authData.roles;
				_authentication.prole = authData.prole;
			}

		};

		function _refreshToken() {
			var deferred = $q.defer();

			var authData = localStorageService.get('authorizationData');

			if (authData) {

				if (authData.useRefreshTokens) {

					var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + IdSysSettings.clientId;

					localStorageService.remove('authorizationData');

					$http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

						localStorageService.set('authorizationData', { token: response.access_token, userName: response.userName, refreshToken: response.refresh_token, useRefreshTokens: true,  displayName: response.displayName, roles: response.roles, prole: _getPRole(response.roles) });

						deferred.resolve(response);

					}).error(function (err, status) {
						_logOut();
						deferred.reject(err);
					});
				}
			}

			return deferred.promise;
		};

		function _getUserData(){
			var deferred = $q.defer();

			$http.get(serviceBase + 'UserData')
			.success(function (result, status, headers, config) {
				deferred.resolve(result);
			})
			.error(function (result, status, headers, config) {
				deferred.reject(result, status);
			});
			return deferred.promise;

		}

		function _sendForgetPasswordEmail(email){

			var data = "email=" + encodeURI(email) + "&url=" + encodeURI(IdSysSettings.forgetPasswordUrl);
			var deferred = $q.defer();


			$http.post(serviceBase + 'Password/Forgot', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
				.success(function (response) {					
					deferred.resolve(response);

				}).error(function (data, status, headers, config) {
					deferred.reject(data);
				});

			
			return deferred.promise;
		}


		function _reSendVarificationEmail(email) {
			var deferred = $q.defer();
			//SendConfirmationEmail
			//   ConfirmEmail
			$http.get(serviceBase + 'SendConfirmationEmail?email=' + escape(email) + '&url=' + escape(IdSysSettings.confirmationUrl))
			.success(function (result, status, headers, config) {
				deferred.resolve(result);
			})
			.error(function (result, status, headers, config) {
				deferred.reject(result, status);
			});
			return deferred.promise;
		}

		function _confirmEmail(confirmEmailData) {

			var data = "email=" + encodeURI(confirmEmailData.email) + "&password=" + encodeURI(confirmEmailData.password) + "&code=" + encodeURI(confirmEmailData.code);
			var deferred = $q.defer();

			$http.post(serviceBase + 'ConfirmEmail', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
				.success(function (response) {					
					deferred.resolve(response);

				}).error(function (data, status, headers, config) {
					deferred.reject(data);
				});
		   
			return deferred.promise;
		}

		function _getPRole(roles) {
			var prole = '';
			if (roles)
			{
				if ($.type(roles) === 'string') {
					if (roles.indexOf(",") >= 0) {
						roles = roles.split(",");
					}
					else {
						prole = roles;
					}
				}
				if ($.isArray(roles)) {
					if ($.inArray('Admin', roles) >= 0) {
						prole = 'Admin';
					}
					else if ($.inArray('Member', roles) >= 0) {
						prole = 'Member';
					}
				}
			}
			
			
			return prole;
		}

		function _authorizationCheck() {
			if(!_isLoggedIn())
			{
				window.location = IdSysSettings.loginUrl; //"/account/#/login";
			}
			//var authData = localStorageService.get('authorizationData');
			//if (!authData) {
			//    window.location = IdSysSettings.loginUrl; //"/account/#/login";

			//}
		}

		function _isLoggedIn() {
		    return _authentication.isAuth;
		}

		
		function _getErrStrFromModelState(modelState) {
		    if (modelState) {
		        var errors = [];
		        for (var key in modelState){
		            for (var i = 0; i < modelState[key].length; i++) {
		                errors.push(modelState[key][i]);
		            }
		        }
		        return errors.join(' ');
		    }
		    return '';
		    
		}

		function _resetPassword(resetPwdData) {
		    var data = "email=" + encodeURI(resetPwdData.email)
		    			+ "&password=" + encodeURI(resetPwdData.password)
		    			+ "&confirmPassword=" + encodeURI(resetPwdData.confirmPassword)
		    			+ "&code=" + encodeURI(resetPwdData.code);

		    var deferred = $q.defer();

		    $http.post(serviceBase + 'Password/Reset', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
				.success(function (response) {
				    deferred.resolve(response);

				}).error(function (data, status, headers, config) {
				    deferred.reject(data);
				});

		    return deferred.promise;
		}

		

	} //EOF   AuthService
})();
///#source 1 1 /ngApps/core/PBDesk.IdSys.AuthInterceptorService.factory.js
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

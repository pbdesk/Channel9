(function () {
	'use strict';

	angular
		.module('PBDesk.C9Core')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http', '$q', 'localStorageService', 'C9Settings'];

	function AuthService($http, $q, localStorageService, C9Settings) {

		var serviceBase = C9Settings.apiServiceBaseUrl;
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
			login: _login,
			logout: _logOut,
			isLoggedIn: _isLoggedIn,
			fillAuthData: _fillAuthData,
			refreshToken: _refreshToken,
			getUserData: _getUserData,
			authorizationCheck: _authorizationCheck,
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

		

		function _login(loginData) {

			var data = "grant_type=password&username=" + loginData.userName + "&password=" + loginData.password;

			// if Use Refresh Tokens checkbox is checked on
			if (loginData.useRefreshTokens) {
				data = data + "&client_id=" + C9Settings.clientId;
			}

			var deferred = $q.defer();

			$http.post(serviceBase + 'token', data, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } }).success(function (response) {

			    var prole = _getPRole(response.roles);
			    if (prole === C9Settings.allowedRole) {
			        localStorageService.set('authorizationData', { token: response.access_token, refreshToken: response.refresh_token, useRefreshTokens: true, userName: loginData.userName, displayName: response.displayName, roles: response.roles, prole: prole });
			        _fillAuthData();
			        deferred.resolve(response);
			    }
			    else {
			        _logOut();
			        deferred.reject("Insufficient Credentials");
			    }								
			}).error(function (err, status) {
				_logOut();
				deferred.reject(err);
			});

			return deferred.promise;

		};

		function _fillAuthData() {

			var authData = localStorageService.get('authorizationData');
			if (authData && authData.prole === C9Settings.allowedRole) {
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

					var data = "grant_type=refresh_token&refresh_token=" + authData.refreshToken + "&client_id=" + C9Settings.clientId;

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

		function _getPRole(roles) {
			var prole = '';
			if (roles)
			{
				if ($.type(roles) === 'string') {
					if (roles.indexOf(",") >= 0) {
						roles = roles.split(",");
					}
					else {
					    if (prole === C9Settings.allowedRole) {
					        prole = roles;
					    }						
					}
				}
				if ($.isArray(roles)) {
				    if ($.inArray(C9Settings.allowedRole, roles) >= 0) {
				        prole = C9Settings.allowedRole;
					}					
				}
			}
						
			return prole;
		}

		function _authorizationCheck() {
			if(!_isLoggedIn())
			{
				window.location = C9Settings.loginUrl; 
			}
			
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



		

	} //EOF   AuthService
})();
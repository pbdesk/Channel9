(function () {
	'use strict';

	var coreApp = angular.module('PBDesk.C9Core');

	var appUrl = 'http://localhost:12551/';
	var idSysUrl = 'http://idsys.azurewebsites.net/';
	coreApp.constant('C9Settings', {
	    apiServiceBaseUrl: idSysUrl + 'IdSys/api/',
		clientBaseUrl: appUrl,
		clientId: 'C9LocalHost',
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

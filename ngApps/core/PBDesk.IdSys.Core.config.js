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

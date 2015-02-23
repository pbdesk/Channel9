(function () {
	'use strict';

	var coreApp = angular.module('PBDesk.C9Core');

	var appUrl = window.c9Configs.appUrl;
	var idSysUrl = window.c9Configs.idSysUrl;
	coreApp.constant('C9Settings', {
	    apiServiceBaseUrl: idSysUrl + 'IdSys/api/',
		clientBaseUrl: appUrl,
		clientId: 'C9LocalHost',		
		loginUrl: '/Login',
		allowedRole: window.c9Configs.allowedRole
		
	});


})();

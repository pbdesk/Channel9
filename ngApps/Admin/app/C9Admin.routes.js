(function () {
	'use strict';

	angular.module('PBDesk.C9Admin')
		.config(configRoutes);

	function configRoutes($routeProvider){
		var viewPath = '/ngApps/Admin/';

		$routeProvider.when("/", {
			controller: "homeController",
			templateUrl: viewPath + "home/home.html" ,
			controllerAs: 'vm',
			caseInsensitiveMatch: true
		});

		$routeProvider.when("/logout", {
		    controller: "logoutController",
		    templateUrl: viewPath + "logout/logout.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		

		$routeProvider.otherwise({ redirectTo: "/" });
	}
})();
(function () {
	'use strict';

	angular.module('PBDesk.C9VApp')
		.config(configRoutes);

	function configRoutes($routeProvider){
		var viewPath = '/ngApps/Visitor/';

		$routeProvider.when("/", {
			controller: "homeController",
			templateUrl: viewPath + "home/home.html" ,
			controllerAs: 'vm',
			caseInsensitiveMatch: true
		});

		//$routeProvider.when("/Categories", {
		//	controller: "categoriesController",
		//	templateUrl: viewPath + "categories/list.html",
		//	controllerAs: 'vm',
		//	caseInsensitiveMatch: true
		//});

		

		$routeProvider.otherwise({ redirectTo: "/" });
	}
})();
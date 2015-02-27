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

		$routeProvider.when("/refresh", {
		    controller: "refreshController",
		    templateUrl: viewPath + "refresh/refresh.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		$routeProvider.when("/categories", {
		    controller: "categoriesController",
		    templateUrl: viewPath + "categories/list.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		$routeProvider.when("/categories/create", {
		    controller: "categoriesController",
		    templateUrl: viewPath + "categories/item.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		$routeProvider.when("/categories/edit/:id", {
		    controller: "categoriesController",
		    templateUrl: viewPath + "categories/item.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		$routeProvider.when("/Items", {
		    controller: "itemsController",
		    templateUrl: viewPath + "items/list.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		$routeProvider.when("/Items/Create", {
		    controller: "createItemController",
		    templateUrl: viewPath + "items/item.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		$routeProvider.when("/Items/Edit/:id", {
		    controller: "editItemController",
		    templateUrl: viewPath + "items/item.html",
		    controllerAs: 'vm',
		    caseInsensitiveMatch: true
		});

		$routeProvider.otherwise({ redirectTo: "/" });
	}
})();
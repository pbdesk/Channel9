(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('createCategoriesController', createCategoriesController);

    createCategoriesController.$inject = ['$location']; 

    function createCategoriesController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'createCategoriesController';

        init();

        function init() { }
    }
})();

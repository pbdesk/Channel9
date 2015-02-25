(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('editCategoriesController', editCategoriesController);

    editCategoriesController.$inject = ['$location']; 

    function editCategoriesController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'editCategoriesController';

        init();

        function init() { }
    }
})();

(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('createItemController', createItemController);

    createItemController.$inject = ['$location']; 

    function createItemController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'createItemController';

        init();

        function init() { }
    }
})();

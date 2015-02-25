(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('refreshController', refreshController);

    refreshController.$inject = ['$location']; 

    function refreshController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'refreshController';

        init();

        function init() { }
    }
})();

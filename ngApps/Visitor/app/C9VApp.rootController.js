﻿(function () {
    'use strict';

    angular
        .module('PBDesk.C9VApp')
        .controller('rootController', rootController);

    rootController.$inject = ['$location'];

    function rootController($location) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = 'C9VApp';

        activate();

        function activate() { }
    }
})();

(function () {
    'use strict';

    angular
        .module('PBDesk.C9VApp')
        .controller('homeController', homeController);

    homeController.$inject = ['$location']; 

    function homeController($location) {
     
        var vm = this;
        vm.title = 'homeController';

        activate();

        function activate() { }
    }
})();

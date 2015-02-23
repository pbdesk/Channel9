(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('logoutController', logoutController);

    logoutController.$inject = ['$location', 'AuthService'];

    function logoutController($location, AuthService) {
     
        var vm = this;
       

        activate();

        function activate() {
            AuthService.logout();
            window.location = '/';
        }
    }
})();

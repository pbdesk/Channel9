(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('C9AdminCtrl', C9AdminCtrl);

    C9AdminCtrl.$inject = ['$location', 'C9Settings', 'AuthService'];

    function C9AdminCtrl($location, C9Settings, AuthService) {
        /* jshint validthis:true */
        var VM = this;
        VM.isC9Admin = false;
        VM.displayName = '';

        init();

        VM.logout = function () {
            AuthService.logout();
            window.location = '/';
        }
        

        function init() {
            AuthService.fillAuthData();
            if (AuthService.isLoggedIn) {
                VM.displayName = AuthService.authData.displayName;
                if (AuthService.authData.prole === C9Settings.allowedRole) {
                    VM.isAdmin = true;
                }
            }
        }
    }
})();

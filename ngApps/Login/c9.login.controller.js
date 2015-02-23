(function () {
    'use strict';

    angular
        .module('PBDesk.C9Login')
        .controller('c9LoginCtrl', c9LoginCtrl);

    c9LoginCtrl.$inject = ['$location', 'AuthService', 'C9Settings'];

    function c9LoginCtrl($location, AuthService, C9Settings) {
        /* jshint validthis:true */
        var vm = this;
        vm.loginData = {
            userName: "",
            password: "",
            useRefreshTokens: true
        };

        init();

        vm.login = function () {

            vm.message = '';
            AuthService.login(vm.loginData).then(function (response) {                
                window.location = "/Admin";
            },
             function (err) {
                 switch (err.error) {
                     case 'invalid_grant':
                         vm.message = err.error_description;
                         break;
                     case 'invalid_clientId':
                         vm.message = err.error_description;
                         break;
                     case 'email_confirmation_pending':
                         $('#email_confirmation_pending').modal({
                             backdrop: 'static'
                         });
                         break;
                     default:
                         vm.message = "Opps, seems some glitch in the system."
                 }



             });
        };


        function init() {
            AuthService.fillAuthData();
            alreadyLoggedInCheck();
        }

        function alreadyLoggedInCheck() {
            if (AuthService.isLoggedIn()) {
                $('#already_logged_in').modal({
                    backdrop: 'static'
                });
            }
        }
    }
})();

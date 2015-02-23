(function () {
    'use strict';

    var adminApp = angular.module('PBDesk.C9Admin', ['PBDesk.C9Core']);

    adminApp.run(['AuthService', 'C9Settings', function (AuthService, C9Settings) {
        AuthService.fillAuthData();
        AuthService.authorizationCheck();
        if (AuthService.isLoggedIn()) {
            var primaryRole = AuthService.authData.prole;
            if (primaryRole !== C9Settings.allowedRole) {
                $('#not_in_role').modal({
                    backdrop: 'static'
                });
            }
        }
    }]);
})();

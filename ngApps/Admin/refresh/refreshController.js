(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('refreshController', refreshController);

    refreshController.$inject = ['$location', 'Logger', 'AuthService'];

    function refreshController($location, Logger, AuthService) {

        var vm = this;


        init();

        function init() {
            var gotoUrl = $location.search().url;
            AuthService.refreshToken().then(function (response) {
                Logger.info('...Token Refreshed.')
                $location.url(gotoUrl);
            },
             function (err) {
                 //$location.path('/login');
                 window.location = "/Login";
             });

        }
    }
})();


(function () {
    'use strict';

    angular.module('PBDesk.C9App.Core', [
        'ngAnimate', 'ngRoute', 'ngSanitize',
        'blocks.exception', 'blocks.logger', 'blocks.router',
        'GoogleFeedsApp',
        'angular-data.DSCacheFactory'
    ]);
})();

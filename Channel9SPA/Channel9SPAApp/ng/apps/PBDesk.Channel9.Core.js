(function () {
    'use strict';

    var app = angular.module('PBDesk.Channel9.Core', [        
        'ngAnimate','ngRoute','ngSanitize',       
        'common','common.bootstrap',
        'ui.bootstrap', 'jmdobry.angular-cache', 'PBDesk.GoogleFeedsApp'
    ]);

    // Handle routing errors and success events
    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
})();
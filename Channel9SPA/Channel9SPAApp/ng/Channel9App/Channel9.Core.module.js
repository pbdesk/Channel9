(function () {
    'use strict';
    
    var app = angular.module('PBDesk.NGApps.Channel9.Core', [
         'ngAnimate', 'ngRoute', 'ngSanitize', 'ngResource',
        'PBDesk.MyCommon', 'PBDesk.GoogleFeedsApp',
        'ui.bootstrap', 'jmdobry.angular-cache'
    ]);
    
    // Handle routing errors and success events
    app.run(['$route',  function ($route) {
            // Include $route to kick start the router.
        }]);        
})();
(function () {
    'use strict';
    
    var app = angular.module('PBDesk.Channel9.Core', [
        // Angular modules 
        'ngAnimate',        
        'ngRoute',          
        'ngSanitize',
        'ngResource',

        // Custom modules 
        'PBDesk.MyCommon',           
        'GoogleFeedsApp', 

        // 3rd Party Modules
        'ui.bootstrap',
        'jmdobry.angular-cache'
    ]);
    
    // Handle routing errors and success events
    app.run(['$route',  function ($route) {
            // Include $route to kick start the router.
        }]);        
})();
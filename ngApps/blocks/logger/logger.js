(function () {
    'use strict';

    angular
        .module('blocks.logger')
        .factory('logger', logger);

    logger.$inject = ['$log', 'toastr'];

    function logger($log, toastr) {
        var service = {
            showToasts: true,

            error: error,
            info: info,
            success: success,
            warning: warning,

            // straight to console; bypass toastr
            log: $log.log
        };

        return service;
        /////////////////////

        function error(message, data, title) {
            $log.error('Error: ' + message, data);
            if (service.showToasts) {
                toastr.error(message, title);
            }
            
        }

        function info(message, data, title) {
            $log.info('Info: ' + message, data);
            if (service.showToasts) {
                toastr.info(message, title);
            }
            
        }

        function success(message, data, title) {
            $log.info('Success: ' + message, data);
            if (service.showToasts) {
                toastr.success(message, title);
            }
            
        }

        function warning(message, data, title) {
            $log.warn('Warning: ' + message, data);
            if (service.showToasts) {
                toastr.warning(message, title);
            }
            
        }
    }
}());

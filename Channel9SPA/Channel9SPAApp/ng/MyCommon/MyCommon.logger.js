
(function () {
    'use strict';
    var serviceId = 'MyLogger';
    angular.module('PBDesk.MyCommon').factory('MyLogger', ['$log', 'MyConfig', MyLogger]);

    function MyLogger($log, MyConfig) {
        var service = {
            GetLogFn: getLogFn,
            Log: log,
            Error: logError,
            Success: logSuccess,
            Warning: logWarning,
            Info: log
        };

        return service;

        function getLogFn(moduleId, fnName) {
            fnName = fnName || 'log';
            switch (fnName.toLowerCase()) { // convert aliases
                case 'success':
                    fnName = 'logSuccess'; break;
                case 'error':
                    fnName = 'logError'; break;
                case 'warn':
                    fnName = 'logWarning'; break;
                case 'warning':
                    fnName = 'logWarning'; break;
            }

            var logFn = service[fnName] || service.log;
            return function (msg, data, showToast) {
                logFn(msg, data, moduleId, (showToast === undefined) ? true : showToast);
            };
        }

        function getShowToastValue(showToast) {
            if (showToast === undefined) { showToast = false; }
            if (showToast === false) { return MyConfig.config.LogToastingEnabled; }
            else { return showToast; }
           
        }
        function log(message, data, source, showToast) {            
            logIt(message, data, source, showToast, 'info');
        }

        function logWarning(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'warning');
        }

        function logSuccess(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'success');
        }

        function logError(message, data, source, showToast) {
            logIt(message, data, source, showToast, 'error');
        }

        function logIt(message, data, source, showToast, toastType) {
            showToast = getShowToastValue(showToast);
            source = source ? '[' + source + '] ' : '';

            switch (toastType.toLowerCase()) { // convert aliases
                case 'success':
                    {
                        $log.info('Success: ' + message, data);
                        if (showToast) {
                            toastr.success(message);
                        }
                        break;
                    }
                case 'error':
                    {
                        $log.error('Error: ' + message, data);
                        if (showToast) {
                            toastr.error(message);
                        }
                        break;
                    }
                case 'warn':
                    {
                        $log.warn('Warning: ' + message, data);
                        if (showToast) {
                            toastr.warning(message);
                        }
                        break;
                    }
                case 'warning':
                    {
                        $log.warn('Warning: ' + message, data);
                        if (showToast) {
                            toastr.warning(message);
                        }
                        break;
                    }
                default:
                    {
                        $log.info('Info: ' + message, data);
                        if (showToast) {
                            toastr.info(message);
                        }
                        break;
                    }

            }

            //if (toastType === 'error') {
            //    $log.error('Error: ' + message, data);
            //    if (showToast) {
            //        toastr.error(message);
            //    }
            //} else if (toastType === 'warning') {
            //    $log.warn('Warning: ' + message, data);
            //    if (showToast) {
            //        toastr.warning(message);
            //    }
            //} else if (toastType === 'success') {
            //    $log.info('Success: ' + message, data);
            //    if (showToast) {
            //        toastr.success(message);
            //    }
            //} else {
            //    $log.info('Info: ' + message, data);
            //    if (showToast) {
            //        toastr.info(message);
            //    }
            //}
            //if (showToast) {
            //    if (toastType === 'error') {
            //        toastr.error(message);
            //    } else if (toastType === 'warning') {
            //        toastr.warning(message);
            //    } else if (toastType === 'success') {
            //        toastr.success(message);
            //    } else {
            //        toastr.info(message);
            //    }
            //}
        }
    }
})();
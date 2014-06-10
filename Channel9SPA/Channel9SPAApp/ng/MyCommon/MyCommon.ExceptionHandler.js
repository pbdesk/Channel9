// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function (angular) {
    'use strict';

    var commonModule = angular.module('PBDesk.MyCommon');

    // Must configure the service and set its
    // events via the exceptionConfigProvider
    commonModule.provider('exceptionConfig', function () {
        this.config = {
            // These are the properties we need to set
            //appErrorPrefix: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });

    // Configure by setting an optional string value for appErrorPrefix.
    // Accessible via config.appErrorPrefix (via config value).
    commonModule.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler', ['$delegate', 'AppConfig', 'MyLogger',   extendExceptionHandler]);
    }]);

    // Extend the $exceptionHandler service to also display a toast.
    function extendExceptionHandler($delegate, AppConfig, MyLogger) {
        var appErrorPrefix = AppConfig.appErrorPrefix || '';
        return function (exception, cause) {
            $delegate(exception, cause);
            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix + exception.message;
            MyLogger.Error(msg, errorData, 'PBDesk.MyCommon.ExceptionHandler', false);
        };
    }
})(this.angular);
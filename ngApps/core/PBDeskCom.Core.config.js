(function () {
    'use strict';

    var core = angular.module('PBDeskCom.Core');

    core.config(toastrConfig);

    toastrConfig.$inject = ['toastr'];

    function toastrConfig(toastr) {
        toastr.options.timeOut = 4000;
        toastr.options.positionClass = 'toast-bottom-right';
    }

    var appConfig = {
        appErrorPrefix: '[PBDeskCom.Core Error] ', //Configure the exceptionHandler decorator
        appTitle: 'PBDeskCom.Core',
        version: '1.0.0'
    };

    core.value('appConfig', appConfig);

    core.config(configure);

    configure.$inject = ['$logProvider', 'exceptionHandlerProvider'];
    function configure($logProvider, exceptionHandlerProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }

       

        // Configure the common exception handler
        exceptionHandlerProvider.configure(appConfig.appErrorPrefix);
    }
})();

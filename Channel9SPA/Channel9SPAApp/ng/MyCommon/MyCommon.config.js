(function () {
    'use strict';

    var commonModule = angular.module('PBDesk.MyCommon');

    // Must configure the common service and set its
    // events via the commonConfigProvider
    commonModule.provider('MyConfig', function () {
        this.config = {
            LogToastingEnabled: true
            // These are the properties we need to set
            //controllerActivateSuccessEvent: '',
            //spinnerToggleEvent: ''
        };

        this.$get = function () {
            return {
                config: this.config
            };
        };
    });
})();
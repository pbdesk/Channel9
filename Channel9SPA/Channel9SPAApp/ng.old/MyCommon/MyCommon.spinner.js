(function () {
    'use strict';

    // Must configure the common service and set its 
    // events via the commonConfigProvider
    var serviceId = 'MySpinner';
    angular.module('PBDesk.MyCommon')
        .factory('MySpinner', ['MyCommon', 'MyConfig', MySpinner]);

    function MySpinner(MyCommon, MyConfig) {
        var service = {
            spinnerHide: spinnerHide,
            spinnerShow: spinnerShow
        };

        return service;

        function spinnerHide() { spinnerToggle(false); }

        function spinnerShow() { spinnerToggle(true); }

        function spinnerToggle(show) {
            MyCommon.$broadcast(MyConfig.config.spinnerToggleEvent, { show: show });
        }
    }
})();
(function () { 
    'use strict';
    
    var controllerId = 'shell';
    angular.module('PBDesk.NGApps.Channel9.App').controller(controllerId,
        ['$rootScope', 'MyCommon', 'C9AppConfig', shell]);

    function shell($rootScope, MyCommon, C9AppConfig) {
        var vm = this;
        var logSuccess = MyCommon.logger.getLogFn(controllerId, 'success');
        var events = C9AppConfig.events;
        vm.busyMessage = 'Please wait ...';
        vm.isBusy = true;
        vm.spinnerOptions = {
            radius: 40,
            lines: 7,
            length: 0,
            width: 30,
            speed: 1.7,
            corners: 1.0,
            trail: 100,
            color: '#F58A00'
        };

        activate();

        function activate() {
            logSuccess('Hot Towel Angular loaded!', null, true);
            MyCommon.activateController([], controllerId);
        }

        function toggleSpinner(on) { vm.isBusy = on; }

        $rootScope.$on('$routeChangeStart',
            function (event, next, current) { toggleSpinner(true); }
        );
        
        $rootScope.$on(events.controllerActivateSuccess,
            function (data) { toggleSpinner(false); }
        );

        $rootScope.$on(events.spinnerToggle,
            function (data) { toggleSpinner(data.show); }
        );
    };
})();
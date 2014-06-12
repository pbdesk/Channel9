(function () {
    'use strict';
    var controllerId = 'dashboard';
    angular.module('app').controller(controllerId, ['common', 'C9Data', dashboard]);

    function dashboard(common, C9Data) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.news = {
            title: 'Hot Towel Angular',
            description: 'Hot Towel Angular is a SPA template for Angular developers.'
        };
        vm.title = 'Dashboard';
        vm.C9Data = C9Data;


        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

    }
})();
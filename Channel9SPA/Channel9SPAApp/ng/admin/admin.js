(function () {
    'use strict';
    var controllerId = 'admin';
    angular.module('PBDesk.Channel9.App').controller(controllerId, ['common', 'C9Data', admin]);

    function admin(common, C9Data) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.title = 'Admin';

        activate();

        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
        }
    }
})();
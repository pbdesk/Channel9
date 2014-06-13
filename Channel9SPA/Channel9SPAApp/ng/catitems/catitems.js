(function () {
    'use strict';
    var controllerId = 'catitems';
    angular.module('PBDesk.Channel9.App').controller(controllerId, ['$location', 'common', 'C9Data', catitems]);

    function catitems($location, common, C9Data) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);
        var vm = this;
        vm.C9Data = C9Data;
        vm.Items = [];
        vm.title = '';
        vm.Layout = 1; // 1=list, 2= grid

        var url = $location.url().toLowerCase() ;
        
        if (url.indexOf("/shows") > -1) {
            vm.title = 'Shows';
            vm.Items = C9Data.Shows;
        }
        else if(url.indexOf("/series") > -1) {
            vm.title = 'Series';
            vm.Items = C9Data.Series;
        }

        vm.ChangeLayout = function (layoutMode) {
            vm.Layout = layoutMode;
        }

       
        

        activate();
  
        function activate() {
            common.activateController([], controllerId)
                .then(function () { log('Activated Admin View'); });
        }
    }
})();
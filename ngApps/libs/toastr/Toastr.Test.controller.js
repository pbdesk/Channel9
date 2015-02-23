(function () {
    'use strict';

    angular
        .module('PBDesk.Toastr')
        .controller('ToastrTestController', ToastrTestController);

    ToastrTestController.$inject = ['$scope', 'Toastr', 'ToastrFactory'];

    function ToastrTestController($scope, Toastr, ToastrFactory) {
    	$scope.title = 'Toastr Test';

    	$scope.pop = function () {
    		Toastr.info('msg', 'ttl');
    		ToastrFactory.toastr.warning('warning');
    		ToastrFactory.popSuccess('smag', 'stitle');
    		ToastrFactory.popError('smag', 'stitle');
    		ToastrFactory.popWarning('smag', 'stitle');
    		ToastrFactory.popInfo('smag', 'stitle');
    	}
    }
})();

(function () {
    'use strict';

    angular.module('PBDesk.Toastr', [])
		.constant('Toastr', window.toastr);
})();
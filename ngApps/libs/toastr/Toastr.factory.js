(function () {
    'use strict';

    angular
        .module('PBDesk.Toastr')
        .factory('ToastrFactory', ToastrFactory);

    ToastrFactory.$inject = ['Toastr'];

    function ToastrFactory(Toastr) {
    	var service = {
			toastr: Toastr,
        	setOptions: setOptions,
        	popSuccess: popSuccess,
        	popError: popError,
        	popWarning: popWarning,
			popInfo: popInfo
        };

        return service;

        function setOptions(toastrOptions) {
        
        	if (toastrOptions !== 'undefined') {
        		Toastr.options = toastrOptions;
        	}
        	else {
        		Toastr.options = {
        			"closeButton": true,
        			"debug": false,
        			"newestOnTop": true,
        			"progressBar": true,
        			"positionClass": "toast-bottom-right",
        			"preventDuplicates": false,
        			"onclick": null,
        			"showDuration": "300",
        			"hideDuration": "1000",
        			"timeOut": "5000",
        			"extendedTimeOut": "1000",
        			"showEasing": "swing",
        			"hideEasing": "linear",
        			"showMethod": "fadeIn",
        			"hideMethod": "fadeOut"
        		};
        	}
        }

        function popSuccess(msg, title, options) {
        	pop('success', msg, title, options);
        }
        function popError(msg, title, options) {
        	pop('error', msg, title, options);
        }
        function popWarning(msg, title, options) {
        	pop('warning', msg, title, options);
        }
        function popInfo(msg, title, options) {
        	pop('info', msg, title, options);
        }

        function pop(popType, msg, title, options) {
        	setOptions(options);
        	Toastr[popType](msg, title);
        }
    }
})();


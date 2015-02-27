(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('editItemController', editItemController);

    editItemController.$inject = ['$location', '$routeParams', 'Logger', 'itemsFactory'];

    function editItemController($location, $routeParams, Logger, itemsFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.title = "Edit Item";
        vm.currentId = $routeParams.id;
        vm.item = {};
        vm.cats = [];
        vm.availableCats = [];
        vm.selectedCats = [];


        init();

        function init() {
            
            getCats(false);
            
        }

        function getItem() {
            itemsFactory
                .getItem(vm.currentId)
                .then(function (result) {
                    angular.copy(result, vm.item);
                    getAvailableSelectedCats();

                }, function (result, status, headers, httpconfig) {
                    Logger.error("Opps, seems something went wrong...");

                });
        }

        function getCats(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            itemsFactory
                .getCategories(hardRefresh)
                .then(function (result) {
                    angular.copy(result, vm.cats);
                    getItem();

                }, function (result, status, headers, httpconfig) {
                    Logger.error("Opps, seems something went wrong...");

                });

        }

        //#region ngDrraggable
        vm.centerAnchor = true;
        vm.toggleCenterAnchor = function () { vm.centerAnchor = !vm.centerAnchor }

        
        vm.onDropComplete1 = function (data, evt) {
            var index = vm.availableCats.indexOf(data);
            if (index == -1)
                vm.availableCats.push(data);
        }
        vm.onDragSuccess1 = function (data, evt) {
            console.log("133", "vm", "onDragSuccess1", "", evt);
            var index = vm.availableCats.indexOf(data);
            if (index > -1) {
                vm.availableCats.splice(index, 1);
            }
        }
        vm.onDragSuccess2 = function (data, evt) {
            var index = vm.selectedCats.indexOf(data);
            if (index > -1) {
                vm.selectedCats.splice(index, 1);
            }
        }
        vm.onDropComplete2 = function (data, evt) {
            var index = vm.selectedCats.indexOf(data);
            if (index == -1) {
                vm.selectedCats.push(data);
            }
        }
        var inArray = function (array, obj) {
            var index = array.indexOf(obj);
        }
        //#endregion

        function getAvailableSelectedCats() {
            $.each(vm.cats, function (index, obj) {
                var currentLabel = obj.label;
                var found = false;
                $.each(vm.item.labels, function (idx, itm) {
                    if (itm == currentLabel) {
                        found = true;
                    }                    
                });
                if (found) {
                    vm.selectedCats.push(obj);
                }
                else {
                    vm.availableCats.push(obj);
                }
            });

        }
        
    }
})();

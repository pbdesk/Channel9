(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('createItemController', createItemController);

    createItemController.$inject = ['$location', 'Logger', 'c9CRUDFactory'];

    function createItemController($location, Logger, c9CRUDFactory) {
        /* jshint validthis:true */
        var vm = this;
        vm.viewMode = 1; // 1=Add, 2=Edit  as both are using same view item.html
        vm.title = "New Item";
        vm.item = {};
        vm.cats = [];
        vm.availableCats = [];
        vm.selectedCats = [];

        init();

        function init() {
            getCats(true);
        }

        function getCats(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            c9CRUDFactory
                .getAllLiteCats(hardRefresh)
                .then(function (result) {
                    angular.copy(result, vm.cats);
                    getAvailableSelectedCats()

                }, function (result, status, headers, httpconfig) {
                    Logger.error("Opps, seems something went wrong...");

                });

        }

        vm.save = function () {
            c9CRUDFactory.addItem(vm.item, 'C9Admin/Item/Create').then(function (response) {
                Logger.success('Record Inserted');

                var catsToUpd = [];
                $.each(vm.selectedCats, function (i, o) {
                    catsToUpd.push(o.id);
                });

                c9CRUDFactory.updateCatsForItem(response.id, catsToUpd).then(function () {
                    Logger.success('Categories Updated');
                }, function (error) {
                    Logger.error('error in category updates');
                });
            }, function (error) {
                Logger.error('error in insert');
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
            angular.copy(vm.cats,vm.availableCats)
           

        }
    }
})();

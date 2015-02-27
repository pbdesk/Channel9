(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('itemsController', itemsController);

    itemsController.$inject = ['$location',  'Logger', 'itemsFactory'];

    function itemsController($location,  Logger, itemsFactory) {
        /* jshint validthis:true */
        var vm = this;
        
        vm.cats = [];
        vm.items = [];
        vm.showItems = false;
        vm.isBusy = false;
        vm.currentCat = '';
       
        vm.selectCat = function (cat) {
            vm.currentCat = cat;
            getItems(vm.currentCat);
            
            
        }

        vm.refreshCats = function () {
            getCats(true)
        }

        vm.refreshList = function () {
            getItems(vm.currentCat);
        }

        

        init();

       





        

        function init() {
            getCats(false);
                        
        }

        function getCats(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            itemsFactory
                .getCategories(hardRefresh)
                .then(function (result) {
                    angular.copy(result, vm.cats);

                }, function (result, status, headers, httpconfig) {
                    Logger.error("Opps, seems something went wrong...");

                });

        }

        function getItems(cat) {
            vm.showItems = false;
            vm.isBusy = true;
            itemsFactory.getItemsByCat(cat).then(function (result) {
                angular.copy(result, vm.items);
                vm.isBusy = false;
                vm.showItems = true;
                vm.selectedCat = cat;
                if (vm.items.length === 0) {
                    Logger.info('Oops No Items Found For This Category');
                }
            }, function (error) {
                Logger.error(error);
            });
            vm.isBusy = false;

        }



    }
})();

﻿(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('filtersController', filtersController);

    filtersController.$inject = ['$location', 'Logger', 'c9CRUDFactory'];

    function filtersController($location, Logger, c9CRUDFactory) {
        /* jshint validthis:true */
        var vm = this;
        
        vm.cats = [];
        vm.items = [];
        vm.allItems = [];
        vm.selectedItems = [];
        vm.showItems = false;
        vm.isBusy = false;
        vm.currentCat = '';
        vm.currentCatId = 0;
       
        
        vm.selectCat = function (cat) {
            vm.currentCatId = cat.id;
            vm.currentCat = cat.label;
            getItemsForCat(vm.currentCat);
            
            
        }



        vm.refreshCats = function () {
            getCats(true)
        }

        vm.refreshList = function () {
            getAllItems(vm.currentCat);
        }

        vm.save = function () {
            var itemsToUpd = [];
            $.each(vm.items, function (i, o) {
                if (o.isSelected === true) {
                    itemsToUpd.push(o.id);
                }
            });

            c9CRUDFactory.updateItemsForCat(vm.currentCatId, itemsToUpd).then(function () {
                Logger.success('Items Updated');
            }, function (error) {
                Logger.error('error in Item updates');
            });
        }

        init();

       





        

        function init() {
            getAllCats(false);
            getAllItems(true);
                        
        }

        function getAllCats(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            c9CRUDFactory
                .getAllLiteCats(hardRefresh)
                .then(function (result) {
                    angular.copy(result, vm.cats);

                }, function (result, status, headers, httpconfig) {
                    Logger.error("Opps, seems something went wrong...");

                });

        }

        function getAllItems(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            vm.showItems = false;
            vm.isBusy = true;
            c9CRUDFactory.getAllLiteItems(hardRefresh).then(function (result) {
                angular.copy(result, vm.allItems);

                if (vm.allItems.length === 0) {
                    Logger.info('Oops No Items Found');
                }
                getItemsVM();
            }, function (error) {
                Logger.error(error);
            });
            vm.isBusy = false;

        }


        function getItemsForCat(cat) {
            vm.showItems = false;
          
            c9CRUDFactory.getLiteItemsByCat(cat).then(function (result) {
                angular.copy(result, vm.selectedItems);
                getItemsVM();
                if (vm.selectedItems.length === 0) {
                    Logger.info('Oops No Items Found For This Category');
                }
                vm.showItems = true;
            }, function (error) {
                Logger.error(error);
            });
           

        }

        function getItemsVM() {
            angular.copy(vm.allItems, vm.items);
            $.each(vm.items, function (index, obj) {
                var found = $.grep(vm.selectedItems, function (o) {
                    return o.id === obj.id;
                });
                if (found && found.length > 0) {
                    obj.isSelected = true;
                }
                else {
                    obj.isSelected = false;
                }
            });
        }

    }
})();

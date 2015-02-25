(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('categoriesController', categoriesController);

    categoriesController.$inject = ['$location', '$window', '$routeParams', 'Logger', 'categoryFactory'];

    function categoriesController($location, $window, $routeParams, Logger, categoryFactory) {
        /* jshint validthis:true */
        var vm = this;
        
        vm.items = categoryFactory.items;
        vm.item = {
            id: 0 ,
            imageUrl: '', 
            isFeatured: false,
            itemsCount: 0,
            label: ''
        }
        vm.viewMode = 0; //1- List, 2-Add, 3-Edit
        vm.sortField = "label";
        vm.sortReverse = false;

        init();

        vm.refreshList = function () {
            getItems(true);

        }

        vm.sort = function (fieldName) {
            if (vm.sortField === fieldName) {
                vm.sortReverse = !vm.sortReverse;
            }
            else {
                vm.sortField = fieldName;
                vm.sortReverse = true;
            }
        }

        vm.save = function () {
            if (vm.viewMode === 2) {   //2-Add
                categoryFactory.addItem(vm.item)
                    .then(function () {
                        //success
                        Logger.success('record added');
                        
                        $window.location = '#/Categories';
                    },
                function () {
                    //error
                    Logger.error('error adding new record');
                    //ToastError(PBDeskJS.StrUtils.Format("Error in createing new {0}[{0}sController]. Please refer to server logs.", config.sname));
                });
            }
            else {
                categoryFactory.updItem(vm.item)
                    .then(
                        function () {
                            //success
                            Logger.success('record updated');
                            //ToastSuccess(PBDeskJS.StrUtils.Format("{0} information updated successfully", config.sname));
                            $window.location = '#/Categories';
                        },
                        function () {
                            //error
                            Logger.error('error updating record');
                            //ToastError(PBDeskJS.StrUtils.Format("Error while saving {0} information.[{0}sController.Save - Edit]", config.sname));
                        }
                    );
                

            }
        }





        

        function init() {
            getItems(false);
            setViewMode();            
        }

        function getItems(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            categoryFactory
                .getItems(hardRefresh)
                .then(function () {
                    //Logger.info('Categories Loaded');
                    //Logger.success(vm.items.length);
                    ////angular.copy(result, vm.items);
                }, function (result, status, headers, httpconfig) {
                    //alert("error");
                    if (result && result.message && result.message == "Authorization has been denied for this request.") {
                        Logger.info('Refreshing Token...');
                    }
                    else {
                        Logger.error("Opps, seems something went wrong...");
                    }

                });

        }

        function getItem(id, hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            categoryFactory
                .getItem(id, hardRefresh)
                .then(function (result) {
                    angular.copy(result, vm.item);
                    Logger.info('Item Loaded');
                    
                    //angular.copy(result, vm.items);
                }, function (result, status, headers, httpconfig) {
                    //alert("error");
                    if (result && result.message && result.message == "Authorization has been denied for this request.") {
                        Logger.info('Refreshing Token...');
                    }
                    else {
                        Logger.error("Opps, seems something went wrong...");
                    }

                });

        }

        function setViewMode() {
            var url = $location.url().toLowerCase();
            if (url.indexOf('/create') > 0) {
                vm.viewMode = 2;
                vm.item = {
                    id: 0,
                    imageUrl: '',
                    isFeatured: false,
                    itemsCount: 0,
                    label: ''
                }
            }
            else if (url.indexOf('/edit') > 0) {
                vm.viewMode = 3;
                getItem($routeParams.id, true);

            }
            else {
                vm.viewMode = 1;               
            }

        }

    }
})();

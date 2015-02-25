(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .controller('categoriesController', categoriesController);

    categoriesController.$inject = ['$location', '$window', 'Logger', 'categoryFactory'];

    function categoriesController($location,$window, Logger, categoryFactory) {
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
        vm.viewMode = 1; //1- List, 2-Add, 3-Edit
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

        vm.Save = function () {
            if (vm.viewMode === 2) {   //2-Add
                categoryFactory.addItem(vm.item)
                    .then(function () {
                        //success
                        Logger.success('record added');
                        
                        $window.location = '#/category';
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
                            $window.location = '#/catergory';
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

        }

        function getItems(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            categoryFactory
                .getItems(hardRefresh)
                .then(function (result, status, headers, httpconfig) {
                    Logger.info('Categories Loaded');
                    Logger.success(vm.items.length);
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

    }
})();

(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .factory('itemsFactory', itemsFactory);

    itemsFactory.$inject = ['$http', '$q', 'localStorageService'];

    function itemsFactory($http, $q, localStorageService) {

        
        var cacheKey = 'categories';
        var apiUrl = window.c9Configs.dSvcUrl;

        var service = {
            getCategories: _getCategories,
            getItemsByCat: _getItemsByCat,
            getItem: _getItem          
            //addItem: _addItem,
            //updItem: _updItem,
            //delItem: _delItem

        };

        return service;

        function _getCategories(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            var cacheKeyCats = 'cats';
            var deferred = $q.defer();

            if (hardRefresh) {
                return _get_getCategoriesFromDB();
            }
            else {
                var cats = localStorageService.get(cacheKeyCats);
                if (cats) {
                    deferred.resolve(cats);
                }
                else {
                    return _getCategoriesFromDB();
                }
            }
            return deferred.promise;           
        }

        function _getCategoriesFromDB() {
            var deferred = $q.defer();
            var cacheKeyCats = 'cats';
            $http.get(apiUrl + 'C9Data/Lite/Categories')
                      .success(function (result, status, headers, httpconfig) {
                          localStorageService.set(cacheKeyCats, result);
                          deferred.resolve(result);
                      })
                      .error(function (result, status, headers, httpconfig) {
                          deferred.reject(result, status);
                      });
            return deferred.promise;

        }



        function _getItemsByCat(cat) {
            var deferred = $q.defer();
            $http.get(apiUrl + 'C9Data/Lite/Items/' + cat)
                       .success(function (result, status, headers, httpconfig) {
                           deferred.resolve(result);
                       })
                       .error(function (result, status, headers, httpconfig) {
                           if (result == null) {
                               result = [];
                               deferred.resolve(result);
                           }
                           else {
                               deferred.reject(result, status);
                           }
                       });
            return deferred.promise;
        }

        function _getItem(id) {
            var deferred = $q.defer();
            //_items = [];
            $http.get(apiUrl + 'C9Data/Item/' + id)
                       .success(function (result, status, headers, httpconfig) {
                           deferred.resolve(result);
                       })
                       .error(function (result, status, headers, httpconfig) {
                           deferred.reject(result, status);
                       });
            return deferred.promise;
        }

        function _getItems(hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            var deferred = $q.defer();

            if (hardRefresh === true) {
                _getItemsFromDB().then(function () { deferred.resolve(_items); }, function (result, status) { deferred.reject(result, status); });
            }
            else {
                if (_isReady()) {
                    deferred.resolve(_items);
                }
                else {
                    _getItemsFromDB().then(function () { deferred.resolve(_items); }, function (result, status) { deferred.reject(result, status); });
                }
            }
            return deferred.promise;
        }

        
         


        //function _addItem(newItem) {
        //    var deferred = $q.defer();

        //    $http.post(apiUrl + 'C9Admin/Category/Create', newItem)
        //        .success(function (result, status, headers, httpconfig) {                    
        //            result.itemsCount = result.items.length;
        //            delete result.items;
        //            _items.splice(0, 0, result);
        //            localStorageService.set(cacheKey, _items);
        //            deferred.resolve(result);

        //        })
        //        .error(function (result, status, headers, httpconfig) {
        //            deferred.reject(result, status);
        //        });
        //    return deferred.promise;
        //}

        //function _updItem(updItem) {
        //    var deferred = $q.defer();
        //    $http.put(apiUrl + 'C9Admin/Category/Update', updItem)
        //    .then(
        //        function (result, status, headers, httpconfig) {
        //            //success 
        //            var foundAtIndex = -1;
        //            $.each(_items, function (index, value) {
        //                if (value.id === updItem.id) {
        //                    foundAtIndex = index;
        //                }
        //            });

        //            if (foundAtIndex >= 0) {
        //                angular.copy(updItem, _items[foundAtIndex]);
        //                localStorageService.set(cacheKey, _items);
        //            }

                    
        //            deferred.resolve();
        //        },
        //        function (result, status, headers, httpconfig) {
        //            //error
        //            deferred.reject(result, status, headers, httpconfig);
        //        }
        //    );

        //    return deferred.promise;
        //}

        //function _delItem(item) {
        //    var deferred = $q.defer();
        //    $http.delete(apiUrl + 'C9Admin/Category/Delete/' + item.id)
        //    .then(
        //        function (result, status, headers, httpconfig) {
        //            //success
        //            var foundAtIndex = indexOfInArr(_items, item);
        //            if (foundAtIndex >= 0) {
        //                _items.splice(foundAtIndex, 1);
        //                localStorageService.set(cacheKey, _items);
        //            }
                    
        //            deferred.resolve();
        //        },
        //        function () {
        //            //error
        //            deferred.reject();
        //        }
        //    );

        //    return deferred.promise;

        //}

        //#region Private Functions
        function replaceItemInArr(array, item) {
            var foundAtIndex = indexOfInArr(array, item);
            if (foundAtIndex >= 0) {
                angular.copy(item, array[foundAtIndex]);
            }
        }

        function indexOfInArr(array, item) {
            var foundAtIndex = -1;
            $.each(array, function (index, value) {
                if (value.id === item.id) {
                    foundAtIndex = index;
                }
            });

            return foundAtIndex;

        }
        //#endregion
    }
})();
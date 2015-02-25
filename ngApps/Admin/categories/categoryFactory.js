(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .factory('categoryFactory', categoryFactory);

    categoryFactory.$inject = ['$http', '$q', 'localStorageService'];

    function categoryFactory($http, $q, localStorageService) {

        var _items = [];
        var cacheKey = 'categories';
        var apiUrl = window.c9Configs.dSvcUrl;

        var service = {
            items: _items,
            isReady: _isReady,
            getItems: _getItems,
            getItem: _getItem,
            getItemsFromDB: _getItemsFromDB,
            getItemFromDB: _getItemFromDB,
            addItem: _addItem,
            updItem: _updItem,
            delItem: _delItem

        };

        return service;

      

        function _isReady() {
            var tItems = localStorageService.get(cacheKey);
            if (tItems) {
                angular.copy(tItems, _items);
                return true;
            }                       
            else
                return false;
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


        function _getItemsFromDB() {
            var deferred = $q.defer();
            _items = [];
            $http.get(apiUrl + 'C9Data/Categories')
                       .success(function (result, status, headers, httpconfig) {
                           angular.copy(result, _items);
                           localStorageService.set(cacheKey, _items);
                           deferred.resolve(_items);                                               
                       })
                       .error(function (result, status, headers, httpconfig) {
                           deferred.reject(result, status);
                       });
            return deferred.promise;
        }

        function _getItemFromDB(id) {
            var deferred = $q.defer();
            _items = [];
            $http.get(apiUrl + 'C9Data/Categories')
                       .success(function (result, status, headers, httpconfig) {
                           angular.copy(result, _items);
                           localStorageService.set(cacheKey, _items);
                           deferred.resolve(_items);
                       })
                       .error(function (result, status, headers, httpconfig) {
                           deferred.reject(result, status);
                       });
            return deferred.promise;
        }

        function _getItem (id) {
            if (_isReady()) {
                var result = $.grep(_items, function (e) { return e.id == id; });
                if (result.length == 0) {
                    return null;
                } else if (result.length == 1) {
                    return result[0];
                } else {
                    return null;
                }
            }
            else
                return null;
        }

        function _addItem(newItem) {
            var deferred = $q.defer();

            $http.post(apiUrl + 'C9Admin/Category/Create', newItem)
                .success(function (result, status, headers, httpconfig) {
                    _items.splice(0, 0, result);
                    localStorageService.set(cacheKey, _items);
                    deferred.resolve(result);

                })
                .error(function (result, status, headers, httpconfig) {
                    deferred.reject(result, status);
                });
            return deferred.promise;
        }

        function _updItem(updItem) {
            var deferred = $q.defer();
            $http.put(apiUrl + 'C9Admin/Category/Update', updItem)
            .then(
                function (result, status, headers, httpconfig) {
                    //success 
                    var foundAtIndex = -1;
                    $.each(_items, function (index, value) {
                        if (value.id === updItem.id) {
                            foundAtIndex = index;
                        }
                    });

                    if (foundAtIndex >= 0) {
                        angular.copy(result, _items[foundAtIndex]);
                        localStorageService.set(cacheKey, _items);
                    }

                    
                    deferred.resolve();
                },
                function () {
                    //error
                    deferred.reject();
                }
            );

            return deferred.promise;
        }

        function _delItem(id, position) {
            var deferred = $q.defer();
            $http.delete(apiUrl + 'C9Admin/Category/Delete/' + id)
            .then(
                function (result, status, headers, httpconfig) {
                    //success
                    _items.splice(position, 1);
                    localStorageService.set(cacheKey, _items);
                    deferred.resolve();
                },
                function () {
                    //error
                    deferred.reject();
                }
            );

            return deferred.promise;

        }
    }
})();
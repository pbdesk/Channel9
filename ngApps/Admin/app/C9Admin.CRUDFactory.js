(function () {
    'use strict';

    angular
        .module('PBDesk.C9Admin')
        .factory('c9CRUDFactory', c9CRUDFactory);

    c9CRUDFactory.$inject = ['$http', '$q', 'localStorageService'];

    function c9CRUDFactory($http, $q, localStorageService) {

        
        //var cacheKeyLiteCats = 'cats';
        //var cachekeyLiteItems = 'items';
        var apiUrl = window.c9Configs.dSvcUrl;

        var service = {
            getData: _getData,
            addItem: _addItem,
            updItem: _updItem,
            delItem: _delItem,

            getItem: _getItem,
            getAllLiteCats: _getAllLiteCats,
            getAllLiteItems: _getAllLiteItems,
            getLiteItemsByCat: _getLiteItemsByCat,
            getItemsByCat: _getItemsByCat,
                
            
            updateCatsForItem: _updateCatsForItem,
            updateItemsForCat: _updateItemsForCat

        };

        return service;

        //#region Generic Methods

        function _getData(partialUrl, cacheKey, hardRefresh) {
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            if (typeof (cacheKey) === 'undefined') cacheKey = '';
            var deferred = $q.defer();

            if (hardRefresh) {
                return _getDataFromDB(partialUrl, cacheKey);
            }
            else {
                if (cacheKey.length > 0) {
                    var data = localStorageService.get(cacheKey);
                    if (data) {
                        deferred.resolve(data);
                    }
                    else {
                        return _getDataFromDB(partialUrl, cacheKey);
                    }
                }
                else {
                    return _getDataFromDB(partialUrl);
                }                
                
            }
            return deferred.promise;           
        }

        function _getDataFromDB(partialUrl, cacheKey) {
            if (typeof (cacheKey) === 'undefined') cacheKey = '';
            var deferred = $q.defer();
            $http.get(apiUrl + partialUrl)
                      .success(function (result, status, headers, httpconfig) {
                          if (cacheKey.length > 0) {
                              localStorageService.set(cacheKey, result);
                          }
                          deferred.resolve(result);
                      })
                      .error(function (result, status, headers, httpconfig) {
                          deferred.reject(result, status, headers, httpconfig);
                      });
            return deferred.promise;
        }

        function _addItem(newItem, partialUrl) {
            var deferred = $q.defer();
            $http.post(apiUrl + partialUrl, newItem)
                .success(function (result, status, headers, httpconfig) {
                    deferred.resolve(result);
                })
                .error(function (result, status, headers, httpconfig) {
                    deferred.reject(result, status, headers, httpconfig);
                });
            return deferred.promise;
        }

        function _updItem(updItem, partialUrl) {
            var deferred = $q.defer();
            $http.put(apiUrl + partialUrl, updItem)
            .then(
                function (result, status, headers, httpconfig) {

                    deferred.resolve(updItem);
                },
                function (result, status, headers, httpconfig) {

                    deferred.reject(result, status, headers, httpconfig);
                }
            );

            return deferred.promise;
        }

        function _delItem(item, partialUrl) {
            var deferred = $q.defer();
            $http.delete(apiUrl + partialUrl + item.id)
            .then(
                function (result, status, headers, httpconfig) {
                    //success                                       
                    deferred.resolve();
                },
                function (result, status, headers, httpconfig) {
                    //error
                    deferred.reject(result, status, headers, httpconfig);
                }
            );

            return deferred.promise;

        }

        //#endregion

        function _getAllLiteCats(hardRefresh) {
            return _getData('C9Data/Lite/Categories', 'cats', hardRefresh)
        }

        function _getAllLiteItems(hardRefresh) {
            return _getData('C9Data/Lite/Items', 'items', hardRefresh)
        }


        function _getLiteItemsByCat(cat) {
            return _getData('C9Data/Lite/Items/' + cat, '', true)            
        }

        function _getItemsByCat(cat) {
            return _getData('C9Data/Items/' + cat, '', true)
        }

        function _getItem(id) {
            return _getData('C9Data/Item/' + id, '', true)           
        }

        function _updateCatsForItem(itemId, catIds) {
            var data = {
                "itemId": itemId,
                "categoryIds": catIds
            }
            return _updItem(data, 'C9Admin/Item/UpdateCategories');
        }

        function _updateItemsForCat(catId, itemIds) {
            var data = {
                "categoryId": catId,
                "itemIds": itemIds
            }
            return _updItem(data, 'C9Admin/Category/UpdateItems');
        }


    }
})();
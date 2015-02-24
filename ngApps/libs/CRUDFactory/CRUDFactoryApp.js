(function () {
    'use strict';

    var id = 'CRUDFactoryApp';

    // TODO: Inject modules as needed.
    var CRUDFactoryApp = angular.module('CRUDFactoryApp', ['LocalStorageModule']);

    // Execute bootstrapping code and any dependencies.
    // TODO: inject services as needed.
    CRUDFactoryApp.run(['$q', '$rootScope',
        function ($q, $rootScope) {

        }]);
})();

(function () {
    'use strict';

    var serviceId = 'CRUDFactory';
    angular.module('CRUDFactoryApp').factory(serviceId, ["$http", "$q", 'CacheFactory',  CRUDFactory]);
    function CRUDFactory($http, $q, CacheFactory) {

        //#region Internal Methods        

        var _isReady = function (config) {
            if (CacheFactory.IsSessionCacheDefined(config.cacheKey)) {
                angular.copy(CacheFactory.GetSessionCache(config.cacheKey), config.items);
                return true;
            }
            else
                return false;
        }


        var _getItems = function (config, hardRefresh, resolveRef) {
            if (typeof (resolveRef) === 'undefined') resolveRef = false;
            if (typeof (hardRefresh) === 'undefined') hardRefresh = false;
            var deferred = $q.defer();

            if (hardRefresh === true) {
                _getItemsFromDB(config, resolveRef).then(function () { deferred.resolve(config.items); }, function (result, status) { deferred.reject(result, status); });
            }
            else {
                if (_isReady(config)) {
                    deferred.resolve(config.items);
                }
                else {
                    if (CacheFactory.IsSessionCacheDefined(config.cacheKey)) {
                        angular.copy(CacheFactory.GetSessionCache(config.cacheKey), config.items);
                        deferred.resolve(config.items);
                    }
                    else {
                        _getItemsFromDB(config, resolveRef).then(function () { deferred.resolve(config.items); }, function (result, status) { deferred.reject(result, status); });
                    }
                }
            }

            return deferred.promise;

        }

        var _getItemsFromDB = function (config, resolveRef) {
            if (typeof (resolveRef) === 'undefined') resolveRef = false;
            var deferred = $q.defer();
            $http.get(config.apiUrl)
                       .success(function (result, status, headers, httpconfig) {

                           if (resolveRef === true) {
                               var res = PBDeskJS.Utils.ResolveReferences(result.$values);
                               angular.copy(res, config.items);
                           }
                           else {
                               angular.copy(result.$values, config.items);
                           }                           
                           CacheFactory.SetSessionCache(config.cacheKey, config.items);
                           deferred.resolve(config.items);
                       })
                       .error(function (result, status, headers, httpconfig) {
                           deferred.reject(result, status);
                       });
            return deferred.promise;
        }

        var _getItem = function (config, id) {
            if (_isReady(config)) {
                var result = $.grep(config.items, function (e) { return e.Id == id; });
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

        var _addItem = function (config, newItem) {
            var deferred = $q.defer();

            $http.post(config.apiUrl, newItem)
                .success(function (result, status, headers, httpconfig) {


                    config.items.splice(0, 0, result);
                    CacheFactory.SetSessionCache(config.cacheKey, config.items);
                    deferred.resolve(result);

                })
                .error(function (result, status, headers, httpconfig) {
                    deferred.reject(result, status);
                });
            return deferred.promise;
        }


        var _updItem = function (config, updItem) {
            var deferred = $q.defer();
            $http.put(config.apiUrl + updItem.Id, updItem)
            .then(
                function (result, status, headers, httpconfig) {
                    //success 
                    var foundAtIndex = -1;
                    $.each(config.items, function (index, value) {
                        if (value.Id === updItem.Id ) {
                            foundAtIndex = index;
                        }
                    });

                    if (foundAtIndex >= 0) {
                        var res = PBDeskJS.Utils.ResolveReferences(result.data);
                        angular.copy(res, config.items[foundAtIndex]);
                    }

                    CacheFactory.SetSessionCache(config.cacheKey, config.items);
                    deferred.resolve();
                },
                function () {
                    //error
                    deferred.reject();
                }
            );

            return deferred.promise;
        }



        var _delItem = function (config, id, position) {
            var deferred = $q.defer();
            $http.delete(config.apiUrl + id)
            .then(
                function (result, status, headers, httpconfig) {
                    //success
                    config.items.splice(position, 1);
                    CacheFactory.SetSessionCache(config.cacheKey, config.items);
                    deferred.resolve();
                },
                function () {
                    //error
                    deferred.reject();
                }
            );

            return deferred.promise;

        }


        //#endregion

        var service = {
            GetItems: _getItems,
            GetItem: _getItem,
            AddItem: _addItem,
            UpdItem: _updItem,
            DelItem: _delItem,
            IsReady: _isReady
        };

        return service;
    }
})();

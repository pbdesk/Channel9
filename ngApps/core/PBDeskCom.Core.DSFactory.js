/// <reference path="F:\Pinal.Bhatt\Git\PBDesk2.VS\PBDesk2015\PBDesk2015\PBDesk.Web\Scripts/PBDeskUtlis/PBDeskUtils.js" />

(function () {
    'use strict';

    angular
        .module('PBDeskCom.Core')
        .factory('DSFactory', DSFactory);

    //DSCacheFactory is from angular-cache 3rd party lib
    DSFactory.$inject = ['$http', '$q', 'DSConfig', 'DSCacheFactory', 'exception', 'logger', 'GoogleFeedsFactory'];

    function DSFactory($http, $q, DSConfig, DSCacheFactory, exception, logger, GoogleFeedsFactory) {

        var PBDeskCache = DSCacheFactory('PBDeskCache', {
                capacity: 100,
                deleteOnExpire: 'aggressive',
                maxAge: 3600000,
                cacheFlushInterval: 3600000,
                storageMode: 'localStorage'
            });
        
        var baseUrl = "http://api.pbdesk.com/v1/";
        var cacheKeyPrefix = "pbdeskApi/"

        var service = {
                getData: getData,
                dsConfig: DSConfig,
                getGoogleFeeds: getGoogleFeeds
        };

        return service;



        function getData(svcObj, useCache) {
            if (typeof (svcObj.AllowCache) === 'undefined') svcObj.AllowCache = true;
            if (typeof (useCache) === 'undefined') useCache = true;

            var deferred = $q.defer();
            var data = useCache === true && svcObj.AllowCache === true ? PBDeskCache.get(cacheKeyPrefix +svcObj.CacheKey): null;
            if (data != null) {
                deferred.resolve(data);
            }
            else {
                var tSvcObj = {};
                angular.copy(svcObj, tSvcObj);

                if (arguments.length > 2) {
                    var args = Array.prototype.slice.call(arguments, 0);
                    var parameters = args.slice(2);

                    if (parameters != null && parameters.length > 0) {
                        tSvcObj.ApiUrl = PBDeskJS.StrUtils.Format(tSvcObj.ApiUrl, parameters);
                        tSvcObj.CacheKey = PBDeskJS.StrUtils.Format(tSvcObj.CacheKey, parameters);
                    }
                }

                getDataFromSvc(tSvcObj).then(
                    function (result) {
                        //success
                        if (svcObj.AllowCache === true) {
                            PBDeskCache.put(cacheKeyPrefix + svcObj.CacheKey, result);
                        }
                        deferred.resolve(result);
                    },
                    function (err) {
                        //error
                        deferred.reject(err);
                    });

            }
            return deferred.promise;
        }

        function getDataFromSvc(dSvcObj) {

            var deferred = $q.defer();

            $http.get(baseUrl + dSvcObj.ApiUrl)
            .success(function (result, status, headers, config) {
                deferred.resolve(result);
            })
            .error(function (result, status, headers, config) {
                deferred.reject(result, status);
            });
            return deferred.promise;
        }

        function getGoogleFeeds(feedSource) {
            /*
             feedSource:{
             RssLink: '',
             ItemCount: 0,
             FeedType: ''
             }
             */
            var deferred = $q.defer();
            if (feedSource != null && feedSource.RssLink != null) {
                GoogleFeedsFactory.getData(feedSource.RssLink, feedSource.ItemCount, feedSource.FeedType).then(
                   function (result) {
                       deferred.resolve(result);
                   },
                   function (error) {
                       //error
                       logger.error('Error making Data Api call for to GoogleFeedsFactory');
                       deferred.reject(error);
                       //NGF.MyLogger.Error("Error making Data Api call to GoogleFeeds. Please try again later.");
                       //NGF.MyLogger.Error("Error making Data Api call for News Items to GoogleFeedsFactory", error, 'PBDeskCom.App.TechNews/NewsItemsController', false);

                   });
            }
            else {
                deferred.reject('feedSource object is null or invalid');
            }
            return deferred.promise;

        }


    }
})();
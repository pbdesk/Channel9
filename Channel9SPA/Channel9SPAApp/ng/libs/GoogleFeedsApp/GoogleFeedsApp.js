var GoogleFeedsAppName = 'GoogleFeedsApp';
(function () {
    'use strict';


    // Module name is handy for logging
    var id = 'GoogleFeedsApp';


    // Create the module and define its dependencies.
    var GoogleFeedsApp = angular.module('GoogleFeedsApp', []);


    GoogleFeedsApp.factory('GoogleFeedsFactory', ['$q', GoogleFeedsFactory]);


    function GoogleFeedsFactory($q) {
        // Define the functions and properties to reveal.
        var service = {
            GetFeeds: getData
        };


        return service;


        function getData(rssUrl, itemCount, feedType) {
            var d = $q.defer();


            var feed = new google.feeds.Feed(rssUrl);
            feed.setNumEntries(itemCount);
            feed.setResultFormat(google.feeds.Feed.MIXED_FORMAT);
            feed.includeHistoricalEntries();
            feed.load(function (result) {
                if (!result.error) {
                    if (feedType === 'c9') {
                        ResolveRssMedia(result);
                    }
                    else if (feedType === 'ut') {
                        ResolveYouTubePlaylistRss(result);
                    }
                    d.resolve(result);
                }
                else {
                    d.reject(result.error);
                }
            });
            return d.promise;
        }

        function ResolveYouTubePlaylistRss(result) {


            for (var i in result.feed.entries) {


                jQuery(result.feed.entries[i].xmlNode).find("media\\:thumbnail, thumbnail").each(
                    function () {
                        var current = jQuery(this);
                        if (result.feed.entries[i].Thumbnail1 == null && current.attr("width") == "480") {
                            result.feed.entries[i].Thumbnail1 = current.attr("url");
                        }
                        else if (result.feed.entries[i].Thumbnail2 == null && current.attr("width") == "120") {
                            result.feed.entries[i].Thumbnail2 = current.attr("url");
                        }
                    });

                var link = result.feed.entries[i].link;
                var start = link.indexOf('?v=') + 3;
                var end = link.indexOf('&', start);
                var code = link.substring(start, end);
                result.feed.entries[i].VideoCode = code;



               

                result.feed.entries[i].pubDate = result.feed.entries[i].publishedDate.substring(0, 15);
            }


        }

        function ResolveRssMedia(result) {


            for (var i in result.feed.entries) {


                jQuery(result.feed.entries[i].xmlNode).find("media\\:thumbnail, thumbnail").each(
                    function () {
                        var current = jQuery(this);
                        if (current.attr("width") == "100") result.feed.entries[i].Thumbnail1 = current.attr("url");
                        if (current.attr("width") == "220") result.feed.entries[i].Thumbnail2 = current.attr("url");
                        if (current.attr("width") == "512") result.feed.entries[i].Thumbnail3 = current.attr("url");
                    });




                try {


                    for (var j in result.feed.entries[i].mediaGroups[0].contents) {
                        var media = result.feed.entries[i].mediaGroups[0].contents[j];
                        switch (media.type) {
                            case "audio/mp3": result.feed.entries[i].mp3 = media.url; break;
                            case "video/webm": result.feed.entries[i].webm = media.url; break;
                            case "video/mp4":
                                if (media.url.indexOf("_high.") > 0) result.feed.entries[i].mp4high = media.url;
                                else if (media.url.indexOf("_mid.") > 0) result.feed.entries[i].mp4mid = media.url;
                                else result.feed.entries[i].mp4reg = media.url;
                                break;
                        }
                    }


                }
                catch (err) {
                    continue;
                }
                if (typeof (result.feed.entries[i].Thumbnail1) == "undefined") result.feed.entries[i].Thumbnail1 = "";
                if (typeof (result.feed.entries[i].Thumbnail2) == "undefined") result.feed.entries[i].Thumbnail2 = "";
                if (typeof (result.feed.entries[i].Thumbnail3) == "undefined") result.feed.entries[i].Thumbnail3 = "";
                if (typeof (result.feed.entries[i].webm) == "undefined") result.feed.entries[i].webm = "";
                if (typeof (result.feed.entries[i].mp3) == "undefined") result.feed.entries[i].mp3 = "";


                if (typeof (result.feed.entries[i].mp4high) != "undefined")
                    result.feed.entries[i].mp4 = result.feed.entries[i].mp4high;
                else if (typeof (result.feed.entries[i].mp4mid) != "undefined")
                    result.feed.entries[i].mp4 = result.feed.entries[i].mp4mid;
                else if (typeof (result.feed.entries[i].mp4reg) != "undefined")
                    result.feed.entries[i].mp4 = result.feed.entries[i].mp4reg;
                else
                    result.feed.entries[i].mp4 = "";


                result.feed.entries[i].pubDate = result.feed.entries[i].publishedDate.substring(0, 15);
            }


        }




    }












})();


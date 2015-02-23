/* global toastr:false, moment:false */
(function () {
    'use strict';

    var DSConfig = {
        HomepageData: { ApiUrl: 'CachedData/HomepageData', CacheKey: 'homepagedata', AllowCache: true },
        MyPosts: {
            Featured: { ApiUrl: 'Featured/FeaturedPosts', CacheKey: 'featuredMyPosts', AllowCache: true },
            Recent: { ApiUrl: 'Featured/RecentPosts', CacheKey: 'recentMyPosts', AllowCache: true }
        },

        Decks: {
            Featured: { ApiUrl: 'Featured/Decks', CacheKey: 'featuredDecks', AllowCache: true }

        },

        Deck: {
            Featured: { ApiUrl: 'Featured/Deck', CacheKey: 'featuredDeck', AllowCache: true }
        },

        eBooks: {
            Featured: { ApiUrl: 'Featured/eBooks', CacheKey: 'featuredeBooks', AllowCache: true },
            ebod: { ApiUrl: 'Featured/ebod', CacheKey: 'ebodBooks', AllowCache: true },
            Data: { ApiUrl: 'cacheddata/ebooksdata', CacheKey: 'ebookscore', AllowCache: true },
            ByCat: { ApiUrl: 'eBooks/ByCat/{0}', CacheKey: 'ebookbycat{0}', AllowCache: false },
            Book: { ApiUrl: 'eBooks/book/{0}', CacheKey: 'ebook{0}', AllowCache: false }
        },
        Course: {
            Featured: { ApiUrl: 'Featured/Course', CacheKey: 'featuredCourse', AllowCache: true },
        },
        Courses: {
            All: { ApiUrl: 'Courses/All', CacheKey: 'courseAll', AllowCache: true },
            Featured: { ApiUrl: 'Featured/Courses', CacheKey: 'featuredCourses', AllowCache: true },
            New: { ApiUrl: 'Featured/Courses', CacheKey: 'newCourses', AllowCache: true },
            Catalog: { ApiUrl: 'Courses/Catalog', CacheKey: 'courseCatalog', AllowCache: true },
            Categories: { ApiUrl: 'Courses/Categories', CacheKey: 'courseCategories', AllowCache: true },
            ByCat: { ApiUrl: 'Courses/ByCat/{0}', CacheKey: 'coursesByCat{0}', AllowCache: true },
            AllTags: { ApiUrl: 'Courses/AllTags', CacheKey: 'coursesAllTags', AllowCache: true },
            ByTag: { ApiUrl: 'Courses/ByTag/{0}', CacheKey: 'coursesByTag{0}', AllowCache: true }
        },
        Courses_Item:
            { ApiUrl: 'Courses/course/{0}', CacheKey: 'courseItem{0}', AllowCache: false },
        FeedSource: {
            Technews: { ApiUrl: 'FeedSource/Technews', CacheKey: 'technewsFeeds', AllowCache: true },
            Articles: { ApiUrl: 'FeedSource/Articles', CacheKey: 'articlesFeeds', AllowCache: true }
        }

    };

    angular
        .module('PBDeskCom.Core')
        .constant('toastr', toastr)
        .constant('DSConfig', DSConfig);

    
        
})();

///#source 1 1 F:\Pinal.Bhatt\Git\GitHub\Channel9\Channel9SPA\Channel9SPAApp\ng\apps\PBDesk.Channel9.Core.js
(function () {
    'use strict';

    var app = angular.module('PBDesk.Channel9.Core', [        
        'ngAnimate','ngRoute','ngSanitize',       
        'common','common.bootstrap',
        'ui.bootstrap', 'jmdobry.angular-cache', 'PBDesk.GoogleFeedsApp'
    ]);

    // Handle routing errors and success events
    app.run(['$route', function ($route) {
        // Include $route to kick start the router.
    }]);
})();
///#source 1 1 F:\Pinal.Bhatt\Git\GitHub\Channel9\Channel9SPA\Channel9SPAApp\ng\apps\PBDesk.Channel9.App.js
(function () {
	'use strict';

	var app = angular.module('PBDesk.Channel9.App', ['PBDesk.Channel9.Core']);

	// Handle routing errors and success events
	app.run(['$route', function ($route) {
		// Include $route to kick start the router.
	}]);
})();
///#source 1 1 F:\Pinal.Bhatt\Git\GitHub\Channel9\Channel9SPA\Channel9SPAApp\ng\apps\PBDesk.Channel9.config.js
(function () {
    'use strict';

    var app = angular.module('PBDesk.Channel9.App');

    // Configure Toastr
    toastr.options.timeOut = 4000;
    toastr.options.positionClass = 'toast-bottom-right';



    var events = {
        controllerActivateSuccess: 'controller.activateSuccess',
        spinnerToggle: 'spinner.toggle'
    };

    var config = {
        appErrorPrefix: '[Channel9 SPA Demo App] ', //Configure the exceptionHandler decorator
        docTitle: 'Channel9 SPA Demo App: ',
        events: events,
        version: '2.1.0'
    };

    app.value('config', config);
    
    app.config(['$logProvider', function ($logProvider) {
        // turn debugging off/on (no info or warn)
        if ($logProvider.debugEnabled) {
            $logProvider.debugEnabled(true);
        }
    }]);
    
    //#region Configure the common services via commonConfig
    app.config(['commonConfigProvider', function (cfg) {
        cfg.config.controllerActivateSuccessEvent = config.events.controllerActivateSuccess;
        cfg.config.spinnerToggleEvent = config.events.spinnerToggle;
    }]);
    //#endregion
})();
///#source 1 1 F:\Pinal.Bhatt\Git\GitHub\Channel9\Channel9SPA\Channel9SPAApp\ng\apps\PBDesk.Channel9.exceptionHandler.js
// Include in index.html so that app level exceptions are handled.
// Exclude from testRunner.html which should run exactly what it wants to run
(function () {
    'use strict';
    
    var app = angular.module('PBDesk.Channel9.App');

    // Configure by setting an optional string value for appErrorPrefix.
    // Accessible via config.appErrorPrefix (via config value).

    app.config(['$provide', function ($provide) {
        $provide.decorator('$exceptionHandler',
            ['$delegate', 'config', 'logger', extendExceptionHandler]);
    }]);
    
    // Extend the $exceptionHandler service to also display a toast.
    function extendExceptionHandler($delegate, config, logger) {
        var appErrorPrefix = config.appErrorPrefix;
        var logError = logger.getLogFn('PBDesk.Channel9.App', 'error');
        return function (exception, cause) {
            $delegate(exception, cause);
            if (appErrorPrefix && exception.message.indexOf(appErrorPrefix) === 0) { return; }

            var errorData = { exception: exception, cause: cause };
            var msg = appErrorPrefix + exception.message;
            logError(msg, errorData, true);
        };
    }
})();
///#source 1 1 F:\Pinal.Bhatt\Git\GitHub\Channel9\Channel9SPA\Channel9SPAApp\ng\apps\PBDesk.Channel9.route.js
(function () {
    'use strict';

    var app = angular.module('PBDesk.Channel9.App');

    // Collect the routes
    app.constant('routes', getRoutes());
    
    // Configure the routes and route resolvers
    app.config(['$routeProvider', 'routes', routeConfigurator]);
    function routeConfigurator($routeProvider, routes) {

        routes.forEach(function (r) {
            $routeProvider.when(r.url, r.config);
        });
        $routeProvider.otherwise({ redirectTo: '/' });
    }

    // Define the routes 
    function getRoutes() {
        return [
            {
                url: '/',
                config: {
                    templateUrl: 'ng/dashboard/dashboard.html',
                    title: 'dashboard',
                    settings: {
                        nav: 1,
                        content: '<i class="fa fa-dashboard"></i> Dashboard'
                    }
                }
            },
            {
                url: '/recent',
                config: {
                    title: 'rss',
                    templateUrl: 'ng/admin/admin.html',
                    settings: {
                        nav: 2,
                        content: '<i class="fa fa-rss"></i> Latest Feeds'
                    }
                }
            },
            {
                url: '/shows',
                config: {
                    title: 'shows',
                    templateUrl: 'ng/catitems/catitems.html',
                    settings: {
                        nav: 3,
                        content: '<i class="fa fa-video-camera"></i> Shows'
                    }
                }
            },
            {
                url: '/series',
                config: {
                    title: 'series',
                    templateUrl: 'ng/catitems/catitems.html',
                    settings: {
                        nav: 4,
                        content: '<i class="fa fa-film"></i> Series'
                    }
                }
            },
            {
                url: '/admin',
                config: {
                    title: 'admin',
                    templateUrl: 'ng/admin/admin.html',
                    settings: {
                        nav: 5,
                        content: '<i class="fa fa-info"></i> About'
                    }
                }
            }

        ];
    }
})();
///#source 1 1 F:\Pinal.Bhatt\Git\GitHub\Channel9\Channel9SPA\Channel9SPAApp\ng\apps\PBDesk.Channel9.C9Data.js
(function () {
    'use strict';

    var C9Items = {

        recent: {
            title: 'Latest on Channel9!',
            url: 'http://channel9.msdn.com/',
            imageUrl: '/ng/C9App/images/channel-9-logo.png',
            rssUrl: 'http://channel9.msdn.com/Feeds/RSS',
            itemCount: 20
        },
        shows: 
            [
                {
                    title: 'Windows Azure Friday',
                    url: 'http://channel9.msdn.com/Shows/Windows-Azure-Friday',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/834a454f-52e2-47e0-9c5e-6f5d8732d43e.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Windows-Azure-Friday/RSS',
                    tags: 'Azure',
                    itemCount: 20
                },
                {
                    title: 'Inside Windows Phone',
                    url: 'http://channel9.msdn.com/Shows/Inside+Windows+Phone',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/ecda5d69-f848-465e-978d-51b7fb1be1a6.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Inside+Windows+Phone/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'TechNet Radio',
                    url: 'http://channel9.msdn.com/Shows/TechNet+Radio',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/1f357399-7e4e-4b20-8e9e-51a1d676a856.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/TechNet+Radio/RSS',
                    itemCount: 20
                },
                {
                    title: 'The BizSpark Show',
                    url: 'http://channel9.msdn.com/Shows/BizSpark',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/1d6a8bd4-e9b3-41ba-a689-b5d5d58dbf77.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/BizSpark/RSS',
                    itemCount: 20
                },
                {
                    title: 'Visual Studio Toolbox',
                    url: 'http://channel9.msdn.com/Shows/Visual-Studio-Toolbox',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/dd06966e-c4db-4cb7-98f5-0771a57a97c1.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Visual-Studio-Toolbox/RSS',
                    itemCount: 20
                },
                {
                    title: 'C9::GoingNative',
                    url: 'http://channel9.msdn.com/Shows/C9-GoingNative',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/b0b45cda-bf70-422a-9233-b414c8d055ad.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/C9-GoingNative/RSS',
                    itemCount: 20
                },
                {
                    title: 'Defrag Tools',
                    url: 'http://channel9.msdn.com/Shows/Defrag-Tools',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/2d0efc90-384a-496c-83ff-bebd72197efe.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Defrag-Tools/RSS',
                    itemCount: 20
                },
                {
                    title: 'This Week On Channel 9',
                    url: 'http://channel9.msdn.com/Shows/This+Week+On+Channel+9',
                    imageUrl: 'http://ecn.channel9.msdn.com/o9/content/images/TWOC9_220x165.jpg',
                    rssUrl: 'http://channel9.msdn.com/Shows/This+Week+On+Channel+9/RSS',
                    itemCount: 20
                },
                {
                    title: 'Ping!',
                    url: 'http://channel9.msdn.com/Shows/PingShow',
                    imageUrl: 'http://ecn.channel9.msdn.com/o9/content/areas/Ping_220x165.jpg',
                    rssUrl: 'http://channel9.msdn.com/Shows/PingShow/RSS',
                    itemCount: 20
                },
                {
                    title: 'Web Camps TV',
                    url: 'http://channel9.msdn.com/Shows/Web+Camps+TV',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/f4b95107-b27c-449d-84f1-4038028a0c1f.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Web+Camps+TV/RSS',
                    itemCount: 20
                },
                {
                    title: 'Windows Azure Cloud Cover Show',
                    url: 'http://channel9.msdn.com/Shows/The-Defrag-Show',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a4e902b2-c5de-49a0-82ef-d7f5a7b960e8.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/The-Defrag-Show/RSS',
                    itemCount: 20
                },
                {
                    title: 'The Defrag Show',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/668139a6-8a4c-4ff0-8b4f-3f3cb9d9de5d.jpg',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                }

            ],

        series: 
            [
                {
                    title: 'Developing Microsoft SharePoint Server 2013 Core Solutions',
                    url: 'http://channel9.msdn.com/Series/Developing-SharePoint-2013-Core-Solutions',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/b8e0787f-6b24-4707-a7c0-d996ca29e22b.png',
                    rssUrl: 'http://channel9.msdn.com/Series/Developing-SharePoint-2013-Core-Solutions/RSS',
                    itemCount: 7

                },
                {
                    title: 'Windows Server 2012 R2 Management and Automation',
                    url: 'http://channel9.msdn.com/Series/WinSvr2012R2-Management-and-Automation',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/fcee9e57-73c1-4555-b6fe-4abdaad428b9.png',
                    rssUrl: 'http://channel9.msdn.com/Series/WinSvr2012R2-Management-and-Automation/RSS',
                    itemCount: 4
                },
                {
                    title: 'Visual Studio Online',
                    url: 'http://channel9.msdn.com/Series/Visual-Studio-Online',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/c34eac0e-0fbc-4238-8da5-fa7e25a48b8e.png',
                    tags: 'Visual Studio, VS2013, VS Online',
                    itemCount: 6
                },
                {
                    title: 'Visual Studio Online "Monaco"',
                    url: 'http://channel9.msdn.com/Series/Visual-Studio-Online-Monaco',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/221227df-8e85-4438-92f2-9581425c1a31.png',
                    tags: 'Visual Studio, VS2013, VS, Visual Studio Online',
                    itemCount: 9
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                },
                {
                    title: 'Edge',
                    url: 'http://channel9.msdn.com/Shows/Edge',
                    imageUrl: 'http://files.channel9.msdn.com/thumbnail/a1a6deb8-1b5a-4ab2-a07a-b11e3b6fde99.png',
                    rssUrl: 'http://channel9.msdn.com/Shows/Edge/RSS',
                    itemCount: 20
                }
            ]
        
    };

    angular.module('PBDesk.Channel9.App').constant('C9Items', C9Items);


})();

(function () {
    'use strict';

    var serviceId = 'C9Data';
    angular.module('PBDesk.Channel9.App').factory(serviceId, ['C9Items', C9Data]);

    function C9Data(C9Items) {
       

        var service = {
            Shows: C9Items.shows,
            Series: C9Items.series,
            Recent: C9Items.recent,
            FeaturedShows: C9Items.shows.slice(0, 10),
            FeaturedSeries: C9Items.series.slice(0, 10)
        };

        return service;


    }
})();

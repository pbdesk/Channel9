switch (location.hostname.toLowerCase()) {
    case 'localhost': {
        window.c9Configs = {
            appUrl: 'http://localhost:12551/',
            idSysUrl: 'http://idsys.azurewebsites.net/',
            dSvcUrl: 'http://dsvc.pbdesk.com/api/',
            clientId: 'C9LocalHost',
            allowedRole: 'C9Admin'
        }
        break;

    }
    case 'channel9.pbdesk.com': {
        window.c9Configs = {
            appUrl: 'http://channel9.pbdesk.com/',
            idSysUrl: 'http://idsys.azurewebsites.net/',
            dSvcUrl: 'http://dsvc.pbdesk.com/api/',
            clientId: 'C9GitHubHost',
            allowedRole: 'C9Admin'
        }
        break;

    }
}


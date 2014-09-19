var pilotosApp = angular.module('pilotosApp', [
    'ngRoute',
    'pilotosControllers',
    'ui.bootstrap'
]);

pilotosApp.config(['$routeProvider', '$httpProvider',
    function($routeProvider, $httpProvider) {
        //Enable cross domain calls
        $httpProvider.defaults.useXDomain = true;

        //Remove the header used to identify ajax call  that would prevent CORS from working
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
        
        // Use x-www-form-urlencoded Content-Type
        $httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';

        var param = function(obj) {
            var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

            for (name in obj) {
                value = obj[name];

                if (value instanceof Array) {
                    for (i = 0; i < value.length; ++i) {
                        subValue = value[i];
                        fullSubName = name + '[' + i + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value instanceof Object) {
                    for (subName in value) {
                        subValue = value[subName];
                        fullSubName = name + '[' + subName + ']';
                        innerObj = {};
                        innerObj[fullSubName] = subValue;
                        query += param(innerObj) + '&';
                    }
                }
                else if (value !== undefined && value !== null)
                    query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
            }

            return query.length ? query.substr(0, query.length - 1) : query;
        };

        // Override $http service's default transformRequest
        $httpProvider.defaults.transformRequest = [function(data) {
                return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
            }
        ];
        
        $routeProvider.
            when('/tablero', {
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardCtrl'
            }).
            when('/procesos', {
                templateUrl: 'partials/process.html',
                controller: 'ProcessCtrl'
            }).
            when('/remolcadores', {
                templateUrl: 'partials/tug.html',
                controller: 'TugCtrl'
            }).
            when('/maniobras/:idproceso', {
                templateUrl: 'partials/move.html',
                controller: 'MoveCtrl'
            }).
            when('/motonaves', {
                templateUrl: 'partials/motorship.html',
                controller: 'MotorshipCtrl'
            }).
            when('/pilotos', {
                templateUrl: 'partials/pilot.html',
                controller: 'PilotCtrl'
            }).
            when('/agencias', {
                templateUrl: 'partials/agency.html',
                controller: 'AgencyCtrl'
            }).
            when('/terminales', {
                templateUrl: 'partials/terminal.html',
                controller: 'TerminalCtrl'
            }).
            when('/usuarios', {
                templateUrl: 'partials/user.html',
                controller: 'UserCtrl'
            }).
            when('/config', {
                templateUrl: 'partials/config.html',
                controller: 'ConfigCtrl'
            }).
            otherwise({
                redirectTo: '/tablero'
            });
        }
    ]
);
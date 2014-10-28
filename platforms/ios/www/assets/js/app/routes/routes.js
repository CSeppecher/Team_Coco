//Routing
myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(false);
	
	$routeProvider
		.when('/', {
			templateUrl: 'partials/default.html',
			controller	: 'mainController'
		})
		.when('/home', {
			templateUrl: 'partials/home.html',
			controller  : 'mainController'
		})
        .when('/list', {
            templateUrl: 'partials/list.html',
            controller  : 'ListCtrl'
        })
        .when('/detail/:lineId', {
            templateUrl: 'partials/detail.html',
            controller  : 'DetailCtrl'
        })
        .otherwise({
			redirectTo: '/',
			controller	: 'mainController'
		});
}]);

// Routing : for the autocompletion dans la barre de navigation

myApp.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
	$locationProvider.html5Mode(false);
	
	$routeProvider
		.when('/', {
			templateUrl: 'partials/default.html',
			controller	: 'mainController'
		})
		.when('/home', {
			templateUrl: 'partials/home.html',
			// controller  : 'mainController'
		})
        .when('/list', {
            templateUrl: 'partials/list.html',
            controller  : 'ListCtrl'
        })
        .when('/detail/:lineId', {
            templateUrl: 'partials/detail.html',
            controller  : 'DetailCtrl'
        })
        .when('/search', {
            templateUrl: 'partials/search.html'//,
           // controller  : 'DetailCtrl'
        })
        .when('/add', {
            templateUrl : 'partials/add.html',
            controller  : 'AddCtrl'
        })
        .when('/add_saved', {
            templateUrl : 'partials/add_saved.html',
            controller  : 'AddCtrl'
        })
        .otherwise({
			redirectTo: '/',
			controller	: 'mainController'
		});
}]);

var triplogApp = angular.module('triplogApp', [ 
	'ngRoute', 
	'triplogApp.controllers', 
	'triplogApp.services', 
	'triplogApp.directives', 
	'triplogApp.filters',
	'CornerCouch'
]);

triplogApp.config(['$routeProvider', function ($routeProvider) {
	/* home route */
	$routeProvider.when('/home', {
		'templateUrl': 'partials/home.html',
		'controller': 'MainController'
	});


	/* archive route */
	$routeProvider.when('/archive/:year/:month', {
		'templateUrl': 'partials/home.html',
		'controller': 'MainController'
	});

	/* detail route */
	$routeProvider.when('/detail/:detailUrl', {
		'templateUrl': 'partials/home.html',
		'controller': 'DetailController'
	});

	/* admin route */
	$routeProvider.when('/admin/:id?', {
		'controller': 'AdminController',
		'templateUrl': 'partials/admin/home.html'
	});

	/* error 404 route */
	$routeProvider.when('/error404', {
		'controller': 'Error404Controller',
		'templateUrl': 'partials/error404.html'
	});

	/* default route */
	$routeProvider.when('/', { 'redirectTo': '/home' });

	/* unknown page */
	$routeProvider.otherwise({ 'redirectTo': '/error404' });
}]);

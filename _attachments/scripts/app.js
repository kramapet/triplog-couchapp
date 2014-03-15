var triplogApp = angular.module('triplogApp', [ 
	'ngRoute', 
	'triplogApp.controllers', 
	'triplogApp.services', 
	'triplogApp.directives', 
	'triplogApp.filters' 
]);

triplogApp.config(['$routeProvider', function ($routeProvider) {
	/* home route */
	$routeProvider.when('/home', {
		'templateUrl': 'partials/home.html',
		'controller': 'MainController'
	});

	/* detail route */
	$routeProvider.when('/detail/:detailUrl', {
		'templateUrl': 'partials/home.html',
		'controller': 'DetailController'
	});

	/* unknown page */
	$routeProvider.otherwise({ 'redirectTo': '/home' });
}]);

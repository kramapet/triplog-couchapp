var triplogApp = angular.module('triplogApp', [ 
	'ngRoute', 
	'triplogApp.controllers', 
	'triplogApp.services', 
	'triplogApp.directives', 
	'triplogApp.filters' 
]);

triplogApp.config(['$routeProvider', function ($routeProvider) {
	/* posts routes */
	$routeProvider.when('/posts', { 
		'templateUrl': 'partials/post-list.html', 
		'controller': 'PostListController' 
	});
	$routeProvider.when('/posts/:postId', { 
		'templateUrl': 'partials/post-detail.html', 
		'controller': 'PostDetailController' 
	});
	/* routes routes */
	$routeProvider.when('/routes', { 
		'templateUrl': 'partials/route-list.html', 
		'controller': 'RouteListController' 
	});
	$routeProvider.when('/routes/:routeId', { 
		'templateUrl': 'partials/route-detail', 
		'controller': 'RouteDetailController' 
	});
	/* pictures routes */
	$routeProvider.when('/photos', { 
		'templateUrl': 'partials/photo-list.html', 
		'controller': 'PhotoListController' 
	});
	$routeProvider.when('/photos/:photoId', { 
		'templateUrl': 'partials/photo-detail.html', 
		'controller': 'PhotoDetailController' 
	});
}]);

'use strict';

/* directives */

angular.module('triplogApp.directives', [])
	.directive('triplogPost', [function () {
		return {
			'scope': {
				'payload': '=triplogPost'
			},
			'templateUrl': 'partials/object_post.html'
		};
	}])
	.directive('triplogPhoto', [function () {
		return {
			'scope': {
				'payload': '=triplogPhoto'
			},
			'templateUrl': 'partials/object_photo.html'
		};
	}])
	.directive('triplogRoute', [function () {
		return {
			'scope': {
				'payload': '=triplogRoute'
			},
			'templateUrl': 'partials/object_route.html'
		};
	}])
	.directive('triplogGallery', [function () {
		return {
			'scope': {
				'payload': '=triplogGallery'
			},
			'templateUrl': 'partials/object_gallery.html'
		};
	}]);

'use strict';

/* directives */

angular.module('triplogApp.directives', [])
	.directive('triplogPost', [function () {
		return {
			'scope': {
				'payload': '=triplogPost'
			},
			'templateUrl': 'partials/dir-triplog-post.html'
		};
	}])
	.directive('triplogPhoto', [function () {
		return {
			'scope': {
				'payload': '=triplogPhoto'
			},
			'templateUrl': 'partials/dir-triplog-photo.html'
		};
	}])
	.directive('triplogRoute', [function () {
		return {
			'scope': {
				'payload': '=triplogRoute'
			},
			'templateUrl': 'partials/dir-triplog-route.html'
		};
	}])
	.directive('triplogGallery', [function () {
		return {
			'scope': {
				'payload': '=triplogGallery'
			},
			'templateUrl': 'partials/dir-triplog-gallery.html'
		};
	}])
	.directive('triplogFooter', [function () {
		return {
			'restrict': 'E',
			'scope': {
				'payload': '='
			},
			'templateUrl': 'partials/dir-triplog-footer.html'
		};
	}])
	.directive('triplogHeader', [function () {
		return {
			'restrict': 'E',
			'scope': {
				'payload': '='
			},
			'templateUrl': 'partials/dir-triplog-header.html'
		};
	}])
	.directive('triplogMap', ['Leaflet', function () {
		return {
			'link': function (scope, elm, attrs) {
				console.log(scope);
				console.log(elm);
				console.log(attrs);
			}
		};
	}]);

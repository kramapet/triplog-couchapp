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
	.directive('triplogMap', ['CalculateBounds', 'Leaflet', function (CalculateBounds, Leaflet) {
		return {
			'scope': {
				'triplogMap': '='
			},
			'link': function (scope, elm, attrs) {
				console.log(scope.triplogMap);
				var id = 'map-' + scope.triplogMap.url;
				var bounds = CalculateBounds(scope.triplogMap.geo.geometry.coordinates);
				elm.attr('id', id);
				var map = Leaflet.map(id).fitBounds(bounds);
				Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
					'maxZoom': 18
				}).addTo(map);
				Leaflet.geoJson(scope.triplogMap.geo).addTo(map);
			}
		};
	}]);

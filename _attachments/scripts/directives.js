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
	}])
	.directive('triplogBigMap', ['CalculateBounds', 'Leaflet', 'OpenStreetMap', function (CalculateBounds, Leaflet, OpenStreetMap) {
		return {
			'controller': ['$scope', 'Routes', function ($scope, Routes) {
				$scope.routes = Routes.query();
			}],
			'link': function (scope, elm, attrs) {
				scope.$watch("routes.rows", function (v) {
					if (typeof v == 'object' && v.length > 0) {
						var allCoors = [];
						for (var i in v) {
							Leaflet.geoJson(v[i].value.geo).addTo(map);
							for (var y in v[i].value.geo.geometry.coordinates) {
								allCoors.push(v[i].value.geo.geometry.coordinates[y]);
							}
						}

						var id = 'big-map';
						elm.attr('id', id);
						map = OpenStreetMap(id);
						map.fitBounds(CalculateBounds(allCoors));
					}
				});
			}
		};
	}])

	.directive('triplogMainHeader', [function () {
		return {
			'controller': ['$scope', 'Config', function ($scope, Config) {
				$scope.config = Config.query();
			}],
			'restrict': 'EA',
			'templateUrl': 'partials/dir-triplog-main-header.html'
		};
	}])

	.directive('triplogArchive', [function () {
		return {
			'controller': ['$scope', 'Objects', function ($scope, Objects) {
				$scope.archive = Objects.queryPages();	
			}],
			'restrict': 'EA',
			'templateUrl': 'partials/dir-triplog-archive.html'
		};
	}]);

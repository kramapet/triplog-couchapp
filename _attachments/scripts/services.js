'use strict';

/* services */

angular.module('triplogApp.services', ['ngResource'])

	.factory('Objects', ['$resource', function ($resource) {
		return $resource('/objects', {}, {
			'query5': { 'method': 'GET', 'params': { 'limit': 5, 'descending': true } },
			'query': { 'method': 'GET' }
		});
	}])

	.factory('Routes', ['$resource', function ($resource) {
		return $resource('/routes', {}, {
			'query': { 
				'method': 'GET'
			}
		});
	}])

	.factory('Leaflet', ['$window', function ($window) {
		return $window.L;
	}])

	.factory('CalculateBounds', [function () {
		return function (coordinates) {
			var rect, lat, lon;

			for (var k in coordinates) {
				lon = coordinates[k][0];
				lat = coordinates[k][1];

				if (rect == undefined) {
					rect = { 'minLon': lon, 'maxLon': lon, 'minLat': lat, 'maxLat': lat };
				} else {
					if (lon > rect.maxLon) rect.maxLon = lon;
					if (lon < rect.minLon) rect.minLon = lon;
					if (lat > rect.maxLat) rect.maxLat = lat;
					if (lat < rect.minLat) rect.minLat = lat;
				}
			}

			return [
				[ rect.minLat, rect.minLon ],
				[ rect.maxLat, rect.maxLon ]
			];
		};
	}])


	.value('version', 0.1);

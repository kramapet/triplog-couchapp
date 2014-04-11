'use strict';

/* services */

angular.module('triplogApp.services', ['ngResource', 'CornerCouch'])

	.factory('Objects', ['$resource', function ($resource) {
		return $resource('objects', {}, {
			'query': {
				'method': 'GET',
				'params': {
					'descending': true,
					'reduce': false
				}
			},
			'queryPages': {
				'method': 'GET',
				'params': {
					'group_level': 2,
					'descending': true
				}
			},
			'queryLastPage': {
				'method': 'GET',
				'params': {
					'group_level': 2,
					'descending': true,
					'limit': 1
				}
			}
		});
	}])

	.factory('ObjectsByUrl', ['$resource', function ($resource) {
		return $resource('objects_by_url/:url', {}, {});
	}])

	.factory('Routes', ['$resource', function ($resource) {
		return $resource('routes', {}, {
			'query': { 
				'method': 'GET'
			}
		});
	}])

	.factory('Config', ['$resource', function ($resource) {
		return $resource('config/config.json', {}, {
			'query': {
				'method': 'GET',
				'cache': true
			}
		});
	}])

	.factory('Leaflet', ['$window', function ($window) {
		return $window.L;
	}])

	.factory('OpenStreetMap', ['Leaflet', function (Leaflet) {
		return function (id) {
			var map = Leaflet.map(id);
			Leaflet.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				'maxZoom': 18
			}).addTo(map);

			return map;
		};
	}])

	.factory('CouchDB', ['cornercouch', function (cornercouch) {
		var couch = cornercouch('http://couch01:5984', 'GET');
		var db = couch.getDB('triplog_test');
		return {
			'server': couch,
			'db': db
		}
	}])

	.factory('EmptyQuery', [function () {
		return function () { 
			return {
				"total_rows": 0,
				"offset": 0,
				"rows": []
			};
		};
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

	.factory('GetKeysForMonth', [function () {
		return function (year, month) {
			var endkey = [year, month, 0, 0, 0, 0];

			if (month == 11) {
				++year;
				month = 0;
			} else {
				++month;
			}

			var startkey = [year, month, 0, 0, 0, 0];

			return {
				'startkey': '[' + startkey + ']',
				'endkey': '[' + endkey + ']'
			};
		};
	}])

	.value('version', 0.1);

'use strict';

/* services */

angular.module('triplogApp.services', ['ngResource'])

	.factory('Objects', ['$resource', function ($resource) {
		return $resource('/objects', {}, {
			'query5': { 'method': 'GET', 'params': { 'limit': 5, 'descending': true } },
			'query': { 'method': 'GET' }
		});
	}])

	.factory('Leaflet', ['$window', function ($window) {
		return $window.L;
	})


	.value('version', 0.1);

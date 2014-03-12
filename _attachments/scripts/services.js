'use strict';

/* services */

angular.module('triplogApp.services', ['ngResource'])

	.factory('Objects', ['$resource', function ($resource) {
		return $resource('/objects', {}, {
			'query5': { 'method': 'GET', 'params': { 'limit': 5, 'descending': true } },
			'query': { 'method': 'GET' }
		});
	}])


	.value('version', 0.1);

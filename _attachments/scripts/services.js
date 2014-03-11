'use strict';

/* services */

angular.module('triplogApp.services', ['ngResource'])

	.factory('Posts', ['$resource', function ($resource) {
		return $resource('/posts', {}, {
			'query2': { 'method': 'GET', 'params': { 'limit': 2, 'descending': true } },
			'query': { 'method': 'GET' }
		});
	}])


	.value('version', 0.1);

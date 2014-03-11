'use strict';

/* services */

angular.module('triplogApp.services', ['ngResource'])
	
	.factory('ShowdownConverter', ['$window', function ($window) {
		return new $window.Showdown.converter();
	}])

	.factory('Posts', ['$resource', function ($resource) {
		return $resource('/posts', {}, {
			'query2': { 'method': 'GET', 'params': { 'limit': 2, 'descending': true } },
			'query': { 'method': 'GET' }
		});
	}])


	.value('version', 0.1);

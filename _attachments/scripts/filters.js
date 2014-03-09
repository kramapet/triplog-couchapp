'use strict';

/* filters */

angular.module('triplogApp.filters', [])
	.filter('interpolate', ['version', function (version) {
		return function (text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);

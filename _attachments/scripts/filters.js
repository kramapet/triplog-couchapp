'use strict';

/* filters */

angular.module('triplogApp.filters', [])

	.filter('arrdate2epochtime', [function () {
		return function (arr) {
			return new Date(arr[0], arr[1], arr[2], arr[3], arr[4], arr[5]).getTime();
		};
	}])
	.filter('interpolate', ['version', function (version) {
		return function (text) {
			return String(text).replace(/\%VERSION\%/mg, version);
		};
	}]);

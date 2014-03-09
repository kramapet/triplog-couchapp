'use strict';

/* directives */

angular.module('triplogApp.directives', [])
	.directive('appVersion', ['version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	}]);

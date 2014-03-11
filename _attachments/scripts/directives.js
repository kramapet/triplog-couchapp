'use strict';

/* directives */

angular.module('triplogApp.directives', [])
	.directive('appversion', ['version', function (version) {
		return {
			'template': 'Hell: ' + version
		};
	}]);

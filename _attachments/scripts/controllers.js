'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', 'Objects', function ($scope, Objects) {
		$scope.objects = Objects.query5();
	}])

	.controller('DetailController', [function () {
	}]);

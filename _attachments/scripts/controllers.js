'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', 'Objects', function ($scope, Objects) {
		$scope.objects = Objects.query5();
	}])

	.controller('DetailController', [function () {
	}])
	
	.controller('BigMapController', ['$scope', 'Routes', function ($scope, Routes) {
		$scope.routes = Routes.query();
	}]);

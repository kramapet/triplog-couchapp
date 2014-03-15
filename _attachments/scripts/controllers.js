'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', 'Objects', function ($scope, Objects) {

		$scope.objects = Objects.query5();

	}])

	.controller('PostListController', [function () {
	}])
	
	.controller('PostDetailController', [function () {
	}])

	.controller('RouteListController', [function () {
	}])

	.controller('RouteDetailController', [function () {
	}])

	.controller('PhotoListController', [function () {
	}])

	.controller('PhotoDetailController', [function () {
	}]);

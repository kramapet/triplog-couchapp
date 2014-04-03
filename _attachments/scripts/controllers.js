'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', '$routeParams', 'Objects', 'GetKeysForMonth', function ($scope, $routeParams, Objects, GetKeysForMonth) {
		if ($routeParams.year == undefined) {
			var last_page = Objects.queryLastPage({}, function () {
				var year = last_page.rows[0].key[0];
				var month = last_page.rows[0].key[1];

				var keys = GetKeysForMonth(year, month);
				$scope.objects = Objects.query(keys);
			});
		} else {
			$scope.objects = Objects.query(GetKeysForMonth($routeParams.year, $routeParams.month));
		}



	}])

	.controller('DetailController', ['$scope', '$routeParams', 'ObjectsByUrl', function ($scope, $routeParams, ObjectsByUrl) {
		$scope.objects = ObjectsByUrl.get({ 'url': $routeParams.detailUrl });
	}])
	
	.controller('BigMapController', ['$scope', 'Routes', function ($scope, Routes) {
		$scope.routes = Routes.query();
	}]);

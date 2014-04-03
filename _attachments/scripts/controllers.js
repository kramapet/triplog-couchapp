'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', '$routeParams', 'Objects', function ($scope, $routeParams, Objects) {
		function get_end_start_key(year, month) {
		 	var endkey = [year, month, 0, 0, 0, 0];
			if (month == 11) {
				year++;
				month = 0;
			} else {
				month++;
			}
			var startkey = [year, month, 0, 0, 0, 0];

			return {
				'startkey': '[' + startkey + ']', 
				'endkey': '['+ endkey + ']'
			};
		}

		if ($routeParams.year == undefined) {
			var last_page = Objects.queryLastPage({}, function () {
				var year = last_page.rows[0].key[0];
				var month = last_page.rows[0].key[1];

				var keys = get_end_start_key(year, month);
				$scope.objects = Objects.query(keys);
			});
		} else {
			$scope.objects = Objects.query(get_end_start_key($routeParams.year, $routeParams.month));
		}



	}])

	.controller('DetailController', ['$scope', '$routeParams', 'ObjectsByUrl', function ($scope, $routeParams, ObjectsByUrl) {
		$scope.objects = ObjectsByUrl.get({ 'url': $routeParams.detailUrl });
	}])
	
	.controller('BigMapController', ['$scope', 'Routes', function ($scope, Routes) {
		$scope.routes = Routes.query();
	}]);

'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', '$routeParams', 'Objects', 'GetKeysForMonth', 'EmptyQuery', 'CouchDB', 'Config', function ($scope, $routeParams, Objects, GetKeysForMonth, EmptyQuery, CouchDB, Config) {
		if ($routeParams.year == undefined) {
			var last_page = Objects.queryLastPage({}, function () {
				if (last_page.rows.length == 0) {
					$scope.objects = EmptyQuery();
				} else {
					var year = last_page.rows[0].key[0];
					var month = last_page.rows[0].key[1];
					var keys = GetKeysForMonth(year, month);
					$scope.objects = Objects.query(keys);
				}
			});
		} else {
			$scope.objects = Objects.query(GetKeysForMonth($routeParams.year, $routeParams.month));
		}

		$scope.config = Config.query();
	}])

	.controller('DetailController', ['$scope', '$routeParams', 'ObjectsByUrl', function ($scope, $routeParams, ObjectsByUrl) {
		$scope.objects = ObjectsByUrl.get({ 'url': $routeParams.detailUrl });
	}])

	.controller('Error404Controller', [function () {
	}])
	
	.controller('BigMapController', ['$scope', 'Routes', function ($scope, Routes) {
		$scope.routes = Routes.query();
	}])
	
	.controller('AdminController', ['$scope', '$routeParams', '$location', 'CouchDB', function ($scope, $routeParams, $location, CouchDB) {
		var setError = function (payload) {
			$scope.okdata = null;
			$scope.errordata = "Oh, snap! " + payload.reason;
		};
		
		$scope.detail = CouchDB.db.newDoc();
		if (!$routeParams.id) {
			$scope.action = 'add';
			$scope.detail.class = 'post';
		} else {
			$scope.action = 'edit';
			$scope.detail.load($routeParams.id).success(function () {
				console.log(arguments);
			}).error(function () {
				console.log(arguments);
			});
		}

		$scope.update = function () { 
			if (!$scope.detail._id && $scope.detail.url) {
				$scope.detail._id = $scope.detail.url;
			}

			if (Object.prototype.toString.call($scope.detail.published_at) !== '[object Array]') {
				$scope.detail.published_at = $scope.detail.published_at.split(",");
				for (var i in $scope.detail.published_at) {
					$scope.detail.published_at[i] = parseInt($scope.detail.published_at[i]);
				}
			}
			
			$scope.detail.save().success(function () {
				$scope.errordata = null;
				$scope.okdata = 'Document has been saved';
			}).error(setError);
		};

		$scope.destroy = function () {
			$scope.detail.remove().success(function () {
				$scope.errordata = null;
				$scope.okdata = "Document has been removed";
				$scope.detail = CouchDB.db.newDoc();
			}).error(setError);
		};

		$scope.attach = function (id) {
			var fileInput = document.getElementById(id);
			$scope.detail.attachMulti(fileInput.files, function () {
				fileInput.value = "";
			});
		};

	}]);

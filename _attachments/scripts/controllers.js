'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', '$routeParams', 'Objects', 'GetKeysForMonth', 'EmptyQuery', 'Config', function ($scope, $routeParams, Objects, GetKeysForMonth, EmptyQuery, Config) {
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

	.controller('LoginController', ['$scope', '$location', 'CouchDB', function ($scope, $location, CouchDB) {
		$scope.credentials = {
			'username': '',
			'password': ''
		};
		$scope.message = null;

		var setMessage = function (data) {
			$scope.message = data.reason;
		};

		$scope.login = function () {
			CouchDB.then(function (couch) {
				couch.server.login($scope.credentials.username, $scope.credentials.password).success(function () {
					$scope.message = 'User has been authenticated';
					$scope.credentials.username = $scope.credentials.password = '';
					$location.path('/home');
				}).error(setMessage);
			});
		};
	}])
	
	.controller('AdminController', ['$scope', '$routeParams', '$location', 'CouchDB', '$window', 
	function ($scope, $routeParams, $location, CouchDB, $window) {
		var setError = function (payload) {
			$scope.okdata = null;
			$scope.errordata = "Oh, snap! " + payload.reason;
		};

		var refreshPhotoDescription = function (detail) {
			for (var filename in detail._attachments) {
				var file = detail._attachments[filename];
				if (file.content_type.match(/^image/)) {
					detail.photoDescription = detail.photoDescription || {};
					if (!detail.photoDescription[filename]) {
						detail.photoDescription[filename] = "";
					}
				}
			}
		};

		
		CouchDB.then(function (couch) {
			$scope.detail = couch.db.newDoc();
			
			if (!$routeParams.id) {
				$scope.action = 'add';
				$scope.detail.class = 'post';
			} else {
				$scope.action = 'edit';
				$scope.detail.load($routeParams.id).success(function () {
					refreshPhotoDescription($scope.detail);
				}).error(setError);
			}

			$scope.update = function () {
				if (!$scope.detail._id && $scope.detail.url) {
					$scope.detail._id = $scope.detail.url;
				}

				if (!angular.isArray($scope.detail.published_at)) {
					$scope.detail.published_at = $scope.detail.published_at.split(",");
					for (var i in $scope.detail.published_at) {
						$scope.detail.published_at[i] = parseInt($scope.detail.published_at[i], 10);
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
					$scope.okdata = 'Document has been removed';
					$scope.detail = couch.db.newDoc();
				}).error(setError);
			};

			$scope.attach = function (idx) {
				var fileInput = document.getElementById(idx);
				$scope.detail.attachMulti(fileInput.files, function () {
					fileInput.value = "";
					$scope.okdata = 'Files have been uploaded.'
					$scope.errordata = null;
					refreshPhotoDescription($scope.detail);
				});
			};

			$scope.detach = function (name) {
				$scope.detail.detach(name);
				if ($scope.detail.photoDescription[name]) {
					delete $scope.detail.photoDescription[name];
				}
			};

			$scope.processGPX = function (idx) {
				var fileInput = document.getElementById(idx);
				var file = fileInput.files[0];
				if (!file.type.match(/gpx\+xml/)) {
					setError({'reason': 'Invalid format'});
					return;
				}
			
				var parser = new $window.DOMParser();
				var reader = new FileReader();
				reader.onload = (function (f) {
					return function (event) {
						var doc = parser.parseFromString(event.target.result, 'application/xml');
						var points = doc.getElementsByTagName('trkpt');
						if (points.length > 0) {
							$scope.detail.geo = {
								'type': 'Feature',
								'geometry': {
									'type': 'LineString',
									'coordinates': []
								}
							};
						}

						for (var i in points) {
							if (points[i].attributes && points[i].attributes['lon'] && points[i].attributes['lat']) {
								$scope.detail.geo.geometry.coordinates.push([ 
									points[i].attributes['lon'].nodeValue, 
									points[i].attributes['lat'].nodeValue 
								]);
							}
						}

						$scope.update();
					};
				})(file);

				reader.readAsText(file);
			};

		});
	}]);

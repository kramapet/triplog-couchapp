'use strict';

/* controllers */
angular.module('triplogApp.controllers', [])
	.controller('MainController', ['$scope', 'Posts', function ($scope, Posts) {

		$scope.posts = Posts.query2();

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

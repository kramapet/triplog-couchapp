'use strict';

/* directives */

angular.module('triplogApp.directives', ['ngSanitize'])
	
	/*
	 * angular-markdown-directive v0.2.0
	 * (c) 2013 Brian Ford http://briantford.com/
	 * License: MIT
	 * https://github.com/btford/angular-markdown-directive
	 */
	.directive('btf-markdown', ['$sanitize', function ($sanitize) {
		var converter = new Showdown.converter();
		var html = "";
		return {
			'restrict': 'AE',
			'link': function (scope, elm, attrs) {
				if (attrs.btfMarkdown) {
					scope.$watch(attrs.btfMarkdown, function (newVal) {
						html = newVal ? $sanitize(converter.makeHtml(newVal)) : '';
						element.html(html);
					});
				} else {
					html = $sanitize(converter.makeHtml(element.text()));
					element.html(html);
				}
			}
		};
	}])
	
	.directive('appVersion', ['version', function (version) {
		return function (scope, elm, attrs) {
			elm.text(version);
		};
	}]);

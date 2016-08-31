angular.module('qlist')
	.directive('qlItem', function() {
		return {
			restrict: "AE",
			templateUrl: "app/templates/qlist-item-template.html",
			scope: {
				qlist: "=",
				users: "="
			}
		}
	});
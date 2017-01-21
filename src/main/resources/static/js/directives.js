'use strict';

/* Directives */
angular.module('vbTrainingApp.directives', [])

.directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
}])

.directive('jqdatepicker', function jqdatepicker() {
	return {
		restrict: 'A',
		require: 'ngModel',
		link: function (scope, element, attrs, ngModelCtrl) {
			element.datepicker({
				firstDay: 1,
				dateFormat: 'yy-mm-dd',
				onSelect: function (date) {
					scope.selectedDate = date;
					scope.$apply();
				}
			});
		}
}});

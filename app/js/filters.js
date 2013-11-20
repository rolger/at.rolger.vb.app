'use strict';

/* Filters */

angular.module('vbTrainingApp.filters', [])
	.filter('interpolate',
		[ 'version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			}
		}])

	.filter('forWeekday', function() {
			return function(dates, weekday) {
				var result = new Array();
				var day = 0;
				if (weekday === 'Montag') {
					day = 1;
				}
				if (weekday === 'Donnerstag') {
					day = 4;
				}
					
				if (day != 0) {
					for (var int = 0; int < dates.length; int++) {
						var dateParts = dates[int].split(".");
						var d = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
						if (d.getDay() === day) {
							result.push(dates[int]);
						}
					}
				}
				
				return result.sort();
			}
		} )
		
	.filter('shortDate', function() {
			return function(text) {
				return String(text).substring(0, text.lastIndexOf(".")+1);
			}
		} );

'use strict';

function filterWeekdays(dates, weekday) {
	if (weekday === 'Alle') {
		return dates;
	} 
	
	var result = new Array();
	var day = 0;
	if (weekday === 'Montag') {
		day = 1;
	} else if (weekday === 'Donnerstag') {
		day = 4;
	}

	if (day != 0) {
		for (var int = 0; int < dates.length; int++) {
			var dateParts = dates[int].split("-");
			var d = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);
			if (d.getDay() === day) {
				result.push(dates[int]);
			}
		}
	}

	return result;
}

/* Filters */

angular.module('vbTrainingApp.filters', []).filter('interpolate',
		[ 'version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			}
		} ])

.filter(
		'forWeekday',
		function() {
			return function(dates, weekday) {
				var result = filterWeekdays(dates, weekday);
				return result.sort(function(a, b) {
					var datePartsA = a.split("-");
					var datePartsB = b.split("-");

					var intA = parseInt(datePartsA[2])
							+ parseInt(datePartsA[1]) * 100
							+ parseInt(datePartsA[0]) * 10000;
					var intB = parseInt(datePartsB[2])
							+ parseInt(datePartsB[1]) * 100
							+ parseInt(datePartsB[0]) * 10000;

					// a < b => -1
					return intA - intB;
				});
			}
		})

.filter('withDays', function() {
	return function(players, dates, weekday) {
		var result = [];
		var days = filterWeekdays(dates, weekday);

		angular.forEach(players, function(player) {
			for (var i = 0; i < days.length; i++) {
				if (player.abende.indexOf(days[i]) != -1) {
					result.push(player);
					return;
				}

			}

		});

		return result;
	}
})

.filter('shortDate', function() {
	return function(date) {
		var dateParts = date.tag.split("-");
		return dateParts[2] + "." + dateParts[1];
	}
});

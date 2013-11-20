'use strict';

/* Filters */

angular
		.module('vbTrainingApp.filters', [])
		.filter('interpolate', [ 'version', function(version) {
			return function(text) {
				return String(text).replace(/\%VERSION\%/mg, version);
			}
		} ])

		.filter(
				'forWeekday',
				function() {
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
								var d = new Date(dateParts[2],
										(dateParts[1] - 1), dateParts[0]);
								if (d.getDay() === day) {
									result.push(dates[int]);
								}
							}
						}

						return result
								.sort(function(a, b) {
									var datePartsA = a.split(".");
									var datePartsB = b.split(".");

									// a < b => -1
									if (parseInt(datePartsA[2]) < parseInt(datePartsB[2])) {
										return -1;
									} else if (parseInt(datePartsA[2]) === parseInt(datePartsB[2])) {
										if (parseInt(datePartsA[1]) < parseInt(datePartsB[1])) {
											return -1;
										} else if (parseInt(datePartsA[1]) === parseInt(datePartsB[1])) {
											if (parseInt(datePartsA[0]) < parseInt(datePartsB[0])) {
												return -1;
											} else if (parseInt(datePartsA[1]) === parseInt(datePartsB[1])) {
												return 0;
											}
										}
									}
									return 1;
								});
					}
				})

		.filter('shortDate', function() {
			return function(text) {
				return String(text).substring(0, text.lastIndexOf(".") + 1);
			}
		});

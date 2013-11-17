'use strict';

/* Services */

// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('vbTrainingApp.services', [])
.value('version', '0.1')
.factory(
		'PlayerService',
		function() {
			var defaults = [ {
				id : 1,
				firstName : 'Roland',
				name : 'Germ',
				birthdate : '6.5.1966',
				address : '1230 Wien, Khekgassse 39/9',
				telefon : '06508901949',
				abende : []
			}, {
				id : 2,
				firstName : 'Magdalena',
				name : 'Germ',
				birthdate : '27.12.1966',
				address : '1230 Wien, Khekgassse 39/9',
				telefon : '06508901946',
				abende : []
			}, {
				id : 3,
				firstName : 'Stefanie',
				name : 'Germ',
				birthdate : '16.3.1990',
				address : '1230 Wien, Khekgassse 39/9',
				telefon : '06508901947',
				abende : []
			} ];

			
			var service = {
				allPlayers : {},
				
				findPlayer : function(searchid) {
					var idx = 0;
					for (; idx < service.allPlayers.length; idx++) {
						if (service.allPlayers[idx].id === parseInt(searchid)) {
							break;
						}
					}

					return service.allPlayers[idx];
				},
				
				save : function() {
					localStorage["allPlayers"] = angular.toJson(service.allPlayers);
				},
				
				restore : function() {
					// Pull from sessionStorage
					service.allPlayers = angular.fromJson(localStorage["allPlayers"])
							|| defaults;

					return service.players;
				}
			};
			// Immediately call restore from the session storage
			// so we have our user data available immediately
			service.restore();
			
			return service;
		});
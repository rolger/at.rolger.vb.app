'use strict';

/* Services */

angular.module('vbTrainingApp.services', [])
.value('version', '0.1')
.factory(
		'PlayerService',
		function() {
			var defaults = [ {
				id : 1,
				firstName : 'Roland',
				name : 'Germ',
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
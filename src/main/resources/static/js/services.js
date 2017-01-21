'use strict';

/* Services */

angular.module('vbTrainingApp.services', ['ngResource'])
	.value('version', '2.0')
	.factory('PlayerService', ['$resource', 
			function($resource) {
			
				var service = {
						allPlayers : allPlayers,
						findPlayer : findPlayer,
						save : save,
						restore : restore,
						reset : reset,
						defaultValues : defaultValues
				};
				return service;
	
				
				function allPlayers () {
					console.log('Reading all players');
				}
				
				function findPlayer(searchid) {
				}
				
				function save () {
				}
				
				function restore() {
				}
				
				function reset() {
				}
	
				function defaultValues() {
				}
		}]);
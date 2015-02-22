'use strict';

/* Services */

angular.module('vbTrainingApp.services', [])
.value('version', '1.1')
.factory(
		'PlayerService',
		function() {
			var defaults = [ 
    			{"id":1,"firstName":"Roland","name":"Germ","birthdate":"6.5.1966","address":"1230 Wien, Khekgassse 39/9","telefon":"06508901949","abende":[]},
    			{"id":2,"firstName":"Magdalena","name":"Germ","birthdate":"27.12.1966","address":"1230 Wien, Khekgassse 39/9","telefon":"06508901946","abende":[]},
    			{"id":3,"firstName":"Stefanie","name":"Germ","birthdate":"16.3.1990","address":"1230 Wien, Khekgassse 39/9","telefon":"06508901947","abende":[]},
    			{"id":4,"firstName":"Alexander","name":"Angerer","abende":[],"birthdate":"24.12.1991","address":"1130 Wien, Kalmanstr. 38/40","telefon":"06766207932"},
    			{"id":5,"firstName":"Kathi","abende":[],"name":"Angerer","address":"1130 Wien, Kalmanstr. 38/40"},
    			{"id":6,"firstName":"Julia","name":"Schwaninger","abende":[],"birthdate":"15.8.1989","address":"1150 Wien","telefon":"069911318808"},
    			{"id":7,"firstName":"Manuela","name":"Heigl","abende":[],"birthdate":"29.1.1973","address":"1170 Wien, Frauenfelderstr 10"},
    			{"id":8,"firstName":"Leo","name":"Payer","abende":[],"birthdate":"29.3.1948"},
    			{"id":9,"firstName":"Peter","name":"Balas","birthdate":"20.8.1966","abende":[],"address":"Fröschelstr. 3/9/12, 3021 Pressbaum"},
    			{"id":10,"firstName":"Nicole","abende":[],"name":"Trappl","birthdate":"27.5.1990","address":"1150, Schwenderh 41/1/2"},
    			{"id":11,"firstName":"Lisa","abende":[],"name":"Stögmüller","birthdate":"5.1.1968","address":"1150 Wien"},
    			{"id":12,"firstName":"Doris","name":"Rimacek","abende":[],"birthdate":"1.6.1973","address":"1230 Wien"},
    			{"id":13,"firstName":"Ludwig","name":"Schweighofer","birthdate":"1.1.1987","address":"1080, Blindengasse 5/7","telefon":"06645428394","abende":[]},
    			{"id":14,"firstName":"Florian","abende":[],"name":"Wiesenhofer","birthdate":"23.2.1987","address":"1110 Wien, Troststr 41/1","telefon":"0664536036"},
    			{"id":15,"firstName":"Kathi","name":"Wilfinger","abende":[],"birthdate":"25.4.1987","address":"1140 Wien, Hütteldorferstr 220/301","telefon":"06645738061"},
    			{"id":16,"firstName":"Darko","abende":[],"name":"Gulevski","birthdate":"21.8.1981","address":"3004 Riederberg, Eichkogelstr 6"},
    			{"id":17,"firstName":"Lilli","name":"Möslinger","abende":[],"birthdate":"16.5.1995","address":"1140 Wien, Beckmanng 8/10","telefon":"06801321653"},
    			{"id":18,"firstName":"Marion","abende":[],"name":"Han","telefon":"067683322859","birthdate":"14.9.1991","address":"1170 Wien, Lascyg 27/1/1"},
    			{"id":19,"firstName":"Paulus","abende":[],"name":"Leidinger","birthdate":"15.12.1993","address":"1230 Wien, Anton Baumgartner Str. 12"},
    			{"id":20,"firstName":"Susi","name":"Mühlbauer","abende":[],"birthdate":"27.9.1992","address":"1110 Wien, Fickl Str 7/2/4","telefon":"06765219557"},
    			{"id":21,"firstName":"Tobias","name":"Salzer","abende":[],"birthdate":"10.10.1993","address":"1130 Wien, Jörsg 19/1","telefon":"06802002155"},
    			{"id":22,"firstName":"Timmi","name":"Glaser","abende":[]},
    			{"id":23,"firstName":"Lena","name":"Jaenich","abende":[],"birthdate":"11.6.1993","address":"1140 Wien, Isbaryg 9","telefon":"069919546669"},
    			{"id":24,"firstName":"Richard","name":"Rambhard","abende":[],"birthdate":"23.4.1967"},
    			{"id":25,"firstName":"Richard","abende":[],"name":"Kakuska","birthdate":"14.1.1970"},
    			{"id":26,"firstName":"Kerstin","name":"Stadler","abende":[],"birthdate":"22.4.1996","address":"1150 Wien, Reichsapfelg 30","telefon":"069910208046"},
    			{"id":27,"firstName":"Christina","abende":[],"name":"Stromberger","birthdate":"28.5.1985","address":"Auhofstr 15/2/8, 3032 Eichgraben","telefon":"06509562151"},
    			{"id":28,"firstName":"Valentin","name":"Seidler","abende":[],"birthdate":"5.11.1991","address":"1130 Wien, Kupelwieserg 7"},
    			{"id":29,"firstName":"Christoph","abende":[],"name":"Neuwirth","address":"1150 Wien","telefon":"06506218390"},
    			{"id":30,"firstName":"Christian","name":"Angerer","abende":[]},
    			{"id":31,"firstName":"Dominik","abende":[],"name":"Malinowski","birthdate":"6.10.1993","address":"1230, Antonbaumgartner strasse 44/ c4/2104"},
    			{"id":32,"firstName":"David","abende":[],"name":"Grom","address":"1110 Wien, Fickl Str 7/2/4"},
    			{"id":33,"firstName":"Julian","abende":[],"name":"Menz"}
   			];
			
			var service = {
				allPlayers : [],
				
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

					return service.allPlayers;
				},
				
				reset : function() {
					service.allPlayers = new Array();
				}

			};
			// Immediately call restore from the session storage
			// so we have our user data available immediately
			service.restore();
			
			return service;
		});
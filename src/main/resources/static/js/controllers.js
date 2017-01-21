'use strict';

/* Controllers */

var vbApp = angular.module('vbTrainingApp.controllers', ['ngResource']);

function countAttendeesForDate(players, date) {
	var count = 0;

	players.forEach(function(player) {
		count += (player.abende.map(function(e) { return e.tag; }).indexOf(date) == -1) ? 0 : 1;
	});
	return count;
};

vbApp.controller('MainCtrl', function MainCtrl($scope) {
	$scope.parentobject = {};
	$scope.parentobject.date = null;
});

vbApp.controller('TrainingListCtrl', function TrainingListCtrl($scope, $location, $resource) {
	var Spieler = $resource('/api/spieler');
	
	$scope.players = Spieler.query();

	$scope.selectedDate = $scope.parentobject.date;

	$scope.$watch('selectedDate', function(newValue, oldValue) {
		$scope.parentobject.date = newValue;
	});

	$scope.isDateSelected = function() {
		return $scope.selectedDate != null;
	};

	$scope.toggleCheck = function(player) {
		var Training = $resource('/api/spieler/:id1/trainings/:id2');

		var index = player.abende.map(function(e) { return e.tag; }).indexOf($scope.selectedDate);
		if (index == -1) {
			var newTraining = new Training();
			newTraining.tag = $scope.selectedDate;
			
			newTraining.$save({id1: player.id}, function() {
				$scope.players = Spieler.query();
				$location.path('/training');
			});
		} else {
			Training.delete({id1: player.id, id2: player.abende[index].id}, function() {
				$scope.players = Spieler.query();
				$location.path('/training');
			});
		}
	};

	$scope.countAttendees = function() {
		return countAttendeesForDate($scope.players, $scope.selectedDate);
	};

	$scope.isSelected = function(player) {
		return player.abende.map(function(e) { return e.tag; }).indexOf($scope.selectedDate) != -1;
	};
	
	$scope.canAttendTraining = function(player) {
		if ($scope.selectedDate == undefined) {
			return player.active;	
		}
		return player.active || $scope.isSelected(player);
	};
});

vbApp.controller('SpielerListCtrl', function SpielerListCtrl($scope, $resource) {
	var Spieler = $resource('/api/spieler');
	
	$scope.players = Spieler.query();
});

vbApp.controller('SpielerCreateCtrl', function SpielerCreateCtrl($scope, $location, $resource) {
	$scope.edit = false;
	
	var Spieler = $resource('/api/spieler/:id');
	
	$scope.editPlayer = new Spieler();
	
	$scope.savePlayer = function() {
		$scope.editPlayer.$save(function() {
			//data saved. $scope.entry is sent as the post body.
			$location.path('/spieler');
		});

		$location.path('/spieler');
	};

});

vbApp.controller('SpielerEditCtrl', function SpielerEditCtrl($scope, $resource, $location, $routeParams) {
	$scope.edit = true;

	var Spieler = $resource('/api/spieler/:id', {id: "@id"}, {
	      update:{
	          method:'PUT'
	          }
	});
	
	var editPlayer = Spieler.get({ id: $routeParams.playerid }, function() {
		$scope.editPlayer = editPlayer;
	});

	$scope.savePlayer = function() {
		$scope.editPlayer.$update(function() {
			$location.path('/spieler');
		});
	};

	$scope.destroyPlayer = function() {
		$scope.editPlayer.$delete(function() {
			$location.path('/spieler');
		});
	};
});

vbApp.controller('UebersichtCtrl', function UebersichtCtrl($scope, $routeParams, $resource) {
	var Spieler = $resource('/api/spieler');
	
	var today = new Date();
	var start = today;
	var end = today;
	if (today.getMonth() >= 8 && today.getMonth() <= 11 ) {
		start = new Date(today.getFullYear(), 8, 1);
		end = new Date(today.getFullYear()+1, 6, 30);
	} else{
		start = new Date(today.getFullYear()-1, 8, 1);
		end = new Date(today.getFullYear(), 6, 30);
	}
	
	Spieler.query({active: true}).$promise.then(
		function (data) {
			function createDate(training) {
				var dateParts = training.tag.split("-");
				return new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
			};
			
			function inCurrentSeason(training) {
				var d = createDate(training);
				return start <= d && d <= end;
			};
			
			$scope.players = data;
			
			var allSeasonTrainings = new Array();
			for (var int = 0; int < $scope.players.length; int++) {
				var seasonsTrainigsOfPlayer = $scope.players[int].abende.filter(inCurrentSeason);
				
				seasonsTrainigsOfPlayer.forEach(function(training) {
					if (allSeasonTrainings.map(function(e) { return e.tag; }).indexOf(training.tag) == -1) {
						allSeasonTrainings.push(training);
					}
				});
			}
			
			$scope.allTrainingDates = allSeasonTrainings.sort(function(a, b) {
				var d1 = createDate(a);
				var d2 = createDate(b);
				return d1.getTime() - d2.getTime();
			});
			
			function byWeekDay(training) {
				var day = 0;
				if ($routeParams.weekday === 'MO') {
					$scope.weekDay = 'Montag';
					day = 1;
				} else if ($routeParams.weekday === 'DO') {
					$scope.weekDay = 'Donnerstag';
					day = 4;
				} else {
					$scope.weekDay = 'Alle';
					return true;
				}
				
				if (day != 0) {
					var dateParts = training.tag.split("-");
					var d = new Date(dateParts[0], (dateParts[1] - 1), dateParts[2]);
					return d.getDay() === day;
				}
				
				return false;
			};
			
			$scope.filteredTrainings = $scope.allTrainingDates.filter(byWeekDay);
			
			var trainingDays = $scope.filteredTrainings.map(function(mytraining) { return mytraining.tag; });
			$scope.players.forEach(function(player){			
				player.trainingCount = player.abende.map(function(training) {
					return training.attended = trainingDays.indexOf(training.tag) != -1;
				}).reduce(function(prevVal, attended){
					return prevVal + (attended ? 1 : 0);
				});
			});

			$scope.sumOfAttendeesForDate = function(date) {
				return countAttendeesForDate($scope.players, date.tag);
			};
			
			$scope.sumOfAttendeesForAllDates = $scope.players.map(function(player){
				return player.trainingCount;
			}).reduce(function(countAll, trainingCount){
					return countAll + trainingCount;
			});
		}, 
		function (errData) {
			// error
			console.log("error reading player from server");
		}
	);
	
	$scope.hasWeekdayAttended = function(player) {
		return player.trainingCount > 0;
	}; 
	
	$scope.isSelected = function(player, training) {
		return player.abende.map(function(mytraining) { return mytraining.tag; }).indexOf(training.tag) != -1;
	};
});

vbApp.controller('AdminCtrl', function AdminCtrl($scope, $resource) {
	var Spieler = $resource('/api/spieler');
	
	$scope.playerData = angular.toJson(Spieler.query(), true);
});


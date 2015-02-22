'use strict';

/* Controllers */

angular.module('vbTrainingApp.controllers', []);

function countAttendeesForDate(players, date) {
	var count = 0;

	angular.forEach(players, function(player) {
		count += (player.abende.indexOf(date) == -1) ? 0 : 1;
	});
	return count;
};

function MainCtrl($scope, PlayerService) {
	$scope.parentobject = {};
	$scope.parentobject.date = null;

};

function TrainingListCtrl($scope, PlayerService) {
	$scope.players = PlayerService.allPlayers;

	$scope.selectedDate = $scope.parentobject.date;

	$scope.$watch('selectedDate', function(newValue, oldValue) {
		$scope.parentobject.date = newValue;
	});

	$scope.isDateSelected = function() {
		return $scope.selectedDate != null;
	};

	$scope.toggleCheck = function(player) {
		var index = player.abende.indexOf($scope.selectedDate);

		if (index == -1) {
			player.abende.push($scope.selectedDate);
		}

		if (index != -1) {
			player.abende.splice(index, 1);
		}

		PlayerService.save();
	};

	$scope.countAttendees = function() {
		return countAttendeesForDate($scope.players, $scope.selectedDate);
	};

	$scope.isSelected = function() {
		return player.abende.indexOf($scope.selectedDate) == -1;
	};
};

function SpielerListCtrl($scope, PlayerService) {
	$scope.players = PlayerService.allPlayers;
};

function SpielerCreateCtrl($scope, $location, PlayerService) {
	$scope.edit = false;
	
	$scope.savePlayer = function() {
		
		var lastIndex = PlayerService.allPlayers.length;
		var newId = 1;
		if (lastIndex != undefined && lastIndex != 0) {
			newId = PlayerService.allPlayers[lastIndex-1].id + 1;
		}
		
		PlayerService.allPlayers.push({
			id : newId,
			firstName : $scope.newFirstName,
			name : $scope.newName,
			birthdate : $scope.newBirthDate,
			address : $scope.newAddress,
			telefon : $scope.newTelNumb,
			abende : []
		});
		PlayerService.save();

		$location.path('/spieler');
	};

};

function SpielerEditCtrl($scope, $location, $routeParams, PlayerService) {
	$scope.edit = true;

	var editPlayer = PlayerService.findPlayer($routeParams.playerid);

	$scope.newFirstName = editPlayer.firstName;
	$scope.newName = editPlayer.name;
	$scope.newBirthDate = editPlayer.birthdate;
	$scope.newAddress = editPlayer.address;
	$scope.newTelNumb = editPlayer.telefon;

	$scope.savePlayer = function() {
		editPlayer.firstName = $scope.newFirstName;
		editPlayer.name = $scope.newName;
		editPlayer.birthdate = $scope.newBirthDate;
		editPlayer.address = $scope.newAddress;
		editPlayer.telefon = $scope.newTelNumb;

		$location.path('/spieler');

		PlayerService.save();
	};

	$scope.destroyPlayer = function() {
		var index = PlayerService.allPlayers.indexOf(editPlayer);
		PlayerService.allPlayers.splice(index, 1);
		
		PlayerService.save();
		$location.path('/spieler');
	};
};

function UebersichtCtrl($scope, $routeParams, PlayerService) {
	if ($routeParams.weekday === 'MO') {
		$scope.weekDay = 'Montag';
	} else if ($routeParams.weekday === 'DO') {
		$scope.weekDay = 'Donnerstag';
	} else {
		$scope.weekDay = 'Alle';
	}

	var unique = new Array();
	for (var int = 0; int < PlayerService.allPlayers.length; int++) {
		var all = unique.concat(PlayerService.allPlayers[int].abende);

		angular.forEach(all, function(item) {
			if (unique.indexOf(item) > -1)
				return;
			unique.push(item);
		});
	}

	$scope.allTrainingDates = unique;
	$scope.players = PlayerService.allPlayers;

	$scope.sumOfAttendeesForDate = function(date) {
		return countAttendeesForDate($scope.players, date);
	};

	$scope.sumOfAttendeesForAllDates = function(date) {
		var count = 0;
		var remainingWeekdays = filterWeekdays($scope.allTrainingDates,
				$scope.weekDay);

		for (var i = 0; i < remainingWeekdays.length; i++) {
			count += countAttendeesForDate($scope.players, remainingWeekdays[i]);
		}
		return count;
	};

};

function AdminCtrl($scope, PlayerService) {
	$scope.playerData = angular.toJson(PlayerService.allPlayers, true);

	$scope.email = 'email@example.com';

	$scope.send = function() {
		var link = 'mailto:' + $scope.email
				+ '?subject=Backup from VB Trainings' + '&body='
				+ $scope.playerData;
		window.location.href = link;
	};

	$scope.resetAll = function() {
		PlayerService.reset();
		PlayerService.save();
		$scope.playerData = angular.toJson(PlayerService.allPlayers, true);
	};

};


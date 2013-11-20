'use strict';

/* Controllers */

angular.module('vbTrainingApp.controllers', []);

function MyCtrl1($scope) {

};

function MainCtrl($scope) {
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
		var count = 0;

		angular.forEach($scope.players,
						function(player) {
							count += (player.abende
									.indexOf($scope.selectedDate) == -1) ? 0
									: 1;
						});
		return count;
	};

	$scope.isSelected = function() {
		return player.abende.indexOf($scope.selectedDate) == -1;
	};
};

function SpielerListCtrl($scope, PlayerService) {
	$scope.players = PlayerService.allPlayers;
};

function SpielerCreateCtrl($scope, $location, PlayerService) {
	$scope.savePlayer = function() {
		var newId = PlayerService.allPlayers.length + 1;

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

};

function UebersichtCtrl($scope, $routeParams, PlayerService) {
	if ($routeParams.weekday === 'MO') {
		$scope.weekDay = 'Montag';		
	}	else if ($routeParams.weekday === 'DO') {
		$scope.weekDay = 'Donnerstag';		
	}

	var unique = new Array();
	for (var int = 0; int < PlayerService.allPlayers.length; int++) {
		var all = unique.concat(PlayerService.allPlayers[int].abende);
		
		angular.forEach(all, function(item) {
			if (unique.indexOf(item) > -1) return;
			unique.push(item); 
		});
	}
	
	$scope.allTrainingDates = unique;
	$scope.players = PlayerService.allPlayers;
};

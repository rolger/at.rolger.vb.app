'use strict';

// Declare app level module which depends on filters, and services
angular.module(
		'vbTrainingApp',
		[ 'ngRoute', 'vbTrainingApp.filters', 'vbTrainingApp.services',
				'vbTrainingApp.directives', 'vbTrainingApp.controllers' ])
		.config([ '$routeProvider', function($routeProvider) {
			$routeProvider.when('/training', {
				templateUrl : 'partials/traininglist.html',
				controller : 'TrainingListCtrl'
			});
			$routeProvider.when('/spieler', {
				templateUrl : 'partials/spielerlist.html',
				controller : 'SpielerListCtrl'
			});
			$routeProvider.when('/new', {
				templateUrl : 'partials/spielerdetail.html',
				controller : 'SpielerCreateCtrl'
			});
			$routeProvider.when('/edit/:playerid', {
				templateUrl : 'partials/spielerdetail.html',
				controller : 'SpielerEditCtrl'
			});
			$routeProvider.otherwise({
				redirectTo : '/training'
			});
		} ]);

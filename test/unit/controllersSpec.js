'use strict';

/* jasmine specs for controllers go here */

describe('vbTrainingApp.controllers', function() {
	beforeEach(module('vbTrainingApp.controllers'));
	beforeEach(module('vbTrainingApp.services'));

	describe('MainCtrl', function() {
		var scope, ctrl, mock;

		mock = {
			allPlayers : {}
		};

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('MainCtrl', {
				$scope : scope,
				PlayerService : mock
			});
		}));

		it('should create initialize scope variables', function() {
			expect(scope.parentobject.date).toBeNull();
		});

	});
	
	describe('SpielerListCtrl', function() {
		var scope, ctrl, mock;

		mock = {
			allPlayers : [{
				id : 1,
				firstName : 'Test',
				name : 'User',
			}]
		};

		beforeEach(inject(function($rootScope, $controller) {
			scope = $rootScope.$new();
			ctrl = $controller('SpielerListCtrl', {
				$scope : scope,
				PlayerService : mock
			});
		}));

		it('scope variable should be initialized to mock values', function() {
			expect(scope.players.length).toEqual(1);
		});

	});
});

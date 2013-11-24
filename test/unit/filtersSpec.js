'use strict';

/* jasmine specs for filters go here */

describe('filter', function() {
  beforeEach(module('vbTrainingApp.filters'));


  describe('interpolate', function() {
    beforeEach(module(function($provide) {
      $provide.value('version', 'TEST_VER');
    }));


    it('should replace VERSION', inject(function(interpolateFilter) {
      expect(interpolateFilter('before %VERSION% after')).toEqual('before TEST_VER after');
    }));
  });
  
  describe('shortDate', function() {
	  it('should replace the year', inject(function(shortDateFilter) {
	      expect(shortDateFilter('1.1.2042')).toEqual('1.1.');
	    }));
	  });
  
});

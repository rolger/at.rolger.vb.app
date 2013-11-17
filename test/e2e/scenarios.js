'use strict';

/* http://docs.angularjs.org/guide/dev_guide.e2e-testing */

describe('my app', function() {

  beforeEach(function() {
    browser().navigateTo('../../app/index.html');
  });


  it('should automatically redirect to /training when location hash/fragment is empty', function() {
    expect(browser().location().url()).toBe("/training");
  });


  describe('training', function() {

    beforeEach(function() {
      browser().navigateTo('#/training');
    });


    it('should render training when user navigates to /training', function() {
      expect(element('[ng-view] p:first').text()).
        toMatch(/ein Datum/);
    });

  });

});

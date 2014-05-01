'use strict';

describe('Controller: TrendingCtrl', function () {

  // load the controller's module
  beforeEach(module('appSearchApp'));

  var TrendingCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    TrendingCtrl = $controller('TrendingCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});

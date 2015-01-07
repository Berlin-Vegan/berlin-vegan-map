'use strict';

describe('Controller: MainController', function () {

  // load the controller's module
  beforeEach(module('berlinVeganMapApp'));

  var mainCtrl;
  var scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    mainCtrl = $controller('MainController', {
      $scope: scope
    });
  }));

  it('should have no locations to start', function () {
    expect(scope.locations.length).toBe(0);
  });

});

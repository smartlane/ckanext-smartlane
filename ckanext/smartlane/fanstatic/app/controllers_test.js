describe('AnalysesListCtrl', function(){

  beforeEach(module('analysesApp'));
  
  beforeEach(inject(function(_$httpBackend_, $rootScope, $controller) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('/smartlaneweb/analyses/available')
      .respond({"anpr":["traveltime"],"fcd":["los"],"detector":["fundamental","los"]});
    scope = $rootScope.$new();
    ctrl = $controller('AnalysesListCtrl', {$scope: scope});
  }));  

  it('should create "analyses" model with 4 analyses', inject(function($controller) {
    expect(scope.analyses.los).toBeUndefined();
    $httpBackend.flush();
    expect(scope.analyses.los).toBeDefined();
  }));
  it('should set the default value of restrict model', function() {
      expect(scope.restrict).toBe(true);
  });
});

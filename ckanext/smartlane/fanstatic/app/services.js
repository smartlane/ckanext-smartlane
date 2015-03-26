var analysesAppServices = angular.module('analysesAppServices', ['ngResource']);

analysesAppServices.factory('Analyses', ['$resource',
  function($resource) {
    return $resource('/smartlaneweb/analyses/:id', {}, {
      //TODO BACKEND: Don't require available?
      //TODO BACKEND: Invert list (i.e. return the analyses, not the data types, and move the data types elsewhere and adjust resource creation template accordingly)
      query: {method:'GET', params:{id:'available'}}
    });
  }
]);

analysesAppServices.factory('ProjectAnalyses', ['$resource',
  function($resource) {
    return $resource('/smartlaneweb/projects/:projectid/analyses/:analysisjobid');
  }
]);


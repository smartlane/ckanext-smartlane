'use strict'
 
var analysisApp = angular.module('analysesApp', ['ngRoute', 'analysesAppControllers', 'analysesAppServices', 'analysesAppTranslations']);

analysisApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/new', {
        templateUrl: 'partials/new.html',
        controller: 'AnalysesNewCtrl'
      }).
      when('/new/:analysistypeid', {
        templateUrl: 'partials/create.html',
        controller: 'AnalysesCreateCtrl'
      }).
      when('/jobs/all', {
        templateUrl: 'partials/all.html',
        controller: 'AnalysesListCtrl'
      }).
      when('/jobs/:analysisjobid', {
        templateUrl: 'partials/details.html',
        controller: 'AnalysesDetailsCtrl'
      }).
      otherwise({
        redirectTo: '/jobs/all' 
      });
  }
]);

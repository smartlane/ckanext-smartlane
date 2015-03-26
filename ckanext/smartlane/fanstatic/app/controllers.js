var analysisAppControllers = angular.module('analysesAppControllers', []);

/* Show available analyses that could be started (dataset/analyses/new) */
analysisAppControllers.controller('AnalysesNewCtrl', ['$scope', 'Analyses',
  function ($scope, Analyses) {
    $scope.allanalyses = [];
    $scope.availableanalyses = [];
    //Only show analyses that are available by default
    $scope.restrict = true;
    $scope.analyses = $scope.availableanalyses;

    //Checkbox handler
    $scope.restrictChange = function(restrict) {
      if (restrict) {
        $scope.analyses = $scope.availableanalyses;
      }
      else {
        $scope.analyses = $scope.allanalyses;
      }
    };

    //Get data from API
    Analyses.query().$promise.then(function(data) {
      //Invert the data to list by analysis
      //TODO: offer in backend?
      var allanalyses = processAnalysesJson(data);
      var availableanalyses = processAnalysesJson(data);
      $scope.allanalyses = allanalyses;
      $scope.availableanalyses = availableanalyses;
      $scope.allanalyses['nonsense'] = {'name': 'nonsense', 'datatype': new Array('nonsense', 'test')};
      //Update UI
      $scope.restrictChange($scope.restrict);
    });
  }
]);

/* Show config for the analysis to be started (dataset/analyses/new/:analysistypeid) */
analysisAppControllers.controller('AnalysesCreateCtrl', ['$scope', 'Analyses', 'ProjectAnalyses', '$routeParams',
  function ($scope, Analyses, ProjectAnalyses, $routeParams) {
    //Checkbox handler
    $scope.submitAnalysis = function() {
      //TODO: submit somewhere, bind submit enabled/visible and some label to result... refresh to list???
      var newjob = new ProjectAnalyses();
      //new.job.property = something out of the form, etc.
      newjob.$save().then(function() {
        console.log('posted');
        $location.path('/jobs');       
      });
    };
  
    //TODO: Set types/validators appropriately
    //Get data from API
    //TODO: Delete once API is working
    $scope.analysistype = {}
    $scope.analysistype.name = $routeParams.analysistypeid;
    Analyses.query({id: $routeParams.analysistypeid}).$promise.then(
    function(data) {
      $scope.analysistype = data;
    });
  }
]);

/* Show all analyses that have been started or finished (dataset/analyses/jobs) */
analysisAppControllers.controller('AnalysesListCtrl', ['$scope', 'ProjectAnalyses',
  function ($scope, ProjectAnalyses) {
    //CKAN renders the page with the ID
    var pkg_id = document.getElementById('ckan-package-id').value;
    //TODO: Think about how to present larger amounts of analyses: sortable/filterable grid?
    //Get data from API
    //TODO: or should it be /analyses/byproject/projectid....?
    ProjectAnalyses.query({projectid: pkg_id}).$promise.then(
    function(data) {
      $scope.analyses = data;
    });
  }
]);

/* Show analysis details - either running or finished (dataset/analyses/jobs/:analysisjobid) */
analysisAppControllers.controller('AnalysesDetailsCtrl', ['$scope', 'ProjectAnalyses', '$routeParams',
  function ($scope, ProjectAnalyses, $routeParams) {
    //CKAN renders the page with the ID
    var pkg_id = document.getElementById('ckan-package-id').value;
    //Get data from API
    ProjectAnalyses.query({projectid: pkg_id, analysisjobid: $routeParams.analysisjobid}).$promise.then(
    function(data) {
      $scope.analysis = data;
    });
  }
]);

function processAnalysesJson(data) {
  var analyses = {};
  angular.forEach(data, function(value, key) {
    //TODO: Remove once data is encapsualted in "result"
    if (value.length) {
      value.forEach(function(analysis) {
        foundKeys = Object.keys(analyses).filter(function(thekey) {
          return thekey == analysis;
        });
        if (foundKeys.length == 0) {
          var analysisvalue = {};
          analysisvalue.datatype = [];
          analysisvalue.name = analysis;
          analysisvalue.datatype.push(key);
          analyses[analysis] = analysisvalue;
        }
        else {
          analyses[analysis].datatype.push(key);
        }
      });
    }
  });
  return analyses;
}

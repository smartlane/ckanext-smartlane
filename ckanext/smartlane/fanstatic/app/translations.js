angular.module('analysesAppTranslations', ['pascalprecht.translate'])

.config(['$translateProvider', function($translateProvider){
  //English
  $translateProvider.translations('en_US', {
    "ANALYSES_ALL_TITLE" : "All Analyses"
  });
  $translateProvider.translations('en_US', {
    "ANALYSES_RESTRICT_CHECKBOX" : "Only show analyses available for data in project"
  });
  $translateProvider.translations('en_US', {
    "ANALYSES_NEW_TITLE" : "New Analysis"
  });
  $translateProvider.translations('en_US', {
    "ANALYSES_CHOOSE_TITLE" : "Choose Analysis Type"
  });
  $translateProvider.translations('en_US', {
    "DESCRIPTION" : "Description"
  });
  $translateProvider.translations('en_US', {
    "CREATE" : "Create"
  });
  $translateProvider.translations('en_US', {
    "STARTED" : "Started"
  });
  $translateProvider.translations('en_US', {
    "FINISHED" : "Finished"
  });
  $translateProvider.translations('en_US', {
    "DURATION" : "Duration"
  });
  $translateProvider.translations('en_US', {
    "INPUT_RESOURCES" : "Input resources"
  });
  $translateProvider.translations('en_US', {
    "RESULTS" : "Results"
  });
  $translateProvider.translations('en_US', {
    "VIEWS" : "Visualizations"
  });
  //German
  $translateProvider.translations('de_DE', {
    "ANALYSES_ALL_TITLE" : "Alle Analysen"
  });
  $translateProvider.translations('de_DE', {
    "ANALYSES_RESTRICT_CHECKBOX" : "Nur Analysen zeigen, die mit den aktuellen Daten im Projekt machbar sind"
  });
  $translateProvider.translations('de_DE', {
    "ANALYSES_NEW_TITLE" : "Neue Analyse"
  });
  $translateProvider.translations('de_DE', {
    "ANALYSES_CHOOSE_TITLE" : "Analyseart auswählen"
  });
  $translateProvider.translations('de_DE', {
    "DESCRIPTION" : "Beschreibung"
  });
  $translateProvider.translations('de_DE', {
    "CREATE" : "Anlegen"
  });
  $translateProvider.translations('de_DE', {
    "STARTED" : "Gestartet"
  });
  $translateProvider.translations('de_DE', {
    "FINISHED" : "Abgeschlossen"
  });
  $translateProvider.translations('de_DE', {
    "DURATION" : "Dauer"
  });
  $translateProvider.translations('de_DE', {
    "INPUT_RESOURCES" : "Eingangsdaten"
  });
  $translateProvider.translations('de_DE', {
    "RESULTS" : "Ergebnisse"
  });
  $translateProvider.translations('de_DE', {
    "VIEWS" : "Visualisierungen"
  });
  //Default
  //TODO: Get curent CKAN language... bind to it?
  $translateProvider.preferredLanguage('de_DE');
}]);

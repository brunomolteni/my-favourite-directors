(function(){
  'use strict';

  angular.module('app', [
    'ngRoute',
    'ngMaterial', // https://material.angularjs.org/
    'ngMdIcons',  // https://klarsys.github.io/angular-material-icons/
    'ngStorage', // https://github.com/gsklee/ngStorage
    'directors',
    'tmdb'
  ])

  .config(function($routeProvider, $mdThemingProvider) {
      $routeProvider
       .when('/directors', {
        templateUrl: 'app/directors/list/directorsList.html',
        controller: 'directorsListController',
      })
      .when('/director/:directorId', {
        templateUrl: 'app/directors/details/directorsDetails.html',
        controller: 'directorsDetailsController',
      })
      .otherwise({redirectTo:'/directors'});

      // https://material.angularjs.org/latest/Theming/01_introduction
      $mdThemingProvider.theme('default')
          .primaryPalette('amber')
          .accentPalette('deep-orange');
  });

})();

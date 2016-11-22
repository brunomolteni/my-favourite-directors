(function(){

  angular.module('directors')
       .controller('directorsDetailsController', ['$scope', '$route', '$location', 'directorsService', 'tmdbService', DirectorsDetailsController ]);

  function DirectorsDetailsController($scope, $route, $location, directorsService, tmdbService) {

    $scope.director = false;
    $scope.pageClass = 'details';

    $scope.openList = function(){
      $location.path('/directors/');
    };

    // Load the selected director details
    directorsService.getDetails( $route.current.params.directorId )
    .then(function(dir){
      $scope.director = dir;
    })

  }

})();

(function(){

  angular.module('directors')
       .controller('directorsDetailsController', ['$scope', '$route', '$location', 'directorsService', 'tmdbService', DirectorsDetailsController ]);

  function DirectorsDetailsController($scope, $route, $location, directorsService, tmdbService) {

    $scope.director = {};
    $scope.pageClass = 'details';

    $scope.openList = function(){
      $location.path('/directors/');
    };

    // Cargamos los detalles del director seleccionado
    directorsService.getDetails( $route.current.params.directorId )
    .then(function(dir){
      $scope.director = dir;
    })

  }

})();

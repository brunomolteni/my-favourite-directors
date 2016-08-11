(function(){

  angular.module('directors')
       .controller('directorsListController', ['$scope', '$location', 'directorsService', 'tmdbService', DirectorsListController ]);

  function DirectorsListController( $scope, $location, directorsService, tmdbService ) {

    $scope.directors = [];
    $scope.pageClass = 'list';

    $scope.openDetails = function(id){
      $location.path('/director/'+id);
    };

    // Cargamos la lista de directores
    directorsService.loadAllDirectors()
    .then( function( list ) {
      $scope.directors = list;
    });

  }

})();

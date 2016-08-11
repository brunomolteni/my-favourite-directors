(function(){
  'use strict';

  angular.module('directors',[])
         .service('directorsService', ['$q','tmdbService', DirectorsService]);

  // Servicio que usa tmdbService para buscar la lista de directores basado en un array de nombres
  function DirectorsService($q,tmdbService){
    var directorsList,
        favList = [ 'Quentin Tarantino',
                    'Stanley Kubrick',
                    'Hayao Miyazaki',
                    'Park Chan Wook',
                    'Terry Gilliam',
                    'Kim Ki Duk',
                    'Danny Boyle',
                    'Christopher Nolan',
                    'Wes Anderson'];


    function getDirectorByName(name){
        var def = $q.defer();

        // hacemos 1 llamada a tmdb para obtener el id del director
        tmdbService.searchPerson(name).then(function(firstData){

          // hacemos otra llamada para obtener el resto de los datos
          tmdbService.person(firstData.id).then(function(secondData){

            def.resolve( angular.merge(firstData, secondData) );

          });

        });

        return def.promise;
    }
    // hacemos return de una API basada en promises, con metodos para obtener lista completa y detalles de un director
    return {
      loadAllDirectors : function() {
        //si ya tenemos la lista de directores devolver una promise resuelta con la lista
        if(directorsList) return $q.when(directorsList);
        else {   
            // transformamos la lista de nombres a una lista de promises
            var promises = favList.map(function(name){
                return getDirectorByName(name);
            });

            var allPromises = $q.all(promises);

            // una vez que todas las promises se resuelven, pasamos los datos al scope
            allPromises.then(function(list){
                directorsList = list;
            })

            return allPromises;
        }
      },
      getDetails : function(index) {
        if(directorsList) return $q.when(directorsList[index]);
        else return getDirectorByName(favList[index]);
      },
    };
  }

})();

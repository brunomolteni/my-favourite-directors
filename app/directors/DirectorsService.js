(function(){
  'use strict';

  angular.module('directors',[])
         .service('directorsService', ['$q','tmdbService', DirectorsService]);

  // Servicio que tiene la respuesta hardcodeada para devolver los datos que estaban en directors.json y director.json
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
        if(directorsList) return $q.when(directorsList);
        else {   
            var promises = favList.map(function(name){
                return getDirectorByName(name);
            });

            var allPromises = $q.all(promises);

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

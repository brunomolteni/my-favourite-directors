(function(){
  'use strict';

  angular.module('directors',[])
         .service('directorsService', ['$q','tmdbService', DirectorsService]);

  // Service to search tmdb for a list of directors.
  function DirectorsService($q,tmdbService){
    var directorsList,
        favList = [ 'Quentin Tarantino',
                    'Stanley Kubrick',
                    'Hayao Miyazaki',
                    'Park Chan Wook',
                    'Terry Gilliam',
                    '김기덕', // Kim Ki-Duk, had to use korean because there was another director with the same name
                    'Danny Boyle',
                    'Christopher Nolan',
                    'Wes Anderson'];


    function getDirectorByName(name){
        var def = $q.defer();

        // call to tmdb to get director's ID
        tmdbService.searchPerson(name).then(function(firstData){

          // call to tmdb to get the rest of the data
          tmdbService.person(firstData.id).then(function(secondData){

            def.resolve( angular.merge(firstData, secondData) );

          });

        });

        return def.promise;
    }
    // we return the public API
    return {
      loadAllDirectors : function() {
        //if we already have directorsList we return it
        if(directorsList) return $q.when(directorsList);
        else {   
            // transform name list to promises
            var promises = favList.map(function(name){
                return getDirectorByName(name);
            });

            var allPromises = $q.all(promises);

            // once all promises are ready, we set directorsList
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

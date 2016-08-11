(function(){
  'use strict';

  angular.module('tmdb',[])
         .factory('tmdbService', ['$q','$http', '$templateCache', '$localStorage', tmdbService]);

  function tmdbService($q, $http, $templateCache, $localStorage){

    // funcion generica para llamar a la API de TMDB pasandole la accion deseada, los parametros y un callback
    function callApi(action, params, cb){
      var def = $q.defer();
      var cacheKey = JSON.stringify({action,params});

      // usamos localStorage para cachear cada request
      if($localStorage[cacheKey]) cb($localStorage[cacheKey],def);
      else{
        $http({method: 'JSONP', url:angular.copy('https://api.themoviedb.org/3/'+action) ,params: angular.merge( {'api_key': 'da9e6b65704e307cdeef5c72c24ed47a','callback': 'JSON_CALLBACK'},params), cache: false})
          .success(function(data){
            $localStorage[cacheKey] = data;
            cb(data,def);
          })
          .error(function(){
            def.reject(false);
          });
      } 

      return def.promise;
    }

    // trae toda la informacion de una persona en base a un ID
    function person(id){
      return callApi('person/'+id,
                    {},
                    function(data,def){
                      if(data){
                        def.resolve(data);
                      }
                      else def.reject(false);
                    }) 
    }
    
    // busca una persona en base a un nombre, trae datos basicos
    function searchPerson(name){
      return callApi('search/person',
                    {query: name},
                    function(data,def){
                      if(data && data.total_results > 0){
                        def.resolve(data.results[0]);
                      }
                      else def.reject(false);
                    }) 
    }


    return {
      person: person,
      searchPerson: searchPerson
    }
  }

})();

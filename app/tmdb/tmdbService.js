(function(){
  'use strict';

  angular.module('tmdb',[])
         .factory('tmdbService', ['$q','$http', '$templateCache', '$localStorage', tmdbService]);

  function tmdbService($q, $http, $templateCache, $localStorage){

    // generic function to call tmdb API passing action, parameters and a callback
    function callApi(action, params, cb){
      var def = $q.defer();
      var cacheKey = JSON.stringify({action,params});

      // use localstorage to cache each call
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

    // gets the complete info on one person, using an ID as input
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
    
    // gets some basic info on one person, using the name as input
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

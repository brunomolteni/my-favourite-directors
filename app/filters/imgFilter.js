(function(){
  'use strict';

  angular.module('app')
       .filter('img', function(){
         return function(input){
          if(input){
            return 'https://image.tmdb.org/t/p/w185' + input;
          } else return input;
         }
       });

})();

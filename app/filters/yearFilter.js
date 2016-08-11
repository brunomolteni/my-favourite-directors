(function(){
  'use strict';

  angular.module('app')
       .filter('year', function(){
         return function(input){
          if(input){
            return input.split('-')[0];
          } else return input;
         }
       });

})();

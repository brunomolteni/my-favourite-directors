(function(){
  'use strict';

  angular.module('app')
       .filter('age', function(){
         return function(input){
          if(input){
            var birthday = new Date(input);
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
          } else return input;
         }
       });

})();

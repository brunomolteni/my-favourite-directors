(function(){
  'use strict';

  angular.module('app')
       .filter('birth', function(){
         return function(input){
           if(input){
             var date = input.split('-')
             var months = ['', 'January','February','March','April','May','June','July','August','September','October','November','December'];
             var year = date[0];
             var month = months[+date[1]];
             var day = date[2];
             return  month + ' ' + day + ', ' + year;
           }
           else return input;
         }
       });

})();

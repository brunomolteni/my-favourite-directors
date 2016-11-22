(function(){
  'use strict';

  angular.module('app')
       .filter('wiki', function(){
         return function(input){
          if(input){
           if(input.indexOf('From Wikipedia, the free encyclopedia') > -1) input = input.slice(39);
           if(input.indexOf('Description above') > -1) input = input.replace(/Description above.+/,'');
          }
          return input;
         }
       });

})();

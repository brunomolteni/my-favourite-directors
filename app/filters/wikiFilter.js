(function(){
  'use strict';

  angular.module('app')
       .filter('wiki', function(){
         return function(input){
          if(input){
           if(input.indexOf('From Wikipedia, the free encyclopedia ')) input = input.slice(39);
           if(input.indexOf(' Description above')) input = input.replace(/Description above.+/,'');
          }
          return input;
         }
       });

})();

/**
 * Created by akashbabber on 20/05/17.
 */
b2bDb.directive('inc',function () {
   return {
       restrict:'A',
       scope:{
         inc : '='
       },
       controller:function ($interval,$scope) {
           $interval(function () {
               $scope.inc = $scope.inc + 1;
           },3000);
       }
   }
});
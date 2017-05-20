/**
 * Created by akashbabber on 20/05/17.
 */
b2bDb.controller('HomeController', [
    '$scope',
    '$localStorage',
    '$state',
    'dataFactory',
    function ($scope,$localStorage,$state,dataFactory)
    {
        $scope.data = dataFactory;

        $scope.userInstruments = [];


        $scope.addInstrument = function (item) {
            if($scope.userInstruments.indexOf(item) == -1){
                $scope.userInstruments.push(item);
                console.log($scope.userInstruments);
            }
        };

        $scope.removeInstrument = function (index) {
            $scope.userInstruments.splice(index,1);
        };

        $scope.getInstruments = function () {
            return $scope.userInstruments;
        }

    }
]);